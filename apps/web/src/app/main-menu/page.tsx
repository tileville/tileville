"use client";
import { useState } from "react";
import LandingBackground from "@/components/LandingBackground";
import { PrimaryButton } from "@/components/PrimaryButton";
import Link from "next/link";
import useDeviceDetection from "@/hooks/useDeviceDetection";
import clsx from "clsx";
import { COLLECTION_URL } from "@/constants";

const buttons = [
  {
    name: "Play Game",
    key: 0,
    href: "/competitions",
  },
  {
    name: "Guide",
    key: 1,
    targetBlank: false,
    href: "/guide",
  },

  {
    name: "Leaderboard",
    key: 2,
    targetBlank: false,
    href: "/leaderboard",
  },
  {
    name: "Community Section",
    key: 7,
    targetBlank: false,
    href: "/community",
  },

  {
    name: "User Profile",
    key: 3,
    targetBlank: false,
    href: COLLECTION_URL,
  },
  {
    name: "NFTS MARKETPLACE",
    key: 4,
    targetBlank: false,
    href: "/marketplace",
  },
  {
    name: "FAQ",
    key: 5,
    targetBlank: false,
    href: "/faq",
  },

  {
    name: "ZKNOID games store",
    key: 6,
    href: "https://app.zknoid.io/",
    targetBlank: true,
  },
];

export default function MainMenu() {
  const [focusedButtonIndex, setFocusedButtonIndex] = useState<number>(0);
  const { isMobile, isTablet, isDesktop } = useDeviceDetection();

  const handleFocus = (index: number) => {
    setFocusedButtonIndex(index);
  };

  return (
    <div className="flex min-h-screen flex-col pt-20" tabIndex={0}>
      <LandingBackground />
      <div className="z-10 flex w-full flex-col items-center justify-center gap-8 px-3">
        <div
          className={clsx({
            "text-center font-semibold": true,
            "my-6 text-xl": isMobile,
            "mt-10 text-2xl": isTablet,
            "my-20 text-3xl": isDesktop,
          })}
        >
          MINTING IS LIVE NOW 🎉{" "}
          <Link
            href="/marketplace"
            className="font-semibold text-primary underline hover:no-underline"
          >
            CHECK HERE
          </Link>
        </div>
        <div className="slideAnimOnChilds mx-auto flex w-full max-w-[500px] cursor-pointer flex-col gap-[10px] text-xl uppercase text-white">
          {buttons.map((button) => (
            <PrimaryButton
              key={button.key}
              onFocus={() => handleFocus(button.key)}
              text={button.name}
              autoFocus={button.key === focusedButtonIndex}
              href={button.href}
              targetBlank={button.targetBlank}
              onClickHandler={undefined}
              className="border border-primary"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
