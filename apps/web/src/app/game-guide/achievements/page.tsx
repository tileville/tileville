"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useNetworkStore } from "@/lib/stores/network";
import { Tabs } from "@radix-ui/themes";
import { formatDistance } from "date-fns";
import { Spinner2 } from "@/components/common/Spinner";
import Link from "next/link";

interface Achievement {
  id: string;
  title: string;
  description: string;
  iconUrl: string;
  level: "bronze" | "silver" | "gold" | "platinum";
  category: "gameplay" | "social" | "collection" | "competition";
  points: number;
  unlockedAt?: string;
  progress?: {
    current: number;
    total: number;
  };
}

const AchievementsPage = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const networkStore = useNetworkStore();

  const [achievements, setAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setAchievements([
        {
          id: "1",
          title: "First Victory",
          description: "Win your first game",
          iconUrl: "/icons/trophy.png",
          level: "bronze",
          category: "gameplay",
          points: 10,
          unlockedAt: new Date(
            Date.now() - 7 * 24 * 60 * 60 * 1000
          ).toISOString(), // 7 days ago
        },
        {
          id: "2",
          title: "Tile Master",
          description: "Complete a game with a score over 1000",
          iconUrl: "/icons/medal.png",
          level: "silver",
          category: "gameplay",
          points: 25,
          unlockedAt: new Date(
            Date.now() - 3 * 24 * 60 * 60 * 1000
          ).toISOString(), // 3 days ago
        },
        {
          id: "3",
          title: "Unstoppable",
          description: "Win 5 games in a row",
          iconUrl: "/icons/star.png",
          level: "gold",
          category: "gameplay",
          points: 50,
          unlockedAt: new Date(
            Date.now() - 1 * 24 * 60 * 60 * 1000
          ).toISOString(), // 1 day ago
        },
        {
          id: "4",
          title: "Speed Demon",
          description: "Complete a speed challenge in under 2 minutes",
          iconUrl: "/icons/rocket.png",
          level: "gold",
          category: "gameplay",
          points: 50,
        },
        {
          id: "5",
          title: "Social Butterfly",
          description: "Connect all social media accounts",
          iconUrl: "/icons/telegram.svg",
          level: "bronze",
          category: "social",
          points: 15,
          progress: {
            current: 2,
            total: 3,
          },
        },
        {
          id: "6",
          title: "NFT Collector",
          description: "Collect 10 unique NFTs",
          iconUrl: "/icons/game.png",
          level: "platinum",
          category: "collection",
          points: 100,
          progress: {
            current: 4,
            total: 10,
          },
        },
        {
          id: "7",
          title: "Competition Champion",
          description: "Win a platform competition",
          iconUrl: "/icons/trophy.png",
          level: "gold",
          category: "competition",
          points: 75,
        },
        {
          id: "8",
          title: "Grid Expert",
          description: "Complete 10 games without any empty spaces",
          iconUrl: "/icons/game.png",
          level: "silver",
          category: "gameplay",
          points: 35,
          progress: {
            current: 7,
            total: 10,
          },
        },
        {
          id: "9",
          title: "Perfectionist",
          description: "Achieve a perfect edge match score in a game",
          iconUrl: "/icons/medal.png",
          level: "platinum",
          category: "gameplay",
          points: 100,
        },
        {
          id: "10",
          title: "Community Member",
          description: "Follow 10 other players",
          iconUrl: "/icons/telegram.svg",
          level: "bronze",
          category: "social",
          points: 20,
          progress: {
            current: 4,
            total: 10,
          },
        },
        {
          id: "11",
          title: "Challenge Creator",
          description: "Create 5 PVP challenges",
          iconUrl: "/icons/star.png",
          level: "silver",
          category: "competition",
          points: 30,
          progress: {
            current: 3,
            total: 5,
          },
        },
        {
          id: "12",
          title: "Rare Collection",
          description: "Own at least one of each rarity level NFT",
          iconUrl: "/icons/game.png",
          level: "gold",
          category: "collection",
          points: 60,
          progress: {
            current: 2,
            total: 4,
          },
        },
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const getLevelColor = (level: string): string => {
    switch (level) {
      case "bronze":
        return "from-amber-700 to-amber-500";
      case "silver":
        return "from-slate-500 to-slate-300";
      case "gold":
        return "from-yellow-600 to-yellow-400";
      case "platinum":
        return "from-indigo-500 to-purple-400";
      default:
        return "from-gray-700 to-gray-500";
    }
  };

  const unlockedCount = achievements.filter((a) => a.unlockedAt).length;
  const totalPoints = achievements.reduce(
    (sum, a) => (a.unlockedAt ? sum + a.points : sum),
    0
  );
  const totalPossiblePoints = achievements.reduce(
    (sum, a) => sum + a.points,
    0
  );

  const filteredAchievements = achievements
    .filter((a) => activeCategory === "all" || a.category === activeCategory)
    .filter(
      (a) =>
        a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const categories = [
    { id: "all", name: "All Achievements" },
    { id: "gameplay", name: "Gameplay" },
    { id: "competition", name: "Competitions" },
    { id: "collection", name: "Collections" },
    { id: "social", name: "Social" },
  ];

  if (!networkStore.address) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4 pt-20">
        <div className="max-w-md rounded-xl bg-primary/10 p-8 text-center">
          <h2 className="mb-4 text-2xl font-bold text-primary">
            Connect Your Wallet
          </h2>
          <p className="mb-6">
            Please connect your wallet to view your achievements.
          </p>
          <button
            className="rounded-full bg-primary px-6 py-3 text-white hover:bg-primary/80"
            onClick={() => networkStore.connectWallet(false)}
          >
            Connect Wallet
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 pb-20 pt-12 md:pb-24 md:pt-40">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-primary md:text-5xl">
            Your Achievements
          </h1>
          <p className="mx-auto max-w-2xl text-lg">
            Track your progress, earn rewards, and showcase your
            accomplishments.
          </p>
        </div>

        <div className="mb-8 rounded-xl bg-primary/10 p-6">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-lg bg-white/50 p-4 text-center shadow-sm backdrop-blur-sm">
              <h2 className="text-4xl font-bold text-primary">
                {unlockedCount}
              </h2>
              <p className="text-lg">Achievements Unlocked</p>
              <p className="text-sm text-gray-600">
                out of {achievements.length} total
              </p>
            </div>

            <div className="rounded-lg bg-white/50 p-4 text-center shadow-sm backdrop-blur-sm">
              <h2 className="text-4xl font-bold text-primary">{totalPoints}</h2>
              <p className="text-lg">Points Earned</p>
              <p className="text-sm text-gray-600">
                out of {totalPossiblePoints} possible
              </p>
            </div>

            <div className="rounded-lg bg-white/50 p-4 shadow-sm backdrop-blur-sm">
              <h3 className="mb-2 text-center text-lg font-semibold">
                Completion Progress
              </h3>
              <div className="mb-2 h-4 w-full overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-500"
                  style={{
                    width: `${(unlockedCount / achievements.length) * 100}%`,
                  }}
                ></div>
              </div>
              <p className="text-center text-sm text-gray-600">
                {Math.round((unlockedCount / achievements.length) * 100)}%
                complete
              </p>
            </div>
          </div>
        </div>

        <div className="mb-6 flex flex-wrap items-center gap-4">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search achievements..."
              className="w-full rounded-lg border border-primary/30 bg-white/50 p-2 pl-10 focus:border-primary focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <Tabs.Root value={activeCategory} onValueChange={setActiveCategory}>
            <Tabs.List>
              {categories.map((category) => (
                <Tabs.Trigger key={category.id} value={category.id}>
                  {category.name}
                </Tabs.Trigger>
              ))}
            </Tabs.List>
          </Tabs.Root>
        </div>

        {isLoading ? (
          <div className="flex min-h-[300px] items-center justify-center">
            <Spinner2 size={40} />
          </div>
        ) : filteredAchievements.length === 0 ? (
          <div className="flex min-h-[300px] items-center justify-center rounded-lg border border-primary/20 p-6">
            <p className="text-xl text-gray-500">
              No achievements found matching your search.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredAchievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`group relative overflow-hidden rounded-lg border p-4 backdrop-blur-sm transition-all ${
                  achievement.unlockedAt
                    ? "border-primary/30 bg-white/70 hover:border-primary"
                    : "border-gray-200 bg-white/30 hover:border-gray-300"
                }`}
              >
                <div className="mb-4 flex items-center justify-between">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${getLevelColor(
                      achievement.level
                    )}`}
                  >
                    <Image
                      src={achievement.iconUrl}
                      alt={achievement.title}
                      width={30}
                      height={30}
                      className={achievement.unlockedAt ? "" : "grayscale"}
                    />
                  </div>
                  <div className="flex items-center gap-1 rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                    <Image
                      src="/icons/star.png"
                      alt="points"
                      width={14}
                      height={14}
                    />
                    {achievement.points} pts
                  </div>
                </div>

                <h3
                  className={`mb-1 text-lg font-bold ${
                    achievement.unlockedAt ? "text-primary" : "text-gray-500"
                  }`}
                >
                  {achievement.title}
                </h3>

                <p className="mb-3 text-sm text-gray-600">
                  {achievement.description}
                </p>

                {achievement.unlockedAt ? (
                  <p className="mt-auto text-xs text-gray-500">
                    Unlocked{" "}
                    {formatDistance(
                      new Date(achievement.unlockedAt),
                      new Date(),
                      { addSuffix: true }
                    )}
                  </p>
                ) : achievement.progress ? (
                  <div className="mt-auto">
                    <div className="flex justify-between text-xs text-gray-600">
                      <span>Progress</span>
                      <span>
                        {achievement.progress.current}/
                        {achievement.progress.total}
                      </span>
                    </div>
                    <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
                      <div
                        className="h-full rounded-full bg-primary/50"
                        style={{
                          width: `${
                            (achievement.progress.current /
                              achievement.progress.total) *
                            100
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>
                ) : (
                  <p className="mt-auto text-xs italic text-gray-500">
                    Achievement locked
                  </p>
                )}

                {achievement.unlockedAt && (
                  <div className="absolute -right-12 -top-12 h-24 w-24 rotate-45 bg-gradient-to-br from-green-500/20 to-green-300/20"></div>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 rounded-lg border border-primary/20 bg-white/50 p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-bold text-primary">
            How to Earn Achievements
          </h2>
          <p className="mb-4">
            Achievements are earned by completing specific actions and
            milestones in TileVille. Continue playing games, participating in
            competitions, collecting NFTs, and engaging with the community to
            unlock more achievements and earn points.
          </p>
          <p className="mb-6">
            Each achievement belongs to a category and has a specific level
            (Bronze, Silver, Gold, or Platinum) that determines its point value.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/competitions"
              className="rounded-full bg-primary px-4 py-2 text-sm text-white hover:bg-primary/80"
            >
              Join Competitions
            </Link>
            <Link
              href="/marketplace"
              className="rounded-full border border-primary bg-transparent px-4 py-2 text-sm text-primary hover:bg-primary/10"
            >
              Explore NFTs
            </Link>
            <Link
              href="/pvp"
              className="rounded-full border border-primary bg-transparent px-4 py-2 text-sm text-primary hover:bg-primary/10"
            >
              Create PVP Challenge
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AchievementsPage;
