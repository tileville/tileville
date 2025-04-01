import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact TileVille",
  description: "Contact the TileVille team for support or inquiries",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl p-6">
      <h1 className="mb-6 text-3xl font-bold text-primary">Contact Us</h1>

      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="mb-3 text-lg font-semibold">General Inquiries</h2>
          <p className="mb-3 text-gray-600">
            For general questions, partnership opportunities, or feedback
          </p>
          <p className="font-medium">info@tileville.xyz</p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="mb-3 text-lg font-semibold">Technical Support</h2>
          <p className="mb-3 text-gray-600">
            For help with gameplay issues, bugs, or account problems
          </p>
          <p className="font-medium">support@tileville.xyz</p>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="mb-4 text-xl font-semibold">Community Channels</h2>
        <p className="mb-4 text-gray-600">
          Join our community for faster responses and to connect with other
          players
        </p>

        <div className="flex flex-wrap gap-4">
          <a
            href="https://discord.gg/tileville"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
          >
            Discord Server
          </a>
          <a
            href="https://t.me/tileville_mayor_bot"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-primary px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10"
          >
            Telegram
          </a>
        </div>
      </div>

      <div className="rounded-lg bg-primary/10 p-6 text-center">
        <h2 className="mb-3 text-lg font-semibold">Cant find what you need?</h2>
        <p className="mb-4">
          Check our FAQs for quick answers to common questions
        </p>
        <Link
          href="/faq"
          className="rounded-md border border-primary px-6 py-2 font-semibold text-primary hover:bg-primary/10"
        >
          View FAQ
        </Link>
      </div>
    </div>
  );
}
