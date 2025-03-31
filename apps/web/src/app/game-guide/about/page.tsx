import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About TileVille",
  description:
    "Learn about TileVille, the strategic city-builder game on Mina Protocol",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl p-6">
      <h1 className="mb-6 text-3xl font-bold text-primary">About TileVille</h1>

      <p className="mb-4">
        TileVille is a strategic city-building game built on the Mina Protocol
        blockchain. Combining engaging gameplay with blockchain innovation, were
        creating a new kind of gaming experience where players truly own their
        in-game assets.
      </p>

      <p className="mb-8">
        Founded in 2024, our mission is to make blockchain gaming accessible,
        fun, and rewarding for everyone, regardless of their blockchain
        experience.
      </p>

      <div className="mb-8 rounded-lg bg-primary/10 p-6">
        <h2 className="mb-4 text-xl font-semibold">Our Vision</h2>
        <p>
          We believe in a future where gaming and blockchain technology
          seamlessly blend to create experiences that are not only fun but also
          empower players with true ownership of their digital assets and
          achievements.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="mb-4 text-xl font-semibold">Connect With Us</h2>
        <div className="flex flex-wrap gap-4">
          <a
            href="https://twitter.com/TilevilleSocial"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-primary px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10"
          >
            Twitter
          </a>
          <a
            href="https://t.me/tileville_mayor_bot"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-primary px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10"
          >
            Telegram
          </a>
          <a
            href="https://discord.gg/tileville"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-primary px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10"
          >
            Discord
          </a>
        </div>
      </div>

      <div className="text-center">
        <Link
          href="/contact"
          className="rounded-md bg-primary px-6 py-2 font-semibold text-white hover:bg-primary/90"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
}
