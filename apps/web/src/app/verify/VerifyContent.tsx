"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useNetworkStore } from "@/lib/stores/network";
import { useAuthSignature } from "@/hooks/useAuthSignature";
import { useTelegramVerify } from "@/db/react-query-hooks";
import toast from "react-hot-toast";
import { PRIMARY_BUTTON_STYLES_LG, TILEVILLE_BOT_URL } from "@/constants";
import { redirectToTelegramBot } from "@/lib/helpers";

export default function VerifyContent() {
  const searchParams = useSearchParams();
  const chatId = searchParams.get("chatId");
  const networkStore = useNetworkStore();
  const { validateOrSetSignature, accountAuthSignature } = useAuthSignature();
  const [success, setSuccess] = useState(false);

  const verifyMutation = useTelegramVerify({
    onSuccess: () => {
      setSuccess(true);
      setTimeout(() => {
        redirectToTelegramBot();
      }, 1500);
    },
    onError: (error) => {
      console.error("Verification failed:", error);
      toast.error("Verification failed. Please try again.");
    },
  });

  useEffect(() => {
    if (!chatId) {
      toast.error("Invalid verification link");
    }
  }, [chatId]);

  const handleVerify = async () => {
    if (!networkStore.address) {
      toast.error("Please connect your wallet first");
      return;
    }

    if (!accountAuthSignature) {
      await validateOrSetSignature();
      return;
    }

    verifyMutation.mutate({
      chatId: chatId!,
      walletAddress: networkStore.address,
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center font-roboto">
      <div className="w-full max-w-[588px] rounded-xl bg-[#99B579] px-8 py-12 text-center shadow-[0px_4px_4px_0px_#00000040]">
        {success ? (
          <>
            <h1 className="mb-6 text-[28px] font-bold">
              Account Connected Successfully !!
            </h1>

            <p className="mb-6 text-xl text-[#494949]">
              Your wallet has been verified. Redirecting you to the bot...
            </p>
            <a
              href={TILEVILLE_BOT_URL}
              className={`${PRIMARY_BUTTON_STYLES_LG}  flex min-h-[64px] items-center justify-center`}
            >
              Return to BOT
            </a>
          </>
        ) : (
          <>
            <h1 className="mb-6 text-[28px] font-bold">Verify Your Account</h1>

            <p className="mb-6 text-xl text-[#494949]">
              Connect your wallet and complete the account verification on
              TileVille.
            </p>

            {!networkStore.address ? (
              <button
                onClick={() => networkStore.connectWallet(false)}
                className={`${PRIMARY_BUTTON_STYLES_LG} min-h-[64px]`}
              >
                Connect Wallet
              </button>
            ) : (
              <button
                onClick={handleVerify}
                disabled={verifyMutation.isLoading}
                className={PRIMARY_BUTTON_STYLES_LG}
              >
                {verifyMutation.isLoading ? "Verifying..." : "Verify"}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
