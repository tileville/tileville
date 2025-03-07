import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { formatDistance } from 'date-fns';

export type AchievementLevel = 'bronze' | 'silver' | 'gold' | 'platinum';

export interface GameAchievement {
  id: string;
  title: string;
  description: string;
  iconUrl: string;
  level: AchievementLevel;
  unlockedAt?: string;
  progress?: {
    current: number;
    total: number;
  };
}

interface GameAchievementCardProps {
  achievement: GameAchievement;
  onClick?: (achievement: GameAchievement) => void;
}

const getLevelColor = (level: AchievementLevel) => {
  switch (level) {
    case 'bronze':
      return 'from-amber-700 to-amber-500';
    case 'silver':
      return 'from-slate-400 to-slate-300';
    case 'gold':
      return 'from-yellow-500 to-yellow-300';
    case 'platinum':
      return 'from-indigo-500 to-purple-400';
    default:
      return 'from-amber-700 to-amber-500';
  }
};

const getLevelText = (level: AchievementLevel) => {
  return level.charAt(0).toUpperCase() + level.slice(1);
};

const TestGameAchievementCard: React.FC<GameAchievementCardProps> = ({ achievement, onClick }) => {
  const isUnlocked = !!achievement.unlockedAt;
  const levelColor = getLevelColor(achievement.level);
  
  const handleCardClick = () => {
    if (onClick) {
      onClick(achievement);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`relative cursor-pointer overflow-hidden rounded-lg border ${
        isUnlocked ? 'border-primary bg-white/60' : 'border-gray-300 bg-white/30'
      } backdrop-blur-sm shadow-sm transition-all duration-200`}
      onClick={handleCardClick}
    >
      {/* Badge with level indicator */}
      <div className={`absolute right-0 top-0 rounded-bl-lg bg-gradient-to-r ${levelColor} px-3 py-1 text-xs font-bold text-white`}>
        {getLevelText(achievement.level)}
      </div>
      
      <div className="flex items-center gap-3 p-4">
        {/* Achievement icon */}
        <div className={`relative flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full ${
          isUnlocked ? 'bg-primary/20' : 'bg-gray-200/50 grayscale'
        }`}>
          <Image
            src={achievement.iconUrl}
            alt={achievement.title}
            width={36}
            height={36}
            className="object-contain"
          />
          
          {/* Shine effect on unlocked achievements */}
          {isUnlocked && (
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/40 to-transparent opacity-70"></div>
          )}
        </div>
        
        {/* Achievement details */}
        <div className="flex-1">
          <h3 className={`font-bold ${isUnlocked ? 'text-primary' : 'text-gray-500'}`}>
            {achievement.title}
          </h3>
          <p className="text-sm text-gray-600">{achievement.description}</p>
          
          {/* Progress bar for locked achievements with progress */}
          {!isUnlocked && achievement.progress && (
            <div className="mt-2">
              <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                <div 
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${(achievement.progress.current / achievement.progress.total) * 100}%` }}
                ></div>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                {achievement.progress.current} / {achievement.progress.total}
              </p>
            </div>
          )}
          
          {/* Unlock date for unlocked achievements */}
          {isUnlocked && achievement.unlockedAt && (
            <p className="mt-1 text-xs text-gray-500">
              Unlocked {formatDistance(new Date(achievement.unlockedAt), new Date(), { addSuffix: true })}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default TestGameAchievementCard;