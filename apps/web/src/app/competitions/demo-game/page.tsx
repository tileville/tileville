"use client";
import dynamic from "next/dynamic";
import LandingBackground from "@/components/LandingBackground";
import { COMPETITION_SCORE_TWEET_DEFAULT_CONTENT } from "@/constants";

const PhaserLayer = dynamic(() => import("@/phaser/phaserLayer"), {
  ssr: false,
});

export default function DemoGame() {
  return (
    <div className="gradient-bg gradient-bg h-[calc(100vh-80px)]">
      <LandingBackground />
      <div className="relative z-10">
        <div className="mb-0 flex w-full items-center justify-center">
          <PhaserLayer
            isDemoGame={true}
            isGamePlayAllowed={true}
            competitionKey="demo"
            gameId={0}
            scoreTweetContent={COMPETITION_SCORE_TWEET_DEFAULT_CONTENT}
            isSpeedVersion={false}
            speedDuration={12}
          />
        </div>
      </div>
    </div>
  );
}
