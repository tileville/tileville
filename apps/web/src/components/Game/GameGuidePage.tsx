import React from "react";
import Link from "next/link";

export default function GameGuide() {
  return (
    <div className="mx-auto max-w-[1200px] p-4 pb-20 pt-20">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-primary md:text-5xl">
          TileVille Game Guide
        </h1>
        <p className="mt-4 text-lg">
          Master the art of city building with these tips and strategies
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {/* Basic Concepts */}
        <div className="rounded-lg border border-primary bg-white/10 p-6 backdrop-blur-sm">
          <h2 className="mb-4 text-2xl font-bold text-primary">
            Basic Concepts
          </h2>
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="mr-2 text-xl">•</span>
              <span>
                Build a sustainable city by balancing resources and expansion
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-xl">•</span>
              <span>
                Place tiles strategically to maximize efficiency and citizen
                happiness
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-xl">•</span>
              <span>
                Manage energy production and consumption through thoughtful
                infrastructure planning
              </span>
            </li>
          </ul>
        </div>

        {/* Game Mechanics */}
        <div className="rounded-lg border border-primary bg-white/10 p-6 backdrop-blur-sm">
          <h2 className="mb-4 text-2xl font-bold text-primary">
            Game Mechanics
          </h2>
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="mr-2 text-xl">•</span>
              <span>
                <strong>Tile Selection:</strong> Choose wisely based on your
                citys current needs
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-xl">•</span>
              <span>
                <strong>Resource Management:</strong> Balance energy,
                population, and environmental scores
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-xl">•</span>
              <span>
                <strong>Scoring System:</strong> Points awarded for sustainable
                growth and citizen happiness
              </span>
            </li>
          </ul>
        </div>

        {/* Tiles Explained */}
        <div className="rounded-lg border border-primary bg-white/10 p-6 backdrop-blur-sm">
          <h2 className="mb-4 text-2xl font-bold text-primary">
            Tiles Explained
          </h2>
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="mr-2 text-xl">•</span>
              <span>
                <strong>Residential:</strong> Increases population but requires
                more resources
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-xl">•</span>
              <span>
                <strong>Energy:</strong> Wind farms and solar panels for
                sustainable power
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-xl">•</span>
              <span>
                <strong>Green Spaces:</strong> Improve environmental scores and
                citizen happiness
              </span>
            </li>
          </ul>
        </div>

        <div className="rounded-lg border border-primary bg-white/10 p-6 backdrop-blur-sm">
          <h2 className="mb-4 text-2xl font-bold text-primary">
            Beginner Strategy
          </h2>
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="mr-2 text-xl">•</span>
              <span>
                Start with a balanced approach - dont overexpand too quickly
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-xl">•</span>
              <span>
                Focus on energy infrastructure before growing population
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-xl">•</span>
              <span>
                Include green spaces early to maintain environmental balance
              </span>
            </li>
          </ul>
        </div>

        {/* Advanced Tactics */}
        <div className="rounded-lg border border-primary bg-white/10 p-6 backdrop-blur-sm">
          <h2 className="mb-4 text-2xl font-bold text-primary">
            Advanced Tactics
          </h2>
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="mr-2 text-xl">•</span>
              <span>Create specialized districts for maximum efficiency</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-xl">•</span>
              <span>
                Use the adjacency bonus by placing complementary tiles next to
                each other
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-xl">•</span>
              <span>
                Plan expansion paths to optimize for late-game scoring
                opportunities
              </span>
            </li>
          </ul>
        </div>

        {/* Competitive Play */}
        <div className="rounded-lg border border-primary bg-white/10 p-6 backdrop-blur-sm">
          <h2 className="mb-4 text-2xl font-bold text-primary">
            Competitive Play
          </h2>
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="mr-2 text-xl">•</span>
              <span>
                Participate in PVP challenges to test your skills against other
                players
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-xl">•</span>
              <span>
                Study leaderboards to understand current meta strategies
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-xl">•</span>
              <span>
                Time your development for maximum scoring potential in speed
                challenges
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-12 rounded-lg border border-primary bg-primary/20 p-6">
        <h2 className="mb-4 text-2xl font-bold text-primary">
          Video Tutorials
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="overflow-hidden rounded-lg border border-primary">
            <div className="relative aspect-video bg-black/20">
              {/* Replace with actual video or thumbnail */}
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-center text-lg font-medium">
                  Getting Started with TileVille
                </p>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg border border-primary">
            <div className="relative aspect-video bg-black/20">
              {/* Replace with actual video or thumbnail */}
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-center text-lg font-medium">
                  Advanced City Planning Tips
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center">
        <Link
          href="/competitions"
          className="inline-block rounded-md bg-primary px-6 py-3 text-lg font-bold text-white hover:bg-primary/90"
        >
          Ready to Play? Join a Competition Now!
        </Link>
      </div>
    </div>
  );
}
