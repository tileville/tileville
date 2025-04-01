export default function HallOfFame() {
  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="mb-6 text-3xl font-bold text-primary">Hall of Fame</h1>

      <p className="mb-8 text-lg">
        Celebrating the greatest achievements and most talented builders in
        TileVille history. These players have demonstrated exceptional skill,
        creativity, and dedication.
      </p>

      <div className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold">Legendary Builders</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {legendaryBuilders.map((builder) => (
            <BuilderCard
              key={builder.id}
              username={builder.username}
              achievements={builder.achievements}
              speciality={builder.speciality}
              joinDate={builder.joinDate}
              wins={builder.wins}
            />
          ))}
        </div>
      </div>

      <div className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold">Competition Champions</h2>
        <div className="overflow-hidden rounded-lg border border-primary/30">
          <table className="w-full">
            <thead className="bg-primary/10">
              <tr>
                <th className="p-3 text-left font-semibold">Competition</th>
                <th className="p-3 text-left font-semibold">Winner</th>
                <th className="p-3 text-left font-semibold">Date</th>
                <th className="p-3 text-left font-semibold">Score</th>
              </tr>
            </thead>
            <tbody>
              {competitions.map((comp) => (
                <tr key={comp.id} className="border-t border-primary/20">
                  <td className="p-3">{comp.name}</td>
                  <td className="p-3 font-medium text-primary">
                    {comp.winner}
                  </td>
                  <td className="p-3">{comp.date}</td>
                  <td className="p-3">{comp.score.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold">Record-Breaking Cities</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {recordCities.map((city) => (
            <div
              key={city.id}
              className="rounded-lg border border-primary/30 p-4"
            >
              <h3 className="mb-1 text-lg font-semibold">{city.name}</h3>
              <p className="mb-2 text-sm text-gray-600">
                Built by {city.builder}
              </p>
              <p className="mb-3">{city.description}</p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-gray-600">Record: </span>
                  <span className="font-medium">{city.record}</span>
                </div>
                <div>
                  <span className="text-gray-600">Date: </span>
                  <span>{city.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-2xl font-semibold">Monthly Champions</h2>
        <p className="mb-6">
          Each month, we celebrate the players with the highest combined scores
          across all competitions.
        </p>

        <div className="grid gap-4 sm:grid-cols-3">
          <MonthCard
            month="March 2025"
            winner="CryptoBuilder453"
            points={18520}
          />
          <MonthCard
            month="February 2025"
            winner="BlockchainUrbanist"
            points={16750}
          />
          <MonthCard
            month="January 2025"
            winner="MinaMaster76"
            points={17890}
          />
        </div>
      </div>
    </div>
  );
}

function BuilderCard({
  username,
  achievements,
  speciality,
  joinDate,
  wins,
}: {
  username: string;
  achievements: string[];
  speciality: string;
  joinDate: string;
  wins: number;
}) {
  return (
    <div className="rounded-lg border border-primary/30 p-4">
      <div className="mb-4 flex items-center gap-3">
        <div className="h-12 w-12 rounded-full bg-primary/20"></div>
        <div>
          <h3 className="text-lg font-semibold">{username}</h3>
          <p className="text-sm text-gray-600">Joined {joinDate}</p>
        </div>
      </div>

      <div className="mb-3">
        <span className="text-gray-600">Speciality: </span>
        <span>{speciality}</span>
      </div>

      <div className="mb-3">
        <span className="text-gray-600">Competition Wins: </span>
        <span className="font-medium">{wins}</span>
      </div>

      <div>
        <span className="text-gray-600">Notable Achievements:</span>
        <ul className="mt-1 space-y-1">
          {achievements.map((achievement, index) => (
            <li key={index} className="text-sm">
              • {achievement}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function MonthCard({
  month,
  winner,
  points,
}: {
  month: string;
  winner: string;
  points: number;
}) {
  return (
    <div className="rounded-lg border border-primary/30 p-4 text-center">
      <h3 className="text-lg font-semibold">{month}</h3>
      <div className="my-3 inline-block rounded-full bg-yellow-100 px-3 py-1 text-yellow-800">
        Champion
      </div>
      <p className="font-medium text-primary">{winner}</p>
      <p className="mt-1">{points.toLocaleString()} points</p>
    </div>
  );
}

const legendaryBuilders = [
  {
    id: 1,
    username: "MinaMaster76",
    achievements: [
      "First player to reach 1M points",
      "Longest win streak: 8 competitions",
      "Creator of Eco Paradise template",
    ],
    speciality: "Ecological City Design",
    joinDate: "Oct 2024",
    wins: 12,
  },
  {
    id: 2,
    username: "CryptoBuilder453",
    achievements: [
      "Highest single competition score",
      "Most efficient city design",
      "Community mentor of the year",
    ],
    speciality: "Transportation Networks",
    joinDate: "Nov 2024",
    wins: 9,
  },
  {
    id: 3,
    username: "BlockchainUrbanist",
    achievements: [
      "Most innovative city layout",
      "Speed building world record",
      "First perfect happiness score",
    ],
    speciality: "High-Density Development",
    joinDate: "Dec 2024",
    wins: 7,
  },
];

const competitions = [
  {
    id: 1,
    name: "Eco City Challenge",
    winner: "MinaMaster76",
    date: "Mar 15, 2025",
    score: 128750,
  },
  {
    id: 2,
    name: "Speed Building Finals",
    winner: "CryptoBuilder453",
    date: "Feb 28, 2025",
    score: 108320,
  },
  {
    id: 3,
    name: "Coastal Paradise",
    winner: "BlockchainUrbanist",
    date: "Feb 10, 2025",
    score: 116750,
  },
  {
    id: 4,
    name: "Winter Wonderland",
    winner: "SnowDesigner22",
    date: "Jan 15, 2025",
    score: 98420,
  },
  {
    id: 5,
    name: "Industrial Revolution",
    winner: "MinaMaster76",
    date: "Jan 5, 2025",
    score: 105680,
  },
];

const recordCities = [
  {
    id: 1,
    name: "Nova Harmonia",
    builder: "MinaMaster76",
    description:
      "First city to achieve perfect balance between industry, ecology, and citizen happiness.",
    record: "Perfect Harmony Score",
    date: "Feb 2025",
  },
  {
    id: 2,
    name: "Velocitropolis",
    builder: "CryptoBuilder453",
    description:
      "Most efficient transportation network with zero congestion despite high population density.",
    record: "Zero Congestion Award",
    date: "Jan 2025",
  },
  {
    id: 3,
    name: "Emerald Heights",
    builder: "BlockchainUrbanist",
    description:
      "Highest elevation city with full sustainability and record-breaking happiness score.",
    record: "Peak Prosperity Award",
    date: "Mar 2025",
  },
  {
    id: 4,
    name: "Aqua Vista",
    builder: "OceanBuilder123",
    description:
      "Largest city built entirely on water with integrated marine ecosystem preservation.",
    record: "Marine Integration Award",
    date: "Dec 2024",
  },
];
