import {
  CircuitString,
  Field,
  Provable,
  Struct,
  Bool,
  UInt64,
  Int64,
} from 'o1js';
import { UInt64 as UInt64Proto } from '@proto-kit/library';
import { RandomGenerator } from './random';
import {
  GameInput,
  Position,
  Tile,
  TileMap,
  TriHex,
  TriHexDeck,
} from './types';
import {
  GRID_SIZE,
  ShapePatternsId,
  ShapePatternsSymbol,
  TRIHEX_DECK_SIZE,
  allRotations,
  allShapes,
} from './constants';

const shapeSet1 = [
  ShapePatternsId['c'],
  ShapePatternsId['r'],
  ShapePatternsId['n'],
  ShapePatternsId['d'],
  ShapePatternsId['j'],
  ShapePatternsId['l'],
];
const shapeSet2 = [
  ShapePatternsId['/'],
  ShapePatternsId['-'],
  ShapePatternsId['\\'],
];
const shapeSet3 = [ShapePatternsId['a'], ShapePatternsId['v']];

export class GameContext extends Struct({
  trihexDeck: TriHexDeck,
  totalLeft: UInt64,
  tilemap: TileMap,
  score: UInt64,
  winnable: Bool,
  alreadyWon: Bool,
  debug: Bool,
}) {
  processMove(input: GameInput): void {
    //TODO: Write logic to calculate updated score
    this.score = Provable.if(this.alreadyWon, this.score, this.score.add(1));
    this.totalLeft = this.totalLeft.sub(1);
  }

  equals(other: GameContext): Bool {
    const scoreEquals = this.score.equals(other.score);
    const totalLeftEquals = this.totalLeft.equals(other.totalLeft);
    const winnableEquals = this.winnable.equals(other.winnable);
    const tilemapEquals = this.tilemap.equals(other.tilemap);
    const alreadyWonEquals = this.alreadyWon.equals(other.alreadyWon);
    const debugEquals = this.debug.equals(other.debug);

    //TODO: Write equals for trihex deck

    return scoreEquals
      .and(totalLeftEquals)
      .and(winnableEquals)
      .and(tilemapEquals)
      .and(alreadyWonEquals)
      .and(debugEquals);
  }

  canPlaceShape(shape: UInt64): Bool {
    const shapeSymbol = ShapePatternsSymbol[shape.toString()];
    const rotations = allRotations[shapeSymbol];
    let canPlaceShape = Bool(false);
    for (let r = 0; r < 2 * GRID_SIZE + 1; r++) {
      for (let c = 0; c < 2 * GRID_SIZE + 1; c++) {
        for (
          let rotationIdx = 0;
          rotationIdx < rotations.length;
          rotationIdx++
        ) {
          const rotation = rotations[rotationIdx];
          const offsets = allShapes[rotation];
          let canPlaceForThisRotation = Bool(true);
          for (let offsetIdx = 0; offsetIdx < offsets.length; offsetIdx++) {
            const offset = offsets[offsetIdx];
            const tile = this.tilemap.tiles[r][c];
            const r1 = Number(tile.pos.x) + offset.ro;
            const c1 = Number(tile.pos.y) + offset.co;

            canPlaceForThisRotation = Provable.if(
              this.tilemap.tiles[r1][c1].tileType.equals(UInt64.one).not(),
              Bool(false),
              canPlaceForThisRotation
            );
          }
          canPlaceShape = canPlaceShape.or(canPlaceForThisRotation);
        }
      }
    }
    return canPlaceShape;
  }

  placeTrihex(pos: Position, trihex: TriHex): Bool {
    let touching = Bool(false);
    const offsets = allShapes[ShapePatternsSymbol[Number(trihex.shape)]];

    const r = Number(pos.x);
    const c = Number(pos.y);

    const hexTiles: Tile[] = [];
    for (let offsetIdx = 0; offsetIdx < 3; offsetIdx++) {
      const offset = offsets[offsetIdx];
      hexTiles.push(this.tilemap.tiles[r + offset.ro][c + offset.co]);
      const neighborTiles = this.neighbors(r + offset.ro, c + offset.co);

      // Check if trihex tiles are touching to already placed tiles, if yes, we can place this trihex
      for (let i = 0; i < neighborTiles.length; i++) {
        const neighborTile = neighborTiles[i];
        touching = Provable.if(
          Bool(!!neighborTile),
          Provable.if(
            neighborTile.tileType.greaterThan(UInt64.one),
            Bool(true),
            touching
          ),
          touching
        );
      }
    }

    const isPlaceable = touching
      .and(Bool(!!hexTiles[0]))
      .and(Bool(!!hexTiles[1]))
      .and(Bool(!!hexTiles[2]))
      .and(hexTiles[0].tileType.equals(UInt64.one))
      .and(hexTiles[1].tileType.equals(UInt64.one))
      .and(hexTiles[2].tileType.equals(UInt64.one));

    for (let i = 0; i < 3; i++) {
      hexTiles[i].tileType = Provable.if(
        isPlaceable,
        trihex.hexes[i],
        hexTiles[i].tileType
      );
    }
    return isPlaceable;
  }

  neighbors(row: number, col: number): Tile[] {
    return [
      this.tilemap.tiles[row][col + 1],
      this.tilemap.tiles[row - 1][col + 1],
      this.tilemap.tiles[row - 1][col],
      this.tilemap.tiles[row][col - 1],
      this.tilemap.tiles[row + 1][col - 1],
      this.tilemap.tiles[row + 1][col],
    ];
  }
}

export function createTrihexDeckBySeed(seed: Field): TriHexDeck {
  const generator = RandomGenerator.from(seed);
  const deck = TriHexDeck.empty();

  // let a = Provable.if(
  //   Bool(true),
  //   UInt64Proto,
  //   UInt64Proto.from(1),
  //   UInt64Proto.from(2)
  // );
  // console.log(a);

  for (let i = 0; i < TRIHEX_DECK_SIZE; i++) {
    deck.trihexes[i].shape = Provable.if(
      Field(i).greaterThanOrEqual(Field(Math.floor(TRIHEX_DECK_SIZE / 3))),
      shapeSet2[Number(generator.getNumber(shapeSet2.length))],

      shapeSet3[Number(generator.getNumber(shapeSet3.length))]
    );

    deck.trihexes[i].shape = Provable.if(
      Field(i).greaterThanOrEqual(
        Field(Math.floor((TRIHEX_DECK_SIZE * 2) / 3))
      ),
      shapeSet1[Number(generator.getNumber(shapeSet1.length))],
      deck.trihexes[i].shape
    );

    deck.trihexes[i].hexes[0] = Provable.if(
      Field(i).greaterThanOrEqual(Field(Math.floor(TRIHEX_DECK_SIZE / 2))),
      UInt64.from(1),
      UInt64.from(3)
    );
    deck.trihexes[i].hexes[1] = Provable.if(
      Field(i).greaterThanOrEqual(Field(Math.floor(TRIHEX_DECK_SIZE / 2))),
      UInt64.from(2),
      UInt64.from(3)
    );
    deck.trihexes[i].hexes[2] = Provable.if(
      Field(i).greaterThanOrEqual(Field(Math.floor(TRIHEX_DECK_SIZE / 2))),
      UInt64.from(2),
      UInt64.from(3)
    );
  }
  return deck;
}

export function generateTileMapBySeed(seed: Field): TileMap {
  const tilemap = TileMap.empty();
  const generator = RandomGenerator.from(seed);
  const tiles = tilemap.tiles;
  let hillsPlaced = 0;
  for (let r = 0; r < 2 * GRID_SIZE + 1; r++) {
    for (let c = 0; c < 2 * GRID_SIZE + 1; c++) {
      if (c + r < GRID_SIZE || c + r > GRID_SIZE * 3) {
        tiles[r][c].isEmpty = Bool(false);
      }
      if (r === 0 && c === GRID_SIZE) {
        tiles[r][c].tileType = UInt64.from(6);
      }
      if (r === GRID_SIZE && c === 0) {
        tiles[r][c].tileType = UInt64.from(6);
      }
      if (r === GRID_SIZE && c === GRID_SIZE * 2) {
        tiles[r][c].tileType = UInt64.from(6);
      }
      if (r === GRID_SIZE * 2 && c === 0) {
        tiles[r][c].tileType = UInt64.from(6);
      }
      if (r === GRID_SIZE * 2 && c === GRID_SIZE) {
        tiles[r][c].tileType = UInt64.from(6);
      }
      if (r === GRID_SIZE && c === GRID_SIZE) {
        tiles[r][c].tileType = UInt64.from(5);
      }
    }
  }
  return tilemap;
}

export function loadGameContext(
  trihexDeck: TriHexDeck,
  tilemap: TileMap,
  debug: Bool
) {
  const score = UInt64.zero;
  const totalLeft = UInt64.from(TRIHEX_DECK_SIZE);

  return new GameContext({
    trihexDeck,
    tilemap,
    score,
    winnable: new Bool(true),
    alreadyWon: new Bool(false),
    totalLeft,
    debug,
  });
}
