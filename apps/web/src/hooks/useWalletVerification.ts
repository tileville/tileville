import { useCallback, useState, useEffect, useRef } from "react";
import { useNetworkStore } from "@/lib/stores/network";
import { useAuthSignature } from "./useAuthSignature";
import { useTelegramVerify } from "@/db/react-query-hooks";
import { isMobile } from "react-device-detect";

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

  const isAuroWalletBrowser = useCallback(() => {
    return typeof window !== "undefined" && "mina" in window;
  }, []);

  const handleVerification = useCallback(async () => {
    if (!chatId || hasAttemptedVerification.current) return;

    setIsProcessing(true);

    try {
      if (isMobile) {
        if (isAuroWalletBrowser()) {
          // If in Auro wallet browser, proceed with wallet connection
          if (!networkStore.address) {
            await networkStore.connectWallet(false);
          }
          if (!accountAuthSignature) {
            await validateOrSetSignature();
          }
          if (networkStore.address && accountAuthSignature) {
            hasAttemptedVerification.current = true;
            verifyMutation.mutate({
              chatId,
              walletAddress: networkStore.address,
            });
          }
        } else {
          // If not in Auro wallet browser, don't proceed with verification
          setIsProcessing(false);
          return;
        }
      } else {
        // Desktop browsers should not proceed with verification
        setIsProcessing(false);
        return;
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
    isAuroWalletBrowser,
  ]);

  useEffect(() => {
    if (
      isMobile &&
      isAuroWalletBrowser() &&
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
    if (isMobile) {
      if (isAuroWalletBrowser()) {
        return networkStore.address ? "Verify" : "Connect Wallet";
      } else {
        return "Open in Auro Wallet";
      }
    }
    return "Open in Auro Wallet";
  }, [
    networkStore.address,
    isProcessing,
    verifyMutation.isLoading,
    isAuroWalletBrowser,
  ]);

  return {
    handleVerification,
    getButtonText,
    isProcessing: isProcessing || verifyMutation.isLoading,
    isSuccess: verifyMutation.isSuccess,
    isAuroWalletBrowser: isAuroWalletBrowser(),
  };
};
