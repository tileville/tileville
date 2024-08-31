import { TREASURY_ADDRESS } from "@/constants";
import {
  ProviderError,
  SendTransactionResult,
} from "@aurowallet/mina-provider";
import clsx, { ClassValue } from "clsx";
import { method } from "o1js";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";

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
    to: "B62qrMJvdEiZksNtqGpMbYLGr9gtPx8zrGHhArex2ka9fzRL89XcsRD",
    memo: "game fess",
    fee: 100_000_000,
    amount: amount * 1000_000_000,
    nonce: nonce.nonce,
    from: from,
  };

  if (window.mina?.isPallad) {
    const signedTransactionResponse = async () => {
      const response = await (window as any).mina.request({
        method: "mina_signTransaction",
        params: { transaction },
      });
      return response.result;
    };

    const signedTransaction = await signedTransactionResponse();

    console.log(JSON.stringify(signedTransaction));
    const response = await (window as any).mina?.request({
      method: "mina_sendTransaction",
      params: {
        signedTransaction,
        transactionType: "payment",
      },
    });

    //todo: pallad wallet integration and this function should return hash
    return response;
  } else {
    try {
      const data: SendTransactionResult | ProviderError = await (
        window as any
      )?.mina?.sendPayment({
        amount: amount,
        to: TREASURY_ADDRESS,
        memo: `Pay ${amount} by auro wallet.`,
      });
      return (data as SendTransactionResult).hash;
    } catch (err: any) {
      toast(`Txn failed with error ${err.toString()}. report a bug`);
    }

    // return (window as any).mina?.signMessage({
    //   message,
    // });
  }
}

export async function getPalladBalance() {
  const response = await window.mina?.request({
    method: "mina_getBalance",
  });

  console.log("response balance", response);
  return response.result;
}

//  const response =  await window.mina.request({
//   method: "mina_sendTransaction",
//   params: {
//     signedTransaction: {
//       signature: {
//         field:
//           "25832171506121427139016814727942190909414892823940908613882743324875967002800",
//         scalar:
//           "3407931015617535538689382857035449367911109896176560494347527690582616018775",
//       },
//       publicKey: "B62qm8YHJAvZit7qRXwvmVTLsAwsX5GjRZ7APAtLmQZiPVAB5LjMdf8",
//       data: {
//         to: "B62qqhL8xfHBpCUTk1Lco2Sq8HitFsDDNJraQG9qCtWwyvxcPADn4EV",
//         from: "B62qm8YHJAvZit7qRXwvmVTLsAwsX5GjRZ7APAtLmQZiPVAB5LjMdf8",
//         fee: "100000000",
//         amount: "10000000",
//         nonce: "0",
//         memo: "game fess",
//         validUntil: "4294967295",
//       },
//     },
//     transactionType: "payment",
//   },
// });
