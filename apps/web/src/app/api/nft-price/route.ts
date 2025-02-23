import { NextRequest } from "next/server";
import { supabaseServiceClient as supabase } from "@/db/config/server";
import { NFTTableNames } from "@/lib/types";

export async function POST(request: NextRequest) {
  const payload = await request.json();
  console.log("payload", payload);
  const { name = "" }: { name: string } = payload;

  console.log({ name });

  try {
    let tableName: NFTTableNames;
    if (name.toLowerCase().includes("minaty")) {
      tableName = "minaty_nfts";
    } else if (name.toLowerCase().includes("minapunk")) {
      tableName = "minapunks_nfts";
    } else if (name.toLowerCase().includes("zkgod")) {
      tableName = "zkgod_nfts";
    } else {
      tableName = "tileville_builder_nfts";
    }

    const { data: nftData, error: nftFetchError } = await supabase
      .from(tableName)
      .select("*")
      .eq("name", name);

    if (nftFetchError) {
      return Response.json(
        {
          success: false,
          message: "Error fetching NFT data",
          error: nftFetchError.message,
        },
        { status: 400 }
      );
    }

    if (!nftData || nftData.length === 0) {
      return Response.json(
        {
          success: false,
          message: `No NFT found with name ${name}`,
        },
        { status: 404 }
      );
    }

    const {
      price,
    }: {
      price: number;
      traits: any;
    } = nftData[0];

    if (typeof price !== "number" || price <= 0) {
      return Response.json(
        {
          success: false,
          message: "Invalid price for NFT",
        },
        { status: 400 }
      );
    }

    return Response.json(
      {
        name,
        price: price - 1,
        success: true,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error processing NFT price request:", error);
    return Response.json(
      {
        success: false,
        message: "Internal server error",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
