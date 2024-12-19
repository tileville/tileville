"use client";
import {
  BellIcon,
  Cross2Icon,
  PersonIcon,
  //   TrophyIcon,
  //   BellRingIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import { useState, useEffect } from "react";

export const TelegramBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  // Check if banner was previously closed
  useEffect(() => {
    const isBannerClosed = localStorage.getItem("telegram_banner_closed");
    if (isBannerClosed) {
      setIsVisible(false);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem("telegram_banner_closed", "true");
  };

  if (!isVisible) return null;

  return (
    <div className="fixed right-4 top-20 z-50 w-80 rounded-lg border border-blue-100 bg-white p-4 shadow-lg">
      <button
        onClick={handleClose}
        className="absolute right-2 top-2 text-gray-400 hover:text-gray-600"
      >
        <Cross2Icon />
      </button>

      <div className="space-y-4">
        <div className="flex items-center gap-2 text-[#1570EF] ">
          <BellIcon className="h-6 w-6" />
          <h2 className="text-lg font-semibold">
            Stay Updated with TileVille!
          </h2>
        </div>

        <p className="text-sm text-[#1570EF]">
          Connect your Telegram account for real-time notifications about:
        </p>

        <ul className="space-y-2 text-sm text-[#1570EF]">
          <li className="flex items-center gap-2">
            {/* <TrophyIcon /> */}
            New competitions
          </li>
          <li className="flex items-center gap-2">
            <PersonIcon /> Player challenges
          </li>
          <li className="flex items-center gap-2">
            {/* <BellRingIcon /> */}
            Challenge acceptances
          </li>
          <li className="flex items-center gap-2">
            {/* <TrophyIcon /> */}
            Prize claim alerts
          </li>
        </ul>

        <Link
          href={process.env.NEXT_PUBLIC_TILEVILLE_BOT_URL || "#"}
          target="_blank"
          className="block rounded-md bg-[#1570EF] px-4 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          Connect Telegram Account
        </Link>
      </div>
    </div>
  );
};
