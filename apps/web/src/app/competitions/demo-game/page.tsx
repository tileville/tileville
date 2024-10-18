"use client";
import dynamic from "next/dynamic";
import LandingBackground from "@/components/LandingBackground";
import { COMPETITION_SCORE_TWEET_DEFAULT_CONTENT } from "@/constants";
import { useEffect, useState } from "react";

const PhaserLayer = dynamic(() => import("@/phaser/phaserLayer"), {
  ssr: false,
});

export default function DemoGame() {
  const [isLandscape, setIsLandscape] = useState(true);

  useEffect(() => {
    const checkOrientation = () => {
      if (window.innerWidth > window.innerHeight) {
        setIsLandscape(true);
      } else {
        setIsLandscape(false);
      }
    };
    checkOrientation();
    window.addEventListener("resize", checkOrientation);
  });
  return (
    <div className="h-[calc(100svh-80px)]">
      <LandingBackground />
      <div className="relative z-10">
        <div className="mb-0 flex w-full flex-col items-center justify-center">
          {isLandscape ? (
            <PhaserLayer
              isDemoGame={true}
              isGamePlayAllowed={true}
              competitionKey="demo"
              gameId={0}
              scoreTweetContent={COMPETITION_SCORE_TWEET_DEFAULT_CONTENT}
              isSpeedVersion={false}
              speedDuration={12}
            />
          ) : (
            <div className="min-h-[100svh] flex items-center justify-center p-4">
              <h1 className="font-bold text-2xl">Please rotate your device to play our game</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
