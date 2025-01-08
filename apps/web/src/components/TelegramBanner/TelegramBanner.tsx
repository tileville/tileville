"use client";
import { TILEVILLE_BOT_URL } from "@/constants";
import {
  BellIcon,
  Cross2Icon,
  PersonIcon,
  StarIcon,
  CalendarIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useNetworkStore } from "@/lib/stores/network";
import { useTelegramStatus } from "@/db/react-query-hooks";

export const TelegramBanner = () => {
  const [isVisible, setIsVisible] = useState(false); // Default to hidden
  const [isExiting, setIsExiting] = useState(false);
  const networkStore = useNetworkStore();

  const { data: isVerified, isLoading } = useTelegramStatus(
    networkStore.address || ""
  );

  useEffect(() => {
    const isBannerClosed = sessionStorage.getItem("telegram_banner_closed");
    const neverShow = localStorage.getItem("telegram_banner_never_show");

    // Only show banner if:
    // 1. User is connected (has wallet address)
    // 2. User is not verified on Telegram
    // 3. Banner hasn't been closed this session
    // 4. User hasn't chosen to never show the banner
    if (
      networkStore.address &&
      !isVerified &&
      !isBannerClosed &&
      !neverShow &&
      !isLoading
    ) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [networkStore.address, isVerified, isLoading]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem("telegram_banner_closed", "true");
    }, 300);
  };

  const handleNeverShow = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      localStorage.setItem("telegram_banner_never_show", "true");
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div
      className={`telegram-banner fixed right-4 top-20 z-50 w-80 rounded-lg border border-blue-100 bg-white p-4 shadow-lg transition-transform duration-300 ${
        isExiting ? "translate-x-full" : "translate-x-0"
      }`}
    >
      <button
        onClick={handleClose}
        className="absolute right-2 top-2 text-gray-400 hover:text-gray-600"
      >
        <Cross2Icon />
      </button>

      <div className="space-y-4">
        <div className="flex items-center gap-2 text-primary ">
          <BellIcon className="h-6 w-6" />
          <h2 className="text-lg font-semibold">
            Stay Updated with TileVille!
          </h2>
        </div>

        <p className="text-sm text-primary">
          Connect your Telegram account for real-time notifications about:
        </p>

        <ul className="space-y-2 text-sm text-primary">
          <li className="flex items-center gap-2">
            <StarIcon /> New competitions
          </li>
          <li className="flex items-center gap-2">
            <PersonIcon /> Player challenges
          </li>
          <li className="flex items-center gap-2">
            <BellIcon /> Challenge acceptances
          </li>
          <li className="flex items-center gap-2">
            <CalendarIcon /> Prize claim alerts
          </li>
        </ul>

        <Link
          href={TILEVILLE_BOT_URL}
          target="_blank"
          className="block rounded-md bg-primary px-4 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-primary/70"
        >
          Connect Telegram Account
        </Link>

        <div className="mt-4 text-center text-sm text-gray-500">
          <button
            onClick={handleNeverShow}
            className="underline hover:text-gray-700"
          >
            Never show me again
          </button>
        </div>
      </div>
    </div>
  );
};
