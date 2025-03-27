import React from "react";

// Current season info
const currentSeason = {
  name: "Spring Builder 2025",
  startDate: "March 1, 2025",
  endDate: "May 31, 2025",
  daysRemaining: 65,
  theme: "Eco-Cities of Tomorrow",
};

// Track data for progress visualization
const trackData = {
  currentLevel: 24,
  maxLevel: 50,
  percentComplete: 48,
  xpToNextLevel: 850,
  totalXP: 12450,
};

// Free rewards track
const freeRewards = [
  {
    level: 5,
    type: "currency",
    amount: 500,
    icon: "/img/rewards/mina-coin.png",
    claimed: true,
  },
  {
    level: 10,
    type: "blueprint",
    name: "Solar Park",
    icon: "/img/rewards/blueprint.png",
    claimed: true,
  },
  {
    level: 15,
    type: "avatar",
    name: "City Planner",
    icon: "/img/rewards/avatar.png",
    claimed: true,
  },
  {
    level: 20,
    type: "currency",
    amount: 1000,
    icon: "/img/rewards/mina-coin.png",
    claimed: true,
  },
  {
    level: 25,
    type: "item",
    name: "Speed Boost (24h)",
    icon: "/img/rewards/boost.png",
    claimed: false,
  },
  {
    level: 30,
    type: "blueprint",
    name: "Wind Farm",
    icon: "/img/rewards/blueprint.png",
    claimed: false,
  },
  {
    level: 35,
    type: "currency",
    amount: 1500,
    icon: "/img/rewards/mina-coin.png",
    claimed: false,
  },
  {
    level: 40,
    type: "avatar",
    name: "Eco Warrior",
    icon: "/img/rewards/avatar.png",
    claimed: false,
  },
  {
    level: 45,
    type: "item",
    name: "Double XP (48h)",
    icon: "/img/rewards/boost.png",
    claimed: false,
  },
  {
    level: 50,
    type: "blueprint",
    name: "Citizen Monument",
    icon: "/img/rewards/blueprint.png",
    claimed: false,
  },
];

// Premium rewards track (available with season pass purchase)
const premiumRewards = [
  {
    level: 5,
    type: "item",
    name: "Builder Boost (48h)",
    icon: "/img/rewards/boost.png",
    claimed: false,
  },
  {
    level: 10,
    type: "nft",
    name: "Eco-Planner Builder NFT",
    icon: "/img/rewards/nft.png",
    claimed: false,
  },
  {
    level: 15,
    type: "currency",
    amount: 2000,
    icon: "/img/rewards/mina-coin.png",
    claimed: false,
  },
  {
    level: 20,
    type: "exclusive-blueprint",
    name: "Vertical Garden Tower",
    icon: "/img/rewards/premium-blueprint.png",
    claimed: false,
  },
  {
    level: 25,
    type: "item",
    name: "Resource Generator (72h)",
    icon: "/img/rewards/boost.png",
    claimed: false,
  },
  {
    level: 30,
    type: "nft",
    name: "Solar Engineer Builder NFT",
    icon: "/img/rewards/nft.png",
    claimed: false,
  },
  {
    level: 35,
    type: "currency",
    amount: 3500,
    icon: "/img/rewards/mina-coin.png",
    claimed: false,
  },
  {
    level: 40,
    type: "exclusive-blueprint",
    name: "Eco-Tech Research Center",
    icon: "/img/rewards/premium-blueprint.png",
    claimed: false,
  },
  {
    level: 45,
    type: "item",
    name: "City Expansion Permit",
    icon: "/img/rewards/boost.png",
    claimed: false,
  },
  {
    level: 50,
    type: "limited-nft",
    name: "Legendary Season Guardian NFT",
    icon: "/img/rewards/legendary-nft.png",
    claimed: false,
  },
];

// Weekly challenges to earn XP
const weeklyQuests = [
  { id: 1, name: "Build 5 Residential Buildings", xp: 500, completed: true },
  {
    id: 2,
    name: "Win 3 PVP Challenges",
    xp: 750,
    completed: false,
    progress: 1,
    max: 3,
  },
  {
    id: 3,
    name: "Place 10 Solar Panels",
    xp: 600,
    completed: false,
    progress: 7,
    max: 10,
  },
  {
    id: 4,
    name: "Score 5000+ in Urban Planning Mode",
    xp: 800,
    completed: false,
    progress: 3200,
    max: 5000,
  },
  { id: 5, name: "Complete 2 Competition Rounds", xp: 1000, completed: true },
];

export default function SeasonPassPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:py-20">
      {/* Season Header */}
      <div className="relative mb-8 h-64 w-full overflow-hidden rounded-xl">
        <div className="absolute inset-0 flex flex-col justify-center bg-gradient-to-r from-black/70 to-transparent p-8">
          <h1 className="mb-2 text-3xl font-bold text-white md:text-5xl">
            {currentSeason.name}
          </h1>
          <p className="mb-4 text-white/80">{currentSeason.theme}</p>
          <div className="flex items-center space-x-4">
            <div className="rounded-lg bg-black/50 px-4 py-2 text-white backdrop-blur-sm">
              <span className="font-bold">{currentSeason.daysRemaining}</span>{" "}
              days remaining
            </div>
            <div className="rounded-lg bg-black/50 px-4 py-2 text-white backdrop-blur-sm">
              {currentSeason.startDate} - {currentSeason.endDate}
            </div>
          </div>
        </div>
      </div>

      {/* Season Pass Options */}
      <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-xl bg-white/10 p-6 shadow-lg backdrop-blur-md">
          <h2 className="mb-4 text-2xl font-bold text-primary">Free Pass</h2>
          <p className="mb-4">
            Access the basic rewards track with limited rewards. Play the game
            normally and earn XP to progress through the levels.
          </p>
          <ul className="mb-6 list-inside list-disc space-y-2">
            <li>10 reward tiers to unlock</li>
            <li>Access to weekly challenges</li>
            <li>Earn up to 3,000 MINA tokens</li>
            <li>3 unique blueprints</li>
          </ul>
          <div className="text-center">
            <button className="rounded-md bg-primary/50 px-6 py-3 font-bold text-white">
              Active
            </button>
          </div>
        </div>

        <div className="rounded-xl border border-primary/30 bg-gradient-to-br from-primary/20 to-purple-900/20 p-6 shadow-lg backdrop-blur-md">
          <div className="absolute right-4 top-4 rounded-full bg-yellow-500 px-2 py-1 text-xs font-bold">
            BEST VALUE
          </div>
          <h2 className="mb-4 text-2xl font-bold text-primary">Premium Pass</h2>
          <p className="mb-4">
            Unlock the premium rewards track with exclusive NFTs, advanced
            blueprints, and accelerated progression.
          </p>
          <ul className="mb-6 list-inside list-disc space-y-2">
            <li>All free pass rewards plus 10 premium tiers</li>
            <li>3 exclusive Builder NFTs</li>
            <li>+25% XP boost for faster progression</li>
            <li>Earn up to 5,500 additional MINA tokens</li>
            <li>Exclusive premium blueprints</li>
          </ul>
          <div className="text-center">
            <button className="rounded-md bg-primary px-6 py-3 font-bold text-white transition-colors hover:bg-primary/80">
              Unlock Premium - 25 MINA
            </button>
          </div>
        </div>
      </div>

      {/* Progress Track */}
      <div className="mb-12 rounded-xl bg-white/10 p-6 shadow-lg backdrop-blur-md">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-primary">Season Progress</h2>
          <div className="flex items-center space-x-4">
            <div className="rounded-lg bg-primary/20 px-4 py-2">
              <span className="font-bold text-primary">
                Level {trackData.currentLevel}
              </span>
            </div>
            <div className="text-sm">
              <span className="font-bold">{trackData.totalXP}</span> XP total
            </div>
            <div className="text-sm">
              <span className="font-bold">{trackData.xpToNextLevel}</span> XP to
              next level
            </div>
          </div>
        </div>

        {/* XP Progress Bar */}
        <div className="mb-10 h-4 w-full overflow-hidden rounded-full bg-black/20">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary to-blue-500"
            style={{ width: `${trackData.percentComplete}%` }}
          ></div>
        </div>

        {/* Rewards Track Visualization */}
        <div className="mb-10 grid grid-cols-10 gap-4">
          {Array.from({ length: 5 }).map((_, groupIdx) => (
            <React.Fragment key={groupIdx}>
              <div
                className={`flex flex-col items-center ${
                  groupIdx * 10 + 10 <= trackData.currentLevel
                    ? "opacity-100"
                    : "opacity-50"
                }`}
              >
                <div className="mb-2 text-sm font-bold">
                  Level {groupIdx * 10 + 10}
                </div>
                <div className="mb-2 h-[2px] w-full bg-white/50"></div>
              </div>
            </React.Fragment>
          ))}
        </div>

        {/* Level Details */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <h3 className="mb-4 text-xl font-bold text-primary">
              Free Rewards
            </h3>
            <div className="space-y-3">
              {freeRewards.map((reward, idx) => (
                <div
                  key={idx}
                  className="flex items-center rounded-lg bg-black/20 p-3"
                >
                  <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-lg bg-white/10"></div>
                  <div className="flex-1">
                    <div className="text-sm text-white/70">
                      Level {reward.level}
                    </div>
                    <div className="font-bold">
                      {reward.type === "currency"
                        ? `${reward.amount} MINA`
                        : reward.name}
                    </div>
                  </div>
                  <div>
                    {reward.claimed ? (
                      <span className="rounded bg-green-500/20 px-2 py-1 text-xs text-green-500">
                        Claimed
                      </span>
                    ) : trackData.currentLevel >= reward.level ? (
                      <button className="rounded bg-primary px-2 py-1 text-xs text-white">
                        Claim
                      </button>
                    ) : (
                      <span className="rounded bg-gray-500/20 px-2 py-1 text-xs text-gray-400">
                        Locked
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-bold text-primary">
              Premium Rewards
            </h3>
            <div className="space-y-3">
              {premiumRewards.map((reward, idx) => (
                <div
                  key={idx}
                  className="flex items-center rounded-lg bg-black/20 p-3"
                >
                  <div
                    className={`h-12 w-12 rounded-lg ${
                      reward.type.includes("exclusive") ||
                      reward.type.includes("limited")
                        ? "bg-primary/20"
                        : "bg-white/10"
                    } mr-4 flex items-center justify-center`}
                  ></div>
                  <div className="flex-1">
                    <div className="text-sm text-white/70">
                      Level {reward.level}
                    </div>
                    <div className="font-bold">
                      {reward.type === "currency"
                        ? `${reward.amount} MINA`
                        : reward.name}
                    </div>
                  </div>
                  <div>
                    <button className="rounded bg-primary/50 px-2 py-1 text-xs text-white opacity-50">
                      Premium Only
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Challenges */}
      <div className="rounded-xl bg-white/10 p-6 shadow-lg backdrop-blur-md">
        <h2 className="mb-6 text-2xl font-bold text-primary">
          Weekly Challenges
        </h2>
        <p className="mb-6">
          Complete challenges to earn XP and level up faster. New challenges are
          available every week.
        </p>

        <div className="space-y-4">
          {weeklyQuests.map((quest) => (
            <div
              key={quest.id}
              className={`rounded-lg bg-black/20 p-4 ${
                quest.completed ? "border border-green-500/50" : ""
              }`}
            >
              <div className="mb-2 flex items-center justify-between">
                <h3 className="font-bold">{quest.name}</h3>
                <div className="text-sm font-bold text-primary">
                  +{quest.xp} XP
                </div>
              </div>

              {quest.completed ? (
                <div className="flex items-center justify-between">
                  <span className="rounded bg-green-500/20 px-2 py-1 text-xs text-green-500">
                    Completed
                  </span>
                  <button className="rounded bg-primary px-3 py-1 text-xs text-white">
                    Claim
                  </button>
                </div>
              ) : (
                <div>
                  {quest.progress && quest.max && (
                    <div className="mb-2 h-2 w-full overflow-hidden rounded-full bg-black/30">
                      <div
                        className="h-full rounded-full bg-primary/70"
                        style={{
                          width: `${(quest.progress / quest.max) * 100}%`,
                        }}
                      ></div>
                    </div>
                  )}

                  <div className="text-right text-xs">
                    {quest.progress} / {quest.max}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button className="inline-flex items-center rounded-md bg-white/10 px-6 py-3 font-bold text-white transition-colors hover:bg-white/20">
            <svg
              className="mr-2 h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Refresh Challenges (2 Refreshes Remaining)
          </button>
        </div>
      </div>
    </div>
  );
}
