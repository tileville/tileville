"use client";
import { useEffect } from "react";
import { LoadScene, MenuScene } from "./scenes";

export const GuidePhaserLayer = () => {
  useEffect(() => {
    const config: Phaser.Types.Core.GameConfig = {
      width: 1200,
      height: 600,
      parent: "tileville-hex",
      type: Phaser.AUTO,
      scene: [LoadScene, MenuScene],
      scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH,
        mode: Phaser.Scale.FIT,
      },
      transparent: true,
    };
    const game = new Phaser.Game(config);

    return () => {
      game.destroy(true);
    };
  }, []);

  return <div className="" />;
};

export default GuidePhaserLayer;
