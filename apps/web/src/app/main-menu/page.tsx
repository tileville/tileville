"use client";
import { useState } from "react";
import LandingBackground from "@/components/LandingBackground";
import { PrimaryButton } from "@/components/PrimaryButton";
import Link from "next/link";
import { NAVIGATION_MENU_ITEMS } from "@/constants";

export default function MainMenu() {
  const [focusedButtonIndex, setFocusedButtonIndex] = useState<number>(0);

  const handleFocus = (index: number) => {
    setFocusedButtonIndex(index);
  };

  return (
    <div className="flex min-h-screen flex-col pt-20" tabIndex={0}>
      <LandingBackground />
      <div className="z-10 flex w-full flex-col items-center justify-center gap-8">
        <div className="m-20 text-3xl font-semibold">
          MINTING IS LIVE NOW 🎉{" "}
          <Link
            href="/marketplace"
            className="font-semibold text-primary underline hover:no-underline"
          >
            CHECK HERE
          </Link>
        </div>
        <div className="slideAnimOnChilds mx-auto flex w-full max-w-[500px] cursor-pointer flex-col gap-[10px] pt-20 text-xl uppercase text-white">
          {NAVIGATION_MENU_ITEMS.map((button) => (
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
