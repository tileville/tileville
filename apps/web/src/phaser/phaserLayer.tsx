"use client";
import { useCallback, useEffect, useState } from "react";
import { LoadScene, MainScene, MenuScene } from "./scenes";
import { useLeaderboard } from "@/db/react-query-hooks";
import { useNetworkStore } from "@/lib/stores/network";
import { GameInfoModal } from "@/components/GameInfoModal";

type PhaserLayerProps = {
  isDemoGame: boolean;
  isGamePlayAllowed: boolean;
  gamePlayDisAllowMessage: string;
};

export const PhaserLayer = ({
  isDemoGame,
  isGamePlayAllowed,
  gamePlayDisAllowMessage,
}: PhaserLayerProps) => {
  const { address } = useNetworkStore();
  const [showGameInfoModal, setShowGameInfoModal] = useState(false);
  console.log("address", address);

  const leaderboardMutation = useLeaderboard({
    onSuccess: () => {
      console.log("Leaderboard data saved successfully");
    },
    onMutate: () => {
      console.log("Saving leaderboard data...");
    },
    onError: (error) => {
      console.error("Error saving leaderboard data:", error);
    },
  });
  const showGameInfoModalFn = useCallback(() => {
    setShowGameInfoModal(true);
  }, []);
  const handleSaveLeaderboardData = useCallback(
    (finalScore: number) => {
      leaderboardMutation.mutate({
        competition_id: new Date().valueOf(),
        game_id: new Date().valueOf(),
        score: finalScore,
        wallet_address: `${!!address ? address : "Played Without Address"}`,
      });
    },
    [leaderboardMutation, address]
  );
  useEffect(() => {
    const config: Phaser.Types.Core.GameConfig = {
      width: 1280,
      height: "100%",
      parent: "minapolis-hex",
      type: Phaser.AUTO,
      scene: [LoadScene, MenuScene, MainScene],
      // scale: {
      //   autoCenter: Phaser.Scale.CENTER_BOTH,
      // },
      transparent: true,
    };
    const game = new Phaser.Game(config);
    game.registry.set("isDemoGame", isDemoGame);
    game.registry.set("handleSaveScore", handleSaveLeaderboardData);
    game.registry.set("isGamePlayAllowed", isGamePlayAllowed);
    game.registry.set("gamePlayDisAllowMessage", gamePlayDisAllowMessage);
    game.registry.set("showGameInfoModalFn", showGameInfoModalFn);
    return () => {
      game.destroy(true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGamePlayAllowed, gamePlayDisAllowMessage]);

  return (
    <>
      <div id="minapolis-hex" />
      <GameInfoModal
        open={showGameInfoModal}
        message={gamePlayDisAllowMessage}
        title="You are not allowed to play the game"
        handleClose={() => {
          setShowGameInfoModal(false);
        }}
      />
    </>
  );
};

export default PhaserLayer;
