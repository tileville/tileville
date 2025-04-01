export default function GameTips() {
  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="mb-6 text-3xl font-bold text-primary">
        TileVille Pro Tips
      </h1>

      <div className="grid gap-6 md:grid-cols-2">
        <TipCard
          title="Beginner Tips"
          tips={[
            "Start with a simple road grid to organize your city",
            "Balance residential areas with commercial zones",
            "Always include parks near residential buildings for happiness",
            "Dont neglect infrastructure - power and water are essential",
            "Use the tutorial mode to understand basic mechanics",
          ]}
        />

        <TipCard
          title="Intermediate Strategies"
          tips={[
            "Create specialized districts for efficiency bonuses",
            "Utilize natural features like rivers for extra benefits",
            "Plan your city expansion in phases to maximize resources",
            "Use zoning laws to separate industrial areas from residential",
            "Develop public transportation to reduce traffic",
          ]}
        />

        <TipCard
          title="Advanced Techniques"
          tips={[
            "Implement mixed-use development for optimal space usage",
            "Create self-sufficient neighborhoods with all necessary services",
            "Balance high-density and low-density areas for sustainability",
            "Plan for disasters with emergency services strategically placed",
            "Develop specialized economic sectors for a robust economy",
          ]}
        />

        <TipCard
          title="Competition Winning Strategies"
          tips={[
            "Study competition requirements carefully before starting",
            "Practice speed building essential infrastructure first",
            "Prioritize scoring elements specific to the competition",
            "Develop a signature style that stands out visually",
            "Learn from past winners by studying their city layouts",
          ]}
        />

        <TipCard
          title="Resource Management"
          tips={[
            "Balance your budget by avoiding unnecessary infrastructure",
            "Invest in renewable energy for long-term savings",
            "Upgrade existing buildings instead of building new ones",
            "Use policies to maximize tax income without reducing happiness",
            "Develop tourism for additional revenue streams",
          ]}
        />

        <TipCard
          title="Environmental Sustainability"
          tips={[
            "Incorporate green spaces throughout your city",
            "Invest in clean energy sources early on",
            "Create wildlife corridors connecting green spaces",
            "Use water management systems to prevent flooding",
            "Develop recycling centers to reduce waste",
          ]}
        />
      </div>

      <div className="mt-8">
        <h2 className="mb-4 text-2xl font-semibold">Weekly Challenge Tips</h2>
        <p className="mb-4">
          Each week features a different challenge with unique requirements.
          Here are tips for maximizing your score:
        </p>

        <ul className="ml-6 list-disc space-y-2">
          <li>
            <span className="font-medium">Speed Challenges:</span> Focus on core
            infrastructure first, aesthetics later
          </li>
          <li>
            <span className="font-medium">Economy Challenges:</span> Prioritize
            commercial and industrial development
          </li>
          <li>
            <span className="font-medium">Eco Challenges:</span> Maximize green
            spaces and sustainable energy
          </li>
          <li>
            <span className="font-medium">Population Challenges:</span> Focus on
            high-density residential areas with amenities
          </li>
          <li>
            <span className="font-medium">Limited Resource Challenges:</span>{" "}
            Plan carefully and prioritize essential buildings
          </li>
        </ul>
      </div>
    </div>
  );
}

function TipCard({ title, tips }: { title: string; tips: string[] }) {
  return (
    <div className="rounded-lg border border-primary/30 p-4">
      <h3 className="mb-3 text-xl font-semibold text-primary">{title}</h3>
      <ul className="space-y-2">
        {tips.map((tip, index) => (
          <li key={index} className="flex">
            <span className="mr-2 text-primary">•</span>
            <span>{tip}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
