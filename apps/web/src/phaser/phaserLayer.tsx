"use client";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { LoadScene, MainScene, MenuScene } from "./scenes";
import {
  useSaveScore,
  useSendGroupMessage,
  useUsername,
} from "@/db/react-query-hooks";
import { useNetworkStore } from "@/lib/stores/network";
import { GameInfoModal } from "@/components/GameInfoModal";
import { formatAddress } from "@/lib/helpers";

type PhaserLayerProps = {
  isDemoGame: boolean;
  isGamePlayAllowed: boolean;
  competitionKey: string;
  gameId: number;
  txnHash?: string | undefined;
  txnStatus?: string | undefined;
  scoreTweetContent: string;
  isSpeedVersion: boolean | undefined;
  speedDuration: number | undefined;
};

export const PhaserLayer = ({
  isDemoGame,
  isGamePlayAllowed,
  competitionKey,
  gameId,
  txnHash,
  scoreTweetContent,
  isSpeedVersion,
  speedDuration,
}: PhaserLayerProps) => {
  const { address } = useNetworkStore();
  const [showGameInfoModal, setShowGameInfoModal] = useState(false);
  const sendGroupMessageMutation = useSendGroupMessage();

  const { data: username } = useUsername(address);
  console.log("USERNAME", username);

  const handleSendGroupMessage = useCallback(
    (score: number) => {
      const message = username
        ? `🎮 Wow! [${username}](https://www.tileville.xyz/u/${username}) just scored ${score} points in TileVille demo mode! 🎯\n\nCan you beat this score? Try now at https://tileville.xyz`
        : `🎮 Wow! \`${formatAddress(
            address
          )}\` just scored ${score} points in TileVille demo mode! 🎯\n\nCan you beat this score? Try now at https://tileville.xyz`;

      sendGroupMessageMutation.mutate({
        message,
      });
    },
    [sendGroupMessageMutation, address, username]
  );
  const leaderboardMutation = useSaveScore({
    onSuccess: () => {
      console.log("Game score saved Successfully!");
    },
    onMutate: () => {
      console.log("Saving game score");
    },
    onError: (error) => {
      console.error("Error saving game score", error);
    },
  });

  const showGameInfoModalFn = useCallback(() => {
    setShowGameInfoModal(true);
  }, []);

  const handleSaveScore = useCallback(
    (score: number) => {
      if (isDemoGame) {
        return;
      }
      if (!address) {
        toast.error(
          `Seems there is some issue with wallet connection. Do not play the game as this will not be saved.`
        );
        return;
      }

      leaderboardMutation.mutate({
        competition_key: competitionKey,
        game_id: gameId,
        score: score,
        wallet_address: address,
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [leaderboardMutation, address, isDemoGame]
  );

  useEffect(() => {
    const config: Phaser.Types.Core.GameConfig = {
      width: 1280,
      height: 720,
      parent: "tileville-hex",
      type: Phaser.AUTO,
      scene: [LoadScene, MenuScene, MainScene],
      scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH,
        mode: Phaser.Scale.FIT,
      },
      transparent: true,
    };

    const game = new Phaser.Game(config);
    game.registry.set("isDemoGame", isDemoGame);
    game.registry.set("handleSaveScore", handleSaveScore);
    game.registry.set("isGamePlayAllowed", isGamePlayAllowed);
    game.registry.set("showGameInfoModalFn", showGameInfoModalFn);
    game.registry.set("competitionKey", competitionKey);
    game.registry.set("scoreTweetContent", scoreTweetContent);
    game.registry.set("isSpeedVersion", isSpeedVersion);
    game.registry.set("speedDuration", speedDuration);
    game.registry.set("handleSendGroupMessage", handleSendGroupMessage); //

    return () => {
      game.destroy(true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGamePlayAllowed]);

  return (
    <>
      <div id="tileville-hex" className="max-h-[99svh]" />
      <GameInfoModal
        open={showGameInfoModal}
        txnHash={txnHash}
        handleClose={() => {
          setShowGameInfoModal(false);
        }}
      />
    </>
  );
};

export default PhaserLayer;
