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
    <div className="overflow-y-auto">
      {/* <main
        className={`${bibloSwashCaps.variable} guide-section-content relative`}
      >
        <div id="parchment"></div>
        <div id="contain">
          <p className="inkTitle">Fellow Builder</p>
          <p>
            You stepped off the boat onto the pristine shores of Nicobar, the
            salty sea breeze whispering tales of adventure. As the newly
            appointed builder architect, you marveled at the lush green forests
            blanketing the island&apos;s interior, untamed and wild. This was
            your canvas, waiting to be transformed into a thriving metropolis.
          </p>
          <p>
            Clutching your satchel filled with the game&apos;s rules and
            resource tiles, you set off into the heart of the island. The first
            step was to establish a base camp, a temporary shelter where you
            could plan your city&apos;s layout. Using the provided tree tiles,
            you constructed a sturdy cabin, the fresh scent of pine filling the
            air.
          </p>
          <div id="signature">
            <br />
            TileVille Counsil
          </div>
        </div>
      </main> */}

      {/* <svg>
        <filter id="wavy2">
          <feTurbulence
            x="0"
            y="0"
            baseFrequency="0.02"
            numOctaves="5"
            seed="1"
          />
          <feDisplacementMap in="SourceGraphic" scale="20" />
        </filter>
      </svg> */}

      <div className="min-h-scree mx-auto  flex items-center justify-center">
        <div className="w-full">
          <GuidePhaserLayer />
        </div>
      </div>
    </div>
  );
}
