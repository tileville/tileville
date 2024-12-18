// src/app/api/player/total-wins/route.ts
import { supabaseServiceClient as supabase } from "@/db/config/server";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const wallet_address = searchParams.get("wallet_address") || "";

  try {
    // First get all competition names
    const { data: competitions } = await supabase
      .from("tileville_competitions")
      .select("unique_keyname");

    let totalWins = 0;
    const processedCompetitions = new Set();

    // For each competition, check if user is in top 10
    for (const competition of competitions || []) {
      const competitionKey = competition.unique_keyname;

      // Get all scores for this competition, ordered by score
      const { data: scores } = await supabase
        .from("game_scores")
        .select("wallet_address, score")
        .eq("competition_key", competitionKey)
        .order("score", { ascending: false })
        .limit(10);

      // Check if player is in top 10
      const isInTop10 = scores?.some(
        (score) => score.wallet_address === wallet_address
      );

      if (isInTop10 && !processedCompetitions.has(competitionKey)) {
        totalWins++;
        processedCompetitions.add(competitionKey);
      }
    }

    return Response.json({
      success: true,
      total_wins: totalWins,
    });
  } catch (error) {
    console.error("Error calculating total wins:", error);
    return Response.json(
      { success: false, error: "Failed to calculate total wins" },
      { status: 500 }
    );
  }
}
