import React from "react";
import Link from "next/link";

// This is a static showcase page that doesn't need DB connection
// In a real implementation, this data would come from a database
const FEATURED_CITIES = [
  {
    id: 1,
    name: "Emerald Haven",
    creator: "GreenBuilder",
    walletAddress: "B62qm8YHJAvZit7qRXwvmVTLsAwsX5GjRZ7APAtLmQZiPVAB5LjMdf8",
    description:
      "A sustainable city with focus on renewable energy and green spaces.",
    imageUrl: "/img/showcases/showcase1.jpg",
    score: 9820,
    likes: 142,
    competition: "Winter Build Challenge 2024",
  },
  {
    id: 2,
    name: "Solar Heights",
    creator: "SunMaster",
    walletAddress: "B62qs2NthDuxAT94tTFg6MtuaP1gaBxTZyNv9D3uQiQciy1VsaimNFT",
    description:
      "Maximized solar energy production with innovative city layout.",
    imageUrl: "/img/showcases/showcase2.jpg",
    score: 8740,
    likes: 98,
    competition: "Sustainability Cup 2024",
  },
  {
    id: 3,
    name: "Ocean Breeze",
    creator: "SeaBuilder",
    walletAddress: "B62qiXfVirdZ3F2XAjL8dpmkKGEqxBFC5HtQxZvMC5xtP4343SDXeNU",
    description:
      "Coastal city design with wind farms and waterfront residentials.",
    imageUrl: "/img/showcases/showcase3.jpg",
    score: 9150,
    likes: 124,
    competition: "Spring Build Challenge 2024",
  },
  {
    id: 4,
    name: "Mountain Vista",
    creator: "AlpineDev",
    walletAddress: "B62qqhL8xfHBpCUTk1Lco2Sq8HitFsDDNJraQG9qCtWwyvxcPADn4EV",
    description:
      "Alpine city with sustainable tourism and preserved natural beauty.",
    imageUrl: "/img/showcases/showcase4.jpg",
    score: 8930,
    likes: 112,
    competition: "Eco Tourism Challenge 2024",
  },
  {
    id: 5,
    name: "Desert Oasis",
    creator: "SandArchitect",
    walletAddress: "B62qkh5QbigkTTXF464h5k6GW76SHL7wejUbKxKy5vZ9qr9dEcowe6G",
    description: "Water conservation focused city in arid environment.",
    imageUrl: "/img/showcases/showcase5.jpg",
    score: 8650,
    likes: 105,
    competition: "Extreme Environment Build 2024",
  },
  {
    id: 6,
    name: "Urban Jungle",
    creator: "CityGardener",
    walletAddress: "B62qiXfVirdZ3F2XAjL8dpmkKGEqxBFC5HtQxZvMC5xtP4343SDXeNU",
    description:
      "Vertical gardens integrated throughout high-density urban development.",
    imageUrl: "/img/showcases/showcase6.jpg",
    score: 9340,
    likes: 131,
    competition: "Urban Innovation Challenge 2024",
  },
];

export default function CommunityShowcase() {
  return (
    <div className="mx-auto max-w-[1200px] p-4 pb-20 pt-20">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold text-primary md:text-5xl">
          TileVille Community Showcase
        </h1>
        <p className="mt-4 text-lg">
          Explore incredible city designs from our talented players
        </p>
      </div>

      <div className="mb-10 rounded-xl bg-primary/20 p-8">
        <h2 className="mb-6 text-2xl font-bold text-primary">
          Featured Build of the Month
        </h2>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="relative aspect-square overflow-hidden rounded-xl bg-black/10">
            {/* This would be replaced with actual top build image */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <p className="text-center text-xl font-bold text-white">
                Featured City Image
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-between">
            <div>
              <h3 className="mb-2 text-3xl font-bold">Emerald Haven</h3>
              <p className="mb-4 text-lg">
                By <span className="font-semibold">GreenBuilder</span>
              </p>
              <div className="mb-6 text-lg">
                <p className="mb-4">
                  A masterpiece of sustainable urban design. This city features
                  an intricate network of green corridors connecting residential
                  areas to parks and natural reserves. The energy system relies
                  100% on renewable sources, with wind farms positioned to
                  maximize output while minimizing noise impact on residents.
                </p>
                <p>
                  Innovative water management systems collect rainwater and
                  process greywater for irrigation, making this city remarkably
                  self-sufficient.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <div className="rounded-lg bg-primary/30 px-4 py-2">
                <p className="font-bold text-primary">Score: 9,820</p>
              </div>
              <div className="rounded-lg bg-primary/30 px-4 py-2">
                <p className="font-bold text-primary">
                  Competition: Winter Build Challenge
                </p>
              </div>
              <div className="rounded-lg bg-primary/30 px-4 py-2">
                <p className="font-bold text-primary">Likes: 142</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2 className="mb-6 text-2xl font-bold text-primary">
        Top Community Builds
      </h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {FEATURED_CITIES.map((city) => (
          <div
            key={city.id}
            className="overflow-hidden rounded-xl border border-primary/30 bg-white/5 backdrop-blur-sm"
          >
            <div className="relative aspect-video">
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <p className="text-center text-lg font-medium text-white">
                  {city.name}
                </p>
              </div>
            </div>
            <div className="p-4">
              <h3 className="mb-1 text-xl font-bold">{city.name}</h3>
              <p className="mb-3 text-sm">
                By <span className="font-medium">{city.creator}</span>
              </p>
              <p className="mb-4 text-sm">{city.description}</p>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-md bg-primary/20 px-2 py-1 text-xs">
                  Score: {city.score.toLocaleString()}
                </span>
                <span className="rounded-md bg-primary/20 px-2 py-1 text-xs">
                  Likes: {city.likes}
                </span>
                <span className="rounded-md bg-primary/20 px-2 py-1 text-xs">
                  {city.competition}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-lg border border-primary bg-primary/10 p-6 text-center">
        <h2 className="mb-4 text-2xl font-bold text-primary">
          Submit Your Own Creation
        </h2>
        <p className="mb-6">
          Join a competition, build an amazing city, and your creation could be
          featured here!
        </p>
        <Link
          href="/competitions"
          className="inline-block rounded-md bg-primary px-6 py-3 font-bold text-white hover:bg-primary/90"
        >
          Join a Competition
        </Link>
      </div>
    </div>
  );
}
