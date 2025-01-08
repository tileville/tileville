import { CompetitionErrorType } from "@/lib/types";
import { usePostHog } from "posthog-js/react";

export const useCompetitionErrorTracking = () => {
  const ph = usePostHog();

  const trackCompetitionError = (error: CompetitionErrorType) => {
    ph.capture("Competition Join Error", {
      ...error.details,
      errorCode: error.errorCode,
    });
  };

  // List of possible errors and when they occur
  const COMPETITION_ERRORS = {
    WALLET_NOT_CONNECTED: (competitionName: string) => ({
      errorCode: "WALLET_NOT_CONNECTED" as const,
      details: {
        competitionName,
        network: "none",
        message: "Wallet not connected when trying to join competition",
        timestamp: new Date().toISOString(),
      },
    }),
    VOUCHER_REDEMPTION_FAILED: (
      competitionName: string,
      network: string,
      error: any,
      extraData?: any
    ) => ({
      errorCode: "VOUCHER_REDEMPTION_FAILED" as const,
      details: {
        competitionName,
        network,
        message: error?.message || "Failed to redeem voucher",
        timestamp: new Date().toISOString(),
        extraData,
      },
    }),
    PAYMENT_FAILED: (
      competitionName: string,
      network: string,
      error: any,
      extraData?: any
    ) => ({
      errorCode: "PAYMENT_FAILED" as const,
      details: {
        competitionName,
        network,
        message: error?.message || "Payment transaction failed",
        timestamp: new Date().toISOString(),
        extraData,
      },
    }),
    TRANSACTION_LOG_FAILED: (
      competitionName: string,
      network: string,
      error: any,
      extraData?: any
    ) => ({
      errorCode: "TRANSACTION_LOG_FAILED" as const,
      details: {
        competitionName,
        network,
        message: error?.message || "Failed to log transaction",
        timestamp: new Date().toISOString(),
        extraData,
      },
    }),
  };

  return {
    trackCompetitionError,
    COMPETITION_ERRORS,
  };
};
