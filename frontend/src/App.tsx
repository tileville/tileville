// import { useEffect } from 'react';
import { PhaserLayer } from './phaser/phaserLayer';
// import { store } from './store';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NavBar } from './ui/components/NavBar';
import { AboutGame } from './ui/components/About';
import { Leaderboard } from './ui/components/Leaderboard';
import { Settings } from './ui/components/Settings';

function App() {
  // TODO: handle Auro wallet connection
  return (
    <div className=" bg-[#ded6b6] mb-0">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<PhaserLayer />}></Route>
          <Route path="about" element={<AboutGame />} />
          <Route path="leaderboard" element={<Leaderboard />} />
          <Route path="settings" element={<Settings />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
