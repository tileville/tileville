"use client";

import dynamic from "next/dynamic";

const GuidePhaserLayer = dynamic(
  () => import("@/phaser/guide-phaser/GuidephaserLayer"),
  {
    ssr: false,
  }
);

export default function Guide() {
  return (
    <div className="overflow-y-scroll">
      <div className="min-h-scree mx-auto  flex items-center justify-center">
        <div className="w-full">
          <GuidePhaserLayer />
        </div>
      </div>
    </div>
  );
}
