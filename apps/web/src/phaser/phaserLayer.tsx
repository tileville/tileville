"use client";
import { useCallback, useEffect } from "react";
import { LoadScene, MainScene, MenuScene } from "./scenes";
import { useLeaderboard } from "@/db/react-query-hooks";
import { useNetworkStore } from "@/lib/stores/network";

type PhaserLayerProps = {
  isDemoGame: boolean;
};

export const PhaserLayer = ({ isDemoGame }: PhaserLayerProps) => {
  const { address } = useNetworkStore();
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

    return () => {
      game.destroy(true);
    };
  }, []);

  return <div id="minapolis-hex" />;
};

export default PhaserLayer;
