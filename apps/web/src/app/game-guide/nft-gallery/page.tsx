import React from "react";
import Link from "next/link";

const GalleryItem = ({
  name,
  artist,
  collection,
  rarity,
}: {
  name: string;
  artist: string;
  collection: string;
  rarity: string;
}) => (
  <div className="group overflow-hidden rounded-lg bg-white/5 backdrop-blur-sm transition-all hover:bg-white/10">
    <div className="relative h-64 w-full overflow-hidden">
      <div className="absolute right-2 top-2 rounded-full bg-black/60 px-3 py-1 text-xs font-bold">
        {rarity}
      </div>
    </div>
    <div className="p-4">
      <h3 className="mb-1 text-lg font-bold text-white">{name}</h3>
      <p className="text-sm text-gray-300">Artist: {artist}</p>
      <p className="text-sm text-primary">{collection}</p>
      <div className="mt-3 flex items-center justify-between">
        <Link
          href={`/marketplace/collection/${collection
            .toLowerCase()
            .replace(" ", "-")}`}
          className="text-xs font-bold text-primary hover:underline"
        >
          View Collection
        </Link>
        <span className="rounded-full bg-primary/20 px-3 py-1 text-xs text-primary">
          Featured
        </span>
      </div>
    </div>
  </div>
);

export default function NFTGallery() {
  // This would normally come from your API or database
  const featuredNFTs = [
    {
      id: 1,
      imageUrl: "/img/nfts/gallery-1.jpg",
      name: "Urban Architect #042",
      artist: "TileVille Studios",
      collection: "TileVille",
      rarity: "Legendary",
    },
    {
      id: 2,
      imageUrl: "/img/nfts/gallery-2.jpg",
      name: "MinaPunk #105",
      artist: "Crypto Voxel",
      collection: "MinaPunks",
      rarity: "Rare",
    },
    {
      id: 3,
      imageUrl: "/img/nfts/gallery-3.jpg",
      name: "Minaty Guardian #017",
      artist: "PixelWarrior",
      collection: "Minaty",
      rarity: "Ultra Rare",
    },
    {
      id: 4,
      imageUrl: "/img/avatars/3.jpeg",
      name: "ZkGod Oracle #003",
      artist: "ZeroKnowledge",
      collection: "zkgod",
      rarity: "Mythic",
    },
    {
      id: 5,
      imageUrl: "/img/avatars/4.jpeg",
      name: "Eco Planner #129",
      artist: "TileVille Studios",
      collection: "TileVille",
      rarity: "Uncommon",
    },
    {
      id: 6,
      imageUrl: "/img/avatars/5.jpeg",
      name: "Zeko Speedster #076",
      artist: "MinaCreator",
      collection: "Zeko",
      rarity: "Epic",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold text-primary md:text-5xl">
          NFT Gallery
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-300">
          A curated collection of the most extraordinary NFTs from across the
          Mina ecosystem.
        </p>
      </div>

      {/* Featured Showcase */}
      <section className="mb-16">
        <div className="relative mb-6 h-96 w-full overflow-hidden rounded-xl md:h-[500px]">
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
          <div className="absolute bottom-0 left-0 max-w-2xl p-6 md:p-10">
            <span className="mb-4 inline-block rounded-full bg-primary px-3 py-1 text-sm font-bold text-white">
              Featured Collection
            </span>
            <h2 className="mb-3 text-3xl font-bold text-white md:text-4xl">
              ZkGod: The Anonymity Revolution
            </h2>
            <p className="mb-6 text-gray-200">
              Where zero-knowledge technology meets revolutionary art in the
              most disruptive way possible.
            </p>
            <Link
              href="/marketplace/collection/zkgod"
              className="inline-block rounded-md bg-primary px-6 py-2 font-bold text-white hover:bg-primary/80"
            >
              Explore Collection
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section>
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Trending NFTs</h2>
          <div className="flex gap-4">
            <button className="rounded-md bg-primary/20 px-4 py-2 text-sm font-medium text-white hover:bg-primary/30">
              Most Viewed
            </button>
            <button className="rounded-md bg-transparent px-4 py-2 text-sm font-medium text-white hover:bg-white/10">
              New Releases
            </button>
            <button className="rounded-md bg-transparent px-4 py-2 text-sm font-medium text-white hover:bg-white/10">
              Limited Editions
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredNFTs.map((nft) => (
            <GalleryItem
              key={nft.id}
              imageUrl={nft.imageUrl}
              name={nft.name}
              artist={nft.artist}
              collection={nft.collection}
              rarity={nft.rarity}
            />
          ))}
        </div>
      </section>

      {/* Collections Showcase */}
      <section className="mt-16">
        <h2 className="mb-8 text-2xl font-bold">Popular Collections</h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-lg bg-white/5 p-6 backdrop-blur-sm">
            <div className="mb-4 flex items-center gap-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-lg"></div>
              <div>
                <h3 className="text-xl font-bold">TileVille Builders</h3>
                <p className="text-sm text-gray-300">By TileVille Studios</p>
              </div>
            </div>
            <p className="mb-4 text-gray-300">
              Strategic city-building NFTs that grant unique advantages in the
              TileVille game ecosystem.
            </p>
            <div className="flex gap-4">
              <div className="flex-1 rounded-md bg-primary/10 p-3">
                <span className="block text-xs text-gray-300">Floor Price</span>
                <span className="font-bold text-white">3.5 MINA</span>
              </div>
              <div className="flex-1 rounded-md bg-primary/10 p-3">
                <span className="block text-xs text-gray-300">Items</span>
                <span className="font-bold text-white">500</span>
              </div>
              <div className="flex-1 rounded-md bg-primary/10 p-3">
                <span className="block text-xs text-gray-300">Owners</span>
                <span className="font-bold text-white">253</span>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white/5 p-6 backdrop-blur-sm">
            <div className="mb-4 flex items-center gap-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-lg"></div>
              <div>
                <h3 className="text-xl font-bold">MinaPunks</h3>
                <p className="text-sm text-gray-300">By Crypto Voxel</p>
              </div>
            </div>
            <p className="mb-4 text-gray-300">
              The first-ever generative pixel art collection on Mina blockchain
              with unique attributes.
            </p>
            <div className="flex gap-4">
              <div className="flex-1 rounded-md bg-primary/10 p-3">
                <span className="block text-xs text-gray-300">Floor Price</span>
                <span className="font-bold text-white">5.2 MINA</span>
              </div>
              <div className="flex-1 rounded-md bg-primary/10 p-3">
                <span className="block text-xs text-gray-300">Items</span>
                <span className="font-bold text-white">350</span>
              </div>
              <div className="flex-1 rounded-md bg-primary/10 p-3">
                <span className="block text-xs text-gray-300">Owners</span>
                <span className="font-bold text-white">172</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Artist Spotlight */}
      <section className="mt-16">
        <h2 className="mb-8 text-2xl font-bold">Artist Spotlight</h2>

        <div className="relative h-80 w-full overflow-hidden rounded-xl">
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent"></div>
          <div className="absolute left-0 top-0 flex h-full max-w-md flex-col justify-center p-6 md:p-10">
            <span className="mb-4 inline-block w-fit rounded-full bg-white/20 px-3 py-1 text-sm font-bold text-white">
              Featured Artist
            </span>
            <h2 className="mb-3 text-3xl font-bold text-white">PixelWarrior</h2>
            <p className="mb-6 text-gray-200">
              Digital artist pioneering the intersection of pixel art and
              blockchain technology.
            </p>
            <div className="flex gap-3">
              <Link
                href="/artists/pixelwarrior"
                className="inline-block rounded-md bg-white/20 px-6 py-2 font-bold text-white hover:bg-white/30"
              >
                View Profile
              </Link>
              <Link
                href="/marketplace?artist=pixelwarrior"
                className="inline-block rounded-md bg-primary px-6 py-2 font-bold text-white hover:bg-primary/80"
              >
                View NFTs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="mt-16 rounded-xl bg-gradient-to-r from-primary/20 to-green-900/20 py-12 text-center">
        <h2 className="mb-4 text-3xl font-bold">
          Ready to start your NFT journey?
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-gray-300">
          Join thousands of collectors and creators on TileVille and explore the
          future of digital ownership.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/marketplace"
            className="inline-block rounded-md bg-primary px-8 py-3 font-bold text-white hover:bg-primary/80"
          >
            Browse Marketplace
          </Link>
          <Link
            href="/nft-tutorial"
            className="inline-block rounded-md bg-white/10 px-8 py-3 font-bold text-white hover:bg-white/20"
          >
            Learn About NFTs
          </Link>
        </div>
      </section>
    </div>
  );
}
