"use client";
import { useEffect } from "react";
import { LoadScene, MenuScene } from "./scenes";

export const GuidePhaserLayer = () => {
  useEffect(() => {
    const config: Phaser.Types.Core.GameConfig = {
      width: 1280,
      height: "80%",
      parent: "minapolis-hex",
      type: Phaser.AUTO,
      scene: [LoadScene, MenuScene],
      transparent: true,
    };
    const game = new Phaser.Game(config);

    return () => {
      game.destroy(true);
    };
  }, []);

  return <div id="minapolis-hex" />;
};

export default GuidePhaserLayer;
