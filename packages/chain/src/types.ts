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
import { CHUNK_LENGTH, GAME_LENGTH, TRIHEX_DECK_SIZE } from './constants';

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

export enum TileType {
  Empty = 1,
  WindMill = 2,
  Tree = 3,
  Road = 4,
  Castle = 5,
  CityGate = 6,
}

export class Position extends Struct({
  x: Int64,
  y: Int64,
}) {
  static from(_x: number, _y: number): Position {
    return new Position({
      x: Int64.from(_x),
      y: Int64.from(_y),
    });
  }

  equals(p: Position): Bool {
    return this.x.equals(p.x).and(this.y.equals(p.y));
  }
}

export class Tile extends Struct({
  pos: Position,
  isHill: Bool,
  isEmpty: Bool,
}) {}

export class TriHex extends Struct({
  hexes: Provable.Array(UInt64, 3),
  shape: CircuitString,
}) {
  static empty(): TriHex {
    return new TriHex({
      hexes: [UInt64.from(0), UInt64.from(0), UInt64.from(0)],
      shape: CircuitString.fromString('v'),
    });
  }
}

export class TriHexDeck extends Struct({
  trihexes: Provable.Array(TriHex, TRIHEX_DECK_SIZE),
}) {
  static empty(): TriHexDeck {
    return new TriHexDeck({
      trihexes: [...new Array(TRIHEX_DECK_SIZE)].map(() => TriHex.empty()),
    });
  }
}
