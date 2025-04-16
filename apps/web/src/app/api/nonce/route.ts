import { NonceService } from "@/lib/services/nonce-service";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const wallet_address = searchParams.get("wallet_address") || "";

  if (!wallet_address) {
    return Response.json(
      { success: false, message: "Wallet address is required" },
      { status: 400 }
    );
  }

  try {
    console.log("Fetching nonce for wallet:", wallet_address);

    // Try to get nonce from Redis first
    let nonce = await NonceService.getNonce(wallet_address);

    // If nonce doesn't exist in Redis, fetch from Minatokens API
    if (nonce === null) {
      nonce = await getNonceFromMinatokens(wallet_address);

      // If successful, save to Redis for future use
      if (nonce !== null) {
        await NonceService.saveNonce(wallet_address, nonce);
        console.log(
          `Initialized nonce for ${wallet_address} to ${nonce} from Minatokens API`
        );
      } else {
        // If Minatokens API fails, set a default starting nonce
        nonce = 1; // Default starting nonce
        await NonceService.saveNonce(wallet_address, nonce);
        console.log(
          `Failed to get nonce from API. Initialized ${wallet_address} with default nonce: ${nonce}`
        );
      }
    }

    return Response.json({ success: true, nonce }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching nonce:", error);
    return Response.json(
      { success: false, message: error.toString() },
      { status: 500 }
    );
  }
}

async function getNonceFromMinatokens(
  walletAddress: string
): Promise<number | null> {
  try {
    const nonceResponse = await fetch(
      "https://minatokens.com/api/v1/info/nonce",
      {
        method: "POST",
        body: JSON.stringify({
          address: walletAddress,
        }),
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.MINATOKENS_API_KEY || "",
        },
      }
    );

    const nonceJson = await nonceResponse.json();
    console.log("Nonce response from Minatokens:", nonceJson);

    if (nonceJson?.nonce !== undefined) {
      return nonceJson.nonce;
    }

    return null;
  } catch (error) {
    console.error("Error getting nonce from Minatokens:", error);
    return null;
  }
}

// Add a POST endpoint to increment nonce (useful after transaction confirmation)
export async function POST(request: NextRequest) {
  try {
    const { wallet_address } = await request.json();

    if (!wallet_address) {
      return Response.json(
        { success: false, message: "Wallet address is required" },
        { status: 400 }
      );
    }

    const newNonce = await NonceService.incrementNonce(wallet_address);

    if (newNonce === null) {
      return Response.json(
        { success: false, message: "Failed to increment nonce" },
        { status: 500 }
      );
    }

    return Response.json({ success: true, nonce: newNonce }, { status: 200 });
  } catch (error: any) {
    console.error("Error incrementing nonce:", error);
    return Response.json(
      { success: false, message: error.toString() },
      { status: 500 }
    );
  }
}
