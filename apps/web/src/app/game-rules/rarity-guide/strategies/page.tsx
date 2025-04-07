import { CompetitionStrategies } from "./CompetitionStrategies";

export default function StrategiesPage() {
  return (
    <div className="mx-auto max-w-[1200px] p-6 pt-20">
      <h1 className="mb-8 text-3xl font-extrabold text-primary">
        TileVille Gameplay Strategies
      </h1>

      <div className="mb-8">
        <p className="text-lg">
          Master the art of city building in TileVille with these expert
          strategies. Whether you are a beginner or seasoned player, these tips
          will help you optimize your gameplay and achieve higher scores.
        </p>
      </div>

      <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="rounded-lg bg-primary/10 p-6">
          <h2 className="mb-4 text-2xl font-bold text-primary">
            Beginner Strategies
          </h2>

          <div className="mb-6">
            <h3 className="mb-2 text-xl font-semibold">Resource Management</h3>
            <p className="mb-3">
              Efficient resource management is crucial for early growth:
            </p>
            <ul className="list-inside list-disc space-y-2">
              <li>Focus on balanced resource collection</li>
              <li>Prioritize water infrastructure early</li>
              <li>
                Build resource generators near each other for bonus effects
              </li>
              <li>Invest in sustainable energy sources from the start</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-2 text-xl font-semibold">City Layout Basics</h3>
            <p className="mb-3">
              A well-planned layout provides long-term benefits:
            </p>
            <ul className="list-inside list-disc space-y-2">
              <li>
                Create dedicated zones for residential, commercial, and
                industrial use
              </li>
              <li>Place parks strategically to boost surrounding buildings</li>
              <li>
                Keep pollution-generating structures away from residential areas
              </li>
              <li>Plan wide roads for future expansion</li>
            </ul>
          </div>
        </div>

        <div className="rounded-lg bg-primary/10 p-6">
          <h2 className="mb-4 text-2xl font-bold text-primary">
            Advanced Techniques
          </h2>

          <div className="mb-6">
            <h3 className="mb-2 text-xl font-semibold">
              Optimization Strategies
            </h3>
            <p className="mb-3">
              Maximize efficiency with these advanced approaches:
            </p>
            <ul className="list-inside list-disc space-y-2">
              <li>
                Implement the diamond grid pattern for maximum building density
              </li>
              <li>Create specialized districts with complementary buildings</li>
              <li>Use the hub-and-spoke model for transportation networks</li>
              <li>Develop micro-neighborhoods with all necessary amenities</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-2 text-xl font-semibold">Economic Mastery</h3>
            <p className="mb-3">Advanced economic strategies for prosperity:</p>
            <ul className="list-inside list-disc space-y-2">
              <li>
                Balance tax rates to optimize income without stunting growth
              </li>
              <li>Create tourism hotspots to generate additional revenue</li>
              <li>Invest early in education to boost long-term productivity</li>
              <li>Develop trade routes with neighboring cities</li>
            </ul>
          </div>
        </div>
      </div>

      <CompetitionStrategies />

      <div className="rounded-lg bg-primary/20 p-6">
        <h2 className="mb-4 text-2xl font-bold text-primary">
          Using NFTs Strategically
        </h2>
        <p className="mb-4">
          Your TileVille Builder NFTs provide unique advantages that can be
          leveraged strategically:
        </p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded bg-white/20 p-4">
            <h3 className="mb-2 font-semibold">Sustainability Specialists</h3>
            <p>
              NFTs with high Sustainability Rating excel at creating
              eco-friendly cities that generate more happiness with fewer
              resources. Use these Builders for challenges that reward
              environmental metrics.
            </p>
          </div>

          <div className="rounded bg-white/20 p-4">
            <h3 className="mb-2 font-semibold">Efficiency Experts</h3>
            <p>
              Builders with Legendary or Master efficiency levels can complete
              cities faster, making them ideal for speed challenges or when
              racing against the clock.
            </p>
          </div>

          <div className="rounded bg-white/20 p-4">
            <h3 className="mb-2 font-semibold">Environmental Specialists</h3>
            <p>
              Match your Builders Environmental Affinity with the challenge
              terrain. Water Guardians excel in coastal maps, while Tree Huggers
              perform best in forest-rich environments.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
