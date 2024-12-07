// src/app/api/pvp/challenges/accepted/route.ts
import { supabaseServiceClient as supabase } from "@/db/config/server";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const wallet_address = searchParams.get("wallet_address") || "";

  try {
    const { data, error } = await supabase
      .from("pvp_challenge_participants")
      .select(
        `
        *,
        challenge:pvp_challenges(*)
      `
      )
      .eq("wallet_address", wallet_address)
      .order("joined_at", { ascending: false });

    if (error) throw error;

    // Transform data to match standardized format
    const formattedData = data.map((participation) => ({
      challenge: participation.challenge,
      participants: [
        {
          id: participation.id,
          challenge_id: participation.challenge_id,
          wallet_address: participation.wallet_address,
          joined_at: participation.joined_at,
          played_at: participation.played_at,
          status: participation.status,
          score: participation.score,
          has_played: participation.has_played,
          txn_hash: participation.txn_hash,
          txn_status: participation.txn_status,
          created_at: participation.created_at,
        },
      ],
    }));

    return Response.json({ success: true, data: formattedData });
  } catch (error: any) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
