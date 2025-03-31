import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Coming Soon - TileVille",
  description: "This feature is coming soon to TileVille",
};

export default function ComingSoonPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center p-6 text-center">
      <h1 className="mb-4 text-3xl font-bold text-primary">Coming Soon</h1>
      <p className="mb-6 max-w-md text-gray-600">
        Were working hard to bring this feature to TileVille. Check back soon!
      </p>
      <div className="flex flex-wrap gap-4">
        <Link
          href="/"
          className="rounded-md bg-primary px-6 py-2 font-semibold text-white hover:bg-primary/90"
        >
          Back to Home
        </Link>
        <Link
          href="/roadmap"
          className="rounded-md border border-primary px-6 py-2 font-semibold text-primary hover:bg-primary/10"
        >
          View Roadmap
        </Link>
      </div>
    </div>
  );
}
