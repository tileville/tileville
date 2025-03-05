import { useQuery } from '@tanstack/react-query';

export interface Notification {
  id: number;
  user_wallet: string;
  title: string;
  message: string;
  read: boolean;
  created_at: string;
  action_url?: string;
  action_text?: string;
  notification_type: 'follow' | 'challenge' | 'reward' | 'system';
}

const fetchNotifications = async (walletAddress: string): Promise<Notification[]> => {
  if (!walletAddress) return [];
  
  try {
    const response = await fetch(`/api/notifications?wallet=${walletAddress}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch notifications');
    }
    
    return response.json();
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return [];
  }
};

export const useNotifications = (walletAddress: string) => {
  return useQuery({
    queryKey: ['notifications', walletAddress],
    queryFn: () => fetchNotifications(walletAddress),
    enabled: !!walletAddress,
    refetchInterval: 60000, // Refetch every minute
  });
};