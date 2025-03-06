import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { formatAddress } from '@/lib/helpers';

interface WalletConnectorProps {
  isConnected: boolean;
  walletAddress?: string;
  balance?: string;
  onConnect: () => void;
  onDisconnect: () => void;
  isLoading?: boolean;
}

const WalletConnector: React.FC<WalletConnectorProps> = ({
  isConnected,
  walletAddress,
  balance,
  onConnect,
  onDisconnect,
  isLoading = false
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const toggleDropdown = () => {
    if (isConnected) {
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  // Detect if Auro wallet is installed
  const isAuroInstalled = window?.mina !== undefined;
  
  if (!isAuroInstalled) {
    return (
      <Link 
        href="https://www.aurowallet.com/" 
        target="_blank" 
        rel="noopener noreferrer"
        className="rounded-md bg-primary px-4 py-2 text-white transition-colors hover:bg-primary/90"
      >
        Install Auro Wallet
      </Link>
    );
  }

  return (
    <div className="relative font-sans">
      {isConnected ? (
        <button
          onClick={toggleDropdown}
          className="flex items-center gap-2 rounded-md border border-primary bg-primary/10 px-3 py-2 text-primary transition-colors hover:bg-primary/20"
        >
          <Image src="/image/cards/minaLogo.png" width={20} height={20} alt="Mina" />
          
          <div className="flex flex-col items-start text-left">
            <span className="text-xs font-medium">
              {formatAddress(walletAddress || '')}
            </span>
            {balance && (
              <span className="text-xs text-gray-600">
                {balance} MINA
              </span>
            )}
          </div>
        </button>
      ) : (
        <button
          onClick={onConnect}
          disabled={isLoading}
          className="flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-white transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isLoading ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
          ) : (
            <Image src="/image/cards/minaLogo.png" width={20} height={20} alt="Mina" />
          )}
          <span>Connect Wallet</span>
        </button>
      )}

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div 
          className="absolute right-0 top-full z-10 mt-2 w-64 rounded-md border border-gray-200 bg-white p-2 shadow-lg"
          onMouseLeave={closeDropdown}
        >
          <div className="mb-2 rounded-md bg-gray-50 p-3">
            <div className="mb-1 flex items-center justify-between">
              <span className="text-xs text-gray-500">Connected Address</span>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(walletAddress || '');
                  // You could add a toast notification here
                }}
                className="text-xs text-primary hover:text-primary/80"
              >
                Copy
              </button>
            </div>
            <p className="break-all text-sm font-medium">{walletAddress}</p>
          </div>
          
          <div className="mb-3 flex items-center justify-between rounded-md bg-gray-50 p-3">
            <span className="text-sm">Balance</span>
            <span className="font-medium">{balance} MINA</span>
          </div>
          
          <div className="space-y-1">
            <Link 
              href="/profile"
              className="block w-full rounded-md px-3 py-2 text-left text-sm hover:bg-gray-100"
              onClick={closeDropdown}
            >
              View Profile
            </Link>
            
            <Link 
              href={`https://minascan.io/mainnet/account/${walletAddress}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full rounded-md px-3 py-2 text-left text-sm hover:bg-gray-100"
              onClick={closeDropdown}
            >
              View on Minascan
            </Link>
            
            <button 
              onClick={() => {
                onDisconnect();
                closeDropdown();
              }}
              className="block w-full rounded-md px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
            >
              Disconnect Wallet
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletConnector;