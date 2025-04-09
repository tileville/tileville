const newsItems = [
  {
    title: "PVP Tournament System Coming in Q2",
    date: "April 5, 2025",
    summary:
      "Exciting new tournament system with weekly challenges and seasonal rankings will launch next quarter.",
    category: "Feature Update",
  },
  {
    title: "New TileVille Builder NFT Collection Announced",
    date: "April 2, 2025",
    summary:
      "Limited edition Builder NFTs with special environmental affinity traits coming later this month.",
    category: "NFT Release",
  },
  {
    title: "March Competition Results",
    date: "March 31, 2025",
    summary:
      "The Coastal Paradise competition concluded with record participation. Congratulations to all winners!",
    category: "Competition",
  },
  {
    title: "Marketplace Update: Enhanced Filters and Search",
    date: "March 25, 2025",
    summary:
      "New filtering options and improved search functionality now available in the NFT marketplace.",
    category: "Platform Update",
  },
  {
    title: "Community Spotlight: TileVille Builders Guild",
    date: "March 20, 2025",
    summary:
      "Highlighting the community-led Builders Guild and their innovative city designs.",
    category: "Community",
  },
  {
    title: "Telegram Integration Now Live",
    date: "March 15, 2025",
    summary:
      "Connect your Telegram account for real-time notifications and enhanced community features.",
    category: "Feature Update",
  },
];

export default function News() {
  return (
    <div className="mx-auto max-w-[1000px] p-4 pb-12 pt-20">
      <h1 className="mb-6 text-3xl font-bold text-primary">News & Updates</h1>

      <div className="mb-8">
        <div className="rounded-lg border border-primary/20 bg-primary/10 p-6">
          <h2 className="mb-2 text-xl font-bold">Latest Announcement</h2>
          <h3 className="text-lg font-bold">
            TileVille 2.0 Development Underway
          </h3>
          <p className="mb-2 text-gray-700">April 9, 2025</p>
          <p>
            Were excited to announce that development has begun on TileVille
            2.0, a major platform upgrade that will introduce new gameplay
            mechanics, enhanced visual elements, and deeper blockchain
            integration. Stay tuned for more details in the coming weeks!
          </p>
        </div>
      </div>

      <section>
        <h2 className="mb-6 text-2xl font-bold">Recent Updates</h2>
        <div className="space-y-4">
          {newsItems.map((item, index) => (
            <div key={index} className="rounded-lg bg-white p-5 shadow-sm">
              <div className="mb-2 flex items-start justify-between">
                <h3 className="text-lg font-bold">{item.title}</h3>
                <span className="rounded bg-primary/20 px-2 py-1 text-xs font-medium text-primary">
                  {item.category}
                </span>
              </div>
              <p className="mb-3 text-sm text-gray-500">{item.date}</p>
              <p>{item.summary}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-8 text-center">
        <p className="mb-4 text-gray-600">
          For real-time updates and discussions, join our community channels.
        </p>
        <div className="flex justify-center space-x-4">
          <a
            href="#"
            className="rounded bg-primary px-4 py-2 text-white transition-colors hover:bg-primary/80"
          >
            Join Discord
          </a>
          <a
            href="#"
            className="rounded border border-primary bg-white px-4 py-2 text-primary transition-colors hover:bg-primary/5"
          >
            Follow on Twitter
          </a>
        </div>
      </div>
    </div>
  );
}
