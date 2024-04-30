import { Bool, Experimental, Field, SelfProof, Struct, UInt64 } from 'o1js';
import {
  GameContext,
  createTrihexDeckBySeed,
  generateTileMapBySeed,
  loadGameContext,
} from './GameContext';
import { GameInput, TileMap, TriHexDeck } from './types';

export class GameRecordPublicOutput extends Struct({
  score: UInt64,
}) {}

export class GameProcessPublicOutput extends Struct({
  initialState: GameContext,
  currentState: GameContext,
}) {}

export function checkGameElementsGeneration(seed: Field): GameContext {
  const trihexDeck = createTrihexDeckBySeed(seed);
  const tilemap = generateTileMapBySeed(seed);
  return loadGameContext(trihexDeck, tilemap, Bool(false));
}

export const GameElementsGeneration = Experimental.ZkProgram({
  publicInput: Field,
  publicOutput: GameContext,
  methods: {
    checkGameElementsGeneration: {
      privateInputs: [TriHexDeck, TileMap],
      method: checkGameElementsGeneration,
    },
  },
});

export class GameElementsGenerationProof extends Experimental.ZkProgram.Proof(
  GameElementsGeneration
) {}

export function initGameProcess(initial: GameContext): GameProcessPublicOutput {
  return new GameProcessPublicOutput({
    initialState: initial,
    currentState: initial,
  });
}

export function processMove(
  prevProof: SelfProof<void, GameProcessPublicOutput>,
  input: GameInput
): GameProcessPublicOutput {
  prevProof.verify();

  const gameContext = prevProof.publicOutput.currentState;
  gameContext.processMove(input);

  return new GameProcessPublicOutput({
    initialState: prevProof.publicOutput.initialState,
    currentState: gameContext,
  });
}
