"use client";

import dynamic from "next/dynamic";
import NavigationLoadingIndicator from "@/components/NavigationLoadingIndicator";

const GuidePhaserLayer = dynamic(
  () => import("@/phaser/guide-phaser/GuidephaserLayer"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    ),
  }
);

export default function Guide() {
  return (
    <div className="mx-auto flex min-h-screen items-center justify-center">
      <NavigationLoadingIndicator />
      <div className="w-full">
        <GuidePhaserLayer />
      </div>
    </div>
  );
}