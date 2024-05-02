import 'reflect-metadata';
import { TestingAppChain } from '@proto-kit/sdk';
import { PrivateKey } from 'o1js';
import { Balances } from '../src/balances';
import { log } from '@proto-kit/common';
import { BalancesKey, TokenId, UInt64 } from '@proto-kit/library';

log.setLevel('WARN');

describe('token balances', () => {
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

  // it('should pass', async () => {
  //   expect(true).toBe(true);
  // });

  it.skip('should add balance correctly', async () => {
    const tx = await appChain.transaction(satyamPublicKey, () => {
      balances.addBalance(tokenId, satyamPublicKey, UInt64.from(1000));
    });
    await tx.sign();
    await tx.send();

    const block = await appChain.produceBlock();
    const balance = await appChain.query.runtime.Balances.balances.get(
      new BalancesKey({ tokenId, address: satyamPublicKey })
    );
    console.log('balance', balance);
    expect(balance?.toBigInt()).toBe(1000n);
  }, 1_000_000);
});
