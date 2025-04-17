import { supabaseServiceClient as supabase } from "@/db/config/server";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const nft_id = parseInt(searchParams.get("nft_id") || "0");
  const wallet_address = searchParams.get("wallet_address") || "";

  if (!nft_id || !wallet_address) {
    return Response.json(
      {
        success: false,
        message: "Missing parameters",
      },
      { status: 400 }
    );
  }

  try {
    const { data: nftRequest, error: nftError } = await supabase
      .from("zeko_mint_requests")
      .select("id")
      .eq("nft_id", nft_id)
      .maybeSingle();

    const { data: userRequest, error: userError } = await supabase
      .from("zeko_mint_requests")
      .select("id")
      .eq("wallet_address", wallet_address)
      .maybeSingle();

    return Response.json({
      success: true,
      isNftRequested: !!nftRequest,
      hasUserRequest: !!userRequest,
    });
  } catch (error: any) {
    console.error("Error checking Zeko mint status:", error);
    return Response.json(
      {
        success: false,
        message: error.message || "Failed to check mint status",
      },
      { status: 500 }
    );
  }
}
