/* ==================== */
/* AUTH */
/* ==================== */

import { supabaseUserClientComponentClient } from "@/supabase-clients/supabaseUserClientComponentClient";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import toast from "react-hot-toast";
import {
  addGameToLeaderboard,
  getAllLeaderboardEntries,
  insertEmail,
  addProfile,
  fetchProfile,
  getAllCompetitionsEntries,
  getAllCompetitionsNames,
  getFilteredLeaderboardEntries,
  fetchTransactionLogById,
  updateTransactionLog,
  fetchAllTransactionsByWallet,
} from "./supabase-queries";
import { SupabaseClient } from "@supabase/supabase-js";
import { Table } from "@/types";
import { BLOCKBERRY_API_KEY, BLOCKBERRY_MAINNET_BASE_URL } from "@/constants";

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
        toast.success("You will receive an email with our app preview link", {
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
    async (item: {
      competition_id: number;
      game_id: number;
      score: number;
      wallet_address: string;
    }) => {
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

export const useProfile = ({
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
    async (item: {
      wallet_address: string;
      username: string;
      fullname: string;
      email: string;
      avatar_url: string;
    }) => {
      return addProfile(supabaseUserClientComponentClient, item);
    },
    {
      onMutate: () => {
        // Optional: Uncomment the line below to show a loading toast
        // toastRef.current = toast.loading('Saving leaderboard data...');
        onMutate?.();
      },
      onSuccess: () => {
        toast.success("profile data saved successfully", {
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

export const useLeaderboardData = () => {
  return useQuery(
    ["leaderboard"],
    () => getAllLeaderboardEntries(supabaseUserClientComponentClient),
    {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 10, // 10 minutes
      refetchOnWindowFocus: false, // Disable refetch on window focus
    }
  );
};

export const useCompetitionsData = () => {
  return useQuery(
    ["tileville_competitions"],
    () => getAllCompetitionsEntries(supabaseUserClientComponentClient),
    {
      // staleTime: 1000 * 60 * 5, // 5 minutes
      // cacheTime: 1000 * 60 * 10, // 10 minutes
      refetchOnWindowFocus: false, // Disable refetch on window focus
    }
  );
};

export const useProfileLazyQuery = (walletAddress: string) => {
  return useQuery({
    queryKey: ["user_profile", walletAddress],
    queryFn: async () =>
      fetchProfile(supabaseUserClientComponentClient, walletAddress),
  });
};

export const useCompetitionsName = () => {
  return useQuery(
    ["tileville_competitions"],
    () => getAllCompetitionsNames(supabaseUserClientComponentClient),
    {
      refetchOnWindowFocus: false, // Disable refetch on window focus
    }
  );
};

export const useFilteredLeaderboardData = (competitionId: number) => {
  return useQuery(
    ["leaderboard", competitionId],
    () => getFilteredLeaderboardEntries(competitionId),
    {
      enabled: !!competitionId, // Only run this query if competitionId is not null
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 10, // 10 minutes
      refetchOnWindowFocus: false, // Disable refetch on window focus
    }
  );
};

export const useMainnetTransactionStatus = (
  txn_hash: string,
  txn_status: string,
  is_game_played: boolean
) => {
  console.log({ txn_hash, txn_status, is_game_played });
  return useQuery(
    ["transaction_status_mainnet", txn_hash],
    () =>
      fetch(
        `${BLOCKBERRY_MAINNET_BASE_URL}/v1/block-confirmation/${txn_hash}`,
        {
          headers: {
            "x-api-key": BLOCKBERRY_API_KEY,
          },
        }
      )
        .then((response) => response.json())
        .then((res) => {
          if (res.blockConfirmationsCount > 2) {
            return updateTransactionLog(txn_hash, {
              txn_status: "CONFIRMED",
              is_game_played,
            });
          }
          if (res.failure_reason !== null) {
            return updateTransactionLog(txn_hash, {
              txn_status: "FAILED",
              is_game_played,
            });
          }
        }),
    {
      enabled:
        !!txn_hash && txn_status === "PENDING" && is_game_played === false,
      retry: 5,
    }
  );
};

export const useTransactionLogById = (wallet_address: string, id: number) => {
  return useQuery(
    ["transaction_log_by_id", wallet_address, id],
    () => fetchTransactionLogById(wallet_address, id),
    {
      enabled: !!wallet_address && !!id,
    }
  );
};

export const useTransactionsByWallet = (wallet_address: string) => {
  return useQuery(
    ["transactions", wallet_address],
    () => fetchAllTransactionsByWallet(supabaseUserClientComponentClient, wallet_address),
    {
      enabled: !!wallet_address, // Only run this query if wallet_address is not null
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 10, // 10 minutes
      refetchOnWindowFocus: false, // Disable refetch on window focus
    }
  );
};