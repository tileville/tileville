import { useCallback, useState, useEffect, useRef } from "react";
import { useNetworkStore } from "@/lib/stores/network";
import { useAuthSignature } from "./useAuthSignature";
import { useTelegramVerify } from "@/db/react-query-hooks";

export const useWalletVerification = (chatId: string | null) => {
  const networkStore = useNetworkStore();
  const { validateOrSetSignature, accountAuthSignature } = useAuthSignature();
  const [isProcessing, setIsProcessing] = useState(false);
  const hasAttemptedVerification = useRef(false);

  const verifyMutation = useTelegramVerify({
    onSuccess: () => {
      setIsProcessing(false);
      hasAttemptedVerification.current = true;
    },
    onError: () => {
      setIsProcessing(false);
      hasAttemptedVerification.current = true;
    },
  });

  const handleVerification = useCallback(async () => {
    if (!chatId || hasAttemptedVerification.current) return;

    setIsProcessing(true);

    try {
      // If wallet not connected, connect it first
      if (!networkStore.address) {
        await networkStore.connectWallet(false);
        setIsProcessing(false);
        return;
      }

      // If not signed, get signature
      if (!accountAuthSignature) {
        await validateOrSetSignature();
        setIsProcessing(false);
        return;
      }

      // If wallet connected and signed, proceed with verification
      if (networkStore.address && accountAuthSignature) {
        hasAttemptedVerification.current = true;
        verifyMutation.mutate({
          chatId,
          walletAddress: networkStore.address,
        });
      }
    } catch (error) {
      console.error("Verification process failed:", error);
      setIsProcessing(false);
    }
  }, [
    networkStore,
    chatId,
    accountAuthSignature,
    validateOrSetSignature,
    verifyMutation,
  ]);

  useEffect(() => {
    if (
      networkStore.address &&
      accountAuthSignature &&
      chatId &&
      !hasAttemptedVerification.current &&
      !verifyMutation.isSuccess
    ) {
      handleVerification();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [networkStore.address, accountAuthSignature, chatId, handleVerification]);

  const getButtonText = useCallback(() => {
    if (isProcessing || verifyMutation.isLoading) return "Processing...";
    if (!networkStore.address) return "Connect Wallet";
    return "Verify";
  }, [networkStore.address, isProcessing, verifyMutation.isLoading]);

  return {
    handleVerification,
    getButtonText,
    isProcessing: isProcessing || verifyMutation.isLoading,
    isSuccess: verifyMutation.isSuccess,
  };
};
