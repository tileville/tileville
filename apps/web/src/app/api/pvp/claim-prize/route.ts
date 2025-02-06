import { NextRequest } from "next/server";
import { sendMinaTokens } from "@/lib/mina-transactions";
import { withAuth } from "../../authMiddleware";

const sendTokensHandler = async (request: NextRequest) => {
  try {
    const { amount, address } = await request.json();

    if (!amount || !address) {
      return Response.json(
        { success: false, message: "Amount and address are required" },
        { status: 400 }
      );
    }

    const result = await sendMinaTokens({ amount, address });

    if (!result.success) {
      return Response.json(
        { success: false, message: result.error },
        { status: 500 }
      );
    }

    // Save transaction to your database
    // log the transaction

    return Response.json({
      success: true,
      txHash: result.txHash,
    });
  } catch (error: any) {
    console.error("Error in send tokens API:", error);
    return Response.json(
      {
        success: false,
        message: error.message || "Failed to send tokens",
      },
      { status: 500 }
    );
  }
};

export const POST = withAuth(sendTokensHandler);
