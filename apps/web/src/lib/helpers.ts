import {
  ProviderError,
  SendTransactionResult,
} from "@aurowallet/mina-provider";
import clsx, { ClassValue } from "clsx";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";
import {
  FIRST_WORDS,
  SECOND_WORDS,
  TILEVILLE_BOT_URL,
  TREASURY_ADDRESS,
} from "@/constants";
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

export const getMinaScanNormalLink = (txnHash: string) =>
  `https://minascan.io/mainnet/tx/${txnHash}`;

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
  memo,
}: {
  from: string;
  amount: number;
  memo?: string;
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
    memo: memo ? memo : "game fees",
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
    try {
      const data: SendTransactionResult | ProviderError = await (
        window as any
      )?.mina?.sendPayment({
        amount: amount,
        to: TREASURY_ADDRESS,
        memo: memo || `Pay ${amount} by auro wallet.`,
      });
      return (data as SendTransactionResult).hash;
    } catch (err: any) {
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

export const redirectToTelegramBot = () => {
  window.location.href = TILEVILLE_BOT_URL;
};

export const formatGameAnnouncement = ({
  username,
  address,
  score,
  isDemoGame,
  competitionKey,
}: {
  username?: string | null;
  address?: string;
  score: number;
  isDemoGame: boolean;
  competitionKey?: string;
}): string => {
  const userIdentifier = address
    ? username
      ? `[${username}](https://www.tileville.xyz/u/${username})`
      : `\`${formatAddress(address)}\``
    : "Someone";

  const gameMode = isDemoGame
    ? `[TileVille demo mode](https://www.tileville.xyz/competitions/demo-game)`
    : `[${competitionKey}](https://www.tileville.xyz/leaderboard?competition=${competitionKey})`;

  return (
    `🎮 Wow! ${userIdentifier} just scored ${score} points in ${gameMode} 🎯\n\n` +
    `Can you beat this score? Try now at https://tileville.xyz`
  );
};

export const generateAuroWalletDeepLink = (chatId: string) => {
  return `https://www.aurowallet.com/applinks?action=openurl&networkid=mina%3Amainnet&url=https%3A%2F%2Ftileville.xyz/verify?chatId=${chatId}`;
};

export const generateAuroWalletDeepLinkForChallengeInvite = (
  inviteCode: string
) => {
  return `https://www.aurowallet.com/applinks?action=openurl&networkid=mina%3Amainnet&url=${window.location.origin}/pvp/invite/${inviteCode}`;
};

export const generateChallengeName = () => {
  const firstWord = FIRST_WORDS[Math.floor(Math.random() * FIRST_WORDS.length)];
  const secondWord =
    SECOND_WORDS[Math.floor(Math.random() * SECOND_WORDS.length)];
  return `${firstWord} ${secondWord}`;
};

export const generatePVPChallengeInviteLink = (invite_code: string) => {
  return `${window.location.origin}/pvp/invite/${invite_code}`;
};

type generateChallengeMessageForGroupType = {
  challengeName: string;
  walletAddress: string;
  speedDuration: number | null;
  endTime: string;
  isSpeedChallenge: boolean;
  entryFee: number;
  username: string | null;
  maxParticipants: number;
  isPublic: boolean;
  inviteLink: string;
};

export const generateChallengeMessageForGroup = ({
  challengeName,
  walletAddress,
  speedDuration,
  endTime,
  isSpeedChallenge,
  entryFee,
  username,
  maxParticipants,
  isPublic,
  inviteLink,
}: generateChallengeMessageForGroupType) => {
  const groupMessage = `🎉 A New Challenge Awaits!

🌟 **Challenge Name:** "${challengeName}"
👤 **Created By:** ${username || `Wallet ${walletAddress.slice(0, 6)}`}
💰 **Entry Fee:** ${entryFee} MINA
👥 **Max Participants:** ${maxParticipants}
⏰ **End Time:** ${new Date(endTime).toLocaleString()}${
    isSpeedChallenge
      ? `\n⏱️ **Speed Challenge Duration:** ${speedDuration} seconds`
      : ""
  }
${
  isPublic
    ? "\n🌐 **Type:** Public Challenge - Anyone can join!"
    : "\n🔒 **Type:** Private Challenge - Invite only"
}${!isPublic ? `\n🔗 **Invite Link:** ${inviteLink}` : ""}

${
  isPublic
    ? "Join now and compete for the prize! 🏆"
    : "Share the invite link with your chosen competitors! 🤝"
} 🚀`;

  return groupMessage;
};
