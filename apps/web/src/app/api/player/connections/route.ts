import { supabaseServiceClient as supabase } from "@/db/config/server";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const wallet_address = searchParams.get("wallet_address") || "";

  try {
    const { data: profileData, error: profileError } = await supabase
      .from("player_profile")
      .select("followers, following")
      .eq("wallet_address", wallet_address)
      .single();

    if (profileError) throw profileError;

    return Response.json({
      success: true,
      data: {
        followers: profileData?.followers || [],
        following: profileData?.following || [],
      },
    });
  } catch (error: any) {
    console.error("Error in GET route:", error);
    return Response.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
