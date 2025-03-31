import { Metadata } from "next";
import Link from "next/link";

const quarters = [
  {
    id: "q2-2025",
    title: "Q2 2025",
    subtitle: "Foundation & Growth",
    status: "in-progress",
    items: [
      {
        title: "Enhanced PvP Challenges",
        description: "Improved matchmaking and expanded challenge options",
        status: "in-progress",
      },
      {
        title: "New Builder NFT Collection",
        description: "Release of the summer collection with new abilities",
        status: "planned",
      },
      {
        title: "Seasonal Tournaments",
        description:
          "Introduction of seasonal competitive tournaments with unique rewards",
        status: "planned",
      },
      {
        title: "Mobile Optimization",
        description: "Improved experience for mobile users",
        status: "planned",
      },
    ],
  },
  {
    id: "q3-2025",
    title: "Q3 2025",
    subtitle: "Expansion & Community",
    status: "planned",
    items: [
      {
        title: "City Evolution System",
        description:
          "New mechanic allowing cities to evolve over time with persistent state",
        status: "planned",
      },
      {
        title: "Community Challenge Creator",
        description: "Tools for players to create and share custom challenges",
        status: "planned",
      },
      {
        title: "Enhanced Social Features",
        description:
          "Improved social interaction between players with messaging and groups",
        status: "planned",
      },
      {
        title: "Achievements System",
        description: "Comprehensive achievements with on-chain recognition",
        status: "planned",
      },
    ],
  },
  {
    id: "q4-2025",
    title: "Q4 2025",
    subtitle: "Innovation & Advancement",
    status: "planned",
    items: [
      {
        title: "TileVille DAO",
        description:
          "Decentralized governance system for community decision-making",
        status: "planned",
      },
      {
        title: "Advanced Tile System",
        description:
          "Interactive and dynamic tiles with advanced simulation mechanics",
        status: "planned",
      },
      {
        title: "Cross-Chain Integration",
        description: "Support for additional blockchain networks",
        status: "planned",
      },
      {
        title: "3D Visualization Mode",
        description: "Optional 3D view mode for city visualization",
        status: "planned",
      },
    ],
  },
  {
    id: "q1-2026",
    title: "Q1 2026",
    subtitle: "Next Generation",
    status: "planned",
    items: [
      {
        title: "TileVille 2.0 Launch",
        description: "Major platform upgrade with new engine and capabilities",
        status: "planned",
      },
      {
        title: "Metaverse Integration",
        description:
          "Connect TileVille cities to the broader metaverse ecosystem",
        status: "planned",
      },
      {
        title: "AI Assistant Builder",
        description:
          "AI-powered assistant to help with city planning and optimization",
        status: "planned",
      },
      {
        title: "Global Championship",
        description: "First annual global championship with major prizes",
        status: "planned",
      },
    ],
  },
];

const completedMilestones = [
  {
    date: "January 2025",
    title: "TileVille Beta Launch",
    description: "Initial release of TileVille with core gameplay features",
  },
  {
    date: "February 2025",
    title: "Builder NFT Collection",
    description: "First collection of Builder NFTs with unique abilities",
  },
  {
    date: "March 2025",
    title: "PvP Challenge System",
    description: "Introduction of player vs player challenges",
  },
  {
    date: "April 2025",
    title: "Marketplace Integration",
    description: "Full-featured NFT marketplace with multiple collections",
  },
];

export const metadata: Metadata = {
  title: "TileVille Development Roadmap",
  description: "Explore the future plans and upcoming features for TileVille",
};

export default function RoadmapPage() {
  return (
    <div className="mx-auto max-w-4xl p-6">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold text-primary">
          TileVille Development Roadmap
        </h1>
        <p className="text-gray-600">
          Our vision for the future of TileVille and upcoming features
        </p>
      </div>

      <div className="mb-12 rounded-lg bg-primary/10 p-6">
        <h2 className="mb-4 text-xl font-semibold">Our Vision</h2>
        <p className="mb-4">
          TileVille aims to be the leading strategy city-builder game on the
          Mina Protocol, combining engaging gameplay with blockchain innovation.
          Our roadmap reflects our commitment to:
        </p>
        <ul className="ml-6 list-disc space-y-2">
          <li>Continuously improving the core gameplay experience</li>
          <li>Expanding community features and player interaction</li>
          <li>Building innovative NFT functionality and utility</li>
          <li>Creating a sustainable and player-driven ecosystem</li>
        </ul>
      </div>

      <div className="mb-12">
        <h2 className="mb-6 text-2xl font-bold">Completed Milestones</h2>
        <div className="relative">
          <div className="absolute bottom-0 left-8 top-0 w-px bg-gray-200"></div>
          <div className="space-y-8">
            {completedMilestones.map((milestone, index) => (
              <div key={index} className="relative pl-16">
                <div className="absolute left-[29px] top-0 h-4 w-4 rounded-full border-4 border-primary bg-white"></div>
                <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                  <span className="mb-2 inline-block rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                    {milestone.date}
                  </span>
                  <h3 className="text-lg font-semibold">{milestone.title}</h3>
                  <p className="text-gray-600">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="mb-6 text-2xl font-bold">Upcoming Development</h2>
        <div className="grid grid-cols-1 gap-8">
          {quarters.map((quarter) => (
            <div
              key={quarter.id}
              className={`rounded-lg border p-6 shadow-sm ${
                quarter.status === "in-progress"
                  ? "border-primary bg-primary/5"
                  : "border-gray-200 bg-white"
              }`}
            >
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold">{quarter.title}</h3>
                  <p className="text-gray-600">{quarter.subtitle}</p>
                </div>
                <span
                  className={`rounded-md border px-3 py-1 text-xs font-medium ${getStatusColor(
                    quarter.status
                  )}`}
                >
                  {quarter.status === "in-progress" ? "In Progress" : "Planned"}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                {quarter.items.map((item, index) => (
                  <div
                    key={index}
                    className="rounded-md border border-gray-100 bg-white p-4 shadow-sm"
                  >
                    <div className="mb-2 flex items-start justify-between gap-2">
                      <h4 className="font-medium">{item.title}</h4>
                      <span
                        className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${getStatusColor(
                          item.status
                        )}`}
                      >
                        {item.status === "in-progress"
                          ? "In Progress"
                          : item.status.charAt(0).toUpperCase() +
                            item.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-12">
        <h2 className="mb-6 text-2xl font-bold">Beyond the Roadmap</h2>
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <p className="mb-4">
            While our roadmap outlines our current development plans, were
            constantly exploring new ideas and opportunities. Some future
            concepts were considering include:
          </p>
          <ul className="ml-6 list-disc space-y-2">
            <li>Collaborative city building with multiple players</li>
            <li>Advanced economic simulation systems</li>
            <li>Natural disasters and city resilience challenges</li>
            <li>Historical era progression mechanics</li>
            <li>City specialization paths with unique advantages</li>
          </ul>
        </div>
      </div>

      <div className="rounded-lg bg-primary/10 p-6 text-center">
        <h2 className="mb-4 text-xl font-semibold">
          Have Feature Suggestions?
        </h2>
        <p className="mb-4">
          We value community input in shaping the future of TileVille. Share
          your ideas and feedback!
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/community"
            className="rounded-md bg-primary px-6 py-2 font-semibold text-white hover:bg-primary/90"
          >
            Join Our Community
          </Link>
          <Link
            href="/feedback"
            className="rounded-md border border-primary px-6 py-2 font-semibold text-primary hover:bg-primary/10"
          >
            Submit Feedback
          </Link>
        </div>
      </div>
    </div>
  );
}

function getStatusColor(status: string) {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800 border-green-200";
    case "in-progress":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "planned":
      return "bg-gray-100 text-gray-800 border-gray-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
}
