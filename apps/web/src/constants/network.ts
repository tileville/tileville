export interface Network {
  chainId: string;
  name: string;
  graphql: string;
}

export const NETWORKS: Network[] = [
  {
    chainId: "zeko",
    name: "Zeko",
    graphql: "https://devnet.zeko.io/graphql",
  },
  {
    chainId: "berkeley",
    name: "Berkeley",
    graphql: "https://api.minascan.io/node/berkeley/v1/graphql",
  },
];
