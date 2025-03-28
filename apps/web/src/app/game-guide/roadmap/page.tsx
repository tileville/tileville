import React from "react";
import Link from "next/link";

// Roadmap Item Component
const RoadmapItem = ({
  phase,
  title,
  description,
  status,
  items,
  image,
}: {
  phase: string;
  title: string;
  description: string;
  status: "completed" | "current" | "upcoming";
  items: string[];
  image?: string;
}) => {
  const statusClasses = {
    completed: "bg-green-500",
    current: "bg-primary",
    upcoming: "bg-gray-500",
  };

  const statusLabels = {
    completed: "Completed",
    current: "In Progress",
    upcoming: "Upcoming",
  };

  return (
    <div className="relative flex items-stretch">
      {/* Timeline */}
      <div className="mr-8 hidden flex-col items-center md:flex">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-full ${statusClasses[status]} font-bold text-white`}
        >
          {phase}
        </div>
        <div className="w-1 flex-grow bg-gray-700"></div>
      </div>

      {/* Content */}
      <div className="mb-10 flex-1 rounded-xl bg-white/5 p-6 backdrop-blur-sm">
        <div className="mb-4 flex items-center gap-3">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full md:hidden ${statusClasses[status]} text-sm font-bold text-white`}
          >
            {phase}
          </div>
          <div>
            <h3 className="text-xl font-bold">{title}</h3>
            <span
              className={`rounded-full px-3 py-1 text-xs ${statusClasses[status]} mt-1 inline-block text-white`}
            >
              {statusLabels[status]}
            </span>
          </div>
        </div>

        <p className="mb-4 text-gray-300">{description}</p>

        <ul className="mb-6 space-y-2">
          {items.map((item, index) => (
            <li key={index} className="flex items-start">
              <span className="mr-2 text-primary">✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default function Roadmap() {
  // Sample roadmap data
  const roadmapItems = [
    {
      phase: "1",
      title: "Platform Launch",
      status: "completed" as const,
      description:
        "Initial release of the TileVille platform with core functionality.",
      items: [
        "Basic NFT marketplace",
        "Wallet integration with Auro",
        "User profiles and collections",
        "First TileVille Builders NFT collection",
      ],
      image: "/img/roadmap/phase1.jpg",
    },
    {
      phase: "2",
      title: "Expansion & Partnerships",
      status: "current" as const,
      description:
        "Expanding the ecosystem through strategic partnerships and enhanced features.",
      items: [
        "Integration with additional NFT collections",
        "Advanced NFT filtering and search",
        "Creator profiles and verification",
        "Community features and social elements",
        "Enhanced mobile experience",
      ],
      image: "/img/roadmap/phase2.jpg",
    },
    {
      phase: "3",
      title: "Gameplay Integration",
      status: "upcoming" as const,
      description:
        "Deeper integration between NFTs and the TileVille game ecosystem.",
      items: [
        "NFT utility within TileVille gameplay",
        "In-game rewards for NFT holders",
        "Seasonal gameplay competitions",
        "NFT staking for passive rewards",
      ],
    },
    {
      phase: "4",
      title: "Decentralized Governance",
      status: "upcoming" as const,
      description: "Moving towards community governance and decentralization.",
      items: [
        "Governance token launch",
        "Community proposal system",
        "Decentralized curation of new collections",
        "Revenue sharing with community contributors",
      ],
    },
    {
      phase: "5",
      title: "Advanced Features & Expansion",
      status: "upcoming" as const,
      description:
        "Cutting-edge features leveraging the full capabilities of Mina blockchain.",
      items: [
        "Zero-knowledge credential verification",
        "Cross-chain NFT bridging",
        "AI-enhanced NFT generation tools",
        "VR/AR integration for NFT viewing",
        "Multiple metaverse integrations",
      ],
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-16 text-center">
        <h1 className="mb-4 text-4xl font-bold text-primary md:text-5xl">
          Project Roadmap
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-300">
          Our vision for the future of TileVille and the NFT marketplace. Join
          us on this exciting journey!
        </p>
      </div>

      {/* Current Status Banner */}
      <section className="mb-16 rounded-xl bg-gradient-to-r from-primary/30 to-green-900/30 p-8">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
          <div className="flex-1">
            <h2 className="mb-2 text-2xl font-bold">
              Current Development Status
            </h2>
            <p className="mb-4 text-gray-300">
              We are currently in Phase 2 of our roadmap, focused on expanding
              our marketplace through partnerships and enhanced features.
            </p>
            <div className="rounded-lg bg-black/30 p-4">
              <h3 className="mb-2 font-bold text-primary">
                Next Milestone: Creator Tools Update
              </h3>
              <p className="text-sm">Estimated Release: Q2 2025</p>
            </div>
          </div>
          <div className="w-full md:w-1/3">
            <div className="rounded-lg bg-black/30 p-4">
              <div className="mb-2 flex justify-between">
                <span>Phase 2 Progress</span>
                <span className="font-bold text-primary">65%</span>
              </div>
              <div className="h-4 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: "65%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="mb-16">
        <div className="relative">
          {roadmapItems.map((item, index) => (
            <RoadmapItem
              key={index}
              phase={item.phase}
              title={item.title}
              description={item.description}
              status={item.status}
              items={item.items}
              image={item.image}
            />
          ))}
        </div>
      </section>

      {/* Community Input */}
      <section className="mt-16 rounded-xl bg-white/5 py-12 text-center backdrop-blur-sm">
        <h2 className="mb-4 text-3xl font-bold">Help Shape Our Future</h2>
        <p className="mx-auto mb-8 max-w-2xl text-gray-300">
          We believe in building with our community. Have ideas for future
          features or improvements?
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/feedback"
            className="inline-block rounded-md bg-primary px-8 py-3 font-bold text-white hover:bg-primary/80"
          >
            Submit Feedback
          </Link>
          <Link
            href="/discord"
            className="inline-block rounded-md bg-white/10 px-8 py-3 font-bold text-white hover:bg-white/20"
          >
            Join Our Discord
          </Link>
        </div>
      </section>
    </div>
  );
}
