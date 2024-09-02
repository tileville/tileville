import { UInt64 } from 'o1js';
import { Balances } from './Balances';
import { ModulesConfig } from '@proto-kit/common';
import { TilevilleGameHub } from './TilevilleGameHub';
import { Balance, VanillaRuntimeModules } from '@proto-kit/library';

export const modules = VanillaRuntimeModules.with({
  Balances,
  TilevilleGameHub,
});

export const config: ModulesConfig<typeof modules> = {
  Balances: {
    totalSupply: Balance.from(10_000_1000),
  },
  TilevilleGameHub: {},
};

export default { modules, config };
