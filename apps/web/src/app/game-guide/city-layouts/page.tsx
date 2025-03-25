import React from "react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "TileVille City Layouts | Inspiration & Templates",
  description:
    "Explore inspiring city layouts for TileVille. Browse winning designs, efficient templates, and creative city plans to enhance your gameplay.",
};

export default function CityLayoutsPage() {
  return (
    <>
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <h1 className="mb-6 text-3xl font-bold text-primary md:text-4xl">
          TileVille City Layouts
        </h1>

        <div className="relative mb-8 h-64 w-full overflow-hidden rounded-lg">
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
            <p className="px-4 text-center text-2xl font-bold text-white md:text-3xl">
              Inspiration for Your Next Masterpiece
            </p>
          </div>
        </div>

        <div className="mb-8 rounded-lg bg-gray-800 p-6 text-white">
          <h2 className="mb-4 text-2xl font-bold text-primary">
            Why City Layout Matters
          </h2>
          <p className="mb-4">
            Your citys layout is more than just aesthetics—it directly impacts
            efficiency, citizen happiness, resource management, and ultimately
            your score. Whether youre a competitive player seeking high scores
            or a creative builder focused on beauty, finding the right layout
            approach is essential.
          </p>
          <p>
            Browse through our collection of layout templates, winning designs,
            and creative approaches to find inspiration for your next city
            build. Each layout includes strengths, weaknesses, and tips for
            implementation.
          </p>
        </div>

        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="overflow-hidden rounded-lg bg-gray-800 text-white">
            <div className="relative h-48 w-full"></div>
            <div className="p-4">
              <h3 className="mb-2 text-xl font-bold text-primary">
                Classic Grid Layout
              </h3>
              <p className="mb-3 text-gray-300">
                The most efficient layout for maximizing space usage and
                achieving high scores in competitions.
              </p>
              <div className="mb-4">
                <span className="mb-2 mr-2 inline-block rounded bg-green-900 px-2 py-1 text-xs text-green-300">
                  High Efficiency
                </span>
                <span className="mb-2 mr-2 inline-block rounded bg-green-900 px-2 py-1 text-xs text-green-300">
                  Easy Expansion
                </span>
                <span className="mb-2 mr-2 inline-block rounded bg-red-900 px-2 py-1 text-xs text-red-300">
                  Limited Space
                </span>
              </div>
              <button className="w-full rounded bg-primary px-4 py-2 font-bold text-white hover:bg-opacity-80">
                View Details
              </button>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg bg-gray-800 text-white">
            <div className="relative h-48 w-full"></div>
            <div className="p-4">
              <h3 className="mb-2 text-xl font-bold text-primary">
                Modular Self-Sufficient Clusters
              </h3>
              <p className="mb-3 text-gray-300">
                Create multiple self-contained neighborhoods that can function
                independently.
              </p>
              <div className="mb-4">
                <span className="mb-2 mr-2 inline-block rounded bg-green-900 px-2 py-1 text-xs text-green-300">
                  Highly Scalable
                </span>
                <span className="mb-2 mr-2 inline-block rounded bg-green-900 px-2 py-1 text-xs text-green-300">
                  Disaster Resistant
                </span>
                <span className="mb-2 mr-2 inline-block rounded bg-red-900 px-2 py-1 text-xs text-red-300">
                  Higher Infrastructure Cost
                </span>
              </div>
              <button className="w-full rounded bg-primary px-4 py-2 font-bold text-white hover:bg-opacity-80">
                View Details
              </button>
            </div>
          </div>
        </div>

        <h2 className="mb-6 text-2xl font-bold text-primary">
          Featured City Showcases
        </h2>

        <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="overflow-hidden rounded-lg bg-gray-800 text-white">
            <div className="relative h-64 w-full"></div>
            <div className="p-6">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-xl font-bold text-primary">
                  Emerald Valley
                </h3>
                <span className="rounded bg-yellow-600 px-2 py-1 text-xs text-yellow-100">
                  Competition Winner
                </span>
              </div>
              <p className="mb-4 text-gray-300">
                This award-winning city design by player CryptoArchitect
                combines a grid-based core with radial residential districts. It
                scored 98,742 points in the Spring 2024 Championship.
              </p>
              <div className="mb-4">
                <h4 className="mb-2 font-semibold text-white">Key Features:</h4>
                <ul className="ml-6 list-disc text-gray-300">
                  <li>Central business district with high-efficiency layout</li>
                  <li>Six residential petals with individual character</li>
                  <li>95% renewable energy sources</li>
                  <li>
                    Integrated waterway system for transportation and aesthetics
                  </li>
                </ul>
              </div>
              <button className="w-full rounded bg-primary px-4 py-2 font-bold text-white hover:bg-opacity-80">
                Study This Design
              </button>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg bg-gray-800 text-white">
            <div className="relative h-64 w-full"></div>
            <div className="p-6">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-xl font-bold text-primary">Azure Harbor</h3>
                <span className="rounded bg-yellow-600 px-2 py-1 text-xs text-yellow-100">
                  Featured Design
                </span>
              </div>
              <p className="mb-4 text-gray-300">
                Built by MinaMaster, this coastal city maximizes waterfront
                properties while maintaining exceptional sustainability scores.
                It demonstrates perfect integration with natural features.
              </p>
              <div className="mb-4">
                <h4 className="mb-2 font-semibold text-white">Key Features:</h4>
                <ul className="ml-6 list-disc text-gray-300">
                  <li>Tiered waterfront development with premium views</li>
                  <li>Extensive canal network for transportation</li>
                  <li>Hillside renewable energy farm</li>
                  <li>Green belt buffer zones between districts</li>
                </ul>
              </div>
              <button className="w-full rounded bg-primary px-4 py-2 font-bold text-white hover:bg-opacity-80">
                Study This Design
              </button>
            </div>
          </div>
        </div>

        <div className="mb-12 rounded-lg bg-gray-800 p-6 text-white">
          <h2 className="mb-4 text-2xl font-bold text-primary">
            Layout Planning Tools
          </h2>
          <p className="mb-6">
            Planning your city layout before building can save time and
            resources. Here are some tools to help you design your perfect city:
          </p>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-lg bg-gray-700 p-4">
              <h3 className="mb-2 text-lg font-semibold text-primary">
                TileVille Planner App
              </h3>
              <p className="mb-3 text-sm">
                Our official city planning tool lets you design layouts offline
                and import them directly into the game.
              </p>
              <button className="w-full rounded bg-secondary px-4 py-2 text-sm text-white hover:bg-opacity-80">
                Download Planner
              </button>
            </div>

            <div className="rounded-lg bg-gray-700 p-4">
              <h3 className="mb-2 text-lg font-semibold text-primary">
                Grid Paper Templates
              </h3>
              <p className="mb-3 text-sm">
                Old-school but effective! Download and print these gridded
                templates for manual planning.
              </p>
              <button className="w-full rounded bg-secondary px-4 py-2 text-sm text-white hover:bg-opacity-80">
                Download Templates
              </button>
            </div>

            <div className="rounded-lg bg-gray-700 p-4">
              <h3 className="mb-2 text-lg font-semibold text-primary">
                Community Layout Vault
              </h3>
              <p className="mb-3 text-sm">
                Browse and download community-created city layouts that you can
                adapt for your own use.
              </p>
              <button className="w-full rounded bg-secondary px-4 py-2 text-sm text-white hover:bg-opacity-80">
                Browse Layouts
              </button>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-primary">
            Layout Tips From Pro Players
          </h2>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="rounded-lg bg-gray-800 p-6 text-white">
              <div className="mb-4 flex items-center">
                <div className="relative mr-4 h-12 w-12 overflow-hidden rounded-full"></div>
                <div>
                  <h3 className="font-bold text-white">CryptoArchitect</h3>
                  <p className="text-sm text-gray-400">3x Competition Winner</p>
                </div>
              </div>
              <blockquote className="mb-4 italic text-gray-300">
                I always start by mapping the entire city on paper first.
                Planning your zoning before placing a single building will save
                you countless resources and prevent inefficient sprawl. Think 10
                steps ahead!
              </blockquote>
              <p className="text-sm text-gray-400">
                Key advice: Plan thoroughly, utilize paper sketches, focus on
                zoning first
              </p>
            </div>

            <div className="rounded-lg bg-gray-800 p-6 text-white">
              <div className="mb-4 flex items-center">
                <div className="relative mr-4 h-12 w-12 overflow-hidden rounded-full"></div>
                <div>
                  <h3 className="font-bold text-white">MinaMaster</h3>
                  <p className="text-sm text-gray-400">
                    Sustainability Champion
                  </p>
                </div>
              </div>
              <blockquote className="mb-4 italic text-gray-300">
                Dont be afraid to demolish and rebuild! Many players get
                attached to their initial layouts, but being flexible and
                willing to restructure when needed is what separates good
                builders from great ones.
              </blockquote>
              <p className="text-sm text-gray-400">
                Key advice: Stay flexible, iteratively improve, dont get
                attached to initial designs
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-gray-800 p-6 text-white">
          <h2 className="mb-4 text-2xl font-bold text-primary">
            Submit Your Layout
          </h2>
          <p className="mb-6">
            Have you created an exceptional city design youd like to share with
            the community? Submit your layout to be featured in our showcase!
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/community"
              className="rounded-lg bg-primary px-6 py-3 text-center font-bold text-white transition-all hover:bg-opacity-80"
            >
              Submit Your Design
            </Link>
            <Link
              href="/strategy-guide"
              className="rounded-lg bg-secondary px-6 py-3 text-center font-bold text-white transition-all hover:bg-opacity-80"
            >
              View Strategy Guide
            </Link>
          </div>
        </div>
      </div>
      <button className="w-full rounded bg-primary px-4 py-2 font-bold text-white hover:bg-opacity-80">
        View Details
      </button>

      <div className="overflow-hidden rounded-lg bg-gray-800 text-white">
        <div className="relative h-48 w-full"></div>
        <div className="p-4">
          <h3 className="mb-2 text-xl font-bold text-primary">
            Radial City Design
          </h3>
          <p className="mb-3 text-gray-300">
            A beautiful and natural-feeling design that creates an organic flow
            with excellent traffic management.
          </p>
          <div className="mb-4">
            <span className="mb-2 mr-2 inline-block rounded bg-green-900 px-2 py-1 text-xs text-green-300">
              High Aesthetics
            </span>
            <span className="mb-2 mr-2 inline-block rounded bg-green-900 px-2 py-1 text-xs text-green-300">
              Good Traffic Flow
            </span>
            <span className="mb-2 mr-2 inline-block rounded bg-red-900 px-2 py-1 text-xs text-red-300">
              Complex Planning
            </span>
          </div>
          <button className="w-full rounded bg-primary px-4 py-2 font-bold text-white hover:bg-opacity-80">
            View Details
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg bg-gray-800 text-white">
        <div className="relative h-48 w-full"></div>
        <div className="p-4">
          <h3 className="mb-2 text-xl font-bold text-primary">
            Eco-Focused Design
          </h3>
          <p className="mb-3 text-gray-300">
            Maximize sustainability scores with this green-oriented layout that
            prioritizes renewable energy and parks.
          </p>
          <div className="mb-4">
            <span className="mb-2 mr-2 inline-block rounded bg-green-900 px-2 py-1 text-xs text-green-300">
              High Sustainability
            </span>
            <span className="mb-2 mr-2 inline-block rounded bg-green-900 px-2 py-1 text-xs text-green-300">
              Score Multipliers
            </span>
            <span className="mb-2 mr-2 inline-block rounded bg-red-900 px-2 py-1 text-xs text-red-300">
              Lower Density
            </span>
          </div>
          <button className="w-full rounded bg-primary px-4 py-2 font-bold text-white hover:bg-opacity-80">
            View Details
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg bg-gray-800 text-white">
        <div className="relative h-48 w-full"></div>
        <div className="p-4">
          <h3 className="mb-2 text-xl font-bold text-primary">
            Specialized Districts
          </h3>
          <p className="mb-3 text-gray-300">
            Create focused zones for residential, commercial, industrial, and
            green spaces for maximum synergy.
          </p>
          <div className="mb-4">
            <span className="mb-2 mr-2 inline-block rounded bg-green-900 px-2 py-1 text-xs text-green-300">
              Building Synergies
            </span>
            <span className="mb-2 mr-2 inline-block rounded bg-green-900 px-2 py-1 text-xs text-green-300">
              Clear Organization
            </span>
            <span className="mb-2 mr-2 inline-block rounded bg-red-900 px-2 py-1 text-xs text-red-300">
              Long Travel Times
            </span>
          </div>
          <button className="w-full rounded bg-primary px-4 py-2 font-bold text-white hover:bg-opacity-80">
            View Details
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg bg-gray-800 text-white">
        <div className="relative h-48 w-full"></div>
        <div className="p-4">
          <h3 className="mb-2 text-xl font-bold text-primary">
            Waterfront Development
          </h3>
          <p className="mb-3 text-gray-300">
            Maximize happiness and tourism by focusing development along water
            features.
          </p>
          <div className="mb-4">
            <span className="mb-2 mr-2 inline-block rounded bg-green-900 px-2 py-1 text-xs text-green-300">
              High Happiness
            </span>
            <span className="mb-2 mr-2 inline-block rounded bg-green-900 px-2 py-1 text-xs text-green-300">
              Tourism Bonus
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
