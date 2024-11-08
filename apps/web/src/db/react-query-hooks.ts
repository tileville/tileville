/* ==================== */
/* AUTH */
/* ==================== */

import { supabaseUserClientComponentClient } from "@/supabase-clients/supabaseUserClientComponentClient";
import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useRef } from "react";
import toast from "react-hot-toast";
import {
  getAllLeaderboardEntries,
  insertEmail,
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
  getCompetitionByKey,
  isGameAlreadyPlayed,
  fetchGlobalConfig,
  getAllNFTsEntries,
} from "./supabase-queries";
import {
  ACCOUNT_AUTH_LOCAL_KEY,
  BLOCKBERRY_API_KEY,
  BLOCKBERRY_MAINNET_BASE_URL,
} from "@/constants";
import { useAtom } from "jotai";
import { globalConfigAtom } from "@/contexts/atoms";
import { PublicProfile } from "@/types";

export const useSendEmail = ({
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
        toast.success(
          "You will receive an email before 12 hours when Minting Starts",
          {
            id: toastRef.current ?? undefined,
          }
        );

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
  // onSuccess,
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
      // onSuccess: () => {},
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

  interface ProfileMutationInput {
    wallet_address: string;
    username: string;
    fullname: string;
    avatar_url: string;
    twitter_username?: {
      username: string | null;
      isPublic: boolean;
    };
    telegram_username?: {
      username: string | null;
      isPublic: boolean;
    };
    discord_username?: {
      username: string | null;
      isPublic: boolean;
    };
    email_address?: {
      email: string | null;
      isPublic: boolean;
    };
  }

  return useMutation(
    async (item: ProfileMutationInput) => {
      return fetch("/api/player_profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      }).then((res) => res.json());
    },
    {
      onMutate: () => {
        toastRef.current = toast.loading("Saving profile data...");
        onMutate?.();
      },
      onSuccess: () => {
        toast.success("Profile data saved successfully", {
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
    {}
  );
};

export const useCompetitionsData = () => {
  return useQuery(
    ["tileville_competitions"],
    () => getAllCompetitionsEntries(supabaseUserClientComponentClient),
    {}
  );
};

export const useNFTEntries = ({
  sortOrder = "desc",
  searchTerm,
  currentPage,
}: {
  sortOrder: "asc" | "desc";
  searchTerm: string;
  currentPage: number;
}) => {
  return useQuery(
    ["tileville_builder_nfts", sortOrder, searchTerm, currentPage],
    () => getAllNFTsEntries({ sortOrder, searchTerm, currentPage }),
    {}
  );
};
export const useProfileLazyQuery = (walletAddress: string) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["user_profile", walletAddress],
    queryFn: async () => {
      const authSignature = window.localStorage.getItem(ACCOUNT_AUTH_LOCAL_KEY);
      if (!authSignature) {
        console.warn("Auth signature missing in storage");
        throw new Error("Auth signature missing!");
      }
      return fetch(`/api/player_profile?wallet_address=${walletAddress}`, {
        headers: {
          "Auth-Signature": authSignature,
          "Wallet-Address": walletAddress,
        },
      })
        .then((res) => res.json())
        .catch((e) => {
          console.error(e);
        });
    },
    enabled: !!walletAddress,
    staleTime: 0,
    cacheTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["public-profile"] });
    },
  });
};
export const useLeaderboardEntries = (competition_key: string) => {
  return useQuery({
    queryKey: ["leaderboard_entries", competition_key],
    queryFn: async () => {
      return fetch(`/api/leaderboard?competition_key=${competition_key}`, {})
        .then((res) => res.json())
        .catch((e) => {
          console.error(e);
        });
    },
  });
};

export const useCompetitionsName = () => {
  return useQuery(
    ["tileville_competitions_name"],
    () => getAllCompetitionsNames(supabaseUserClientComponentClient),
    {}
  );
};

export const useFilteredLeaderboardData = (competition_key: string) => {
  return useQuery(
    ["leaderboard", competition_key],
    () => getFilteredLeaderboardEntries(competition_key),
    {
      enabled: !!competition_key, // Only run this query if competitionId is not null
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
            if (
              res.blockConfirmationsCount >= 1 ||
              res.txStatus === "applied"
            ) {
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
          if (res.blockConfirmationsCount >= 1 || res.txStatus === "applied") {
            return updateTransactionLog(txn_hash, {
              txn_status: "CONFIRMED",
            });
          }
        }),
    {
      enabled: !!txn_hash && txn_status === "PENDING",
      retry: 5,
    }
  );
};

export const useMainnetTransactionStatusForMint = (txn_hash: string) => {
  return useQuery(
    ["transaction_status_mint_mainnet", txn_hash],
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
        .catch((error) => {
          return { success: false, error };
        }),
    {
      enabled: !!txn_hash,
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

export const useCompetitionByKey = (unique_keyname: string) => {
  return useQuery(
    ["tileville_competition", unique_keyname],
    () =>
      getCompetitionByKey(supabaseUserClientComponentClient, unique_keyname),
    {
      enabled: unique_keyname.length > 0,
    }
  );
};

export const useIsGameAlreadyPlayed = (game_id: number) => {
  return useQuery(
    ["game_already_played", game_id],
    () => isGameAlreadyPlayed(game_id),
    {
      enabled: game_id > 0,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  );
};

export const useGlobalConfig = (config_name: string) => {
  const [globalConfig, setGlobalConfig] = useAtom(globalConfigAtom);
  return useQuery(["global_config", config_name], () =>
    fetchGlobalConfig(config_name)
      .then((response) => {
        const config = response.config_values as { [key: string]: any };
        setGlobalConfig({ ...globalConfig, ...config });
        return response;
      })
      .catch((error) => {
        console.error(`Failed to fetch global config from db`, error);
      })
  );
};

export function useGetConnections(wallet_address: string) {
  return useQuery({
    queryKey: ["connections", wallet_address],
    queryFn: async () => {
      const response = await fetch(
        `/api/player/connections?wallet_address=${wallet_address}`
      );
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error);
      }
      return data.data;
    },
    enabled: !!wallet_address,
  });
}

export function useFollowUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      follower_wallet,
      target_wallet,
    }: {
      follower_wallet: string;
      target_wallet: string;
    }) => {
      const authSignature =
        window.localStorage.getItem(ACCOUNT_AUTH_LOCAL_KEY) || "";

      console.log("target wallet", target_wallet);
      console.log("follower_wallet", follower_wallet);
      try {
        const response = await fetch("/api/player/follow", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Wallet-Address": follower_wallet,
            "Auth-Signature": authSignature,
          },
          body: JSON.stringify({
            follower_wallet,
            target_wallet,
          }),
        });

        const data = await response.json();
        if (!data.success) {
          throw new Error(data.error);
        }
        return data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["connections"] });
      queryClient.invalidateQueries({ queryKey: ["all-users"] });
    },
  });
}

export function useUnfollowUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      follower_wallet,
      target_wallet,
    }: {
      follower_wallet: string;
      target_wallet: string;
    }) => {
      const authSignature =
        window.localStorage.getItem(ACCOUNT_AUTH_LOCAL_KEY) || "";

      console.log("target wallet", target_wallet);
      console.log("follower_wallet", follower_wallet);
      try {
        const response = await fetch("/api/player/unfollow", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Wallet-Address": follower_wallet,
            "Auth-Signature": authSignature,
          },
          body: JSON.stringify({
            follower_wallet,
            target_wallet,
          }),
        });

        const data = await response.json();
        if (!data.success) {
          throw new Error(data.error);
        }
        return data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["connections"] });
      queryClient.invalidateQueries({ queryKey: ["all-users"] });
    },
  });
}

export function useGetAllUsers(currentWallet: string, searchQuery = "") {
  return useQuery({
    queryKey: ["all-users", currentWallet, searchQuery],
    queryFn: async () => {
      const response = await fetch(
        `/api/player/all-users?wallet_address=${currentWallet}&search=${encodeURIComponent(
          searchQuery
        )}`
      );
      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error);
      }

      return data.data;
    },
    enabled: !!currentWallet,
  });
}

interface PublicProfileResponse {
  status: boolean;
  data: PublicProfile;
}

interface ProfileIdentifier {
  value: string;
  type: "wallet_address" | "username";
}

export const usePublicProfile = (identifier: string) => {
  // Determine if the identifier is a wallet address or username
  const getIdentifierType = (id: string): ProfileIdentifier => {
    const isWalletAddress = id.startsWith("B62q");
    return {
      value: id,
      type: isWalletAddress ? "wallet_address" : "username",
    };
  };

  const profileIdentifier = getIdentifierType(identifier);

  return useQuery<PublicProfileResponse, Error>(
    ["public-profile", profileIdentifier],
    async () => {
      const queryParam =
        profileIdentifier.type === "wallet_address"
          ? `wallet_address=${profileIdentifier.value}`
          : `username=${profileIdentifier.value}`;

      const response = await fetch(`/api/player/public?${queryParam}`);

      if (!response.ok) {
        throw new Error("Failed to fetch public profile");
      }

      return response.json();
    },
    {
      enabled: !!identifier, // Only fetch when identifier is available
      staleTime: 1000 * 60 * 5, // data fresh for 5 minutes
      cacheTime: 1000 * 60 * 30, // cache data for 30 minutes
      retry: 1, // Only retry once if failed
      onError: (error) => {
        console.error("Profile fetch error:", error);
      },
    }
  );
};

export const usePrivateProfile = (walletAddress: string) => {
  return useQuery(
    ["private-profile", walletAddress],
    async () => {
      const authSignature = window.localStorage.getItem(ACCOUNT_AUTH_LOCAL_KEY);
      if (!authSignature) {
        throw new Error("Auth signature missing!");
      }

      const response = await fetch(
        `/api/player/private?wallet_address=${walletAddress}`,
        {
          headers: {
            "Auth-Signature": authSignature,
            "Wallet-Address": walletAddress,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch private profile");
      }

      return response.json();
    },
    {
      enabled: !!walletAddress,
      staleTime: 1000 * 60 * 5,
      retry: 1,
    }
  );
};

interface BalanceResponse {
  success: boolean;
  data?: {
    balance: string;
    blockHeight: number;
    nonce: number;
    delegate: string;
    publicKey: string;
  };
  error?: string;
}

export const useBlockberryBalance = (walletAddress: string) => {
  return useQuery<BalanceResponse, Error>({
    queryKey: ["blockberry-balance", walletAddress],
    queryFn: async () => {
      try {
        const response = await fetch(
          `${BLOCKBERRY_MAINNET_BASE_URL}/v1/accounts/${walletAddress}`,
          {
            headers: {
              accept: "application/json",
              "x-api-key": BLOCKBERRY_API_KEY,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        return {
          success: true,
          data,
        };
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : "An error occurred",
        };
      }
    },
    enabled: !!walletAddress, // Only run query if wallet address is provided
    refetchInterval: 30000,
    staleTime: 15000, // Consider data stale after 15 seconds
    retry: 3, // Retry failed requests 3 times
  });
};
