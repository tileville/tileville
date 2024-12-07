// src/app/api/pvp/challenges/route.ts
import { supabaseServiceClient as supabase } from "@/db/config/server";
import { NextRequest } from "next/server";
import { withAuth } from "../../authMiddleware";
import { v4 as uuidv4 } from "uuid";
import type { Database } from "@/lib/database.types";

type PVPChallengeInsert =
  Database["public"]["Tables"]["pvp_challenges"]["Insert"];

const postHandler = async (request: NextRequest) => {
  try {
    const payload = await request.json();
    const wallet_address = request.headers.get("Wallet-Address");

    if (!wallet_address) {
      throw new Error("Wallet address is required");
    }

    console.log("route is getting called");

    const {
      name,
      entry_fee,
      end_time,
      max_participants,
      is_speed_challenge,
      speed_duration,
    } = payload;

    const challenge: PVPChallengeInsert = {
      name,
      created_by: wallet_address,
      invite_code: uuidv4(),
      entry_fee,
      end_time: new Date(end_time).toISOString(),
      max_participants,
      is_speed_challenge,
      speed_duration: is_speed_challenge ? speed_duration : null,
      status: "PENDING",
    };

    const { data, error } = await supabase
      .from("pvp_challenges")
      .insert(challenge)
      .select()
      .single();

    if (error) throw error;

    return Response.json({ success: true, data });
  } catch (error: any) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
};

export const POST = withAuth(postHandler);
