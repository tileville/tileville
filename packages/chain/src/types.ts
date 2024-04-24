import {
  PublicKey,
  UInt64,
  Struct,
  Provable,
  Int64,
  Bool,
  CircuitString,
  Field,
} from 'o1js';
import { CHUNK_LENGTH, GAME_LENGTH, MAX_BRICKS } from './constants';

export class GameRecordKey extends Struct({
  competitionId: UInt64,
  player: PublicKey,
}) {}

export class Competition extends Struct({
  name: CircuitString,
  seed: Field,
  prereg: Bool,
  preregStartTime: UInt64,
  preregEndTime: UInt64,
  competitionStartTime: UInt64,
  competitionEndTime: UInt64,
  funds: UInt64,
  participationFee: UInt64,
}) {
  static from(
    name: string,
    // description: string,
    seed: number,
    prereg: boolean,
    preregStartTime: number,
    preregEndTime: number,
    competitionStartTime: number,
    competitionEndTime: number,
    funds: number,
    participationFee: number
  ): Competition {
    return new Competition({
      name: CircuitString.fromString(name),
      // description: CircuitString.fromString(description),
      seed: Field.from(seed),
      prereg: new Bool(prereg),
      preregStartTime: UInt64.from(preregStartTime),
      preregEndTime: UInt64.from(preregEndTime),
      competitionStartTime: UInt64.from(competitionStartTime),
      competitionEndTime: UInt64.from(competitionEndTime),
      funds: UInt64.from(funds).mul(10 ** 9),
      participationFee: UInt64.from(participationFee).mul(10 ** 9),
    });
  }
}

export class LeaderboardIndex extends Struct({
  competitionId: UInt64,
  index: UInt64,
}) {}

export class LeaderboardScore extends Struct({
  score: UInt64,
  player: PublicKey,
}) {}
