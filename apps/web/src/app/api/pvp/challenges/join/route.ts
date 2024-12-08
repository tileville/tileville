// src/app/api/pvp/challenges/join/route.ts
import { supabaseServiceClient as supabase } from "@/db/config/server";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { challenge_id, wallet_address } = await request.json();

    // Check if user has already joined this challenge
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
