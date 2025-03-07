import React, { useState, useEffect } from 'react';
import { useNetworkStore } from '@/lib/stores/network';
import { Popover } from '@radix-ui/themes';
import Link from 'next/link';
import { BellIcon } from '@radix-ui/react-icons';

type Notification = {
  id: string;
  type: 'challenge' | 'reward' | 'competition' | 'follow';
  message: string;
  link: string;
  read: boolean;
  createdAt: string;
};

// In a real implementation, this would come from an API
const useNotifications = (walletAddress: string | null) => {
  // Mock data - in real app, fetch from API
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!walletAddress) {
      setNotifications([]);
      setLoading(false);
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      setNotifications([
        {
          id: '1',
          type: 'challenge',
          message: 'Someone challenged you to a game!',
          link: '/pvp',
          read: false,
          createdAt: new Date().toISOString()
        },
        {
          id: '2',
          type: 'reward',
          message: 'You received 2 MINA rewards from competition',
          link: '/profile?tab=transactions',
          read: false,
          createdAt: new Date(Date.now() - 3600000).toISOString()
        },
        {
          id: '3',
          type: 'follow',
          message: 'MinaWhale started following you',
          link: '/profile',
          read: true,
          createdAt: new Date(Date.now() - 86400000).toISOString()
        }
      ]);
      setLoading(false);
    }, 500);
  }, [walletAddress]);

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  return { 
    notifications, 
    loading, 
    unreadCount: notifications.filter(n => !n.read).length,
    markAsRead,
    markAllAsRead
  };
};

const formatNotificationTime = (timestamp: string): string => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
};

const NotificationBadge: React.FC = () => {
  const networkStore = useNetworkStore();
  const { notifications, unreadCount, loading, markAsRead, markAllAsRead } = useNotifications(networkStore.address || "");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
      <Popover.Trigger>
        <button className="relative p-2">
          {unreadCount > 0 ? (
            <BellIcon className="h-5 w-5 text-primary" />
          ) : (
            <BellIcon className="h-5 w-5 text-primary/70" />
          )}
          
          {unreadCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </button>
      </Popover.Trigger>
      
      <Popover.Content 
        align="end" 
        className="w-[300px] md:w-[350px] p-0 overflow-hidden rounded-lg border border-primary/20 shadow-lg"
      >
        <div className="bg-[#99B579] p-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-primary">Notifications</h3>
            {unreadCount > 0 && (
              <button 
                onClick={markAllAsRead}
                className="text-xs font-medium text-primary hover:underline"
              >
                Mark all as read
              </button>
            )}
          </div>
          
          <div className="mt-2 max-h-[300px] overflow-y-auto rounded-md bg-white/80 backdrop-blur-sm">
            {loading ? (
              <div className="flex items-center justify-center p-4">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
              </div>
            ) : notifications.length === 0 ? (
              <p className="p-4 text-center text-sm text-gray-500">
                No notifications to display
              </p>
            ) : (
              <ul className="divide-y divide-gray-200">
                {notifications.map((notification) => (
                  <li 
                    key={notification.id} 
                    className={`relative p-3 ${!notification.read ? 'bg-primary/10' : ''}`}
                  >
                    <Link 
                      href={notification.link}
                      className="block"
                      onClick={() => {
                        markAsRead(notification.id);
                        setIsOpen(false);
                      }}
                    >
                      <p className="text-sm font-medium text-gray-800">{notification.message}</p>
                      <p className="mt-1 text-xs text-gray-500">{formatNotificationTime(notification.createdAt)}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </Popover.Content>
    </Popover.Root>
  );
};

export default NotificationBadge;