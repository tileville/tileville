export const MOB_NAV_MENU_ITEMS = [
  { name: "Main menu", href: "/main-menu", key: "main-menu" },
  { name: "Competitions", href: "/competitions", key: "competitions" },
  { name: "PVP", href: "/pvp", key: "pvp" },
  { name: "Marketplace", href: "/marketplace", key: "marketplace" },
  { name: "My Profile", href: "/profile", key: "profile" },
  { name: "Achievements", href: "/achievements", key: "achievements" },
  { name: "FAQ", href: "/faq", key: "faq" },
  { name: "Guide", href: "/guide", key: "guide" },
];

// If you have a main menu component, add a new component for the Achievements menu item

// src/components/MainMenu/AchievementsMenuItem.tsx
import React from "react";
import { useNetworkStore } from "@/lib/stores/network";
import Link from "next/link";
import Image from "next/image";

export const AchievementsMenuItem = () => {
  const networkStore = useNetworkStore();
  const walletAddress = networkStore.address || "";
  const { totalPoints = 12, loading } = { totalPoints: 12, loading: false };

  const unlockedCount = 12;
  const progressPercentage = 12;

  return (
    <Link
      href="/achievements"
      className="group flex flex-col rounded-xl border-2 border-primary/30 bg-primary/10 p-4 shadow-sm transition-transform hover:scale-[1.03]"
    >
      <div className="mb-3 flex items-center gap-3">
        <Image
          src="/icons/trophy.png"
          alt="Achievements"
          width={40}
          height={40}
          className="h-10 w-10"
        />
        <div>
          <h3 className="text-xl font-bold text-primary">Achievements</h3>
          <p className="text-sm text-black/70">Track your progress</p>
        </div>
      </div>

      {networkStore.walletConnected ? (
        <div className="mt-auto">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium">12 unlocked</span>
            <div className="flex items-center gap-1">
              <Image
                src="/icons/star.png"
                alt="Points"
                width={16}
                height={16}
                className="h-4 w-4"
              />
              <span className="font-bold">{totalPoints}</span>
            </div>
          </div>

          <div className="h-2 w-full rounded-full bg-gray-200">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      ) : (
        <p className="mt-auto text-sm italic text-black/50">
          Connect wallet to track achievements
        </p>
      )}
    </Link>
  );
};
