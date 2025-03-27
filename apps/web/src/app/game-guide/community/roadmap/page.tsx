import React from "react";
import Link from "next/link";

const ROADMAP_QUARTERS = [
  {
    id: "q1-2024",
    title: "Q1 2024",
    status: "completed",
    milestones: [
      { text: "Launch TileVille beta on MINA blockchain", completed: true },
      { text: "Release first builder NFT collection", completed: true },
      { text: "Implement basic PVP challenge system", completed: true },
      {
        text: "Add social features including player profiles",
        completed: true,
      },
    ],
  },
  {
    id: "q2-2024",
    title: "Q2 2024",
    status: "current",
    milestones: [
      {
        text: "Launch expanded marketplace with multiple NFT collections",
        completed: true,
      },
      { text: "Telegram integration and notifications", completed: true },
      { text: "Enhanced PVP challenges with time limits", completed: true },
      { text: "Tournament system with prize pools", completed: false },
    ],
  },
  {
    id: "q3-2024",
    title: "Q3 2024",
    status: "upcoming",
    milestones: [
      { text: "Mobile-optimized gameplay experience", completed: false },
      { text: "NFT staking and passive rewards", completed: false },
      {
        text: "Guild/team system for collaborative competitions",
        completed: false,
      },
      {
        text: "Enhanced city visualization with 3D elements",
        completed: false,
      },
    ],
  },
  {
    id: "q4-2024",
    title: "Q4 2024",
    status: "upcoming",
    milestones: [
      { text: "Governance token launch", completed: false },
      { text: "Community-driven competition creation", completed: false },
      {
        text: "Advanced achievement system with on-chain badges",
        completed: false,
      },
      {
        text: "Partnership integrations with other MINA ecosystem projects",
        completed: false,
      },
    ],
  },
  {
    id: "q1-2025",
    title: "Q1 2025",
    status: "planning",
    milestones: [
      { text: "TileVille DAO establishment", completed: false },
      { text: "Procedurally generated city challenges", completed: false },
      { text: "Cross-chain NFT compatibility", completed: false },
      { text: "Virtual reality city exploration mode", completed: false },
    ],
  },
  {
    id: "beyond",
    title: "Beyond",
    status: "vision",
    milestones: [
      { text: "Real-world urban planning partnerships", completed: false },
      { text: "AI-driven city optimization assistant", completed: false },
      {
        text: "Multi-city regions with interconnected economies",
        completed: false,
      },
      {
        text: "Educational platform for sustainability concepts",
        completed: false,
      },
    ],
  },
];

export default function Roadmap() {
  return (
    <div className="mx-auto max-w-[1200px] p-4 pb-20 pt-20">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold text-primary md:text-5xl">
          TileVille Development Roadmap
        </h1>
        <p className="mt-4 text-lg">
          Our journey to build the ultimate blockchain city-building experience
        </p>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-0 top-0 hidden h-full w-0.5 bg-primary/50 md:block"></div>

        {/* Timeline sections */}
        <div className="relative space-y-16 md:ml-8">
          {ROADMAP_QUARTERS.map((quarter, index) => (
            <div key={quarter.id} className="relative">
              {/* Timeline dot */}
              <div
                className="absolute -left-10 top-0 hidden h-6 w-6 rounded-full md:block"
                style={{
                  backgroundColor:
                    quarter.status === "completed"
                      ? "#3EB489"
                      : quarter.status === "current"
                      ? "#3E8EB4"
                      : quarter.status === "upcoming"
                      ? "#B43E8E"
                      : "#8E8E8E",
                }}
              ></div>

              <div
                className={`rounded-xl border p-6 ${
                  quarter.status === "completed"
                    ? "border-[#3EB489]/50 bg-[#3EB489]/10"
                    : quarter.status === "current"
                    ? "border-[#3E8EB4]/50 bg-[#3E8EB4]/10"
                    : quarter.status === "upcoming"
                    ? "border-[#B43E8E]/50 bg-[#B43E8E]/10"
                    : "border-gray-500/50 bg-gray-500/10"
                }`}
              >
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-2xl font-bold">{quarter.title}</h2>
                  <span
                    className={`rounded-md px-3 py-1 text-sm font-medium uppercase ${
                      quarter.status === "completed"
                        ? "bg-[#3EB489]/20 text-[#3EB489]"
                        : quarter.status === "current"
                        ? "bg-[#3E8EB4]/20 text-[#3E8EB4]"
                        : quarter.status === "upcoming"
                        ? "bg-[#B43E8E]/20 text-[#B43E8E]"
                        : "bg-gray-500/20 text-gray-500"
                    }`}
                  >
                    {quarter.status}
                  </span>
                </div>

                <ul className="space-y-3">
                  {quarter.milestones.map((milestone, mIndex) => (
                    <li key={mIndex} className="flex items-start">
                      <span
                        className={`mr-2 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs ${
                          milestone.completed
                            ? "bg-[#3EB489] text-white"
                            : "border border-gray-400 bg-transparent"
                        }`}
                      >
                        {milestone.completed ? "✓" : ""}
                      </span>
                      <span
                        className={
                          milestone.completed
                            ? "text-base"
                            : "text-base text-gray-600"
                        }
                      >
                        {milestone.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 rounded-xl border border-primary bg-primary/10 p-8 text-center">
        <h2 className="mb-4 text-2xl font-bold text-primary">
          Help Shape Our Future
        </h2>
        <p className="mb-6 text-lg">
          The TileVille roadmap is influenced by our community. Share your ideas
          and feedback to help us build the features you want to see!
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="https://t.me/tilevilleBugs"
            className="inline-block rounded-md bg-primary px-6 py-3 font-bold text-white hover:bg-primary/90"
          >
            Join Our Telegram
          </Link>
          <Link
            href="https://forms.gle/PyPU67YmDvQvZ7HF9"
            className="inline-block rounded-md border border-primary bg-transparent px-6 py-3 font-bold text-primary hover:bg-primary/10"
          >
            Submit Feedback
          </Link>
        </div>
      </div>
    </div>
  );
}
