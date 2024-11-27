"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useNetworkStore } from "@/lib/stores/network";
import { useAuthSignature } from "@/hooks/useAuthSignature";
import { useTelegramVerify } from "@/db/react-query-hooks";
import toast from "react-hot-toast";

export default function VerifyPage() {
  const searchParams = useSearchParams();
  const chatId = searchParams.get("chatId");
  const networkStore = useNetworkStore();
  const { validateOrSetSignature, accountAuthSignature } = useAuthSignature();

  const verifyMutation = useTelegramVerify({
    onSuccess: () => {
      // Optionally redirect or show success UI
    },
    onError: (error) => {
      console.error("Verification failed:", error);
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
    <div className="flex min-h-screen items-center justify-center">
      <div className="rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-2xl font-bold">Telegram Verification</h1>

        {!networkStore.address ? (
          <button
            onClick={() => networkStore.connectWallet(false)}
            className="rounded bg-primary px-4 py-2 text-white hover:bg-primary/80"
          >
            Connect Wallet
          </button>
        ) : (
          <button
            onClick={handleVerify}
            disabled={verifyMutation.isLoading}
            className="rounded bg-primary px-4 py-2 text-white hover:bg-primary/80 disabled:bg-gray-300"
          >
            {verifyMutation.isLoading ? "Verifying..." : "Verify"}
          </button>
        )}
      </div>
    </div>
  );
}
