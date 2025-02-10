import { NextRequest, NextResponse } from "next/server";
import { supabaseServiceClient as supabase } from "@/db/config/server";
import { sendMinaTokens } from "@/lib/mina-transactions";

type ParticipantData = {
  wallet_address: string;
  score: number | null;
  txn_hash: string | null;
  txn_status: string | null;
};

const claimPrizeHandler = async (request: NextRequest) => {
  try {
    const { challengeId, winnerAddress } = await request.json();

    if (!challengeId || !winnerAddress) {
      return NextResponse.json(
        {
          success: false,
          message: "challengeId and winnerAddress are required",
        },
        { status: 400 }
      );
    }

    // Get challenge details
    const { data: challenge, error: challengeError } = await supabase
      .from("pvp_challenges")
      .select(
        `
        id,
        entry_fee,
        is_reward_sent,
        participants:pvp_challenge_participants(
          wallet_address,
          score,
          txn_hash,
          txn_status
        )
      `
      )
      .eq("id", challengeId)
      .single();

    if (challengeError) {
      return NextResponse.json(
        { success: false, message: "Failed to fetch challenge details" },
        { status: 500 }
      );
    }

    if (!challenge) {
      return NextResponse.json(
        { success: false, message: "Challenge not found" },
        { status: 404 }
      );
    }

    if (challenge.is_reward_sent) {
      return NextResponse.json(
        { success: false, message: "Prize already claimed for this challenge" },
        { status: 400 }
      );
    }

    // Ensure participants array is correctly typed
    const participants: ParticipantData[] = Array.isArray(
      challenge.participants
    )
      ? challenge.participants
      : [];

    // Find the winner (handling null scores safely)
    const winner = participants.reduce((prev, current) => {
      if (
        !prev ||
        (current.score !== null &&
          (prev.score === null || current.score > prev.score))
      ) {
        return current;
      }
      return prev;
    }, participants[0]);

    if (!winner || winner.wallet_address !== winnerAddress) {
      return NextResponse.json(
        {
          success: false,
          message: "Provided winner address does not match actual winner",
        },
        { status: 400 }
      );
    }

    const paidParticipants = participants.filter(
      (participant) =>
        participant.txn_hash !== null && participant.txn_status === "CONFIRMED"
    );

    if (paidParticipants.length <= 0) {
      return NextResponse.json(
        {
          success: false,
          message: "No one has paid fees for this challenge",
        },
        { status: 400 }
      );
    }

    console.log("paid participants", paidParticipants);

    const prizeAmount = challenge.entry_fee * (paidParticipants.length - 1);
    console.log("prize amount", prizeAmount);

    if (prizeAmount == 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Prize amount should be greater than 0 to be claimed",
        },
        { status: 400 }
      );
    }

    // Send MINA tokens to winner
    const { success, error, txHash } = await sendMinaTokens({
      amount: prizeAmount,
      address: winnerAddress,
      challengeId,
    });

    if (!success) {
      return NextResponse.json(
        { success: false, message: `Failed to send prize: ${error}` },
        { status: 500 }
      );
    }

    // Update challenge in database
    const { error: updateError } = await supabase
      .from("pvp_challenges")
      .update({
        is_reward_sent: true,
        reward_txn_hash: txHash,
      })
      .eq("id", challengeId);

    if (updateError) {
      return NextResponse.json(
        { success: false, message: "Failed to update challenge" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Prize claimed successfully",
      txHash,
    });
  } catch (error: any) {
    console.error("Error in claim prize API:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to claim prize" },
      { status: 500 }
    );
  }
};

export const POST = claimPrizeHandler;
