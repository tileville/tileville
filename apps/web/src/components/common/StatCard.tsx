import React from 'react';
import Link from 'next/link';
import { ArrowUpIcon, ArrowDownIcon } from '@radix-ui/react-icons';

interface StatItem {
  label: string;
  value: number | string;
  icon: React.ReactNode;
  changePercentage?: number;
  link?: string;
  linkText?: string;
}

interface StatCardProps {
  item: StatItem;
}

interface DashboardStatsProps {
  stats: StatItem[];
  title?: string;
}

const StatCard: React.FC<StatCardProps> = ({ item }) => {
  const { label, value, icon, changePercentage, link, linkText } = item;
  
  const isPositiveChange = (changePercentage || 0) >= 0;
  
  return (
    <div className="flex flex-col rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium text-gray-500">{label}</span>
        <div className="rounded-full bg-primary/10 p-2 text-primary">
          {icon}
        </div>
      </div>
      
      <div className="mb-2 text-2xl font-bold">{value}</div>
      
      {changePercentage !== undefined && (
        <div 
          className={`mb-2 flex items-center text-xs font-medium ${
            isPositiveChange ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {isPositiveChange ? (
            <ArrowUpIcon className="mr-1 h-3 w-3" />
          ) : (
            <ArrowDownIcon className="mr-1 h-3 w-3" />
          )}
          <span>{Math.abs(changePercentage)}% from last month</span>
        </div>
      )}
      
      {link && (
        <Link 
          href={link}
          className="mt-auto text-sm font-medium text-primary hover:underline"
        >
          {linkText || 'View details'}
        </Link>
      )}
    </div>
  );
};

const DashboardStats: React.FC<DashboardStatsProps> = ({ 
  stats,
  title = 'Dashboard Overview'
}) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <h2 className="mb-4 text-lg font-bold text-gray-800">{title}</h2>
      
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <StatCard key={`stat-${index}`} item={stat} />
        ))}
      </div>
    </div>
  );
};

// Example usage icons - you may want to create your own or use your design system
const GameIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17 4H7C4.79086 4 3 5.79086 3 8V16C3 18.2091 4.79086 20 7 20H17C19.2091 20 21 18.2091 21 16V8C21 5.79086 19.2091 4 17 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 10H7V12H9V10Z" fill="currentColor"/>
    <path d="M13 10H15V12H17V14H15V16H13V14H11V12H13V10Z" fill="currentColor"/>
  </svg>
);

const NFTIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 12L11 10L13 12L11 14L9 12Z" fill="currentColor"/>
    <path d="M12 3L4 7V17L12 21L20 17V7L12 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M4 7L12 11.5M12 11.5L20 7M12 11.5V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ScoreIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 15C15.866 15 19 11.866 19 8C19 4.13401 15.866 1 12 1C8.13401 1 5 4.13401 5 8C5 11.866 8.13401 15 12 15Z" stroke="currentColor" strokeWidth="2"/>
    <path d="M12 15V23M8 19H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const RewardIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 6V4C8 2.89543 8.89543 2 10 2H14C15.1046 2 16 2.89543 16 4V6M3 6H21M5 6V20C5 21.1046 5.89543 22 7 22H17C18.1046 22 19 21.1046 19 20V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="12" cy="14" r="4" stroke="currentColor" strokeWidth="2"/>
    <path d="M12 12L12 14.5L13.5 16" stroke="currentColor" strokeLinecap="round"/>
  </svg>
);

// Example usage
const ExampleDashboardStats: React.FC = () => {
  const stats = [
    {
      label: 'Games Played',
      value: 28,
      icon: <GameIcon />,
      changePercentage: 12.5,
      link: '/profile?tab=past-games',
      linkText: 'View games'
    },
    {
      label: 'NFTs Owned',
      value: 5,
      icon: <NFTIcon />,
      changePercentage: 20,
      link: '/profile?tab=collection',
      linkText: 'View collection'
    },
    {
      label: 'Highest Score',
      value: 345,
      icon: <ScoreIcon />,
      changePercentage: -5.2,
      link: '/leaderboard',
      linkText: 'View ranking'
    },
    {
      label: 'Total Rewards',
      value: '12.5 MINA',
      icon: <RewardIcon />,
      changePercentage: 33.7,
      link: '/profile?tab=transactions',
      linkText: 'View transactions'
    }
  ];
  
  return <DashboardStats stats={stats} />;
};

export { DashboardStats, ExampleDashboardStats, StatCard };
export type { StatItem, DashboardStatsProps };