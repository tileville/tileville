"use client";
import dynamic from "next/dynamic";
import LandingBackground from "@/components/LandingBackground";
import { COMPETITION_SCORE_TWEET_DEFAULT_CONTENT } from "@/constants";
import { useEffect, useState } from "react";
import { MobileIcon } from "@radix-ui/react-icons";

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
            <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br  p-6 text-center text-white">
              <h1 className="mb-4 text-4xl font-bold text-primary">
                Please Rotate Your Device
              </h1>
              <p className="mb-12 text-xl text-primary">
                For the best experience, please use landscape mode.
              </p>
              <div className="relative h-64 w-32">
                <div className="animate-device-rotate absolute inset-0 rounded-3xl border-8 border-black">
                  <div className="absolute left-1/2 top-1/2 h-1 w-12 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-black"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
