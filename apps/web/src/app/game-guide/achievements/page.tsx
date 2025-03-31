import { Metadata } from "next";
import Link from "next/link";

const achievements = [
  {
    id: "first_win",
    title: "First Victory",
    description: "Win your first game",
    category: "gameplay",
    level: "bronze",
  },
  {
    id: "win_streak",
    title: "On Fire!",
    description: "Win 3 games in a row",
    category: "gameplay",
    level: "silver",
  },
  {
    id: "high_score",
    title: "High Roller",
    description: "Achieve a score over 1000 points",
    category: "gameplay",
    level: "gold",
  },
  {
    id: "first_nft",
    title: "Digital Collector",
    description: "Mint your first TileVille NFT",
    category: "collection",
    level: "bronze",
  },
  {
    id: "nft_collector",
    title: "NFT Enthusiast",
    description: "Collect 5 unique NFTs",
    category: "collection",
    level: "silver",
  },
  {
    id: "nft_connoisseur",
    title: "NFT Connoisseur",
    description: "Collect 10 unique NFTs",
    category: "collection",
    level: "gold",
  },
  {
    id: "social_butterfly",
    title: "Social Butterfly",
    description: "Connect all social media accounts",
    category: "social",
    level: "bronze",
  },
  {
    id: "community_member",
    title: "Community Member",
    description: "Follow 5 other players",
    category: "social",
    level: "bronze",
  },
  {
    id: "influencer",
    title: "TileVille Influencer",
    description: "Get followed by 10 players",
    category: "social",
    level: "gold",
  },
  {
    id: "competitor",
    title: "Competitor",
    description: "Participate in 3 different competitions",
    category: "competition",
    level: "bronze",
  },
  {
    id: "challenge_creator",
    title: "Challenge Creator",
    description: "Create 3 PVP challenges",
    category: "competition",
    level: "silver",
  },
  {
    id: "champion",
    title: "TileVille Champion",
    description: "Win a competition with at least 10 participants",
    category: "competition",
    level: "platinum",
  },
];

export const metadata: Metadata = {
  title: "TileVille Achievements",
  description: "Discover and unlock achievements in TileVille",
};

export default function AchievementsPage() {
  const categories = [...new Set(achievements.map((a) => a.category))];

  return (
    <div className="mx-auto max-w-4xl p-6">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold text-primary">
          TileVille Achievements
        </h1>
        <p className="text-gray-600">
          Unlock these achievements as you play and build your reputation in
          TileVille
        </p>
      </div>

      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <a
              key={category}
              href={`#${category}`}
              className={`rounded-full border px-4 py-1 text-sm font-medium ${getCategoryColor(
                category
              )}`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </a>
          ))}
        </div>
      </div>

      {categories.map((category) => (
        <div key={category} id={category} className="mb-12">
          <h2 className="mb-6 text-2xl font-bold capitalize">
            {category} Achievements
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {achievements
              .filter((a) => a.category === category)
              .map((achievement) => (
                <div
                  key={achievement.id}
                  className="relative rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition-transform hover:scale-[1.02]"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-lg font-semibold">
                      {achievement.title}
                    </h3>
                    <span
                      className={`h-3 w-3 rounded-full ${getLevelColor(
                        achievement.level
                      )}`}
                      title={`${achievement.level
                        .charAt(0)
                        .toUpperCase()}${achievement.level.slice(
                        1
                      )} level achievement`}
                    ></span>
                  </div>
                  <p className="mb-4 text-sm text-gray-600">
                    {achievement.description}
                  </p>
                  <div
                    className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-medium ${getCategoryColor(
                      achievement.category
                    )}`}
                  >
                    {achievement.level.toUpperCase()}
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}

      <div className="mt-8 rounded-lg bg-primary/10 p-6 text-center">
        <h2 className="mb-4 text-xl font-semibold">
          Ready to earn achievements?
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/competitions"
            className="rounded-md bg-primary px-6 py-2 font-semibold text-white hover:bg-primary/90"
          >
            Join Competition
          </Link>
          <Link
            href="/profile"
            className="rounded-md border border-primary px-6 py-2 font-semibold text-primary hover:bg-primary/10"
          >
            View Your Profile
          </Link>
        </div>
      </div>
    </div>
  );
}

function getLevelColor(level: string) {
  switch (level) {
    case "bronze":
      return "bg-amber-700";
    case "silver":
      return "bg-gray-400";
    case "gold":
      return "bg-yellow-500";
    case "platinum":
      return "bg-indigo-400";
    default:
      return "bg-green-500";
  }
}

function getCategoryColor(category: string) {
  switch (category) {
    case "gameplay":
      return "text-blue-600 border-blue-200 bg-blue-50";
    case "collection":
      return "text-purple-600 border-purple-200 bg-purple-50";
    case "social":
      return "text-green-600 border-green-200 bg-green-50";
    case "competition":
      return "text-red-600 border-red-200 bg-red-50";
    default:
      return "text-gray-600 border-gray-200 bg-gray-50";
  }
}
