// src/app/api/pvp/challenges/created/route.ts
import { supabaseServiceClient as supabase } from "@/db/config/server";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const wallet_address = searchParams.get("wallet_address") || "";

  try {
    const { data: challenges, error: challengesError } = await supabase
      .from("pvp_challenges")
      .select(
        `
        *,
        participants:pvp_challenge_participants(*)
      `
      )
      .eq("created_by", wallet_address)
      .order("created_at", { ascending: false });

    if (challengesError) throw challengesError;

    // Transform data to match standardized format
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
        status: challenge.status,
        created_at: challenge.created_at,
        updated_at: challenge.updated_at,
      },
      participants: challenge.participants || [],
    }));

    return Response.json({ success: true, data: formattedData });
  } catch (error: any) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
