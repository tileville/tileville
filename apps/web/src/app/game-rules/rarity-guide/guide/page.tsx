import Link from "next/link";

export default function Guide() {
  const guideTopics = [
    {
      id: "getting-started",
      title: "Getting Started",
      description:
        "Learn the basics of TileVille and how to begin building your city",
    },
    {
      id: "gameplay",
      title: "Gameplay Mechanics",
      description: "Understand the core gameplay elements and scoring system",
    },
    {
      id: "nfts",
      title: "NFT Integration",
      description: "How NFTs enhance your gameplay and provide unique benefits",
    },
    {
      id: "pvp",
      title: "PVP Challenges",
      description: "Creating and participating in player vs player challenges",
    },
    {
      id: "competitions",
      title: "Competitions",
      description:
        "Join official TileVille competitions for rewards and recognition",
    },
  ];

  return (
    <div className="mx-auto max-w-[1280px] p-4 pt-20 md:p-8">
      <h1 className="mb-8 text-3xl font-bold text-primary md:text-5xl">
        TileVille Guide
      </h1>

      <div className="mb-8 rounded-lg border border-primary/20 bg-primary/10 p-6">
        <p className="text-lg">
          Welcome to TileVille, the on-chain city building arcade game on the
          Mina Protocol! This guide will help you understand the game mechanics
          and make the most of your TileVille experience.
        </p>
      </div>

      {/* Topic navigation */}
      <div className="mb-12 grid grid-cols-1 gap-4 md:grid-cols-3">
        {guideTopics.map((topic) => (
          <Link
            key={topic.id}
            href={`#${topic.id}`}
            className="rounded-lg border border-primary/20 bg-primary/5 p-4 transition-colors hover:bg-primary/10"
          >
            <h3 className="mb-2 text-lg font-bold">{topic.title}</h3>
            <p className="text-sm text-gray-600">{topic.description}</p>
          </Link>
        ))}
      </div>

      {/* Getting Started Section */}
      <section id="getting-started" className="mb-16">
        <h2 className="mb-4 text-2xl font-bold text-primary">
          Getting Started
        </h2>
        <div className="space-y-4">
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="mb-2 text-xl font-bold">1. Connect Your Wallet</h3>
            <p>
              To play TileVille, youll first need to connect your Mina Protocol
              wallet. We recommend using Auro Wallet for the best experience.
            </p>
            <ul className="mt-2 list-inside list-disc space-y-1">
              <li>Click the Connect Wallet button in the top right corner</li>
              <li>Select Auro Wallet from the options</li>
              <li>Approve the connection request in your wallet</li>
            </ul>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="mb-2 text-xl font-bold">2. Create Your Profile</h3>
            <p>
              Set up your TileVille profile to track your progress and
              participate in competitions.
            </p>
            <ul className="mt-2 list-inside list-disc space-y-1">
              <li>Navigate to the Profile section</li>
              <li>Choose a unique username</li>
              <li>Add optional information like social media accounts</li>
              <li>Upload an avatar to personalize your profile</li>
            </ul>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="mb-2 text-xl font-bold">3. Join Your First Game</h3>
            <p>
              Start playing TileVille by joining an active competition or
              practice game.
            </p>
            <ul className="mt-2 list-inside list-disc space-y-1">
              <li>Go to the Competitions page</li>
              <li>Browse available competitions or create a PVP challenge</li>
              <li>Pay the entry fee if required (using MINA tokens)</li>
              <li>Start building your city!</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Gameplay Section */}
      <section id="gameplay" className="mb-16">
        <h2 className="mb-4 text-2xl font-bold text-primary">
          Gameplay Mechanics
        </h2>
        <div className="space-y-4 rounded-lg bg-white p-6 shadow-sm">
          <p>
            TileVille is a city-building game where you strategically place
            different types of structures to create an efficient and prosperous
            city.
          </p>

          <h3 className="text-xl font-bold">Building Types</h3>
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-gray-200 p-4">
              <h4 className="font-bold">Residential</h4>
              <p>Houses your citizens and generates population</p>
            </div>
            <div className="rounded-lg border border-gray-200 p-4">
              <h4 className="font-bold">Commercial</h4>
              <p>Provides jobs and generates income</p>
            </div>
            <div className="rounded-lg border border-gray-200 p-4">
              <h4 className="font-bold">Industrial</h4>
              <p>Produces resources but creates pollution</p>
            </div>
            <div className="rounded-lg border border-gray-200 p-4">
              <h4 className="font-bold">Parks & Recreation</h4>
              <p>Increases happiness and property values</p>
            </div>
          </div>

          <h3 className="text-xl font-bold">Scoring System</h3>
          <p>Your city score is calculated based on:</p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>Population growth</li>
            <li>Economic prosperity</li>
            <li>Citizen happiness</li>
            <li>Environmental sustainability</li>
            <li>Infrastructure efficiency</li>
          </ul>
        </div>
      </section>

      {/* Continue with other sections (abbreviated for brevity) */}
      <section id="nfts" className="mb-16">
        <h2 className="mb-4 text-2xl font-bold text-primary">
          NFT Integration
        </h2>
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <p className="mb-4">
            TileVille Builder NFTs enhance your gameplay by providing unique
            bonuses and abilities for city construction.
          </p>
          <Link
            href="/traits-info"
            className="font-medium text-primary hover:underline"
          >
            Learn more about NFT traits and benefits →
          </Link>
        </div>
      </section>

      <div className="mt-16 text-center">
        <p className="text-xl">Have questions that werent answered here?</p>
        <Link
          href="/faq"
          className="mt-4 inline-block rounded-md bg-primary px-6 py-2 text-white transition-colors hover:bg-primary/80"
        >
          Check our FAQ
        </Link>
      </div>
    </div>
  );
}
