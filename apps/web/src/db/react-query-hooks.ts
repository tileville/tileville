/* ==================== */
/* AUTH */
/* ==================== */

import { supabaseUserClientComponentClient } from '@/supabase-clients/supabaseUserClientComponentClient';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRef } from 'react';
import toast from 'react-hot-toast';
import { addGameToLeaderboard, getAllLeaderboardEntries, insertEmail } from './supabase-queries';
import { SupabaseClient } from '@supabase/supabase-js';
import { Table } from '@/types';

export const useSignup = ({
  onSuccess,
  onMutate,
  onError,
}: {
  onSuccess?: () => void;
  onMutate?: () => void;
  onError?: (error: unknown) => void;
}) => {
  const toastRef = useRef<string | null>(null);
  return useMutation(
    async ({ email, name }: { email: string; name: string }) => {
      return insertEmail(supabaseUserClientComponentClient, { name, email });
    },
    {
      onMutate: () => {
        // toastRef.current = toast.loading('');
        onMutate?.();
      },
      onSuccess: () => {
        toast.success('You will receive an email with our app preview link', {
          id: toastRef.current ?? undefined,
        });

        toastRef.current = null;
        onSuccess?.();
      },
      onError: (error) => {
        toast.error(String(error), {
          id: toastRef.current ?? undefined,
        });
        toastRef.current = null;
        onError?.(error);
      },
    }
  );
};

export const useLeaderboard = ({
  onSuccess,
  onMutate,
  onError,
}: {
  onSuccess?: () => void;
  onMutate?: () => void;
  onError?: (error: unknown) => void;
}) => {
  const toastRef = useRef<string | null>(null);

  return useMutation(
    async (item: { competition_id: number; game_id: number; score: number; wallet_address: string }) => {
      return addGameToLeaderboard(supabaseUserClientComponentClient, item);
    },
    {
      onMutate: () => {
        // Optional: Uncomment the line below to show a loading toast
        // toastRef.current = toast.loading('Saving leaderboard data...');
        onMutate?.();
      },
      onSuccess: () => {
        // toast.success('Leaderboard data saved successfully', {
        //   id: toastRef.current ?? undefined,
        // });

        // toastRef.current = null;
        // onSuccess?.();
      },
      onError: (error) => {
        toast.error(String(error), {
          id: toastRef.current ?? undefined,
        });
        toastRef.current = null;
        onError?.(error);
      },
    }
  );
};

export const useLeaderboardData = () => {
  return useQuery(['leaderboard'], () => getAllLeaderboardEntries(supabaseUserClientComponentClient), {
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
    refetchOnWindowFocus: false, // Disable refetch on window focus
  });
};