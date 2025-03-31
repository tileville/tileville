import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "TileVille Gameplay Guide",
  description:
    "Learn how to play TileVille, the strategic city-builder game on Mina Protocol",
};

export default function GameplayGuidePage() {
  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="mb-6 text-3xl font-bold text-primary">
        TileVille Gameplay Guide
      </h1>

      <div className="mb-8 rounded-lg bg-green-50 p-6 shadow-md">
        <h2 className="mb-4 text-2xl font-semibold">Getting Started</h2>
        <p className="mb-4">
          Welcome to TileVille, the strategic city-builder game on Mina
          Protocol! This guide will help you understand the basics of gameplay
          and strategy.
        </p>

        <div className="mb-6 rounded-md bg-white p-4">
          <h3 className="mb-2 text-xl font-medium text-primary">
            Game Objective
          </h3>
          <p>
            Your goal is to build a thriving, sustainable city by strategically
            placing different types of tiles. Balance resources, manage growth,
            and create the most efficient city layout to earn the highest score.
          </p>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Basic Controls</h2>
        <ul className="ml-6 list-disc space-y-2">
          <li>
            <span className="font-medium">Select Tiles:</span> Click on a tile
            from your inventory to select it
          </li>
          <li>
            <span className="font-medium">Place Tiles:</span> Click on an empty
            grid space to place your selected tile
          </li>
          <li>
            <span className="font-medium">Rotate Tiles:</span> Use the R key or
            rotation button to rotate before placement
          </li>
          <li>
            <span className="font-medium">Camera Movement:</span> Use WASD keys
            or arrow keys to pan the camera
          </li>
          <li>
            <span className="font-medium">Zoom:</span> Use the scroll wheel to
            zoom in and out
          </li>
        </ul>
      </div>

      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Tile Types</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-md bg-green-50 p-4">
            <h3 className="mb-2 text-lg font-medium text-primary">
              Residential Tiles
            </h3>
            <p>
              Houses and apartments that provide population growth. Place near
              parks and services for maximum happiness.
            </p>
          </div>
          <div className="rounded-md bg-blue-50 p-4">
            <h3 className="mb-2 text-lg font-medium text-primary">
              Commercial Tiles
            </h3>
            <p>
              Shops and businesses that generate income. Work best when placed
              along transportation routes.
            </p>
          </div>
          <div className="rounded-md bg-yellow-50 p-4">
            <h3 className="mb-2 text-lg font-medium text-primary">
              Infrastructure Tiles
            </h3>
            <p>
              Roads, power plants, and utilities that support your city. Create
              efficient networks for optimal city functioning.
            </p>
          </div>
          <div className="rounded-md bg-green-100 p-4">
            <h3 className="mb-2 text-lg font-medium text-primary">
              Environmental Tiles
            </h3>
            <p>
              Parks, forests, and water features that boost city happiness and
              sustainability scores.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Strategic Tips</h2>
        <ol className="ml-6 list-decimal space-y-3">
          <li>
            <p className="font-medium text-primary">Balance is key</p>
            <p>
              Create a good mix of residential, commercial, and environmental
              tiles for a well-rounded city.
            </p>
          </li>
          <li>
            <p className="font-medium text-primary">Plan your layout</p>
            <p>
              Think ahead about how districts will connect and function
              together. Good city planning leads to higher scores.
            </p>
          </li>
          <li>
            <p className="font-medium text-primary">Use NFT Builders</p>
            <p>
              Different Builder NFTs provide unique bonuses. Choose the right
              Builder for your playstyle.
            </p>
          </li>
          <li>
            <p className="font-medium text-primary">
              Optimize adjacency bonuses
            </p>
            <p>
              Many tiles receive bonuses when placed next to complementary
              tiles. For example, houses benefit from being near parks.
            </p>
          </li>
          <li>
            <p className="font-medium text-primary">Focus on sustainability</p>
            <p>
              Environmentally friendly cities score higher. Balance growth with
              green spaces.
            </p>
          </li>
        </ol>
      </div>

      <div className="mb-8 rounded-lg bg-primary/10 p-6">
        <h2 className="mb-4 text-2xl font-semibold">Scoring System</h2>
        <p className="mb-4">
          Your final score is calculated based on several factors:
        </p>
        <ul className="ml-6 list-disc space-y-2">
          <li>
            <span className="font-medium">Population happiness</span> (30%)
          </li>
          <li>
            <span className="font-medium">Economic output</span> (25%)
          </li>
          <li>
            <span className="font-medium">Environmental impact</span> (20%)
          </li>
          <li>
            <span className="font-medium">Infrastructure efficiency</span> (15%)
          </li>
          <li>
            <span className="font-medium">City aesthetics</span> (10%)
          </li>
        </ul>
      </div>

      <div className="rounded-lg bg-green-50 p-6 shadow-md">
        <h2 className="mb-4 text-2xl font-semibold">Ready to Play?</h2>
        <p className="mb-4">
          Now that you understand the basics, its time to put your city-building
          skills to the test!
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/competitions"
            className="rounded-md bg-primary px-6 py-2 font-semibold text-white hover:bg-primary/90"
          >
            Join a Competition
          </Link>
          <Link
            href="/pvp"
            className="rounded-md border border-primary px-6 py-2 font-semibold text-primary hover:bg-primary/10"
          >
            Challenge a Player
          </Link>
        </div>
      </div>
    </div>
  );
}
