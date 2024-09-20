"use client";
import { useEffect, useState } from "react";
import { LoadScene, MenuScene } from "./scenes";

export const GuidePhaserLayer = () => {
  const [isLandscape, setIsLandscape] = useState(true);

  useEffect(() => {
    const checkOrientation = () => {
      const isLandscape = window.innerWidth > window.innerHeight;
      setIsLandscape(isLandscape);
      console.log("Orientation checked:", isLandscape ? "Landscape" : "Portrait");
    };

    // Check orientation immediately
    checkOrientation();

    // Set up event listener for orientation changes
    window.addEventListener('resize', checkOrientation);

    console.log("Setting up Phaser game");
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
      console.log("Phaser game created successfully");
    } catch (error) {
      console.error("Error creating Phaser game:", error);
    }

    return () => {
      window.removeEventListener('resize', checkOrientation);
      if (game) {
        console.log("Destroying Phaser game");
        game.destroy(true);
      }
    };
  }, []);

  const handleOrientationChange = () => {
    console.log("Orientation change button clicked");
    setIsLandscape(prev => !prev);
  };

  console.log("Rendering GuidePhaserLayer, isLandscape:", isLandscape);

  if (!isLandscape) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <p>Please rotate your device to landscape mode for the best guide experience.</p>
        <button onClick={handleOrientationChange} style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginTop: '20px'
        }}>
          Switch to Landscape
        </button>
      </div>
    );
  }

  return <div id="guide-hex" />;
};

export default GuidePhaserLayer;