import { NextRequest } from "next/server";
import { supabaseServiceClient as supabase } from "@/db/config/server";
import { withAuth } from "../../authMiddleware";

const verifyHandler = async (request: NextRequest) => {
  try {
    const { chatId, walletAddress } = await request.json();
    const authenticatedWallet = request.headers.get("Wallet-Address");

    if (!chatId || !walletAddress) {
      return Response.json(
        { success: false, message: "Missing required parameters" },
        { status: 400 }
      );
    }

    if (authenticatedWallet !== walletAddress) {
      return Response.json(
        { success: false, message: "Unauthorized verification attempt" },
        { status: 403 }
      );
    }

    // Check if already verified
    const { data: existingAuth } = await supabase
      .from("telegram_auth")
      .select()
      .eq("chat_id", chatId)
      .eq("wallet_address", walletAddress)
      .single();

    if (existingAuth?.authenticated) {
      return Response.json(
        { success: false, message: "Already verified" },
        { status: 400 }
      );
    }

    // Create or update telegram auth record
    const { error: upsertError } = await supabase
      .from("telegram_auth")
      .upsert({
        chat_id: chatId,
        wallet_address: walletAddress,
        authenticated: true,
      })
      .select()
      .single();

    if (upsertError) throw upsertError;

    // TODO: Call admin API to update bot state
    // const adminResponse = await fetch("ADMIN_API_URL", {
    //   method: "POST",
    //   headers: {
    //     "Authorization": `Bearer ${process.env.ADMIN_API_TOKEN}`,
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify({ chatId, walletAddress })
    // });

    return Response.json({ success: true });
  } catch (error: any) {
    console.error("Verification error:", error);
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
};

export const POST = withAuth(verifyHandler);
