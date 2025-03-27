import React from "react";
import Image from "next/image";
import Link from "next/link";

const currentMonthEvents = [
  {
    id: 1,
    title: "Eco-City Challenge",
    type: "competition",
    description:
      "Build the most environmentally sustainable city with the highest efficiency rating.",
    startDate: "April 1, 2025",
    endDate: "April 15, 2025",
    prizePool: 3500,
    participants: 468,
    image: "/img/events/eco-city.png",
    status: "active",
  },
  {
    id: 2,
    title: "NFT Builder Airdrop",
    type: "airdrop",
    description:
      "Special airdrop event for active players. Get a chance to receive a rare Builder NFT.",
    date: "April 10, 2025",
    eligibility: "Players with at least 3 completed competitions",
    image: "/img/events/airdrop.png",
    status: "upcoming",
  },
  {
    id: 3,
    title: "TileVille Community AMA",
    type: "community",
    description:
      'Join the TileVille team for a live AMA session where we"ll discuss upcoming features and answer your questions.',
    date: "April 12, 2025",
    time: "3:00 PM UTC",
    platform: "Discord",
    image: "/img/events/community.png",
    status: "upcoming",
  },
  {
    id: 4,
    title: "Transportation Network Tournament",
    type: "tournament",
    description:
      "Special 48-hour competition focusing on optimal transportation network design.",
    startDate: "April 18, 2025",
    endDate: "April 20, 2025",
    prizePool: 2000,
    image: "/img/events/transportation.png",
    status: "upcoming",
  },
  {
    id: 5,
    title: "Builder NFT Launch",
    type: "nft",
    description:
      "New collection of Builder NFTs with special abilities focused on energy optimization.",
    date: "April 25, 2025",
    mintPrice: 15,
    totalSupply: 200,
    image: "/img/events/nft-launch.png",
    status: "upcoming",
  },
];

// Events in the next 3 months
const upcomingEvents = [
  {
    id: 6,
    title: "Coastal City Championship",
    type: "competition",
    date: "May 5-20, 2025",
    prizePool: 5000,
    description:
      "Design resilient coastal cities that withstand rising sea levels while maintaining efficiency.",
  },
  {
    id: 7,
    title: "Desert Expansion Update",
    type: "game-update",
    date: "May 15, 2025",
    description:
      "Major game update introducing desert terrain and new building types for arid environments.",
  },
  {
    id: 8,
    title: "Community Build Challenge",
    type: "community",
    date: "May 25, 2025",
    description:
      "Community event where players collaborate to build a mega-city together through shared designs.",
  },
  {
    id: 9,
    title: "Season 3: Desert Winds",
    type: "season",
    date: "June 1, 2025",
    description:
      "New season begins with desert-themed rewards, challenges, and exclusive content.",
  },
  {
    id: 10,
    title: "TileVille Championship 2025",
    type: "tournament",
    date: "June 15-30, 2025",
    prizePool: 10000,
    description:
      "The biggest tournament of the year with multiple rounds and elimination brackets.",
  },
];

// Past notable events
const pastEvents = [
  {
    id: 101,
    title: "Winter Wonderland Challenge",
    type: "competition",
    date: "January 10-25, 2025",
    winner: "ArchitectX",
    prizePool: 4000,
    participants: 582,
  },
  {
    id: 102,
    title: "First Anniversary Celebration",
    type: "community",
    date: "February 1, 2025",
    specialAwards: "Legendary Builder NFTs",
    participants: 1200,
  },
  {
    id: 103,
    title: "Season 2: Renewable Future",
    type: "season",
    date: "March 1 - May 31, 2025",
    themeDescription: "Focus on renewable energy and sustainable city designs",
  },
];

// Calendar Navigation
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const currentMonth = 3; // April (0-indexed)

export default function EventsCalendarPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:py-20">
      <h1 className="mb-4 text-center text-3xl font-bold text-primary md:text-5xl">
        TileVille Events Calendar
      </h1>
      <p className="mx-auto mb-10 max-w-2xl text-center">
        Stay updated with all upcoming competitions, tournaments, and community
        events in the TileVille ecosystem.
      </p>

      {/* Calendar Navigation */}
      <div className="mb-8 flex items-center justify-between">
        <button className="rounded-full bg-white/10 p-2 hover:bg-white/20">
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <h2 className="text-2xl font-bold">{months[currentMonth]} 2025</h2>
        <button className="rounded-full bg-white/10 p-2 hover:bg-white/20">
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      <div className="mb-16">
        <h2 className="mb-6 text-2xl font-bold text-primary">
          This Months Events
        </h2>
        <div className="space-y-6">
          {currentMonthEvents.map((event) => (
            <div
              key={event.id}
              className={`overflow-hidden rounded-xl bg-white/10 shadow-lg backdrop-blur-md ${
                event.status === "active" ? "border border-primary/50" : ""
              }`}
            >
              <div className="grid grid-cols-1 md:grid-cols-4">
                <div className="relative h-48 md:h-auto">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                  {event.status === "active" && (
                    <div className="absolute left-4 top-4 rounded-full bg-primary/80 px-2 py-1 text-xs font-bold text-white">
                      Active Now
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-2 md:hidden">
                    <h3 className="text-lg font-bold text-white">
                      {event.title}
                    </h3>
                    <div className="flex items-center">
                      <span
                        className={`mr-2 inline-block h-3 w-3 rounded-full ${getEventTypeColor(
                          event.type
                        )}`}
                      ></span>
                      <span className="text-sm capitalize text-white/90">
                        {event.type}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-span-3 p-6">
                  <div className="mb-3 flex flex-col justify-between gap-2 md:flex-row md:items-center">
                    <div>
                      <h3 className="hidden text-xl font-bold md:block">
                        {event.title}
                      </h3>
                      <div className="mt-1 flex hidden items-center md:flex">
                        <span
                          className={`mr-2 inline-block h-3 w-3 rounded-full ${getEventTypeColor(
                            event.type
                          )}`}
                        ></span>
                        <span className="text-sm capitalize text-white/70">
                          {event.type}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      {event.type === "competition" ||
                      event.type === "tournament" ? (
                        <>
                          <div className="rounded-lg bg-primary/20 px-3 py-1 text-sm">
                            <span className="font-bold text-primary">
                              {event.prizePool} MINA
                            </span>{" "}
                            Prize Pool
                          </div>
                          {event.participants && (
                            <div className="rounded-lg bg-white/10 px-3 py-1 text-sm">
                              <span className="font-bold">
                                {event.participants}
                              </span>{" "}
                              Participants
                            </div>
                          )}
                        </>
                      ) : null}
                      {event.type === "nft" && (
                        <>
                          <div className="rounded-lg bg-primary/20 px-3 py-1 text-sm">
                            <span className="font-bold text-primary">
                              {event.mintPrice} MINA
                            </span>{" "}
                            Mint Price
                          </div>
                          <div className="rounded-lg bg-white/10 px-3 py-1 text-sm">
                            <span className="font-bold">
                              {event.totalSupply}
                            </span>{" "}
                            Total Supply
                          </div>
                        </>
                      )}
                      <div className="rounded-lg bg-white/10 px-3 py-1 text-sm">
                        {event.startDate && event.endDate ? (
                          <>
                            {event.startDate} - {event.endDate}
                          </>
                        ) : (
                          <>{event.date}</>
                        )}
                        {event.time && <> • {event.time}</>}
                      </div>
                    </div>
                  </div>
                  <p className="mb-4 text-white/80">{event.description}</p>
                  <div className="mt-auto flex flex-col gap-3 sm:flex-row">
                    {event.type === "competition" ||
                    event.type === "tournament" ? (
                      <Link
                        href={`/competitions/${event.id}`}
                        className="rounded-md bg-primary px-4 py-2 text-center text-white transition-colors hover:bg-primary/80"
                      >
                        {event.status === "active"
                          ? "Join Now"
                          : "View Details"}
                      </Link>
                    ) : event.type === "nft" ? (
                      <Link
                        href={`/marketplace/collection/NFTBuilders`}
                        className="rounded-md bg-primary px-4 py-2 text-center text-white transition-colors hover:bg-primary/80"
                      >
                        View Collection
                      </Link>
                    ) : event.type === "community" ? (
                      <a
                        href="#"
                        className="rounded-md bg-primary px-4 py-2 text-center text-white transition-colors hover:bg-primary/80"
                      >
                        {event.platform === "Discord"
                          ? "Join Discord"
                          : "Learn More"}
                      </a>
                    ) : (
                      <Link
                        href={`/events/${event.id}`}
                        className="rounded-md bg-primary px-4 py-2 text-center text-white transition-colors hover:bg-primary/80"
                      >
                        Details
                      </Link>
                    )}
                    <button className="rounded-md bg-white/10 px-4 py-2 text-center transition-colors hover:bg-white/20">
                      Add to Calendar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Calendar View */}
      <div className="mb-16">
        <h2 className="mb-6 text-2xl font-bold text-primary">Calendar View</h2>
        <div className="overflow-hidden rounded-xl bg-white/10 p-4 shadow-lg backdrop-blur-md md:p-6">
          <div className="mb-2 grid grid-cols-7 gap-1">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="py-2 text-center font-bold">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {/* Empty spaces for days before month start (April 1, 2025 is a Tuesday) */}
            {[...Array(1)].map((_, i) => (
              <div
                key={`empty-start-${i}`}
                className="aspect-square rounded-md bg-black/20 opacity-40"
              ></div>
            ))}

            {/* Actual days */}
            {[...Array(30)].map((_, i) => {
              const day = i + 1;
              const hasEvent = currentMonthEvents.some((event) => {
                if (event.date) {
                  return event.date.includes(`April ${day}`);
                }
                if (event.startDate && event.endDate) {
                  const startDay = parseInt(event.startDate.split(" ")[1]);
                  const endDay = parseInt(event.endDate.split(" ")[1]);
                  return day >= startDay && day <= endDay;
                }
                return false;
              });

              return (
                <div
                  key={`day-${day}`}
                  className={`relative aspect-square rounded-md bg-black/20 ${
                    hasEvent ? "ring-1 ring-primary" : ""
                  } ${day === 12 ? "bg-primary/30" : ""}`}
                >
                  <div className="absolute left-2 top-2 text-sm font-bold">
                    {day}
                  </div>
                  {hasEvent && (
                    <div className="absolute bottom-2 right-2 h-2 w-2 rounded-full bg-primary"></div>
                  )}
                </div>
              );
            })}

            {/* Empty spaces for days after month end */}
            {[...Array(2)].map((_, i) => (
              <div
                key={`empty-end-${i}`}
                className="aspect-square rounded-md bg-black/20 opacity-40"
              ></div>
            ))}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-end gap-4 text-sm">
          <div className="flex items-center">
            <div className="mr-2 h-3 w-3 rounded-md bg-primary/30"></div>
            <span>Today</span>
          </div>
          <div className="flex items-center">
            <div className="mr-2 h-3 w-3 rounded-full bg-primary"></div>
            <span>Event</span>
          </div>
        </div>
      </div>

      {/* Upcoming events in following months */}
      <div className="mb-16">
        <h2 className="mb-6 text-2xl font-bold text-primary">
          Upcoming Events
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {upcomingEvents.map((event) => (
            <div
              key={event.id}
              className="rounded-xl bg-white/10 p-5 backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              <div className="mb-3 flex items-start justify-between">
                <div>
                  <h3 className="font-bold">{event.title}</h3>
                  <div className="mt-1 flex items-center">
                    <span
                      className={`mr-2 inline-block h-3 w-3 rounded-full ${getEventTypeColor(
                        event.type
                      )}`}
                    ></span>
                    <span className="text-sm capitalize text-white/70">
                      {event.type}
                    </span>
                  </div>
                </div>
                <div className="rounded-md bg-white/10 px-2 py-1 text-sm">
                  {event.date}
                </div>
              </div>
              <p className="mb-4 text-sm text-white/70">{event.description}</p>
              {event.prizePool && (
                <div className="inline-block rounded-md bg-primary/20 px-2 py-1 text-sm text-primary">
                  {event.prizePool} MINA Prize Pool
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link
            href="/events/upcoming"
            className="inline-block rounded-md bg-white/10 px-6 py-2 transition-colors hover:bg-white/20"
          >
            View All Upcoming Events
          </Link>
        </div>
      </div>

      {/* Past Events */}
      <div>
        <h2 className="mb-6 text-2xl font-bold text-primary">
          Past Notable Events
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm">
            <thead className="bg-black/20">
              <tr>
                <th className="px-4 py-3 text-left">Event</th>
                <th className="px-4 py-3 text-left">Type</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Highlights</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/20">
              {pastEvents.map((event) => (
                <tr key={event.id} className="hover:bg-white/5">
                  <td className="px-4 py-3 font-medium">{event.title}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <span
                        className={`mr-2 inline-block h-3 w-3 rounded-full ${getEventTypeColor(
                          event.type
                        )}`}
                      ></span>
                      <span className="capitalize">{event.type}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">{event.date}</td>
                  <td className="px-4 py-3">
                    {event.winner && (
                      <div>
                        Winner:{" "}
                        <span className="font-medium">{event.winner}</span>
                      </div>
                    )}
                    {event.prizePool && (
                      <div>
                        Prize:{" "}
                        <span className="font-medium">
                          {event.prizePool} MINA
                        </span>
                      </div>
                    )}
                    {event.participants && (
                      <div>
                        Participants:{" "}
                        <span className="font-medium">
                          {event.participants}
                        </span>
                      </div>
                    )}
                    {event.specialAwards && (
                      <div>
                        Special Awards:{" "}
                        <span className="font-medium">
                          {event.specialAwards}
                        </span>
                      </div>
                    )}
                    {event.themeDescription && (
                      <div>
                        Theme:{" "}
                        <span className="font-medium">
                          {event.themeDescription}
                        </span>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/events/past/${event.id}`}
                      className="text-primary hover:underline"
                    >
                      View Recap
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6 text-center">
          <Link
            href="/events/archive"
            className="inline-block rounded-md bg-white/10 px-6 py-2 transition-colors hover:bg-white/20"
          >
            Browse Event Archive
          </Link>
        </div>
      </div>

      {/* Subscribe to event notifications */}
      <div className="mt-16 rounded-xl bg-gradient-to-r from-primary/30 to-blue-900/30 p-6 backdrop-blur-sm">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div>
            <h2 className="mb-2 text-xl font-bold">Never Miss an Event</h2>
            <p className="mb-0 md:mb-0">
              Get notifications about upcoming events, competitions, and special
              NFT drops directly to your telegram.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/profile?tab=preferences"
              className="rounded-md bg-primary px-5 py-2 text-center text-white transition-colors hover:bg-primary/80"
            >
              Manage Notifications
            </Link>
            <Link
              href="/telegram"
              className="flex items-center justify-center rounded-md bg-white/10 px-5 py-2 text-center text-white transition-colors hover:bg-white/20"
            >
              <svg
                className="mr-2 h-5 w-5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.05.01-.23-.08-.32-.09-.1-.21-.07-.3-.04-.13.04-2.2 1.4-6.26 4.07-.59.41-1.12.6-1.6.58-.53-.01-1.54-.3-2.3-.55-.92-.31-1.66-.47-1.6-.99.03-.27.38-.54 1.05-.83 4.15-1.83 6.92-3.03 8.32-3.61 3.97-1.66 4.8-1.95 5.33-1.96.12 0 .37.03.54.18.14.12.23.32.25.52.01.09.01.18 0 .27z" />
              </svg>
              Connect Telegram
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper function to get event type colors
function getEventTypeColor(type: string): string {
  switch (type) {
    case "competition":
      return "bg-blue-500";
    case "tournament":
      return "bg-purple-500";
    case "community":
      return "bg-green-500";
    case "airdrop":
      return "bg-yellow-500";
    case "nft":
      return "bg-pink-500";
    case "game-update":
      return "bg-orange-500";
    case "season":
      return "bg-teal-500";
    default:
      return "bg-gray-500";
  }
}
