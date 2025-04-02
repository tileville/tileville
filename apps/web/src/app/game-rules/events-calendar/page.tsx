import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "TileVille Events Calendar",
  description:
    "Stay updated with upcoming tournaments, challenges, and community events in TileVille",
};

// Static data for demonstration purposes
const events = [
  {
    id: "summer-challenge-2025",
    title: "Summer Challenge 2025",
    date: "August 5-15, 2025",
    description:
      "Build the ultimate coastal paradise in this summer-themed competition. Special tiles and challenges await!",
    category: "competition",
    status: "upcoming",
    registrationOpen: true,
    rewards: [
      "5,000 MINA total prize pool",
      "Exclusive Summer Builder NFT",
      "Top 10 Leaderboard Recognition",
    ],
  },
  {
    id: "weekly-tournament-126",
    title: "Weekly Tournament #126",
    date: "May 5-7, 2025",
    description:
      "Our regular weekly tournament with standard rules. Top 3 players win prizes!",
    category: "tournament",
    status: "upcoming",
    registrationOpen: true,
    rewards: [
      "250 MINA for 1st place",
      "100 MINA for 2nd place",
      "50 MINA for 3rd place",
    ],
  },
  {
    id: "builder-series-15",
    title: "Builder Series: Episode 15",
    date: "April 25, 2025",
    description:
      "Live streaming event with the developers showcasing new tiles and mechanics coming in the next update.",
    category: "stream",
    status: "upcoming",
    registrationOpen: false,
    link: "https://youtube.com/tileville",
  },
  {
    id: "community-showcase",
    title: "Community Showcase",
    date: "April 20, 2025",
    description:
      "Showcase your best city designs and vote for your favorites. Winners get their designs featured on our social media.",
    category: "community",
    status: "upcoming",
    registrationOpen: true,
  },
  {
    id: "speed-building-cup",
    title: "Speed Building Cup",
    date: "April 15, 2025",
    description:
      "Complete challenges against the clock! Build specific city layouts as quickly as possible.",
    category: "competition",
    status: "upcoming",
    registrationOpen: true,
    rewards: [
      "500 MINA prize pool",
      "Speed Builder Badge for all participants",
    ],
  },
  {
    id: "newbie-day",
    title: "Newbie Welcome Day",
    date: "April 10, 2025",
    description:
      "Special event for new players with tutorials, easy challenges, and plenty of rewards to help you get started!",
    category: "tutorial",
    status: "upcoming",
    registrationOpen: true,
    rewards: ["Starter Builder NFT", "100 MINA for participation"],
  },
  {
    id: "spring-tournament-2025",
    title: "Spring Tournament 2025",
    date: "March 25 - April 5, 2025",
    description:
      "Our major spring tournament featuring new seasonal tiles and special environmental challenges.",
    category: "tournament",
    status: "completed",
    winner: "BuildMaster92",
    highlight: true,
  },
];

function getCategoryColor(category: string) {
  switch (category) {
    case "competition":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "tournament":
      return "bg-purple-100 text-purple-800 border-purple-200";
    case "stream":
      return "bg-red-100 text-red-800 border-red-200";
    case "community":
      return "bg-green-100 text-green-800 border-green-200";
    case "tutorial":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
}

export default function EventsCalendarPage() {
  const upcomingEvents = events.filter((event) => event.status === "upcoming");
  const pastEvents = events.filter((event) => event.status === "completed");

  return (
    <div className="mx-auto max-w-4xl p-6">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold text-primary">
          TileVille Events Calendar
        </h1>
        <p className="text-gray-600">
          Stay updated with upcoming tournaments, challenges, and community
          events
        </p>
      </div>

      <div className="mb-8 rounded-lg bg-primary/10 p-6">
        <h2 className="mb-4 text-xl font-semibold">Event Categories</h2>
        <div className="flex flex-wrap gap-2">
          <span className="rounded-md border border-blue-200 bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
            Competition
          </span>
          <span className="rounded-md border border-purple-200 bg-purple-100 px-3 py-1 text-sm font-medium text-purple-800">
            Tournament
          </span>
          <span className="rounded-md border border-red-200 bg-red-100 px-3 py-1 text-sm font-medium text-red-800">
            Stream
          </span>
          <span className="rounded-md border border-green-200 bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
            Community
          </span>
          <span className="rounded-md border border-yellow-200 bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-800">
            Tutorial
          </span>
        </div>
      </div>

      <div className="mb-10">
        <h2 className="mb-6 text-2xl font-bold">Upcoming Events</h2>
        <div className="space-y-6">
          {upcomingEvents.map((event) => (
            <div
              key={event.id}
              className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm"
            >
              <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
                <h3 className="text-xl font-semibold">{event.title}</h3>
                <span
                  className={`rounded-md border px-3 py-1 text-sm font-medium ${getCategoryColor(
                    event.category
                  )}`}
                >
                  {event.category.charAt(0).toUpperCase() +
                    event.category.slice(1)}
                </span>
              </div>

              <p className="mb-3 text-sm font-medium text-gray-500">
                {event.date}
              </p>
              <p className="mb-4 text-gray-700">{event.description}</p>

              {event.rewards && (
                <div className="mb-4">
                  <h4 className="mb-1 font-medium">Rewards:</h4>
                  <ul className="ml-5 list-disc text-sm text-gray-700">
                    {event.rewards.map((reward, index) => (
                      <li key={index}>{reward}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-4 flex flex-wrap gap-3">
                {event.registrationOpen && (
                  <Link
                    href={`/events/${event.id}`}
                    className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
                  >
                    Register Now
                  </Link>
                )}

                {event.link && (
                  <a
                    href={event.link}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-md border border-primary px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10"
                  >
                    View Details
                  </a>
                )}

                {!event.registrationOpen && !event.link && (
                  <span className="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">
                    Details Coming Soon
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-10">
        <h2 className="mb-6 text-2xl font-bold">Past Events</h2>
        <div className="space-y-4">
          {pastEvents.map((event) => (
            <div
              key={event.id}
              className={`rounded-lg border bg-white p-4 shadow-sm ${
                event.highlight ? "border-primary" : "border-gray-200"
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h3 className="text-lg font-semibold">{event.title}</h3>
                  <p className="text-sm text-gray-500">{event.date}</p>
                </div>
                <span
                  className={`rounded-md border px-3 py-1 text-xs font-medium ${getCategoryColor(
                    event.category
                  )}`}
                >
                  {event.category.charAt(0).toUpperCase() +
                    event.category.slice(1)}
                </span>
              </div>

              {event.winner && (
                <div className="mt-2 text-sm">
                  <span className="font-medium">Winner:</span> {event.winner}
                </div>
              )}

              <div className="mt-3">
                <Link
                  href={`/events/${event.id}`}
                  className="text-sm font-medium text-primary hover:underline"
                >
                  View Results
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 rounded-lg bg-primary/10 p-6 text-center">
        <h2 className="mb-4 text-xl font-semibold">Never Miss an Event!</h2>
        <p className="mb-4 text-gray-700">
          Subscribe to our calendar and get notified about upcoming events.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/telegram"
            className="rounded-md bg-primary px-6 py-2 font-semibold text-white hover:bg-primary/90"
          >
            Follow on Telegram
          </Link>
          <Link
            href="/community"
            className="rounded-md border border-primary px-6 py-2 font-semibold text-primary hover:bg-primary/10"
          >
            Join Our Community
          </Link>
        </div>
      </div>
    </div>
  );
}
