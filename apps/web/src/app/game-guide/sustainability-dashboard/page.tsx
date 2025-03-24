"use client";
import React, { useState, useEffect } from "react";

// Sample data - in a real implementation, this would come from a database or API
const mockCommunityData = {
  totalCarbonSaved: 1258693,
  totalRenewableEnergy: 876432,
  totalGreenSpaces: 532891,
  globalRanking: 12,
  totalCities: 48392,
  monthlyStats: [
    {
      month: "Jan",
      carbonSaved: 78934,
      renewableEnergy: 53421,
      greenSpaces: 32145,
    },
    {
      month: "Feb",
      carbonSaved: 82145,
      renewableEnergy: 58934,
      greenSpaces: 35421,
    },
    {
      month: "Mar",
      carbonSaved: 95421,
      renewableEnergy: 62145,
      greenSpaces: 38934,
    },
    {
      month: "Apr",
      carbonSaved: 103934,
      renewableEnergy: 68421,
      greenSpaces: 42145,
    },
    {
      month: "May",
      carbonSaved: 112145,
      renewableEnergy: 72934,
      greenSpaces: 45421,
    },
    {
      month: "Jun",
      carbonSaved: 125421,
      renewableEnergy: 78934,
      greenSpaces: 48934,
    },
  ],
  cityTypes: [
    { name: "Green Cities", value: 42 },
    { name: "Balanced Cities", value: 28 },
    { name: "Industrial Cities", value: 18 },
    { name: "High-Tech Cities", value: 12 },
  ],
  sustainabilityScores: [
    { name: "Solar Adoption", score: 86 },
    { name: "Wind Energy", score: 72 },
    { name: "Water Conservation", score: 91 },
    { name: "Green Spaces", score: 83 },
    { name: "Public Transport", score: 78 },
    { name: "Waste Management", score: 88 },
  ],
};

const personalMockData = {
  carbonSaved: 12583,
  renewableEnergyProduced: 8764,
  greenSpacesCreated: 5328,
  ranking: 428,
  totalCities: 5213,
  monthlyStats: [
    { month: "Jan", carbonSaved: 789, renewableEnergy: 534, greenSpaces: 321 },
    { month: "Feb", carbonSaved: 821, renewableEnergy: 589, greenSpaces: 354 },
    { month: "Mar", carbonSaved: 954, renewableEnergy: 621, greenSpaces: 389 },
    { month: "Apr", carbonSaved: 1039, renewableEnergy: 684, greenSpaces: 421 },
    { month: "May", carbonSaved: 1121, renewableEnergy: 729, greenSpaces: 454 },
    { month: "Jun", carbonSaved: 1254, renewableEnergy: 789, greenSpaces: 489 },
  ],
  sustainabilityScores: [
    { name: "Solar Adoption", score: 78 },
    { name: "Wind Energy", score: 65 },
    { name: "Water Conservation", score: 88 },
    { name: "Green Spaces", score: 92 },
    { name: "Public Transport", score: 71 },
    { name: "Waste Management", score: 83 },
  ],
  recentAchievements: [
    { name: "Carbon Neutral Builder", date: "2023-06-12", points: 500 },
    { name: "Green Energy Champion", date: "2023-05-28", points: 350 },
    { name: "Parks Master", date: "2023-04-15", points: 250 },
  ],
};

const formatLargeNumber = (num: number) => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  } else if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num;
};

export default function SustainabilityDashboard() {
  const [activeTab, setActiveTab] = useState("personal");
  const [personalData, setPersonalData] = useState(personalMockData);
  const [communityData, setCommunityData] = useState(mockCommunityData);

  // In a real implementation, you would fetch data here
  useEffect(() => {
    // Simulating data fetch with the mock data
    setPersonalData(personalMockData);
    setCommunityData(mockCommunityData);
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-10 text-center">
        <h1 className="mb-4 text-4xl font-bold text-primary">
          Sustainability Impact Dashboard
        </h1>
        <p className="mx-auto max-w-3xl text-xl text-gray-300">
          Track your environmental impact and see how your city building choices
          are creating a more sustainable virtual world.
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-10 flex justify-center">
        <div className="flex space-x-4 rounded-lg bg-gray-800 p-1">
          <button
            onClick={() => setActiveTab("personal")}
            className={`rounded-md px-6 py-3 transition ${
              activeTab === "personal"
                ? "bg-primary text-white"
                : "text-gray-300 hover:bg-gray-700"
            }`}
          >
            Personal Impact
          </button>
          <button
            onClick={() => setActiveTab("community")}
            className={`rounded-md px-6 py-3 transition ${
              activeTab === "community"
                ? "bg-primary text-white"
                : "text-gray-300 hover:bg-gray-700"
            }`}
          >
            Community Impact
          </button>
        </div>
      </div>

      {activeTab === "personal" ? (
        <>
          {/* Personal Impact Stats */}
          <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-xl bg-gray-800 p-6 shadow-lg">
              <div className="mb-4 flex items-center">
                <div className="mr-4 rounded-full bg-green-500 bg-opacity-20 p-3">
                  <svg
                    className="h-8 w-8 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm text-gray-400">Carbon Saved</h3>
                  <p className="text-3xl font-bold">
                    {formatLargeNumber(personalData.carbonSaved)} kg
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-400">
                Equivalent to planting 524 trees
              </p>
            </div>

            <div className="rounded-xl bg-gray-800 p-6 shadow-lg">
              <div className="mb-4 flex items-center">
                <div className="mr-4 rounded-full bg-yellow-500 bg-opacity-20 p-3">
                  <svg
                    className="h-8 w-8 text-yellow-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm text-gray-400">Renewable Energy</h3>
                  <p className="text-3xl font-bold">
                    {formatLargeNumber(personalData.renewableEnergyProduced)}{" "}
                    kWh
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-400">
                Powering 321 virtual homes
              </p>
            </div>

            <div className="rounded-xl bg-gray-800 p-6 shadow-lg">
              <div className="mb-4 flex items-center">
                <div className="mr-4 rounded-full bg-blue-500 bg-opacity-20 p-3">
                  <svg
                    className="h-8 w-8 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm text-gray-400">Green Spaces</h3>
                  <p className="text-3xl font-bold">
                    {formatLargeNumber(personalData.greenSpacesCreated)} m²
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-400">
                Equal to 12 football fields
              </p>
            </div>
          </div>

          {/* Rankings */}
          <div className="mb-10 rounded-xl bg-gray-800 p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-bold">
              Your Sustainability Ranking
            </h2>
            <div className="flex flex-col items-center justify-between md:flex-row">
              <div className="relative mb-6 h-48 w-48 md:mb-0">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-4xl font-bold text-primary">
                      {personalData.ranking}
                    </p>
                    <p className="text-sm text-gray-400">
                      of {formatLargeNumber(personalData.totalCities)} cities
                    </p>
                  </div>
                </div>
                <svg viewBox="0 0 36 36" className="h-full w-full">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#444"
                    strokeWidth="1"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#00C49F"
                    strokeWidth="3"
                    strokeDasharray={`${
                      100 -
                      (personalData.ranking / personalData.totalCities) * 100
                    }, 100`}
                  />
                </svg>
              </div>
              <div className="w-full md:w-3/4">
                <div className="h-8 w-full overflow-hidden rounded-full bg-gray-700">
                  <div
                    className="h-full bg-gradient-to-r from-green-500 to-blue-500"
                    style={{
                      width: `${
                        100 -
                        (personalData.ranking / personalData.totalCities) * 100
                      }%`,
                    }}
                  ></div>
                </div>
                <div className="mt-2 flex justify-between text-sm text-gray-400">
                  <span>Top 1%</span>
                  <span>Top 25%</span>
                  <span>Top 50%</span>
                  <span>All Cities</span>
                </div>
                <p className="mt-4 text-center">
                  You are in the{" "}
                  <span className="font-bold text-primary">
                    top{" "}
                    {Math.round(
                      (personalData.ranking / personalData.totalCities) * 100
                    )}
                    %
                  </span>{" "}
                  of most sustainable city builders
                </p>
              </div>
            </div>
          </div>

          {/* Personal Charts */}

          {/* Recent Achievements */}
          <div className="rounded-xl bg-gray-800 p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-bold">
              Recent Sustainability Achievements
            </h2>
            <div className="space-y-4">
              {personalData.recentAchievements.map((achievement, index) => (
                <div
                  key={index}
                  className="flex items-center rounded-lg bg-gray-700 p-4"
                >
                  <div className="mr-4 rounded-full bg-primary bg-opacity-20 p-3">
                    <svg
                      className="h-6 w-6 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold">{achievement.name}</h3>
                    <p className="text-sm text-gray-400">
                      {new Date(achievement.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="rounded-full bg-primary bg-opacity-20 px-2 py-1 text-sm text-primary">
                      +{achievement.points} points
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-6 w-full rounded-lg bg-gray-700 py-3 transition hover:bg-gray-600">
              View All Achievements
            </button>
          </div>
        </>
      ) : (
        <>
          {/* Community Impact Stats */}
          <div className="mb-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="rounded-xl bg-gray-800 p-6 shadow-lg">
              <h2 className="mb-4 text-xl font-bold">Total Community Impact</h2>
              <div className="space-y-6">
                <div>
                  <div className="mb-1 flex justify-between">
                    <span className="text-gray-400">Carbon Saved</span>
                    <span className="font-bold">
                      {formatLargeNumber(communityData.totalCarbonSaved)} kg
                    </span>
                  </div>
                  <div className="h-2.5 w-full rounded-full bg-gray-700">
                    <div
                      className="h-2.5 rounded-full bg-green-500"
                      style={{ width: "85%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="mb-1 flex justify-between">
                    <span className="text-gray-400">Renewable Energy</span>
                    <span className="font-bold">
                      {formatLargeNumber(communityData.totalRenewableEnergy)}{" "}
                      kWh
                    </span>
                  </div>
                  <div className="h-2.5 w-full rounded-full bg-gray-700">
                    <div
                      className="h-2.5 rounded-full bg-yellow-500"
                      style={{ width: "72%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="mb-1 flex justify-between">
                    <span className="text-gray-400">Green Spaces</span>
                    <span className="font-bold">
                      {formatLargeNumber(communityData.totalGreenSpaces)} m²
                    </span>
                  </div>
                  <div className="h-2.5 w-full rounded-full bg-gray-700">
                    <div
                      className="h-2.5 rounded-full bg-blue-500"
                      style={{ width: "65%" }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="mt-6 border-t border-gray-700 pt-6">
                <p className="text-center">
                  <span className="mb-1 block text-3xl font-bold text-primary">
                    #{communityData.globalRanking}
                  </span>
                  <span className="text-sm text-gray-400">
                    Global Community Ranking
                  </span>
                </p>
                <p className="mt-4 text-center text-sm text-gray-400">
                  Out of {communityData.totalCities.toLocaleString()} virtual
                  cities built worldwide
                </p>
              </div>
            </div>
          </div>

          {/* Community Goals & Challenges */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="rounded-xl bg-gray-800 p-6 shadow-lg">
              <h2 className="mb-4 text-xl font-bold">Community Challenges</h2>
              <div className="space-y-4">
                <div className="rounded-lg bg-gray-700 p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="font-bold">100M Carbon Challenge</h3>
                    <span className="rounded bg-yellow-600 px-2 py-1 text-xs text-white">
                      In Progress
                    </span>
                  </div>
                  <p className="mb-3 text-sm text-gray-300">
                    Work together to save 100 million kg of carbon by building
                    sustainable energy solutions.
                  </p>
                  <div className="mb-1 h-2.5 w-full rounded-full bg-gray-600">
                    <div
                      className="h-2.5 rounded-full bg-green-500"
                      style={{ width: "75%" }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>75,623,471 kg saved</span>
                    <span>Goal: 100,000,000 kg</span>
                  </div>
                </div>

                <div className="rounded-lg bg-gray-700 p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="font-bold">Green Space Revolution</h3>
                    <span className="rounded bg-green-600 px-2 py-1 text-xs text-white">
                      Completed
                    </span>
                  </div>
                  <p className="mb-3 text-sm text-gray-300">
                    Create 50 million square meters of green spaces across all
                    TileVille cities.
                  </p>
                  <div className="mb-1 h-2.5 w-full rounded-full bg-gray-600">
                    <div
                      className="h-2.5 rounded-full bg-green-500"
                      style={{ width: "100%" }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>53,289,142 m² created</span>
                    <span>Goal: 50,000,000 m²</span>
                  </div>
                </div>

                <div className="rounded-lg bg-gray-700 p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="font-bold">Renewable Energy Drive</h3>
                    <span className="rounded bg-blue-600 px-2 py-1 text-xs text-white">
                      Starting Soon
                    </span>
                  </div>
                  <p className="text-sm text-gray-300">
                    Launch in 2 days: Work together to generate 200 million kWh
                    of renewable energy.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-gray-800 p-6 shadow-lg">
              <h2 className="mb-4 text-xl font-bold">
                Global Sustainability Leaderboard
              </h2>
              <div className="overflow-hidden">
                <table className="min-w-full">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-left">Rank</th>
                      <th className="px-4 py-2 text-left">Builder</th>
                      <th className="px-4 py-2 text-left">City Name</th>
                      <th className="px-4 py-2 text-right">Impact Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-green-500 bg-opacity-20">
                      <td className="px-4 py-3 font-bold">1</td>
                      <td className="px-4 py-3">EcoVisionary</td>
                      <td className="px-4 py-3">Eden 2.0</td>
                      <td className="px-4 py-3 text-right font-bold">98.7</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-bold">2</td>
                      <td className="px-4 py-3">GreenTech</td>
                      <td className="px-4 py-3">New Solaris</td>
                      <td className="px-4 py-3 text-right font-bold">97.2</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-bold">3</td>
                      <td className="px-4 py-3">FutureBuilder</td>
                      <td className="px-4 py-3">Aqua Haven</td>
                      <td className="px-4 py-3 text-right font-bold">95.8</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-bold">4</td>
                      <td className="px-4 py-3">SkyGardener</td>
                      <td className="px-4 py-3">Vertical Eden</td>
                      <td className="px-4 py-3 text-right font-bold">94.1</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-bold">5</td>
                      <td className="px-4 py-3">SolarQueen</td>
                      <td className="px-4 py-3">Helios City</td>
                      <td className="px-4 py-3 text-right font-bold">93.5</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <button className="mt-6 w-full rounded-lg bg-gray-700 py-2 text-sm transition hover:bg-gray-600">
                View Full Leaderboard
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
