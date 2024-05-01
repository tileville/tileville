import { TestingAppChain } from '@proto-kit/sdk';
import { dummyBase64Proof } from 'o1js/dist/node/lib/proof_system';
import { Pickles } from 'o1js/dist/node/snarky';

export async function mockProof<I, O, P>(
  publicOutput: O,
  ProofType: new ({
    proof,
    publicInput,
    publicOutput,
    maxProofsVerified,
  }: {
    proof: unknown;
    publicInput: I;
    publicOutput: any;
    maxProofsVerified: 0 | 2 | 1;
  }) => P,
  publicInput: I
): Promise<P> {
  const [, proof] = Pickles.proofOfBase64(await dummyBase64Proof(), 2);
  return new ProofType({
    proof: proof,
    maxProofsVerified: 2,
    publicInput,
    publicOutput,
  });
}

describe('minapolis game hub', () => {
  it('Log proof', async () => {
    console.log(await dummyBase64Proof());
  });
});
