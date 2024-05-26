import { LocalhostAppChain } from '@proto-kit/cli';
import runtime from './runtime';

const appChain = LocalhostAppChain.fromRuntime(runtime.modules);

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
