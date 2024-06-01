"use client";

import LandingBackground from "@/components/LandingBackground";
import Link from "next/link";
import { useState } from "react";

export const App = () => {
  // const [audio] = useState(
  //   new Audio(
  //     "https://www.mtris.in/static/media/backgroundSoundTwoCompressed-1.04e567dce9772a9fe642.mp3"
  //   )
  // );

  // const playAudio = () => {
  //   audio.play();
  //   audio.loop = true;
  // };

  return (
    <div className="gradient-bg gradient-bg flex min-h-screen items-center justify-center bg-black bg-opacity-10 bg-opacity-50">
      <LandingBackground />

      <div className="z-10 space-y-[50px] text-center">
        <h1 className="text-primary-shadow">
          <span>T</span>il<span>e</span>Vi<span>l</span>le
        </h1>

        <div className="flex h-[50px] items-center text-sm">
          <Link
            className="mx-auto cursor-pointer rounded-2xl border-2 border-primary bg-primary bg-opacity-30 px-[15px] py-2 font-mono leading-none text-white hover:shadow-[0_0_8px_hsl(var(--primary))]"
            href="/main-menu"
            // onClick={playAudio}
          >
            Let's Go
          </Link>
        </div>
      </div>
    </div>
  );
};

export default App;
