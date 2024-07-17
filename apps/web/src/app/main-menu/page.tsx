"use client";
import { useState } from "react";
import LandingBackground from "@/components/LandingBackground";
import { PrimaryButton } from "@/components/PrimaryButton";

export default function MainMenu() {
  const [focusedButtonIndex, setFocusedButtonIndex] = useState<number>(0);

  const handleFocus = (index: number) => {
    setFocusedButtonIndex(index);
  };

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
      href: "/profile",
    },
    {
      name: "Marketplace",
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

  return (
    <div
      className="flex min-h-screen items-center justify-center pt-20"
      tabIndex={0}
    >
      <LandingBackground />
      <div className="z-10 flex w-full items-center justify-center px-4">
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

      <div className="fixed bottom-0 right-0 p-3 pb-20">
        <h1 className="text-primary-shadow sm font-mono">
          <span>T</span>il<span>e</span>Vi<span>l</span>le
        </h1>
      </div>
    </div>
  );
}
