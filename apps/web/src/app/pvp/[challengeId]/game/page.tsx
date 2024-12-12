"use client";
import dynamic from "next/dynamic";
import { Toaster } from "react-hot-toast";
import LandingBackground from "@/components/LandingBackground";
import { useParams } from "next/navigation";
// import { useInviteChallenge } from "@/db/react-query-hooks";
import { useNetworkStore } from "@/lib/stores/network";

const PhaserLayer = dynamic(() => import("@/phaser/phaserLayer"), {
  ssr: false,
});

export default function PvPChallengePage() {
  const params = useParams<{ challengeId: string }>();
  const networkStore = useNetworkStore();
  console.log("params", params);

  // const { data: challenge, isLoading } = useInviteChallenge(params.challengeId);

  if (!networkStore.address) {
    return (
      <div className="flex min-h-screen items-center justify-center p-8">
        <button
          className="flex cursor-pointer items-center rounded-full bg-primary px-3 py-2 font-medium text-white"
          onClick={() => {
            networkStore.connectWallet(false);
          }}
        >
          Connect your wallet first
        </button>
      </div>
    );
  }

  return (
    <div className="h-[calc(100svh-80px)]">
      <LandingBackground />
      <div className="relative z-10">
        <div className="mb-0 flex w-full flex-col items-center justify-center">
          <PhaserLayer
            isDemoGame={false}
            isGamePlayAllowed={true}
            competitionKey=""
            scoreTweetContent=""
            isPvPGame={true}
            isSpeedVersion={false}
            speedDuration={120}
            challengeId={+params.challengeId}
            txnHash={""}
          />

          <Toaster />
        </div>
      </div>
    </div>
  );
}
