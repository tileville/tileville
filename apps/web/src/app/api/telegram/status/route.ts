import { supabaseServiceClient as supabase } from "@/db/config/server";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const wallet_address = searchParams.get("wallet_address");

    if (!wallet_address) {
      return Response.json(
        { success: false, message: "Wallet address is required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("telegram_auth")
      .select("*")
      .eq("wallet_address", wallet_address)
      .eq("authenticated", true)
      .single();

    if (error) {
      console.error("Error fetching telegram status:", error);
      return Response.json({ success: false, verified: false });
    }

    return Response.json({
      success: true,
      verified: !!data,
    });
  } catch (error: any) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
