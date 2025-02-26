"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  BellIcon,
  Cross2Icon,
  PersonIcon,
  StarIcon,
  CalendarIcon,
} from "@radix-ui/react-icons";

import { TILEVILLE_BOT_URL } from "@/constants";
import { useNetworkStore } from "@/lib/stores/network";
import { useTelegramStatus } from "@/db/react-query-hooks";

// Banner notification items configuration
const NOTIFICATION_ITEMS = [
  { icon: <StarIcon />, text: "New competitions" },
  { icon: <PersonIcon />, text: "Player challenges" },
  { icon: <BellIcon />, text: "Challenge acceptances" },
  { icon: <CalendarIcon />, text: "Prize claim alerts" },
];

type NotificationItemProps = {
  icon: React.ReactNode;
  text: string;
};

const NotificationItem = ({ icon, text }: NotificationItemProps) => (
  <li className="flex items-center gap-2">
    {icon} {text}
  </li>
);

export const TelegramBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const networkStore = useNetworkStore();

  // Check if user has verified their Telegram account
  const { data: isVerified, isLoading } = useTelegramStatus(
    networkStore.address || ""
  );

  // Storage keys for banner preferences
  const STORAGE_KEYS = {
    sessionDismiss: "telegram_banner_closed",
    permanentDismiss: "telegram_banner_never_show",
  };

  useEffect(() => {
    const isBannerClosed = sessionStorage.getItem(STORAGE_KEYS.sessionDismiss);
    const neverShow = localStorage.getItem(STORAGE_KEYS.permanentDismiss);

    // Only show banner if:
    // 1. User is connected (has wallet address)
    // 2. User is not verified on Telegram
    // 3. Banner hasn't been closed this session
    // 4. User hasn't chosen to never show the banner
    const shouldShowBanner =
      networkStore.address &&
      !isVerified &&
      !isBannerClosed &&
      !neverShow &&
      !isLoading;

    setIsVisible(!!shouldShowBanner);
  }, [networkStore.address, isVerified, isLoading]);

  // Close banner for this session
  const handleClose = () => {
    startExitAnimation(() => {
      sessionStorage.setItem(STORAGE_KEYS.sessionDismiss, "true");
    });
  };

  // Never show banner again
  const handleNeverShow = () => {
    startExitAnimation(() => {
      localStorage.setItem(STORAGE_KEYS.permanentDismiss, "true");
    });
  };

  // Shared animation logic for closing the banner
  const startExitAnimation = (callback: () => void) => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      callback();
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
        aria-label="Close notification"
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
          {NOTIFICATION_ITEMS.map((item, index) => (
            <NotificationItem key={index} icon={item.icon} text={item.text} />
          ))}
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
