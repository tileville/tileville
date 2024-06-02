"use client";
import { useCallback, useEffect } from "react";
import { LoadScene, MainScene, MenuScene } from "./scenes";
import { useLeaderboard } from "@/db/react-query-hooks";
import { useNetworkLayer } from "@/hooks/useNetworkLayer";
import { useNetworkStore } from "@/lib/stores/network";

type PhaserLayerProps = {
  handleEntryFees: () => void;
};

export const PhaserLayer = ({ handleEntryFees }: PhaserLayerProps) => {
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
        competition_id: new Date().valueOf(), // You might want to get these dynamically
        game_id: new Date().valueOf(), // You might want to get these dynamically
        score: finalScore,
        wallet_address: "0x1", // Assuming signer is the wallet address
      });
    },
    [leaderboardMutation]
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
    game.registry.set("handleEntryFees", handleEntryFees);
    game.registry.set("handleSaveScore", handleSaveLeaderboardData);

    return () => {
      game.destroy(true);
    };
  }, []);

  return <div id="minapolis-hex" />;
};

export default PhaserLayer;
