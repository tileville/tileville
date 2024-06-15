"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import LandingBackground from "@/components/LandingBackground";
import { useParams } from "next/navigation";
import {
  useMainnetTransactionStatus,
  useTransactionLogById,
} from "@/db/react-query-hooks";
import { useNetworkStore } from "@/lib/stores/network";
import { TransactionStatus } from "@/lib/types";

const GAMEPLAY_DISALLOW_MESSAGE_DEFAULT =
  "We are fetching your participation fee payment trsanction details...";
const PhaserLayer = dynamic(() => import("@/phaser/phaserLayer"), {
  ssr: false,
});

function Game() {
  const params = useParams<{ uniqueKey: string; gameId: string }>();
  const [isGamePlayAllowed, setIsGamePlayAllowed] = useState(false);
  const [gamePlayDisAllowMessage, setGamePlayDisallowMessage] = useState(
    GAMEPLAY_DISALLOW_MESSAGE_DEFAULT
  );

  const networkStore = useNetworkStore();
  const {
    data: gameTransaction,
    isLoading: isGameTransactionLoading,
    error: gameTransactionError,
    isSuccess,
  } = useTransactionLogById(networkStore.address!, parseInt(params.gameId));

  console.log("game txn data", { gameTransaction, gameTransactionError });
  const {
    data: txnStatusData,
    isLoading,
    isError,
  } = useMainnetTransactionStatus(
    gameTransaction?.txn_hash || "",
    gameTransaction?.txn_status || "PENDING",
    gameTransaction?.is_game_played ?? false
  );

  useEffect(() => {
    if (
      gameTransaction &&
      gameTransaction.is_game_played === false &&
      gameTransaction.txn_status === "CONFIRMED"
    ) {
      setIsGamePlayAllowed(true);
      setGamePlayDisallowMessage("");
    } else if (gameTransaction?.is_game_played) {
      setGamePlayDisallowMessage(
        "You have already played the game. Please check your game status in user profile section."
      );
    } else if (gameTransaction?.txn_status === "FAILED") {
      setGamePlayDisallowMessage(
        "Transaction failed. you are not part of the competition"
      );
    }
  }, [isSuccess, gameTransaction]);
  console.log(txnStatusData, isLoading, isError);

  //TODO: fetch transaction status from game id

  return (
    <div className="gradient-bg gradient-bg h-[calc(100vh-80px)]">
      <LandingBackground />
      <div className="relative z-10">
        <div className="mb-0 w-full">
          <PhaserLayer
            isDemoGame={false}
            isGamePlayAllowed={isGamePlayAllowed}
            gamePlayDisAllowMessage={gamePlayDisAllowMessage}
          />
          <Toaster />
        </div>
      </div>
    </div>
  );
}

export default Game;
