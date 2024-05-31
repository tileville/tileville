#!/usr/bin/env node --experimental-specifier-resolution=node --experimental-vm-modules --experimental-wasm-modules --experimental-wasm-threads

import { ManualBlockTrigger } from '@proto-kit/sequencer';
import appChain from '../src/chain.config';
import { exit } from 'process';
import { container } from 'tsyringe';

await appChain.start(container.createChildContainer());

// await appChain.start();
const trigger = appChain.sequencer.resolveOrFail(
  'BlockTrigger',
  ManualBlockTrigger
);
setInterval(async () => {
  console.log('Tick');
  try {
    await trigger.produceUnproven();
  } catch (e) {
    console.error('Run err', e);
  }
}, 5000);
