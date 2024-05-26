import { useEffect } from "react";
import { LoadScene, MainScene, MenuScene } from "./scenes";

type PhaserLayerProps = {
  handleEntryFees: () => void;
};
export const PhaserLayer = ({ handleEntryFees }: PhaserLayerProps) => {
  useEffect(() => {
    const config: Phaser.Types.Core.GameConfig = {
      width: 1280,
      height: "100%",
      parent: "minapolis-hex",
      type: Phaser.AUTO,
      scene: [LoadScene, MenuScene, MainScene],
      backgroundColor: "0xded6b6",
    };
    const game = new Phaser.Game(config);
    game.registry.set("handleEntryFees", handleEntryFees);

    return () => {
      game.destroy(true);
    };
  }, []);

  return <div id="minapolis-hex" />;
};
