// src/app/api/pvp/challenges/join/route.ts
import { supabaseServiceClient as supabase } from "@/db/config/server";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { challenge_id, wallet_address } = await request.json();

    // Check if challenge exists and get max_participants
    const { data: challenge, error: challengeError } = await supabase
      .from("pvp_challenges")
      .select("max_participants")
      .eq("id", challenge_id)
      .single();

    if (challengeError) throw challengeError;
    if (!challenge) {
      return Response.json(
        { success: false, message: "Challenge not found" },
        { status: 404 }
      );
    }

    // Get current participant count
    const { count: currentParticipants, error: countError } = await supabase
      .from("pvp_challenge_participants")
      .select("*", { count: "exact" })
      .eq("challenge_id", challenge_id);

    if (countError) throw countError;

    // Safely check participant count - if null, assume 0
    const participantCount = currentParticipants ?? 0;

    // Check if max participants limit is reached
    if (participantCount >= challenge.max_participants) {
      return Response.json(
        {
          success: false,
          message: `Challenge is full. Maximum ${challenge.max_participants} participants allowed.`,
        },
        { status: 400 }
      );
    }

    // Check if user has already joined
    const { data: existingParticipant } = await supabase
      .from("pvp_challenge_participants")
      .select()
      .eq("challenge_id", challenge_id)
      .eq("wallet_address", wallet_address)
      .single();

    if (existingParticipant) {
      return Response.json(
        { success: false, message: "Already joined this challenge" },
        { status: 400 }
      );
    }

    // Add participant to challenge
    const { data, error } = await supabase
      .from("pvp_challenge_participants")
      .insert({
        challenge_id,
        wallet_address,
        status: "JOINED",
      })
      .select()
      .single();

    if (error) throw error;

    return Response.json({
      success: true,
      data,
      message: "Successfully joined the challenge",
    });
  } catch (error: any) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
