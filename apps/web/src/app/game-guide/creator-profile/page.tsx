import React from "react";
import Link from "next/link";

// Sample data - would normally come from your API or database
const creators = [
  {
    id: "tileville-studios",
    name: "TileVille Studios",
    avatarUrl: "/img/avatars/creator-1.jpg",
    coverUrl: "/img/creators/cover-1.jpg",
    bio: "The official studio behind TileVille NFTs, creating strategic city-building assets that enhance gameplay.",
    followers: 12480,
    collections: 3,
    items: 500,
    verified: true,
    featured: true,
  },
  {
    id: "pixelwarrior",
    name: "PixelWarrior",
    avatarUrl: "/img/avatars/creator-2.jpg",
    coverUrl: "/img/creators/cover-2.jpg",
    bio: "Digital artist specializing in pixel art and retro-inspired NFTs on the Mina blockchain.",
    followers: 8754,
    collections: 5,
    items: 127,
    verified: true,
    featured: true,
  },
  {
    id: "crypto-voxel",
    name: "Crypto Voxel",
    avatarUrl: "/img/avatars/creator-3.jpg",
    coverUrl: "/img/creators/cover-3.jpg",
    bio: "Voxel artist and creator of the MinaPunks collection, exploring the intersection of blockchain and 3D art.",
    followers: 5912,
    collections: 2,
    items: 350,
    verified: true,
    featured: false,
  },
  {
    id: "zeroknowledge",
    name: "ZeroKnowledge",
    avatarUrl: "/img/avatars/creator-4.jpg",
    coverUrl: "/img/creators/cover-4.jpg",
    bio: "Anonymous collective creating revolutionary privacy-focused NFT art on Mina.",
    followers: 7631,
    collections: 1,
    items: 100,
    verified: true,
    featured: false,
  },
  {
    id: "minacreator",
    name: "MinaCreator",
    avatarUrl: "/img/avatars/creator-5.jpg",
    coverUrl: "/img/creators/cover-5.jpg",
    bio: "Pioneering artist exploring the capabilities of Mina blockchain through innovative NFT collections.",
    followers: 4327,
    collections: 4,
    items: 215,
    verified: false,
    featured: false,
  },
  {
    id: "digital-dreamers",
    name: "Digital Dreamers",
    avatarUrl: "/img/avatars/creator-6.jpg",
    coverUrl: "/img/creators/cover-6.jpg",
    bio: "Collaborative studio creating immersive digital worlds and characters as collectible NFTs.",
    followers: 3865,
    collections: 2,
    items: 78,
    verified: false,
    featured: false,
  },
];

// Creator Card Component
const CreatorCard = ({
  id,
  name,
  bio,
  followers,
  collections,
  items,
}: {
  id: string;
  name: string;
  bio: string;
  followers: number;
  collections: number;
  items: number;
}) => (
  <div className="overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm transition-all hover:bg-white/10">
    <div className="relative px-6 pb-6">
      <div className="relative -mt-12 mb-4 h-24 w-24 overflow-hidden rounded-xl ring-4 ring-primary"></div>
      <h3 className="mb-1 text-xl font-bold">{name}</h3>
      <p className="mb-4 line-clamp-2 text-sm text-gray-300">{bio}</p>

      <div className="mb-4 flex text-sm text-gray-300">
        <div className="mr-6">
          <span className="block font-bold text-white">
            {followers.toLocaleString()}
          </span>
          <span>Followers</span>
        </div>
        <div className="mr-6">
          <span className="block font-bold text-white">{collections}</span>
          <span>Collections</span>
        </div>
        <div>
          <span className="block font-bold text-white">{items}</span>
          <span>Items</span>
        </div>
      </div>

      <Link
        href={`/creators/${id}`}
        className="inline-block w-full rounded-md bg-primary/20 px-4 py-2 text-center font-bold text-primary transition-colors hover:bg-primary/30"
      >
        View Profile
      </Link>
    </div>
  </div>
);

export default function CreatorProfiles() {
  const featuredCreators = creators.filter((creator) => creator.featured);
  const verifiedCreators = creators.filter(
    (creator) => creator.verified && !creator.featured
  );
  const otherCreators = creators.filter(
    (creator) => !creator.verified && !creator.featured
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold text-primary md:text-5xl">
          Creator Profiles
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-300">
          Discover the talented artists and studios behind your favorite NFT
          collections.
        </p>
      </div>

      {/* Featured Creators */}
      <section className="mb-16">
        <h2 className="mb-6 flex items-center text-2xl font-bold">
          <span className="text-primary">★</span>
          <span className="ml-2">Featured Creators</span>
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredCreators.map((creator) => (
            <CreatorCard
              key={creator.id}
              id={creator.id}
              name={creator.name}
              bio={creator.bio}
              followers={creator.followers}
              collections={creator.collections}
              items={creator.items}
            />
          ))}
        </div>
      </section>

      {/* Verified Creators */}
      <section className="mb-16">
        <h2 className="mb-6 flex items-center text-2xl font-bold">
          <span className="text-blue-400">✓</span>
          <span className="ml-2">Verified Creators</span>
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {verifiedCreators.map((creator) => (
            <CreatorCard
              key={creator.id}
              id={creator.id}
              name={creator.name}
              bio={creator.bio}
              followers={creator.followers}
              collections={creator.collections}
              items={creator.items}
            />
          ))}
        </div>
      </section>

      {/* Other Creators */}
      <section className="mb-16">
        <h2 className="mb-6 text-2xl font-bold">Emerging Creators</h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {otherCreators.map((creator) => (
            <CreatorCard
              key={creator.id}
              id={creator.id}
              name={creator.name}
              bio={creator.bio}
              followers={creator.followers}
              collections={creator.collections}
              items={creator.items}
            />
          ))}
        </div>
      </section>

      {/* Apply to be a Creator */}
      <section className="mt-16 rounded-xl bg-gradient-to-r from-primary/20 to-green-900/20 py-12 text-center">
        <h2 className="mb-4 text-3xl font-bold">Want to become a creator?</h2>
        <p className="mx-auto mb-8 max-w-2xl text-gray-300">
          Join our growing community of artists and launch your NFT collection
          on TileVille.
        </p>
        <Link
          href="/creators/apply"
          className="inline-block rounded-md bg-primary px-8 py-3 font-bold text-white hover:bg-primary/80"
        >
          Apply Now
        </Link>
      </section>
    </div>
  );
}
