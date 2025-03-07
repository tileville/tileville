import React, { useState } from 'react';
import { Dialog } from '@radix-ui/themes';
import Image from 'next/image';
import { Cross1Icon } from '@radix-ui/react-icons';
import { formatDistance } from 'date-fns';
import GameAchievementCard, { GameAchievement } from './GameAchievementCard';

// Example achievements - in a real app, this would come from your API
const MOCK_ACHIEVEMENTS: GameAchievement[] = [
  {
    id: '1',
    title: 'First Victory',
    description: 'Win your first game',
    iconUrl: '/icons/trophy.png',
    level: 'bronze',
    unlockedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days ago
  },
  {
    id: '2',
    title: 'Tile Master',
    description: 'Complete a game with a score over 1000',
    iconUrl: '/icons/medal.png',
    level: 'silver',
    unlockedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() // 3 days ago
  },
  {
    id: '3',
    title: 'Unstoppable',
    description: 'Win 5 games in a row',
    iconUrl: '/icons/star.png',
    level: 'gold',
    unlockedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() // 1 day ago
  },
  {
    id: '4',
    title: 'Speed Demon',
    description: 'Complete a speed challenge in under 2 minutes',
    iconUrl: '/icons/rocket.png',
    level: 'gold',
  },
  {
    id: '5',
    title: 'Social Butterfly',
    description: 'Connect all social media accounts',
    iconUrl: '/icons/telegram.svg',
    level: 'bronze',
    progress: {
      current: 2,
      total: 3
    }
  },
  {
    id: '6',
    title: 'NFT Collector',
    description: 'Collect 10 unique NFTs',
    iconUrl: '/icons/game.png', 
    level: 'platinum',
    progress: {
      current: 4,
      total: 10
    }
  }
];

const GameAchievementsList: React.FC<{ walletAddress?: string }> = ({ walletAddress }) => {
  const [selectedAchievement, setSelectedAchievement] = useState<GameAchievement | null>(null);
  
  // In a real app, you would fetch achievements from your API
  // const { data: achievements, isLoading } = useAchievements(walletAddress);
  
  const achievements = MOCK_ACHIEVEMENTS;
  const unlockedCount = achievements.filter(a => a.unlockedAt).length;
  
  return (
    <div className="mb-8">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-primary">Game Achievements</h2>
        <div className="text-sm text-gray-600">
          <span className="font-medium text-primary">{unlockedCount}</span> / {achievements.length} unlocked
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {achievements.map((achievement) => (
          <GameAchievementCard
            key={achievement.id}
            achievement={achievement}
            onClick={(achievement) => setSelectedAchievement(achievement)}
          />
        ))}
      </div>

      {/* Achievement details dialog */}
      <Dialog.Root open={!!selectedAchievement} onOpenChange={() => setSelectedAchievement(null)}>
        <Dialog.Content className="max-w-md bg-[#A4B881] p-6">
          {selectedAchievement && (
            <>
              <Dialog.Title className="mb-4 text-xl font-bold text-primary">
                {selectedAchievement.title}
              </Dialog.Title>
              
              <div className="mb-4 flex justify-center">
                <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-primary/20">
                  <Image
                    src={selectedAchievement.iconUrl}
                    alt={selectedAchievement.title}
                    width={60}
                    height={60}
                    className="object-contain"
                  />
                </div>
              </div>
              
              <div className="mb-3 text-center text-lg">{selectedAchievement.description}</div>
              
              <div className="mb-4 rounded-lg bg-white/50 p-4 backdrop-blur-sm">
                <div className="mb-2 flex justify-between">
                  <span className="font-medium">Level:</span>
                  <span className="font-bold text-primary">{selectedAchievement.level.toUpperCase()}</span>
                </div>
                
                {selectedAchievement.unlockedAt ? (
                  <div className="flex justify-between">
                    <span className="font-medium">Unlocked:</span>
                    <span>{formatDistance(new Date(selectedAchievement.unlockedAt), new Date(), { addSuffix: true })}</span>
                  </div>
                ) : selectedAchievement.progress ? (
                  <div>
                    <div className="mb-1 flex justify-between">
                      <span className="font-medium">Progress:</span>
                      <span>
                        {selectedAchievement.progress.current} / {selectedAchievement.progress.total}
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                      <div 
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${(selectedAchievement.progress.current / selectedAchievement.progress.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between">
                    <span className="font-medium">Status:</span>
                    <span>Not yet unlocked</span>
                  </div>
                )}
              </div>
              
              {!selectedAchievement.unlockedAt && (
                <div className="text-center text-sm text-gray-600">
                  Keep playing to unlock this achievement!
                </div>
              )}
            </>
          )}
          
          <Dialog.Close>
            <button className="absolute right-4 top-4">
              <Cross1Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
};

export default GameAchievementsList;