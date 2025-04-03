import { CheckIcon, ClockIcon } from "@radix-ui/react-icons";

export default function Roadmap() {
  return (
    <div className="mx-auto max-w-[1280px] p-4 pb-20 pt-16">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-3xl font-bold text-primary md:text-5xl">
          TileVille Roadmap
        </h1>
        <p className="mx-auto max-w-2xl text-lg">
          Our vision for the future of TileVille - exploring new frontiers in
          blockchain gaming and community building
        </p>
      </div>

      <div className="relative mb-20">
        <div className="absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 bg-primary/30 md:left-[80px] md:translate-x-0"></div>

        {ROADMAP_ITEMS.map((phase, index) => (
          <div key={phase.title} className="relative mb-16">
            <div className="flex flex-col md:flex-row">
              <div className="mb-4 flex items-center justify-center md:w-[160px] md:flex-shrink-0 md:justify-start">
                <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border-4 border-primary/30 bg-white text-primary">
                  {phase.completed ? (
                    <CheckIcon width={24} height={24} />
                  ) : (
                    <ClockIcon width={24} height={24} />
                  )}
                </div>
              </div>

              <div className="relative rounded-lg border border-primary/20 bg-white p-6 shadow-sm before:absolute before:left-1/2 before:top-0 before:h-4 before:w-4 before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-45 before:border-l before:border-t before:border-primary/20 before:bg-white md:before:left-0">
                <div className="mb-2 flex items-center justify-between">
                  <h2 className="text-xl font-bold text-primary md:text-2xl">
                    {phase.title}
                  </h2>
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-medium ${
                      phase.completed
                        ? "bg-green-100 text-green-800"
                        : phase.inProgress
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {phase.completed
                      ? "Completed"
                      : phase.inProgress
                      ? "In Progress"
                      : "Planned"}
                  </span>
                </div>

                <p className="mb-4 text-gray-600">{phase.timeframe}</p>

                <ul className="mb-2 space-y-2">
                  {phase.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <span className="mr-2 mt-1 flex-shrink-0 text-primary">
                        •
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {phase.description && (
                  <p className="mt-4 text-sm text-gray-600">
                    {phase.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-lg bg-primary/10 p-8 text-center">
        <h2 className="mb-4 text-2xl font-bold text-primary">
          Help Shape Our Roadmap
        </h2>
        <p className="mx-auto mb-6 max-w-2xl">
          The TileVille roadmap is constantly evolving based on community
          feedback and industry trends. Join our community to suggest features
          and help prioritize our development efforts.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="https://t.me/tilevilleBugs"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md bg-primary px-6 py-2 text-white hover:bg-primary/80"
          >
            Join Telegram
          </a>
          <a
            href="https://x.com/intent/user?screen_name=TilevilleSocial"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-primary bg-white px-6 py-2 text-primary hover:bg-primary/10"
          >
            Follow on X
          </a>
        </div>
      </div>
    </div>
  );
}

const ROADMAP_ITEMS = [
  {
    title: "Genesis Launch",
    timeframe: "Q1 2025",
    completed: true,
    inProgress: false,
    features: [
      "Core gameplay mechanics",
      "Basic city building features",
      "Mina blockchain integration",
      "TileVille Builder NFT collection",
      "Player profiles and leaderboards",
    ],
    description:
      "Our initial launch established the foundation of TileVille with essential gameplay features and blockchain integration.",
  },
  {
    title: "Community Growth",
    timeframe: "Q2 2025",
    completed: true,
    inProgress: false,
    features: [
      "PVP challenge system",
      "User following system",
      "Telegram integration for notifications",
      "Enhanced marketplace with multiple collections",
      "Community events and competitions",
    ],
    description:
      "We focused on building community features and social aspects to enhance player engagement and interaction.",
  },
  {
    title: "Gameplay Expansion",
    timeframe: "Q3 2025",
    completed: false,
    inProgress: true,
    features: [
      "Advanced city planning tools",
      "Specialized buildings with unique effects",
      "Environmental challenges and natural disasters",
      "Achievement system with on-chain verification",
      "Enhanced visual feedback and animations",
    ],
    description:
      "Currently expanding the core gameplay with new mechanics and features to provide deeper strategic options.",
  },
  {
    title: "Economic Evolution",
    timeframe: "Q4 2025",
    completed: false,
    inProgress: false,
    features: [
      "In-game economy with tradable resources",
      "Player-to-player marketplace",
      "Resource sharing and alliances",
      "NFT staking for passive benefits",
      "Community governance for game parameters",
    ],
    description:
      "Planned development of advanced economic features to create a sustainable in-game economy with player-driven markets.",
  },
  {
    title: "Multiplayer Experience",
    timeframe: "Q1 2026",
    completed: false,
    inProgress: false,
    features: [
      "Collaborative city building with multiple players",
      "Real-time interaction between players",
      "Regional competitions and territorial control",
      "Guild system with shared benefits",
      "Cross-city trade routes and dependencies",
    ],
    description:
      "Future expansion into deeper multiplayer experiences allowing players to collaborate and compete in new ways.",
  },
  {
    title: "Metaverse Integration",
    timeframe: "Q2-Q3 2026",
    completed: false,
    inProgress: false,
    features: [
      "3D visualization of player cities",
      "Virtual reality exploration mode",
      "Interoperability with other Mina Protocol projects",
      "Cross-chain asset compatibility",
      "Advanced privacy features using zero-knowledge proofs",
    ],
    description:
      "Long-term vision to evolve TileVille into a comprehensive metaverse experience while maintaining our privacy-first principles.",
  },
];
