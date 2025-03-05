'use client';

import React, { useState } from 'react';
import { CompetitionsList } from './CompetitionsList';

// You would typically fetch this from an API
const mockCompetitions = [
  {
    id: 1,
    name: 'TileVille Championship',
    description: 'Compete against the best players in TileVille and win amazing prizes!',
    start_date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // tomorrow
    end_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // a week from now
    participation_fee: 2,
    funds: 100,
    poster_url: '/img/competitions/championship.png',
    unique_keyname: 'tileville-championship'
  },
  {
    id: 2,
    name: 'Beginner Challenge',
    description: 'A friendly competition for newcomers to TileVille. Learn the basics and win prizes!',
    start_date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    end_date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days from now
    participation_fee: 1,
    funds: 50,
    poster_url: '/img/competitions/beginner.png',
    unique_keyname: 'beginner-challenge'
  },
  {
    id: 3,
    name: 'Speed Challenge',
    description: 'How fast can you build? Complete the challenge in the shortest time to win!',
    start_date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    end_date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // yesterday
    participation_fee: 3,
    funds: 150,
    poster_url: '/img/competitions/speed.png',
    unique_keyname: 'speed-challenge'
  }
];

export const SimpleCompetitionsPage: React.FC = () => {
  const [competitions] = useState(mockCompetitions);
  const [isLoading] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Competitions</h1>
        <p className="text-gray-600">
          Join competitive challenges, test your skills, and win prizes!
        </p>
      </div>

      <div className="mb-6 flex items-center justify-between">
        <div className="flex space-x-4">
          <button className="rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/80">
            All Competitions
          </button>
          <button className="rounded-md bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-300">
            Active
          </button>
          <button className="rounded-md bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-300">
            Upcoming
          </button>
        </div>

        <div>
          <button className="rounded-md border border-primary bg-white px-4 py-2 text-primary hover:bg-primary/10">
            Play Demo Game
          </button>
        </div>
      </div>

      <CompetitionsList competitions={competitions} isLoading={isLoading} />
    </div>
  );
};