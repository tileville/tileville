import { supabaseServiceClient as supabase } from "@/db/config/server";
import { NextRequest } from "next/server";
import { NFT_PAGE_SIZE, NFT_COLLECTIONS, NFT_TABLE_NAMES } from "@/constants";
import { NFTTableName } from "@/constants";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const collection =
    searchParams.get("collection") || NFT_COLLECTIONS.TILEVILLE;
  const sortOrder = (searchParams.get("sortOrder") as "asc" | "desc") || "desc";
  const searchTerm = searchParams.get("searchTerm") || "";
  const page = parseInt(searchParams.get("page") || "1");

  const start = (page - 1) * NFT_PAGE_SIZE;
  const end = start + NFT_PAGE_SIZE - 1;

  try {
    const tableName = getTableName(collection);

    let query = supabase
      .from(tableName)
      .select("*", { count: "exact" })
      .range(start, end)
      .order("price", { ascending: sortOrder === "asc" });

    if (searchTerm) {
      const numericSearch = parseInt(searchTerm);
      if (!isNaN(numericSearch)) {
        query = query.or(
          `price.eq.${numericSearch},nft_id.eq.${numericSearch},name.ilike.%${searchTerm}%`
        );
      } else {
        query = query.ilike("name", `%${searchTerm}%`);
      }
    }

    const { data: nfts, error, count } = await query;

    if (error) throw error;

    return Response.json({
      nfts,
      count: count || 0,
      currentPage: page,
      totalPages: Math.ceil((count || 0) / NFT_PAGE_SIZE),
    });
  } catch (error: any) {
    console.error("NFT fetch error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

function getTableName(collection: string): NFTTableName {
  switch (collection) {
    case NFT_COLLECTIONS.MINATY:
      return NFT_TABLE_NAMES.MINATY;
    case NFT_COLLECTIONS.MINAPUNKS:
      return NFT_TABLE_NAMES.MINAPUNKS;
    case NFT_COLLECTIONS.ZKGOD:
      return NFT_TABLE_NAMES.ZKGOD;
    case NFT_COLLECTIONS.TILEVILLE:
    default:
      return NFT_TABLE_NAMES.TILEVILLE;
  }
}
