import { supabaseServiceClient as supabase } from "@/db/config/server";
import { NextRequest } from "next/server";

const postHandler = async (request: NextRequest) => {
  try {
    const { nft_id, nft_name, wallet_address } = await request.json();

    // First, check if this user already has a request for any Zeko NFT
    const { data: existingUserRequest, error: userError } = await supabase
      .from("zeko_mint_requests")
      .select("id")
      .eq("wallet_address", wallet_address)
      .single();

    if (existingUserRequest) {
      return Response.json(
        {
          success: false,
          message: "You already have a pending mint request for a Zeko NFT",
        },
        { status: 400 }
      );
    }

    const { data: existingNftRequest, error: nftError } = await supabase
      .from("zeko_mint_requests")
      .select("id")
      .eq("nft_id", nft_id)
      .single();

    if (existingNftRequest) {
      return Response.json(
        {
          success: false,
          message: "This NFT has already been requested for minting",
        },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("zeko_mint_requests")
      .insert({
        nft_id,
        nft_name,
        wallet_address,
        status: "pending",
      })
      .select()
      .single();

    if (error) throw error;

    return Response.json({
      success: true,
      message: "Your mint request has been received. We'll process it soon!",
      data,
    });
  } catch (error: any) {
    console.error("Error creating Zeko mint request:", error);
    return Response.json(
      {
        success: false,
        message: error.message || "Failed to create mint request",
      },
      { status: 500 }
    );
  }
};

export const POST = postHandler;
