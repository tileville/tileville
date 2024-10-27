import { supabaseServiceClient as supabase } from "@/db/config/server";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const currentWallet = searchParams.get("wallet_address");

    if (!currentWallet) {
      return Response.json(
        {
          success: false,
          error: "Wallet address is required",
        },
        { status: 400 }
      );
    }

    const { data: users, error } = await supabase
      .from("player_profile")
      .select(
        "wallet_address, username, fullname, followers, following, avatar_url"
      )
      .neq("wallet_address", currentWallet);

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
