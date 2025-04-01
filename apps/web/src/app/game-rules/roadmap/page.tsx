export default function Roadmap() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="mb-6 text-3xl font-bold text-primary">
        TileVille Roadmap
      </h1>

      <p className="mb-6 text-lg">
        Our vision for TileVille extends well beyond what you see today. Below
        is our development roadmap outlining upcoming features and improvements.
      </p>

      <div className="space-y-12">
        <RoadmapQuarter
          title={`Q2 ${currentYear}`}
          status="In Progress"
          features={[
            "PvP Challenge System Enhancements",
            "New NFT Collection: City Landmarks",
            "Mobile UI Improvements",
            "In-game Economy Rebalancing",
            "New Tile Types: Cultural Buildings",
          ]}
        />

        <RoadmapQuarter
          title={`Q3 ${currentYear}`}
          status="Planned"
          features={[
            "Multiplayer Collaborative Mode",
            "City Sharing and Social Features",
            "Advanced Weather System Effects",
            "Builder NFTs Utility Expansion",
            "City Templates and Blueprints",
          ]}
        />

        <RoadmapQuarter
          title={`Q4 ${currentYear}`}
          status="Planned"
          features={[
            "TileVille DAO Governance System",
            "Community-Created Competitions",
            "City Trade System Between Players",
            "Advanced City Simulation Metrics",
            "Seasonal Events and Challenges",
          ]}
        />

        <RoadmapQuarter
          title={`Q1 ${currentYear + 1}`}
          status="Future"
          features={[
            "3D Visualization Mode",
            "City Evolution Timeline View",
            "Inter-City Trade Networks",
            "Regional Challenges (Multi-City)",
            "City Specialization Paths",
          ]}
        />
      </div>

      <div className="mt-12 rounded-lg bg-primary/10 p-6">
        <h2 className="mb-4 text-2xl font-semibold">Community Suggestions</h2>
        <p>
          We value your input! Many features on our roadmap came directly from
          community suggestions. If you have ideas for TileVille, share them on
          our Discord or Telegram channels.
        </p>
        <div className="mt-4 flex gap-4">
          <button className="rounded bg-primary px-4 py-2 text-white hover:bg-primary/80">
            Join Discord
          </button>
          <button className="rounded border border-primary px-4 py-2 text-primary hover:bg-primary/10">
            Submit Suggestion
          </button>
        </div>
      </div>
    </div>
  );
}

function RoadmapQuarter({
  title,
  status,
  features,
}: {
  title: string;
  status: "Completed" | "In Progress" | "Planned" | "Future";
  features: string[];
}) {
  const getStatusColor = () => {
    switch (status) {
      case "Completed":
        return "bg-green-500";
      case "In Progress":
        return "bg-yellow-500";
      case "Planned":
        return "bg-blue-500";
      case "Future":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="relative pl-8">
      <div className="absolute left-0 top-0 h-full w-1 bg-primary/30"></div>
      <div
        className={`absolute -left-2 top-0 h-5 w-5 rounded-full ${getStatusColor()}`}
      ></div>

      <div>
        <div className="mb-3 flex items-center gap-3">
          <h3 className="text-2xl font-bold">{title}</h3>
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium text-white ${getStatusColor()}`}
          >
            {status}
          </span>
        </div>

        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <span className="mr-2 text-primary">•</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
