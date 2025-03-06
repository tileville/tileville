import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface WelcomeHeroProps {
  username?: string;
  isConnected: boolean;
  onConnect: () => void;
  onPlayDemo?: () => void;
  activeCompetitionCount?: number;
}

const WelcomeHero: React.FC<WelcomeHeroProps> = ({
  username,
  isConnected,
  onConnect,
  onPlayDemo,
  activeCompetitionCount = 0
}) => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#A4B881] to-[#99B579] p-6 shadow-lg md:p-10">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="xMidYMid" viewBox="0 0 1536 750">
          <g transform="translate(768 375) rotate(45)">
            <path stroke="#378209" strokeWidth="1.5" strokeLinecap="round" d="M135.033 0v-50" className="animate-[dash_100s_linear_infinite]" style={{ animationDelay: '-34.068s' }} />
            <path stroke="#378209" strokeWidth="1.5" strokeLinecap="round" d="M229.005 0v-50" className="animate-[dash_100s_linear_infinite]" style={{ animationDelay: '-36.683s' }} />
            {/* More path elements would go here */}
          </g>
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-4xl">
        <div className="grid gap-8 md:grid-cols-2 md:gap-12">
          {/* Text content */}
          <div className="flex flex-col justify-center">
            <h1 className="mb-2 text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
              {isConnected && username
                ? `Welcome back, ${username}!`
                : 'Welcome to TileVille!'
              }
            </h1>
            
            <p className="mb-6 text-lg text-white/90 md:text-xl">
              {isConnected
                ? 'Continue your journey in the world of strategic tile placement and earn MINA tokens!'
                : 'Connect your wallet to start playing, compete with others, and earn MINA tokens!'
              }
            </p>
            
            <div className="flex flex-wrap gap-4">
              {isConnected ? (
                <>
                  <Link
                    href="/competitions"
                    className="rounded-full bg-white px-6 py-3 text-base font-bold text-primary shadow-md transition-colors hover:bg-gray-100"
                  >
                    Explore Competitions
                    {activeCompetitionCount > 0 && (
                      <span className="ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white">
                        {activeCompetitionCount}
                      </span>
                    )}
                  </Link>
                  
                  <Link
                    href="/pvp"
                    className="rounded-full border-2 border-white bg-transparent px-6 py-3 text-base font-bold text-white shadow-md transition-colors hover:bg-white/10"
                  >
                    Challenge Players
                  </Link>
                </>
              ) : (
                <>
                  <button
                    onClick={onConnect}
                    className="rounded-full bg-white px-6 py-3 text-base font-bold text-primary shadow-md transition-colors hover:bg-gray-100"
                  >
                    Connect Wallet
                  </button>
                  
                  <button
                    onClick={onPlayDemo}
                    className="rounded-full border-2 border-white bg-transparent px-6 py-3 text-base font-bold text-white shadow-md transition-colors hover:bg-white/10"
                  >
                    Play Demo
                  </button>
                </>
              )}
            </div>
            
            {/* Feature badges */}
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="rounded-full bg-white/20 px-3 py-1 text-sm font-medium text-white">
                ✨ Strategic Gameplay
              </span>
              <span className="rounded-full bg-white/20 px-3 py-1 text-sm font-medium text-white">
                💰 MINA Rewards
              </span>
              <span className="rounded-full bg-white/20 px-3 py-1 text-sm font-medium text-white">
                🏆 Competitive Challenges
              </span>
              <span className="rounded-full bg-white/20 px-3 py-1 text-sm font-medium text-white">
                🔗 NFT Collection
              </span>
            </div>
          </div>
          
          {/* Image */}
          <div className="flex items-center justify-center">
            <div className="relative h-64 w-64 md:h-80 md:w-80">
              <Image
                src="/img/heroes/tileville-hero.png" 
                alt="TileVille Game"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
        
        {/* Stats bar */}
        <div className="mt-8 grid grid-cols-2 gap-4 rounded-xl bg-white/10 p-4 text-center md:grid-cols-4">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-white">10K+</span>
            <span className="text-sm text-white/80">Players</span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-white">50K+</span>
            <span className="text-sm text-white/80">Games Played</span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-white">5K+</span>
            <span className="text-sm text-white/80">MINA Distributed</span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-white">1K+</span>
            <span className="text-sm text-white/80">NFTs Minted</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeHero;