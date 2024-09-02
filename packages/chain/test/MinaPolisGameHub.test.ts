import 'reflect-metadata';
import { TestingAppChain } from '@proto-kit/sdk';
import { dummyBase64Proof } from 'o1js/dist/node/lib/proof-system/zkprogram';
import { Pickles } from 'o1js/dist/node/snarky';
import {
  GameElementsGenerationProof,
  GameProcessProof,
  GameRecordProof,
  TilevilleGameHub,
  checkGameElementsGeneration,
  checkGameRecord,
  initGameProcess,
  processMove,
} from '../src/runtime/TilevilleGameHub';
import { Field, PrivateKey, UInt64 } from 'o1js';
import { getDefaultCompetitions } from '../src/levels';
import { GameRecordKey, TriHex } from '../src/types';
import { ShapePatternsId } from '../src/constants';
import {
  GAME_INPUTS_MOCK,
  TREE_GAME_INPUT_MOCK,
  WINDMILL_GAME_INPUT_MOCK,
} from './mockData';

export async function mockProof<O, P>(
  publicOutput: O,
  ProofType: new ({
    proof,
    publicInput,
    publicOutput,
    maxProofsVerified,
  }: {
    proof: unknown;
    publicInput: any;
    publicOutput: any;
    maxProofsVerified: 0 | 2 | 1;
  }) => P
): Promise<P> {
  const [, proof] = Pickles.proofOfBase64(await dummyBase64Proof(), 2);
  return new ProofType({
    proof: proof,
    maxProofsVerified: 2,
    publicInput: undefined,
    publicOutput,
  });
}

describe('Minapolis game hub', () => {
  let appChain: ReturnType<
    typeof TestingAppChain.fromRuntime<{
      TilevilleGameHub: typeof TilevilleGameHub;
    }>
  >;
  let gameHub: TilevilleGameHub;
  const satyamPrivateKey = PrivateKey.random();
  const satyam = satyamPrivateKey.toPublicKey();

  beforeAll(async () => {
    appChain = TestingAppChain.fromRuntime({
      TilevilleGameHub,
    });

    appChain.configurePartial({
      Runtime: {
        TilevilleGameHub: {},
        Balances: {},
      },
    });

    await appChain.start();
    appChain.setSigner(satyamPrivateKey);
    gameHub = appChain.runtime.resolve('TilevilleGameHub');
  });

  test.skip('should log proof', async () => {
    const dummyProof = await dummyBase64Proof();
    expect(dummyProof.length).toBeGreaterThan(0);
  }, 100_000);

  test('Should create competition and place tiles', async () => {
    console.log('hello');
    const playerMoveCount = 1;
    const defaultCompetitions = getDefaultCompetitions();
    const competition = defaultCompetitions[0];

    const tx = await appChain.transaction(satyam, async () => {
      await gameHub.createCompetition(competition);
    });
    await tx.sign();
    await tx.send();
    await appChain.produceBlock();

    console.log('app chain block produced');
    const playerInputs = [];
    for (let i = 0; i < playerMoveCount; i++) {
      playerInputs.push(GAME_INPUTS_MOCK[i]);
    }

    const currentCompetition = defaultCompetitions[0];

    const gameContext = await checkGameElementsGeneration(
      Field.from(currentCompetition.seed)
    );

    console.log('game context created');
    // const gameElementGenerationProof = await mockProof(
    //   gameContext,
    //   GameElementsGenerationProof
    // );
    // console.log('game element mock proof generated');

    // let currentGameState = await initGameProcess(gameContext);
    // let currentGameStateProof = await mockProof(
    //   currentGameState,
    //   GameProcessProof
    // );

    // console.log('current game state proof');

    // // TODO: run this for multiple player moves
    // for (let i = 0; i < playerMoveCount; i++) {
    //   currentGameState = await processMove(
    //     currentGameStateProof,
    //     playerInputs[i]
    //   );
    //   currentGameStateProof = await mockProof(
    //     currentGameState,
    //     GameProcessProof
    //   );
    // }

    // console.log('process move executed');

    // const checkGameRecordOut = await checkGameRecord(
    //   gameElementGenerationProof,
    //   currentGameStateProof
    // );

    // const gameRecordProof = await mockProof(
    //   checkGameRecordOut,
    //   GameRecordProof
    // );

    // // Finally send the transaction to appchain 😁
    // const tx1 = await appChain.transaction(satyam, async () => {
    //   await gameHub.addGameResult(UInt64.zero, gameRecordProof);
    // });

    // await tx1.sign();
    // await tx1.send();
    // await appChain.produceBlock();
    // const lastSeed =
    //   (await appChain.query.runtime.TilevilleGameHub.lastSeed.get()) ??
    //   UInt64.zero;
    // const gameRecordKey: GameRecordKey = new GameRecordKey({
    //   competitionId: lastSeed,
    //   player: satyam,
    // });
    // console.log('game record key', gameRecordKey);
    // const userScore =
    //   await appChain.query.runtime.TilevilleGameHub.gameRecords.get(
    //     gameRecordKey
    //   );
    // expect(userScore).toEqual(1n);
  }, 100_000);

  test.skip('place windmill tiles', async () => {
    const defaultCompetitions = getDefaultCompetitions();
    const competition = defaultCompetitions[0];

    const tx = await appChain.transaction(satyam, async () => {
      gameHub.createCompetition(competition);
    });
    await tx.sign();
    await tx.send();
    await appChain.produceBlock();

    const currentCompetition = defaultCompetitions[0];

    const gameContext = await checkGameElementsGeneration(
      Field.from(currentCompetition.seed)
    );

    const gameElementGenerationProof = await mockProof(
      gameContext,
      GameElementsGenerationProof
    );

    let currentGameState = await initGameProcess(gameContext);
    let currentGameStateProof = await mockProof(
      currentGameState,
      GameProcessProof
    );

    currentGameState = await processMove(
      currentGameStateProof,
      WINDMILL_GAME_INPUT_MOCK
    );
    currentGameStateProof = await mockProof(currentGameState, GameProcessProof);

    const checkGameRecordOut = await checkGameRecord(
      gameElementGenerationProof,
      currentGameStateProof
    );
    const gameRecordProof = await mockProof(
      checkGameRecordOut,
      GameRecordProof
    );

    // Finally send the transaction to appchain 😁
    const tx1 = await appChain.transaction(satyam, async () => {
      await gameHub.addGameResult(UInt64.zero, gameRecordProof);
    });

    await tx1.sign();
    await tx1.send();
    await appChain.produceBlock();
    const lastSeed =
      (await appChain.query.runtime.TilevilleGameHub.lastSeed.get()) ??
      UInt64.zero;
    const gameRecordKey: GameRecordKey = new GameRecordKey({
      competitionId: lastSeed,
      player: satyam,
    });
    console.log('game record key', gameRecordKey);
    const userScore =
      await appChain.query.runtime.TilevilleGameHub.gameRecords.get(
        gameRecordKey
      );
    console.log('player score for windmill', userScore?.toBigInt());
    expect(userScore?.toBigInt()).toBe(1n);
  }, 100_000);

  test.skip('Place tree tiles', async () => {
    const defaultCompetitions = getDefaultCompetitions();
    const competition = defaultCompetitions[0];

    const tx = await appChain.transaction(satyam, async () => {
      gameHub.createCompetition(competition);
    });
    await tx.sign();
    await tx.send();
    await appChain.produceBlock();

    const currentCompetition = defaultCompetitions[0];

    const gameContext = await checkGameElementsGeneration(
      Field.from(currentCompetition.seed)
    );

    const gameElementGenerationProof = await mockProof(
      gameContext,
      GameElementsGenerationProof
    );

    let currentGameState = await initGameProcess(gameContext);
    let currentGameStateProof = await mockProof(
      currentGameState,
      GameProcessProof
    );

    currentGameState = await processMove(
      currentGameStateProof,
      TREE_GAME_INPUT_MOCK
    );
    currentGameStateProof = await mockProof(currentGameState, GameProcessProof);

    const checkGameRecordOut = await checkGameRecord(
      gameElementGenerationProof,
      currentGameStateProof
    );
    const gameRecordProof = await mockProof(
      checkGameRecordOut,
      GameRecordProof
    );

    // Finally send the transaction to appchain 😁
    const tx1 = await appChain.transaction(satyam, async () => {
      await gameHub.addGameResult(UInt64.zero, gameRecordProof);
    });

    await tx1.sign();
    await tx1.send();
    await appChain.produceBlock();
    const lastSeed =
      (await appChain.query.runtime.TilevilleGameHub.lastSeed.get()) ??
      UInt64.zero;
    const gameRecordKey: GameRecordKey = new GameRecordKey({
      competitionId: lastSeed,
      player: satyam,
    });
    console.log('game record key', gameRecordKey);
    const userScore =
      await appChain.query.runtime.TilevilleGameHub.gameRecords.get(
        gameRecordKey
      );
    console.log('player score for tree', userScore?.toBigInt());
    expect(userScore?.toBigInt()).toEqual(5n);
  }, 100_000);

  describe.skip('Trihex deck', () => {
    test('should rotate right with v shape', () => {
      const trihex = new TriHex({
        shape: ShapePatternsId['a'],
        hexes: [UInt64.zero, UInt64.zero, UInt64.zero],
      });

      trihex.rotateRight();
      expect(trihex.shape.toBigInt()).toEqual(ShapePatternsId['v'].toBigInt());
    });

    test('should rotate right with a shape', async () => {
      const trihex = new TriHex({
        shape: ShapePatternsId['v'],
        hexes: [UInt64.zero, UInt64.zero, UInt64.zero],
      });

      trihex.rotateRight();
      expect(trihex.shape.toBigInt()).toEqual(ShapePatternsId['a'].toBigInt());
    });
  });
});
