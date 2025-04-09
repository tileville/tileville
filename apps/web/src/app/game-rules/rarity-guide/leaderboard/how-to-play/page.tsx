export default function HowToPlay() {
  const gameControls = [
    {
      action: "Select Building",
      control: "Left-click on building icon in sidebar",
    },
    { action: "Place Building", control: "Left-click on valid tile" },
    {
      action: "Rotate Building",
      control: "R key or right-click before placement",
    },
    {
      action: "Delete Building",
      control: "Select deletion tool and click on building",
    },
    { action: "Pan Camera", control: "Hold middle mouse button and drag" },
    { action: "Zoom In/Out", control: "Mouse wheel up/down" },
    { action: "Open Menu", control: "ESC key" },
  ];

  const buildingTypes = [
    {
      type: "Residential",
      purpose: "Houses citizens and generates population",
      placement: "Best near parks and services, away from industrial zones",
    },
    {
      type: "Commercial",
      purpose: "Provides jobs and generates income",
      placement: "Ideal along main roads and near residential areas",
    },
    {
      type: "Industrial",
      purpose: "Creates resources but produces pollution",
      placement: "Place downwind and away from residential zones",
    },
    {
      type: "Parks & Recreation",
      purpose: "Increases happiness and property values",
      placement: "Distribute throughout residential areas",
    },
    {
      type: "Utilities",
      purpose: "Provides essential services like power and water",
      placement: "Central location with good road access",
    },
  ];

  return (
    <div className="mx-auto max-w-[1000px] p-4 pb-12 pt-20">
      <h1 className="mb-6 text-3xl font-bold text-primary">How To Play</h1>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-bold">Game Basics</h2>
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <p className="mb-4">
            TileVille is a strategic city-building game where you design and
            develop your own urban environment. Your goal is to create a
            thriving city by balancing the needs of your citizens, economic
            growth, and environmental sustainability.
          </p>
          <p>
            Each game session gives you a limited time to build the most
            efficient and prosperous city possible. Your final score is
            calculated based on multiple factors including population, economy,
            happiness, and sustainability.
          </p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-bold">Game Controls</h2>
        <div className="overflow-hidden rounded-lg bg-white shadow-sm">
          <table className="w-full">
            <thead className="bg-primary/10">
              <tr>
                <th className="p-4 text-left">Action</th>
                <th className="p-4 text-left">Control</th>
              </tr>
            </thead>
            <tbody>
              {gameControls.map((control, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="p-4 font-medium">{control.action}</td>
                  <td className="p-4">{control.control}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-bold">Building Types</h2>
        <div className="space-y-4">
          {buildingTypes.map((building, index) => (
            <div key={index} className="rounded-lg bg-white p-4 shadow-sm">
              <h3 className="mb-2 text-lg font-bold">{building.type}</h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm font-medium text-gray-600">Purpose:</p>
                  <p>{building.purpose}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Optimal Placement:
                  </p>
                  <p>{building.placement}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-bold">Scoring System</h2>
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <p className="mb-4">
            Your city is evaluated based on several key metrics:
          </p>
          <ul className="list-inside list-disc space-y-2">
            <li>
              <span className="font-medium">Population:</span> Total number of
              citizens living in your city
            </li>
            <li>
              <span className="font-medium">Economy:</span> Financial health
              based on commercial and industrial activity
            </li>
            <li>
              <span className="font-medium">Happiness:</span> Citizens
              satisfaction with quality of life
            </li>
            <li>
              <span className="font-medium">Sustainability:</span> Environmental
              impact and resource efficiency
            </li>
            <li>
              <span className="font-medium">Infrastructure:</span> Connectivity
              and service coverage
            </li>
          </ul>
          <p className="mt-4">
            These factors are weighted and combined to calculate your final
            score. Different competitions may emphasize different aspects of
            city development.
          </p>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold">Tips for Success</h2>
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="mr-2 font-bold text-primary">•</span>
              <p>
                Balance residential, commercial, and industrial zones for
                optimal growth
              </p>
            </li>
            <li className="flex items-start">
              <span className="mr-2 font-bold text-primary">•</span>
              <p>Place utilities strategically to maximize coverage</p>
            </li>
            <li className="flex items-start">
              <span className="mr-2 font-bold text-primary">•</span>
              <p>
                Create efficient road networks to connect all areas of your city
              </p>
            </li>
            <li className="flex items-start">
              <span className="mr-2 font-bold text-primary">•</span>
              <p>
                Use parks and recreational areas to increase happiness and land
                value
              </p>
            </li>
            <li className="flex items-start">
              <span className="mr-2 font-bold text-primary">•</span>
              <p>Consider the environmental impact of industrial zones</p>
            </li>
            <li className="flex items-start">
              <span className="mr-2 font-bold text-primary">•</span>
              <p>
                Use TileVille Builder NFTs to enhance your city-building
                capabilities
              </p>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
