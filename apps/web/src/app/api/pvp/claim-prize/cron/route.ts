export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { supabaseServiceClient as supabase } from "@/db/config/server";
import { sendMinaTokens } from "@/lib/mina-transactions";
import { isAfter } from "date-fns";
import { TransactionStatus } from "@/lib/types";

type ParticipantData = {
  wallet_address: string;
  score: number | null;
  txn_hash: string | null;
  txn_status: TransactionStatus;
  has_played: boolean;
};

type ChallengeData = {
  id: number;
  entry_fee: number;
  end_time: string;
  max_participants: number;
  is_reward_sent: boolean;
  participants: ParticipantData[];
};

function findWinner(participants: ParticipantData[]): ParticipantData | null {
  const playedParticipants = participants.filter(
    (p) => p.has_played && p.score !== null
  );
  if (playedParticipants.length === 0) return null;

  return playedParticipants.reduce((prev, current) => {
    if (!prev.score || (current.score && current.score > prev.score)) {
      return current;
    }
    return prev;
  });
}

function shouldProcessChallenge(challenge: ChallengeData): boolean {
  if (challenge.is_reward_sent) return false;

  const currentTime = new Date();
  const endTime = new Date(challenge.end_time);

  const confirmedAndPlayedParticipants = challenge.participants.filter(
    (p) => p.txn_status === "CONFIRMED" && p.has_played
  );

  // If max participants have already played, process the challenge
  if (confirmedAndPlayedParticipants.length >= challenge.max_participants) {
    return true;
  }

  // Otherwise, only process if challenge has ended
  return isAfter(currentTime, endTime);
}

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

let lastPaymentTime = 0; // Track when the last payment was made

async function processSingleChallenge(challenge: ChallengeData) {
  try {
    console.log(`Processing challenge ${challenge.id}...`);

    // Find winner
    const winner = findWinner(challenge.participants);
    if (!winner) {
      console.log(`No winner found for challenge id ${challenge.id}`);
      return {
        success: false,
        message: "No winner found",
        challengeId: challenge.id,
      };
    }

    // Calculate prize amount
    const paidParticipants = challenge.participants.filter(
      (p) => p.txn_status === "CONFIRMED"
    );

    // Total pool minus 1 MINA for platform fees
    const prizeAmount = challenge.entry_fee * paidParticipants.length - 1;

    if (prizeAmount <= 0) {
      console.log(
        `Invalid prize amount ${prizeAmount} for challenge ${challenge.id}`
      );
      return {
        success: false,
        message: `Invalid prize amount ${prizeAmount} for challenge ${challenge.id}`,
        challengeId: challenge.id,
      };
    }

    // Wait for 1 minute if less than 60 seconds have passed since last payment
    const now = Date.now();
    const timeSinceLastPayment = now - lastPaymentTime;
    if (lastPaymentTime !== 0 && timeSinceLastPayment < 120000) {
      const waitTime = 120000 - timeSinceLastPayment;
      console.log(
        `Waiting ${waitTime / 1000} seconds before processing payment...`
      );
      await wait(waitTime);
    }

    // Send prize
    console.log(
      `Sending ${prizeAmount} MINA to ${winner.wallet_address} for challenge ${challenge.id}`
    );
    const { success, txHash, error } = await sendMinaTokens({
      amount: prizeAmount,
      address: winner.wallet_address,
      challengeId: `${challenge.id}`,
    });

    // Update lastPaymentTime after successful payment
    if (success) {
      lastPaymentTime = Date.now();
    }

    if (!success) {
      console.error(
        `Failed to send prize for challenge ${challenge.id}:`,
        error
      );
      return {
        success: false,
        message: `Failed to send prize: ${error}`,
        challengeId: challenge.id,
      };
    }

    // Update challenge status
    const { error: updateError } = await supabase
      .from("pvp_challenges")
      .update({
        is_reward_sent: true,
        reward_txn_hash: txHash,
      })
      .eq("id", challenge.id);

    if (updateError) {
      console.error(`Failed to update challenge ${challenge.id}:`, updateError);
      return {
        success: false,
        message: "Failed to update challenge status",
        challengeId: challenge.id,
      };
    }

    console.log(`Successfully processed challenge ${challenge.id}`);
    return {
      success: true,
      txHash,
      challengeId: challenge.id,
      winner: winner.wallet_address,
      amount: prizeAmount,
    };
  } catch (error) {
    console.error(`Error processing challenge ${challenge.id}:`, error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
      challengeId: challenge.id,
    };
  }
}

export async function GET(request: NextRequest) {
  try {
    console.log("Starting cron job for prize distribution...");

    // Verify cron secret if provided
    const authHeader = request.headers.get("authorization");
    if (process.env.CRON_SECRET && authHeader !== process.env.CRON_SECRET) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Fetch all unclaimed challenges
    const { data: challengesRaw, error: fetchError } = await supabase
      .from("pvp_challenges")
      .select(
        `
        id,
        entry_fee,
        end_time,
        max_participants,
        is_reward_sent,
        participants:pvp_challenge_participants(
          wallet_address,
          score,
          txn_hash,
          txn_status,
          has_played
        )
      `
      )
      .eq("is_reward_sent", false);

    if (fetchError) {
      console.error("Failed to fetch challenges:", fetchError);
      return NextResponse.json(
        { success: false, message: "Failed to fetch challenges" },
        { status: 500 }
      );
    }

    // Transform the raw data to ensure it matches our types
    const challenges: ChallengeData[] = challengesRaw.map((challenge) => ({
      ...challenge,
      participants: challenge.participants.map((p) => ({
        ...p,
        txn_status: (p.txn_status || "NOT_INIT") as TransactionStatus,
      })),
    })) as ChallengeData[];

    console.log(`Found ${challenges.length} unclaimed challenges`);

    // Filter challenges that need processing
    const challengesToProcess = challenges.filter(shouldProcessChallenge);

    console.log(`Processing ${challengesToProcess.length} challenges`);

    // Process each challenge
    const results = [];
    for (const challenge of challengesToProcess) {
      const result = await processSingleChallenge(challenge);
      results.push(result);
    }
    // Summarize results
    const successful = results.filter((r) => r.success);
    const failed = results.filter((r) => !r.success);

    console.log(
      `Completed processing. Success: ${successful.length}, Failed: ${failed.length}`
    );

    return NextResponse.json({
      success: true,
      processed: challengesToProcess.length,
      successful: successful.length,
      failed: failed.length,
      results,
    });
  } catch (error) {
    console.error("Cron job failed:", error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
