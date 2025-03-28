import React from "react";
import Link from "next/link";

export default function NFTTutorialPage() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-12">
      <h1 className="mb-8 text-3xl font-bold text-primary md:text-4xl">
        NFT Beginner Guide
      </h1>

      <section className="mb-12 rounded-lg bg-white/10 p-6 backdrop-blur-sm">
        <h2 className="mb-4 text-2xl font-bold">What are NFTs?</h2>
        <p className="mb-4">
          NFTs (Non-Fungible Tokens) are unique digital assets stored on a
          blockchain. Unlike cryptocurrencies such as Bitcoin or Mina, each NFT
          has distinct properties that make it irreplaceable and unique.
        </p>
        <div className="my-6 rounded-md bg-primary/10 p-4">
          <h3 className="mb-2 text-lg font-bold">Key Characteristics:</h3>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <span className="font-semibold">Non-Fungible:</span> Cannot be
              exchanged on a like-for-like basis
            </li>
            <li>
              <span className="font-semibold">Unique:</span> Contains
              distinctive information making it different from any other NFT
            </li>
            <li>
              <span className="font-semibold">Indivisible:</span> Cannot be
              divided into smaller denominations
            </li>
            <li>
              <span className="font-semibold">Provable Ownership:</span>{" "}
              Blockchain records provide clear history of ownership
            </li>
          </ul>
        </div>
      </section>

      <section className="mb-12 rounded-lg bg-white/10 p-6 backdrop-blur-sm">
        <h2 className="mb-4 text-2xl font-bold">How NFTs Work on Mina</h2>
        <p className="mb-4">
          Mina blockchain offers several unique advantages for NFTs due to its
          lightweight architecture and privacy features:
        </p>
        <div className="my-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-md bg-primary/20 p-4">
            <h3 className="mb-2 text-lg font-bold">Zero-Knowledge Proofs</h3>
            <p>
              Mina uses zk-SNARKs to enable complex verification while
              maintaining a 22kb blockchain size, making NFT transactions more
              efficient.
            </p>
          </div>
          <div className="rounded-md bg-primary/20 p-4">
            <h3 className="mb-2 text-lg font-bold">Privacy-Preserving</h3>
            <p>
              Create NFTs with private attributes that can be selectively
              disclosed, giving creators more control over their digital assets.
            </p>
          </div>
          <div className="rounded-md bg-primary/20 p-4">
            <h3 className="mb-2 text-lg font-bold">Low Transaction Fees</h3>
            <p>
              Mina protocol is designed for efficiency, resulting in lower gas
              fees for minting and trading NFTs compared to other blockchains.
            </p>
          </div>
          <div className="rounded-md bg-primary/20 p-4">
            <h3 className="mb-2 text-lg font-bold">Eco-Friendly</h3>
            <p>
              The lightweight nature of Mina makes it more energy-efficient than
              many other blockchains, leading to a smaller environmental
              footprint.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-12 rounded-lg bg-white/10 p-6 backdrop-blur-sm">
        <h2 className="mb-4 text-2xl font-bold">
          Getting Started with TileVille NFTs
        </h2>
        <div className="space-y-6">
          <div className="border-l-4 border-primary pl-4">
            <h3 className="text-lg font-bold">Step 1: Set Up a Wallet</h3>
            <p>
              Install Auro wallet from the Chrome Web Store and create a new
              account. This wallet will store your Mina tokens and NFTs.
            </p>
          </div>

          <div className="border-l-4 border-primary pl-4">
            <h3 className="text-lg font-bold">Step 2: Get Mina Tokens</h3>
            <p>
              Youll need Mina tokens to mint NFTs and pay transaction fees.
              Purchase Mina from supported exchanges or through the Auro wallet.
            </p>
          </div>

          <div className="border-l-4 border-primary pl-4">
            <h3 className="text-lg font-bold">Step 3: Connect Your Wallet</h3>
            <p>
              On TileVille, click the Connect Wallet button in the top right and
              authorize the connection with your Auro wallet.
            </p>
          </div>

          <div className="border-l-4 border-primary pl-4">
            <h3 className="text-lg font-bold">Step 4: Browse and Mint</h3>
            <p>
              Explore our marketplace collections and mint your favorite NFTs by
              clicking the Mint button and confirming the transaction.
            </p>
          </div>
        </div>

        <div className="mt-8">
          <Link
            href="/marketplace"
            className="inline-block rounded-md bg-primary px-6 py-3 font-bold text-white hover:bg-primary/80"
          >
            Explore Marketplace
          </Link>
        </div>
      </section>

      <section className="mb-12 rounded-lg bg-white/10 p-6 backdrop-blur-sm">
        <h2 className="mb-4 text-2xl font-bold">Understanding NFT Traits</h2>
        <p className="mb-4">
          NFT traits are individual attributes that define the characteristics
          and rarity of your digital asset. In TileVille, our Builder NFTs come
          with several trait categories:
        </p>

        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-primary/30">
                <th className="p-2 text-left">Trait Category</th>
                <th className="p-2 text-left">Description</th>
                <th className="p-2 text-left">Impact on Gameplay</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/10">
              <tr>
                <td className="p-2 font-medium">Sustainability Rating</td>
                <td className="p-2">
                  Reflects the Builders commitment to eco-friendly development
                </td>
                <td className="p-2">
                  Affects environmental score and pollution levels
                </td>
              </tr>
              <tr>
                <td className="p-2 font-medium">Efficiency Level</td>
                <td className="p-2">
                  Represents overall productivity and skill level
                </td>
                <td className="p-2">
                  Increases construction speed and resource utilization
                </td>
              </tr>
              <tr>
                <td className="p-2 font-medium">Environmental Affinity</td>
                <td className="p-2">
                  Indicates harmony with specific environmental elements
                </td>
                <td className="p-2">
                  Provides bonuses to particular resource types
                </td>
              </tr>
              <tr>
                <td className="p-2 font-medium">Urban Planning Expertise</td>
                <td className="p-2">
                  Represents primary area of focus in city development
                </td>
                <td className="p-2">
                  Determines specialization bonuses for building types
                </td>
              </tr>
              <tr>
                <td className="p-2 font-medium">Special Ability</td>
                <td className="p-2">
                  Unique talent that sets each Builder apart
                </td>
                <td className="p-2">Unlocks special actions and bonuses</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-6">
          <Link
            href="/traits-info"
            className="font-bold text-primary hover:underline"
          >
            Learn more about NFT Traits →
          </Link>
        </div>
      </section>

      <section className="mb-12 rounded-lg bg-white/10 p-6 backdrop-blur-sm">
        <h2 className="mb-4 text-2xl font-bold">NFT FAQ</h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-bold text-primary">
              Can I sell my NFTs after purchase?
            </h3>
            <p>
              Yes, TileVille NFTs can be resold on supported marketplaces like
              MinaNFT.io once you own them.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-primary">
              What happens if my transaction fails?
            </h3>
            <p>
              If a transaction fails, your funds will usually be returned to
              your wallet minus any network fees. You can try minting again
              after a few minutes.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-primary">
              Are there limited editions of NFTs?
            </h3>
            <p>
              Yes, many collections have a limited supply. The rarity is
              indicated on each NFTs details page.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-primary">
              How do I view my NFT collection?
            </h3>
            <p>
              Your NFTs can be viewed in your TileVille profile under the
              Collection tab after connecting your wallet.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-primary">
              What can I do with my TileVille NFTs?
            </h3>
            <p>
              TileVille NFTs provide gameplay advantages, allow participation in
              exclusive events, and serve as digital collectibles that may
              increase in value over time.
            </p>
          </div>
        </div>
      </section>

      <div className="mt-8 text-center">
        <Link
          href="/marketplace"
          className="inline-block rounded-md bg-primary px-8 py-3 text-lg font-bold text-white hover:bg-primary/80"
        >
          Start Your NFT Journey
        </Link>
      </div>
    </div>
  );
}
