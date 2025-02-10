import { Client, NetworkId } from "mina-signer";
import {
  MINASCAN_API_URL,
  SENDER_PRIVATE_KEY,
  SENDER_PUBLIC_KEY,
} from "@/constants";
import { NETWORKS } from "@/constants/network";

const client = new Client({ network: NETWORKS[1].chainId as NetworkId });

export async function fetchNonce(publicKey: string): Promise<number | null> {
  const fetchNonceQuery = `
    query FetchNonce($publicKey: String!) {
      account(publicKey: $publicKey) {
        nonce
      }
    }
  `;

  try {
    const fetchNonceBody = JSON.stringify({
      query: fetchNonceQuery,
      variables: { publicKey },
      operationName: "FetchNonce",
    });

    const nonceResponse = await fetch(MINASCAN_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: fetchNonceBody,
    });

    const nonceResponseJson = await nonceResponse.json();
    return nonceResponseJson.data.account.nonce;
  } catch (error) {
    console.error("Failed to fetch nonce from GraphQL endpoint:", error);
    return null;
  }
}

export async function sendMinaTokens({
  amount,
  address,
  challengeId,
}: {
  amount: number;
  address: string;
  challengeId?: string;
}): Promise<{ success: boolean; txHash?: string; error?: string }> {
  try {
    if (!SENDER_PUBLIC_KEY || !SENDER_PRIVATE_KEY) {
      throw new Error("SENDER PUBLIC OR PRIVATE KEY IS MISSING");
    }

    const nonce = await fetchNonce(SENDER_PUBLIC_KEY);
    if (!nonce) {
      throw new Error("Failed to fetch nonce");
    }

    const payment = {
      from: SENDER_PUBLIC_KEY,
      to: address,
      amount: amount * 1000_000_000,
      nonce,
      fee: 1000000,
      memo: `CID ${challengeId} reward`,
    };

    const signedPayment = client.signPayment(payment, SENDER_PRIVATE_KEY);

    if (!client.verifyPayment(signedPayment)) {
      throw new Error("Payment verification failed");
    }

    const sendPaymentMutationQuery = `
      mutation SendPayment($input: SendPaymentInput!, $signature: SignatureInput!) {
        sendPayment(input: $input, signature: $signature) {
          payment {
            hash
          }
        }
      }
    `;

    const graphQlVariables = {
      input: signedPayment.data,
      signature: signedPayment.signature,
    };

    const paymentResponse = await fetch(MINASCAN_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: sendPaymentMutationQuery,
        variables: graphQlVariables,
        operationName: "SendPayment",
      }),
    });

    const paymentResponseJson = await paymentResponse.json();

    if (!paymentResponse.ok) {
      throw new Error(JSON.stringify(paymentResponseJson));
    }

    return {
      success: true,
      txHash: paymentResponseJson.data.sendPayment.payment.hash,
    };
  } catch (error: any) {
    console.error("Error sending MINA tokens:", error);
    return {
      success: false,
      error: error.message || "Failed to send tokens",
    };
  }
}
