import { Bool, ZkProgram, Field, SelfProof, Struct, UInt64 } from 'o1js';
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

export async function  checkGameElementsGeneration(seed: Field): Promise<GameContext> {
  const trihexDeck = createTrihexDeckBySeed(seed);
  const tilemap = generateTileMapBySeed(seed);
  return loadGameContext(trihexDeck, tilemap, Bool(false));
}

export const GameElementsGeneration = ZkProgram({
  publicInput: Field,
  publicOutput: GameContext,
  name: 'GameElementsGeneration',
  methods: {
    checkGameElementsGeneration: {
      privateInputs: [TriHexDeck, TileMap],
      method: checkGameElementsGeneration,
    },
  },
});

export class GameElementsGenerationProof extends ZkProgram.Proof(
  GameElementsGeneration
) {}

export async function initGameProcess(initial: GameContext): Promise<GameProcessPublicOutput> {
  return new GameProcessPublicOutput({
    initialState: initial,
    currentState: initial,
  });
}

export async function processMove(
  prevProof: SelfProof<void, GameProcessPublicOutput>,
  input: GameInput
): Promise<GameProcessPublicOutput> {
  prevProof.verify();

  const gameContext = prevProof.publicOutput.currentState;
  gameContext.processMove(input);

  return new GameProcessPublicOutput({
    initialState: prevProof.publicOutput.initialState,
    currentState: gameContext,
  });
}

export const GameProcess = ZkProgram({
  publicOutput: GameProcessPublicOutput,
  name: 'GameProcess',
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

export class GameProcessProof extends ZkProgram.Proof(
  GameProcess
) {}

export async function checkGameRecord(
  gameElementGenerationProof: GameElementsGenerationProof,
  gameProcessProof: GameProcessProof
): Promise<GameRecordPublicOutput> {
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

export const GameRecord = ZkProgram({
  publicOutput: GameRecordPublicOutput,
  name: 'GameRecord',
  methods: {
    checkGameRecord: {
      privateInputs: [GameElementsGenerationProof, GameProcessProof],
      method: checkGameRecord,
    },
  },
});

export class GameRecordProof extends ZkProgram.Proof(GameRecord) {}

@runtimeModule()
export class MinapolisGameHub extends GameHub<
  undefined,
  GameRecordPublicOutput,
  GameRecordProof
> {
  @runtimeMethod()
  public async addGameResult(
    competitionId: UInt64,
    gameRecordProof: GameRecordProof
  ): Promise<void> {
    super.addGameResult(competitionId, gameRecordProof);
  }
}
