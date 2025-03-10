"use client";
import { useState } from "react";
import Link from "next/link";

export default function FAQPage() {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
    {}
  );

  const toggleItem = (id: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="p-4 pb-20 pt-16 md:pb-24 md:pt-40">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-3xl font-bold text-primary md:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-gray-700">
            Find answers to the most common questions about TileVille, gameplay,
            competitions, and rewards.
          </p>
        </div>

        <div className="mb-8 rounded-xl bg-primary/10 p-6">
          <h2 className="mb-4 text-2xl font-bold text-primary" id="general">
            General Questions
          </h2>

          <div className="space-y-4">
            <div className="overflow-hidden rounded-lg bg-white/60">
              <button
                className="flex w-full items-center justify-between p-4 text-left font-semibold"
                onClick={() => toggleItem("what-is-tileville")}
              >
                <span>What is TileVille?</span>
                <svg
                  className={`h-5 w-5 transition-transform ${
                    expandedItems["what-is-tileville"] ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>
              {expandedItems["what-is-tileville"] && (
                <div className="border-t border-gray-200 p-4 pt-0">
                  <p>
                    TileVille is a strategic tile-placement game built on the
                    Mina blockchain. Players build cities by placing hexagonal
                    tiles to create roads, neighborhoods, and landscapes, aiming
                    to score the highest points. The game features competitive
                    gameplay with MINA token rewards and collectible NFTs.
                  </p>
                </div>
              )}
            </div>

            <div className="overflow-hidden rounded-lg bg-white/60">
              <button
                className="flex w-full items-center justify-between p-4 text-left font-semibold"
                onClick={() => toggleItem("how-to-play")}
              >
                <span>How do I start playing TileVille?</span>
                <svg
                  className={`h-5 w-5 transition-transform ${
                    expandedItems["how-to-play"] ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>
              {expandedItems["how-to-play"] && (
                <div className="border-t border-gray-200 p-4 pt-0">
                  <p className="mb-2">
                    To start playing TileVille, follow these steps:
                  </p>
                  <ol className="list-decimal space-y-1 pl-5">
                    <li>
                      Install Auro Wallet (or another supported Mina wallet)
                    </li>
                    <li>Connect your wallet to TileVille</li>
                    <li>Create a profile with a username</li>
                    <li>Try the free demo game to learn the mechanics</li>
                    <li>Join a competition or create/join a PVP challenge</li>
                  </ol>
                  <p className="mt-2">
                    You can start with our{" "}
                    <Link
                      href="/competitions/demo-game"
                      className="text-primary hover:underline"
                    >
                      demo game
                    </Link>{" "}
                    without any entry fees to practice.
                  </p>
                </div>
              )}
            </div>

            <div className="overflow-hidden rounded-lg bg-white/60"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
