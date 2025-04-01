import Link from "next/link";

export default function Tutorials() {
  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="mb-6 text-3xl font-bold text-primary">
        TileVille Tutorials
      </h1>

      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Getting Started</h2>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          <TutorialCard
            title="Setting Up Your Account"
            level="Beginner"
            path="/tutorials/account-setup"
            time="5 min"
          />
          <TutorialCard
            title="Connecting Your Wallet"
            level="Beginner"
            path="/tutorials/wallet-connection"
            time="3 min"
          />
          <TutorialCard
            title="First City Basics"
            level="Beginner"
            path="/tutorials/first-city"
            time="10 min"
          />
        </div>
      </div>

      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Game Mechanics</h2>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          <TutorialCard
            title="Tile Types Explained"
            level="Beginner"
            path="/tutorials/tile-types"
            time="7 min"
          />
          <TutorialCard
            title="City Planning Basics"
            level="Intermediate"
            path="/tutorials/city-planning"
            time="12 min"
          />
          <TutorialCard
            title="Resource Management"
            level="Intermediate"
            path="/tutorials/resources"
            time="8 min"
          />
          <TutorialCard
            title="Efficiency Bonuses"
            level="Advanced"
            path="/tutorials/efficiency"
            time="6 min"
          />
          <TutorialCard
            title="Specialized Districts"
            level="Advanced"
            path="/tutorials/districts"
            time="9 min"
          />
          <TutorialCard
            title="Natural Disasters"
            level="Advanced"
            path="/tutorials/disasters"
            time="5 min"
          />
        </div>
      </div>

      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">
          Competitions & Challenges
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          <TutorialCard
            title="Joining Competitions"
            level="Beginner"
            path="/tutorials/join-competition"
            time="4 min"
          />
          <TutorialCard
            title="Speed Challenge Tips"
            level="Intermediate"
            path="/tutorials/speed-challenges"
            time="6 min"
          />
          <TutorialCard
            title="Creating PvP Challenges"
            level="Intermediate"
            path="/tutorials/create-pvp"
            time="8 min"
          />
        </div>
      </div>

      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">NFTs & Marketplace</h2>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          <TutorialCard
            title="Builder NFT Benefits"
            level="Beginner"
            path="/tutorials/builder-nfts"
            time="5 min"
          />
          <TutorialCard
            title="Minting Your First NFT"
            level="Beginner"
            path="/tutorials/minting"
            time="7 min"
          />
          <TutorialCard
            title="Trading on Marketplace"
            level="Intermediate"
            path="/tutorials/marketplace"
            time="6 min"
          />
        </div>
      </div>

      <div className="rounded-lg bg-primary/10 p-6">
        <h2 className="mb-2 text-xl font-semibold">Video Tutorials</h2>
        <p className="mb-4">
          Check out our complete video tutorial series on YouTube for visual
          step-by-step guides.
        </p>
        <a
          href="https://youtube.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded bg-primary px-4 py-2 text-white hover:bg-primary/80"
        >
          View YouTube Channel
        </a>
      </div>
    </div>
  );
}

function TutorialCard({
  title,
  level,
  path,
  time,
}: {
  title: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  path: string;
  time: string;
}) {
  const getLevelColor = () => {
    switch (level) {
      case "Beginner":
        return "bg-green-100 text-green-800";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "Advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Link href={path} className="block">
      <div className="h-full rounded-lg border border-primary/30 p-4 transition-all hover:border-primary hover:shadow-md">
        <h3 className="mb-2 text-lg font-medium">{title}</h3>
        <div className="mb-3 flex items-center justify-between">
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${getLevelColor()}`}
          >
            {level}
          </span>
          <span className="text-xs text-gray-500">{time}</span>
        </div>
        <div className="mt-auto text-right">
          <span className="text-primary hover:underline">Read tutorial →</span>
        </div>
      </div>
    </Link>
  );
}
