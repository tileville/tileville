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
    <div className="mx-auto flex min-h-screen items-center justify-center">
      <div className="w-full">
        <GuidePhaserLayer />
      </div>
    </div>
  );
}
