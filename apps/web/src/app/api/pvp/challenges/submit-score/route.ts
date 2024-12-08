// src/app/api/pvp/challenges/submit-score/route.ts

import { supabaseServiceClient as supabase } from "@/db/config/server";
import { NextRequest } from "next/server";
import { withAuth } from "../../../authMiddleware";

const postHandler = async (request: NextRequest) => {
  try {
    const { challenge_id, score } = await request.json();
    const wallet_address = request.headers.get("Wallet-Address");

    if (!wallet_address) {
      throw new Error("Wallet address is required");
    }

    const { error } = await supabase
      .from("pvp_challenge_participants")
      .update({
        score,
        has_played: true,
        played_at: new Date().toISOString(),
      })
      .eq("challenge_id", challenge_id)
      .eq("wallet_address", wallet_address);

    if (error) throw error;

    return Response.json({ success: true });
  } catch (error: any) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
};

export const POST = withAuth(postHandler);
