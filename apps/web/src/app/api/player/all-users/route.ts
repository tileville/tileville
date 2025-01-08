import { supabaseServiceClient as supabase } from "@/db/config/server";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const currentWallet = searchParams.get("wallet_address");
    const searchQuery = searchParams.get("search") || "";

    if (!currentWallet) {
      return Response.json(
        {
          success: false,
          error: "Wallet address is required",
        },
        { status: 400 }
      );
    }

    let query = supabase
      .from("player_profile")
      .select("wallet_address, username, avatar_url , fullname")
      .neq("wallet_address", currentWallet);

    if (searchQuery) {
      query = query.or(
        `username.ilike.%${searchQuery}%,fullname.ilike.%${searchQuery}%`
      );
    }

    const { data: users, error } = await query;

    if (error) throw error;

    return Response.json({
      success: true,
      data: users,
    });
  } catch (error: any) {
    console.error("Error in GET route:", error);
    return Response.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
