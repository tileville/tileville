import { supabaseServiceClient as supabase } from "@/db/config/server";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { code: string } }
) {
  try {
    // Fetch the challenge with its participants
    const { data: challenge, error: challengeError } = await supabase
      .from("pvp_challenges")
      .select(
        `
        *,
        participants:pvp_challenge_participants(*)
      `
      )
      .eq("invite_code", params.code)
      .single();

    if (challengeError) throw challengeError;

    if (!challenge) {
      return Response.json(
        { success: false, message: "Challenge not found" },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      data: challenge,
    });
  } catch (error: any) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
