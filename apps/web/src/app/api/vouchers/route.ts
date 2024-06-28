import { supabaseServiceClient as supabase } from "@/db/config/server";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code") || "";
  console.log({ code });
  // const { code } = params;
  const { data, error } = await supabase
    .from("voucher_codes")
    .select("id, is_redeemed")
    .eq("code", code)
    .single();

  let res = {};

  if (error) {
    console.log(error);
  }

  console.log("data", data);

  if (!data) res = { isValid: false, message: "vocher code is invalid." };
  else if (data.is_redeemed)
    res = { isValid: false, message: "voucher code is already redeemed" };
  else if (error) res = { isValid: false, message: error };
  else res = { isValid: true, message: "" };

  return Response.json(res);
}
