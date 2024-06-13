"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
// import { PhaserLayer } from "@/phaser/phaserLayer";
import { Toaster } from "react-hot-toast";
import { ChainContext, SignerContext } from "@/contexts";
import { ChainType } from "@/types";
import { GameEntryFeesModal } from "@/components/GameEntryFeesModal";
import LandingBackground from "@/components/LandingBackground";
import { useParams } from "next/navigation";

const PhaserLayer = dynamic(() => import("@/phaser/phaserLayer"), {
  ssr: false,
});

function Game() {
  const [signer, setSigner] = useState("");
  const [isEntryFeesModalOpen, setIsEntryFeesModalOpen] = useState(false);
  const [chain, setChain] = useState<ChainType>({
    chainId: 0,
    chainName: "",
  });

  const params = useParams<{ uniqueKey: string }>();
  console.log(params);

  const cachedInit = useCallback(async function () {
    if ((window as any).mina) {
      const accounts = await (window as any).mina.requestAccounts();
      const network = await (window as any).mina.requestNetwork();
      setSigner(accounts[0]);
      setChain({ chainId: network.chainId, chainName: network.name });
    }
  }, []);

  useEffect(() => {
    cachedInit()
      .then((res) => {})
      .catch(() => {});
  }, []);

  return (
    <div className="gradient-bg gradient-bg h-[calc(100vh-80px)]">
      <LandingBackground />
      <div className="relative z-10">
        <SignerContext.Provider value={{ signer, setSigner }}>
          <ChainContext.Provider value={{ chain, setChain }}>
            <div className="mb-0 w-full">
              <PhaserLayer
                handleEntryFees={() => {
                  setIsEntryFeesModalOpen(true);
                }}
              />
              <Toaster />
              <GameEntryFeesModal
                open={isEntryFeesModalOpen}
                handleClose={() => {
                  setIsEntryFeesModalOpen(false);
                }}
              />
            </div>
          </ChainContext.Provider>
        </SignerContext.Provider>
      </div>
    </div>
  );
}

export default Game;
