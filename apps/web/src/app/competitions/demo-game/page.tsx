"use client";
import dynamic from "next/dynamic";
import LandingBackground from "@/components/LandingBackground";

const PhaserLayer = dynamic(() => import("@/phaser/phaserLayer"), {
  ssr: false,
});

export default function DemoGame() {
  return (
    <div className="gradient-bg gradient-bg h-[calc(100vh-80px)]">
      <LandingBackground />
      <div className="relative z-10">
        <div className="mb-0 w-full">
          <PhaserLayer isDemoGame={true} />
        </div>
      </div>
    </div>
  );
}
