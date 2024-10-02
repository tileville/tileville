import {
  RuntimeModule,
  runtimeModule,
  state,
  runtimeMethod,
} from '@proto-kit/module';
import { State, StateMap, assert } from '@proto-kit/protocol';
import type { Proof } from 'o1js';
import { UInt64, PublicKey, Provable, Bool } from 'o1js';
import { Balances, UInt64 as ProtoUInt64 } from '@proto-kit/library';
import { inject } from 'tsyringe';
import {
  Competition,
  GameRecordKey,
  LeaderboardIndex,
  LeaderboardScore,
} from '../types';
import { ZNAKE_TOKEN_ID } from '../constants';

export interface IScoreable {
  score: UInt64;
}

@runtimeModule()
export class Gamehub<
  PublicInput,
  PublicOutput extends IScoreable,
  GameProof extends Proof<PublicInput, PublicOutput>,
> extends RuntimeModule<unknown> {
  @state() public competitionCreator = StateMap.from<UInt64, PublicKey>(
    UInt64,
    PublicKey
  );
  // CompetitionId -> competition
  @state() public competitions = StateMap.from<UInt64, Competition>(
    UInt64,
    Competition
  );
  @state() public lastCompetitonId = State.from<UInt64>(UInt64);

  /// compettitionId + User => Record
  @state() public gameRecords = StateMap.from<GameRecordKey, UInt64>(
    GameRecordKey,
    UInt64
  );

  /// competitionId + User => isRegistered
  @state() public registrations = StateMap.from<GameRecordKey, Bool>(
    GameRecordKey,
    Bool
  );
  /// (competitionId, Unsorted index) => user result
  @state() public leaderboard = StateMap.from<
    LeaderboardIndex,
    LeaderboardScore
  >(LeaderboardIndex, LeaderboardScore);
  @state() public seeds = StateMap.from<UInt64, UInt64>(UInt64, UInt64);
  @state() public lastSeed = State.from<UInt64>(UInt64);
  @state() public lastUpdate = State.from<UInt64>(UInt64);

  @state() public gotReward = StateMap.from<GameRecordKey, Bool>(
    GameRecordKey,
    Bool
  );

  public leaderboardSize = 10;

  public constructor(@inject('Balances') private balances: Balances) {
    super();
  }

  @runtimeMethod()
  public async updateSeed(seed: UInt64): Promise<void> {
    const lastSeedIndex = (await this.lastSeed.get()).orElse(UInt64.from(0));
    await this.seeds.set(lastSeedIndex, seed);
    await this.lastSeed.set(lastSeedIndex.add(1));
  }

  /**
   * Creates new game competition
   *
   * @param competition - Competition to create
   */
  @runtimeMethod()
  public async createCompetition(competition: Competition): Promise<void> {
    const competitionId = (await this.lastCompetitonId.get()).orElse(
      UInt64.from(0)
    );
    await this.competitionCreator.set(
      competitionId,
      this.transaction.sender.value
    );
    await this.competitions.set(competitionId, competition);
    await this.lastCompetitonId.set(competitionId.add(1));

    await this.balances.transfer(
      ZNAKE_TOKEN_ID,
      this.transaction.sender.value,
      PublicKey.empty(),
      ProtoUInt64.from(competition.funds)
    );
  }

  @runtimeMethod()
  public async register(competitionId: UInt64): Promise<void> {
    await this.registrations.set(
      new GameRecordKey({
        competitionId,
        player: this.transaction.sender.value,
      }),
      Bool(true)
    );

    await this.payCompetitionFee(competitionId, Bool(true));
  }

  /**
   * Adds game record to a competition
   *
   * @param competitionId - Competition id to add record to
   * @param newScore - Score to be added
   */
  @runtimeMethod()
  public async addGameResult(
    competitionId: UInt64,
    gameRecordProof: GameProof
  ): Promise<void> {
    gameRecordProof.verify();

    const gameKey = new GameRecordKey({
      competitionId,
      player: this.transaction.sender.value,
    });

    // Check for registration
    const registrationNeeded = (await this.competitions.get(competitionId))
      .value.prereg;
    const userRegistration = (await this.registrations.get(gameKey)).value;

    assert(
      registrationNeeded.not().or(userRegistration),
      'Should register first'
    );

    await this.payCompetitionFee(competitionId, registrationNeeded.not());

    const currentScore = (await this.gameRecords.get(gameKey)).value;
    const newScore = gameRecordProof.publicOutput.score;

    const betterScore = currentScore.lessThan(newScore);

    {
      // Everything that is done here, should be done only if <betterScore>
      // So all set should be with <betterScore> check
      await this.gameRecords.set(
        gameKey,
        Provable.if(betterScore, newScore, currentScore)
      );

      let prevValue = new LeaderboardScore({
        score: newScore,
        player: this.transaction.sender.value,
      });
      let found = Bool(false);

      for (let i = 0; i < this.leaderboardSize; i++) {
        const leaderboardKey = new LeaderboardIndex({
          competitionId,
          index: UInt64.from(i),
        });
        const gameRecord = (await this.leaderboard.get(leaderboardKey)).orElse(
          new LeaderboardScore({
            score: UInt64.from(0),
            player: PublicKey.empty(),
          })
        );

        found = found.or(gameRecord.score.lessThan(prevValue.score));

        await this.leaderboard.set(
          leaderboardKey,
          Provable.if(found, LeaderboardScore, prevValue, gameRecord)
        );

        prevValue = Provable.if(found, LeaderboardScore, gameRecord, prevValue);
      }
    }
  }

  /// #TODO change to multiple receivers
  /// #TODO add timestamp check, when timestamp will be on protokit
  @runtimeMethod()
  public async getReward(competitionId: UInt64): Promise<void> {
    let competition = (await this.competitions.get(competitionId)).value;

    let key = new GameRecordKey({
      competitionId,
      player: this.transaction.sender.value,
    });

    assert((await this.gotReward.get(key)).value, 'Already got your reward');
    await this.gotReward.set(key, Bool(true));

    let winner = (
      await this.leaderboard.get(
        new LeaderboardIndex({
          competitionId,
          index: UInt64.zero,
        })
      )
    ).value;

    assert(
      winner.player.equals(this.transaction.sender.value),
      'You are not the winner'
    );

    await this.balances.mint(
      ZNAKE_TOKEN_ID,
      this.transaction.sender.value,
      ProtoUInt64.from(competition.funds)
    );
  }

  private async payCompetitionFee(
    competitionId: UInt64,
    shouldPay: Bool
  ): Promise<void> {
    let competition = (await this.competitions.get(competitionId)).value;
    let fee = Provable.if<ProtoUInt64>(
      shouldPay,
      ProtoUInt64,
      competition.participationFee,
      ProtoUInt64.zero
    );

    await this.balances.transfer(
      ZNAKE_TOKEN_ID,
      this.transaction.sender.value,
      PublicKey.empty(),
      ProtoUInt64.from(fee)
    );
    competition.funds = competition.funds.add(fee);
    await this.competitions.set(competitionId, competition);
  }
}
