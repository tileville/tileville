// src/app/api/pvp/challenges/join/route.ts

import { sendChallengeJoinNotification } from "@/app/api/lib/telegram-notifications";
import { supabaseServiceClient as supabase } from "@/db/config/server";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { challenge_id, wallet_address } = await request.json();

    // Check if challenge exists and get details
    const { data: challenge, error: challengeError } = await supabase
      .from("pvp_challenges")
      .select("max_participants, name")
      .eq("id", challenge_id)
      .single();

    if (challengeError) throw challengeError;
    if (!challenge) {
      return Response.json(
        { success: false, message: "Challenge not found" },
        { status: 404 }
      );
    }

    // Get current participants
    const { data: currentParticipants, error: participantsError } =
      await supabase
        .from("pvp_challenge_participants")
        .select("wallet_address")
        .eq("challenge_id", challenge_id);

    if (participantsError) throw participantsError;

    // Check if max participants limit is reached
    if ((currentParticipants?.length ?? 0) >= challenge.max_participants) {
      return Response.json(
        {
          success: false,
          message: `Challenge is full. Maximum ${challenge.max_participants} participants allowed.`,
        },
        { status: 400 }
      );
    }

    // Check if user has already joined
    const existingParticipant = currentParticipants?.find(
      (p) => p.wallet_address === wallet_address
    );

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
      })
      .select()
      .single();

    if (error) throw error;

    // Send notifications to existing participants
    if (currentParticipants?.length) {
      await sendChallengeJoinNotification({
        newParticipant: wallet_address,
        challengeName: challenge.name,
        currentParticipants: currentParticipants.map((p) => p.wallet_address),
      });
    }

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
