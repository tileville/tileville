import {
  PublicKey,
  Struct,
  Provable,
  Bool,
  CircuitString,
  Field,
  UInt64,
} from 'o1js';
import { TRIHEX_DECK_SIZE, GRID_SIZE, ShapePatternsId, TileType } from './constants';

const MAP_SIZE = (2 * GRID_SIZE + 1) ** 2;

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

// export enum TileType {
//   Empty = 1,
//   WindMill = 2,
//   Tree = 3,
//   Road = 4,
//   Castle = 5,
//   CityGate = 6,
// }

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

  static zero(): Position {
    return new Position({
      x: UInt64.from(0),
      y: UInt64.from(0),
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
  counted: Bool,
}) {
  static empty(): Tile {
    return new Tile({
      pos: Position.zero(),
      isHill: Bool(false),
      isEmpty: Bool(true),
      tileType: UInt64.one,
      counted: Bool(false),
    });
  }
  equals(other: Tile): Bool {
    const isPosEqual = this.pos.equals(other.pos);
    const isHillEqual = this.isHill.equals(other.isHill);
    const isEmptyEqual = this.isEmpty.equals(other.isEmpty);
    const isTileTypeEqual = this.tileType.equals(other.tileType);
    const isCountedEqual = this.counted.equals(other.counted);

    return isPosEqual
      .and(isHillEqual)
      .and(isEmptyEqual)
      .and(isTileTypeEqual)
      .and(isCountedEqual);
  }
}

export class TileMap extends Struct({
  tiles: Provable.Array(
    Provable.Array(Tile, 2 * GRID_SIZE + 1),
    2 * GRID_SIZE + 1
  ),
  size: UInt64,
}) {
  static empty(): TileMap {

    let tiles: Tile[][] = []
    for(let r = 0; r < 2 * GRID_SIZE +1; r++) {
      tiles[r] = [];
      for(let c = 0; c < 2 * GRID_SIZE + 1; c++) {
        const tile =  new Tile({
          pos: new Position({x: UInt64.from(r), y: UInt64.from(c)}),
          isEmpty: Bool(true),
          isHill: Bool(false),
          counted: Bool(false),
          tileType: TileType.Empty
        })
        tiles[r].push(tile)
      }
    }
    return new TileMap({ tiles, size: UInt64.from(GRID_SIZE) });
  }

  equals(other: TileMap): Bool {
    let result = Bool(true);
    for (let r = 0; r < 2 * GRID_SIZE + 1; r++) {
      for (let c = 0; c < 2 * GRID_SIZE + 1; c++) {
        const tile = this.tiles[r][c];
        const otherTile = other.tiles[r][c];
        result = Provable.if(
          tile.equals(otherTile),
          result.and(Bool(true)),
          Bool(false)
        );
      }
    }
    return result;
  }
}

export class TriHex extends Struct({
  hexes: Provable.Array(UInt64, 3),
  shape: UInt64,
}) {
  static empty(): TriHex {
    return new TriHex({
      hexes: [UInt64.from(0), UInt64.from(0), UInt64.from(0)],
      shape: ShapePatternsId['v'],
    });
  }

  rotateRight(): void {
    const shapeIsA = this.shape.equals(ShapePatternsId['a']);
    const shapeIsV = this.shape.equals(ShapePatternsId['v']);
    this.shape = Provable.switch([shapeIsA, shapeIsV], UInt64, [
      ShapePatternsId['v'],
      ShapePatternsId['a'],
    ]);

    // this.shape = Provable.if(
    //   this.shape.equals(ShapePatternsId['v']),
    //   ShapePatternsId['a'],
    //   this.shape
    // );
    // let temp = this.hexes[1];
    // this.hexes[1] = Provable.if(
    //   this.shape.equals(ShapePatternsId['v']),
    //   this.hexes[2],
    //   this.hexes[1]
    // );
    // this.hexes[2] = Provable.if(
    //   this.shape.equals(ShapePatternsId['v']),
    //   temp,
    //   this.hexes[2]
    // );

    // this.shape = Provable.if(
    //   this.shape.equals(ShapePatternsId['a']),
    //   ShapePatternsId['v'],
    //   this.shape
    // );
    // temp = this.hexes[0];
    // this.hexes[0] = Provable.if(
    //   this.shape.equals(ShapePatternsId['a']),
    //   this.hexes[1],
    //   this.hexes[0]
    // );
    // this.hexes[1] = Provable.if(
    //   this.shape.equals(ShapePatternsId['a']),
    //   temp,
    //   this.hexes[1]
    // );

    // this.shape = Provable.if(
    //   this.shape.equals(ShapePatternsId['\\']),
    //   ShapePatternsId['/'],
    //   this.shape
    // );
  }

  rotateLeft(): void {}
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

export class GameInput extends Struct({
  pos: Position,
  trihex: TriHex,
}) {}


// export class MyList extends MerkleList.create(Tile) {}
