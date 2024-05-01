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
import { GameInput, TileMap, TriHexDeck } from './types';
import { GRID_SIZE, TRIHEX_DECK_SIZE } from './constants';

const shapeSet1 = ['c', 'r', 'n', 'd', 'j', 'k'];
const shapeSet2 = ['/', '-', '\\'];
const shapeSet3 = ['a', 'v'];

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
      CircuitString.fromString(
        shapeSet2[Number(generator.getNumber(shapeSet2.length))]
      ),
      CircuitString.fromString(
        shapeSet3[Number(generator.getNumber(shapeSet3.length))]
      )
    );

    deck.trihexes[i].shape = Provable.if(
      Field(i).greaterThanOrEqual(
        Field(Math.floor((TRIHEX_DECK_SIZE * 2) / 3))
      ),
      CircuitString.fromString(
        shapeSet1[Number(generator.getNumber(shapeSet1.length))]
      ),
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
