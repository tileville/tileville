import { GlobalStatistics } from "../global-statistics/page";

export default function LeaderboardStats() {
  // Static data for top performers
  const topPlayers = [
    {
      rank: 1,
      username: "CityMaster",
      totalWins: 28,
      topScore: 18742,
      totalRewards: 253,
    },
    {
      rank: 2,
      username: "BlockBuilder",
      totalWins: 23,
      topScore: 17985,
      totalRewards: 215,
    },
    {
      rank: 3,
      username: "ZkArchitect",
      totalWins: 21,
      topScore: 17522,
      totalRewards: 186,
    },
    {
      rank: 4,
      username: "TileGenius",
      totalWins: 19,
      topScore: 16890,
      totalRewards: 167,
    },
    {
      rank: 5,
      username: "MinaWhale",
      totalWins: 17,
      topScore: 16455,
      totalRewards: 143,
    },
  ];

  // Stats for competition performance
  const competitionStats = [
    {
      name: "Coastal Paradise",
      avgScore: 12850,
      highestScore: 19244,
      participants: 342,
    },
    {
      name: "Eco City Challenge",
      avgScore: 11230,
      highestScore: 18566,
      participants: 285,
    },
    {
      name: "Urban Expansion",
      avgScore: 10870,
      highestScore: 17422,
      participants: 320,
    },
    {
      name: "Island Development",
      avgScore: 9950,
      highestScore: 16890,
      participants: 276,
    },
  ];

  return (
    <div className="mx-auto max-w-[1000px] p-4 pb-12 pt-20">
      <h1 className="mb-6 text-3xl font-bold text-primary">
        Leaderboard Statistics
      </h1>

      <section className="mb-8">
        <h2 className="mb-4 text-xl font-bold">All-Time Top Performers</h2>
        <div className="overflow-hidden rounded-lg bg-white shadow-sm">
          <table className="w-full">
            <thead className="bg-primary/10">
              <tr>
                <th className="p-4 text-left">Rank</th>
                <th className="p-4 text-left">Username</th>
                <th className="p-4 text-center">Total Wins</th>
                <th className="p-4 text-center">Top Score</th>
                <th className="p-4 text-center">Rewards (MINA)</th>
              </tr>
            </thead>
            <tbody>
              {topPlayers.map((player) => (
                <tr
                  key={player.rank}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="p-4 font-bold">{player.rank}</td>
                  <td className="p-4 font-medium">{player.username}</td>
                  <td className="p-4 text-center">{player.totalWins}</td>
                  <td className="p-4 text-center">
                    {player.topScore.toLocaleString()}
                  </td>
                  <td className="p-4 text-center">{player.totalRewards}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-xl font-bold">Competition Performance</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {competitionStats.map((comp, index) => (
            <div key={index} className="rounded-lg bg-white p-4 shadow-sm">
              <h3 className="mb-2 text-lg font-bold">{comp.name}</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Average Score:</span>
                  <span className="font-medium">
                    {comp.avgScore.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Highest Score:</span>
                  <span className="font-medium">
                    {comp.highestScore.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Participants:</span>
                  <span className="font-medium">{comp.participants}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <GlobalStatistics />
    </div>
  );
}
