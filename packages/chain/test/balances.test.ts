import { TestingAppChain } from '@proto-kit/sdk';
import { PrivateKey } from 'o1js';
import { Balances } from '../src/balances';
import { log } from '@proto-kit/common';
import { TokenId, UInt64 } from '@proto-kit/library';

log.setLevel('ERROR');

describe.skip('token balances', () => {
  let appChain: ReturnType<
    typeof TestingAppChain.fromRuntime<{ Balances: typeof Balances }>
  >;

  let balances: Balances;

  const satyamPrivateKey = PrivateKey.random();
  const satyamPublicKey = satyamPrivateKey.toPublicKey();
  const tokenId = TokenId.from(0);

  beforeAll(async () => {
    appChain = TestingAppChain.fromRuntime({
      Balances,
    });
    appChain.configurePartial({
      Runtime: {
        Balances: {},
      },
    });
    await appChain.start();
    appChain.setSigner(satyamPrivateKey);
    balances = appChain.runtime.resolve('Balances');
  });

  it('should add balance correctly', async () => {
    const tx = await appChain.transaction(satyamPublicKey, () => {
      balances.addBalance(tokenId, satyamPublicKey, UInt64.from(1000));
    });
  }, 1_000_000);
});
