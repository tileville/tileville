export interface Network {
  chainId: string;
  name: string;
  graphql: string;
  networkID: string;
}

export const NETWORKS: Network[] = [
  {
    chainId: "zeko",
    name: "Zeko",
    graphql: "https://devnet.zeko.io/graphql",
    networkID: "mina:zeko",
  },
  {
    chainId: "berkeley",
    name: "Berkeley",
    graphql: "https://api.minascan.io/node/berkeley/v1/graphql",
    networkID: "mina:berkeley",
  },
  {
    chainId: "mainnet",
    name: "Mainnet",
    graphql: "https://api.minascan.io/node/mainnet/v1/graphql",
    networkID: "mina:mainnet",
  },
];
