import React from "react";
import Link from "next/link";

const featuredCities = [
  {
    id: 1,
    name: "Neo Harmony",
    creator: "CryptoArchitect",
    walletAddress: "B62qm8YHJAvZit7qRXwvmVTLsAwsX5GjRZ7APAtLmQZiPVAB5LjMdf8",
    imageUrl: "/img/showcase/city1.png",
    likes: 278,
    score: 9850,
    tags: ["eco-city", "futuristic", "competition-winner"],
    description:
      "A harmonious blend of nature and technology, Neo Harmony features vertical gardens, solar highways, and community spaces interconnected through sustainable transportation networks.",
  },
  {
    id: 2,
    name: "Aqua Vista",
    creator: "WaterBuilder",
    walletAddress: "B62qs2NthDuxAT94tTFg6MtuaP1gaBxTZyNv9D3uQiQciy1VsaimNFT",
    imageUrl: "/img/showcase/city2.png",
    likes: 215,
    score: 8970,
    tags: ["water-focused", "coastal", "high-efficiency"],
    description:
      "Inspired by Venice and Singapore, this floating city design maximizes water management with innovative canal systems and aquaponic urban farms built into residential zones.",
  },
  {
    id: 3,
    name: "Mountain Haven",
    creator: "AlpineDesigner",
    walletAddress: "B62qiXfVirdZ3F2XAjL8dpmkKGEqxBFC5HtQxZvMC5xtP4343SDXeNU",
    imageUrl: "/img/showcase/city3.png",
    likes: 194,
    score: 8750,
    tags: ["mountain", "renewable", "tourism"],
    description:
      "Nestled between peaks, this alpine city uses geothermal energy and gravity-powered water systems to create a self-sufficient community that honors the natural landscape.",
  },
];

// Community submissions
const communityShares = [
  {
    id: 101,
    name: "Sunset Valley",
    creator: "SolarEngineer",
    walletAddress: "B62qm8YHJAvZit7qRXwvmVTLsAwsX5GjRZ7APAtLmQZiPVAB5LjMdf8",
    imageUrl: "/img/showcase/community1.png",
    likes: 156,
    score: 7650,
    date: "3 days ago",
    tags: ["solar-powered", "residential-focus", "valley"],
  },
  {
    id: 102,
    name: "Metro Heights",
    creator: "UrbanPlanner42",
    walletAddress: "B62qkh5QbigkTTXF464h5k6GW76SHL7wejUbKxKy5vZ9qr9dEcowe6G",
    imageUrl: "/img/showcase/community2.png",
    likes: 132,
    score: 7200,
    date: "5 days ago",
    tags: ["high-density", "transit-oriented", "commercial"],
  },
  {
    id: 103,
    name: "Green Meadows",
    creator: "EcoThinker",
    walletAddress: "B62qqhL8xfHBpCUTk1Lco2Sq8HitFsDDNJraQG9qCtWwyvxcPADn4EV",
    imageUrl: "/img/showcase/community3.png",
    likes: 118,
    score: 6950,
    date: "1 week ago",
    tags: ["agricultural", "suburban", "low-carbon"],
  },
  {
    id: 104,
    name: "Tech Harbor",
    creator: "FutureBuilder",
    walletAddress: "B62qiXfVirdZ3F2XAjL8dpmkKGEqxBFC5HtQxZvMC5xtP4343SDXeNU",
    imageUrl: "/img/showcase/community4.png",
    likes: 105,
    score: 6800,
    date: "1 week ago",
    tags: ["tech-hub", "coastal", "innovation"],
  },
  {
    id: 105,
    name: "Desert Oasis",
    creator: "SandArchitect",
    walletAddress: "B62qs2NthDuxAT94tTFg6MtuaP1gaBxTZyNv9D3uQiQciy1VsaimNFT",
    imageUrl: "/img/showcase/community5.png",
    likes: 96,
    score: 6500,
    date: "2 weeks ago",
    tags: ["desert", "water-conservation", "solar"],
  },
  {
    id: 106,
    name: "Forest Enclave",
    creator: "WoodlandBuilder",
    walletAddress: "B62qm8YHJAvZit7qRXwvmVTLsAwsX5GjRZ7APAtLmQZiPVAB5LjMdf8",
    imageUrl: "/img/showcase/community6.png",
    likes: 87,
    score: 6350,
    date: "2 weeks ago",
    tags: ["forest", "eco-tourism", "conservation"],
  },
];

// Available filter tags
const allTags = [
  "eco-city",
  "futuristic",
  "competition-winner",
  "water-focused",
  "coastal",
  "high-efficiency",
  "mountain",
  "renewable",
  "tourism",
  "solar-powered",
  "residential-focus",
  "valley",
  "high-density",
  "transit-oriented",
  "commercial",
  "agricultural",
  "suburban",
  "low-carbon",
  "tech-hub",
  "innovation",
  "desert",
  "water-conservation",
  "forest",
  "eco-tourism",
  "conservation",
];
export default function CityShowcasePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:py-20">
      <h1 className="mb-4 text-center text-3xl font-bold text-primary md:text-5xl">
        City Showcase Gallery
      </h1>
      <p className="mx-auto mb-10 max-w-2xl text-center">
        Explore the most impressive TileVille creations from our community. Get
        inspired by award-winning designs and share your own masterpiece to
        receive feedback and recognition.
      </p>

      <div className="relative mb-12 flex h-48 w-full items-center overflow-hidden rounded-xl bg-gradient-to-r from-primary/30 to-blue-900/30 backdrop-blur-sm">
        <div className="absolute inset-0 opacity-20"></div>
        <div className="relative flex w-full flex-col items-center justify-between px-8 md:flex-row">
          <div className="mb-4 md:mb-0">
            <h2 className="mb-2 text-2xl font-bold">Share Your City</h2>
            <p className="max-w-md">
              Proud of your TileVille creation? Submit your city to be featured
              in our community showcase!
            </p>
          </div>
          <button className="rounded-md bg-primary px-6 py-3 font-bold text-white transition-colors hover:bg-primary/80">
            Submit Your City
          </button>
        </div>
      </div>

      <section className="mb-16">
        <h2 className="mb-6 text-2xl font-bold text-primary">
          Featured Cities
        </h2>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {featuredCities.map((city) => (
            <div
              key={city.id}
              className="overflow-hidden rounded-xl bg-white/10 shadow-lg backdrop-blur-md transition-transform hover:scale-[1.02]"
            >
              <div className="relative h-64">
                <div className="absolute right-4 top-4 rounded-full bg-primary/80 px-2 py-1 text-xs font-bold text-white">
                  Featured
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <h3 className="text-xl font-bold text-white">{city.name}</h3>
                  <div className="flex items-center text-sm text-white/80">
                    <span>by</span>
                    <Link
                      href={`/u/${city.creator}`}
                      className="ml-1 font-medium hover:text-primary"
                    >
                      {city.creator}
                    </Link>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="mb-3 flex flex-wrap gap-2">
                  {city.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-primary/20 px-2 py-1 text-xs text-primary"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <p className="mb-4 text-sm">{city.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <svg
                        className="mr-1 h-5 w-5 text-red-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-sm">{city.likes}</span>
                    </div>
                    <div className="flex items-center">
                      <svg
                        className="mr-1 h-5 w-5 text-yellow-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-sm">{city.score}</span>
                    </div>
                  </div>
                  <Link
                    href={`/showcase/${city.id}`}
                    className="text-sm font-bold text-primary hover:underline"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div className="flex max-w-3xl flex-wrap gap-2">
            <span className="px-2 py-1 text-sm font-bold">Filter by:</span>
            {[
              "All",
              "eco-city",
              "coastal",
              "high-efficiency",
              "solar-powered",
              "mountain",
            ].map((tag) => (
              <button
                key={tag}
                className={`rounded-full px-2 py-1 text-xs ${
                  tag === "All"
                    ? "bg-primary text-white"
                    : "bg-white/10 hover:bg-white/20"
                }`}
              >
                {tag === "All" ? "All Cities" : `#${tag}`}
              </button>
            ))}
            <button className="flex items-center rounded-full bg-white/10 px-2 py-1 text-xs hover:bg-white/20">
              <span>More Filters</span>
              <svg
                className="ml-1 h-3 w-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-bold">Sort by:</span>
            <select className="rounded-md bg-white/10 px-2 py-1 text-sm">
              <option>Most Popular</option>
              <option>Highest Score</option>
              <option>Most Recent</option>
              <option>Alphabetical</option>
            </select>
          </div>
        </div>
      </section>

      {/* Community submissions grid */}
      <section className="mb-16">
        <h2 className="mb-6 text-2xl font-bold text-primary">
          Community Creations
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {communityShares.map((city) => (
            <div
              key={city.id}
              className="overflow-hidden rounded-xl bg-white/10 shadow-lg backdrop-blur-sm transition-all hover:translate-y-[-5px] hover:shadow-xl"
            >
              <div className="relative h-48"></div>
              <div className="p-4">
                <h3 className="mb-1 text-lg font-bold">{city.name}</h3>
                <div className="mb-3 flex items-center text-sm">
                  <span className="text-white/70">by</span>
                  <Link
                    href={`/u/${city.creator}`}
                    className="ml-1 font-medium hover:text-primary"
                  >
                    {city.creator}
                  </Link>
                  <span className="mx-2 text-white/40">•</span>
                  <span className="text-white/70">{city.date}</span>
                </div>
                <div className="mb-4 flex flex-wrap gap-2">
                  {city.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white/10 px-2 py-1 text-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center hover:text-red-500">
                      <svg
                        className="mr-1 h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                      <span className="text-sm">{city.likes}</span>
                    </button>
                    <div className="flex items-center">
                      <svg
                        className="mr-1 h-5 w-5 text-yellow-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-sm">{city.score}</span>
                    </div>
                  </div>
                  <Link
                    href={`/showcase/${city.id}`}
                    className="text-sm text-primary hover:underline"
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <button className="rounded-md bg-white/10 px-6 py-3 font-bold text-white transition-colors hover:bg-white/20">
            Load More Creations
          </button>
        </div>
      </section>

      <section className="mb-16 rounded-xl bg-white/10 p-6 shadow-lg backdrop-blur-md">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div>
            <h2 className="mb-2 text-2xl font-bold text-primary">
              Monthly Design Contest
            </h2>
            <p className="mb-4">
              Enter our monthly city design competition for a chance to win MINA
              tokens and have your city featured on our homepage!
            </p>
            <div className="mb-4">
              <h3 className="mb-1 font-bold">April Contest Theme:</h3>
              <p>Sustainable Transportation Systems</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-primary/20 px-4 py-2">
                <span className="block text-xs">Prize Pool</span>
                <span className="font-bold text-primary">5,000 MINA</span>
              </div>
              <div className="rounded-lg bg-primary/20 px-4 py-2">
                <span className="block text-xs">Submissions Close</span>
                <span className="font-bold">12 days</span>
              </div>
            </div>
          </div>
          <div className="md:text-right">
            <button className="mb-2 rounded-md bg-primary px-6 py-3 font-bold text-white transition-colors hover:bg-primary/80">
              Enter Contest
            </button>
            <p className="text-xs">
              Each player can submit one city design per month
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-6 text-2xl font-bold text-primary">
          Tips & Inspiration
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
            <h3 className="mb-2 font-bold">Optimize for Efficiency</h3>
            <p className="text-sm">
              Place your energy producers close to high-demand buildings to
              minimize transportation loss and maximize your citys efficiency
              score.
            </p>
          </div>
          <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
            <h3 className="mb-2 font-bold">Balance Is Key</h3>
            <p className="text-sm">
              A successful city needs a balanced mix of residential, commercial,
              and industrial zones. Pay attention to your population needs.
            </p>
          </div>
          <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
            <h3 className="mb-2 font-bold">Showcase Your Style</h3>
            <p className="text-sm">
              Dont just build for function — create a city with a distinct
              visual theme or architectural style to stand out in the showcase.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
