import 'reflect-metadata';
import { Balances, TokenId, UInt64 } from '@proto-kit/library';
import { RuntimeModule, runtimeModule, runtimeMethod } from '@proto-kit/module';
import { assert } from '@proto-kit/protocol';
import { PublicKey } from 'o1js';
import { inject } from 'tsyringe';

export const errors = {
  mintOnlyAtGenesis: 'Minting is only allowed at the genesis block',
};

@runtimeModule()
export class Mintery extends RuntimeModule<Record<string, never>> {
  public constructor(@inject('Balances') public balances: Balances) {
    super();
  }

  @runtimeMethod()
  public mint(tokenId: TokenId, address: PublicKey, amount: UInt64) {
    assert(
      UInt64.from(this.network.block.height).equals(UInt64.from(0)),
      errors.mintOnlyAtGenesis
    );
    this.balances.setBalance(tokenId, address, amount);
  }
}
