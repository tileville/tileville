import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { BellIcon, Cross1Icon } from '@radix-ui/react-icons';

interface Notification {
  id: string;
  type: 'challenge' | 'friend' | 'reward' | 'system';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  link?: string;
  actionText?: string;
}

interface NotificationPanelProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onClearAll: () => void;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onClearAll
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const getIconForType = (type: Notification['type']) => {
    switch (type) {
      case 'challenge':
        return '/icons/game.png';
      case 'friend':
        return '/icons/person.png';
      case 'reward':
        return '/icons/trophy.png';
      case 'system':
      default:
        return '/icons/info.png';
    }
  };
  
  const handleNotificationClick = (notification: Notification) => {
    if (!notification.read) {
      onMarkAsRead(notification.id);
    }
  };

  return (
    <div className="relative">
      {/* Notification Bell Button */}
      <button 
        className="relative rounded-full p-2 hover:bg-primary/10"
        onClick={() => setIsOpen(!isOpen)}
      >
        <BellIcon className="h-6 w-6 text-primary" />
        
        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>
      
      {/* Notification Panel */}
      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-2 w-80 rounded-lg border border-gray-200 bg-white shadow-lg">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-100 p-3">
            <h3 className="font-semibold">Notifications</h3>
            <div className="flex gap-2">
              {unreadCount > 0 && (
                <button 
                  className="text-xs font-medium text-primary hover:text-primary/80"
                  onClick={onMarkAllAsRead}
                >
                  Mark all as read
                </button>
              )}
              <button 
                className="text-xs font-medium text-gray-500 hover:text-gray-700"
                onClick={onClearAll}
              >
                Clear all
              </button>
            </div>
          </div>
          
          {/* Notification List */}
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-6">
                <div className="mb-2 rounded-full bg-gray-100 p-3">
                  <BellIcon className="h-6 w-6 text-gray-400" />
                </div>
                <p className="text-center text-sm text-gray-500">No notifications yet</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div 
                  key={notification.id}
                  className={`cursor-pointer border-b border-gray-100 p-3 transition-colors hover:bg-gray-50 ${notification.read ? '' : 'bg-primary/5'}`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className="flex gap-3">
                    <div className="flex-shrink-0">
                      <Image 
                        src={getIconForType(notification.type)} 
                        alt={notification.type} 
                        width={24} 
                        height={24} 
                      />
                    </div>
                    
                    <div className="flex-1 overflow-hidden">
                      <div className="flex justify-between">
                        <h4 className={`font-medium ${notification.read ? 'text-gray-700' : 'text-black'}`}>
                          {notification.title}
                        </h4>
                        <span className="text-xs text-gray-500">
                          {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
                        </span>
                      </div>
                      
                      <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                        {notification.message}
                      </p>
                      
                      {notification.link && (
                        <Link 
                          href={notification.link}
                          className="mt-2 inline-block text-xs font-medium text-primary hover:underline"
                        >
                          {notification.actionText || 'View details'}
                        </Link>
                      )}
                    </div>
                    
                    {!notification.read && (
                      <div className="flex-shrink-0">
                        <div className="h-2 w-2 rounded-full bg-primary"></div>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
          
          {/* Close button */}
          <button 
            className="absolute right-2 top-2 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            onClick={() => setIsOpen(false)}
          >
            <Cross1Icon className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationPanel;