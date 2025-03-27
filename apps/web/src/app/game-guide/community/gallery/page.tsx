import React from "react";
import Link from "next/link";

const BUILDER_NFTS = [
  {
    id: 1,
    name: "Master Builder Alex",
    imageUrl: "/img/nft-gallery/builder1.jpg",
    rarity: "Legendary",
    tier: "Diamond",
    sustainabilityRating: 6,
    efficiencyLevel: "Master",
    affinity: "Eco-Balancer",
    expertise: "Energy Grid Innovator",
    specialAbility: "Power Surge",
    description:
      "Master Builder Alex excels in creating energy-efficient city layouts with perfect infrastructure placement.",
  },
  {
    id: 2,
    name: "Architect Sarah",
    imageUrl: "/img/nft-gallery/builder2.jpg",
    rarity: "Epic",
    tier: "Platinum",
    sustainabilityRating: 5,
    efficiencyLevel: "Expert",
    affinity: "Tree Hugger",
    expertise: "Green Space Designer",
    specialAbility: "Green Thumb",
    description:
      "Sarah specializes in integrating natural elements into urban environments for maximum sustainability.",
  },
  {
    id: 3,
    name: "Urban Planner Marcus",
    imageUrl: "/img/nft-gallery/builder3.jpg",
    rarity: "Rare",
    tier: "Gold",
    sustainabilityRating: 4,
    efficiencyLevel: "Proficient",
    affinity: "Water Guardian",
    expertise: "Residential Developer",
    specialAbility: "Home Sweet Home",
    description:
      "Marcus creates harmonious residential areas with efficient space utilization and community focus.",
  },
  {
    id: 4,
    name: "Engineer Priya",
    imageUrl: "/img/nft-gallery/builder4.jpg",
    rarity: "Uncommon",
    tier: "Silver",
    sustainabilityRating: 3,
    efficiencyLevel: "Proficient",
    affinity: "Wind Whisperer",
    expertise: "Energy Grid Innovator",
    specialAbility: "Power Surge",
    description:
      "Priya focuses on innovative energy solutions that maximize output with minimal environmental impact.",
  },
  {
    id: 5,
    name: "Landscape Designer Jordan",
    imageUrl: "/img/nft-gallery/builder5.jpg",
    rarity: "Rare",
    tier: "Gold",
    sustainabilityRating: 4,
    efficiencyLevel: "Expert",
    affinity: "Tree Hugger",
    expertise: "Green Space Designer",
    specialAbility: "Green Thumb",
    description:
      "Jordan transforms urban spaces into green sanctuaries that improve air quality and citizen happiness.",
  },
  {
    id: 6,
    name: "Transit Specialist Ravi",
    imageUrl: "/img/nft-gallery/builder6.jpg",
    rarity: "Uncommon",
    tier: "Silver",
    sustainabilityRating: 3,
    efficiencyLevel: "Proficient",
    affinity: "Eco-Balancer",
    expertise: "Street Specialist",
    specialAbility: "Rapid Transit",
    description:
      "Ravi designs transportation networks that reduce congestion and minimize environmental impact.",
  },
  {
    id: 7,
    name: "Hydrologist Emma",
    imageUrl: "/img/nft-gallery/builder7.jpg",
    rarity: "Epic",
    tier: "Platinum",
    sustainabilityRating: 5,
    efficiencyLevel: "Expert",
    affinity: "Water Guardian",
    expertise: "Green Space Designer",
    specialAbility: "Aqua Boost",
    description:
      "Emma specializes in water conservation and management systems for sustainable urban development.",
  },
  {
    id: 8,
    name: "Agricultural Specialist Liam",
    imageUrl: "/img/nft-gallery/builder8.jpg",
    rarity: "Rare",
    tier: "Gold",
    sustainabilityRating: 4,
    efficiencyLevel: "Expert",
    affinity: "Soil Cultivator",
    expertise: "Agricultural Planner",
    specialAbility: "Green Thumb",
    description:
      "Liam creates urban farming systems that enhance food security and community engagement.",
  },
  {
    id: 9,
    name: "Energy Specialist Nova",
    imageUrl: "/img/nft-gallery/builder9.jpg",
    rarity: "Legendary",
    tier: "Diamond",
    sustainabilityRating: 6,
    efficiencyLevel: "Master",
    affinity: "Wind Whisperer",
    expertise: "Energy Grid Innovator",
    specialAbility: "Power Surge",
    description:
      "Nova revolutionizes city energy infrastructure with cutting-edge renewable technology integration.",
  },
];

const RARITY_COLORS = {
  Legendary: {
    bg: "bg-yellow-500/20",
    text: "text-yellow-500",
    border: "border-yellow-500/50",
  },
  Epic: {
    bg: "bg-purple-500/20",
    text: "text-purple-500",
    border: "border-purple-500/50",
  },
  Rare: {
    bg: "bg-blue-500/20",
    text: "text-blue-500",
    border: "border-blue-500/50",
  },
  Uncommon: {
    bg: "bg-green-500/20",
    text: "text-green-500",
    border: "border-green-500/50",
  },
};

export default function NFTBuilderGallery() {
  return (
    <div className="mx-auto max-w-[1200px] p-4 pb-20 pt-20">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-primary md:text-5xl">
          TileVille Builder NFT Gallery
        </h1>
        <p className="mt-4 text-lg">
          Explore our collection of unique builders with special abilities
        </p>
      </div>

      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          <button className="flex items-center gap-1 rounded-md border border-primary/50 bg-primary/10 px-4 py-2 text-sm font-medium text-primary"></button>
          <button className="flex items-center gap-1 rounded-md border border-primary/50 bg-primary/10 px-4 py-2 text-sm font-medium text-primary"></button>
          <div className="rounded-md border border-primary/50 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <select className="bg-transparent outline-none">
              <option>All Abilities</option>
              <option>Power Surge</option>
              <option>Green Thumb</option>
              <option>Aqua Boost</option>
              <option>Rapid Transit</option>
              <option>Home Sweet Home</option>
            </select>
          </div>
        </div>

        <div className="rounded-md bg-primary/10 px-3 py-1 text-sm">
          Showing {BUILDER_NFTS.length} builders
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {BUILDER_NFTS.map((builder) => (
          <div key={builder.id}>
            <div className="relative aspect-square">
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <p className="text-center text-lg font-medium text-white">
                  {builder.name}
                </p>
              </div>

              <div>
                <span>{builder.rarity}</span>
              </div>
            </div>

            <div className="p-4">
              <h3 className="mb-2 text-xl font-bold">{builder.name}</h3>
              <p className="mb-4 text-sm text-gray-600">
                {builder.description}
              </p>

              <div className="mb-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-600">
                    Tier:
                  </span>
                  <span className="text-sm font-semibold">{builder.tier}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-600">
                    Sustainability:
                  </span>
                  <div className="flex">
                    {Array(6)
                      .fill(0)
                      .map((_, i) => (
                        <span
                          key={i}
                          className={`h-4 w-4 ${
                            i < builder.sustainabilityRating
                              ? "text-yellow-500"
                              : "text-gray-300"
                          }`}
                        >
                          ★
                        </span>
                      ))}
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-600">
                    Efficiency:
                  </span>
                  <span className="text-sm font-semibold">
                    {builder.efficiencyLevel}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <div>
                  <span className="block text-xs font-semibold">
                    SPECIAL ABILITY
                  </span>
                  <span>{builder.specialAbility}</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-md bg-primary/10 px-3 py-2">
                    <span className="block text-xs">AFFINITY</span>
                    <span className="text-sm font-medium">
                      {builder.affinity}
                    </span>
                  </div>
                  <div className="rounded-md bg-primary/10 px-3 py-2">
                    <span className="block text-xs">EXPERTISE</span>
                    <span className="truncate text-sm font-medium">
                      {builder.expertise}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-lg border border-primary bg-primary/10 p-6 text-center">
        <h2 className="mb-4 text-2xl font-bold text-primary">
          Ready to Build Your City?
        </h2>
        <p className="mb-6">
          Collect these unique Builder NFTs to enhance your city-building
          capabilities
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/marketplace"
            className="inline-block rounded-md bg-primary px-6 py-3 font-bold text-white hover:bg-primary/90"
          >
            Browse Marketplace
          </Link>
          <Link
            href="/traits-info"
            className="inline-block rounded-md border border-primary bg-transparent px-6 py-3 font-bold text-primary hover:bg-primary/10"
          >
            Learn About Traits
          </Link>
        </div>
      </div>
    </div>
  );
}
