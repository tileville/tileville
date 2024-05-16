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
} from './types';
import { ZNAKE_TOKEN_ID } from './constants';

export interface IScoreable {
  score: UInt64;
}

@runtimeModule()
export class GameHub<
  PublicInput,
  PublicOutput extends IScoreable,
  GameProof extends Proof<PublicInput, PublicOutput>,
> extends RuntimeModule<unknown> {
  @state() public competitionCreator = StateMap.from<UInt64, PublicKey>(
    UInt64,
    PublicKey,
  );
  @state() public competitions = StateMap.from<UInt64, Competition>(
    UInt64,
    Competition
  );

  @state() public lastCompetitonId = State.from<UInt64>(UInt64);
  @state() public gameRecords = StateMap.from<GameRecordKey, UInt64>(
    GameRecordKey,
    UInt64
  );

  @state() public registrations = StateMap.from<GameRecordKey, Bool>(
    GameRecordKey,
    Bool
  );

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
    const lastSeedIndex = this.lastSeed.get().orElse(UInt64.from(0));
    this.seeds.set(lastSeedIndex, seed);
    this.lastSeed.set(lastSeedIndex.add(1));
  }

  @runtimeMethod()
  public async createCompetition(competition: Competition): Promise<void> {
    const competitionId = this.lastCompetitonId.get().orElse(UInt64.from(0));
    this.competitionCreator.set(competitionId, this.transaction.sender.value);
    this.competitions.set(competitionId, competition);
    this.lastCompetitonId.set(competitionId.add(1));

    this.balances.transfer(
      ZNAKE_TOKEN_ID,
      this.transaction.sender.value,
      PublicKey.empty(),
      ProtoUInt64.from(competition.funds)
    );
  }

  @runtimeMethod()
  public async register(competitionId: UInt64): Promise<void> {
    this.registrations.set(
      new GameRecordKey({
        competitionId,
        player: this.transaction.sender.value,
      }),
      Bool(true)
    );
    this.payCompetitionFee(competitionId, Bool(true));
  }

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

    const registrationNeeded =
      this.competitions.get(competitionId).value.prereg;
    const userRegistration = this.registrations.get(gameKey).value;

    assert(registrationNeeded.not().or(userRegistration), 'Should register first');

    this.payCompetitionFee(competitionId, registrationNeeded.not());
    const currentScore = this.gameRecords.get(gameKey).value;
    const newScore = gameRecordProof.publicOutput.score;
    console.log("new score", newScore)
    const betterScore = currentScore.lessThan(newScore);

    {
      this.gameRecords.set(
        gameKey,
        Provable.if(betterScore, newScore, currentScore),
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
        const gameRecord = this.leaderboard.get(leaderboardKey).orElse(
          new LeaderboardScore({
            score: UInt64.from(0),
            player: PublicKey.empty(),
          }),
        );

        found = found.or(gameRecord.score.lessThan(prevValue.score));

        this.leaderboard.set(
          leaderboardKey,
          Provable.if(found, LeaderboardScore, prevValue, gameRecord),
        );

        prevValue = Provable.if(found, LeaderboardScore, gameRecord, prevValue);
      }
    }
  }


  @runtimeMethod()
  public async getReward(competitionId: UInt64): Promise<void> {
    let competition = this.competitions.get(competitionId).value;
    let key = new GameRecordKey({
      competitionId,
      player: this.transaction.sender.value,
    });

    assert(this.gotReward.get(key).value);
    this.gotReward.set(key, Bool(true));
    let winner = this.leaderboard.get(
      new LeaderboardIndex({
        competitionId,
        index: UInt64.zero,
      })
    ).value;

    assert(winner.player.equals(this.transaction.sender.value), 'You are not the winner');
    this.balances.mint(
      ZNAKE_TOKEN_ID,
      this.transaction.sender.value,
      ProtoUInt64.from(competition.funds)
    );
  }

  private payCompetitionFee(competitionId: UInt64, shouldPay: Bool): void {
    const competition = this.competitions.get(competitionId).value;
    const fee = Provable.if<ProtoUInt64>(
      shouldPay,
      ProtoUInt64,
      competition.participationFee,
      ProtoUInt64.zero
    );

    this.balances.transfer(
      ZNAKE_TOKEN_ID,
      this.transaction.sender.value,
      PublicKey.empty(),
      ProtoUInt64.from(fee as any)
    );
    competition.funds = competition.funds.add(fee);
    this.competitions.set(competitionId, competition);
  }
}
