// src/app/showcase/page.tsx
import React from "react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "TileVille City Showcase",
  description:
    "Explore the most impressive city builds from the TileVille community",
};

// Sample featured cities data (in a real implementation, this would come from a database)
const featuredCities = [
  {
    id: "neo-atlantis",
    title: "Neo Atlantis",
    creator: "CryptoArchitect",
    creatorUsername: "cryptoarchitect",
    description:
      "A futuristic floating city powered entirely by renewable energy with innovative water management systems.",
    image: "/img/showcase/city1.jpg",
    score: 9850,
    likes: 742,
    competition: "Eco Cities Challenge",
    tags: ["Futuristic", "Sustainable", "Water"],
  },
  {
    id: "emerald-valley",
    title: "Emerald Valley",
    creator: "GreenBuilder",
    creatorUsername: "greenbuilder",
    description:
      "A harmonious blend of urban development and lush landscapes, featuring extensive park systems and green rooftops.",
    image: "/img/showcase/city2.jpg",
    score: 9720,
    likes: 683,
    competition: "Green Expansion Tournament",
    tags: ["Green", "Parks", "Balanced"],
  },
  {
    id: "nova-metropolis",
    title: "Nova Metropolis",
    creator: "UrbanVisioneer",
    creatorUsername: "urbanvisioneer",
    description:
      "A densely populated urban marvel with efficient public transportation and thoughtfully planned residential zones.",
    image: "/img/showcase/city3.jpg",
    score: 9650,
    likes: 621,
    competition: "Urban Density Championship",
    tags: ["Urban", "Transport", "Residential"],
  },
  {
    id: "solarium",
    title: "Solarium",
    creator: "SunSeeker",
    creatorUsername: "sunseeker",
    description:
      "A desert city that harnesses solar energy with innovative designs that minimize water usage while maximizing comfort.",
    image: "/img/showcase/city4.jpg",
    score: 9580,
    likes: 597,
    competition: "Harsh Environment Adaptation",
    tags: ["Desert", "Solar", "Efficient"],
  },
  {
    id: "coastal-haven",
    title: "Coastal Haven",
    creator: "SeaBreeze",
    creatorUsername: "seabreeze",
    description:
      "A beautiful coastal city with storm-resistant infrastructure and innovative marine resource management.",
    image: "/img/showcase/city5.jpg",
    score: 9510,
    likes: 562,
    competition: "Coastal Resilience Challenge",
    tags: ["Coastal", "Resilient", "Tourism"],
  },
  {
    id: "mountain-citadel",
    title: "Mountain Citadel",
    creator: "AlpineBuilder",
    creatorUsername: "alpinebuilder",
    description:
      "A city built into mountainous terrain with vertical transportation systems and sustainable energy from hydropower.",
    image: "/img/showcase/city6.jpg",
    score: 9480,
    likes: 534,
    competition: "Elevation Masters",
    tags: ["Mountain", "Vertical", "Hydro"],
  },
];

// Sample showcase categories
const categories = [
  "All Cities",
  "Competition Winners",
  "Most Liked",
  "Eco-friendly",
  "High Density",
  "Creative Designs",
  "Urban Planning Excellence",
];

export default function ShowcasePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-16 text-center">
        <h1 className="mb-4 text-4xl font-bold text-primary md:text-5xl">
          City Showcase Gallery
        </h1>
        <p className="mx-auto max-w-3xl text-xl text-gray-300">
          Explore the most impressive city builds from the TileVille community.
          Get inspired and see whats possible!
        </p>
      </div>

      {/* Hero showcase */}
      <div className="mb-16 overflow-hidden rounded-xl bg-gradient-to-r from-indigo-900 to-purple-900 shadow-xl">
        <div className="flex flex-col md:flex-row">
          <div className="relative h-96 md:w-3/5">
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="mb-2 flex items-center">
                <span className="mr-2 rounded-full bg-primary px-3 py-1 text-sm font-semibold text-white">
                  Featured Build
                </span>
                <span className="rounded-full bg-gray-800 bg-opacity-70 px-3 py-1 text-sm text-white">
                  Competition Winner
                </span>
              </div>
              <h2 className="text-3xl font-bold text-white">Crystal Gardens</h2>
              <p className="text-gray-200">
                By{" "}
                <Link
                  href="/u/crystalbuilder"
                  className="text-primary hover:underline"
                >
                  CrystalBuilder
                </Link>
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center p-8 md:w-2/5">
            <div className="mb-6">
              <h3 className="mb-3 text-2xl font-bold">About this City</h3>
              <p className="text-gray-300">
                Crystal Gardens is a revolutionary approach to urban living,
                combining vertical gardens, crystal-inspired architecture, and
                water recycling systems. This city won the Grand Prize in the
                2025 Sustainable Future Competition with a record-breaking
                score.
              </p>
            </div>
            <div className="mb-6 grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-black bg-opacity-30 p-4 text-center">
                <p className="text-sm text-gray-400">Score</p>
                <p className="text-2xl font-bold text-primary">10,000</p>
              </div>
              <div className="rounded-lg bg-black bg-opacity-30 p-4 text-center">
                <p className="text-sm text-gray-400">Likes</p>
                <p className="text-2xl font-bold text-primary">832</p>
              </div>
            </div>
            <Link
              href="/showcase/crystal-gardens"
              className="hover:bg-primary-dark rounded-lg bg-primary px-6 py-3 text-center font-bold text-white transition duration-300"
            >
              Explore This City
            </Link>
          </div>
        </div>
      </div>

      {/* Categories filter */}
      <div className="mb-12 overflow-x-auto">
        <div className="flex min-w-max space-x-2">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`whitespace-nowrap rounded-full px-4 py-2 ${
                index === 0
                  ? "bg-primary text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery grid */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {featuredCities.map((city) => (
          <div
            key={city.id}
            className="overflow-hidden rounded-xl bg-gray-800 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:transform hover:shadow-2xl"
          >
            <div className="relative h-56">
              <div className="absolute right-0 top-0 m-3 rounded bg-black bg-opacity-60 px-3 py-1 text-sm text-white">
                Score: {city.score}
              </div>
            </div>
            <div className="p-6">
              <h3 className="mb-1 text-xl font-bold text-white">
                {city.title}
              </h3>
              <p className="mb-3 text-gray-400">
                By{" "}
                <Link
                  href={`/u/${city.creatorUsername}`}
                  className="text-primary hover:underline"
                >
                  {city.creator}
                </Link>
                {city.competition && (
                  <>
                    {" "}
                    • <span>{city.competition}</span>
                  </>
                )}
              </p>
              <p className="mb-4 text-gray-300">{city.description}</p>

              <div className="mb-4 flex flex-wrap gap-2">
                {city.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="rounded bg-gray-700 px-2 py-1 text-xs text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-1 h-5 w-5 text-red-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-300">{city.likes}</span>
                </div>
                <Link
                  href={`/showcase/${city.id}`}
                  className="rounded bg-gray-700 px-4 py-2 text-white transition duration-300 hover:bg-gray-600"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Call to action */}
      <div className="mt-16 text-center">
        <h2 className="mb-4 text-2xl font-bold">
          Ready to showcase your own city?
        </h2>
        <p className="mx-auto mb-6 max-w-2xl">
          Build your masterpiece in TileVille and submit it to our showcase
          gallery. Get feedback from the community and maybe even win prizes!
        </p>
        <Link
          href="/competitions"
          className="hover:bg-primary-dark inline-block rounded-lg bg-primary px-8 py-3 font-bold text-white transition duration-300"
        >
          Start Building Now
        </Link>
      </div>
    </div>
  );
}
