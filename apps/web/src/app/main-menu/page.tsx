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
      href: "/game",
    },
    {
      name: "Guide",
      key: 1,
      href: "/guide",
    },

    {
      name: "Leaderboard",
      key: 2,
      href: "/leaderboard",
    },

    {
      name: "User Profile",
      key: 3,
      href: "/profile",
    },
  ];

  return (
    <div
      className="flex h-[calc(100vh-80px)] items-center justify-center pt-20"
      tabIndex={0}
    >
      <LandingBackground />
      <div className="z-10 flex w-full items-center justify-center">
        <div className="mx-auto flex w-full max-w-[500px] cursor-pointer flex-col gap-[10px] text-xl uppercase text-white">
          {buttons.map((button) => (
            <PrimaryButton
              key={button.key}
              onFocus={() => handleFocus(button.key)}
              text={button.name}
              autoFocus={button.key === focusedButtonIndex}
              href={button.href}
              targetBlank={false}
              onClickHandler={undefined}
              className={""}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
