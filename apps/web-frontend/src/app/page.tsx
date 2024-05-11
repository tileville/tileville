"use client";

import { useCallback, useEffect, useState } from "react";
import { PhaserLayer } from "@/phaser/phaserLayer";
import { NavBar } from "@/components/NavBar";
import { Toaster } from "react-hot-toast";
import { ChainContext, SignerContext } from "@/contexts";

import { ChainType } from "@/types";
import { GameEntryFeesModal } from "@/components/GameEntryFeesModal";
import { Footer } from "@/components/Footer";

function App() {
  const [signer, setSigner] = useState("");
  const [isEntryFeesModalOpen, setIsEntryFeesModalOpen] = useState(false);
  const [chain, setChain] = useState<ChainType>({
    chainId: 0,
    chainName: "",
  });

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
    <SignerContext.Provider value={{ signer, setSigner }}>
      <ChainContext.Provider value={{ chain, setChain }}>
        <div className="mb-0 w-full bg-[#ded6b6]">
          <NavBar />
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
          <Footer />
        </div>
      </ChainContext.Provider>
    </SignerContext.Provider>
  );

}

export default App;
