"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import LandingBackground from "@/components/LandingBackground";
import { useParams } from "next/navigation";
import {
  useCompetitionByKey,
  useIsGameAlreadyPlayed,
  useMainnetTransactionStatus,
  useTransactionLogById,
} from "@/db/react-query-hooks";
import { useNetworkStore } from "@/lib/stores/network";
import { COMPETITION_SCORE_TWEET_DEFAULT_CONTENT } from "@/constants";
import { useSetAtom } from "jotai";
import { gameplayDisallowTypeAtom } from "@/contexts/atoms";

const PhaserLayer = dynamic(() => import("@/phaser/phaserLayer"), {
  ssr: false,
});

function Game() {
  const params = useParams<{
    uniqueKey: string;
    gameId: string;
  }>();
  const [isGamePlayAllowed, setIsGamePlayAllowed] = useState(false);
  const setGameplayDisallowType = useSetAtom(gameplayDisallowTypeAtom);

  const networkStore = useNetworkStore();

  const { data: gameTransaction, isSuccess } = useTransactionLogById(
    networkStore.address!,
    parseInt(params.gameId)
  );

  const { data: competitionData, isSuccess: isCompetitionSuccess } =
    useCompetitionByKey(params.uniqueKey);

  const {
    data: isGameAlreadyPlayed = false,
    isSuccess: isGameAlreadyPlayedRespSuccess,
  } = useIsGameAlreadyPlayed(parseInt(params.gameId));

  useMainnetTransactionStatus(
    gameTransaction?.txn_hash || "",
    gameTransaction?.txn_status || "PENDING"
  );

  useEffect(() => {
    if (isGameAlreadyPlayed) {
      setIsGamePlayAllowed(false);
      setGameplayDisallowType("GAME_ALREADY_PLAYED");
    } else if (gameTransaction?.txn_status === "FAILED") {
      setIsGamePlayAllowed(false);
      setGameplayDisallowType("TRANSACTION_FAILED");
    } else if (gameTransaction && gameTransaction.txn_status === "CONFIRMED") {
      setIsGamePlayAllowed(true);
      setGameplayDisallowType("TRANSACTION_CONFIRMED");
    } else if (gameTransaction?.txn_status === "PENDING") {
      setIsGamePlayAllowed(false);
      setGameplayDisallowType("TRANSACTION_PENDING");
    } else {
      setIsGamePlayAllowed(false);
      setGameplayDisallowType("NONE");
    }
  }, [
    isSuccess,
    gameTransaction,
    isCompetitionSuccess,
    competitionData,
    isGameAlreadyPlayed,
    isGameAlreadyPlayedRespSuccess,
    setGameplayDisallowType,
  ]);

  return (
    <div className="gradient-bg gradient-bg">
      <LandingBackground />
      <div className="relative z-10">
        <div className="mb-0 flex min-h-screen w-full flex-col items-center justify-center pt-10">
          <PhaserLayer
            isDemoGame={false}
            isGamePlayAllowed={isGamePlayAllowed}
            competitionKey={params.uniqueKey}
            gameId={+params.gameId}
            txnHash={gameTransaction?.txn_hash}
            txnStatus={gameTransaction?.txn_status}
            scoreTweetContent={
              competitionData?.score_tweet_content ||
              COMPETITION_SCORE_TWEET_DEFAULT_CONTENT
            }
            isSpeedVersion={competitionData?.is_speed_version}
            speedDuration={competitionData?.speed_duration}
          />
          <Toaster />
        </div>
      </div>
    </div>
  );
}

export default Game;
