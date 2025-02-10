import algoliasearch from "algoliasearch";
import { CHAIN_NAME } from "@/app/api/mint-nft/constants";
import { NFT_COLLECTIONS } from "@/constants";

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
  owner?: string;
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
  const { query, hitsPerPage, currentPage, statuses, owner } = params;

  const ourCollections = [
    NFT_COLLECTIONS.TILEVILLE,
    NFT_COLLECTIONS.MINATY,
    NFT_COLLECTIONS.MINAPUNKS,
    NFT_COLLECTIONS.ZKGOD,
  ];

  const collectionsFilter = ourCollections
    .map((collection) => `collection:"${collection}"`)
    .join(" OR ");

  const statusFilter =
    statuses && statuses.length > 0
      ? `(${statuses.map((status) => `status:${status}`).join(" OR ")})`
      : "";

  const ownerFilter = owner ? `owner:${owner}` : "";

  const filters = [];
  filters.push(`(${collectionsFilter})`);
  if (statusFilter) filters.push(statusFilter);
  if (ownerFilter) filters.push(ownerFilter);

  const finalFilter = filters.join(" AND ");

  console.log("Final Algolia filter:", finalFilter);

  const { hits, nbHits, nbPages, page } = await index.search(query, {
    hitsPerPage,
    page: currentPage,
    filters: finalFilter,
  });

  return { hits, nbHits, nbPages, page };
}
