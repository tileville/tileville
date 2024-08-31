import { Field, Provable, Struct, Bool, UInt64, Int64, provable } from 'o1js';
import { RandomGenerator } from '../engine/Random';
import {
  GameInput,
  Position,
  Tile,
  TileMap,
  TriHex,
  TriHexDeck,
} from '../types';
import {
  GRID_SIZE,
  ShapePatternsId,
  ShapePatternsSymbol,
  TRIHEX_DECK_SIZE,
  TileType,
  allRotations,
  allShapes,
  shapeSet1,
  shapeSet2,
  shapeSet3,
} from '../constants';
import { Queue } from '../utility';

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
    // let moveScore = this.placeTrihex(input.pos, input.trihex);
    // // let moveScore = Int64.from(1);
    // this.score = Provable.if(
    //   this.alreadyWon,
    //   this.score,
    //   this.score.add(moveScore.magnitude)
    // );
    // this.score = Provable.if(this.alreadyWon, this.score, UInt64.from(1));
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

  // canPlaceShape(shape: UInt64): Bool {
  //   const shapeSymbol = ShapePatternsSymbol[shape.toString()];
  //   const rotations = allRotations[shapeSymbol];
  //   let canPlaceShape = Bool(false);
  //   for (let r = 0; r < 2 * GRID_SIZE + 1; r++) {
  //     for (let c = 0; c < 2 * GRID_SIZE + 1; c++) {
  //       for (
  //         let rotationIdx = 0;
  //         rotationIdx < rotations.length;
  //         rotationIdx++
  //       ) {
  //         const rotation = rotations[rotationIdx];
  //         const offsets = allShapes[rotation];
  //         let canPlaceForThisRotation = Bool(true);
  //         for (let offsetIdx = 0; offsetIdx < offsets.length; offsetIdx++) {
  //           const offset = offsets[offsetIdx];
  //           const tile = this.tilemap.tiles[r][c];
  //           const r1 = Number(tile.pos.x) + offset.ro;
  //           const c1 = Number(tile.pos.y) + offset.co;

  //           canPlaceForThisRotation = Provable.if(
  //             this.tilemap.tiles[r1][c1].tileType.equals(UInt64.one).not(),
  //             Bool(false),
  //             canPlaceForThisRotation
  //           );
  //         }
  //         canPlaceShape = canPlaceShape.or(canPlaceForThisRotation);
  //       }
  //     }
  //   }
  //   return canPlaceShape;
  // }

  // placeTrihex(pos: Position, trihex: TriHex): Int64 {
  //   console.log('==== place trihex data ====', JSON.stringify({ pos, trihex }));
  //   let touching = Bool(false);
  //   const offsets = allShapes[ShapePatternsSymbol[Number(trihex.shape)]];
  //   const r = Number(pos.x);
  //   const c = Number(pos.y);
  //   let trihexScore = Int64.zero;

  //   const hexTiles: Tile[] = [];
  //   for (let offsetIdx = 0; offsetIdx < 3; offsetIdx++) {
  //     const offset = offsets[offsetIdx];
  //     const tile = this.tilemap.tiles[r + offset.ro][c + offset.co];
  //     hexTiles.push(tile);
  //     const neighborTiles = this.neighbors(r + offset.ro, c + offset.co);
  //     // Check if trihex tiles are touching to already placed tiles, if yes, we can place this trihex
  //     for (let i = 0; i < neighborTiles.length; i++) {
  //       const neighborTile = neighborTiles[i];
  //       // console.log("neighborTile", neighborTile)
  //       touching = Provable.if(
  //         Bool(!!neighborTile),
  //         Provable.if(neighborTile.isEmpty, Bool(true), touching),
  //         touching
  //       );
  //     }
  //   }
  //   console.log(
  //     'touching',
  //     touching.toString(),
  //     hexTiles[0].tileType.toString(),
  //     hexTiles[1].tileType.toString(),
  //     hexTiles[2].tileType.toString()
  //   );

  //   const isPlaceable = touching
  //     .and(Bool(!!hexTiles[0]))
  //     .and(Bool(!!hexTiles[1]))
  //     .and(Bool(!!hexTiles[2]))
  //     .and(hexTiles[0].tileType.equals(UInt64.one))
  //     .and(hexTiles[1].tileType.equals(UInt64.one))
  //     .and(hexTiles[2].tileType.equals(UInt64.one));

  //   console.log('is placeable', isPlaceable.toString());

  //   for (let i = 0; i < 3; i++) {
  //     hexTiles[i].tileType = Provable.if(
  //       isPlaceable,
  //       trihex.hexes[i],
  //       hexTiles[i].tileType
  //     );

  //     console.log(
  //       'get points for tile',
  //       hexTiles[i].tileType.toString(),
  //       hexTiles[i].pos.x.toString(),
  //       hexTiles[i].pos.y.toString()
  //     );
  //     trihexScore = trihexScore.add(
  //       Provable.if(isPlaceable, this.getPointsFor(hexTiles[i]), Int64.zero)
  //     );
  //   }

  //   return trihexScore;
  // }

  // getPointsFor(tile: Tile): Int64 {
  //   // let result = Int64.zero
  //   let isCounted = Bool(tile.counted);
  //   let isTileTypeWindMill = Bool(tile.tileType.equals(TileType.WindMill));
  //   let isTileTypeTree = Bool(tile.tileType.equals(TileType.Tree));
  //   let isTileTypeRoad = Bool(tile.tileType.equals(TileType.Road));

  //   console.log('is tile type tree', isTileTypeTree.toString());
  //   // let points = Provable.if(isCounted, Int64.zero, Provable.if(isTileTypeWindMill, this.getPointsForWindmillTile(tile), Provable.if(isTileTypeTree, this.getPointsForTree(tile),Int64.zero)))
  //   let points = Provable.if(
  //     isCounted,
  //     Int64.zero,
  //     Provable.if(
  //       isTileTypeWindMill,
  //       this.getPointsForWindmillTile(tile),
  //       Int64.zero
  //     )
  //   );
  //   return points;
  // }

  // getPointsForWindmillTile(tile: Tile): Int64 {
  //   let isolated = Bool(true);
  //   let neighbors = this.neighbors(Number(tile.pos.x), Number(tile.pos.y));
  //   let score = Int64.from(0);

  //   for (const n of neighbors) {
  //     let isTileTypeWindMill = n.tileType.equals(TileType.WindMill);
  //     let isCounted = Bool(n.counted);
  //     n.counted = Provable.if(isCounted, Bool(false), n.counted);
  //     isolated = Provable.if(isTileTypeWindMill, Bool(false), isolated);
  //     let s = Provable.if(
  //       isTileTypeWindMill.and(isCounted),
  //       Provable.if(tile.isHill, Int64.from('-3'), Int64.from('-1')),
  //       Int64.zero
  //     );
  //     score.add(s);
  //   }

  //   let s = Provable.if(
  //     isolated,
  //     Provable.if(tile.isHill, Int64.from('3'), Int64.from('1')),
  //     Int64.zero
  //   );
  //   tile.counted = Provable.if(isolated, Bool(true), tile.counted);
  //   score = score.add(s);
  //   // console.log("windmill score", score.magnitude.toString())
  //   return score;
  // }

  // getPointsForTree(tile: Tile): Int64 {
  //   console.log(
  //     'get points for Tree tile',
  //     tile.pos.x.toString(),
  //     tile.pos.y.toString()
  //   );
  //   let group = this.getConnected(tile);
  //   let score = Int64.zero;
  //   let unAccountedParks = [];
  //   console.log('group length', group.length);
  //   for (const park of group) {
  //     console.log('park in group', park.counted.toString());
  //     Provable.if(
  //       park.counted.not(),
  //       Field(unAccountedParks.push(park)),
  //       Field(0)
  //     );
  //   }

  //   console.log('unaccounted park length', unAccountedParks.length);
  //   while (unAccountedParks.length >= 3) {
  //     const newParks = unAccountedParks.splice(0, 3);
  //     newParks[0].counted = Bool(true);
  //     newParks[1].counted = Bool(true);
  //     newParks[2].counted = Bool(true);
  //     score = score.add(Int64.from(5));
  //   }
  //   console.log('tree score', score.toString());
  //   return score;
  // }
  // getPointsForRoad(tile: Tile): Int64 {
  //   let isolated = Bool(true);
  //   let neighbors = this.neighbors(Number(tile.pos.x), Number(tile.pos.y));
  //   let score = Int64.from(0);

  //   for (const n of neighbors) {
  //     let isTileTypeWindMill = n.tileType.equals(TileType.WindMill);
  //     let isCounted = Bool(n.counted);
  //     n.counted = Provable.if(isCounted, Bool(false), n.counted);
  //     isolated = Provable.if(isTileTypeWindMill, Bool(false), isolated);
  //     let s = Provable.if(
  //       isTileTypeWindMill.and(isCounted),
  //       Provable.if(tile.isHill, Int64.from('-3'), Int64.from('-1')),
  //       Int64.zero
  //     );
  //     score.add(s);
  //   }

  //   let s = Provable.if(
  //     isolated,
  //     Provable.if(tile.isHill, Int64.from('3'), Int64.from('1')),
  //     Int64.zero
  //   );
  //   tile.counted = Provable.if(isolated, Bool(true), tile.counted);
  //   score = score.add(s);
  //   // console.log("windmill score", score.magnitude.toString())
  //   return score;
  // }

  // neighbors(row: number, col: number): Tile[] {
  //   // let isRightBound = this.isInBoundry(row, col + 1)
  //   // let isTopRightBound = this.isInBoundry(row-1, col-1);
  //   // let isTopBound = this.isInBoundry(row-1, col+1);
  //   // let isLeftBound = this.isInBoundry(row, col-1)
  //   // let isBottomLeftBound = this.isInBoundry(row+1, col-1);
  //   // let isBottomBound = this.isInBoundry(row+1, col);

  //   // let tiles:Tile[] = [];

  //   // Provable.if(isRightBound, Field(tiles.push(this.tilemap.tiles[row]?.[col+1])), Field(0))
  //   // Provable.if(isTopRightBound, Field(tiles.push(this.tilemap.tiles[row-1]?.[col-1])), Field(0))
  //   // Provable.if(isTopBound, Field(tiles.push(this.tilemap.tiles[row-1]?.[col+1])), Field(0))
  //   // Provable.if(isLeftBound, Field(tiles.push(this.tilemap.tiles[row]?.[col-1])), Field(0))
  //   // Provable.if(isBottomLeftBound, Field(tiles.push(this.tilemap.tiles[row+1]?.[col-1])), Field(0))
  //   // Provable.if(isBottomBound, Field(tiles.push(this.tilemap.tiles[row+1]?.[col])), Field(0))

  //   // tiles = tiles.filter(tile => tile !== undefined)
  //   // console.log("neighbour tiles length", tiles.length)
  //   // return tiles

  //   return [
  //     this.tilemap.tiles[row]?.[col + 1],
  //     this.tilemap.tiles[row - 1]?.[col + 1],
  //     this.tilemap.tiles[row - 1]?.[col],
  //     this.tilemap.tiles[row]?.[col - 1],
  //     this.tilemap.tiles[row + 1]?.[col - 1],
  //     this.tilemap.tiles[row + 1]?.[col],
  //   ].filter((tile) => tile !== undefined);
  // }

  // getConnected(tile1: Tile): Tile[] {
  //   const connectedTiles = [];
  //   const visited = new Set<Tile>();
  //   const queue = new Queue<Tile>();
  //   queue.enq(tile1);

  //   while (queue.size() > 0) {
  //     const tile = queue.deq() as Tile;
  //     console.log('visted set', Array.from(visited));
  //     console.log('tile', tile.pos.x.toString(), tile.pos.y.toString());
  //     if (!visited.has(tile)) connectedTiles.push(tile);
  //     visited.add(tile);
  //     const neighbors = this.neighbors(Number(tile.pos.x), Number(tile.pos.y));
  //     console.log('tile neigbors', neighbors.length);
  //     for (const n of neighbors) {
  //       let condition = n.tileType
  //         .equals(tile.tileType)
  //         .or(
  //           tile.tileType
  //             .equals(TileType.Road)
  //             .and(n.tileType.equals(TileType.Castle))
  //         )
  //         .and(Bool(!visited.has(n)));
  //       console.log('n', n.pos.x.toString(), n.pos.y.toString());
  //       console.log(
  //         'condition',
  //         condition,
  //         n.tileType.toString(),
  //         tile.tileType.toString()
  //       );
  //       Provable.if(condition, Field(queue.enq(n)), Field(0));
  //     }
  //   }
  //   return connectedTiles;
  // }

  // isInBoundry(row: number, col: number): Bool {
  //   return Bool(
  //     row >= 0 && row < 2 * GRID_SIZE + 1 && col >= 0 && col < 2 * GRID_SIZE + 1
  //   );
  // }
}

export function createTrihexDeckBySeed(seed: Field): TriHexDeck {
  const generator = RandomGenerator.from(seed);
  const deck = TriHexDeck.empty();
  for (let i = 0; i < TRIHEX_DECK_SIZE; i++) {
    deck.trihexes[i].shape = Provable.if(
      Field(i).greaterThanOrEqual(Field(Math.floor(TRIHEX_DECK_SIZE / 3))),
      shapeSet2[Number(generator.getNumber(shapeSet2.length).magnitude)],
      shapeSet3[Number(generator.getNumber(shapeSet3.length).magnitude)]
    );

    deck.trihexes[i].shape = Provable.if(
      Field(i).greaterThanOrEqual(
        Field(Math.floor((TRIHEX_DECK_SIZE * 2) / 3))
      ),
      shapeSet1[Number(generator.getNumber(shapeSet1.length).magnitude)],
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
        tiles[r][c].tileType = UInt64.from(TileType.Empty);
      }
      if (r === GRID_SIZE && c === 0) {
        tiles[r][c].tileType = UInt64.from(TileType.Empty);
      }
      if (r === GRID_SIZE && c === GRID_SIZE * 2) {
        tiles[r][c].tileType = UInt64.from(TileType.Empty);
      }
      if (r === GRID_SIZE * 2 && c === 0) {
        tiles[r][c].tileType = UInt64.from(TileType.Empty);
      }
      if (r === GRID_SIZE * 2 && c === GRID_SIZE) {
        tiles[r][c].tileType = UInt64.from(TileType.Empty);
      }
      if (r === GRID_SIZE && c === GRID_SIZE) {
        tiles[r][c].tileType = UInt64.from(TileType.Castle);
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
