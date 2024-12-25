import { supabaseServiceClient as supabase } from "@/db/config/server";
import { NFT_PAGE_SIZE } from "@/constants";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const sortOrder = (searchParams.get("sortOrder") as "asc" | "desc") || "desc";
  const searchTerm = searchParams.get("searchTerm") || "";
  const currentPage = parseInt(searchParams.get("currentPage") || "1");
  const category = searchParams.get("category") || "ALL";

  const rangeStart = (currentPage - 1) * NFT_PAGE_SIZE;
  const rangeEnd = rangeStart + NFT_PAGE_SIZE - 1;

  try {
    let query = supabase
      .from("zkgod_nfts")
      .select("*", { count: "exact" })
      .range(rangeStart, rangeEnd)
      .order("price", { ascending: sortOrder === "asc" });

    if (category !== "ALL") {
      query = query.eq("category", category);
    }

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
    });
  } catch (error: any) {
    console.error("Error fetching ZKGod NFTs:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
