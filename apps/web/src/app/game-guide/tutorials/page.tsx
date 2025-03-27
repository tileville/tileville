import React from "react";
import Link from "next/link";

export default function TutorialsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:py-20">
      <h1 className="mb-10 text-center text-3xl font-bold text-primary md:text-5xl">
        TileVille Game Tutorials
      </h1>

      <div className="mb-16 grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div className="rounded-xl bg-white/10 p-6 shadow-lg backdrop-blur-md">
          <h2 className="mb-4 text-2xl font-bold text-primary">
            Getting Started
          </h2>
          <div className="relative mb-4 aspect-video overflow-hidden rounded-lg"></div>
          <p className="mb-4">
            Welcome to TileVille! This guide will help you understand the basic
            mechanics of building your dream city. Learn how to place different
            types of buildings, manage resources, and grow your population
            efficiently.
          </p>
          <ul className="mb-4 list-inside list-disc space-y-2">
            <li>Understanding the game interface</li>
            <li>Placing your first buildings</li>
            <li>Managing population growth</li>
            <li>Resource collection strategies</li>
          </ul>
          <Link
            href="/tutorials/getting-started"
            className="inline-block rounded-md bg-primary px-6 py-2 text-white hover:bg-primary/80"
          >
            Read Full Guide
          </Link>
        </div>

        <div className="rounded-xl bg-white/10 p-6 shadow-lg backdrop-blur-md">
          <h2 className="mb-4 text-2xl font-bold text-primary">
            Advanced City Planning
          </h2>
          <div className="relative mb-4 aspect-video overflow-hidden rounded-lg"></div>
          <p className="mb-4">
            Take your city to the next level with advanced urban planning
            techniques. Learn optimal building placement, strategic road
            networks, and how to balance residential, commercial, and industrial
            zones for maximum efficiency.
          </p>
          <ul className="mb-4 list-inside list-disc space-y-2">
            <li>Optimal zoning strategies</li>
            <li>Traffic flow optimization</li>
            <li>Utility placement for maximum coverage</li>
            <li>Balancing aesthetics and functionality</li>
          </ul>
          <Link
            href="/tutorials/advanced-planning"
            className="inline-block rounded-md bg-primary px-6 py-2 text-white hover:bg-primary/80"
          >
            Read Full Guide
          </Link>
        </div>
      </div>

      <div className="mb-16 rounded-xl bg-white/10 p-6 shadow-lg backdrop-blur-md">
        <h2 className="mb-6 text-2xl font-bold text-primary">
          Video Tutorials
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"></div>
        <div className="mt-8 text-center">
          <Link
            href="/tutorials/videos"
            className="inline-block rounded-md bg-primary px-6 py-2 text-white hover:bg-primary/80"
          >
            View All Videos
          </Link>
        </div>
      </div>

      <div className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-3">
        {[
          {
            title: "Competition Strategies",
            description:
              "Learn how to excel in TileVille competitions and claim those top prizes.",
            icon: "🏆",
          },
          {
            title: "PVP Challenge Tactics",
            description:
              "Master the art of player vs player challenges and increase your win rate.",
            icon: "⚔️",
          },
          {
            title: "NFT Builder Optimization",
            description:
              "Get the most out of your NFT Builders and their special abilities.",
            icon: "🔮",
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className="rounded-xl bg-white/10 p-6 text-center shadow-lg backdrop-blur-md"
          >
            <div className="mb-4 text-4xl">{item.icon}</div>
            <h3 className="mb-2 text-xl font-bold text-primary">
              {item.title}
            </h3>
            <p className="mb-4">{item.description}</p>
            <Link
              href={`/tutorials/${item.title
                .toLowerCase()
                .replace(/\s+/g, "-")}`}
              className="inline-block rounded-md bg-primary/20 px-4 py-2 text-primary hover:bg-primary/30"
            >
              Learn More
            </Link>
          </div>
        ))}
      </div>

      <div className="rounded-xl bg-white/10 p-6 shadow-lg backdrop-blur-md">
        <h2 className="mb-6 text-2xl font-bold text-primary">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {[
            {
              question: "How do I earn rewards in competitions?",
              answer:
                "Compete in weekly competitions by building the best city possible within the time limit. The top players on the leaderboard receive MINA tokens as rewards based on their ranking.",
            },
            {
              question: "What are the benefits of NFT Builders?",
              answer:
                "NFT Builders provide unique bonuses to your city development, such as increased efficiency, sustainability ratings, and special abilities that can give you an edge in competitions.",
            },
            {
              question: "How do I create a PVP challenge?",
              answer:
                'Navigate to the PVP section, click on "Create Challenge," set your parameters including entry fee and end time, then share the invite code with friends or make it public for anyone to join.',
            },
            {
              question: "Can I play TileVille on mobile?",
              answer:
                "Yes! TileVille is optimized for both desktop and mobile play. You can access all features through your mobile browser with a connected Mina wallet.",
            },
            {
              question: "How do I connect my Telegram account?",
              answer:
                'Visit your profile settings and click on "Connect Telegram." Follow the instructions to verify your account through our Telegram bot to receive notifications and join the community.',
            },
          ].map((faq, idx) => (
            <div key={idx} className="rounded-lg bg-black/20 p-4">
              <h3 className="mb-2 font-bold">{faq.question}</h3>
              <p>{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
