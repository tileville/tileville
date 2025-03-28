import React from "react";
import Image from "next/image";
import Link from "next/link";

// Event Card Component
const EventCard = ({
  title,
  date,
  time,
  location,
  isVirtual,
  image,
  description,
  speakers,
  attendees,
}: {
  title: string;
  date: string;
  time: string;
  location: string;
  isVirtual: boolean;
  image: string;
  description: string;
  speakers: Array<{ name: string; role: string; avatar: string }>;
  attendees: number;
}) => (
  <div className="overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm transition-all hover:bg-white/10">
    <div className="relative h-48 w-full">
      {isVirtual && (
        <span className="absolute right-3 top-3 rounded-full bg-blue-500 px-3 py-1 text-xs font-bold text-white">
          Virtual
        </span>
      )}
      {!isVirtual && (
        <span className="absolute right-3 top-3 rounded-full bg-green-500 px-3 py-1 text-xs font-bold text-white">
          In Person
        </span>
      )}
    </div>

    <div className="p-6">
      <div className="mb-3 flex items-start justify-between">
        <h3 className="text-xl font-bold">{title}</h3>
        <div className="text-right">
          <p className="font-bold text-primary">{date}</p>
          <p className="text-sm text-gray-300">{time}</p>
        </div>
      </div>

      <p className="mb-4 text-sm text-gray-300">{location}</p>

      <p className="mb-6 line-clamp-3 text-sm">{description}</p>

      <div className="flex items-center justify-between">
        <div className="flex">
          {speakers.slice(0, 3).map((speaker, index) => (
            <div
              key={index}
              className="relative h-8 w-8 overflow-hidden rounded-full border-2 border-primary"
              style={{ marginLeft: index > 0 ? "-8px" : "0" }}
            ></div>
          ))}
          {speakers.length > 3 && (
            <div className="relative -ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold">
              +{speakers.length - 3}
            </div>
          )}
        </div>
        <span className="text-sm text-gray-300">{attendees} attending</span>
      </div>

      <Link
        href="/events/details"
        className="mt-4 block w-full rounded-md bg-primary/20 px-4 py-2 text-center font-bold text-primary transition-colors hover:bg-primary/30"
      >
        View Details
      </Link>
    </div>
  </div>
);

export default function EventsPage() {
  // Sample event data
  const upcomingEvents = [
    {
      id: 1,
      title: "NFT Creator Workshop",
      date: "April 15, 2025",
      time: "2:00 PM - 4:00 PM EST",
      location: "TileVille Virtual Campus",
      isVirtual: true,
      image: "/img/events/event1.jpg",
      description:
        "Learn how to create and mint your first NFT on the Mina blockchain. This hands-on workshop will cover the entire process from creating artwork to listing on the marketplace.",
      speakers: [
        {
          name: "Sarah Chen",
          role: "Lead Designer, TileVille",
          avatar: "/img/avatars/speaker1.jpg",
        },
        {
          name: "Marcus Johnson",
          role: "Blockchain Developer",
          avatar: "/img/avatars/speaker2.jpg",
        },
      ],
      attendees: 156,
    },
    {
      id: 2,
      title: "TileVille Community Meetup",
      date: "May 3, 2025",
      time: "6:30 PM - 9:00 PM PT",
      location: "Web3 Hub, San Francisco",
      isVirtual: false,
      image: "/img/events/event2.jpg",
      description:
        "Join fellow TileVille enthusiasts for our monthly in-person meetup. Network with creators, collectors, and the TileVille team while enjoying refreshments and exclusive demos.",
      speakers: [
        {
          name: "Elena Rodriguez",
          role: "Community Manager",
          avatar: "/img/avatars/speaker3.jpg",
        },
        {
          name: "David Park",
          role: "Product Lead",
          avatar: "/img/avatars/speaker4.jpg",
        },
        {
          name: "Aisha Williams",
          role: "NFT Artist",
          avatar: "/img/avatars/speaker5.jpg",
        },
      ],
      attendees: 78,
    },
    {
      id: 3,
      title: "Future of NFTs Panel Discussion",
      date: "May 12, 2025",
      time: "11:00 AM - 12:30 PM GMT",
      location: "TileVille Discord",
      isVirtual: true,
      image: "/img/events/event3.jpg",
      description:
        "Industry experts discuss the evolution of NFTs, upcoming trends, and the impact of zero-knowledge proofs on digital ownership. Join the conversation and get your questions answered.",
      speakers: [
        {
          name: "Dr. Mina Zhao",
          role: "Blockchain Researcher",
          avatar: "/img/avatars/speaker6.jpg",
        },
        {
          name: "Thomas Greene",
          role: "Crypto Investor",
          avatar: "/img/avatars/speaker7.jpg",
        },
        {
          name: "Leila Patel",
          role: "Digital Rights Advocate",
          avatar: "/img/avatars/speaker8.jpg",
        },
        {
          name: "James Wilson",
          role: "Game Theory Specialist",
          avatar: "/img/avatars/speaker9.jpg",
        },
      ],
      attendees: 423,
    },
    {
      id: 4,
      title: "Mina Builders Hackathon",
      date: "June 5-7, 2025",
      time: "All Day",
      location: "Tech Hub, London",
      isVirtual: false,
      image: "/img/events/event4.jpg",
      description:
        "A 48-hour hackathon focused on building innovative applications on the Mina blockchain. Join teams of developers, designers, and entrepreneurs to compete for prizes and recognition.",
      speakers: [
        {
          name: "Alex Summers",
          role: "Mina Protocol Engineer",
          avatar: "/img/avatars/speaker10.jpg",
        },
        {
          name: "Nadia Kim",
          role: "DApp Developer",
          avatar: "/img/avatars/speaker11.jpg",
        },
      ],
      attendees: 205,
    },
  ];

  const pastEvents = [
    {
      id: 5,
      title: "TileVille Launch Party",
      date: "March 1, 2025",
      time: "7:00 PM - 10:00 PM EST",
      location: "Crypto Conference Center, New York",
      isVirtual: false,
      image: "/img/events/past1.jpg",
      description:
        "Celebrate the official launch of TileVille with an evening of networking, demonstrations, and special announcements. The first 100 attendees received exclusive NFTs.",
      speakers: [
        {
          name: "Michael Turner",
          role: "CEO, TileVille",
          avatar: "/img/avatars/speaker12.jpg",
        },
        {
          name: "Jennifer Lee",
          role: "Creative Director",
          avatar: "/img/avatars/speaker13.jpg",
        },
      ],
      attendees: 267,
    },
    {
      id: 6,
      title: "Building on Mina Workshop",
      date: "February 18, 2025",
      time: "1:00 PM - 3:30 PM CET",
      location: "TileVille YouTube Channel",
      isVirtual: true,
      image: "/img/events/past2.jpg",
      description:
        "Technical workshop covering the fundamentals of developing applications on the Mina blockchain, with a focus on integrating with the TileVille ecosystem.",
      speakers: [
        {
          name: "Richard Martinez",
          role: "Lead Engineer",
          avatar: "/img/avatars/speaker14.jpg",
        },
        {
          name: "Sophie Taylor",
          role: "Developer Advocate",
          avatar: "/img/avatars/speaker15.jpg",
        },
      ],
      attendees: 512,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold text-primary md:text-5xl">
          Community Events
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-300">
          Connect with the TileVille community through virtual and in-person
          events around the world.
        </p>
      </div>

      {/* Featured Event */}
      <section className="mb-16">
        <div className="relative h-80 w-full overflow-hidden rounded-xl md:h-96">
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
          <div className="absolute bottom-0 left-0 max-w-2xl p-6 md:p-10">
            <span className="mb-4 inline-block rounded-full bg-primary px-3 py-1 text-sm font-bold text-white">
              Featured Event
            </span>
            <h2 className="mb-3 text-3xl font-bold text-white md:text-4xl">
              TileVille Summit 2025
            </h2>
            <p className="mb-2 text-gray-200">
              July 15-17, 2025 • Virtual & San Francisco
            </p>
            <p className="mb-6 max-w-lg text-gray-300">
              Our flagship annual event bringing together creators, collectors,
              developers, and enthusiasts from around the world.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/events/summit"
                className="inline-block rounded-md bg-primary px-6 py-2 font-bold text-white hover:bg-primary/80"
              >
                Learn More
              </Link>
              <Link
                href="/events/summit/register"
                className="inline-block rounded-md bg-white/20 px-6 py-2 font-bold text-white hover:bg-white/30"
              >
                Register Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Event Calendar */}
      <section className="mb-12">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Upcoming Events</h2>
          <div className="flex gap-4">
            <button className="rounded-md bg-primary/20 px-4 py-2 text-sm font-medium text-white hover:bg-primary/30">
              All Events
            </button>
            <button className="rounded-md bg-transparent px-4 py-2 text-sm font-medium text-white hover:bg-white/10">
              Virtual
            </button>
            <button className="rounded-md bg-transparent px-4 py-2 text-sm font-medium text-white hover:bg-white/10">
              In Person
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {upcomingEvents.map((event) => (
            <EventCard
              key={event.id}
              title={event.title}
              date={event.date}
              time={event.time}
              location={event.location}
              isVirtual={event.isVirtual}
              image={event.image}
              description={event.description}
              speakers={event.speakers}
              attendees={event.attendees}
            />
          ))}
        </div>
      </section>

      {/* Past Events */}
      <section className="mb-16">
        <h2 className="mb-8 text-2xl font-bold">Past Events</h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {pastEvents.map((event) => (
            <EventCard
              key={event.id}
              title={event.title}
              date={event.date}
              time={event.time}
              location={event.location}
              isVirtual={event.isVirtual}
              image={event.image}
              description={event.description}
              speakers={event.speakers}
              attendees={event.attendees}
            />
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/events/archive"
            className="font-bold text-primary hover:underline"
          >
            View All Past Events →
          </Link>
        </div>
      </section>

      {/* Host Your Own Event */}
      <section className="mt-16 rounded-xl bg-gradient-to-r from-primary/20 to-green-900/20 p-8">
        <div className="flex flex-col items-center gap-8 md:flex-row">
          <div className="flex-1">
            <h2 className="mb-4 text-2xl font-bold">
              Host Your Own TileVille Event
            </h2>
            <p className="mb-6 text-gray-300">
              Passionate about TileVille and want to bring together local
              community members? Apply to become a community host and organize
              your own meetups.
            </p>
            <Link
              href="/events/host"
              className="inline-block rounded-md bg-primary px-6 py-2 font-bold text-white hover:bg-primary/80"
            >
              Apply Now
            </Link>
          </div>
          <div className="relative h-64 w-full overflow-hidden rounded-lg md:w-1/3"></div>
        </div>
      </section>

      {/* Subscribe to Events */}
      <section className="mt-16 py-12 text-center">
        <h2 className="mb-4 text-2xl font-bold">Never Miss an Event</h2>
        <p className="mx-auto mb-8 max-w-2xl text-gray-300">
          Subscribe to our events calendar and receive notifications about
          upcoming TileVille activities.
        </p>
        <div className="mx-auto max-w-md">
          <div className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-l-md border-0 bg-white/10 px-4 py-3 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-primary"
            />
            <button className="rounded-r-md bg-primary px-6 py-3 font-bold text-white hover:bg-primary/80">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
