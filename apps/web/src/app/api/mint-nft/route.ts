import { NextRequest } from "next/server";
import { verifyUserAuthentication } from "../utils";

export async function POST(request: NextRequest) {
  const payload = await request.json();
  console.log("payload", payload);
  const { wallet_address, nft_id, txn_hash } = payload;

  const authSignature = request.headers.get("Auth-Signature");

  try {
    await verifyUserAuthentication(authSignature, wallet_address);
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
}
