import { supabaseServiceClient as supabase } from "@/db/config/server";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const sortOrder = searchParams.get("sortOrder") || "desc";
  const searchTerm = searchParams.get("searchTerm") || "";
  const currentPage = parseInt(searchParams.get("currentPage") || "1");
  const pageSize = 20;
  const offset = (currentPage - 1) * pageSize;

  try {
    const query = supabase
      .from("minaty_nfts")
      .select("*", { count: "exact" });

    if (searchTerm) {
      query.ilike("name", `%${searchTerm}%`);
    }

    query.order("price", { ascending: sortOrder === "asc" });
    query.range(offset, offset + pageSize - 1);

    const { data, error, count } = await query;

    if (error) throw error;

    return Response.json({ nfts: data, count });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}