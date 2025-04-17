import { NextRequest } from "next/server";
import { redis } from "@/lib/redis";

const NONCE_TTL = 60 * 60; // 1 hour in seconds

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
    console.log({ wallet_address });

    const baseNonce = await getNonceFromGraphQL(wallet_address);

    if (baseNonce === null) {
      return Response.json(
        {
          success: false,
          message: "Failed to get nonce from Minascan GraphQL API",
        },
        { status: 500 }
      );
    }

    // Calculate final nonce
    const finalNonce = baseNonce;

    return Response.json(
      {
        success: true,
        nonce: finalNonce,
        base_nonce: finalNonce,
        pending_count: 0,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error fetching nonce:", error);
    return Response.json(
      { success: false, message: error.toString() },
      { status: 500 }
    );
  }
}

async function getNonceFromGraphQL(
  walletAddress: string
): Promise<number | null> {
  try {
    const query = `
      {
        account(publicKey: "${walletAddress}") {
          nonce
        }
      }
    `;

    const response = await fetch(
      "https://api.minascan.io/node/mainnet/v1/graphql",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      }
    );

    const result = await response.json();
    console.log("GraphQL response:", result);

    if (result.data?.account?.nonce) {
      // GraphQL may return nonce as a string, convert to number
      return parseInt(result.data.account.nonce, 10);
    }

    return null;
  } catch (error) {
    console.error("Error getting nonce from GraphQL:", error);
    return null;
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

export async function POST(request: NextRequest) {
  try {
    const { wallet_address, action = "increment" } = await request.json();

    if (!wallet_address) {
      return Response.json(
        { success: false, message: "Wallet address is required" },
        { status: 400 }
      );
    }

    const pendingKey = `nonce_pending:${wallet_address}`;

    // Get current pending count
    const pendingCount = await redis.get(pendingKey);
    const currentValue = pendingCount
      ? parseInt(pendingCount as string, 10)
      : 0;
    let newValue = currentValue;

    if (action === "increment") {
      // Increment pending count
      newValue = currentValue + 1;
      await redis.set(pendingKey, newValue, { ex: NONCE_TTL });
      console.log(
        `Incremented pending count for ${wallet_address} from ${currentValue} to ${newValue}`
      );
    } else if (action === "decrement") {
      // Decrement pending count, but never below 0
      newValue = Math.max(0, currentValue - 1);
      await redis.set(pendingKey, newValue, { ex: NONCE_TTL });
      console.log(
        `Decremented pending count for ${wallet_address} from ${currentValue} to ${newValue}`
      );
    } else if (action === "reset") {
      // Reset pending count to 0
      newValue = 0;
      await redis.set(pendingKey, 0, { ex: NONCE_TTL });
      console.log(`Reset pending count for ${wallet_address} to 0`);
    }

    return Response.json(
      {
        success: true,
        wallet_address,
        previous_count: currentValue,
        new_count: newValue,
        action,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error managing pending count:", error);
    return Response.json(
      { success: false, message: error.toString() },
      { status: 500 }
    );
  }
}
