import React from "react";
import Link from "next/link";

const SUSTAINABILITY_CONCEPTS = [
  {
    id: "renewable-energy",
    title: "Renewable Energy Integration",
    description:
      "Integrating renewable energy sources like solar, wind, and geothermal power into urban infrastructure to reduce carbon emissions and dependence on fossil fuels.",
    gameApproach:
      "In TileVille, strategically place wind farms in high elevation areas and solar panels in open spaces for maximum energy production.",
    icon: "☀️",
  },
  {
    id: "green-spaces",
    title: "Urban Green Spaces",
    description:
      "Incorporating parks, community gardens, and green corridors to improve air quality, reduce urban heat island effect, and enhance biodiversity in cities.",
    gameApproach:
      "Distribute parks throughout your TileVille city to improve environmental scores and citizen happiness. Create green corridors connecting larger park areas.",
    icon: "🌳",
  },
  {
    id: "water-management",
    title: "Smart Water Management",
    description:
      "Implementing rainwater harvesting, greywater recycling, and permeable surfaces to conserve water resources and prevent flooding in urban areas.",
    gameApproach:
      "Balance water features with proper drainage infrastructure in your TileVille designs to maintain water quality scores.",
    icon: "💧",
  },
  {
    id: "transportation",
    title: "Sustainable Transportation",
    description:
      "Designing cities around public transit, bicycle infrastructure, and walkable neighborhoods to reduce car dependency and associated emissions.",
    gameApproach:
      "Create efficient street layouts that promote connectivity while minimizing resource usage. Place residential zones near amenities.",
    icon: "🚲",
  },
  {
    id: "waste-reduction",
    title: "Zero Waste Systems",
    description:
      "Developing circular economy approaches to waste management through composting, recycling, and designing out waste from urban systems.",
    gameApproach:
      "Allocate space for recycling centers and ensure they are strategically positioned to serve multiple residential areas efficiently.",
    icon: "♻️",
  },
  {
    id: "local-food",
    title: "Urban Agriculture",
    description:
      "Integrating food production into the urban environment through rooftop gardens, vertical farming, and community agriculture spaces.",
    gameApproach:
      "Incorporate urban farms and community gardens in your TileVille design to boost food security and community engagement scores.",
    icon: "🌱",
  },
  {
    id: "smart-buildings",
    title: "Energy-Efficient Buildings",
    description:
      "Designing structures with passive heating/cooling, green roofs, and smart energy systems to minimize resource consumption.",
    gameApproach:
      'Select energy-efficient residential and commercial tiles that contribute to your city"s overall sustainability rating.',
    icon: "🏢",
  },
  {
    id: "resilient-design",
    title: "Climate Resilience",
    description:
      "Preparing cities for climate impacts through flood protection, heat-resistant design, and diversified infrastructure systems.",
    gameApproach:
      "Design your TileVille cities with redundant systems and protective natural features to withstand environmental challenges.",
    icon: "🛡️",
  },
];

export default function SustainableCityConcepts() {
  return (
    <div className="mx-auto max-w-[1200px] p-4 pb-20 pt-20">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold text-primary md:text-5xl">
          Sustainable City Building
        </h1>
        <p className="mt-4 text-lg">
          Learn how real-world sustainability concepts are applied in TileVille
        </p>
      </div>

      <div className="mb-12 rounded-xl bg-primary/20 p-8">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="mb-4 text-2xl font-bold text-primary">
              Why Sustainability Matters
            </h2>
            <p className="mb-4">
              Cities account for over 70% of global carbon emissions while
              occupying just 2% of the Earths land. How we design and operate
              our urban environments has a tremendous impact on our planets
              future.
            </p>
            <p className="mb-4">
              TileVille gamifies sustainable urban planning to help players
              understand the complex balance between development, resource
              management, and environmental conservation.
            </p>
            <p>
              The concepts explored in TileVille are based on real-world
              sustainable urban development principles that architects, urban
              planners, and city officials implement today.
            </p>
          </div>
          <div className="relative aspect-video rounded-lg bg-black/20">
            {/* This would be replaced with an actual image in implementation */}
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-center text-xl font-medium text-white">
                Sustainable City Concept Image
              </p>
            </div>
          </div>
        </div>
      </div>

      <h2 className="mb-8 text-2xl font-bold text-primary">
        Key Sustainability Concepts
      </h2>

      <div className="grid gap-6 md:grid-cols-2">
        {SUSTAINABILITY_CONCEPTS.map((concept) => (
          <div
            key={concept.id}
            className="rounded-xl border border-primary/30 bg-white/5 p-6 backdrop-blur-sm"
          >
            <div className="mb-4 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-2xl">
                {concept.icon}
              </div>
              <h3 className="text-xl font-bold">{concept.title}</h3>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="mb-1 text-sm font-semibold uppercase text-primary">
                  Real World Concept
                </h4>
                <p className="text-sm">{concept.description}</p>
              </div>
              <div className="rounded-md bg-primary/10 p-4">
                <h4 className="mb-1 text-sm font-semibold uppercase text-primary">
                  In TileVille
                </h4>
                <p className="text-sm">{concept.gameApproach}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 rounded-xl border border-primary bg-primary/10 p-8">
        <h2 className="mb-4 text-center text-2xl font-bold text-primary">
          Learn By Building
        </h2>
        <p className="mb-6 text-center">
          The best way to understand sustainable urban planning is by trying it
          yourself. Join TileVille to put these concepts into practice!
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/guide"
            className="inline-block rounded-md bg-primary px-6 py-3 font-bold text-white hover:bg-primary/90"
          >
            Read Game Guide
          </Link>
          <Link
            href="/competitions"
            className="inline-block rounded-md border border-primary bg-transparent px-6 py-3 font-bold text-primary hover:bg-primary/10"
          >
            Enter a Competition
          </Link>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="mb-6 text-2xl font-bold text-primary">
          Further Reading
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          <a
            href="https://www.un.org/sustainabledevelopment/cities/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-primary/30 bg-white/5 p-4 transition-transform hover:scale-[1.02]"
          >
            <h3 className="mb-2 text-lg font-bold">
              UN Sustainable Development Goal 11
            </h3>
            <p className="text-sm">
              Sustainable Cities and Communities - Make cities inclusive, safe,
              resilient and sustainable.
            </p>
          </a>
          <a
            href="https://www.c40.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-primary/30 bg-white/5 p-4 transition-transform hover:scale-[1.02]"
          >
            <h3 className="mb-2 text-lg font-bold">C40 Cities</h3>
            <p className="text-sm">
              A network of the worlds megacities committed to addressing climate
              change.
            </p>
          </a>
          <a
            href="https://www.architecturaldigest.com/story/sustainable-cities"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-primary/30 bg-white/5 p-4 transition-transform hover:scale-[1.02]"
          >
            <h3 className="mb-2 text-lg font-bold">Sustainable Urban Design</h3>
            <p className="text-sm">
              Architectural approaches to creating environmentally responsible
              urban spaces.
            </p>
          </a>
        </div>
      </div>
    </div>
  );
}
