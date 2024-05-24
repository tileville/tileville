import { UInt64 } from 'o1js';
import { Balances } from './balances';
import { ModulesConfig } from '@proto-kit/common';
import {MinapolisGameHub} from './MinapolisGameHub'

export const modules = {
  Balances,
  MinapolisGameHub
};

export const config: ModulesConfig<typeof modules> = {
  Balances: {
    totalSupply: UInt64.from(10_000_1000),
  },
  MinapolisGameHub: {}
};

export default { modules, config };
