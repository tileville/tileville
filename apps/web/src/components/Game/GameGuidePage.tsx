import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "TileVille | Game Guide",
  description:
    "Learn how to play TileVille, the strategic city-building game on Mina Protocol",
};

export default function GuidePage() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-12">
      <h1 className="mb-8 text-center text-4xl font-bold text-primary">
        TileVille Game Guide
      </h1>

      <div className="mb-8 rounded-lg bg-black/20 p-6">
        <h2 className="mb-4 text-2xl font-semibold">Welcome to TileVille!</h2>
        <p className="mb-4">
          TileVille is a strategic city-building game built on Mina Protocol
          where youll plan, build, and grow your own thriving metropolis. This
          guide will help you understand the game mechanics, strategies, and how
          to make the most of your TileVille experience.
        </p>
        <div className="my-8 grid place-items-center"></div>
      </div>

      <div className="mt-12 rounded-lg bg-black/20 p-6">
        <h2 className="mb-4 text-2xl font-semibold">Video Tutorials</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <h3 className="mb-2 text-xl font-medium text-primary">
              Beginners Guide to TileVille
            </h3>
            <div className="flex aspect-video items-center justify-center rounded-lg bg-black/40">
              <div className="p-4 text-center">
                <p className="mb-2">Tutorial Video Thumbnail</p>
                <a
                  href="https://youtu.be/rUd880VHHT0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-md bg-primary px-4 py-2 text-white"
                >
                  Watch Tutorial
                </a>
              </div>
            </div>
          </div>
          <div>
            <h3 className="mb-2 text-xl font-medium text-primary">
              Advanced Strategy Tips
            </h3>
            <div className="flex aspect-video items-center justify-center rounded-lg bg-black/40">
              <div className="p-4 text-center">
                <p className="mb-2">Strategy Video Thumbnail</p>
                <a
                  href="#"
                  className="inline-block rounded-md bg-primary px-4 py-2 text-white"
                >
                  Coming Soon
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center">
        <Link
          href="/competitions"
          className="rounded-lg bg-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-primary/80"
        >
          Ready to Play? Join a Competition!
        </Link>
      </div>
    </div>
  );
}
