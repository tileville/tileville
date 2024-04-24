import { TestingAppChain } from '@proto-kit/sdk';
import { PrivateKey } from 'o1js';
import { Mintery, errors } from '../src/mintery';
import { BalancesKey, TokenId, UInt64 } from '@proto-kit/library';

describe('mintery', () => {
  let appChain: ReturnType<
    typeof TestingAppChain.fromRuntime<{ Mintery: typeof Mintery }>
  >;

  let mintery: Mintery;

  const satyamPrivateKey = PrivateKey.random();
  const satyamPublicKey = satyamPrivateKey.toPublicKey();
  const tokenId = TokenId.from(0);

  beforeAll(async () => {
    appChain = TestingAppChain.fromRuntime({ Mintery });

    appChain.configurePartial({
      Runtime: {
        Balances: {},
        Mintery: {},
      },
    });

    await appChain.start();
    appChain.setSigner(satyamPrivateKey);
    mintery = appChain.runtime.resolve('Mintery');
  });

  it('should mint at the genesis block', async () => {
    const tx = await appChain.transaction(satyamPublicKey, () => {
      mintery.mint(tokenId, satyamPublicKey, UInt64.from(1000));
    });

    await tx.sign();
    await tx.send();

    const block = await appChain.produceBlock();
    const balance = await appChain.query.runtime.Balances.balances.get(
      new BalancesKey({ tokenId, address: satyamPublicKey })
    );

    expect(block?.transactions[0].status.toBoolean()).toBe(true);
    expect(balance?.toBigInt()).toBe(1000n);
  }, 1_000_000);

  it('Should not mint at second block', async () => {
    const tx = await appChain.transaction(satyamPublicKey, () => {
      mintery.mint(tokenId, satyamPublicKey, UInt64.from(1000));
    });
    await tx.sign();
    await tx.send();

    const block = await appChain.produceBlock();
    const balance = await appChain.query.runtime.Balances.balances.get(
      new BalancesKey({ tokenId, address: satyamPublicKey })
    );

    expect(block?.transactions[0].status.toBoolean()).toBe(false);
    expect(block?.transactions[0].statusMessage).toBe(errors.mintOnlyAtGenesis);
    expect(balance?.toBigInt()).toBe(1000n);
  }, 1_000_000);
});
