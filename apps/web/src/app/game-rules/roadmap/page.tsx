import Link from "next/link";

export default function Roadmap() {
  const roadmapItems = [
    {
      quarter: "Q2 2025",
      title: "Launch of PVP Tournament System",
      description:
        "Organized competitive tournaments with season-based leaderboards and exclusive rewards",
      status: "planning",
    },
    {
      quarter: "Q3 2025",
      title: "TileVille Land Ownership",
      description:
        "Players can own land parcels in TileVille world, with exclusive customization options",
      status: "planning",
    },
    {
      quarter: "Q3 2025",
      title: "Building NFTs V2",
      description:
        "New series of building NFTs with enhanced gameplay benefits and visual improvements",
      status: "planning",
    },
    {
      quarter: "Q4 2025",
      title: "Governance System",
      description:
        "Community voting mechanisms for future game features and development direction",
      status: "planning",
    },
    {
      quarter: "Q1 2026",
      title: "Mobile Application",
      description: "Native mobile applications for iOS and Android platforms",
      status: "planning",
    },
  ];

  return (
    <div className="mx-auto max-w-[1280px] p-4 pt-20 md:p-8">
      <h1 className="mb-8 text-3xl font-bold text-primary md:text-5xl">
        TileVille Roadmap
      </h1>

      <p className="mb-8 text-lg">
        Our development roadmap outlines the exciting features and improvements
        coming to TileVille. This is a living document that will evolve based on
        community feedback and technical developments.
      </p>

      <div className="relative">
        {/* Vertical timeline line */}
        <div className="absolute left-4 h-full w-1 -translate-x-1/2 transform bg-primary/30 md:left-1/2"></div>

        {/* Roadmap items */}
        <div className="space-y-12">
          {roadmapItems.map((item, index) => (
            <div key={index} className="relative flex flex-col md:flex-row">
              {/* Circle on timeline */}
              <div className="absolute left-4 z-10 h-4 w-4 -translate-x-1/2 transform rounded-full bg-primary md:left-1/2"></div>

              {/* Content container */}
              <div
                className={`ml-12 md:ml-0 ${
                  index % 2 === 0
                    ? "md:mr-[calc(50%+2rem)]"
                    : "md:ml-[calc(50%+2rem)]"
                }`}
              >
                <div className="rounded-lg border border-primary/20 bg-primary/10 p-6">
                  <div className="mb-2 text-sm font-bold text-primary">
                    {item.quarter}
                  </div>
                  <h3 className="mb-2 text-xl font-bold">{item.title}</h3>
                  <p className="mb-4">{item.description}</p>
                  <span className="inline-block rounded-full bg-primary/20 px-3 py-1 text-sm font-medium capitalize">
                    {item.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 rounded-lg border border-primary/20 bg-primary/5 p-6">
        <h2 className="mb-4 text-2xl font-bold">Feedback & Suggestions</h2>
        <p className="mb-4">
          We value your input! The TileVille roadmap is shaped by our communitys
          needs and ideas. If you have suggestions for features or improvements,
          please share them with us.
        </p>
        <Link
          href="/community"
          className="inline-block rounded-md bg-primary px-6 py-2 text-white transition-colors hover:bg-primary/80"
        >
          Join Our Community
        </Link>
      </div>
    </div>
  );
}
