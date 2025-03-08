import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Spinner2 } from "../common/Spinner";

type AchievementShowcaseProps = {
  walletAddress: string;
  isProfileOwner: boolean;
};

export const AchievementShowcase = ({
  walletAddress,
  isProfileOwner,
}: AchievementShowcaseProps) => {
  const { achievements, loading, totalPoints } = {
    achievements: [],
    loading: false,
    totalPoints: 12,
  };

  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center rounded-xl bg-primary/20 p-4 backdrop-blur-sm">
        <Spinner2 />
      </div>
    );
  }

  const unlockedAchievements = achievements.filter((a: any) => a.unlockedAt);
  const unlockedCount = unlockedAchievements.length;
  const progressPercentage = Math.round(
    (unlockedCount / achievements.length) * 100
  );

  const recentAchievements = [...unlockedAchievements];
  const showcaseAchievements = [...recentAchievements];
  const displayAchievements = showcaseAchievements.slice(0, 4);

  return (
    <div className="flex h-full w-full flex-col rounded-xl bg-primary/20 p-4 backdrop-blur-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-bold text-primary">Achievement Showcase</h3>
        <div className="flex items-center gap-2">
          <Image
            src="/icons/star.png"
            alt="Points"
            width={20}
            height={20}
            className="h-5 w-5"
          />
          <span className="font-bold text-black">{totalPoints} points</span>
        </div>
      </div>

      <div className="mb-4 flex w-full items-center gap-2">
        <div className="h-2 w-full rounded-full bg-gray-200">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <span className="whitespace-nowrap text-xs font-medium">
          {unlockedCount}/{achievements.length}
        </span>
      </div>

      {unlockedCount === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center p-4 text-center">
          <p className="mb-2 text-gray-500">No achievements unlocked yet</p>
          {isProfileOwner && (
            <p className="text-sm text-primary">
              Complete challenges and competitions to earn achievements!
            </p>
          )}
        </div>
      ) : (
        <div className="grid flex-1 grid-cols-2 gap-2">
          {displayAchievements.map((achievement: any) => (
            <div
              key={achievement.id}
              className="flex flex-col items-center justify-center rounded-lg bg-white/60 p-3 text-center transition-colors hover:bg-white/80"
            >
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10"></div>
              <h4 className="mb-1 text-sm font-medium leading-tight">12</h4>
              <span className="line-clamp-2 text-xs text-gray-600">12</span>
              <div className="mt-1 flex items-center gap-1">
                <Image
                  src="/icons/star.png"
                  alt="Points"
                  width={12}
                  height={12}
                  className="h-3 w-3"
                />
                <span className="text-xs font-bold text-yellow-600">12</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <Link
        href={
          isProfileOwner
            ? "/achievements"
            : `/achievements?user=${walletAddress}`
        }
        className="mt-4 text-center text-sm font-medium text-primary hover:underline"
      >
        {isProfileOwner
          ? "View all your achievements"
          : "View all achievements"}
      </Link>
    </div>
  );
};
