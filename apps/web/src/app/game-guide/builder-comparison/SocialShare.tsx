import React from "react";

type SocialShareProps = {
  url: string;
  title: string;
  platforms?: ("twitter" | "telegram" | "discord" | "copy")[];
  compact?: boolean;
};

export default function SocialShare({
  url,
  title,
  platforms = ["twitter", "telegram", "copy"],
  compact = false,
}: SocialShareProps) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
    discord: `https://discord.com/channels/@me`, // Discord doesn't have direct sharing, open app
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    alert("Link copied to clipboard!");
  };

  return (
    <div className="flex flex-wrap gap-2">
      {platforms.map((platform) => (
        <React.Fragment key={platform}>
          {platform === "copy" ? (
            <button
              onClick={copyToClipboard}
              className="rounded-md border border-gray-300 bg-white px-3 py-1 text-sm hover:bg-gray-50"
            >
              {compact ? "Copy" : "Copy Link"}
            </button>
          ) : (
            <a
              href={shareLinks[platform]}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-primary px-3 py-1 text-sm text-white hover:bg-primary/90"
            >
              {compact
                ? platform.charAt(0).toUpperCase() + platform.slice(1)
                : `Share on ${
                    platform.charAt(0).toUpperCase() + platform.slice(1)
                  }`}
            </a>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
