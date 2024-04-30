import { Struct, UInt64 } from "o1js";
import { GameContext } from "./GameContext";


export class GameRecordPublicOutput extends Struct({
  score: UInt64
}) {}

export class GameProcessPublicOutput extends Struct({
  initialState: GameContext,
  currentState: GameContext
}) {

}

