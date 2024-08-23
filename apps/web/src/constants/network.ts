import { isMockEnv } from ".";

export interface Network {
  chainId: string;
  name: string;
  graphql: string;
  networkID: string;
}

export const NETWORKS: Network[] = [
  {
    chainId: "mainnet",
    name: "Mainnet",
    graphql: "https://api.minascan.io/node/mainnet/v1/graphql",
    networkID: "mina:mainnet",
  },
];

if (isMockEnv) {
  NETWORKS.push({
    chainId: "testnet",
    name: "Devnet",
    graphql: "https://api.minascan.io/node/devnet/v1/graphql",
    networkID: "mina:testnet",
  });
}

export const MAINNET_NETWORK: Network = {
  chainId: "mainnet",
  name: "Mainnet",
  graphql: "https://api.minascan.io/node/mainnet/v1/graphql",
  networkID: "mina:mainnet",
};
