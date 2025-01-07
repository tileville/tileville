"use client";

import axios from "axios";
import { CHAIN_NAME } from "./constants";

export interface ProofOfNFT {
  key: string;
  value: string;
  isPublic: boolean;
}

export interface SimpleImageData {
  filename: string;
  size: number;
  mimeType: string;
  sha3_512: string;
  storage: string;
}
export interface SimpleMintNFT {
  contractAddress: string;
  chain: string;
  name: string;
  description: string;
  collection: string;
  price: number;
  owner: string;
  image: SimpleImageData;
  keys: ProofOfNFT[];
}

export async function sendTransaction(params: {
  serializedTransaction: string;
  signedData: string;
  mintParams: string;
  contractAddress: string;
  name: string;
  nonce: { success: boolean; nonce: number };
}): Promise<{ isSent: boolean; hash: string; error?: string }> {
  const {
    serializedTransaction,
    signedData,
    contractAddress,
    mintParams,
    name,
  } = params;

  const args = JSON.stringify({
    contractAddress,
  });

  const transaction = JSON.stringify(
    {
      serializedTransaction,
      signedData,
      mintParams,
    },
    null,
    2
  );

  try {
    let answer = await zkCloudWorkerRequest({
      command: "execute",
      transactions: [transaction],
      task: "mint",
      args,
      metadata: `mint NFT @${name}`,
      mode: "async",
    });

    // console.log(`zkCloudWorker answer:`, answer);
    const jobId = answer.jobId;
    if (!jobId) {
      return {
        isSent: false,
        hash: "",
        error: "Failed to get jobId from zkCloud worker",
      };
    }

    let result;
    let retryCount = 0;
    const MAX_RETRIES = 24;

    while (retryCount < MAX_RETRIES) {
      await sleep(5000);

      try {
        answer = await zkCloudWorkerRequest({
          command: "jobResult",
          jobId,
        });
        // console.log(`jobResult api call result:`, answer);

        // Check for various error conditions
        if (answer.jobStatus === "failed" || answer.error) {
          console.error("Transaction failed:", answer.error || "Unknown error");
          return {
            isSent: false,
            hash: "",
            error: answer.error || "Transaction failed",
          };
        }

        result = answer.result; // Get the result from answer

        if (result !== undefined) {
          // Only check for validity if we have a result
          if (
            typeof result !== "string" ||
            result.toLowerCase().includes("error")
          ) {
            return {
              isSent: false,
              hash: "",
              error: "Invalid transaction result",
            };
          }
          // If we have a valid result, return success
          return {
            isSent: true,
            hash: result,
          };
        }

        retryCount++;
      } catch (error: any) {
        console.error("Error checking job status:", error);
        retryCount++;
      }
    }

    // If we exit the loop due to max retries
    return {
      isSent: false,
      hash: "",
      error: "Timeout waiting for zkCloud worker response",
    };
  } catch (error: any) {
    return {
      isSent: false,
      hash: "",
      error: `Transaction failed: ${error.message}`,
    };
  }
}

export async function prepareTransaction(params: SimpleMintNFT): Promise<{
  isPrepared: boolean;
  transaction?: string;
  fee?: number;
  memo?: string;
  serializedTransaction?: string;
  mintParams?: string;
}> {
  const { contractAddress } = params;
  // console.log("sendSimpleMintCommand", params);

  const args = JSON.stringify({
    contractAddress,
  });

  const transaction = JSON.stringify(params, null, 2);

  let answer = await zkCloudWorkerRequest({
    command: "execute",
    transactions: [transaction],
    task: "prepare",
    args,
    metadata: `mint`,
    mode: "async",
  });

  console.log(`zkCloudWorker answer:`, answer);
  const jobId = answer.jobId;
  // console.log(`jobId:`, jobId);
  let result;
  while (result === undefined && answer.jobStatus !== "failed") {
    await sleep(5000);
    answer = await zkCloudWorkerRequest({
      command: "jobResult",
      jobId,
    });
    console.log(`jobResult api call result:`, answer);
    result = answer.result;
    if (result !== undefined) console.log(`jobResult result:`, result);
  }
  if (answer.jobStatus === "failed") {
    return { isPrepared: false };
  } else if (result === undefined) {
    return { isPrepared: false };
  } else return { isPrepared: true, ...JSON.parse(result) };
}

async function zkCloudWorkerRequest(params: any) {
  const { command, task, transactions, args, metadata, mode, jobId } = params;
  const chain = CHAIN_NAME;

  try {
    const apiData = {
      auth: process.env.NEXT_PUBLIC_ZKCW_AUTH,
      command: command,
      jwtToken: process.env.NEXT_PUBLIC_ZKCW_JWT,
      data: {
        task,
        transactions: transactions ?? [],
        args,
        repo: "mint-worker",
        developer: "DFST",
        metadata,
        mode: mode ?? "sync",
        jobId,
      },
      chain,
    };

    const endpoint = process.env.NEXT_PUBLIC_ZKCW_ENDPOINT + CHAIN_NAME;

    const response = await axios.post(endpoint, apiData);

    if (response.data?.error) {
      throw new Error(response.data.error);
    }

    return response.data;
  } catch (error: any) {
    // Handle axios errors
    if (error.response) {
      throw new Error(
        `ZkCloud API error: ${error.response.data?.error || error.message}`
      );
    }
    throw error; // Re-throw other errors
  }
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function serializeTransaction(tx: any): string {
  const length = tx.transaction.accountUpdates.length;
  const blindingValues = [];
  for (let i = 0; i < length; i++) {
    const la = tx.transaction.accountUpdates[i].lazyAuthorization;
    if (
      la !== undefined &&
      la.blindingValue !== undefined &&
      la.kind === "lazy-proof"
    )
      blindingValues.push(la.blindingValue.toJSON());
    else blindingValues.push("");
  }
  const serializedTransaction = JSON.stringify(
    {
      tx: tx.toJSON(),
      blindingValues,
      length,
      fee: tx.transaction.feePayer.body.fee.toJSON(),
      sender: tx.transaction.feePayer.body.publicKey.toBase58(),
      nonce: tx.transaction.feePayer.body.nonce.toBigint().toString(),
    },
    null,
    2
  );
  return serializedTransaction;
}

export async function calculateSHA512(file: File): Promise<string> {
  const readFileAsArrayBuffer = (file: File) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  };

  const arrayBufferToBase64 = (buffer: ArrayBuffer) => {
    const binary = String.fromCharCode(...new Uint8Array(buffer));
    return window.btoa(binary);
  };

  try {
    const arrayBuffer = await readFileAsArrayBuffer(file);

    const hashBuffer = await crypto.subtle.digest(
      "SHA-512",
      arrayBuffer as BufferSource
    );

    const hashBase64 = arrayBufferToBase64(hashBuffer);

    return hashBase64;
  } catch (error) {
    console.error("Error calculating SHA-512 hash:", error);
    throw error;
  }
}
