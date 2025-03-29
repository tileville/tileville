import Link from "next/link";

export default function EventsCalendar() {
  const currentMonth = new Date().toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-primary">
          TileVille Events Calendar
        </h1>
        <p className="mt-3 text-lg text-gray-500">
          Stay updated with upcoming competitions and events
        </p>
      </div>

      <div className="mt-10">
        <h2 className="mb-4 text-xl font-bold text-primary">{currentMonth}</h2>

        <div className="space-y-4">
          {EVENTS.map((event) => (
            <div
              key={event.id}
              className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {event.date}
                  </p>
                  <h3 className="text-lg font-bold">{event.title}</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    {event.description}
                  </p>
                </div>

                <div className="mt-4 sm:ml-6 sm:mt-0">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                      event.status === "Upcoming"
                        ? "bg-blue-100 text-blue-800"
                        : event.status === "Live"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {event.status}
                  </span>

                  {event.link && (
                    <Link
                      href={event.link}
                      className="ml-3 text-sm font-medium text-primary hover:underline"
                    >
                      Details →
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 rounded-lg bg-primary/10 p-6 text-center">
        <h2 className="text-lg font-bold text-primary">
          Want to host a community event?
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          TileVille supports community-organized competitions and events
        </p>
        <a
          href="https://forms.gle/PyPU67YmDvQvZ7HF9"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
        >
          Submit Event Proposal
        </a>
      </div>
    </div>
  );
}

const EVENTS = [
  {
    id: 1,
    title: "City Planning Challenge",
    description:
      "Build the most efficient city with limited resources. Top 3 players win MINA prizes.",
    date: "March 30 - April 5, 2025",
    status: "Upcoming",
    link: "/competitions",
  },
  {
    id: 2,
    title: "TileVille Builder NFT Drop",
    description:
      "Special edition NFTs with unique traits. Limited availability.",
    date: "April 2, 2025",
    status: "Upcoming",
    link: "/marketplace",
  },
  {
    id: 3,
    title: "Speed Building Tournament",
    description:
      "Compete in 5-minute challenges to test your quick decision making.",
    date: "March 28, 2025",
    status: "Live",
    link: "/pvp",
  },
  {
    id: 4,
    title: "Sustainable City Competition",
    description:
      "Build the most environmentally friendly city with highest population.",
    date: "March 15-22, 2025",
    status: "Completed",
    link: "/leaderboard",
  },
  {
    id: 5,
    title: "Community Meetup",
    description:
      "Join our Discord voice chat for strategy discussions and Q&A with developers.",
    date: "April 7, 2025",
    status: "Upcoming",
    link: null,
  },
];
