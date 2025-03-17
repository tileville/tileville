"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ChevronDownIcon } from "@radix-ui/react-icons";

interface FAQItem {
  question: string;
  answer: React.ReactNode;
  category: string;
}

const FAQPage = () => {
  const [activeCategory, setActiveCategory] = useState<string>("general");
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  const faqItems: FAQItem[] = [
    {
      question: "What is TileVille?",
      answer: (
        <p>
          TileVille is a strategic tile-placement game where you build roads,
          neighborhoods, and landscapes to create the perfect city. Its built on
          the Mina blockchain, adding competitive gameplay, rewards, and digital
          ownership elements to the experience.
        </p>
      ),
      category: "general",
    },
    {
      question: "How do I start playing?",
      answer: (
        <div>
          <p>Getting started with TileVille is easy:</p>
          <ol className="ml-6 mt-2 list-decimal space-y-2">
            <li>Connect your Auro wallet</li>
            <li>Create a profile with your username</li>
            <li>Try out the demo game to learn the mechanics</li>
            <li>Join competitions or create/accept PVP challenges</li>
          </ol>
        </div>
      ),
      category: "general",
    },
    {
      question: "Is TileVille free to play?",
      answer: (
        <p>
          TileVille offers both free and paid options. You can play the demo
          game for free to practice. Competitions typically have entry fees
          ranging from 0.1 to 3 MINA tokens, while PVP challenges have
          customizable entry fees set by the creator (minimum 1 MINA).
        </p>
      ),
      category: "general",
    },
    {
      question: "What are TileVille Builder NFTs?",
      answer: (
        <div>
          <p className="mb-2">
            TileVille Builder NFTs are unique collectibles that provide special
            benefits in the game:
          </p>
          <ul className="ml-6 list-disc space-y-1">
            <li>
              Scoring advantages through traits like Complexity and Efficiency
            </li>
            <li>Exclusive access to special competitions and events</li>
            <li>Profile customization and status symbols</li>
            <li>Trading value on marketplaces like MinaNFT.io</li>
          </ul>
          <p className="mt-2">
            Each NFT has unique traits that affect both appearance and utility
            in the game.
          </p>
        </div>
      ),
      category: "nfts",
    },
    {
      question: "How do NFT traits work?",
      answer: (
        <div>
          <p>
            TileVille Builder NFTs have the following traits that provide
            gameplay benefits:
          </p>
          <ul className="ml-6 mt-2 list-disc space-y-2">
            <li>
              <strong>Complexity:</strong> Affects score multipliers
            </li>
            <li>
              <strong>Style:</strong> Visual theme and architectural details
            </li>
            <li>
              <strong>Efficiency:</strong> Influences speed bonuses
            </li>
            <li>
              <strong>Rarity:</strong> Determines overall value and uniqueness
            </li>
            <li>
              <strong>Special Abilities:</strong> Unique gameplay advantages
            </li>
          </ul>
          <p className="mt-2">
            For more details, visit the{" "}
            <Link href="/traits-info" className="text-primary underline">
              Traits Info
            </Link>{" "}
            page.
          </p>
        </div>
      ),
      category: "nfts",
    },
    {
      question: "How do competitions work?",
      answer: (
        <div>
          <p className="mb-2">
            TileVille competitions are platform-organized events with larger
            prize pools:
          </p>
          <ul className="ml-6 list-disc space-y-1">
            <li>Pay an entry fee to join (typically 0.1-3 MINA)</li>
            <li>Play the game to achieve the highest score possible</li>
            <li>
              Winners are determined based on the leaderboard at the end of the
              competition
            </li>
            <li>Prizes are distributed automatically to the winners wallets</li>
          </ul>
          <p className="mt-2">
            There are both standard and speed competitions, with varying
            durations and prize structures.
          </p>
        </div>
      ),
      category: "gameplay",
    },
    {
      question: "What are PVP challenges?",
      answer: (
        <div>
          <p>
            PVP (Player vs Player) challenges allow you to directly compete
            against other players:
          </p>
          <ul className="ml-6 mt-2 list-disc space-y-1">
            <li>
              Create a challenge by setting name, entry fee, time limit, and max
              participants
            </li>
            <li>Share the invite link with friends or post it publicly</li>
            <li>Players pay the entry fee to join</li>
            <li>Everyone plays the same game configuration</li>
            <li>
              The highest-scoring player wins the prize pool (minus a 1 MINA
              platform fee)
            </li>
          </ul>
        </div>
      ),
      category: "gameplay",
    },
    {
      question: "How do I earn rewards?",
      answer: (
        <p>
          You can earn MINA token rewards in several ways:
          <ul className="ml-6 mt-2 list-disc space-y-1">
            <li>Winning competitions (prizes based on leaderboard position)</li>
            <li>
              Winning PVP challenges (prize pool equals all entry fees minus 1
              MINA)
            </li>
            <li>
              Referral program (earn when users you refer join competitions)
            </li>
            <li>Special events with bonus rewards</li>
          </ul>
          All rewards are sent directly to your connected wallet.
        </p>
      ),
      category: "rewards",
    },
    {
      question: "How do I connect my Telegram account?",
      answer: (
        <div>
          <p className="mb-2">
            Connecting your Telegram account allows you to receive notifications
            about new competitions, challenges, and rewards:
          </p>
          <ol className="ml-6 list-decimal space-y-1">
            <li>
              Visit the{" "}
              <Link
                href="/profile?tab=preferences"
                className="text-primary underline"
              >
                Preferences tab
              </Link>{" "}
              in your profile
            </li>
            <li>Click Connect Telegram Account</li>
            <li>Youll be redirected to the TileVille Telegram bot</li>
            <li>
              Start the bot and follow the instructions to verify your wallet
            </li>
          </ol>
          <p className="mt-2">
            Once connected, youll receive timely notifications for all TileVille
            activities.
          </p>
        </div>
      ),
      category: "account",
    },
    {
      question: "What wallets does TileVille support?",
      answer: (
        <p>
          Currently, TileVille officially supports Auro Wallet for the Mina
          blockchain. Pallad wallet is not yet supported. We recommend using the
          Auro Wallet browser extension for desktop play, or the Auro mobile app
          when playing on mobile devices.
        </p>
      ),
      category: "account",
    },
    {
      question: "How do I report bugs or issues?",
      answer: (
        <p>
          If you encounter any bugs or issues while playing TileVille, please
          use the Bug Report button in the navigation bar or visit our{" "}
          <a
            href="https://github.com/tileville/tileville-game/issues"
            className="text-primary underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub Issues page
          </a>{" "}
          to report the problem. Please include as much detail as possible about
          the issue, including what you were doing when it occurred and any
          error messages you received.
        </p>
      ),
      category: "support",
    },
  ];

  const categories = [
    { id: "general", name: "General" },
    { id: "account", name: "Account & Settings" },
    { id: "gameplay", name: "Gameplay" },
    { id: "nfts", name: "NFTs" },
    { id: "rewards", name: "Rewards" },
    { id: "support", name: "Support" },
  ];

  const filteredItems = faqItems.filter(
    (item) => item.category === activeCategory
  );

  return (
    <div className="p-4 pb-20 pt-12 md:pb-24 md:pt-40">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-center text-3xl font-bold text-primary md:text-5xl">
          Frequently Asked Questions
        </h1>

        {/* Category Tabs */}
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors md:text-base ${
                activeCategory === category.id
                  ? "bg-primary text-white"
                  : "bg-primary/20 hover:bg-primary/30"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredItems.map((item, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-lg border border-primary/30 bg-primary/10"
            >
              <button
                onClick={() => toggleItem(index)}
                className="flex w-full items-center justify-between p-4 text-left font-medium text-primary"
              >
                <span>{item.question}</span>
                <ChevronDownIcon
                  className={`h-5 w-5 transition-transform ${
                    openItems.has(index) ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden px-4 transition-all duration-300 ${
                  openItems.has(index) ? "max-h-96 pb-4" : "max-h-0"
                }`}
              >
                <div className="prose prose-sm md:prose-base max-w-none text-black/80">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Not finding what you're looking for section */}
        <div className="mt-12 rounded-lg bg-primary/20 p-6 text-center">
          <h2 className="mb-4 text-xl font-semibold">
            Not finding what youre looking for?
          </h2>
          <p className="mb-6">
            Join our community for more help or check out our game guide.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="https://t.me/tilevillebugs"
              target="_blank"
              className="rounded-full bg-primary px-6 py-2 text-white hover:bg-primary/80"
            >
              Join Telegram Group
            </Link>
            <Link
              href="/guide"
              className="rounded-full border border-primary bg-transparent px-6 py-2 text-primary hover:bg-primary/10"
            >
              Game Guide
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
