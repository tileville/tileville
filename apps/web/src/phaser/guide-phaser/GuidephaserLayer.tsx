"use client";
import { useEffect } from "react";
import { LoadScene, MenuScene } from "./scenes";

export const GuidePhaserLayer = () => {
  useEffect(() => {
    const config: Phaser.Types.Core.GameConfig = {
      width: 1200,
      height: 600,
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

  return <div id="minapolis-hex" className="" />;
};

export default GuidePhaserLayer;
