import { supabaseServiceClient as supabase } from "@/db/config/server";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const wallet_address = searchParams.get("wallet_address") || "";

  if (!wallet_address) {
    return Response.json(
      { success: false, message: "Wallet address is required" },
      { status: 400 }
    );
  }

  try {
    // First get all game scores for the user
    const { data: userScores, error: scoresError } = await supabase
      .from("game_scores")
      .select("competition_key")
      .eq("wallet_address", wallet_address);

    if (scoresError) throw scoresError;

    // Get unique competition keys
    const uniqueCompetitionKeys = [
      ...new Set(userScores?.map((score) => score.competition_key)),
    ];

    // If user hasn't played any competitions
    if (uniqueCompetitionKeys.length === 0) {
      return Response.json({ success: true, competitions: [] });
    }

    // Fetch competition details for these keys
    const { data: competitions, error: competitionsError } = await supabase
      .from("tileville_competitions")
      .select("unique_keyname, poster_url , name")
      .in("unique_keyname", uniqueCompetitionKeys);

    if (competitionsError) throw competitionsError;

    // Transform data to return only required fields
    const pastCompetitions = competitions.map((comp) => ({
      competitionKey: comp.unique_keyname,
      posterUrl: comp.poster_url,
      competitionName: comp.name,
    }));

    return Response.json({
      success: true,
      competitions: pastCompetitions,
    });
  } catch (error: any) {
    console.error("Error fetching past competitions:", error);
    return Response.json(
      {
        success: false,
        message: error.message || "Failed to fetch past competitions",
      },
      { status: 500 }
    );
  }
}
