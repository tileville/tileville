import { usePostHog } from "posthog-js/react";

type GenericEventLogger<PayloadType> = (
  event: string,
  payload: PayloadType,
  errorMessage?: string
) => void;

type EventLogger<PayloadType> = [
  (payload: PayloadType) => void,
  (errorMessage?: string) => void
];

type Properties = Record<string, any>;
type JoinCompetitionPayload = {
  walletAddress: string;
  competition_name: string;
  network: string;
};

type PVPChallengePayload = {
  walletAddress: string;
  challengeId: number;
  challengeName: string;
  isSpeedChallenge: boolean;
  entryFee: number;
  isPublic: boolean;
  error?: string;
};

type PlayPVPChallengePayload = {
  walletAddress: string;
  challengeId: number;
  challengeName: string;
  score: number;
  isSpeedChallenge: boolean;
  error?: string;
};

type NFTMintingPayload = {
  nftId: number;
  walletAddress: string;
  step: number;
  price?: number;
  txHash?: string;
  error?: string;
  category?: string;
  collection?: string;
};

/**
 *
 * The way you create a logger event is you create two set of events for every action.
 * for example, if we want to track `join competition`, we will track when user clicked join competition, and track an error if user failed
 * to join competition.
 * Every action have a data that we can pass in event and event name.
 * Check the join competition event for reference before creating new events
 *
 */

function usePosthogEvents() {
  const ph = usePostHog();

  function logApplicationError<
    PayloadType extends Properties | null | undefined
  >(errorPayload: PayloadType) {
    ph.capture("Application Error", errorPayload);
  }

  function createEventLogger<PayloadType extends Properties | null | undefined>(
    eventName: string
  ): [(payload: PayloadType) => void, (payload: PayloadType) => void] {
    const logEvent: GenericEventLogger<PayloadType> = (
      event: string,
      payload: PayloadType
    ) => {
      ph.capture(event, payload);
    };

    // Return tuple of success and error loggers
    return [
      (payload) => logEvent(eventName, payload),
      (payload) => logEvent(`${eventName} Error`, payload), // Changed to accept payload instead of just error message
    ];
  }

  function reactErrorBoundary(
    error: Error,
    info: {
      componentStack: string;
    }
  ) {
    ph.capture("React Error Boundary", { error: error.message, info });
  }

  return {
    reactErrorBoundary,
    logApplicationError,
    phClient: ph,
    createEventLogger,
    joinedCompetition:
      createEventLogger<JoinCompetitionPayload>("Competition joined"),
    createdPVPChallenge: createEventLogger<PVPChallengePayload>(
      "PVP Challenge Created"
    ),
    joinedPVPChallenge: createEventLogger<PVPChallengePayload>(
      "PVP Challenge Joined"
    ),
    playedPVPChallenge: createEventLogger<PlayPVPChallengePayload>(
      "PVP Challenge Played"
    ),
    nftMinting: createEventLogger<NFTMintingPayload>("NFT Minting"),
    nftMintingStepComplete: createEventLogger<NFTMintingPayload>(
      "NFT Minting Step Complete"
    ),
    nftMintingError: createEventLogger<NFTMintingPayload>("NFT Minting Error"),
    nftMintingSuccess: createEventLogger<NFTMintingPayload>(
      "NFT Minting Success"
    ),
  };
}

export { usePosthogEvents };

export function useEventLogger(): [any, any] {
  throw new Error("Function not implemented.");
}
