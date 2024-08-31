import { isMockEnv } from "./index";

export interface Network {
  chainId: string;
  name: string;
  graphql: string;
  networkID: string;
  palladNetworkID: string;
}

export const NETWORKS: Network[] = [
  {
    chainId: "mainnet",
    name: "Mainnet",
    graphql: "https://api.minascan.io/node/mainnet/v1/graphql",
    networkID: "mina:mainnet",
    palladNetworkID:
      "a7351abc7ddf2ea92d1b38cc8e636c271c1dfd2c081c637f62ebc2af34eb7cc1",
  },
];

if (isMockEnv) {
  NETWORKS.push({
    chainId: "testnet",
    name: "Devnet",
    graphql: "https://api.minascan.io/node/devnet/v1/graphql",
    networkID: "mina:testnet",
    palladNetworkID:
      "29936104443aaf264a7f0192ac64b1c7173198c1ed404c1bcff5e562e05eb7f6",
  });
}

export const MAINNET_NETWORK: Network = {
  chainId: "mainnet",
  name: "Mainnet",
  graphql: "https://api.minascan.io/node/mainnet/v1/graphql",
  networkID: "mina:mainnet",
  palladNetworkID:
    "a7351abc7ddf2ea92d1b38cc8e636c271c1dfd2c081c637f62ebc2af34eb7cc1",
};
