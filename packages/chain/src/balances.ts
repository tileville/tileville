import {
  Balances as BaseBalances,
  TokenId,
  Balance,
} from '@proto-kit/library';
import {
  runtimeModule,
  runtimeMethod,
} from '@proto-kit/module';
import { PublicKey } from 'o1js';

interface BalancesConfig {}

@runtimeModule()
export class Balances extends BaseBalances<BalancesConfig> {
  @runtimeMethod()
  public async addBalance(
    tokenId: TokenId,
    address: PublicKey,
    amount: Balance,
  ): Promise<void> {
    this.mint(tokenId, address, amount);
  }
  @runtimeMethod()
  public async burnBalance(tokenId: TokenId, amount: Balance): Promise<void> {
    this.burn(tokenId, this.transaction.sender.value, amount);
  }
}
