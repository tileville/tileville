import { supabaseServiceClient as supabase } from "@/db/config/server";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const wallet_address = searchParams.get("wallet_address") || "";

  try {
    const { data, error } = await supabase
      .from("pvp_challenges")
      .select(
        `
        *,
        participants:pvp_challenge_participants(*)
      `
      )
      .eq("created_by", wallet_address)
      .order("created_at", { ascending: false });

    if (error) throw error;

    return Response.json({ success: true, data });
  } catch (error: any) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
