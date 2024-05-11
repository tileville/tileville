import 'reflect-metadata';
import { TestingAppChain } from '@proto-kit/sdk';
import { dummyBase64Proof } from 'o1js/dist/node/lib/proof_system';
import { Pickles } from 'o1js/dist/node/snarky';
import {
  GameElementsGenerationProof,
  GameProcessProof,
  GameRecordProof,
  MinapolisGameHub,
  checkGameElementsGeneration,
  checkGameRecord,
  initGameProcess,
  processMove,
} from '../src/MinapolisGameHub';
import { Field, PrivateKey, UInt64 } from 'o1js';
import { getDefaultCompetitions } from '../src/levels';
import { GameInput, GameRecordKey, Position, TriHex } from '../src/types';
import { ShapePatternsId } from '../src/constants';

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

describe('minapolis game hub', () => {
  let appChain: ReturnType<
    typeof TestingAppChain.fromRuntime<{
      MinapolisGameHub: typeof MinapolisGameHub;
    }>
  >;
  let gameHub: MinapolisGameHub;
  const satyamPrivateKey = PrivateKey.random();
  const satyam = satyamPrivateKey.toPublicKey();

  beforeAll(async () => {
    appChain = TestingAppChain.fromRuntime({
      MinapolisGameHub,
    });

    appChain.configurePartial({
      Runtime: {
        MinapolisGameHub: {},
        Balances: {},
      },
    });

    await appChain.start();
    appChain.setSigner(satyamPrivateKey);
    gameHub = appChain.runtime.resolve('MinapolisGameHub');
  });

  test.skip('Log proof', async () => {
    console.log(await dummyBase64Proof());
  });

  test('create competition', async () => {
    const playerMoveCount = 5;
    const defaultCompetitions = getDefaultCompetitions();

    for (const competition of defaultCompetitions) {
      const tx = await appChain.transaction(satyam, () => {
        gameHub.createCompetition(competition);
      });
      await tx.sign();
      await tx.send();
      await appChain.produceBlock();

      const playerInputs = [];
      for (let i = 0; i < playerMoveCount; i++) {
        const playerInput = new GameInput({
          pos: Position.zero(),
          trihex: TriHex.empty(),
        });
        playerInputs.push(playerInput);
      }

      const currentCompetition = defaultCompetitions[0];

      const gameContext = checkGameElementsGeneration(
        Field.from(currentCompetition.seed)
      );

      const gameElementGenerationProof = await mockProof(
        gameContext,
        GameElementsGenerationProof
      );

      let currentGameState = initGameProcess(gameContext);
      let currentGameStateProof = await mockProof(
        currentGameState,
        GameProcessProof
      );

      // TODO: run this for multiple player moves
      for (let i = 0; i < playerMoveCount; i++) {
        currentGameState = processMove(currentGameStateProof, playerInputs[i]);
        currentGameStateProof = await mockProof(
          currentGameState,
          GameProcessProof
        );
      }

      const checkGameRecordOut = checkGameRecord(
        gameElementGenerationProof,
        currentGameStateProof
      );
      const gameRecordProof = await mockProof(
        checkGameRecordOut,
        GameRecordProof
      );

      // Finally send the transaction to appchain 😁
      const tx1 = await appChain.transaction(satyam, () => {
        gameHub.addGameResult(UInt64.zero, gameRecordProof);
      });

      await tx1.sign();
      await tx1.send();
      await appChain.produceBlock();
      const lastSeed =
        (await appChain.query.runtime.MinapolisGameHub.lastSeed.get()) ??
        UInt64.zero;
      const gameRecordKey: GameRecordKey = new GameRecordKey({
        competitionId: lastSeed,
        player: satyam,
      });
      console.log('game record key', gameRecordKey);
      const userScore =
        await appChain.query.runtime.MinapolisGameHub.gameRecords.get(
          gameRecordKey
        );
      console.log('player score', userScore?.toBigInt());
    }
  });

  describe.only('Trihex deck', () => {
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

  describe('Can place Trihex', () => {
    
  })
});
