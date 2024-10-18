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

  const [isLandscape, setIsLandscape] = useState(true);

  useEffect(() => {
    const checkOrientation = () => {
      if (window.innerWidth > window.innerHeight) {
        setIsLandscape(true);
      } else {
        setIsLandscape(false);
      }
    };
    checkOrientation();
    window.addEventListener("resize", checkOrientation);
  });

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
    <div className="h-[calc(100svh-80px)]">
      <LandingBackground />
      <div className="relative z-10">
        <div className="mb-0 flex w-full flex-col items-center justify-center">
          {isLandscape ? (
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
          ) : (
            <div className="flex min-h-[100svh] items-center justify-center p-4">
              <h1 className="text-2xl font-bold">
                Please rotate your device to play our game
              </h1>
            </div>
          )}

          <Toaster />
        </div>
      </div>
    </div>
  );
}

export default Game;
