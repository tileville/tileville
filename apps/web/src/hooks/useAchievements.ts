import { useState, useEffect } from "react";

export interface Achievement {
  id: string;
  title: string;
  description: string;
  iconUrl: string;
  level: "bronze" | "silver" | "gold" | "platinum";
  category: "gameplay" | "collection" | "social" | "competition";
  requirement: number;
  points: number;
  unlockedAt?: string;
  progress?: {
    current: number;
    total: number;
  };
}

interface AchievementProgress {
  wallet_address: string;
  achievement_id: string;
  progress: number;
  is_completed: boolean;
  completed_at?: string;
  created_at: string;
  updated_at: string;
}

// All available achievements in the system
export const ACHIEVEMENTS: Achievement[] = [
  // Gameplay achievements
  {
    id: "first_win",
    title: "First Victory",
    description: "Win your first game",
    iconUrl: "/icons/trophy.png",
    level: "bronze",
    category: "gameplay",
    requirement: 1,
    points: 10,
  },
  {
    id: "win_streak",
    title: "On Fire!",
    description: "Win 3 games in a row",
    iconUrl: "/icons/fire.png",
    level: "silver",
    category: "gameplay",
    requirement: 3,
    points: 30,
  },
  {
    id: "high_score",
    title: "High Roller",
    description: "Achieve a score over 1000 points",
    iconUrl: "/icons/star.png",
    level: "gold",
    category: "gameplay",
    requirement: 1000,
    points: 50,
  },
  {
    id: "speed_demon",
    title: "Speed Demon",
    description: "Complete a speed challenge in under 2 minutes",
    iconUrl: "/icons/rocket.png",
    level: "gold",
    category: "gameplay",
    requirement: 1,
    points: 50,
  },

  // Collection achievements
  {
    id: "first_nft",
    title: "Digital Collector",
    description: "Mint your first TileVille NFT",
    iconUrl: "/icons/medal.png",
    level: "bronze",
    category: "collection",
    requirement: 1,
    points: 15,
  },
  {
    id: "nft_collector",
    title: "NFT Enthusiast",
    description: "Collect 5 unique NFTs",
    iconUrl: "/icons/game.png",
    level: "silver",
    category: "collection",
    requirement: 5,
    points: 40,
  },
  {
    id: "nft_connoisseur",
    title: "NFT Connoisseur",
    description: "Collect 10 unique NFTs",
    iconUrl: "/icons/crown.png",
    level: "gold",
    category: "collection",
    requirement: 10,
    points: 75,
  },

  // Social achievements
  {
    id: "social_butterfly",
    title: "Social Butterfly",
    description: "Connect all social media accounts",
    iconUrl: "/icons/telegram.svg",
    level: "bronze",
    category: "social",
    requirement: 3,
    points: 20,
  },
  {
    id: "community_member",
    title: "Community Member",
    description: "Follow 5 other players",
    iconUrl: "/icons/people.png",
    level: "bronze",
    category: "social",
    requirement: 5,
    points: 25,
  },
  {
    id: "influencer",
    title: "TileVille Influencer",
    description: "Get followed by 10 players",
    iconUrl: "/icons/star-circle.png",
    level: "gold",
    category: "social",
    requirement: 10,
    points: 60,
  },

  // Competition achievements
  {
    id: "competitor",
    title: "Competitor",
    description: "Participate in 3 different competitions",
    iconUrl: "/icons/competition.png",
    level: "bronze",
    category: "competition",
    requirement: 3,
    points: 15,
  },
  {
    id: "challenge_creator",
    title: "Challenge Creator",
    description: "Create 3 PVP challenges",
    iconUrl: "/icons/lightning.png",
    level: "silver",
    category: "competition",
    requirement: 3,
    points: 35,
  },
  {
    id: "champion",
    title: "TileVille Champion",
    description: "Win a competition with at least 10 participants",
    iconUrl: "/icons/medal-star.png",
    level: "platinum",
    category: "competition",
    requirement: 1,
    points: 100,
  },
];

// Hook to fetch and manage user achievements
export const useAchievements = (walletAddress: string) => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [totalPoints, setTotalPoints] = useState(0);

  useEffect(() => {
    if (!walletAddress) {
      setAchievements([]);
      setLoading(false);
      return;
    }

    const fetchAchievements = () => {
      try {
        setLoading(true);

        // Fetch user achievement progress from database

        // Map achievements with user progress
        const progressMap = new Map<string, AchievementProgress>();

        // Build complete achievements list with progress
        const achievementsWithProgress = ACHIEVEMENTS.map((achievement) => {
          const progress = progressMap.get(achievement.id);

          if (progress?.is_completed) {
            return {
              ...achievement,
              unlockedAt: progress.completed_at || progress.updated_at,
            };
          }

          if (progress) {
            return {
              ...achievement,
              progress: {
                current: progress.progress,
                total: achievement.requirement,
              },
            };
          }

          // Default for achievements with no progress yet
          return {
            ...achievement,
            progress: {
              current: 0,
              total: achievement.requirement,
            },
          };
        });

        setAchievements(achievementsWithProgress);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching achievements:", err);
        setError(
          err instanceof Error
            ? err
            : new Error("Unknown error fetching achievements")
        );
        setLoading(false);
      }
    };

    fetchAchievements();
  }, [walletAddress]);

  // Function to update achievement progress
  const updateProgress = (achievementId: string, progress: number) => {
    if (!walletAddress) return;

    try {
      // Find the achievement
      const achievement = ACHIEVEMENTS.find((a) => a.id === achievementId);
      if (!achievement)
        throw new Error(`Achievement ${achievementId} not found`);

      // Check if this progress completes the achievement
      const isCompleted = progress >= achievement.requirement;

      // Check if achievement already exists for user

      if (true) {
        if (error) throw error;
      } else {
        // Create new progress record
        if (error) throw error;
      }

      // Update local state
      const updatedAchievements = achievements.map((a) => {
        if (a.id === achievementId) {
          if (isCompleted) {
            return {
              ...a,
              unlockedAt: new Date().toISOString(),
            };
          } else {
            return {
              ...a,
              progress: {
                current: progress,
                total: a.requirement,
              },
            };
          }
        }
        return a;
      });

      setAchievements(updatedAchievements);

      // Update points if newly completed
      if (
        isCompleted &&
        !achievements.find((a) => a.id === achievementId)?.unlockedAt
      ) {
        setTotalPoints((prev) => prev + achievement.points);
      }

      // Return the updated achievement
      return updatedAchievements.find((a) => a.id === achievementId);
    } catch (err) {
      console.error("Error updating achievement progress:", err);
      throw err;
    }
  };

  // Utility to check for achievements after a specific event
  // This would be called after game completions, social interactions, etc.
  const checkAchievements = (
    type: "game_win" | "nft_mint" | "follow" | "competition"
  ) => {
    if (!walletAddress) return;

    // This would need additional context data to properly evaluate achievements
    // For example, checking win streak would need game history

    // Example: After a game win
    if (type === "game_win") {
      // First win achievement
      const firstWinAchievement = achievements.find(
        (a) => a.id === "first_win"
      );
      if (firstWinAchievement && !firstWinAchievement.unlockedAt) {
        updateProgress("first_win", 1);
      }

      // Other win-related achievements would be updated here
    }

    // Similar logic for other achievement types
  };

  return {
    achievements,
    loading,
    error,
    totalPoints,
    updateProgress,
    checkAchievements,
  };
};
