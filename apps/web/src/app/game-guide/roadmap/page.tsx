"use client";
import React from "react";
import {
  CheckIcon,
  Cross1Icon,
  QuestionMarkCircledIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";

interface RoadmapItem {
  title: string;
  description: string;
  quarter: string;
  status: "completed" | "in-progress" | "planned";
  features: string[];
}

const RoadmapPage = () => {
  const roadmapItems: RoadmapItem[] = [
    {
      title: "Platform Launch",
      description:
        "The initial launch of TileVille featuring core gameplay mechanics and basic competitive features.",
      quarter: "Q1 2024",
      status: "completed",
      features: [
        "Core tile placement game mechanics",
        "Wallet integration (Auro)",
        "Basic profile system",
        "Initial competition structure",
        "Simple leaderboards",
      ],
    },
    {
      title: "Social and Competitive Enhancement",
      description:
        "Expanding the social and competitive aspects of TileVille to create a more engaging ecosystem.",
      quarter: "Q2 2024",
      status: "completed",
      features: [
        "PVP challenge system",
        "NFT marketplace integration",
        "Telegram notifications",
        "User following system",
        "Enhanced leaderboards",
        "Competition history tracking",
      ],
    },
    {
      title: "Economic and Rewards Expansion",
      description:
        "Enhancing the economic system and rewards structure to provide more incentives for players.",
      quarter: "Q3 2024",
      status: "in-progress",
      features: [
        "NFT utility implementation",
        "Automated rewards distribution",
        "Referral program",
        "Dynamic competition prize pools",
        "Transaction history improvements",
        "Achievement system",
      ],
    },
    {
      title: "Gameplay Evolution",
      description:
        "Introducing new gameplay mechanics and features to keep the game fresh and engaging.",
      quarter: "Q4 2024",
      status: "planned",
      features: [
        "Multiple game modes",
        "Special tiles with unique abilities",
        "Seasonal competitions with unique rewards",
        "Team-based competitions",
        "Advanced scoring mechanics",
      ],
    },
    {
      title: "Community Governance",
      description:
        "Implementing community governance features to give players more control over the platform's future.",
      quarter: "Q1 2025",
      status: "planned",
      features: [
        "Community voting on feature priorities",
        "User-created competitions",
        "DAO structure for platform decisions",
        "Community rewards for contributors",
        "Custom user-created tiles",
      ],
    },
    {
      title: "Cross-Platform Expansion",
      description: "Expanding TileVille to reach new platforms and audiences.",
      quarter: "Q2 2025",
      status: "planned",
      features: [
        "Mobile app development",
        "Additional wallet support",
        "Cross-chain compatibility",
        "API for developers",
        "Partner integrations",
      ],
    },
  ];

  const StatusIcon = ({ status }: { status: string }) => {
    switch (status) {
      case "completed":
        return <CheckIcon className="h-5 w-5 text-green-500" />;
      case "in-progress":
        return (
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
        );
      case "planned":
        return <QuestionMarkCircledIcon className="h-5 w-5 text-gray-400" />;
      default:
        return <Cross1Icon className="h-5 w-5 text-red-500" />;
    }
  };

  const StatusLabel = ({ status }: { status: string }) => {
    switch (status) {
      case "completed":
        return <span className="text-green-500">Completed</span>;
      case "in-progress":
        return <span className="text-primary">In Progress</span>;
      case "planned":
        return <span className="text-gray-500">Planned</span>;
      default:
        return <span className="text-red-500">Unknown</span>;
    }
  };

  return (
    <div className="p-4 pb-20 pt-12 md:pb-24 md:pt-40">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-2 text-center text-3xl font-bold text-primary md:text-5xl">
          TileVille Roadmap
        </h1>
        <p className="mx-auto mb-12 max-w-2xl text-center text-lg">
          Our vision for the future of TileVille and the exciting features were
          working on.
        </p>

        <div className="relative mb-12 hidden md:block">
          <div className="absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 transform bg-primary/20"></div>
          <div className="grid grid-cols-3 gap-8">
            {roadmapItems.map((item, index) => (
              <div
                key={index}
                className={`${
                  index % 2 === 0 ? "col-start-1" : "col-span-2 col-start-2"
                }`}
              >
                <div
                  className={`relative rounded-lg border p-4 ${
                    item.status === "completed"
                      ? "border-green-200 bg-green-50"
                      : item.status === "in-progress"
                      ? "border-primary/30 bg-primary/10"
                      : "border-gray-200 bg-gray-50"
                  }`}
                >
                  <div
                    className={`absolute ${
                      index % 2 === 0 ? "left-full" : "right-full"
                    } top-5 flex h-6 w-6 items-center justify-center rounded-full bg-white`}
                  >
                    <StatusIcon status={item.status} />
                  </div>
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="mb-2 text-sm font-medium text-gray-500">
                    {item.quarter} • <StatusLabel status={item.status} />
                  </p>
                  <p className="mb-3 text-gray-700">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6 md:hidden">
          {roadmapItems.map((item, index) => (
            <div
              key={index}
              className={`rounded-lg border p-4 ${
                item.status === "completed"
                  ? "border-green-200 bg-green-50"
                  : item.status === "in-progress"
                  ? "border-primary/30 bg-primary/10"
                  : "border-gray-200 bg-gray-50"
              }`}
            >
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-lg font-bold">{item.title}</h3>
                <StatusIcon status={item.status} />
              </div>
              <p className="mb-2 text-xs font-medium text-gray-500">
                {item.quarter} • <StatusLabel status={item.status} />
              </p>
              <p className="mb-3 text-sm text-gray-700">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <h2 className="mb-8 text-center text-2xl font-bold text-primary md:text-3xl">
            Detailed Milestones
          </h2>

          <div className="space-y-12">
            {roadmapItems.map((item, index) => (
              <div key={index} className="relative">
                <div className="mb-6 flex items-center gap-3">
                  <StatusIcon status={item.status} />
                  <h3 className="text-xl font-bold md:text-2xl">
                    {item.title}
                  </h3>
                  <span className="ml-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                    {item.quarter}
                  </span>
                  <span className="ml-auto rounded-full bg-gray-100 px-3 py-1 text-sm">
                    <StatusLabel status={item.status} />
                  </span>
                </div>

                <p className="mb-4 text-gray-700">{item.description}</p>

                <div className="ml-5 grid gap-4 md:grid-cols-2">
                  {item.features.map((feature, fIndex) => (
                    <div
                      key={fIndex}
                      className={`flex items-start gap-3 rounded-lg border p-3 ${
                        item.status === "completed"
                          ? "border-green-200 bg-green-50"
                          : item.status === "in-progress"
                          ? "border-primary/30 bg-primary/10"
                          : "border-gray-200 bg-gray-50"
                      }`}
                    >
                      {item.status === "completed" ? (
                        <CheckIcon className="mt-0.5 h-4 w-4 text-green-500" />
                      ) : (
                        <div className="mt-0.5 h-4 w-4 rounded-full border border-gray-400"></div>
                      )}
                      <span className="text-sm md:text-base">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 rounded-xl bg-primary/10 p-6 text-center">
          <h2 className="mb-4 text-xl font-bold text-primary md:text-2xl">
            Help Shape Our Future
          </h2>
          <p className="mb-6">
            We value community input! Have ideas for new features or
            improvements? Join our community channels and share your thoughts.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="https://t.me/tilevillebugs"
              target="_blank"
              className="rounded-full bg-primary px-6 py-2 text-white hover:bg-primary/80"
            >
              Join Telegram
            </Link>
            <Link
              href="https://github.com/tileville/tileville"
              target="_blank"
              className="rounded-full border border-primary bg-transparent px-6 py-2 text-primary hover:bg-primary/10"
            >
              GitHub Repository
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadmapPage;
