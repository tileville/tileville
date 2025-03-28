import React from "react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "TileVille NFT Collections | Exclusive Digital Assets",
  description:
    "Explore the exclusive NFT collections available in TileVille. From Builders to Minaty, MinaPunks and more - discover unique digital assets on Mina Protocol.",
};

export default function NFTCollectionsPage() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold text-primary md:text-4xl">
        NFT Collections
      </h1>

      <div className="relative mb-8 h-64 w-full overflow-hidden rounded-lg">
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <p className="px-4 text-center text-2xl font-bold text-white md:text-3xl">
            Exclusive Digital Assets on Mina Protocol
          </p>
        </div>
      </div>

      <div className="mb-12 rounded-lg bg-gray-800 p-6 text-white">
        <h2 className="mb-4 text-2xl font-bold text-primary">
          About TileVille NFTs
        </h2>
        <p className="mb-4">
          TileVille offers a variety of unique NFT collections built on Mina
          Protocol. Each collection serves a specific purpose within the
          TileVille ecosystem, providing both aesthetic value and in-game
          utility.
        </p>
        <p>
          Our NFTs are more than just digital art—theyre functional assets that
          can enhance your gameplay, provide special abilities, and represent
          your unique identity in the TileVille community.
        </p>
      </div>

      {/* TileVille Builder Collection */}
      <div className="mb-16">
        <div className="flex flex-col items-start gap-6 md:flex-row">
          <div className="w-full md:w-1/3">
            <div className="relative aspect-square overflow-hidden rounded-lg"></div>
          </div>

          <div className="w-full md:w-2/3">
            <div className="mb-4 flex items-start justify-between">
              <h2 className="text-2xl font-bold text-primary">
                TileVille Builder Collection
              </h2>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-primary bg-opacity-20 px-3 py-1 text-xs text-primary">
                  Official
                </span>
                <span className="rounded-full bg-green-900 px-3 py-1 text-xs text-green-300">
                  Utility NFTs
                </span>
              </div>
            </div>

            <p className="mb-4">
              The TileVille Builder Collection features unique characters who
              specialize in different aspects of city building. Each Builder NFT
              grants special abilities and bonuses when used in gameplay,
              allowing for different strategic approaches to city development.
            </p>

            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded bg-gray-700 p-3">
                <h3 className="mb-1 font-semibold text-primary">
                  Functionality
                </h3>
                <p className="text-sm">
                  Each Builder provides unique bonuses to specific aspects of
                  city building, such as energy efficiency, resident happiness,
                  or environmental sustainability.
                </p>
              </div>

              <div className="rounded bg-gray-700 p-3">
                <h3 className="mb-1 font-semibold text-primary">
                  Rarity System
                </h3>
                <p className="text-sm">
                  Builders come in various rarity levels, with rarer NFTs
                  providing more significant in-game advantages and unique
                  visual characteristics.
                </p>
              </div>

              <div className="rounded bg-gray-700 p-3">
                <h3 className="mb-1 font-semibold text-primary">
                  Special Abilities
                </h3>
                <p className="text-sm">
                  From Green Thumb to Power Surge, each Builder has a signature
                  ability that affects gameplay mechanics.
                </p>
              </div>

              <div className="rounded bg-gray-700 p-3">
                <h3 className="mb-1 font-semibold text-primary">
                  Customization
                </h3>
                <p className="text-sm">
                  Builders reflect your personal city-building style and can be
                  used to represent you in competitions and the community.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/marketplace?collection=Tileville"
                className="rounded bg-primary px-6 py-2 text-center font-bold text-white transition-all hover:bg-opacity-80"
              >
                View Collection
              </Link>
              <button className="rounded bg-secondary px-6 py-2 font-bold text-white transition-all hover:bg-opacity-80">
                Mint a Builder
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="mb-4 text-xl font-bold text-primary">
            Featured Builders
          </h3>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-lg bg-gray-800 text-white"
              >
                <div className="relative aspect-square"></div>
                <div className="p-3">
                  <h4 className="text-sm font-semibold text-primary">
                    Eco Builder #{index + 100}
                  </h4>
                  <p className="text-xs text-gray-400">
                    Sustainability Rating: Diamond
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Minaty Collection */}
      <div className="mb-16">
        <div className="flex flex-col items-start gap-6 md:flex-row">
          <div className="w-full md:w-1/3">
            <div className="relative aspect-square overflow-hidden rounded-lg"></div>
          </div>

          <div className="w-full md:w-2/3">
            <div className="mb-4 flex items-start justify-between">
              <h2 className="text-2xl font-bold text-primary">
                Minaty Collection
              </h2>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-purple-900 px-3 py-1 text-xs text-purple-300">
                  Partner Collection
                </span>
                <span className="rounded-full bg-blue-900 px-3 py-1 text-xs text-blue-300">
                  Character NFTs
                </span>
              </div>
            </div>

            <p className="mb-4">
              The Minaty Collection features unique character designs
              representing different roles within the Mina ecosystem. From
              Founders to Guardians, each Minaty character symbolizes a
              different aspect of the communitys vision for privacy and
              security.
            </p>

            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded bg-gray-700 p-3">
                <h3 className="mb-1 font-semibold text-primary">Categories</h3>
                <p className="text-sm">
                  FOUNDER, DESIGNER, SOLDIER, GUARDIAN, TOTEM, and ZKON - each
                  representing different roles and status within the community.
                </p>
              </div>

              <div className="rounded bg-gray-700 p-3">
                <h3 className="mb-1 font-semibold text-primary">
                  Unique Artwork
                </h3>
                <p className="text-sm">
                  Each Minaty features distinctive, high-quality artwork with
                  visual elements that represent their category and role.
                </p>
              </div>

              <div className="rounded bg-gray-700 p-3">
                <h3 className="mb-1 font-semibold text-primary">
                  Community Status
                </h3>
                <p className="text-sm">
                  Minaty NFTs signify membership and status within the broader
                  Mina Protocol community.
                </p>
              </div>

              <div className="rounded bg-gray-700 p-3">
                <h3 className="mb-1 font-semibold text-primary">
                  Exclusive Access
                </h3>
                <p className="text-sm">
                  Holders receive special access to certain features, events,
                  and future updates in the TileVille ecosystem.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/marketplace?collection=Minaty"
                className="rounded bg-primary px-6 py-2 text-center font-bold text-white transition-all hover:bg-opacity-80"
              >
                View Collection
              </Link>
              <button className="rounded bg-secondary px-6 py-2 font-bold text-white transition-all hover:bg-opacity-80">
                Mint a Minaty
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="mb-4 text-xl font-bold text-primary">
            Featured Minaty Characters
          </h3>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-lg bg-gray-800 text-white"
              >
                <div className="relative aspect-square"></div>
                <div className="p-3">
                  <h4 className="text-sm font-semibold text-primary">
                    Minaty #{index + 200}
                  </h4>
                  <p className="text-xs text-gray-400">
                    Category:{" "}
                    {
                      ["GUARDIAN", "SOLDIER", "TOTEM", "ZKON", "DESIGNER"][
                        index
                      ]
                    }
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MinaPunks Collection */}
      <div className="mb-16">
        <div className="flex flex-col items-start gap-6 md:flex-row">
          <div className="w-full md:w-1/3">
            <div className="relative aspect-square overflow-hidden rounded-lg"></div>
          </div>

          <div className="w-full md:w-2/3">
            <div className="mb-4 flex items-start justify-between">
              <h2 className="text-2xl font-bold text-primary">
                MinaPunks Collection
              </h2>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-purple-900 px-3 py-1 text-xs text-purple-300">
                  Partner Collection
                </span>
                <span className="rounded-full bg-yellow-900 px-3 py-1 text-xs text-yellow-300">
                  Collectible NFTs
                </span>
              </div>
            </div>

            <p className="mb-4">
              MinaPunks brings the iconic pixel art style to the Mina ecosystem.
              These unique characters blend retro aesthetics with blockchain
              innovation, creating collectibles that celebrate both nostalgia
              and cutting-edge technology.
            </p>

            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded bg-gray-700 p-3">
                <h3 className="mb-1 font-semibold text-primary">Categories</h3>
                <p className="text-sm">
                  Available in GOLD, SILVER, BRONZE, and special CHRISTMAS
                  editions, each with different levels of rarity.
                </p>
              </div>

              <div className="rounded bg-gray-700 p-3">
                <h3 className="mb-1 font-semibold text-primary">
                  Pixel Art Style
                </h3>
                <p className="text-sm">
                  Iconic pixel art design inspired by classic collectibles but
                  with unique elements from the Mina ecosystem.
                </p>
              </div>

              <div className="rounded bg-gray-700 p-3">
                <h3 className="mb-1 font-semibold text-primary">
                  Random Traits
                </h3>
                <p className="text-sm">
                  Each MinaPunk features a randomized combination of traits,
                  making every NFT unique and collectible.
                </p>
              </div>

              <div className="rounded bg-gray-700 p-3">
                <h3 className="mb-1 font-semibold text-primary">
                  Display Options
                </h3>
                <p className="text-sm">
                  Show off your MinaPunks in your TileVille profile and use them
                  as avatars in various community spaces.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/marketplace?collection=MinaPunks"
                className="rounded bg-primary px-6 py-2 text-center font-bold text-white transition-all hover:bg-opacity-80"
              >
                View Collection
              </Link>
              <button className="rounded bg-secondary px-6 py-2 font-bold text-white transition-all hover:bg-opacity-80">
                Mint a MinaPunk
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="mb-4 text-xl font-bold text-primary">
            Featured MinaPunks
          </h3>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-lg bg-gray-800 text-white"
              >
                <div className="relative aspect-square"></div>
                <div className="p-3">
                  <h4 className="text-sm font-semibold text-primary">
                    MinaPunk #{index + 300}
                  </h4>
                  <p className="text-xs text-gray-400">
                    Category:{" "}
                    {["GOLD", "SILVER", "BRONZE", "GOLD", "CHRISTMAS"][index]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* zkgod Collection */}
      <div className="mb-16">
        <div className="flex flex-col items-start gap-6 md:flex-row">
          <div className="w-full md:w-1/3">
            <div className="relative aspect-square overflow-hidden rounded-lg"></div>
          </div>

          <div className="w-full md:w-2/3">
            <div className="mb-4 flex items-start justify-between">
              <h2 className="text-2xl font-bold text-primary">
                zkgod Collection
              </h2>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-purple-900 px-3 py-1 text-xs text-purple-300">
                  Partner Collection
                </span>
                <span className="rounded-full bg-red-900 px-3 py-1 text-xs text-red-300">
                  Premium NFTs
                </span>
              </div>
            </div>

            <p className="mb-4">
              The zkgod Collection represents the divine aspects of
              zero-knowledge cryptography. These mystical, deity-inspired
              designs celebrate the revolutionary privacy and security features
              of the Mina Protocol.
            </p>

            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded bg-gray-700 p-3">
                <h3 className="mb-1 font-semibold text-primary">
                  Mythological Inspiration
                </h3>
                <p className="text-sm">
                  Each zkgod is inspired by deities and mythological figures
                  associated with knowledge, privacy, and protection.
                </p>
              </div>

              <div className="rounded bg-gray-700 p-3">
                <h3 className="mb-1 font-semibold text-primary">
                  Premium Artwork
                </h3>
                <p className="text-sm">
                  Elaborate, detailed designs with rich symbolism and unique
                  visual elements representing zero-knowledge concepts.
                </p>
              </div>

              <div className="rounded bg-gray-700 p-3">
                <h3 className="mb-1 font-semibold text-primary">
                  Limited Edition
                </h3>
                <p className="text-sm">
                  Strictly limited supply makes zkgod NFTs among the most
                  exclusive assets in the TileVille ecosystem.
                </p>
              </div>

              <div className="rounded bg-gray-700 p-3">
                <h3 className="mb-1 font-semibold text-primary">
                  Special Benefits
                </h3>
                <p className="text-sm">
                  Holders receive priority access to new features, exclusive
                  competitions, and special governance rights.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/marketplace?collection=zkgod"
                className="rounded bg-primary px-6 py-2 text-center font-bold text-white transition-all hover:bg-opacity-80"
              >
                View Collection
              </Link>
              <button className="rounded bg-secondary px-6 py-2 font-bold text-white transition-all hover:bg-opacity-80">
                Mint a zkgod
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="mb-4 text-xl font-bold text-primary">
            Featured zkgods
          </h3>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-lg bg-gray-800 text-white"
              >
                <div className="relative aspect-square"></div>
                <div className="p-3">
                  <h4 className="text-sm font-semibold text-primary">
                    zkgod #{index + 400}
                  </h4>
                  <p className="text-xs text-gray-400">
                    Rarity:{" "}
                    {["Legendary", "Epic", "Legendary", "Rare", "Epic"][index]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Zeko Collection */}
      <div className="mb-16">
        <div className="flex flex-col items-start gap-6 md:flex-row">
          <div className="w-full md:w-1/3">
            <div className="relative aspect-square overflow-hidden rounded-lg"></div>
          </div>

          <div className="w-full md:w-2/3">
            <div className="mb-4 flex items-start justify-between">
              <h2 className="text-2xl font-bold text-primary">
                Zeko Collection
              </h2>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-purple-900 px-3 py-1 text-xs text-purple-300">
                  Partner Collection
                </span>
                <span className="rounded-full bg-green-900 px-3 py-1 text-xs text-green-300">
                  Newest Addition
                </span>
              </div>
            </div>

            <p className="mb-4">
              The Zeko Collection is our newest addition to the TileVille NFT
              ecosystem. These unique digital creatures combine cute aesthetics
              with powerful symbolism representing different aspects of the Mina
              blockchains capabilities.
            </p>

            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded bg-gray-700 p-3">
                <h3 className="mb-1 font-semibold text-primary">
                  Creature Design
                </h3>
                <p className="text-sm">
                  Colorful, endearing characters with distinctive features
                  representing different blockchain concepts.
                </p>
              </div>

              <div className="rounded bg-gray-700 p-3">
                <h3 className="mb-1 font-semibold text-primary">
                  Evolving Collection
                </h3>
                <p className="text-sm">
                  The Zeko roster will grow over time, with new characters added
                  to represent emerging blockchain technologies.
                </p>
              </div>

              <div className="rounded bg-gray-700 p-3">
                <h3 className="mb-1 font-semibold text-primary">
                  Interactive Features
                </h3>
                <p className="text-sm">
                  Zekos can interact with your TileVille city, offering small
                  bonuses and visual enhancements.
                </p>
              </div>

              <div className="rounded bg-gray-700 p-3">
                <h3 className="mb-1 font-semibold text-primary">
                  Collectibility
                </h3>
                <p className="text-sm">
                  Different rarity tiers and special edition Zekos make this
                  collection appealing to serious collectors.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/marketplace?collection=Zeko"
                className="rounded bg-primary px-6 py-2 text-center font-bold text-white transition-all hover:bg-opacity-80"
              >
                View Collection
              </Link>
              <button className="rounded bg-secondary px-6 py-2 font-bold text-white transition-all hover:bg-opacity-80">
                Mint a Zeko
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="mb-4 text-xl font-bold text-primary">
            Featured Zekos
          </h3>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-lg bg-gray-800 text-white"
              >
                <div className="relative aspect-square"></div>
                <div className="p-3">
                  <h4 className="text-sm font-semibold text-primary">
                    Zeko #{index + 500}
                  </h4>
                  <p className="text-xs text-gray-400">
                    Type: {["Aqua", "Terra", "Aero", "Pyro", "Cosmic"][index]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mb-16">
        <h2 className="mb-6 text-2xl font-bold text-primary">
          NFT Questions & Answers
        </h2>

        <div className="space-y-4">
          <div className="rounded-lg bg-gray-800 p-5 text-white">
            <h3 className="mb-2 text-lg font-bold text-primary">
              How do I mint an NFT in TileVille?
            </h3>
            <p>
              You can mint NFTs directly from each collections page by
              connecting your Auro wallet and following the minting
              instructions. Most collections have a minting limit per wallet to
              ensure fair distribution.
            </p>
          </div>

          <div className="rounded-lg bg-gray-800 p-5 text-white">
            <h3 className="mb-2 text-lg font-bold text-primary">
              What benefits do NFTs provide in gameplay?
            </h3>
            <p>
              Different NFT collections provide different benefits. TileVille
              Builders offer direct gameplay advantages with special abilities
              and bonuses. Other collections may provide aesthetic options,
              exclusive access to events or features, or status within the
              community.
            </p>
          </div>

          <div className="rounded-lg bg-gray-800 p-5 text-white">
            <h3 className="mb-2 text-lg font-bold text-primary">
              Can I trade or sell my NFTs?
            </h3>
            <p>
              Yes! All NFTs in the TileVille ecosystem can be traded through our
              marketplace. You can list your NFTs for sale, set a price, and
              transfer them to other players. Some special NFTs (like Founder
              Minatys) may have transfer restrictions.
            </p>
          </div>

          <div className="rounded-lg bg-gray-800 p-5 text-white">
            <h3 className="mb-2 text-lg font-bold text-primary">
              How are NFT rarities determined?
            </h3>
            <p>
              Each collection has its own rarity system, typically based on
              traits, special abilities, or categories. Rarer NFTs generally
              have enhanced visual elements and potentially stronger gameplay
              benefits where applicable.
            </p>
          </div>

          <div className="rounded-lg bg-gray-800 p-5 text-white">
            <h3 className="mb-2 text-lg font-bold text-primary">
              Do I need an NFT to play TileVille?
            </h3>
            <p>
              No, NFTs are completely optional! You can enjoy the full TileVille
              experience without owning any NFTs. They provide various
              enhancements and personalization options but are not required for
              core gameplay.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="rounded-lg bg-gradient-to-r from-blue-900 to-purple-900 p-8">
        <div className="mb-8 text-center">
          <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">
            Ready to Start Your NFT Collection?
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-200">
            Join thousands of players who are building their NFT portfolios on
            Mina Protocol. Explore unique digital assets that enhance your
            TileVille experience!
          </p>
        </div>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/marketplace"
            className="rounded-lg bg-white px-8 py-3 text-center font-bold text-blue-900 transition-all hover:bg-opacity-90"
          >
            Browse Marketplace
          </Link>
          <Link
            href="/guide#nfts"
            className="rounded-lg border-2 border-white bg-transparent px-8 py-3 text-center font-bold text-white transition-all hover:bg-white hover:bg-opacity-10"
          >
            Learn More About NFTs
          </Link>
        </div>
      </div>
    </div>
  );
}
