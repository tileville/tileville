import { UInt64 } from 'o1js';
import { Balances } from './balances';
import { runtimeModule } from '@proto-kit/module';
import { ModulesConfig } from '@proto-kit/common';

export const modules = {
  Balances,
};

export const config: ModulesConfig<typeof modules> = {
  Balances: {
    totalSupply: UInt64.from(10_000_1000),
  },
};

export default { modules, config };
