"use client";
import LandingBackground from "@/components/LandingBackground";
import Link from "next/link";

export default function App() {
  return (
    <div className="flex h-[calc(100vh-80px)] items-center justify-center">
      <LandingBackground />

      <div className="z-10 space-y-[50px] text-center">
        <h1 className="text-primary-shadow font-mono">
          <span>T</span>il<span>e</span>Vi<span>l</span>le
        </h1>

        <div className="flex h-[50px] items-center text-sm">
          <Link
            className=" mx-auto cursor-pointer rounded-2xl border-2 border-primary bg-primary bg-opacity-30 px-[15px] py-2 leading-none text-white hover:shadow-[0_0_8px_hsl(var(--primary))]"
            href="/main-menu"
          >
            Let&apos;s Go
          </Link>
        </div>
      </div>
    </div>
  );
}
