import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { formatDistance } from 'date-fns';

interface SimpleCompetitionCardProps {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  entryFee: number;
  prizeMoney: number;
  posterUrl: string;
  uniqueKeyname: string;
}

export const SimpleCompetitionCard: React.FC<SimpleCompetitionCardProps> = ({
  id,
  name,
  description,
  startDate,
  endDate,
  entryFee,
  prizeMoney,
  posterUrl,
  uniqueKeyname
}) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const now = new Date();
  
  // Determine if competition is upcoming, active, or ended
  const isUpcoming = start > now;
  const isEnded = end < now;
  const status = isUpcoming ? 'Upcoming' : (isEnded ? 'Ended' : 'Active');
  
  // Calculate duration
  const duration = formatDistance(end, start);

  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-primary bg-primary/10 transition-all hover:shadow-md">
      {/* Competition Image */}
      <div className="relative h-40 w-full overflow-hidden">
        <Image
          src={posterUrl || '/img/placeholder.png'}
          alt={name}
          fill
          className="object-cover transition-transform hover:scale-105"
        />
        <div className="absolute bottom-0 right-0 bg-primary/80 px-2 py-1 text-xs text-white">
          {status}
        </div>
      </div>
      
      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="mb-2 text-lg font-bold">{name}</h3>
        <p className="mb-4 line-clamp-2 text-sm text-gray-700">{description}</p>
        
        {/* Competition Details */}
        <div className="mt-auto grid grid-cols-2 gap-2 text-xs">
          <div>
            <span className="font-medium">Entry Fee:</span>
            <span className="ml-1">{entryFee} MINA</span>
          </div>
          <div>
            <span className="font-medium">Prize:</span>
            <span className="ml-1">{prizeMoney} MINA</span>
          </div>
          <div>
            <span className="font-medium">Duration:</span>
            <span className="ml-1">{duration}</span>
          </div>
        </div>
        
        {/* Action Button */}
        <Link 
          href={`/competitions/${uniqueKeyname}`}
          className="mt-4 flex w-full items-center justify-center rounded-md bg-primary py-2 text-center text-sm font-medium text-white transition-colors hover:bg-primary/80"
        >
          {isUpcoming ? 'Remind Me' : (isEnded ? 'View Results' : 'Join Now')}
        </Link>
      </div>
    </div>
  );
};