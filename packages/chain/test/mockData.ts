import { UInt64 } from "o1js";
import { GRID_SIZE, ShapePatternsId, TileType } from "../src/constants";
import { GameInput, Position, TriHex } from "../src/types";

export const GAME_INPUTS_MOCK = [
  new GameInput({
    pos: new Position({
      x: UInt64.from(GRID_SIZE),
      y: UInt64.from(GRID_SIZE+1)
    }),
    trihex: new TriHex({
      shape: ShapePatternsId["\\"],
      hexes: [TileType.WindMill,TileType.WindMill,TileType.WindMill,]
    })
  })
]

export const WINDMILL_GAME_INPUT_MOCK = new GameInput({
  pos: new Position({
    x: UInt64.from(GRID_SIZE),
    y: UInt64.from(GRID_SIZE+1)
  }),
  trihex: new TriHex({
    shape: ShapePatternsId["\\"],
    hexes: [TileType.WindMill,TileType.WindMill,TileType.WindMill,]
  })
})