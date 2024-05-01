import { Bool, Experimental, Field, SelfProof, Struct, UInt64 } from 'o1js';
import {
  GameContext,
  createTrihexDeckBySeed,
  generateTileMapBySeed,
  loadGameContext,
} from './GameContext';
import { GameInput, TileMap, TriHexDeck } from './types';
import { GameHub } from './GameHub';
import { runtimeMethod, runtimeModule } from '@proto-kit/module';

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

export const GameProcess = Experimental.ZkProgram({
  publicOutput: GameProcessPublicOutput,
  methods: {
    init: {
      privateInputs: [GameContext],
      method: initGameProcess,
    },
    processMove: {
      privateInputs: [SelfProof, GameInput],
      method: processMove,
    },
  },
});

export class GameProcessProof extends Experimental.ZkProgram.Proof(
  GameProcess
) {}

export function checkGameRecord(
  gameElementGenerationProof: GameElementsGenerationProof,
  gameProcessProof: GameProcessProof
): GameRecordPublicOutput {
  // Verify Trihex deck and tilemap generation
  gameElementGenerationProof.verify();

  gameElementGenerationProof.publicOutput
    .equals(gameProcessProof.publicOutput.initialState)
    .assertTrue();

  gameProcessProof.verify();

  //TODO: Write assertion to check if game is won

  // Get Score
  return new GameRecordPublicOutput({
    score: gameProcessProof.publicOutput.currentState.score,
  });
}

export const GameRecord = Experimental.ZkProgram({
  publicOutput: GameRecordPublicOutput,
  methods: {
    checkGameRecord: {
      privateInputs: [GameElementsGenerationProof, GameProcessProof],
      method: checkGameRecord,
    },
  },
});

export class GameRecordProof extends Experimental.ZkProgram.Proof(GameRecord) {}

@runtimeModule()
export class MinapolisGameHub extends GameHub<
  undefined,
  GameRecordPublicOutput,
  GameRecordProof
> {
  @runtimeMethod()
  public addGameResult(
    competitionId: UInt64,
    gameRecordProof: GameRecordProof
  ): void {
    super.addGameResult(competitionId, gameRecordProof);
  }
}
