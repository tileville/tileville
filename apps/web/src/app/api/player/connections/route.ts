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

    const { data: followersData, error: followersError } = await supabase
      .from("player_profile")
      .select("wallet_address, username, fullname, avatar_url")
      .in("wallet_address", profileData?.followers || []);

    const { data: followingData, error: followingError } = await supabase
      .from("player_profile")
      .select("wallet_address, username, fullname, avatar_url")
      .in("wallet_address", profileData?.following || []);

    if (followersError || followingError)
      throw followersError || followingError;

    return Response.json({
      success: true,
      data: {
        followers: followersData || [],
        following: followingData || [],
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
