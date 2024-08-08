"use client";
import { useState } from "react";
import LandingBackground from "@/components/LandingBackground";
import { PrimaryButton } from "@/components/PrimaryButton";
import { CountdownTimer } from "@/components/common/CountdownTimer";
import { useAtomValue } from "jotai";
import { globalConfigAtom } from "@/contexts/atoms";
import { getTime } from "date-fns";
import { MintRegisterModal } from "@/components/Marketplace/mintRegisterModal";

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

  const handleFocus = (index: number) => {
    setFocusedButtonIndex(index);
  };
  const globalConfig = useAtomValue(globalConfigAtom);

  return (
    <div className="flex min-h-screen flex-col pt-20" tabIndex={0}>
      <LandingBackground />
      <div className="z-10 flex w-full flex-col items-center gap-8 pt-20">
        <div className="flex flex-col items-center gap-4">
          <div>
            <h2 className="text-center text-2xl font-semibold uppercase text-primary">
              TileVille NFT Mint Starts In:
            </h2>
          </div>
          <div>
            <CountdownTimer
              initialTime={getTime(globalConfig.nft_mint_start_date)}
            />
          </div>
          <div className="w-full md:px-8">
            <MintRegisterModal
              triggerBtnClasses={`h-10 w-full rounded-md border-primary bg-primary px-5 py-2 text-sm font-medium text-white hover:bg-primary/90`}
            />
          </div>
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
