"use client";
import { CHAIN_NAME } from "@/app/api/mint-nft/constants";
// import { CHAIN_NAME } from "@/app/api/mint-nft/constants";
import algoliasearch from "algoliasearch";
import { useEffect, useState } from "react";

const client = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_PROJECT || "",
  process.env.NEXT_PUBLIC_ALGOLIA_KEY || ""
);

const index = client.initIndex(CHAIN_NAME);

interface SearchParams {
  query: string;
  hitsPerPage: number;
  currentPage: number;
  statuses?: string[];
  owner?: string; // Changed to array to allow multiple statuses
}

interface SearchResponse {
  hits: any[];
  nbHits: number;
  nbPages: number;
  page: number;
}

export async function searchJobs(
  params: SearchParams
): Promise<SearchResponse> {
  const { query, hitsPerPage, currentPage, statuses } = params;

  let filters = "";
  if (statuses && statuses.length > 0) {
    filters = statuses.map((status) => `status:${status}`).join(" OR ");
  }
  if (params.owner) {
    filters =
      filters.length > 0
        ? `${filters} AND owner:${params.owner}`
        : `owner:${params.owner}`;
  }

  const { hits, nbHits, nbPages, page } = await index.search(query, {
    hitsPerPage,
    page: currentPage,
    filters, // Add the filters to the search query
  });

  return { hits, nbHits, nbPages, page };
}

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
    [key: string]: Record<string, unknown>; // For any additional properties
  };
  status: string;
  time: number;
  version: string;
};

type FetchOptions = {
  queryText?: string;
  owner?: string;
};

export const useFetchNFTSAlgolia = (options: FetchOptions) => {
  const [response, setResponse] = useState<AlgoliaHitResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const [error, setError] = useState<Error | null>(null); // Optional: Add error state

  useEffect(() => {
    setIsLoading(true); // Set loading to true when starting the fetch
    searchJobs({
      query: options.queryText || "Tileville Builder",
      hitsPerPage: 650,
      currentPage: 0,
      statuses: ["pending", "applied"],
      ...(options.owner ? { owner: options.owner } : {}),
    })
      .then((resp: any) => {
        const hits: AlgoliaHitResponse[] = resp.hits;
        setResponse(hits);
        setError(null);
      })
      .catch((error) => {
        console.log("algolia error", error);
        setResponse([]);
        setError(error);
      })
      .finally(() => {
        setIsLoading(false); // Set loading to false when fetch completes
      });
  }, [options.owner, options.queryText]); // Added dependencies properly

  return {
    mintNFTHitsResponse: response,
    searchJobs,
    isLoading,
    error, // Optional: return error state
  };
};
