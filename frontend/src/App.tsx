// import { useEffect } from 'react';
import { PhaserLayer } from './phaser/phaserLayer';
// import { store } from './store';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NavBar } from './ui/components/NavBar';
import { AboutGame } from './ui/components/About';
import { Leaderboard } from './ui/components/Leaderboard';
import { Settings } from './ui/components/Settings';
import { Toaster } from 'react-hot-toast';
import { ChainContext, SignerContext } from './contexts';
import { useCallback, useEffect, useState } from 'react';
import { ChainType } from './types';

function App() {
  const [signer, setSigner] = useState(null);
  const [chain, setChain] = useState<ChainType>({
    chainId: 0,
    chainName: '',
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
    cachedInit();
  }, []);

  return (
    <SignerContext.Provider value={{ signer, setSigner }}>
      <ChainContext.Provider value={{ chain, setChain }}>
        <div className="bg-[#ded6b6] mb-0 w-full">
          <BrowserRouter>
            <NavBar />
            <Routes>
              <Route path="/" element={<PhaserLayer />}></Route>
              <Route path="about" element={<AboutGame />} />
              <Route path="leaderboard" element={<Leaderboard />} />
              <Route path="settings" element={<Settings />} />
            </Routes>
          </BrowserRouter>
          <Toaster />
        </div>
      </ChainContext.Provider>
    </SignerContext.Provider>
  );
}

export default App;
