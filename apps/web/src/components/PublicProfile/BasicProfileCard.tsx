import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { formatAddress } from '@/lib/helpers';

interface BasicProfileCardProps {
  username: string;
  fullName: string;
  walletAddress: string;
  avatarUrl: string;
  nftCount: number;
  gameCount: number;
  highestScore: number;
  isOwner?: boolean;
}

const BasicProfileCard: React.FC<BasicProfileCardProps> = ({
  username,
  fullName,
  walletAddress,
  avatarUrl,
  nftCount,
  gameCount,
  highestScore,
  isOwner = false
}) => {
  return (
    <div className="fade-slide-in w-full rounded-xl bg-primary/20 p-4 shadow-md backdrop-blur-sm">
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="h-20 w-20 flex-shrink-0 rounded-full border-4 border-[#D3F49E]">
          <Image
            src={avatarUrl || '/img/avatars/defaultImg.webp'}
            width={80}
            height={80}
            alt="profile"
            className="h-full w-full rounded-full object-cover"
          />
        </div>

        {/* User Information */}
        <div className="flex-1">
          <h2 className="text-xl font-bold text-[#224D08]">{fullName}</h2>
          <p className="text-sm text-[#747474]">@{username}</p>
          
          <div className="mt-2 flex items-center">
            <span className="badge-base-classes text-xs">
              {formatAddress(walletAddress)}
            </span>
          </div>
        </div>

        {/* Edit button for owner */}
        {isOwner && (
          <Link href="/profile" className="rounded-md bg-primary px-3 py-1 text-sm font-medium text-white hover:bg-primary/90">
            Edit Profile
          </Link>
        )}
      </div>

      {/* Stats */}
      <div className="mt-4 grid grid-cols-3 gap-3">
        <div className="flex flex-col items-center rounded-md bg-white p-3">
          <span className="text-xl font-bold">{nftCount}</span>
          <span className="text-sm text-gray-600">NFTs</span>
        </div>
        <div className="flex flex-col items-center rounded-md bg-white p-3">
          <span className="text-xl font-bold">{gameCount}</span>
          <span className="text-sm text-gray-600">Games</span>
        </div>
        <div className="flex flex-col items-center rounded-md bg-white p-3">
          <span className="text-xl font-bold">{highestScore}</span>
          <span className="text-sm text-gray-600">Best Score</span>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-4 flex justify-between">
        <Link 
          href={`/u/${username}`} 
          className="rounded-md bg-primary/30 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/50"
        >
          View Full Profile
        </Link>
        
        {isOwner ? (
          <Link 
            href="/marketplace" 
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
          >
            Browse NFTs
          </Link>
        ) : (
          <button 
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
          >
            Follow
          </button>
        )}
      </div>
    </div>
  );
};

export default BasicProfileCard;