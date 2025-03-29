export default function AchievementsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
          Achievements
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-lg text-gray-500">
          Unlock achievements as you progress through TileVille
        </p>
      </div>

      <div className="mt-12">
        {ACHIEVEMENT_CATEGORIES.map((category) => (
          <div key={category.name} className="mb-10">
            <h2 className="mb-6 text-2xl font-bold text-primary">
              {category.name}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {category.achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className="flex flex-col rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
                >
                  <div className="mb-4 flex justify-between">
                    <div
                      className={`rounded-md px-2 py-1 text-xs font-medium ${getBadgeStyle(
                        achievement.level
                      )}`}
                    >
                      {achievement.level.toUpperCase()}
                    </div>
                    <div className="text-sm font-medium text-gray-500">
                      {achievement.points} pts
                    </div>
                  </div>

                  <h3 className="mb-2 text-lg font-bold">
                    {achievement.title}
                  </h3>
                  <p className="mb-3 text-sm text-gray-600">
                    {achievement.description}
                  </p>

                  <div className="mt-auto">
                    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{
                          width: `${achievementProgress(achievement)}%`,
                        }}
                      ></div>
                    </div>
                    <div className="mt-2 flex justify-between text-xs text-gray-500">
                      <span>
                        Progress: {achievement.progress?.current || 0}/
                        {achievement.requirement}
                      </span>
                      <span>{achievementProgress(achievement)}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-lg bg-primary/10 p-6 text-center">
        <h2 className="text-lg font-bold text-primary">Achievement Points</h2>
        <p className="mt-2 text-gray-600">
          Earn achievement points to unlock exclusive rewards and recognition in
          the TileVille community.
        </p>
        <p className="mt-4 text-2xl font-bold text-primary">
          Total Available Points: {calculateTotalPoints()}
        </p>
      </div>
    </div>
  );
}

const getBadgeStyle = (level: any) => {
  switch (level) {
    case "bronze":
      return "bg-amber-100 text-amber-800";
    case "silver":
      return "bg-gray-100 text-gray-800";
    case "gold":
      return "bg-yellow-100 text-yellow-800";
    case "platinum":
      return "bg-indigo-100 text-indigo-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const achievementProgress = (achievement: any) => {
  if (achievement.unlockedAt) return 100;
  if (!achievement.progress) return 0;
  return Math.min(
    100,
    Math.round((achievement.progress.current / achievement.requirement) * 100)
  );
};

const calculateTotalPoints = () => {
  return ACHIEVEMENT_CATEGORIES.reduce(
    (total, category) =>
      total +
      category.achievements.reduce(
        (sum, achievement) => sum + achievement.points,
        0
      ),
    0
  );
};

const ACHIEVEMENT_CATEGORIES = [
  {
    name: "Gameplay",
    achievements: [
      {
        id: "first_win",
        title: "First Victory",
        description: "Win your first game",
        level: "bronze",
        requirement: 1,
        points: 10,
        progress: { current: 1, total: 1 },
        unlockedAt: "2025-03-15T12:34:56Z",
      },
      {
        id: "win_streak",
        title: "On Fire!",
        description: "Win 3 games in a row",
        level: "silver",
        requirement: 3,
        points: 30,
        progress: { current: 2, total: 3 },
      },
      {
        id: "high_score",
        title: "High Roller",
        description: "Achieve a score over 1000 points",
        level: "gold",
        requirement: 1000,
        points: 50,
        progress: { current: 850, total: 1000 },
      },
      {
        id: "speed_demon",
        title: "Speed Demon",
        description: "Complete a speed challenge in under 2 minutes",
        level: "gold",
        requirement: 1,
        points: 50,
      },
    ],
  },
  {
    name: "Collection",
    achievements: [
      {
        id: "first_nft",
        title: "Digital Collector",
        description: "Mint your first TileVille NFT",
        level: "bronze",
        requirement: 1,
        points: 15,
        progress: { current: 1, total: 1 },
        unlockedAt: "2025-03-20T14:22:10Z",
      },
      {
        id: "nft_collector",
        title: "NFT Enthusiast",
        description: "Collect 5 unique NFTs",
        level: "silver",
        requirement: 5,
        points: 40,
        progress: { current: 3, total: 5 },
      },
      {
        id: "nft_connoisseur",
        title: "NFT Connoisseur",
        description: "Collect 10 unique NFTs",
        level: "gold",
        requirement: 10,
        points: 75,
      },
    ],
  },
];
