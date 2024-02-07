import { useEffect } from 'react';
import { LoadScene, MainScene, MenuScene } from './scenes';
import { useNetworkLayer } from '../ui/hooks/useNetworkLayer';

type PhaserLayerProps = {
  handleEntryFees: () => void;
};
export const PhaserLayer = ({ handleEntryFees }: PhaserLayerProps) => {
  const { isEntryFeePaid } = useNetworkLayer();
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
      },
    };
    const game = new Phaser.Game(config);
    game.registry.set('handleEntryFees', handleEntryFees);
    game.registry.set('is_entry_fee_paid', isEntryFeePaid);

    return () => {
      game.destroy(true);
    };
  }, []);

  return <div id="minapolis-hex" />;
};
