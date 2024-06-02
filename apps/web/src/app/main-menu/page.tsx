"use client";
import { useEffect, useRef, useState } from "react";
// import { PrimaryButton } from "../../components/PrimaryButton";
import LandingBackground from "@/components/LandingBackground";
import { PrimaryButton } from "@/components/PrimaryButton";

// import { BgSound } from "sfx/backgroundSoundTwo.mp3";

export const MainMenu = () => {
  const [focusedButtonIndex, setFocusedButtonIndex] = useState<number>(0);
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);

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
      name: "Game Rules",
      key: 1,
      href: "/game",
    },

    {
      name: "Leaderboard",
      key: 2,
      href: "/game",
    },

    {
      name: "User Profile",
      key: 3,
      href: "/game",
    },
  ];

  return (
    <div
      className="flex h-[calc(100vh-80px)] items-center justify-center"
      tabIndex={0}
    >
      <LandingBackground />

      <div className="z-10 flex w-full items-center justify-center">
        <div className="mx-auto flex w-full max-w-[500px] cursor-pointer flex-col gap-[10px] text-xl uppercase text-white">
          {buttons.map((button, index) => (
            <PrimaryButton
              key={button.key}
              onFocus={() => handleFocus(button.key)}
              text={button.name}
              autoFocus={button.key === focusedButtonIndex}
              href={button.href}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
