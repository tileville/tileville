import { LocalhostAppChain } from '@proto-kit/cli';
// import { AppChain } from '@proto-kit/sdk';
import runtime from './runtime';
import { Runtime } from '@proto-kit/module';
import { Balances } from './balances';

const appChain = LocalhostAppChain.fromRuntime(runtime.modules);

// const appChain = AppChain.from({
//   Runtime: Runtime.from({
//     modules: runtime.modules,
//   }),
// });

appChain.configurePartial({
  ...appChain.config,
  Runtime: runtime.config,
  Sequencer: {
    LocalTaskWorkerModule: {
      StateTransitionTask: {},
      RuntimeProvingTask: {},
      StateTransitionReductionTask: {},
      BlockReductionTask: {},
      BlockProvingTask: {},
      BlockBuildingTask: {},
    },
  },
});

export default appChain as any;
