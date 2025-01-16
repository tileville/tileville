// src/hooks/useNFTStatus.ts
"use client";
import { CHAIN_NAME } from "@/app/api/mint-nft/constants";
import algoliasearch from "algoliasearch";
import { useQuery } from "@tanstack/react-query";

const client = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_PROJECT || "",
  process.env.NEXT_PUBLIC_ALGOLIA_KEY || ""
);

const index = client.initIndex(CHAIN_NAME);

export type AlgoliaHitResponse = {
  address: string;
  chain: string;
  collection: string;
  contractAddress: string;
  description: string;
  external_url: string;
  hash: string;
  image: string;
  ipfs: string;
  jobId: string;
  metadata: {
    data: string;
    kind: string;
  };
  name: string;
  objectID: string;
  owner: string;
  price: string;
  properties: {
    collection: Record<string, unknown>;
    description: Record<string, unknown>;
    "Sustainability Rating": Record<string, unknown>;
    "Efficiency Level": Record<string, unknown>;
    "Environmental Affinity": Record<string, unknown>;
    [key: string]: Record<string, unknown>;
  };
  status: string;
  time: number;
  version: string;
};

async function fetchNFTStatuses(nftNames: string[]) {
  if (!nftNames.length) return [];
  
  const filters = nftNames
    .map(name => `name:"${name}"`)
    .join(" OR ");

  const { hits } = await index.search("", {
    filters,
    hitsPerPage: nftNames.length
  });

  return hits as AlgoliaHitResponse[];
}

interface UseNFTStatusParams {
  nfts: Array<{
    name: string;
    [key: string]: any;
  }>;
  collection?: string;
}

export function useNFTStatus({ nfts, collection }: UseNFTStatusParams) {
  const nftNames = nfts.map(nft => nft.name);
  
  return useQuery({
    queryKey: ['nft-statuses', nftNames, collection],
    queryFn: () => fetchNFTStatuses(nftNames),
    enabled: nftNames.length > 0,
    staleTime: 30000, // Consider data fresh for 30 seconds
    cacheTime: 5 * 60 * 1000, // Cache for 5 minutes
  });
}