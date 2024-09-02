import { Balance, Balances as BaseBalances, TokenId } from '@proto-kit/library';
import { State, assert } from '@proto-kit/protocol';
import { runtimeModule, runtimeMethod, state } from '@proto-kit/module';
import { PublicKey } from 'o1js';

interface BalancesConfig {
  totalSupply: Balance;
}

@runtimeModule()
export class Balances extends BaseBalances<BalancesConfig> {
  @state() public circulatingSupply = State.from(Balance);

  @runtimeMethod()
  public async addBalance(
    tokenId: TokenId,
    address: PublicKey,
    amount: Balance
  ): Promise<void> {
    const circulatingSupply = await this.circulatingSupply.get();
    const newCirculatingSupply = Balance.from(
      circulatingSupply.value as any
    ).add(amount);

    assert(
      newCirculatingSupply.lessThanOrEqual(this.config.totalSupply),
      'Circulating supply should be lower than total supply.'
    );
    await this.circulatingSupply.set(newCirculatingSupply);
    await this.mint(tokenId, address, amount);
  }
}
