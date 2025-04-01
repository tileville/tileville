import React from "react";
import Link from "next/link";

type LeaderboardEntryProps = {
  rank: number;
  username: string;
  walletAddress: string;
  score: number;
  isCurrentUser?: boolean;
  showFullAddress?: boolean;
};

export default function LeaderboardEntry({
  rank,
  username,
  walletAddress,
  score,
  isCurrentUser = false,
  showFullAddress = false,
}: LeaderboardEntryProps) {
  const shortenedAddress = showFullAddress
    ? walletAddress
    : `${walletAddress.slice(0, 8)}...${walletAddress.slice(-4)}`;

  return (
    <div
      className={`flex items-center justify-between rounded-md p-3 ${
        isCurrentUser ? "bg-primary/10" : "bg-white"
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`flex h-6 w-6 items-center justify-center rounded-full ${
            rank <= 3 ? "bg-primary text-white" : "bg-gray-100"
          }`}
        >
          {rank}
        </div>
        <div>
          <Link
            href={`/u/${username}`}
            className="font-medium hover:text-primary hover:underline"
          >
            {username}
          </Link>
          <div className="text-xs text-gray-500">{shortenedAddress}</div>
        </div>
      </div>
      <div className="font-semibold">{score.toLocaleString()}</div>
    </div>
  );
}
