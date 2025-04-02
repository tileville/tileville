import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "TileVille Builder NFT Comparison",
  description:
    "Compare different Builder NFTs and their abilities in TileVille",
};

const builderNFTs = [
  {
    id: "eco-architect",
    name: "Eco Architect",
    sustainabilityRating: "Diamond",
    efficiencyLevel: "Expert",
    environmentalAffinity: "Tree Hugger",
    urbanPlanningExpertise: "Green Space Designer",
    specialAbility: "Green Thumb",
    description:
      "The Eco Architect specializes in creating environmentally sustainable cities with abundant green spaces. Their Green Thumb ability accelerates the growth of trees and parks.",
    bestFor: [
      "Players focused on environmental sustainability",
      "Creating beautiful green cities",
      "Maximizing happiness through natural surroundings",
    ],
    price: 75,
  },
  {
    id: "urban-developer",
    name: "Urban Developer",
    sustainabilityRating: "Gold",
    efficiencyLevel: "Master",
    environmentalAffinity: "Water Guardian",
    urbanPlanningExpertise: "Residential Developer",
    specialAbility: "Home Sweet Home",
    description:
      "The Urban Developer excels at creating optimal residential areas with high population satisfaction. Their Home Sweet Home ability enhances house placement efficiency.",
    bestFor: [
      "Players focused on population growth",
      "Creating well-planned residential districts",
      "Maximizing citizen happiness",
    ],
    price: 60,
  },
  {
    id: "energy-innovator",
    name: "Energy Innovator",
    sustainabilityRating: "Platinum",
    efficiencyLevel: "Expert",
    environmentalAffinity: "Wind Whisperer",
    urbanPlanningExpertise: "Energy Grid Innovator",
    specialAbility: "Power Surge",
    description:
      "The Energy Innovator specializes in optimizing power infrastructure. Their Power Surge ability significantly boosts the output of windmills and other renewable energy sources.",
    bestFor: [
      "Players focused on energy efficiency",
      "Creating self-sufficient cities",
      "Minimizing environmental impact while maintaining power",
    ],
    price: 65,
  },
  {
    id: "transport-planner",
    name: "Transport Planner",
    sustainabilityRating: "Silver",
    efficiencyLevel: "Master",
    environmentalAffinity: "Eco-Balancer",
    urbanPlanningExpertise: "Street Specialist",
    specialAbility: "Rapid Transit",
    description:
      "The Transport Planner excels at creating efficient road networks and transportation systems. Their Rapid Transit ability enables faster street connections throughout the city.",
    bestFor: [
      "Players focused on city connectivity",
      "Creating efficient traffic flow",
      "Managing large, sprawling cities",
    ],
    price: 50,
  },
  {
    id: "agricultural-master",
    name: "Agricultural Master",
    sustainabilityRating: "Gold",
    efficiencyLevel: "Proficient",
    environmentalAffinity: "Soil Cultivator",
    urbanPlanningExpertise: "Agricultural Planner",
    specialAbility: "Aqua Boost",
    description:
      "The Agricultural Master excels at food production and agricultural planning. Their Aqua Boost ability enhances water resource management for farms and agricultural districts.",
    bestFor: [
      "Players focused on self-sufficiency",
      "Creating productive farming areas",
      "Balancing food production with city growth",
    ],
    price: 55,
  },
];

function getRatingColor(rating: string) {
  switch (rating) {
    case "Diamond":
      return "text-blue-600";
    case "Platinum":
      return "text-indigo-600";
    case "Gold":
      return "text-yellow-600";
    case "Silver":
      return "text-gray-600";
    case "Bronze":
      return "text-amber-700";
    default:
      return "text-gray-800";
  }
}

function getEfficiencyColor(level: string) {
  switch (level) {
    case "Legendary":
      return "text-purple-600";
    case "Master":
      return "text-blue-600";
    case "Expert":
      return "text-teal-600";
    case "Proficient":
      return "text-green-600";
    case "Novice":
      return "text-gray-600";
    default:
      return "text-gray-800";
  }
}

export default function BuilderComparisonPage() {
  return (
    <div className="mx-auto max-w-4xl p-6">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold text-primary">
          Builder NFT Comparison
        </h1>
        <p className="text-gray-600">
          Compare different Builder NFTs and find the perfect one for your
          playstyle
        </p>
      </div>

      <div className="mb-8 rounded-lg bg-primary/10 p-6">
        <h2 className="mb-4 text-xl font-semibold">Builder NFT Benefits</h2>
        <p className="mb-4">
          Builder NFTs enhance your TileVille gameplay by providing special
          abilities, bonuses, and unique traits that give you advantages in
          different aspects of city building.
        </p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-md bg-white p-4 shadow-sm">
            <h3 className="mb-2 font-medium text-primary">
              Enhanced Abilities
            </h3>
            <p className="text-sm text-gray-700">
              Builders have specific talents that boost certain types of tiles
              and city elements.
            </p>
          </div>
          <div className="rounded-md bg-white p-4 shadow-sm">
            <h3 className="mb-2 font-medium text-primary">Unique Bonuses</h3>
            <p className="text-sm text-gray-700">
              Each Builder offers different bonuses based on their
              specialization and traits.
            </p>
          </div>
          <div className="rounded-md bg-white p-4 shadow-sm">
            <h3 className="mb-2 font-medium text-primary">
              Strategic Advantage
            </h3>
            <p className="text-sm text-gray-700">
              Choosing the right Builder for your playstyle can significantly
              improve your citys performance.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-8 overflow-hidden rounded-lg border border-gray-200 bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="p-4 text-left text-sm font-medium text-gray-500"
              >
                Builder
              </th>
              <th
                scope="col"
                className="p-4 text-left text-sm font-medium text-gray-500"
              >
                Sustainability
              </th>
              <th
                scope="col"
                className="p-4 text-left text-sm font-medium text-gray-500"
              >
                Efficiency
              </th>
              <th
                scope="col"
                className="p-4 text-left text-sm font-medium text-gray-500"
              >
                Special Ability
              </th>
              <th
                scope="col"
                className="p-4 text-left text-sm font-medium text-gray-500"
              >
                Price
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {builderNFTs.map((builder) => (
              <tr key={builder.id} className="hover:bg-gray-50">
                <td className="whitespace-nowrap p-4 text-sm font-medium">
                  {builder.name}
                </td>
                <td className="whitespace-nowrap p-4 text-sm">
                  <span
                    className={`font-medium ${getRatingColor(
                      builder.sustainabilityRating
                    )}`}
                  >
                    {builder.sustainabilityRating}
                  </span>
                </td>
                <td className="whitespace-nowrap p-4 text-sm">
                  <span
                    className={`font-medium ${getEfficiencyColor(
                      builder.efficiencyLevel
                    )}`}
                  >
                    {builder.efficiencyLevel}
                  </span>
                </td>
                <td className="whitespace-nowrap p-4 text-sm">
                  {builder.specialAbility}
                </td>
                <td className="whitespace-nowrap p-4 text-sm">
                  {builder.price} MINA
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mb-12 space-y-8">
        {builderNFTs.map((builder) => (
          <div
            key={builder.id}
            className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
          >
            <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold">{builder.name}</h3>
                <p className="text-gray-500">{builder.price} MINA</p>
              </div>
              <Link
                href="/marketplace"
                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
              >
                View in Marketplace
              </Link>
            </div>

            <p className="mb-4 text-gray-700">{builder.description}</p>

            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <span className="text-sm font-medium text-gray-500">
                  Sustainability Rating
                </span>
                <p
                  className={`font-medium ${getRatingColor(
                    builder.sustainabilityRating
                  )}`}
                >
                  {builder.sustainabilityRating}
                </p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">
                  Efficiency Level
                </span>
                <p
                  className={`font-medium ${getEfficiencyColor(
                    builder.efficiencyLevel
                  )}`}
                >
                  {builder.efficiencyLevel}
                </p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">
                  Environmental Affinity
                </span>
                <p className="font-medium">{builder.environmentalAffinity}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">
                  Urban Planning Expertise
                </span>
                <p className="font-medium">{builder.urbanPlanningExpertise}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">
                  Special Ability
                </span>
                <p className="font-medium">{builder.specialAbility}</p>
              </div>
            </div>

            <div>
              <span className="text-sm font-medium text-gray-500">
                Best For
              </span>
              <ul className="ml-6 mt-1 list-disc text-sm text-gray-700">
                {builder.bestFor.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-lg bg-primary/10 p-6 text-center">
        <h2 className="mb-4 text-xl font-semibold">
          Ready to choose your Builder?
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/marketplace"
            className="rounded-md bg-primary px-6 py-2 font-semibold text-white hover:bg-primary/90"
          >
            Browse Marketplace
          </Link>
          <Link
            href="/traits-info"
            className="rounded-md border border-primary px-6 py-2 font-semibold text-primary hover:bg-primary/10"
          >
            Learn About Traits
          </Link>
        </div>
      </div>
    </div>
  );
}
