// src/app/api/pvp/challenges/accepted/route.ts
import { supabaseServiceClient as supabase } from "@/db/config/server";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const wallet_address = searchParams.get("wallet_address") || "";

  try {
    // First get all challenges this user has joined
    const { data: userParticipations, error: participationError } =
      await supabase
        .from("pvp_challenge_participants")
        .select("challenge_id")
        .eq("wallet_address", wallet_address);

    if (participationError) throw participationError;

    // Get the challenge IDs the user has participated in
    const challengeIds = userParticipations.map((p) => p.challenge_id);

    if (challengeIds.length === 0) {
      return Response.json({ success: true, data: [] });
    }

    // Get all challenges with all their participants
    const { data: challenges, error: challengesError } = await supabase
      .from("pvp_challenges")
      .select(
        `
        *,
        participants:pvp_challenge_participants(*)
      `
      )
      .in("id", challengeIds)
      .order("created_at", { ascending: false });

    if (challengesError) throw challengesError;

    // Format the data
    const formattedData = challenges.map((challenge) => ({
      challenge: {
        id: challenge.id,
        name: challenge.name,
        created_by: challenge.created_by,
        invite_code: challenge.invite_code,
        entry_fee: challenge.entry_fee,
        end_time: challenge.end_time,
        max_participants: challenge.max_participants,
        is_speed_challenge: challenge.is_speed_challenge,
        speed_duration: challenge.speed_duration,
        created_at: challenge.created_at,
        updated_at: challenge.updated_at,
      },
      participants: (challenge.participants || []).sort(
        (participant1, participant2) =>
          participant1.wallet_address === wallet_address
            ? -1
            : participant2.wallet_address === wallet_address
            ? 1
            : 0
      ),
    }));

    return Response.json({ success: true, data: formattedData });
  } catch (error: any) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
