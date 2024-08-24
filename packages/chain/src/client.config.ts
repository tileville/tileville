import { ClientAppChain, AuroSigner } from '@proto-kit/sdk';
import runtime from './runtime';

export const client = ClientAppChain.fromRuntime(runtime.modules, AuroSigner);

client.configurePartial({
  Runtime: runtime.config,
  GraphqlClient: {
    url:
      process.env.NEXT_PUBLIC_PROTOKIT_GRAPHQL_URL ||
      'http://127.0.0.1:8080/graphql',
  },
});
