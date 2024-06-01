"use client";

import Link from "next/link";
import LandingBackground from "../../components/LandingBackground";
import { useState } from "react";

export const LandingPage = () => {
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
            className="bg-primary-30 mx-auto cursor-pointer rounded-[15px] border-2 border-primary bg-opacity-30 px-[15px] py-[3.5px] font-mono leading-none text-white hover:shadow-[0_0_8px_hsl(var(--primary))]"
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

export default LandingPage;
