import { NextRequest } from "next/server";
import { fetchNFTImageUrl } from "./utils";
import { withAuth } from "../authMiddleware";
import { BLOCKBERRY_API_KEY, BLOCKBERRY_MAINNET_BASE_URL } from "@/constants";

const postHandler = async (request: NextRequest) => {
  const payload = await request.json();
  console.log("payload", payload);
  const { wallet_address, nft_id, txn_hash } = payload;
  const authSignature = request.headers.get("Auth-Signature");

  console.log({ wallet_address, nft_id, txn_hash, authSignature });

  try {
    console.log("Verification done");
    // Add log
    // add transaction status

    const response = fetch(
      `${BLOCKBERRY_MAINNET_BASE_URL}/v1/block-confirmation/${txn_hash}`,
      {
        headers: {
          "x-api-key": BLOCKBERRY_API_KEY,
        },
      }
    );

    const jsonResponse = (await response).json();

    console.log

    // check nft_id
    // fetch signed url
    //
    console.log("signature verification done");
    const image_url = fetchNFTImageUrl(nft_id);
    console.log(image_url);
  } catch (error) {}
  // let res = {};
  // if (isExist) {
  //   const { data, error } = await supabase
  //     .from("player_profile")
  //     .update(other_field)
  //     .eq("wallet_address", wallet_address)
  //     .single();
  //   if (error) {
  //     throw error;
  //   }
  //   res = data;
  // } else {
  //   const { data, error } = await supabase
  //     .from("player_profile")
  //     .insert(payload)
  //     .select("*")
  //     .single();
  //   if (error) {
  //     throw error;
  //   }
  //   res = data;
  // }
  // return Response.json(res);
};

export const POST = withAuth(postHandler);
