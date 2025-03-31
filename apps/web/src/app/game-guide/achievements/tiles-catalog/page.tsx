import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "TileVille Tiles Catalog",
  description: "Explore all available tile types in TileVille",
};

const tileCategories = [
  {
    id: "residential",
    name: "Residential",
    description: "Tiles for housing your city's population",
    color: "bg-blue-50 border-blue-200",
    tiles: [
      {
        id: "small_house",
        name: "Small House",
        description: "A cozy home for a small family. Provides basic population growth.",
        effects: ["+2 Population", "+1 Happiness if near Park"],
        variants: 3,
      },
      {
        id: "apartment_block",
        name: "Apartment Block",
        description: "Multi-story apartment building. Efficient use of space for population growth.",
        effects: ["+10 Population", "+5 Density", "-1 Environment if overcrowded"],
        variants: 2,
      },
      {
        id: "luxury_condo",
        name: "Luxury Condominium",
        description: "High-end residential building with premium amenities.",
        effects: ["+6 Population", "+8 Economy", "+4 Happiness", "Needs water access"],
        variants: 1,
      },
      {
        id: "eco_housing",
        name: "Eco Housing",
        description: "Environmentally friendly residential units with sustainability features.",
        effects: ["+4 Population", "+5 Environment", "+3 Happiness", "Bonus near green spaces"],
        variants: 2,
      },
    ],
  },
  {
    id: "commercial",
    name: "Commercial",
    description: "Business and retail tiles that drive economic growth",
    color: "bg-yellow-50 border-yellow-200",
    tiles: [
      {
        id: "small_shop",
        name: "Small Shop",
        description: "A local store serving neighborhood needs. Provides basic economic growth.",
        effects: ["+3 Economy", "+1 Jobs", "Better near Residential"],
        variants: 4,
      },
      {
        id: "marketplace",
        name: "Marketplace",
        description: "A bustling commerce center with multiple vendors.",
        effects: ["+8 Economy", "+4 Jobs", "+2 Happiness", "Needs road access"],
        variants: 1,
      },
      {
        id: "office_building",
        name: "Office Building",
        description: "Corporate office space for business activities.",
        effects: ["+12 Economy", "+8 Jobs", "-2 Environment", "Needs power"],
        variants: 2,
      },
      {
        id: "shopping_mall",
        name: "Shopping Mall",
        description: "Large retail complex with multiple stores and amenities.",
        effects: ["+15 Economy", "+6 Jobs", "+5 Happiness", "-4 Traffic if poorly placed"],
        variants: 1,
      },
    ],
  },
  {
    id: "infrastructure",
    name: "Infrastructure",
    description: "Essential services and utilities to support your city",
    color: "bg-gray-50 border-gray-200",
    tiles: [
      {
        id: "road",
        name: "Road",
        description: "Basic transportation route connecting city elements.",
        effects: ["+2 Connectivity", "Required for many buildings"],
        variants: 6,
      },
      {
        id: "power_plant",
        name: "Power Plant",
        description: "Generates electricity for your city's needs.",
        effects: ["+20 Power", "-8 Environment", "Powers 40 tiles"],
        variants: 2,
      },
      {
        id: "water_tower",
        name: "Water Tower",
        description: "Stores and provides water for city use.",
        effects: ["+15 Water", "Services 30 tiles"],
        variants: 1,
      },
      {
        id: "solar_farm",
        name: "Solar Farm",
        description: "Clean energy source using solar panels.",
        effects: ["+12 Power", "+5 Environment", "Powers 25 tiles", "No pollution"],
        variants: 1,
      },
    ],
  },
  {
    id: "environmental",
    name: "Environmental",
    description: "Green spaces and natural features to improve quality of life",
    color: "bg-green-50 border-green-200",
    tiles: [
      {
        id: "small_park",
        name: "Small Park",
        description: "A modest green space for recreation.",
        effects: ["+5 Environment", "+3 Happiness", "Increases value of adjacent Residential"],
        variants: 3,
      },
      {
        id: "lake",
        name: "Lake",
        description: "Natural water body enhancing city beauty and sustainability.",
        effects: ["+10 Environment", "+5 Happiness", "+3 Water", "Increases nearby property values"],
        variants: 2,
      },
      {
        id: "forest",
        name: "Forest",
        description: "Dense woodland area providing ecological benefits.",
        effects: ["+12 Environment", "+2 Happiness", "-2 Pollution in city"],
        variants: 2,
      },
      {
        id: "community_garden",
        name: "Community Garden",
        description: "Collaborative green space for growing food and community building.",
        effects: ["+4 Environment", "+6 Happiness", "+2 Food", "Improves nearby Residential tiles"],
        variants: 2,
      },
    ],
  },
  {
    id: "special",
    name: "Special",
    description: "Unique tiles with powerful effects",
    color: "bg-purple-50 border-purple-200",
    tiles: [
      {
        id: "city_hall",
        name: "City Hall",
        description: "Administrative center of your city.",
        effects: [
          "+10 Administrative Efficiency",
          "+5 Happiness",
          "Required for city expansion",
          "Only one allowed per city",
        ],
        variants: 1,
      },
      {
        id: "landmark",
        name: "Landmark",
        description: "Iconic structure that becomes a symbol of your city.",
        effects: ["+15 Tourism", "+10 Happiness", "+8 City Prestige"],
        variants: 4,
      },
      {
        id: "research_center",
        name: "Research Center",
        description: "Facility dedicated to technological advancement.",
        effects: ["+12 Innovation", "+8 Technology Level", "Unlocks advanced tiles"],
        variants: 1,
      },
      {
        id: "smart_grid",
        name: "Smart Grid",
        description: "Advanced power management system improving city efficiency.",
        effects: ["+20% Power Efficiency", "+5 Technology Level", "Reduces power consumption"],
        variants: 1,
      },
    ],
  },
];

export default function TilesCatalogPage() {
  return (
    <div className="mx-auto max-w-4xl p-6">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold text-primary">TileVille Tiles Catalog</h1>
        <p className="text-gray-600">
          Explore all the different tiles available to build your perfect city
        </p>
      </div>

      <div className="mb-8 rounded-lg bg-primary/10 p-6">
        <h2 className="mb-4 text-xl font-semibold">Understanding Tile Effects</h2>
        <p className="mb-4">
          Each tile in TileVille affects your city differently. Understanding these effects is key to building an optimal city layout.
        </p>
        <ul className="ml-6 list-disc space-y-2">
          <li>
            <span className="font-medium">Adjacency bonuses</span> - Many tiles get bonuses when placed next to complementary tile types
          </li>
          <li>
            <span className="font-medium">Service radius</span> - Utilities and services affect tiles within a certain distance
          </li>
          <li>
            <span className="font-medium">Negative effects</span> - Some tiles may have drawbacks that need to be mitigated
          </li>
          <li>
            <span className="font-medium">Variants</span> - Many tiles have multiple visual styles with the same functionality
          </li>
        </ul>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {tileCategories.map((category) => (
          <a
            key={category.id}
            href={`#${category.id}`}
            className={`rounded-md border px-3 py-1 text-sm font-medium transition hover:bg-opacity-80 ${category.color}`}
          >
            {category.name}
          </a>
        ))}
      </div>

      {tileCategories.map((category) => (
        <section key={category.id} id={category.id} className="mb-12 scroll-mt-16">
          <div className={`mb-6 rounded-lg border p-4 ${category.color}`}>
            <h2 className="text-2xl font-bold">{category.name} Tiles</h2>
            <p className="text-gray-700">{category.description}</p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {category.tiles.map((tile) => (
              <div key={tile.id} className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{tile.name}</h3>
                  <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs">
                    {tile.variants} variant{tile.variants > 1 ? "s" : ""}
                  </span>
                </div>
                <p className="mb-3 text-sm text-gray-600">{tile.description}</p>
                <div className="mb-2 text-sm font-medium">Effects:</div>
                <ul className="ml-5 list-disc text-sm text-gray-700">
                  {tile.effects.map((effect, index) => (
                    <li key={index}>{effect}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      ))}

      <div className="mt-10 rounded-lg bg-primary/10 p-6 text-center">
        <h2 className="mb-4 text-xl font-semibold">Ready to put your knowledge to use?</h2>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/gameplay-guide" className="rounded-md border border-primary px-6 py-2 font-semibold text-primary hover:bg-primary/10">
            Read Gameplay Guide
          </Link>
          <Link href="/competitions" className="rounded-md bg-primary px-6 py-2 font-semibold text-white hover:bg-primary/90">
            Join a Competition
          </Link>
        </div>
      </div>
    </div>
  );
}