import { useNetworkStore } from "@/lib/stores/network";
import { useFetchNFTSAlgolia } from "@/hooks/useFetchNFTSAlgolia";
import { useGetConnections } from "@/db/react-query-hooks";
import { useEffect } from "react";
import { useAchievements } from "@/hooks/useAchievements";

// Component to use in _app.tsx or layout.tsx to handle global achievement triggers
export const AchievementTriggerHandler = () => {
  const networkStore = useNetworkStore();
  const walletAddress = networkStore.address || "";

  // Get achievement service
  const { achievements, updateProgress } = useAchievements(walletAddress);

  // NFT Collection data for NFT-related achievements
  const { mintNFTHitsResponse: allNfts = [] } = useFetchNFTSAlgolia({
    owner: walletAddress,
  });

  // Social data for social-related achievements
  const { data: connections } = useGetConnections(walletAddress);
  const followingCount = connections?.following?.length || 0;
  const followersCount = connections?.followers?.length || 0;

  // Effect to check NFT collection achievements
  useEffect(() => {
    if (!walletAddress || !achievements.length || !allNfts.length) return;
  }, [walletAddress, achievements, allNfts, updateProgress]);

  // Effect to check social achievements
  useEffect(() => {
    if (!walletAddress || !achievements.length || !connections) return;

    const checkSocialAchievements = () => {
      // Community Member achievement (following 5 players)
      const communityMemberAchievement = achievements.find(
        (a) => a.id === "community_member"
      );
      if (
        communityMemberAchievement &&
        (!communityMemberAchievement.unlockedAt ||
          communityMemberAchievement.progress?.current !== followingCount) &&
        followingCount >= 1
      ) {
      }

      // Influencer achievement (getting followed by 10 players)
      const influencerAchievement = achievements.find(
        (a) => a.id === "influencer"
      );
      if (
        influencerAchievement &&
        (!influencerAchievement.unlockedAt ||
          influencerAchievement.progress?.current !== followersCount) &&
        followersCount >= 1
      ) {
      }

      // Social Butterfly achievement
      const socialAccounts = [
        !!connections.twitter_username,
        !!connections.telegram_username,
        !!connections.discord_username,
      ].filter(Boolean).length;

      const socialButterflyAchievement = achievements.find(
        (a) => a.id === "social_butterfly"
      );
      if (
        socialButterflyAchievement &&
        (!socialButterflyAchievement.unlockedAt ||
          socialButterflyAchievement.progress?.current !== socialAccounts) &&
        socialAccounts >= 1
      ) {
      }
    };

    checkSocialAchievements();
  }, [
    walletAddress,
    achievements,
    connections,
    followingCount,
    followersCount,
    updateProgress,
  ]);

  return null;
};
