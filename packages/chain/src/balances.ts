import {
  UInt64,
  Balances as BaseBalances,
  TokenId,
  Balance,
} from '@proto-kit/library';
import {
  RuntimeModule,
  runtimeModule,
  state,
  runtimeMethod,
} from '@proto-kit/module';
import { State, StateMap, assert } from '@proto-kit/protocol';
import { PublicKey } from 'o1js';

interface BalancesConfig {}

@runtimeModule()
export class Balances extends BaseBalances<BalancesConfig> {
  @runtimeMethod()
  public addBalance(
    tokenId: TokenId,
    address: PublicKey,
    amount: Balance
  ): void {
    this.mint(tokenId, address, amount);
  }
}
