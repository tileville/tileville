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
import { Competition, GameRecordKey, LeaderboardIndex, LeaderboardScore } from './types';

export interface IScoreable {
  score: UInt64;
}

@runtimeModule()
export class GameHub<
  PublicInput,
  PublicOutput extends IScoreable,
  GameProof extends Proof<PublicInput, PublicOutput>,
> extends RuntimeModule<unknown> {
  @state() public competitions = StateMap.from<UInt64, Competition>(
    UInt64,
    Competition
  );

  @state() public lastComptitonId = State.from<UInt64>(UInt64);
  @state() public gameRecords = StateMap.from<GameRecordKey, UInt64>(GameRecordKey, UInt64);

  @state() public registrations = StateMap.from<GameRecordKey, Bool>(GameRecordKey, Bool);

  @state() public leaderboard = StateMap.from<LeaderboardIndex, LeaderboardScore>(LeaderboardIndex, LeaderboardScore);
  @state() public seeds = StateMap.from<UInt64, UInt64>(UInt64, UInt64);
  @state() public lastSeed = State.from<UInt64>(UInt64);
  @state() public lastUpdate = State.from<UInt64>(UInt64);

  @state() public gotReward = StateMap.from<GameRecordKey, Bool>(GameRecordKey, Bool);


}
