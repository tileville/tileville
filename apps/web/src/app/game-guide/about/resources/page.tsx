import {
  ArrowRightIcon,
  ExternalLinkIcon,
  FileTextIcon,
  VideoIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";

export default function ResourcesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
          TileVille Resources
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-lg text-gray-500">
          Helpful guides, documents, and tools for TileVille players
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {RESOURCES.map((resource) => (
          <Link
            key={resource.title}
            href={resource.link}
            target={resource.external ? "_blank" : undefined}
            className="group flex flex-col rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-primary/50 hover:shadow-md"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-primary/10 text-primary">
              {resource.icon === "file" && (
                <FileTextIcon width={24} height={24} />
              )}
              {resource.icon === "video" && (
                <VideoIcon width={24} height={24} />
              )}
              {resource.icon === "link" && (
                <ExternalLinkIcon width={24} height={24} />
              )}
            </div>

            <h3 className="mb-2 text-lg font-bold group-hover:text-primary">
              {resource.title}
            </h3>
            <p className="mb-4 flex-grow text-sm text-gray-500">
              {resource.description}
            </p>

            <div className="flex items-center text-sm font-medium text-primary">
              {resource.external ? "External Link" : "View Resource"}
              <ArrowRightIcon className="ml-1" />
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-16 rounded-lg bg-primary/10 p-8 text-center">
        <h2 className="text-xl font-bold text-primary">Need More Help?</h2>
        <p className="mx-auto mt-2 max-w-2xl text-gray-600">
          Join our community channels for direct assistance from our team and
          other players
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-4">
          <a
            href="https://t.me/tilevilleBugs"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md bg-primary px-5 py-2 text-white hover:bg-primary/90"
          >
            Telegram
          </a>
          <Link
            href="/faq"
            className="rounded-md border border-primary bg-white px-5 py-2 text-primary hover:bg-primary/5"
          >
            FAQ
          </Link>
        </div>
      </div>
    </div>
  );
}

const RESOURCES = [
  {
    title: 'Beginner"s Guide',
    description:
      "Start your TileVille journey with this comprehensive guide for new players.",
    link: "/guide",
    icon: "file",
    external: false,
  },
  {
    title: "Video Tutorial",
    description:
      "Watch our step-by-step tutorial on basic city building techniques.",
    link: "https://youtu.be/rUd880VHHT0",
    icon: "video",
    external: true,
  },
  {
    title: "NFT Traits Explained",
    description:
      "Learn about the different NFT traits and how they affect your gameplay.",
    link: "/traits-info",
    icon: "file",
    external: false,
  },
  {
    title: "Mina Protocol Docs",
    description: "Understand the blockchain technology that powers TileVille.",
    link: "https://docs.minaprotocol.com/",
    icon: "link",
    external: true,
  },
  {
    title: "Auro Wallet Setup",
    description: "Guide to setting up your Auro wallet for TileVille gameplay.",
    link: "/wallet-setup",
    icon: "file",
    external: false,
  },
  {
    title: "Community Wiki",
    description: "Player-created wiki with advanced strategies and tips.",
    link: "#",
    icon: "link",
    external: true,
  },
];
