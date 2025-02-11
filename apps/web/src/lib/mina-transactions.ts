import { Client, NetworkId } from "mina-signer";
import {
  MINASCAN_API_URL,
  SENDER_PRIVATE_KEY,
  SENDER_PUBLIC_KEY,
} from "@/constants";
import { NETWORKS } from "@/constants/network";
import { formatAddress } from "./helpers";
import { sendRewardTransactionNotification } from "@/app/api/lib/telegram-notifications";

const MINA_CONVERSION_FACTOR = 1_000_000_000;
const DEFAULT_FEE = 100_000_000;
const MAX_TRANSFER_AMOUNT = 15;

const client = new Client({ network: NETWORKS[1].chainId as NetworkId });

const NO_CACHE_HEADERS = {
  "Content-Type": "application/json",
  "Cache-Control": "no-cache, no-store, must-revalidate",
  Pragma: "no-cache",
  Expires: "0",
};

interface FetchNonceResponse {
  data?: {
    account?: {
      nonce: number;
    };
  };
  errors?: Array<{ message: string }>;
}

interface SendPaymentResponse {
  data?: {
    sendPayment?: {
      payment?: {
        hash: string;
      };
    };
  };
  errors?: Array<{ message: string }>;
}

export async function fetchNonce(publicKey: string): Promise<number | null> {
  console.info(
    `[Mina] Fetching nonce for public key: ${formatAddress(publicKey)}`
  );

  const fetchNonceQuery = `
    query FetchNonce($publicKey: String!, $timestamp: Float!) {
      account(publicKey: $publicKey) {
        nonce
      }
    }
  `;

  try {
    const fetchNonceBody = JSON.stringify({
      query: fetchNonceQuery,
      variables: {
        publicKey,
        timestamp: Date.now(),
      },
      operationName: "FetchNonce",
      fetchPolicy: "network-only",
    });

    const nonceResponse = await fetch(MINASCAN_API_URL, {
      method: "POST",
      headers: NO_CACHE_HEADERS,
      body: fetchNonceBody,
      cache: "no-store",
    });

    if (!nonceResponse.ok) {
      throw new Error(`HTTP error! status: ${nonceResponse.status}`);
    }

    const nonceResponseJson =
      (await nonceResponse.json()) as FetchNonceResponse;

    if (nonceResponseJson.errors) {
      throw new Error(
        `GraphQL errors: ${JSON.stringify(nonceResponseJson.errors)}`
      );
    }

    const nonce = nonceResponseJson.data?.account?.nonce;
    if (nonce === undefined) {
      throw new Error("Nonce not found in response");
    }

    console.info(`[Mina] Successfully fetched nonce: ${nonce}`);
    return nonce;
  } catch (error) {
    console.error("[Mina] Failed to fetch nonce:", {
      error: error instanceof Error ? error.message : "Unknown error",
      publicKey: formatAddress(publicKey),
      timestamp: new Date().toISOString(),
    });
    return null;
  }
}

interface SendMinaTokensParams {
  amount: number;
  address: string;
  challengeId?: string;
}

interface SendMinaTokensResult {
  success: boolean;
  txHash?: string;
  error?: string;
}

export async function sendMinaTokens({
  amount,
  address,
  challengeId,
}: SendMinaTokensParams): Promise<SendMinaTokensResult> {
  console.info("[Mina] Initiating token transfer:", {
    to: address,
    amount,
    challengeId,
    timestamp: new Date().toISOString(),
  });

  try {
    if (amount > MAX_TRANSFER_AMOUNT) {
      const error = `Transfer amount ${amount} MINA exceeds maximum limit of ${MAX_TRANSFER_AMOUNT} MINA`;
      console.error("[Mina] Transfer amount exceeds limit:", {
        amount,
        maxLimit: MAX_TRANSFER_AMOUNT,
        challengeId,
        timestamp: new Date().toISOString(),
      });

      await sendRewardTransactionNotification({
        challengeId: Number(challengeId),
        winnerAddress: address,
        amount,
        success: false,
        error: `🚨 ALERT: High Value Transfer Blocked!\nTransfer amount ${amount} MINA exceeds maximum limit of ${MAX_TRANSFER_AMOUNT} MINA`,
      });

      return {
        success: false,
        error,
      };
    }

    if (!SENDER_PUBLIC_KEY || !SENDER_PRIVATE_KEY) {
      throw new Error("Missing sender credentials");
    }

    if (!client) {
      throw new Error("MINA client initialization failed");
    }

    const nonce = await fetchNonce(SENDER_PUBLIC_KEY);
    if (!nonce) {
      throw new Error("Failed to fetch nonce");
    }

    console.info(`[Mina] Preparing payment for CID ${challengeId}`, {
      nonce,
      timestamp: new Date().toISOString(),
    });

    const payment = {
      from: SENDER_PUBLIC_KEY,
      to: address,
      amount: amount * MINA_CONVERSION_FACTOR,
      nonce,
      fee: DEFAULT_FEE,
      memo: challengeId ? `CID ${challengeId} reward` : undefined,
    };

    const signedPayment = client.signPayment(payment, SENDER_PRIVATE_KEY);
    if (!client.verifyPayment(signedPayment)) {
      throw new Error("Payment verification failed");
    }

    console.info("[Mina] Payment signed and verified successfully");

    const sendPaymentMutationQuery = `
      mutation SendPayment($input: SendPaymentInput!, $signature: SignatureInput!) {
        sendPayment(input: $input, signature: $signature) {
          payment {
            hash
          }
        }
      }
    `;

    const paymentResponse = await fetch(MINASCAN_API_URL, {
      method: "POST",
      headers: NO_CACHE_HEADERS,
      body: JSON.stringify({
        query: sendPaymentMutationQuery,
        variables: {
          input: signedPayment.data,
          signature: signedPayment.signature,
        },
        operationName: "SendPayment",
      }),
    });

    if (!paymentResponse.ok) {
      throw new Error(`HTTP error! status: ${paymentResponse.status}`);
    }

    const paymentResponseJson =
      (await paymentResponse.json()) as SendPaymentResponse;

    if (paymentResponseJson.errors) {
      throw new Error(
        `GraphQL errors: ${JSON.stringify(paymentResponseJson.errors)}`
      );
    }

    const txHash = paymentResponseJson.data?.sendPayment?.payment?.hash;
    if (!txHash) {
      throw new Error("Transaction hash not found in response");
    }

    console.info("[Mina] Transaction completed successfully:", {
      txHash,
      amount,
      recipient: address.slice(0, 10) + "...",
      challengeId,
      timestamp: new Date().toISOString(),
    });

    await sendRewardTransactionNotification({
      challengeId: Number(challengeId),
      winnerAddress: address,
      amount,
      success: true,
      txHash,
    });

    return {
      success: true,
      txHash,
    };
  } catch (error) {
    console.error("[Mina] Transaction failed:", {
      error: error instanceof Error ? error.message : "Unknown error",
      amount,
      recipient: address.slice(0, 10) + "...",
      challengeId,
      timestamp: new Date().toISOString(),
    });

    await sendRewardTransactionNotification({
      challengeId: Number(challengeId),
      winnerAddress: address,
      amount,
      success: false,
      error: error instanceof Error ? error.message : "Failed to send tokens",
    });

    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to send tokens",
    };
  }
}
