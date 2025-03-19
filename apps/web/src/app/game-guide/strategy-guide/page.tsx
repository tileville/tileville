import React from "react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "TileVille Strategy Guide | Master City Building",
  description:
    "Comprehensive strategy guide for TileVille. Learn expert tips, resource management techniques, and winning strategies for building successful cities.",
};

export default function StrategyGuidePage() {
  return (
    <div className="container mx-auto mt-20 max-w-4xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold text-primary md:text-4xl">
        TileVille Strategy Guide
      </h1>
      <div className="prose prose-lg prose-invert max-w-none">
        <div className="mb-8 rounded-lg bg-gray-800 p-4 text-white">
          <h2 className="text-xl font-semibold text-primary">
            Table of Contents
          </h2>
          <ul className="ml-6 mt-2 list-disc space-y-1">
            <li>
              <a href="#basics" className="text-blue-400 hover:underline">
                Game Basics
              </a>
            </li>
            <li>
              <a href="#resources" className="text-blue-400 hover:underline">
                Resource Management
              </a>
            </li>
            <li>
              <a href="#layouts" className="text-blue-400 hover:underline">
                Optimal City Layouts
              </a>
            </li>
            <li>
              <a href="#buildings" className="text-blue-400 hover:underline">
                Strategic Building Placement
              </a>
            </li>
            <li>
              <a
                href="#sustainability"
                className="text-blue-400 hover:underline"
              >
                Sustainability Tips
              </a>
            </li>
            <li>
              <a href="#competitions" className="text-blue-400 hover:underline">
                Competition Strategies
              </a>
            </li>
            <li>
              <a href="#pvp" className="text-blue-400 hover:underline">
                PVP Tactics
              </a>
            </li>
          </ul>
        </div>

        <section id="basics" className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-primary">Game Basics</h2>
          <p>
            TileVille is a strategic city-building game built on Mina Protocol
            that rewards planning, resource management, and sustainability. The
            core objective is to build a thriving, balanced city while
            maximizing your score.
          </p>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="rounded-lg bg-gray-800 p-4 text-white">
              <h3 className="mb-2 text-xl font-semibold text-primary">
                Scoring System
              </h3>
              <p>Your city score is determined by several factors:</p>
              <ul className="ml-6 mt-2 list-disc">
                <li>Population happiness</li>
                <li>Resource efficiency</li>
                <li>Environmental impact</li>
                <li>City aesthetics</li>
                <li>Infrastructure connectivity</li>
              </ul>
            </div>

            <div className="rounded-lg bg-gray-800 p-4 text-white">
              <h3 className="mb-2 text-xl font-semibold text-primary">
                Game Phases
              </h3>
              <ol className="ml-6 mt-2 list-decimal">
                <li>
                  <strong>Planning Phase</strong> - Survey the land, plan your
                  layout
                </li>
                <li>
                  <strong>Foundation Phase</strong> - Establish core
                  infrastructure
                </li>
                <li>
                  <strong>Expansion Phase</strong> - Grow your city
                  systematically
                </li>
                <li>
                  <strong>Optimization Phase</strong> - Fine-tune for maximum
                  score
                </li>
              </ol>
            </div>
          </div>
        </section>

        <section id="resources" className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-primary">
            Resource Management
          </h2>
          <p>
            Effective resource management is crucial for success in TileVille.
            Balance is key - ensuring you have adequate energy, water, and food
            while maintaining environmental sustainability.
          </p>

          <div className="mt-6 rounded-lg bg-gray-800 p-4 text-white">
            <h3 className="mb-2 text-xl font-semibold text-primary">
              Resource Priority Chart
            </h3>
            <div className="overflow-x-auto">
              <table className="mt-2 min-w-full">
                <thead>
                  <tr className="border-b border-gray-600">
                    <th className="py-2 text-left">Resource</th>
                    <th className="py-2 text-left">Early Game</th>
                    <th className="py-2 text-left">Mid Game</th>
                    <th className="py-2 text-left">Late Game</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-700">
                    <td className="py-2">Energy</td>
                    <td className="py-2">High Priority</td>
                    <td className="py-2">Medium Priority</td>
                    <td className="py-2">Optimization</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="py-2">Water</td>
                    <td className="py-2">High Priority</td>
                    <td className="py-2">High Priority</td>
                    <td className="py-2">Medium Priority</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="py-2">Food</td>
                    <td className="py-2">Medium Priority</td>
                    <td className="py-2">High Priority</td>
                    <td className="py-2">High Priority</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="py-2">Housing</td>
                    <td className="py-2">Medium Priority</td>
                    <td className="py-2">High Priority</td>
                    <td className="py-2">Strategic Expansion</td>
                  </tr>
                  <tr>
                    <td className="py-2">Green Space</td>
                    <td className="py-2">Low Priority</td>
                    <td className="py-2">Medium Priority</td>
                    <td className="py-2">High Priority</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="mb-2 text-xl font-semibold text-primary">
              Pro Tips:
            </h3>
            <ul className="ml-6 mt-2 list-disc">
              <li>
                Start with renewable energy sources to minimize long-term
                environmental impact
              </li>
              <li>
                Cluster similar buildings to improve efficiency and reduce
                infrastructure costs
              </li>
              <li>
                Maintain a 3:1 ratio of residential to commercial zones for
                optimal growth
              </li>
              <li>
                Invest early in water management to support future expansion
              </li>
            </ul>
          </div>
        </section>

        <section id="layouts" className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-primary">
            Optimal City Layouts
          </h2>
          <p>
            Your city layout is critical to maximizing efficiency and score.
            Here are some proven layouts that balance different priorities.
          </p>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="rounded-lg bg-gray-800 p-4 text-white">
              <h3 className="mb-2 text-xl font-semibold text-primary">
                Grid Layout
              </h3>
              <p className="mb-3">
                The classic approach focusing on efficiency and organization.
              </p>
              <ul className="ml-6 list-disc">
                <li>Benefits: Maximum space utilization, easy expansion</li>
                <li>
                  Drawbacks: Less aesthetic appeal, potential traffic congestion
                </li>
                <li>
                  Best for: High-score competitions, efficiency-focused players
                </li>
              </ul>
            </div>

            <div className="rounded-lg bg-gray-800 p-4 text-white">
              <h3 className="mb-2 text-xl font-semibold text-primary">
                Radial Layout
              </h3>
              <p className="mb-3">
                A circular design with central services and radiating
                residential zones.
              </p>
              <ul className="ml-6 list-disc">
                <li>
                  Benefits: Aesthetically pleasing, excellent traffic flow
                </li>
                <li>Drawbacks: Less efficient space usage, complex planning</li>
                <li>Best for: Creative builds, sustainability focus</li>
              </ul>
            </div>

            <div className="rounded-lg bg-gray-800 p-4 text-white">
              <h3 className="mb-2 text-xl font-semibold text-primary">
                Satellite Layout
              </h3>
              <p className="mb-3">
                Multiple small, self-sufficient neighborhood clusters.
              </p>
              <ul className="ml-6 list-disc">
                <li>Benefits: Scalable, disaster-resistant, modular growth</li>
                <li>
                  Drawbacks: Requires more infrastructure, higher initial cost
                </li>
                <li>Best for: Long-term planning, balanced gameplay</li>
              </ul>
            </div>

            <div className="rounded-lg bg-gray-800 p-4 text-white">
              <h3 className="mb-2 text-xl font-semibold text-primary">
                Waterfront Layout
              </h3>
              <p className="mb-3">
                Optimized for maps with water features, maximizing waterfront
                property.
              </p>
              <ul className="ml-6 list-disc">
                <li>Benefits: Higher happiness scores, tourism boost</li>
                <li>Drawbacks: Limited expansion options, vulnerability</li>
                <li>Best for: Maps with significant water features</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="buildings" className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-primary">
            Strategic Building Placement
          </h2>
          <p>
            Where you place buildings relative to each other can dramatically
            impact their efficiency and your overall score.
          </p>

          <div className="mt-6 rounded-lg bg-gray-800 p-4 text-white">
            <h3 className="mb-2 text-xl font-semibold text-primary">
              Key Building Synergies
            </h3>
            <ul className="ml-6 mt-2 list-disc">
              <li>
                <strong>Windmills:</strong> Place in open areas with maximum
                wind exposure, away from tall buildings
              </li>
              <li>
                <strong>Residential Areas:</strong> Build near parks and
                amenities, but away from industrial zones
              </li>
              <li>
                <strong>Commercial Districts:</strong> Position centrally with
                good transportation access
              </li>
              <li>
                <strong>Parks and Recreation:</strong> Distribute throughout
                residential areas for maximum happiness
              </li>
              <li>
                <strong>Water Treatment:</strong> Place near water sources but
                downstream from residential areas
              </li>
            </ul>
          </div>

          <div className="mt-6">
            <h3 className="mb-2 text-xl font-semibold text-primary">
              Building Placement Donts:
            </h3>
            <ul className="ml-6 mt-2 list-disc">
              <li>
                Dont place industrial buildings adjacent to residential zones
              </li>
              <li>
                Avoid clustering too many high-energy buildings without adequate
                power
              </li>
              <li>
                Dont build water-intensive facilities in areas with limited
                water access
              </li>
              <li>
                Avoid creating traffic bottlenecks with poor road planning
              </li>
            </ul>
          </div>
        </section>

        <section id="sustainability" className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-primary">
            Sustainability Tips
          </h2>
          <p>
            TileVille rewards environmentally conscious city planning.
            Sustainability isnt just good for the planet—its good for your
            score.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-lg bg-gray-800 p-4 text-white">
              <h3 className="mb-2 text-lg font-semibold text-primary">
                Green Energy
              </h3>
              <p>
                Prioritize windmills and solar over coal plants. The initial
                cost is higher, but long-term benefits are substantial.
              </p>
            </div>

            <div className="rounded-lg bg-gray-800 p-4 text-white">
              <h3 className="mb-2 text-lg font-semibold text-primary">
                Water Conservation
              </h3>
              <p>
                Implement water recycling systems and place water-intensive
                buildings strategically near water sources.
              </p>
            </div>

            <div className="rounded-lg bg-gray-800 p-4 text-white">
              <h3 className="mb-2 text-lg font-semibold text-primary">
                Green Spaces
              </h3>
              <p>
                Incorporate parks and natural preserves throughout your city.
                They improve happiness and air quality scores.
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-lg bg-gray-800 p-4 text-white">
            <h3 className="mb-2 text-xl font-semibold text-primary">
              Sustainability Score Multipliers
            </h3>
            <p>
              The game applies the following multipliers based on your
              sustainability practices:
            </p>
            <div className="overflow-x-auto">
              <table className="mt-2 min-w-full">
                <thead>
                  <tr className="border-b border-gray-600">
                    <th className="py-2 text-left">Sustainability Level</th>
                    <th className="py-2 text-left">Score Multiplier</th>
                    <th className="py-2 text-left">Requirements</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-700">
                    <td className="py-2">Basic</td>
                    <td className="py-2">1.0x</td>
                    <td className="py-2">Default level</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="py-2">Green City</td>
                    <td className="py-2">1.2x</td>
                    <td className="py-2">
                      30%+ renewable energy, 20%+ green space
                    </td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="py-2">Eco-Friendly</td>
                    <td className="py-2">1.5x</td>
                    <td className="py-2">
                      50%+ renewable energy, 30%+ green space, water recycling
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2">Sustainable Utopia</td>
                    <td className="py-2">2.0x</td>
                    <td className="py-2">
                      90%+ renewable energy, 40%+ green space, complete
                      ecosystem
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section id="competitions" className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-primary">
            Competition Strategies
          </h2>
          <p>
            Competitions in TileVille often have specific objectives and time
            constraints. Adjust your strategy based on the competition type.
          </p>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="rounded-lg bg-gray-800 p-4 text-white">
              <h3 className="mb-2 text-xl font-semibold text-primary">
                Score-Based Competitions
              </h3>
              <ul className="ml-6 mt-2 list-disc">
                <li>Focus on high-value buildings early</li>
                <li>Prioritize efficiency over aesthetics</li>
                <li>Target sustainability multipliers</li>
                <li>Plan your entire city before building</li>
              </ul>
            </div>

            <div className="rounded-lg bg-gray-800 p-4 text-white">
              <h3 className="mb-2 text-xl font-semibold text-primary">
                Speed Challenges
              </h3>
              <ul className="ml-6 mt-2 list-disc">
                <li>Memorize optimal build sequences</li>
                <li>Focus on essential infrastructure only</li>
                <li>Skip aesthetic elements</li>
                <li>Practice time management</li>
              </ul>
            </div>

            <div className="rounded-lg bg-gray-800 p-4 text-white">
              <h3 className="mb-2 text-xl font-semibold text-primary">
                Themed Competitions
              </h3>
              <ul className="ml-6 mt-2 list-disc">
                <li>Read the theme guidelines carefully</li>
                <li>Balance theme compliance with scoring</li>
                <li>Find creative ways to incorporate theme elements</li>
                <li>Use Builder NFTs with relevant attributes</li>
              </ul>
            </div>

            <div className="rounded-lg bg-gray-800 p-4 text-white">
              <h3 className="mb-2 text-xl font-semibold text-primary">
                Long-Term Competitions
              </h3>
              <ul className="ml-6 mt-2 list-disc">
                <li>Plan for sustainable growth</li>
                <li>Build with expansion in mind</li>
                <li>Focus on buildings with long-term benefits</li>
                <li>Create a resilient infrastructure network</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="pvp" className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-primary">PVP Tactics</h2>
          <p>
            Player vs. Player challenges require a different approach than solo
            competitions. Heres how to outbuild your opponents.
          </p>

          <div className="mt-6 rounded-lg bg-gray-800 p-4 text-white">
            <h3 className="mb-2 text-xl font-semibold text-primary">
              PVP Checklist
            </h3>
            <ol className="ml-6 mt-2 list-decimal">
              <li>Analyze opponent history if available</li>
              <li>
                Choose Builder NFTs with advantages for the specific challenge
              </li>
              <li>Focus on quick, high-value wins rather than perfectionism</li>
              <li>Memorize optimal build patterns for common scenarios</li>
              <li>Practice speed building for time-constrained challenges</li>
            </ol>
          </div>

          <div className="mt-6 rounded-lg bg-gray-800 p-4 text-white">
            <h3 className="mb-2 text-xl font-semibold text-primary">
              Creating Successful PVP Challenges
            </h3>
            <ul className="ml-6 mt-2 list-disc">
              <li>Set appropriate entry fees to attract serious competitors</li>
              <li>Choose challenge duration based on complexity</li>
              <li>
                Consider using speed challenges for more dynamic competition
              </li>
              <li>Promote your challenge in the community section</li>
              <li>Share on social media with the provided sharing tools</li>
            </ul>
          </div>
        </section>

        <div className="mt-12 rounded-lg bg-gray-800  p-6 text-white">
          <h2 className="mb-4 text-2xl font-bold text-primary">
            Ready to Apply These Strategies?
          </h2>
          <p className="mb-4">
            Now that youre armed with these expert strategies, its time to put
            them into practice! Join a competition or create a PVP challenge to
            test your skills.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/competitions"
              className="rounded-lg bg-primary px-6 py-3 text-center font-bold text-white transition-all hover:bg-opacity-80"
            >
              Join a Competition
            </Link>
            <Link
              href="/pvp"
              className="rounded-lg bg-secondary px-6 py-3 text-center font-bold text-black  transition-all hover:bg-opacity-80"
            >
              Create PVP Challenge
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
