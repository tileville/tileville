import {
  PublicKey,
  Struct,
  Provable,
  Bool,
  CircuitString,
  Field,
  UInt64,
} from 'o1js';
import { UInt64 as UInt64Proto } from '@proto-kit/library';
import { MAP_COL_SIZE, MAP_ROW_SIZE, TRIHEX_DECK_SIZE } from './constants';

const MAP_SIZE = MAP_COL_SIZE * MAP_ROW_SIZE;

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
  x: UInt64,
  y: UInt64,
}) {
  static from(_x: number, _y: number): Position {
    return new Position({
      x: UInt64.from(_x),
      y: UInt64.from(_y),
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
  tileType: UInt64,
}) {}

export class EmptyMap extends Struct({
  tiles: Provable.Array(Tile, MAP_SIZE),
}) {
  static empty(): EmptyMap {
    let tiles = [...new Array(MAP_ROW_SIZE * MAP_COL_SIZE)];
    for (let i = 0; i < MAP_ROW_SIZE; i++) {
      for (let j = 0; j < MAP_COL_SIZE; j++) {
        tiles[i] = new Tile({
          pos: new Position({
            x: UInt64.from(i),
            y: UInt64.from(j),
          }),
          isHill: Bool(false),
          isEmpty: Bool(true),
          tileType: UInt64.from(0),
        });
      }
    }
    return new EmptyMap({ tiles });
  }
}

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
  deck: any;
  static empty(): TriHexDeck {
    return new TriHexDeck({
      trihexes: [...new Array(TRIHEX_DECK_SIZE)].map(() => TriHex.empty()),
    });
  }
}
