"use client";
import { useEffect, useState } from "react";
import { LoadScene, MenuScene } from "./scenes";

export const GuidePhaserLayer = () => {
  const [isLandscape, setIsLandscape] = useState(true);

  useEffect(() => {
    const checkOrientation = () => {
      const isLandscape = window.innerWidth > window.innerHeight;
      setIsLandscape(isLandscape);
    };

    checkOrientation();

    window.addEventListener("resize", checkOrientation);

    const config: Phaser.Types.Core.GameConfig = {
      width: 1200,
      height: 600,
      parent: "guide-hex",
      type: Phaser.AUTO,
      scene: [LoadScene, MenuScene],
      scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH,
        mode: Phaser.Scale.FIT,
      },
      transparent: true,
    };

    let game: Phaser.Game;
    try {
      game = new Phaser.Game(config);
    } catch (error) {
      console.error("Error creating Phaser game:", error);
    }

    return () => {
      window.removeEventListener("resize", checkOrientation);
      if (game) {
        console.log("Destroying Phaser game");
        game.destroy(true);
      }
    };
  }, []);

  if (!isLandscape) {
    return (
      <div className="p-5 text-center text-destructive">
        <p>
          Please rotate your device to landscape mode for the best guide
          experience.
        </p>
      </div>
    );
  }

  return <div id="guide-hex" />;
};

export default GuidePhaserLayer;
