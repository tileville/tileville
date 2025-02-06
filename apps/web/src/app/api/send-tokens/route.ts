import { NextRequest } from "next/server";
import { sendMinaTokens } from "@/lib/mina-transactions";

const sendTokensHandler = async (request: NextRequest) => {
  const adminToken = process.env.NEXT_PUBLIC_ADMIN_API_TOKEN;

  const providedToken = request.headers.get("x-auth-token");

  if (!providedToken || providedToken !== adminToken) {
    return new Response(
      JSON.stringify({ success: false, message: "Unauthorized" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const { amount, address } = await request.json();

    if (!amount || !address) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Amount and address are required",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const result = await sendMinaTokens({ amount, address });

    if (!result.success) {
      return new Response(
        JSON.stringify({ success: false, message: result.error }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // Save the transaction to your database, log the transaction, etc.

    return new Response(
      JSON.stringify({ success: true, txHash: result.txHash }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Error in send tokens API:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: error.message || "Failed to send tokens",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

export const POST = sendTokensHandler;
