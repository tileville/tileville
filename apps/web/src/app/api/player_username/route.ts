import { supabaseServiceClient as supabase } from "@/db/config/server";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const wallet_address = searchParams.get("wallet_address") || "";
  const { data } = await supabase
    .from("player_profile")
    .select("username")
    .eq("wallet_address", wallet_address)
    .single();

  console.log("data", data);

  let res = {};
  if (!data) res = { status: false, message: "player does not exist" };
  else res = { status: true, data };
  return Response.json(res);
}
