/* ==================== */
/* AUTH */
/* ==================== */

import { supabaseUserClientComponentClient } from "@/supabase-clients/supabaseUserClientComponentClient";
import { useMutation, useQueries, useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import toast from "react-hot-toast";
import {
  getAllLeaderboardEntries,
  insertEmail,
  addProfile,
  fetchProfile,
  getAllCompetitionsEntries,
  getAllCompetitionsNames,
  getFilteredLeaderboardEntries,
  fetchTransactionLogById,
  updateTransactionLog,
  getFilteredTransactionByStatus,
  getPastGames,
  saveGameScoreDb,
  getActiveGames,
  fetchTransactions,
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

export const useSaveScore = ({
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
      competition_key: string;
      game_id: number;
      score: number;
      wallet_address: string;
    }) => {
      return saveGameScoreDb(supabaseUserClientComponentClient, item);
    },
    {
      onMutate: () => {
        // Optional: Uncomment the line below to show a loading toast
        // toastRef.current = toast.loading('Saving leaderboard data...');
        onMutate?.();
      },
      onSuccess: () => {},
      onError: (error) => {
        toast.error(String(error), {
          id: toastRef.current ?? undefined,
        });
        toastRef.current = null;
        onError?.(error);
      },
      retry: 3,
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

export const useFilteredLeaderboardData = (competition_key: string) => {
  return useQuery(
    ["leaderboard", competition_key],
    () => getFilteredLeaderboardEntries(competition_key),
    {
      enabled: !!competition_key, // Only run this query if competitionId is not null
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 10, // 10 minutes
      refetchOnWindowFocus: false, // Disable refetch on window focus
    }
  );
};

export const useMainnetTransactionsStatus = (
  txns: { txn_hash: string; txn_status: string }[]
) => {
  return useQueries({
    queries: txns.map(({ txn_hash, txn_status }) => ({
      queryKey: ["transaction_status_mainnet", txn_hash, txn_status],
      queryFn: () =>
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
            console.log("blockberry api response");
            if (res.blockConfirmationsCount >= 1 || res.txStatus === "applied") {
              return updateTransactionLog(txn_hash, {
                txn_status: "CONFIRMED",
              });
            }
          }),
      staleTime: Infinity,
      enabled: !!txn_hash && txn_status === "PENDING",
      retry: 5,
    })),
  });
};

export const useMainnetTransactionStatus = (
  txn_hash: string,
  txn_status: string
) => {
  console.log({ txn_hash, txn_status });
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
          if (res.blockConfirmationsCount >= 1  || res.txStatus === "applied") {
            return updateTransactionLog(txn_hash, {
              txn_status: "CONFIRMED",
            });
          }
          // if (res.failure_reason !== null) {
          //   return updateTransactionLog(txn_hash, {
          //     txn_status: "FAILED",
          //     is_game_played,
          //   });
          // }
        }),
    {
      enabled: !!txn_hash && txn_status === "PENDING",
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

export const useTransactionLogByStatus = (
  wallet_address: string,
  txn_status: string
) => {
  return useQuery(
    ["transactions", wallet_address, txn_status],
    () =>
      getFilteredTransactionByStatus(
        supabaseUserClientComponentClient,
        wallet_address,
        txn_status
      ),
    {
      enabled: !!txn_status && !!wallet_address,
    }
  );
};

export const useActiveGames = (wallet_address: string) => {
  return useQuery(
    ["active_games", wallet_address],
    () => getActiveGames(supabaseUserClientComponentClient, wallet_address),
    {
      enabled: !!wallet_address,
    }
  );
};

export const usePastGames = (wallet_address: string) => {
  return useQuery(
    ["past_games", wallet_address],
    () => getPastGames(wallet_address),
    {
      enabled: !!wallet_address,
    }
  );
};

export const useFetchTransactions = (
  wallet_address: string,
  txn_status: string
) => {
  return useQuery(
    ["transactions", wallet_address, txn_status],
    () => fetchTransactions(wallet_address, txn_status),
    {
      enabled: !!wallet_address && !!txn_status,
    }
  );
};
