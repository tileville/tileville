import { supabaseServiceClient as supabase } from "@/db/config/server";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const wallet_address = searchParams.get("wallet_address") || "";

  if (!wallet_address) {
    return Response.json(
      {
        status: false,
        message: "Wallet address is required",
      },
      { status: 400 }
    );
  }

  try {
    const { data } = await supabase
      .from("player_profile")
      .select("username")
      .eq("wallet_address", wallet_address)
      .single();

    if (!data) {
      return Response.json({
        status: false,
        message: "Username not found",
      });
    }

    return Response.json({
      status: true,
      data: {
        username: data.username,
      },
    });
  } catch (error: any) {
    console.error("Error fetching username:", error);
    return Response.json(
      {
        status: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}
