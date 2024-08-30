import { NextRequest } from "next/server";
import { supabaseServiceClient as supabase } from "@/db/config/server";

export async function POST(request: NextRequest) {
  const payload = await request.json();
  console.log("payload", payload);
  const { name } = payload;

  console.log({ name });

  try {
    const { data: nftData, error: nftFetchError } = await supabase
      .from("tileville_builder_nfts")
      .select("*")
      .eq("name", name);
    if (nftFetchError) {
      return Response.json(
        { success: false, message: "Invalid NFT id" },
        { status: 400 }
      );
    }

    if (!nftData || nftData.length === 0) {
      return Response.json(
        { success: false, message: `No NFT found with name ${name}` },
        { status: 404 }
      );
    }

    const {
      price,
    }: {
      price: number;
      traits: any;
    } = nftData[0];

    return Response.json(
      {
        name,
        price: price - 1,
        success: true,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error);
    return Response.json({ success: false }, { status: 500 });
  }
}
