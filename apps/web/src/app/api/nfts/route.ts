import { supabaseServiceClient as supabase } from "@/db/config/server";
import { NextRequest } from "next/server";
import { NFT_PAGE_SIZE, NFT_TABLE_NAMES } from "@/constants";
import { NFTTableNames } from "@/lib/types";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const sortOrder = (searchParams.get("sortOrder") as "asc" | "desc") || "desc";
  const searchTerm = searchParams.get("searchTerm") || "";
  const page = parseInt(searchParams.get("page") || "1");
  const collectionTableName = searchParams.get("collectionTableName") || "";
  const mintedFilter = searchParams.get("mintedFilter");

  const start = (page - 1) * NFT_PAGE_SIZE;
  const end = start + NFT_PAGE_SIZE - 1;

  try {
    let query = supabase
      .from(collectionTableName as NFTTableNames)
      .select("*", { count: "exact" })
      .range(start, end);

    if (collectionTableName === NFT_TABLE_NAMES.ZEKO && mintedFilter !== null) {
      query = query.eq("is_minted", mintedFilter === "true");
    }

    query = query
      .order("price", {
        ascending: sortOrder === "asc",
        nullsFirst: false,
      })
      .order("nft_id", { ascending: true });

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
      nfts: nfts || [],
      count: count || 0,
      currentPage: page,
      totalPages: Math.ceil((count || 0) / NFT_PAGE_SIZE),
    });
  } catch (error: any) {
    console.error("NFT fetch error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
