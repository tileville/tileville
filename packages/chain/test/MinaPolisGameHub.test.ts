import { TestingAppChain } from '@proto-kit/sdk';
import { dummyBase64Proof } from 'o1js/dist/node/lib/proof_system';
import { Pickles } from 'o1js/dist/node/snarky';
import {
  GameElementsGenerationProof,
  MinapolisGameHub,
  checkGameElementsGeneration,
} from '../src/MinapolisGameHub';
import { Field, PrivateKey } from 'o1js';
import { getDefaultCompetitions } from '../src/levels';
import { GameInput, Position, TriHex } from '../src/types';

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
    const defaultCompetitions = getDefaultCompetitions();

    for (const competition of defaultCompetitions) {
      const tx = await appChain.transaction(satyam, () => {
        gameHub.createCompetition(competition);
      });
      await tx.sign();
      await tx.send();
      await appChain.produceBlock();

      const playerMove = new GameInput({
        pos: Position.zero(),
        trihex: TriHex.empty(),
      });

      const currentCompetition = defaultCompetitions[0];

      const gameContext = checkGameElementsGeneration(
        Field.from(currentCompetition.seed)
      );

      const gameElementGenerationProof = await mockProof(
        gameContext,
        GameElementsGenerationProof
      );
    }
  });
});
