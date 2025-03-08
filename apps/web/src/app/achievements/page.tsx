"use client";

import React, { useState } from 'react';
import { Tabs } from "@radix-ui/themes";
import { useNetworkStore } from '@/lib/stores/network';
import { Spinner2 } from '@/components/common/Spinner';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Achievement, useAchievements } from '@/hooks/useAchievements';

export default function AchievementsPage() {
  const networkStore = useNetworkStore();
  const walletAddress = networkStore.address || '';
  const { achievements, loading, totalPoints } = useAchievements(walletAddress);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  if (!walletAddress) {
    return (
      <div className="flex min-h-[calc(100vh-100px)] items-center justify-center">
        <div className="text-center">
          <h1 className="mb-6 text-2xl font-bold">Connect your wallet to view achievements</h1>
          <button 
            className="rounded-lg bg-primary px-4 py-2 text-white hover:bg-primary/90"
            onClick={() => networkStore.connectWallet(false)}
          >
            Connect Wallet
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-100px)] items-center justify-center">
        <Spinner2 />
      </div>
    );
  }
  
  const categories = [
    { id: 'all', name: 'All' },
    { id: 'gameplay', name: 'Gameplay' },
    { id: 'collection', name: 'Collection' },
    { id: 'social', name: 'Social' },
    { id: 'competition', name: 'Competition' }
  ];
  
  const filteredAchievements = selectedCategory === 'all' 
    ? achievements 
    : achievements.filter(achievement => achievement.category === selectedCategory);
    
  const unlockedCount = achievements.filter(a => a.unlockedAt).length;
  const progressPercentage = Math.round((unlockedCount / achievements.length) * 100);
  
  return (
    <div className="mx-auto max-w-6xl p-4 py-16 md:p-6 md:py-24">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary md:text-4xl">Achievements</h1>
          <p className="text-md mt-2 text-gray-700">Unlock achievements to show off your TileVille mastery!</p>
        </div>
        
        <div className="flex flex-col items-start rounded-lg border border-primary/20 bg-primary/10 p-4 md:items-end">
          <div className="flex items-center gap-2">
            <Image 
              src="/icons/star.png" 
              alt="Points" 
              width={24} 
              height={24} 
              className="h-6 w-6"
            />
            <span className="text-xl font-bold">{totalPoints} points</span>
          </div>
          <div className="mt-2">
            <span className="font-medium">{unlockedCount}/{achievements.length} achievements ({progressPercentage}%)</span>
          </div>
        </div>
      </div>
      
      <Tabs.Root value={selectedCategory} onValueChange={setSelectedCategory}>
        <Tabs.List className="mb-6 flex flex-wrap border-b border-primary/30">
          {categories.map(category => (
            <Tabs.Trigger 
              key={category.id} 
              value={category.id}
              className="px-4 py-2 text-primary hover:bg-primary/10"
            >
              {category.name}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredAchievements.map(achievement => (
            <AchievementCard key={achievement.id} achievement={achievement} />
          ))}
          
          {filteredAchievements.length === 0 && (
            <div className="col-span-full py-8 text-center text-gray-500">
              No achievements found in this category.
            </div>
          )}
        </div>
      </Tabs.Root>
    </div>
  );
}

interface AchievementCardProps {
  achievement: Achievement;
}

const AchievementCard: React.FC<AchievementCardProps> = ({ achievement }) => {
  const isUnlocked = !!achievement.unlockedAt;
  
  // Define colors based on achievement level
  const getLevelColors = (level: string) => {
    switch (level) {
      case 'bronze':
        return {
          bg: 'bg-amber-700/10',
          border: 'border-amber-700/30',
          text: 'text-amber-800'
        };
      case 'silver':
        return {
          bg: 'bg-slate-400/10',
          border: 'border-slate-400/30',
          text: 'text-slate-700'
        };
      case 'gold':
        return {
          bg: 'bg-yellow-500/10',
          border: 'border-yellow-500/30',
          text: 'text-yellow-700'
        };
      case 'platinum':
        return {
          bg: 'bg-indigo-500/10',
          border: 'border-indigo-500/30',
          text: 'text-indigo-700'
        };
      default:
        return {
          bg: 'bg-primary/10',
          border: 'border-primary/30',
          text: 'text-primary'
        };
    }
  };
  
  const colors = getLevelColors(achievement.level);
  const formattedDate = achievement.unlockedAt 
    ? new Date(achievement.unlockedAt).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      }) 
    : null;
  
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`relative overflow-hidden rounded-lg border ${
        isUnlocked ? colors.border : 'border-gray-200'
      } ${isUnlocked ? colors.bg : 'bg-gray-100/50'} p-5 shadow-sm transition-all duration-200`}
    >
      {isUnlocked && (
        <div className="absolute right-0 top-0 bg-gradient-to-l from-green-500 to-green-600 px-3 py-1 text-xs font-bold text-white">
          Unlocked!
        </div>
      )}
      
      <div className="flex gap-4">
        <div className={`relative flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full ${
          isUnlocked ? 'bg-white/70' : 'bg-gray-200 grayscale'
        }`}>
          <Image
            src={achievement.iconUrl}
            alt={achievement.title}
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
          />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className={`font-bold ${isUnlocked ? colors.text : 'text-gray-500'}`}>
              {achievement.title}
            </h3>
            <span className={`rounded-full px-2 py-0.5 text-xs font-semibold capitalize ${
              isUnlocked ? colors.text : 'text-gray-500'
            } ${isUnlocked ? colors.bg : 'bg-gray-200/50'}`}>
              {achievement.level}
            </span>
          </div>
          <p className="mt-1 text-sm text-gray-600">{achievement.description}</p>
          
          {!isUnlocked && achievement.progress && (
            <div className="mt-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600">Progress</span>
                <span className="font-medium">
                  {achievement.progress.current} / {achievement.progress.total}
                </span>
              </div>
              <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-gray-200">
                <div 
                  className="h-full rounded-full bg-primary transition-all duration-500"
                  style={{ width: `${(achievement.progress.current / achievement.progress.total) * 100}%` }}
                ></div>
              </div>
            </div>
          )}
          
          {isUnlocked && formattedDate && (
            <p className="mt-2 text-xs text-gray-500">
              Unlocked on {formattedDate}
            </p>
          )}
          
          {achievement.points > 0 && (
            <div className="mt-2 flex items-center gap-1">
              <Image 
                src="/icons/star.png" 
                alt="Points" 
                width={16} 
                height={16} 
                className="h-4 w-4"
              />
              <span className={`text-xs font-bold ${isUnlocked ? 'text-yellow-600' : 'text-gray-400'}`}>
                {achievement.points} points
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};