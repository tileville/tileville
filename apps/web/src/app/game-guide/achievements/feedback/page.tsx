import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "TileVille Feedback",
  description: "Share your feedback and suggestions for TileVille",
};

export default function FeedbackPage() {
  return (
    <div className="mx-auto max-w-4xl p-6">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold text-primary">
          Share Your Feedback
        </h1>
        <p className="text-gray-600">
          Help us improve TileVille by sharing your thoughts and suggestions
        </p>
      </div>

      <div className="mb-8 rounded-lg bg-primary/10 p-6">
        <p className="mb-4">
          At TileVille, we value community input and are constantly working to
          improve the game based on player feedback. Whether you have
          suggestions for new features, encountered a bug, or simply want to
          share your thoughts about the game, we want to hear from you!
        </p>
        <p>
          Your feedback helps shape the future of TileVille. Many of our updates
          and new features come directly from community suggestions.
        </p>
      </div>

      <div className="mb-10 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-2xl font-semibold">Feedback Form</h2>

        <form className="space-y-6">
          <div>
            <label
              htmlFor="feedbackType"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Feedback Type
            </label>
            <select
              id="feedbackType"
              className="w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="suggestion">Feature Suggestion</option>
              <option value="bug">Bug Report</option>
              <option value="gameplay">Gameplay Feedback</option>
              <option value="nft">NFT Feedback</option>
              <option value="ux">User Experience</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="subject"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Subject
            </label>
            <input
              type="text"
              id="subject"
              placeholder="Brief subject of your feedback"
              className="w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Your Feedback
            </label>
            <textarea
              id="message"
              rows={6}
              placeholder="Please provide as much detail as possible"
              className="w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            ></textarea>
          </div>

          <div>
            <label
              htmlFor="walletAddress"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Wallet Address (optional)
            </label>
            <input
              type="text"
              id="walletAddress"
              placeholder="Your Mina wallet address"
              className="w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <p className="mt-1 text-xs text-gray-500">
              Providing your wallet address helps us contact you if we need
              additional information
            </p>
          </div>

          <div>
            <label
              htmlFor="contact"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Contact Email (optional)
            </label>
            <input
              type="email"
              id="contact"
              placeholder="your.email@example.com"
              className="w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div className="flex items-start">
            <input
              type="checkbox"
              id="follow-up"
              className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <label
              htmlFor="follow-up"
              className="ml-2 block text-sm text-gray-700"
            >
              Im willing to be contacted for follow-up questions about my
              feedback
            </label>
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-primary px-4 py-2 font-medium text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Submit Feedback
          </button>
        </form>
      </div>

      <div className="mb-10">
        <h2 className="mb-6 text-2xl font-semibold">
          Other Ways to Provide Feedback
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
            <h3 className="mb-3 text-lg font-medium">Discord Community</h3>
            <p className="mb-4 text-sm text-gray-600">
              Join our Discord server to discuss ideas with the community and
              dev team
            </p>
            <a
              href="https://discord.gg/tileville"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-md border border-primary px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10"
            >
              Join Discord
            </a>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
            <h3 className="mb-3 text-lg font-medium">Telegram Group</h3>
            <p className="mb-4 text-sm text-gray-600">
              Follow our Telegram channel for updates and to share your thoughts
            </p>
            <a
              href="https://t.me/tileville_mayor_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-md border border-primary px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10"
            >
              Join Telegram
            </a>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
            <h3 className="mb-3 text-lg font-medium">Email Support</h3>
            <p className="mb-4 text-sm text-gray-600">
              Contact our support team directly with your feedback
            </p>
            <a
              href="mailto:feedback@tileville.xyz"
              className="inline-block rounded-md border border-primary px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10"
            >
              Send Email
            </a>
          </div>
        </div>
      </div>

      <div className="mb-10">
        <h2 className="mb-6 text-2xl font-semibold">Feedback Process</h2>

        <div className="space-y-4">
          <div className="flex items-start space-x-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/20 text-lg font-bold text-primary">
              1
            </div>
            <div>
              <h3 className="text-lg font-medium">Submit Your Feedback</h3>
              <p className="text-gray-600">
                Use this form or any of our community channels to share your
                thoughts
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/20 text-lg font-bold text-primary">
              2
            </div>
            <div>
              <h3 className="text-lg font-medium">Review Process</h3>
              <p className="text-gray-600">
                Our team reviews all feedback and categorizes it based on type
                and priority
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/20 text-lg font-bold text-primary">
              3
            </div>
            <div>
              <h3 className="text-lg font-medium">Development Consideration</h3>
              <p className="text-gray-600">
                Popular or impactful suggestions are considered for upcoming
                development cycles
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/20 text-lg font-bold text-primary">
              4
            </div>
            <div>
              <h3 className="text-lg font-medium">Implementation</h3>
              <p className="text-gray-600">
                Selected ideas become part of our roadmap and are developed for
                future releases
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-primary/10 p-6 text-center">
        <h2 className="mb-4 text-xl font-semibold">
          Thank You for Your Input!
        </h2>
        <p className="mb-4">
          Your feedback is invaluable to us. Were constantly working to make
          TileVille better based on community suggestions.
        </p>
        <Link
          href="/roadmap"
          className="rounded-md border border-primary px-6 py-2 font-semibold text-primary hover:bg-primary/10"
        >
          View Our Roadmap
        </Link>
      </div>
    </div>
  );
}
