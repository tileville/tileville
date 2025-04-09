import Link from "next/link";

export default function NFTAnalytics() {
  // Static data for analytics (no DB connection required)
  const collectionStats = [
    {
      collection: "TileVille Builders",
      totalSupply: 1000,
      ownersCount: 423,
      floorPrice: 5.2,
      totalVolume: 3240,
      averagePrice: 7.65,
    },
    {
      collection: "Minaty",
      totalSupply: 800,
      ownersCount: 356,
      floorPrice: 3.8,
      totalVolume: 2150,
      averagePrice: 6.04,
    },
    {
      collection: "MinaPunks",
      totalSupply: 1200,
      ownersCount: 587,
      floorPrice: 2.5,
      totalVolume: 4820,
      averagePrice: 8.21,
    },
    {
      collection: "ZkGod",
      totalSupply: 500,
      ownersCount: 211,
      floorPrice: 8.1,
      totalVolume: 1980,
      averagePrice: 9.38,
    },
  ];

  const rarityDistribution = [
    {
      trait: "Sustainability Rating",
      common: "Bronze (42%)",
      rare: "Diamond (3%)",
    },
    {
      trait: "Efficiency Level",
      common: "Novice (38%)",
      rare: "Legendary (7%)",
    },
    {
      trait: "Environmental Affinity",
      common: "Soil Cultivator (31%)",
      rare: "Eco-Balancer (8%)",
    },
    {
      trait: "Urban Planning Expertise",
      common: "Residential Developer (35%)",
      rare: "Energy Grid Innovator (12%)",
    },
    {
      trait: "Special Ability",
      common: "Home Sweet Home (40%)",
      rare: "Power Surge (10%)",
    },
  ];

  const recentSales = [
    { nft: "TileVille Builder #142", price: 6.8, date: "2 hours ago" },
    { nft: "ZkGod #78", price: 12.5, date: "5 hours ago" },
    { nft: "Minaty Guardian #23", price: 4.2, date: "1 day ago" },
    { nft: "MinaPunk Gold #56", price: 9.3, date: "1 day ago" },
    { nft: "TileVille Builder #287", price: 5.5, date: "2 days ago" },
  ];

  return (
    <div className="mx-auto max-w-[1280px] p-4 pt-20 md:p-8">
      <h1 className="mb-8 text-3xl font-bold text-primary md:text-5xl">
        NFT Analytics
      </h1>

      <p className="mb-8 text-lg">
        Explore real-time analytics and insights for NFT collections on
        TileVille marketplace. Track market trends, rarity distributions, and
        collection performance metrics.
      </p>

      <section className="mb-16">
        <h2 className="mb-6 text-2xl font-bold">Collection Overview</h2>
        <div className="overflow-x-auto">
          <table className="w-full rounded-lg bg-white shadow-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="p-4 text-left">Collection</th>
                <th className="p-4 text-center">Supply</th>
                <th className="p-4 text-center">Owners</th>
                <th className="p-4 text-center">Floor (MINA)</th>
                <th className="p-4 text-center">Volume (MINA)</th>
                <th className="p-4 text-center">Avg Price (MINA)</th>
              </tr>
            </thead>
            <tbody>
              {collectionStats.map((collection, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="p-4 font-medium">{collection.collection}</td>
                  <td className="p-4 text-center">{collection.totalSupply}</td>
                  <td className="p-4 text-center">{collection.ownersCount}</td>
                  <td className="p-4 text-center">{collection.floorPrice}</td>
                  <td className="p-4 text-center">{collection.totalVolume}</td>
                  <td className="p-4 text-center">{collection.averagePrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2">
        <section>
          <h2 className="mb-6 text-2xl font-bold">Rarity Analysis</h2>
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-bold">TileVille Builder NFTs</h3>
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="p-2 text-left">Trait Type</th>
                  <th className="p-2 text-left">Most Common</th>
                  <th className="p-2 text-left">Most Rare</th>
                </tr>
              </thead>
              <tbody>
                {rarityDistribution.map((trait, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="p-2 font-medium">{trait.trait}</td>
                    <td className="p-2 text-gray-600">{trait.common}</td>
                    <td className="p-2 text-primary">{trait.rare}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4">
              <Link
                href="/traits-info"
                className="text-sm text-primary hover:underline"
              >
                View detailed trait distribution →
              </Link>
            </div>
          </div>
        </section>

        <section>
          <h2 className="mb-6 text-2xl font-bold">Recent Sales</h2>
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <ul className="divide-y divide-gray-100">
              {recentSales.map((sale, index) => (
                <li key={index} className="py-4 first:pt-0 last:pb-0">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{sale.nft}</span>
                    <span className="font-bold text-primary">
                      {sale.price} MINA
                    </span>
                  </div>
                  <div className="mt-1 text-sm text-gray-500">{sale.date}</div>
                </li>
              ))}
            </ul>
            <div className="mt-6 text-center">
              <Link
                href="/marketplace"
                className="inline-block rounded-md bg-primary px-4 py-2 text-sm text-white transition-colors hover:bg-primary/80"
              >
                View Marketplace
              </Link>
            </div>
          </div>
        </section>
      </div>

      <section className="mb-16">
        <h2 className="mb-6 text-2xl font-bold">Market Trends</h2>
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-lg border border-gray-200 p-4">
              <h3 className="mb-2 text-lg font-bold">TileVille Builder NFTs</h3>
              <div className="mb-1 text-3xl font-bold text-primary">+12.4%</div>
              <div className="text-sm text-gray-500">Floor price (7-day)</div>
              <div className="mt-4 text-sm">
                <span className="font-medium">Trend: </span>
                <span className="text-green-600">Increasing</span>
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 p-4">
              <h3 className="mb-2 text-lg font-bold">Trading Volume</h3>
              <div className="mb-1 text-3xl font-bold text-primary">
                1,245 MINA
              </div>
              <div className="text-sm text-gray-500">Last 30 days</div>
              <div className="mt-4 text-sm">
                <span className="font-medium">Trend: </span>
                <span className="text-green-600">+18.2% vs previous</span>
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 p-4">
              <h3 className="mb-2 text-lg font-bold">Average Sale Time</h3>
              <div className="mb-1 text-3xl font-bold text-primary">
                3.2 days
              </div>
              <div className="text-sm text-gray-500">From listing to sale</div>
              <div className="mt-4 text-sm">
                <span className="font-medium">Trend: </span>
                <span className="text-red-600">+0.5 days vs previous</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="rounded-lg border border-primary/20 bg-primary/10 p-6">
        <h2 className="mb-4 text-xl font-bold">Analytics Disclaimer</h2>
        <p className="text-sm">
          The data presented on this page is for illustrative purposes only and
          represents a snapshot of market activity. For real-time data and
          detailed analysis, please connect your wallet and explore the
          marketplace. Past performance does not guarantee future results.
        </p>
      </div>
    </div>
  );
}
