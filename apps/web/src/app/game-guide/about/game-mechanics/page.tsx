export default function GameMechanicsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
          Game Mechanics
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-lg text-gray-500">
          Understanding how TileVille works
        </p>
      </div>

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {MECHANICS.map((mechanic) => (
          <div
            key={mechanic.title}
            className="rounded-lg border border-primary/20 bg-white p-6 shadow-sm"
          >
            <h2 className="mb-3 text-xl font-bold text-primary">
              {mechanic.title}
            </h2>
            <p className="text-gray-600">{mechanic.description}</p>

            {mechanic.details && (
              <ul className="mt-4 space-y-2">
                {mechanic.details.map((detail, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2 mt-1 text-primary">•</span>
                    <span className="text-sm text-gray-600">{detail}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-lg bg-primary/5 p-6">
        <p className="text-center text-sm text-gray-600">
          Game mechanics are subject to balancing changes and improvements based
          on player feedback and gameplay data.
        </p>
      </div>
    </div>
  );
}

const MECHANICS = [
  {
    title: "City Building",
    description:
      "Place various tiles to create a thriving city with efficient resource management and strategic planning.",
    details: [
      "Different zones (residential, commercial, industrial) generate different resources",
      "Building placement affects adjacency bonuses and transportation efficiency",
      "Balance resource production and consumption for optimal growth",
    ],
  },
  {
    title: "Resource Management",
    description:
      'Monitor and optimize your city"s resources to support growth and development.',
    details: [
      "Core resources include population, energy, water, and money",
      "Advanced resources unlock with city development",
      "Resource shortage penalties affect city performance",
    ],
  },
  {
    title: "NFT Builders",
    description:
      "Special characters that provide unique bonuses and abilities to enhance your city building strategy.",
    details: [
      "Each Builder has different attribute ratings that affect gameplay",
      "Special abilities unlock alternative building strategies",
      "Trait synergies can create powerful gameplay combinations",
    ],
  },
  {
    title: "Scoring System",
    description:
      "Your city is evaluated based on multiple factors that determine your final score.",
    details: [
      "Population size and happiness form the base score",
      "Environmental impact affects multipliers",
      "City efficiency and aesthetics provide bonus points",
      "Unique achievements unlock score boosters",
    ],
  },
  {
    title: "PVP Challenges",
    description:
      "Compete against other players in time-limited challenges for MINA rewards.",
    details: [
      "Standard challenges run until a set end date",
      "Speed challenges test your skills under time pressure",
      "Entry fees create prize pools for winners",
      "Special challenges may have unique rules and constraints",
    ],
  },
  {
    title: "On-Chain Verification",
    description:
      "Game results and achievements are verified and stored on the Mina blockchain using zero-knowledge proofs.",
    details: [
      "Transparent and tamper-proof scoring verification",
      "Privacy-preserving implementation using zkSNARKs",
      "Achievements earn permanent on-chain recognition",
      "NFT traits and ownership securely recorded on blockchain",
    ],
  },
];
