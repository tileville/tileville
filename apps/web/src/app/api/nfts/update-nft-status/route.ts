import { supabaseServiceClient as supabase } from "@/db/config/server";
import { NextRequest } from "next/server";

const updateNFTStatusHandler = async (request: NextRequest) => {
  try {
    const { nft_id, collection, txn_hash, collectionTableName } =
      await request.json();

    if (!nft_id || !collection || !collectionTableName) {
      return Response.json(
        { success: false, message: "Missing required parameters" },
        { status: 400 }
      );
    }

    const updateData: Record<string, any> = {
      txn_hash: txn_hash || null,
    };

    if (collection.toLowerCase() === "zeko") {
      updateData.is_minted = true;
    }

    const { data, error } = await supabase
      .from(collectionTableName)
      .update(updateData)
      .eq("nft_id", nft_id)
      .select("*")
      .single();

    if (error) {
      console.error(`Failed to update NFT status:`, error);
      return Response.json(
        { success: false, message: error.message },
        { status: 500 }
      );
    }

    return Response.json({
      success: true,
      message: "NFT status updated successfully",
      data,
    });
  } catch (error: any) {
    console.error("Error updating NFT status:", error.message);
    return Response.json(
      { success: false, message: "Failed to update NFT status" },
      { status: 500 }
    );
  }
};

export const POST = updateNFTStatusHandler;
