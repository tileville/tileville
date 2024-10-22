import {
  ProviderError,
  SendTransactionResult,
} from "@aurowallet/mina-provider";
import clsx, { ClassValue } from "clsx";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";
import { TREASURY_ADDRESS } from "@/constants";
import { data as mockTxnData } from "@/hooks/mockTxnData";

export function walletInstalled() {
  return typeof mina !== "undefined";
}

export const formatAddress = (address: string | undefined) =>
  address ? address.slice(0, 5) + "..." + address.slice(-5) : "None";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTimestampToReadableDate(timestamp: string): string {
  const date = new Date(timestamp);

  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  };

  return date.toLocaleDateString("en-US", options);
}

export function formatTimestampToReadableAge(timestamp: string): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds`;
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minutes`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    const minutes = diffInMinutes % 60;
    return minutes === 0
      ? `${diffInHours} hours`
      : `${diffInHours} hours ${minutes} minutes`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  const hours = diffInHours % 24;
  return hours === 0
    ? `${diffInDays} days`
    : `${diffInDays} days ${hours} hours`;
}

export const getMinaScanLink = (txnHash: string) =>
  `https://minascan.io/mainnet/tx/${txnHash}?type=zk-tx`;

export const getMINANFTLink = (txnHash: string) =>
  `https://minanft.io/explore?query=${txnHash}`;

export const getMINAScanAccountLink = (address: string) =>
  `https://minascan.io/mainnet/account/${address}`;

export async function requestAccounts() {
  if (window.mina?.isPallad) {
    return await window.mina
      ?.request({ method: "mina_accounts" })
      .then((resp) => resp.result);
  } else {
    return await window.mina?.requestAccounts();
  }
}

export async function requestNetwork() {
  if (window.mina?.isPallad) {
    return await window.mina
      ?.request({ method: "mina_requestNetwork" })
      .then((resp) => resp.result);
  } else {
    return await (window as any).mina?.requestNetwork();
  }
}

export async function signMessage(message: string) {
  if (window.mina?.isPallad) {
    return await window.mina
      ?.request({ method: "mina_sign", params: { message } })
      .then((resp) => resp.result);
  } else {
    return (window as any).mina?.signMessage({
      message,
    });
  }
}

//TODO: REMOVE IT AFTER TESTING
export async function dummy() {
  const transaction = JSON.parse(mockTxnData.transaction);
  if (window.mina?.isPallad) {
    console.log("INIT DUMMY FLOW");
    const signedTransactionResponse = async () => {
      const response = await (window as any).mina.request({
        method: "mina_signTransaction",
        params: { transaction },
      });
      return response.result;
    };
    const signedTransaction = await signedTransactionResponse();

    console.log("signedTransaction", JSON.stringify(signedTransaction));
    const response = await (window as any).mina?.request({
      method: "mina_sendTransaction",
      params: {
        signedTransaction,
        transactionType: "zkapp",
      },
    });

    const hash = response.result.hash;
    console.log("DUMMY RESIUKT", hash);
  } else {
    console.log("Incorrect wallet");
  }
}
export async function sendPayment({
  from,
  amount,
}: {
  from: string;
  amount: number;
}) {
  const nonceResponse = await fetch(`/api/nonce?wallet_address=${from}`);
  const nonce = await nonceResponse.json();
  console.log("nonce", nonce);
  if (!nonce.success) {
    throw new Error("failed to fetch nonce");
    return;
  }
  console.log("nonce", nonce);
  const transaction = {
    to: TREASURY_ADDRESS,
    memo: "game fess",
    fee: 100_000_000,
    amount: amount * 1000_000_000,
    nonce: nonce.nonce,
    from: from,
  };

  console.log("transaction", transaction)

  if (false) {
    const signedTransactionResponse = async () => {
      const response = await (window as any).mina.request({
        method: "mina_signTransaction",
        params: { transaction },
      });
      return response.result;
    };

    const signedTransaction = await signedTransactionResponse();

    console.log("signedTransaction", JSON.stringify(signedTransaction));
    const response = await (window as any).mina?.request({
      method: "mina_sendTransaction",
      params: {
        signedTransaction,
        transactionType: "payment",
      },
    });

    return response.result.hash;
  } else {
    console.log("flow in else block")
    try {
      const payload = {
        amount: amount,
        to: TREASURY_ADDRESS,
        memo: `Pay fees`,
        fee: 0.02,
                nonce: nonce.nonce
      }
      console.log("payload", payload)
      const data: SendTransactionResult | ProviderError = await (
        window as any
      )?.mina?.sendPayment(payload);
      console.log("Transaction data", data)
      return (data as SendTransactionResult).hash;
    } catch (err: any) {
      console.log("Transaction error", err)
      toast(`Txn failed with error ${err.toString()}. report a bug`);
    }
  }
}

export async function getPalladBalance() {
  const response = await window.mina?.request({
    method: "mina_getBalance",
  });

  console.log("response balance", response);
  return response.result;
}

export async function copyToClipBoard({
  toCopyContent,
  copiedType,
}: {
  toCopyContent: string;
  copiedType: string;
}) {
  try {
    await navigator.clipboard.writeText(toCopyContent);
    toast.success(`${copiedType} copied to clipboard!`, { duration: 2000 });
  } catch (err) {
    toast.error(`Error copying ${copiedType}! Please Try Again`, {
      duration: 2000,
    });
  }
}

export const safeObjectEntries = (obj: any) => {
  if (!obj || typeof obj !== 'object') {
    return [];
  }
  
  try {
    return Object.entries(obj);
  } catch (error) {
    console.error('Error in safeObjectEntries:', error);
    return [];
  }
};