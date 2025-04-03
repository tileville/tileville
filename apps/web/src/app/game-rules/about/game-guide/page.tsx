import Link from "next/link";
import {
  ChevronRightIcon,
  QuestionMarkCircledIcon,
} from "@radix-ui/react-icons";

export default function GameGuide() {
  return (
    <div className="mx-auto max-w-[1280px] p-4 pb-20 pt-16">
      <div className="mb-8">
        <h1 className="mb-4 text-3xl font-bold text-primary md:text-4xl">
          TileVille Game Guide
        </h1>
        <p className="text-lg">
          Learn everything you need to know about playing TileVille, the
          strategic city-builder game on Mina Protocol.
        </p>
      </div>

      <div className="mb-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {GUIDE_SECTIONS.map((section) => (
          <div
            key={section.id}
            className="rounded-lg border border-primary/30 bg-primary/5 p-6 shadow-sm"
          >
            <h2 className="mb-3 text-xl font-bold text-primary">
              {section.title}
            </h2>
            <p className="mb-4 text-gray-700">{section.description}</p>
            <a
              href={`#${section.id}`}
              className="flex items-center text-primary hover:underline"
            >
              Read more <ChevronRightIcon className="ml-1" />
            </a>
          </div>
        ))}
      </div>

      {GUIDE_SECTIONS.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className="mb-16 scroll-mt-20"
        >
          <h2 className="mb-6 text-2xl font-bold text-primary md:text-3xl">
            {section.title}
          </h2>
          <div className="prose prose-lg max-w-none">{section.content}</div>
        </section>
      ))}

      <div className="mt-12 rounded-lg bg-primary/10 p-6">
        <div className="flex items-start gap-4">
          <div className="mt-1 rounded-full bg-primary p-2 text-white">
            <QuestionMarkCircledIcon width={24} height={24} />
          </div>
          <div>
            <h3 className="mb-2 text-xl font-bold">Still have questions?</h3>
            <p className="mb-4">
              Join our community on Telegram or check out our FAQ section for
              more information.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/faq"
                className="rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/80"
              >
                Read FAQ
              </Link>
              <Link
                href="https://t.me/tilevilleBugs"
                target="_blank"
                className="rounded-md border border-primary bg-white px-4 py-2 text-primary hover:bg-primary/10"
              >
                Join Telegram
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const GUIDE_SECTIONS = [
  {
    id: "getting-started",
    title: "Getting Started",
    description:
      "Learn the basics of TileVille and how to set up your account.",
    content: (
      <div>
        <h3 className="mb-3 text-xl font-semibold">Create Your Account</h3>
        <p>
          To start playing TileVille, you need a Mina wallet. We recommend using
          Auro Wallet, which you can download from your browsers extension
          store.
        </p>

        <h3 className="mb-3 mt-6 text-xl font-semibold">Connect Your Wallet</h3>
        <p>
          Once you have your wallet set up, click on the Connect Wallet button
          in the top right corner of the screen. Authorize the connection when
          prompted.
        </p>

        <h3 className="mb-3 mt-6 text-xl font-semibold">Create Your Profile</h3>
        <p>
          After connecting your wallet, set up your profile by choosing a
          username and optional avatar. Your username will be your identity in
          TileVille.
        </p>

        <h3 className="mb-3 mt-6 text-xl font-semibold">
          Join Your First Competition
        </h3>
        <p>
          Navigate to the Competitions page and select an active competition.
          Some competitions require an entry fee in MINA tokens, while others
          are free to play.
        </p>
      </div>
    ),
  },
  {
    id: "gameplay",
    title: "Gameplay Basics",
    description: "Understand the core mechanics of building your city.",
    content: (
      <div>
        <h3 className="mb-3 text-xl font-semibold">City Building</h3>
        <p>
          TileVille is a strategic city building game where you develop your
          city by placing different types of tiles. Each tile has different
          properties and benefits.
        </p>

        <h3 className="mb-3 mt-6 text-xl font-semibold">Resource Management</h3>
        <p>
          Manage resources carefully to grow your city efficiently. Balance
          residential, commercial, and industrial zones to create a thriving
          urban environment.
        </p>

        <h3 className="mb-3 mt-6 text-xl font-semibold">Scoring System</h3>
        <p>
          Your score is determined by various factors including population,
          resource efficiency, and city layout. Strategic planning is key to
          achieving high scores.
        </p>

        <h3 className="mb-3 mt-6 text-xl font-semibold">Time Management</h3>
        <p>
          In speed challenges, you have a limited time to build your city. Plan
          your moves carefully to maximize your score within the time limit.
        </p>
      </div>
    ),
  },
  {
    id: "pvp",
    title: "PVP Challenges",
    description: "Compete directly against other players for MINA rewards.",
    content: (
      <div>
        <h3 className="mb-3 text-xl font-semibold">Challenge Types</h3>
        <p>TileVille offers two types of Player vs Player challenges:</p>
        <ul className="list-disc pl-6">
          <li className="mb-2">
            <span className="font-semibold">Standard Challenges:</span> You have
            until the end time to build your city and submit your score.
          </li>
          <li>
            <span className="font-semibold">Speed Challenges:</span> You have a
            limited time window to complete your city once you start playing.
          </li>
        </ul>

        <h3 className="mb-3 mt-6 text-xl font-semibold">
          Creating a Challenge
        </h3>
        <p>
          To create a PVP challenge, navigate to the PVP section and click
          Create Challenge. Set parameters like entry fee, end time, and maximum
          participants.
        </p>

        <h3 className="mb-3 mt-6 text-xl font-semibold">Joining a Challenge</h3>
        <p>
          Browse available challenges or use an invite code to join a specific
          challenge. Youll need to pay the entry fee in MINA tokens to
          participate.
        </p>

        <h3 className="mb-3 mt-6 text-xl font-semibold">Rewards</h3>
        <p>
          The winner of a PVP challenge receives the pool of entry fees (minus a
          small platform fee). Rewards are automatically distributed when the
          challenge ends.
        </p>
      </div>
    ),
  },
  {
    id: "nfts",
    title: "NFT Collections",
    description: "Collect unique NFTs that provide gameplay bonuses.",
    content: (
      <div>
        <h3 className="mb-3 text-xl font-semibold">TileVille Builder NFTs</h3>
        <p>
          Builder NFTs represent unique characters with different attributes
          that can enhance your gameplay:
        </p>
        <ul className="list-disc pl-6">
          <li className="mb-2">
            <span className="font-semibold">Sustainability Rating:</span>{" "}
            Affects eco-friendly development efficiency
          </li>
          <li className="mb-2">
            <span className="font-semibold">Efficiency Level:</span> Determines
            overall productivity
          </li>
          <li className="mb-2">
            <span className="font-semibold">Environmental Affinity:</span>{" "}
            Provides bonuses for specific environmental elements
          </li>
          <li className="mb-2">
            <span className="font-semibold">Urban Planning Expertise:</span>{" "}
            Specialization in certain city development aspects
          </li>
          <li>
            <span className="font-semibold">Special Ability:</span> Unique
            talents that provide specific advantages
          </li>
        </ul>

        <h3 className="mb-3 mt-6 text-xl font-semibold">Minting NFTs</h3>
        <p>
          Visit the Marketplace to browse and mint available NFTs. Each NFT
          costs MINA tokens to mint and becomes part of your collection.
        </p>

        <h3 className="mb-3 mt-6 text-xl font-semibold">
          Using NFTs in Gameplay
        </h3>
        <p>
          Select a Builder NFT before starting a game to apply its bonuses to
          your gameplay session. Different builders are better suited for
          different strategies.
        </p>
      </div>
    ),
  },
  {
    id: "social",
    title: "Social Features",
    description: "Connect with other players and grow your network.",
    content: (
      <div>
        <h3 className="mb-3 text-xl font-semibold">Player Profiles</h3>
        <p>
          Each player has a public profile showing their achievements, past
          competitions, and NFT collection. Customize your profile to showcase
          your accomplishments.
        </p>

        <h3 className="mb-3 mt-6 text-xl font-semibold">Following System</h3>
        <p>
          Follow other players to keep track of their achievements and challenge
          them to PVP matches. Build your network to discover new challenges and
          strategies.
        </p>

        <h3 className="mb-3 mt-6 text-xl font-semibold">
          Telegram Integration
        </h3>
        <p>
          Connect your Telegram account to receive notifications about challenge
          invites, game results, and reward distributions. Verify your account
          through the Mayor Bot.
        </p>

        <h3 className="mb-3 mt-6 text-xl font-semibold">Leaderboards</h3>
        <p>
          Check the leaderboards to see how you rank against other players in
          various competitions. Aim for the top spots to earn recognition and
          rewards.
        </p>
      </div>
    ),
  },
  {
    id: "tips-strategies",
    title: "Tips & Strategies",
    description: "Advanced techniques to improve your gameplay.",
    content: (
      <div>
        <h3 className="mb-3 text-xl font-semibold">City Layout Optimization</h3>
        <p>
          Plan your city layout carefully to maximize efficiency. Group similar
          zones together and ensure good connectivity between different areas.
        </p>

        <h3 className="mb-3 mt-6 text-xl font-semibold">Resource Balancing</h3>
        <p>
          Maintain a balance between different resources to prevent bottlenecks.
          Monitor resource production and consumption rates to optimize your
          citys growth.
        </p>

        <h3 className="mb-3 mt-6 text-xl font-semibold">NFT Selection</h3>
        <p>
          Choose Builder NFTs that complement your playstyle and strategy.
          Consider the specific requirements of each competition when selecting
          your Builder.
        </p>

        <h3 className="mb-3 mt-6 text-xl font-semibold">Time Management</h3>
        <p>
          In speed challenges, prioritize high-value buildings and critical
          infrastructure. Have a clear plan before starting to maximize your
          score within the time limit.
        </p>

        <h3 className="mb-3 mt-6 text-xl font-semibold">Community Resources</h3>
        <p>
          Join the TileVille Telegram group to learn from experienced players,
          share strategies, and stay updated on the latest game developments.
        </p>
      </div>
    ),
  },
];
