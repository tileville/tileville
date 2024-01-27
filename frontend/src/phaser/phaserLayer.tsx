import { useEffect } from 'react';
import { LoadScene, MainScene, MenuScene } from './scenes';

export const PhaserLayer = () => {
  useEffect(() => {
    const config: Phaser.Types.Core.GameConfig = {
      width: 1280,
      height: '100%',
      parent: 'minapolis-hex',
      type: Phaser.AUTO,
      scene: [LoadScene, MenuScene, MainScene],
      backgroundColor: '0xded6b6',
      scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH,
        mode: Phaser.Scale.FIT,
      },
    };
    const game = new Phaser.Game(config);
    return () => {
      game.destroy(true);
    };
  }, []);

  return <div id="minapolis-hex" />;
};
