// src/app/pvp/[challengeId]/game/page.tsx

"use client";
import dynamic from "next/dynamic";
import { Toaster } from "react-hot-toast";
import LandingBackground from "@/components/LandingBackground";
import { useParams } from "next/navigation";
import { useNetworkStore } from "@/lib/stores/network";
import {
  useChallengeById,
  useMainnetPVPTransactionsStatus,
  usePVPChallengeTransaction,
} from "@/db/react-query-hooks";
import { Spinner2 } from "@/components/common/Spinner";
import { useCallback, useState } from "react";
import { PVPEntryFeesModal } from "@/components/PVP/PVPEntryFeesModal";
import { TransactionStatus } from "@/lib/types";
import { usePosthogEvents } from "@/hooks/usePosthogEvents";

const PhaserLayer = dynamic(() => import("@/phaser/phaserLayer"), {
  ssr: false,
});

export default function PvPChallengePage() {
  const params = useParams<{ challengeId: string }>();
  const networkStore = useNetworkStore();
  const [showEntryFeesModal, setShowEntryFeesModal] = useState(false);
  const { data: challengeData, isLoading } = useChallengeById(
    params.challengeId
  );
  const {
    playedPVPChallenge: [logPlayPVPChallenge],
  } = usePosthogEvents();

  const { data: challengeTransaction } = usePVPChallengeTransaction(
    networkStore.address || "",
    params.challengeId
  );

  useMainnetPVPTransactionsStatus(
    challengeTransaction?.txn_hash || "",
    challengeTransaction?.txn_status as TransactionStatus,
    +params.challengeId
  );

  const trackGameCompletion = useCallback(
    (score: number) => {
      if (!networkStore.address || !challengeData?.data) return;

      try {
        logPlayPVPChallenge({
          walletAddress: networkStore.address,
          challengeId: +params.challengeId,
          challengeName: challengeData.data.name,
          score: score,
          isSpeedChallenge: challengeData.data.is_speed_challenge,
        });
      } catch (error: unknown) {
        logPlayPVPChallenge({
          walletAddress: networkStore.address,
          challengeId: +params.challengeId,
          challengeName: challengeData.data.name,
          score: score,
          isSpeedChallenge: challengeData.data.is_speed_challenge,
          error:
            error instanceof Error
              ? error.message
              : String(error || "Unknown error during challenge creation"),
        });
      }
    },
    [
      networkStore.address,
      challengeData,
      params.challengeId,
      logPlayPVPChallenge,
    ]
  );

  if (!networkStore.address) {
    return (
      <div className="flex min-h-screen items-center justify-center p-8">
        <button
          className="fleprimary-btn"
          onClick={() => {
            networkStore.connectWallet(false);
          }}
        >
          Connect your wallet first
        </button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner2 />
      </div>
    );
  }

  // First check - Is user a participant in this challenge
  const isParticipant = challengeData?.data?.participants?.some(
    (p: any) => p.wallet_address === networkStore.address
  );

  if (!isParticipant) {
    return (
      <div className="flex min-h-screen items-center justify-center p-8">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold">Not Authorized</h2>
          <p>You are not a participant in this challenge.</p>
        </div>
      </div>
    );
  }

  // Second check - Has user already played this game
  const userParticipant = challengeData?.data?.participants?.find(
    (p: any) => p.wallet_address === networkStore.address
  );

  if (userParticipant?.has_played) {
    return (
      <div className="flex min-h-screen items-center justify-center p-8">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold">Already Played</h2>
          <p>You have already completed this challenge.</p>
        </div>
      </div>
    );
  }

  const hasFeesConfirmed = challengeTransaction?.txn_status === "CONFIRMED";
  const isTxnPending = challengeTransaction?.txn_status === "PENDING";

  if (isTxnPending) {
    return (
      <div className="flex min-h-screen items-center justify-center p-8">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold">Transaction is pending</h2>
          <p className="mb-4">
            Please wait till the transaction gets confirmed.
          </p>
        </div>
      </div>
    );
  }

  if (!hasFeesConfirmed) {
    return (
      <div className="flex min-h-screen items-center justify-center p-8">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold">Entry Fees Required</h2>
          <p className="mb-4">
            Please pay the entry fees to play this challenge.
          </p>
          <button
            className="rounded-lg bg-primary px-6 py-2 text-white hover:bg-primary/90"
            onClick={() => setShowEntryFeesModal(true)}
          >
            Pay Entry Fees
          </button>
          <PVPEntryFeesModal
            open={showEntryFeesModal}
            handleClose={() => setShowEntryFeesModal(false)}
            entryFee={challengeData.data.entry_fee}
            challengeId={params.challengeId}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100svh-80px)]">
      <LandingBackground />
      <div className="relative z-10">
        <div className="mb-0 flex w-full flex-col items-center justify-center">
          <PhaserLayer
            isDemoGame={false}
            isGamePlayAllowed={true}
            competitionKey=""
            scoreTweetContent=""
            isPvPGame={true}
            isSpeedVersion={challengeData?.data?.is_speed_challenge}
            speedDuration={challengeData?.data?.speed_duration}
            challengeId={+params.challengeId}
            txnHash={challengeTransaction?.txn_hash || ""}
            challengeName={challengeData?.data.name}
            trackGameCompletion={trackGameCompletion}
          />
          <Toaster />
        </div>
      </div>
    </div>
  );
}
