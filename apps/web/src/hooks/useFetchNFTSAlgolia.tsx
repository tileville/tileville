"use client";
import { CHAIN_NAME } from "@/app/api/mint-nft/constants";
import algoliasearch from "algoliasearch";
import { useEffect, useState } from "react";

const client = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_PROJECT || "",
  process.env.NEXT_PUBLIC_ALGOLIA_KEY || ""
);

const index = client.initIndex("mainnet");

export async function searchJobs(params: {
  query: string;
  hitsPerPage: number;
  currentPage: number;
}): Promise<{ hits: any[]; nbHits: number; nbPages: number; page: number }> {
  const { query, hitsPerPage, currentPage } = params;
  // TODO: limit return fields
  const { hits, nbHits, nbPages, page } = await index.search(query, {
    hitsPerPage,
    page: currentPage,
  });
  return { hits, nbHits, nbPages, page };
}

type ResponseType = {
  hits: any[];
  nbHits: number;
  nbPages: number;
  page: number;
};
const INITIAL_RESPONSE = {
  hits: [],
  nbHits: 0,
  nbPages: 0,
  page: 0,
};
export const useFetchNFTSAlgolia = () => {
  const [response, setResponse] = useState<ResponseType>(INITIAL_RESPONSE);
  useEffect(() => {
    searchJobs({
      query: "Tileville Builder",
      hitsPerPage: 10,
      currentPage: 0,
    })
      .then((resp) => {
        console.log("Algolia response", resp);
        setResponse(response);
      })
      .catch((error) => {
        console.log("algolia error", error);
        setResponse(INITIAL_RESPONSE);
      });
  }, []);

  return { response, searchJobs };
};
