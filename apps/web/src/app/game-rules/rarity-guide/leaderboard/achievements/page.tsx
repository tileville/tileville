const achievementCategories = [
  {
    name: "Gameplay",
    description: "Accomplishments related to your city building skills",
    achievements: [
      {
        name: "First Victory",
        description: "Win your first game",
        points: 10,
        tier: "bronze",
      },
      {
        name: "On Fire!",
        description: "Win 3 games in a row",
        points: 30,
        tier: "silver",
      },
      {
        name: "City Planner",
        description: "Achieve a perfect infrastructure rating",
        points: 25,
        tier: "silver",
      },
      {
        name: "High Roller",
        description: "Achieve a score over 1000 points",
        points: 50,
        tier: "gold",
      },
    ],
  },
  {
    name: "Collection",
    description: "Rewards for collecting TileVille NFTs",
    achievements: [
      {
        name: "Digital Collector",
        description: "Mint your first TileVille NFT",
        points: 15,
        tier: "bronze",
      },
      {
        name: "NFT Enthusiast",
        description: "Collect 5 unique NFTs",
        points: 40,
        tier: "silver",
      },
      {
        name: "NFT Connoisseur",
        description: "Collect 10 unique NFTs",
        points: 75,
        tier: "gold",
      },
    ],
  },
  {
    name: "Social",
    description: "Community engagement achievements",
    achievements: [
      {
        name: "Social Butterfly",
        description: "Connect all social media accounts",
        points: 20,
        tier: "bronze",
      },
      {
        name: "Community Member",
        description: "Follow 5 other players",
        points: 25,
        tier: "bronze",
      },
      {
        name: "TileVille Influencer",
        description: "Get followed by 10 players",
        points: 60,
        tier: "gold",
      },
    ],
  },
  {
    name: "Competition",
    description: "Achievements for participating in official competitions",
    achievements: [
      {
        name: "Competitor",
        description: "Participate in 3 different competitions",
        points: 15,
        tier: "bronze",
      },
      {
        name: "Challenge Creator",
        description: "Create 3 PVP challenges",
        points: 35,
        tier: "silver",
      },
      {
        name: "Top 10 Finisher",
        description: "Finish in the top 10 of any competition",
        points: 50,
        tier: "gold",
      },
      {
        name: "TileVille Champion",
        description: "Win a competition with at least 10 participants",
        points: 100,
        tier: "platinum",
      },
    ],
  },
];

const getTierColor = (tier: string) => {
  switch (tier) {
    case "bronze":
      return "bg-amber-600";
    case "silver":
      return "bg-gray-400";
    case "gold":
      return "bg-yellow-500";
    case "platinum":
      return "bg-purple-500";
    default:
      return "bg-gray-300";
  }
};

export default function Achievements() {
  return (
    <div className="mx-auto max-w-[1000px] p-4 pb-12 pt-20">
      <h1 className="mb-6 text-3xl font-bold text-primary">Achievements</h1>

      <p className="mb-8 text-lg">
        Complete various challenges to earn achievements and showcase your
        TileVille mastery. Each achievement earns you points that contribute to
        your overall player ranking.
      </p>

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
        <div className="rounded-lg bg-white p-4 text-center shadow-sm">
          <div className="mb-1 text-gray-600">Total Achievements</div>
          <div className="text-2xl font-bold">
            {achievementCategories.reduce(
              (total, category) => total + category.achievements.length,
              0
            )}
          </div>
        </div>
        <div className="rounded-lg bg-white p-4 text-center shadow-sm">
          <div className="mb-1 text-gray-600">Bronze Tier</div>
          <div className="text-2xl font-bold text-amber-600">
            {achievementCategories.reduce(
              (total, category) =>
                total +
                category.achievements.filter((a) => a.tier === "bronze").length,
              0
            )}
          </div>
        </div>
        <div className="rounded-lg bg-white p-4 text-center shadow-sm">
          <div className="mb-1 text-gray-600">Silver/Gold Tier</div>
          <div className="text-2xl font-bold text-yellow-500">
            {achievementCategories.reduce(
              (total, category) =>
                total +
                category.achievements.filter(
                  (a) => a.tier === "silver" || a.tier === "gold"
                ).length,
              0
            )}
          </div>
        </div>
        <div className="rounded-lg bg-white p-4 text-center shadow-sm">
          <div className="mb-1 text-gray-600">Platinum Tier</div>
          <div className="text-2xl font-bold text-purple-500">
            {achievementCategories.reduce(
              (total, category) =>
                total +
                category.achievements.filter((a) => a.tier === "platinum")
                  .length,
              0
            )}
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {achievementCategories.map((category, categoryIndex) => (
          <section key={categoryIndex}>
            <h2 className="mb-4 text-2xl font-bold">
              {category.name} Achievements
            </h2>
            <p className="mb-4 text-gray-600">{category.description}</p>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {category.achievements.map((achievement, achievementIndex) => (
                <div
                  key={achievementIndex}
                  className="flex items-start rounded-lg bg-white p-5 shadow-sm"
                >
                  <div
                    className={`${getTierColor(
                      achievement.tier
                    )} mr-4 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full font-bold text-white`}
                  >
                    {achievement.points}
                  </div>
                  <div>
                    <h3 className="mb-1 text-lg font-bold">
                      {achievement.name}
                    </h3>
                    <p className="mb-2 text-gray-600">
                      {achievement.description}
                    </p>
                    <div className="text-sm">
                      <span className="font-medium capitalize">
                        {achievement.tier}
                      </span>{" "}
                      Tier
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-12 rounded-lg border border-primary/20 bg-primary/10 p-6">
        <h2 className="mb-3 text-xl font-bold">Achievement Benefits</h2>
        <p className="mb-4">
          Earning achievements not only showcases your skills but also provides
          tangible benefits:
        </p>
        <ul className="space-y-2">
          <li className="flex items-start">
            <span className="mr-2 font-bold text-primary">•</span>
            <p>Higher player ranking on the global leaderboard</p>
          </li>
          <li className="flex items-start">
            <span className="mr-2 font-bold text-primary">•</span>
            <p>Special profile badges to display your accomplishments</p>
          </li>
          <li className="flex items-start">
            <span className="mr-2 font-bold text-primary">•</span>
            <p>Early access to new features and competitions</p>
          </li>
          <li className="flex items-start">
            <span className="mr-2 font-bold text-primary">•</span>
            <p>Exclusive rewards for top achievement earners</p>
          </li>
        </ul>
      </div>
    </div>
  );
}
