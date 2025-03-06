import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { isFuture } from 'date-fns';

interface GameChallengeCardProps {
  id: number;
  title: string;
  imageUrl: string;
  entryFee: number;
  endTime: string;
  participantCount: number;
  maxParticipants: number;
  isSpeedChallenge?: boolean;
  speedDuration?: number;
  inviteCode?: string;
}

const GameChallengeCard: React.FC<GameChallengeCardProps> = ({
  id,
  title,
  imageUrl,
  entryFee,
  endTime,
  participantCount,
  maxParticipants,
  isSpeedChallenge = false,
  speedDuration,
  inviteCode
}) => {
  // Check if challenge is still active
  const isActive = isFuture(new Date(endTime));
  const isFullyBooked = participantCount >= maxParticipants;
  
  // Format the end time to a readable string
  const formatEndTime = () => {
    const date = new Date(endTime);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="border-primary-30 group relative overflow-hidden rounded-lg border bg-primary/20 shadow-md transition-all hover:shadow-lg">
      {/* Status badges */}
      <div className="absolute left-0 top-0 z-10 flex flex-col gap-2 p-2">
        {!isActive && (
          <span className="rounded-full bg-gray-700 px-2 py-1 text-xs font-semibold text-white">
            Ended
          </span>
        )}
        {isFullyBooked && (
          <span className="rounded-full bg-orange-600 px-2 py-1 text-xs font-semibold text-white">
            Full
          </span>
        )}
        {isSpeedChallenge && (
          <span className="rounded-full bg-blue-600 px-2 py-1 text-xs font-semibold text-white">
            Speed: {speedDuration}s
          </span>
        )}
      </div>

      {/* Image */}
      <div className="relative h-40 w-full overflow-hidden">
        <Image 
          src={imageUrl || '/img/load/load.png'} 
          alt={title} 
          fill 
          className="object-cover transition-transform duration-300 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 w-full p-3">
          <h3 className="text-lg font-bold text-white">{title}</h3>
        </div>
      </div>
      
      {/* Challenge details */}
      <div className="p-4">
        <div className="mb-3 flex justify-between text-sm">
          <div className="flex items-center gap-1">
            <Image src="/icons/coins.png" width={16} height={16} alt="Entry fee" />
            <span className="font-medium">{entryFee} MINA</span>
          </div>
          <div className="flex items-center gap-1">
            <Image src="/icons/timer.png" width={16} height={16} alt="End time" />
            <span>{formatEndTime()}</span>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-600">
            <span>Participants</span>
            <span>{participantCount}/{maxParticipants}</span>
          </div>
          <div className="mt-1 h-2 w-full rounded-full bg-gray-200">
            <div 
              className="h-2 rounded-full bg-primary"
              style={{ width: `${(participantCount / maxParticipants) * 100}%` }}
            ></div>
          </div>
        </div>
        
        {/* Action buttons */}
        <div className="flex gap-2">
          {isActive && !isFullyBooked ? (
            <Link 
              href={inviteCode ? `/pvp/invite/${inviteCode}` : `/competitions/${id}/join`}
              className="w-full rounded-md bg-primary py-2 text-center text-sm font-medium text-white hover:bg-primary/90"
            >
              Join Now
            </Link>
          ) : (
            <Link 
              href={`/leaderboard?competition=${id}`}
              className="w-full rounded-md bg-primary/30 py-2 text-center text-sm font-medium text-primary hover:bg-primary/50"
            >
              View Results
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameChallengeCard;