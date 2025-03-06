import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { formatAddress } from '@/lib/helpers';

interface LeaderboardEntry {
  rank: number;
  username?: string;
  walletAddress: string;
  score: number;
  gameId?: number;
  avatarUrl?: string;
  isCurrentUser?: boolean;
}

interface SimpleLeaderboardProps {
  entries: LeaderboardEntry[];
  title: string;
  competitionName?: string;
  isLoading?: boolean;
}

const SimpleLeaderboard: React.FC<SimpleLeaderboardProps> = ({
  entries,
  title,
  competitionName,
  isLoading = false
}) => {
  // Get top 3 for special display
  const topThree = entries.slice(0, 3);
  const restOfEntries = entries.slice(3);
  
  if (isLoading) {
    return (
      <div className="rounded-xl border border-primary/20 bg-white p-4 shadow-md">
        <h2 className="mb-4 text-xl font-bold text-primary">{title}</h2>
        <div className="flex justify-center py-8">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
        </div>
      </div>
    );
  }
  
  if (entries.length === 0) {
    return (
      <div className="rounded-xl border border-primary/20 bg-white p-4 shadow-md">
        <h2 className="mb-4 text-xl font-bold text-primary">{title}</h2>
        <p className="py-6 text-center text-gray-500">No data available yet.</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-primary/20 bg-white p-4 shadow-md">
      <h2 className="mb-4 text-xl font-bold text-primary">{title}</h2>
      
      {competitionName && (
        <div className="mb-4 rounded-md bg-primary/10 p-2 text-center text-sm font-medium text-primary">
          {competitionName}
        </div>
      )}
      
      {/* Top 3 Winners Podium */}
      <div className="mb-6 flex items-end justify-center gap-4">
        {topThree.map((entry, index) => {
          // Determine position styling
          const positions = [
            { height: 'h-24', position: 'order-2', bgColor: 'bg-yellow-500' },  // 1st place
            { height: 'h-16', position: 'order-1', bgColor: 'bg-gray-400' },    // 2nd place
            { height: 'h-12', position: 'order-3', bgColor: 'bg-amber-700' }    // 3rd place
          ];
          
          const posStyle = positions[index];
          
          return (
            <div key={entry.walletAddress} className={`${posStyle.position} flex flex-col items-center`}>
              {/* Avatar */}
              <div className={`relative mb-2 h-12 w-12 overflow-hidden rounded-full border-2 ${entry.isCurrentUser ? 'border-primary' : 'border-gray-200'}`}>
                <Image
                  src={entry.avatarUrl || '/img/avatars/defaultImg.webp'}
                  alt={entry.username || 'Player'}
                  fill
                  className="object-cover"
                />
              </div>
              
              {/* Username or address */}
              <div className="mb-1 text-center">
                <p className="text-xs font-semibold">
                  {entry.username || formatAddress(entry.walletAddress)}
                </p>
                <p className="text-xs text-gray-500">Score: {entry.score}</p>
              </div>
              
              {/* Podium */}
              <div className={`${posStyle.height} w-16 rounded-t-md ${posStyle.bgColor} flex items-center justify-center text-white font-bold`}>
                {index + 1}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Rest of leaderboard */}
      <div className="max-h-[400px] overflow-y-auto rounded-md border border-gray-200">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-xs font-medium uppercase text-gray-500">
            <tr>
              <th className="px-4 py-2">Rank</th>
              <th className="px-4 py-2">Player</th>
              <th className="px-4 py-2 text-right">Score</th>
              <th className="px-4 py-2 text-right">Game ID</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {restOfEntries.map((entry) => (
              <tr 
                key={entry.walletAddress + entry.gameId} 
                className={`hover:bg-gray-50 ${entry.isCurrentUser ? 'bg-primary/5' : ''}`}
              >
                <td className="px-4 py-2 font-medium">{entry.rank}</td>
                <td className="px-4 py-2">
                  <Link
                    href={`/u/${entry.username || entry.walletAddress}`}
                    className="flex items-center gap-2"
                  >
                    {entry.avatarUrl && (
                      <div className="relative h-6 w-6 overflow-hidden rounded-full">
                        <Image
                          src={entry.avatarUrl}
                          alt={entry.username || ''}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <span className="font-medium hover:text-primary hover:underline">
                      {entry.username || formatAddress(entry.walletAddress)}
                    </span>
                  </Link>
                </td>
                <td className="px-4 py-2 text-right font-semibold">{entry.score}</td>
                <td className="px-4 py-2 text-right text-gray-500">
                  {entry.gameId || '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 flex justify-center">
        <Link 
          href="/leaderboard" 
          className="rounded-md bg-primary/10 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/20"
        >
          View Full Leaderboard
        </Link>
      </div>
    </div>
  );
};

export default SimpleLeaderboard;