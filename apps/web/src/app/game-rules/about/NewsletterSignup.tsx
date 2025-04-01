import React from "react";

type NewsletterSignupProps = {
  compact?: boolean;
  dark?: boolean;
};

export default function NewsletterSignup({
  compact = false,
  dark = false,
}: NewsletterSignupProps) {
  const textColor = dark ? "text-white" : "text-gray-800";
  const bgColor = dark ? "bg-gray-800" : "bg-white";
  const borderColor = dark ? "border-gray-700" : "border-gray-200";

  return (
    <div
      className={`rounded-lg border ${borderColor} ${bgColor} p-4 ${
        compact ? "" : "p-6"
      }`}
    >
      <div className={`${compact ? "mb-3" : "mb-4"}`}>
        <h3
          className={`${
            compact ? "text-lg" : "text-xl"
          } font-semibold ${textColor}`}
        >
          Stay Updated
        </h3>
        {!compact && (
          <p
            className={`mt-1 text-sm ${
              dark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Subscribe to our newsletter for updates, tips, and exclusive offers
          </p>
        )}
      </div>

      <form className="flex flex-col gap-2 sm:flex-row">
        <input
          type="email"
          placeholder="your.email@example.com"
          className="flex-grow rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
        <button
          type="submit"
          className="whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
}
