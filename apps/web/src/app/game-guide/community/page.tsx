import { Metadata } from "next";
import Link from "next/link";
import {
  CalendarIcon,
  ChatBubbleIcon,
  GlobeIcon,
  PersonIcon,
  Share1Icon,
} from "@radix-ui/react-icons";

export const metadata: Metadata = {
  title: "TileVille | Community Hub",
  description:
    "Connect with other TileVille players, join events, and stay updated with the community",
};

const CommunityCard = ({
  title,
  description,
  icon: Icon,
  link,
  linkText,
  external = false,
}: {
  title: string;
  description: string;
  icon: React.ElementType;
  link: string;
  linkText: string;
  external?: boolean;
}) => (
  <div className="flex h-full flex-col rounded-lg bg-black/30 p-6">
    <div className="mb-4 flex items-center">
      <div className="mr-3 rounded-full bg-primary/20 p-3">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
    </div>
    <p className="mb-6 flex-grow text-gray-300">{description}</p>
    {external ? (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-white transition-colors hover:bg-primary/80"
      >
        {linkText}
        <Share1Icon className="ml-2 h-4 w-4" />
      </a>
    ) : (
      <Link
        href={link}
        className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-white transition-colors hover:bg-primary/80"
      >
        {linkText}
      </Link>
    )}
  </div>
);

const EventCard = ({
  title,
  date,
  description,
  link,
}: {
  title: string;
  date: string;
  description: string;
  link: string;
}) => (
  <div className="flex h-full flex-col overflow-hidden rounded-lg bg-black/30">
    <div className="flex-grow p-6">
      <div className="mb-2 flex items-center text-sm text-gray-400">
        <CalendarIcon className="mr-2 h-4 w-4" />
        <span>{date}</span>
      </div>
      <h3 className="mb-2 text-xl font-semibold">{title}</h3>
      <p className="mb-4 text-gray-300">{description}</p>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center text-primary transition-colors hover:text-primary/80"
      >
        Learn more
        <Share1Icon className="ml-1 h-4 w-4" />
      </a>
    </div>
  </div>
);

export default function CommunityPage() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-12">
      <h1 className="mb-8 text-center text-4xl font-bold text-primary">
        TileVille Community Hub
      </h1>

      <div className="mb-12 rounded-lg bg-black/20 p-6 text-center">
        <h2 className="mb-4 text-2xl font-semibold">
          Connect with Fellow Builders
        </h2>
        <p className="mx-auto mb-6 max-w-3xl">
          TileVille is more than just a game—its a thriving community of city
          builders, strategic planners, and blockchain enthusiasts. Join us
          across various platforms to share strategies, showcase your cities,
          participate in events, and shape the future of TileVille.
        </p>
        <div className="flex justify-center space-x-4">
          <a
            href="https://x.com/intent/user?screen_name=TilevilleSocial"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-primary bg-primary/20 p-3 transition-colors hover:bg-primary/30"
            aria-label="Twitter"
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          <a
            href="https://t.me/tilevilleBugs"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-primary bg-primary/20 p-3 transition-colors hover:bg-primary/30"
            aria-label="Telegram"
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.05-.2-.06-.06-.16-.04-.23-.02-.1.03-1.62 1.03-4.58 3.01-.43.3-.82.45-1.17.44-.39-.01-1.13-.22-1.67-.4-.68-.23-1.22-.35-1.17-.74.02-.2.3-.4.83-.6 3.27-1.42 5.44-2.36 6.52-2.8 3.1-1.27 3.75-1.5 4.17-1.5.09 0 .29.02.42.12.11.08.22.25.24.4.03.15.02.36-.06.51z" />
            </svg>
          </a>
          <a
            href="https://discord.gg/tileville"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-primary bg-primary/20 p-3 transition-colors hover:bg-primary/30"
            aria-label="Discord"
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.385-.403.8-.548 1.17a16.38 16.38 0 0 0-4.93 0 9.57 9.57 0 0 0-.55-1.17.077.077 0 0 0-.079-.036 19.795 19.795 0 0 0-4.885 1.491.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106c-.653-.248-1.274-.549-1.872-.892a.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.962 19.962 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.029zM8.02 15.33c-1.183 0-2.157-1.086-2.157-2.419 0-1.332.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.332-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.086-2.157-2.419 0-1.332.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.332-.946 2.418-2.157 2.418z" />
            </svg>
          </a>
        </div>
      </div>

      <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2">
        <CommunityCard
          title="Telegram Community"
          description="Join our active Telegram community where builders share tips, strategies, and showcase their best cities. Our team is also there to provide assistance and updates."
          icon={ChatBubbleIcon}
          link="https://t.me/tilevilleBugs"
          linkText="Join Telegram Group"
          external={true}
        />

        <CommunityCard
          title="Player Directory"
          description="Browse profiles of other TileVille players, follow builders you admire, and connect with people who share your interest in strategic city planning."
          icon={PersonIcon}
          link="/leaderboard"
          linkText="View Players"
        />

        <CommunityCard
          title="Report Bugs & Feedback"
          description="Found a bug or have a suggestion? Help us improve TileVille by submitting your feedback directly to our development team."
          icon={ChatBubbleIcon}
          link="/bug-report"
          linkText="Submit Feedback"
        />

        <CommunityCard
          title="Create a Competition"
          description="Want to challenge the community with your own competition parameters? Host a custom event and invite others to participate."
          icon={GlobeIcon}
          link="/competitions"
          linkText="Create Competition"
        />
      </div>

      <h2 className="mb-6 text-center text-2xl font-semibold">
        Upcoming Community Events
      </h2>

      <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-3">
        <EventCard
          title="TileVille Summer Build-Off"
          date="July 15-30, 2025"
          description="A two-week building competition focused on sustainable city designs with special prizes for most innovative energy solutions."
          link="/competitions"
        />

        <EventCard
          title="Builder NFT Season 2 Launch"
          date="August 5, 2025"
          description="Join us for the exclusive preview and mint event for the second season of Builder NFTs featuring new special abilities."
          link="/marketplace"
        />
      </div>

      <div className="rounded-lg bg-black/20 p-6">
        <h2 className="mb-4 text-center text-2xl font-semibold">
          Community Spotlight
        </h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="rounded-lg bg-black/30 p-6">
            <h3 className="mb-4 text-xl font-semibold">
              Top Builders This Month
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center">
                <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
                  1
                </div>
                <div>
                  <p className="font-medium">CityMaster928</p>
                  <p className="text-sm text-gray-400">12 competition wins</p>
                </div>
              </li>
              <li className="flex items-center">
                <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
                  2
                </div>
                <div>
                  <p className="font-medium">UrbanPlanner42</p>
                  <p className="text-sm text-gray-400">9 competition wins</p>
                </div>
              </li>
              <li className="flex items-center">
                <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
                  3
                </div>
                <div>
                  <p className="font-medium">EcoCity_Builder</p>
                  <p className="text-sm text-gray-400">7 competition wins</p>
                </div>
              </li>
            </ul>
            <Link
              href="/leaderboard"
              className="mt-4 block text-center text-primary transition-colors hover:text-primary/80"
            >
              View Full Leaderboard
            </Link>
          </div>

          <div className="rounded-lg bg-black/30 p-6">
            <h3 className="mb-4 text-xl font-semibold">
              Featured City Designs
            </h3>
            <div className="space-y-4">
              <div>
                <p className="font-medium">Coastal Haven by WindWhisperer</p>
                <p className="text-sm text-gray-400">
                  Energy efficiency score: 96/100
                </p>
              </div>
              <div>
                <p className="font-medium">
                  Mountain Metropolis by PeakBuilder
                </p>
                <p className="text-sm text-gray-400">
                  Sustainability score: 92/100
                </p>
              </div>
            </div>
            <a
              href="#"
              className="mt-4 block text-center text-primary transition-colors hover:text-primary/80"
            >
              Submit Your Design
            </a>
          </div>
        </div>
      </div>

      <div className="mt-12 rounded-lg bg-primary/20 p-8 text-center">
        <h2 className="mb-4 text-2xl font-semibold">
          Join the TileVille Mayor Bot
        </h2>
        <p className="mx-auto mb-6 max-w-3xl">
          Stay updated with game events, notifications about your challenges,
          and receive rewards directly through our Telegram bot.
        </p>
        <a
          href="https://t.me/tileville_mayor_bot"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-md bg-primary px-6 py-3 font-medium text-white transition-colors hover:bg-primary/80"
        >
          Connect with Mayor Bot
          <Share1Icon className="ml-2 h-5 w-5" />
        </a>
      </div>
    </div>
  );
}
