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
  insertEmail,
  getAllCompetitionsEntries,
  getAllCompetitionsNames,
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
  fetchPVPChallengeTransaction,
  confirmChallengeParticipation,
} from "./supabase-queries";
import {
  ACCOUNT_AUTH_LOCAL_KEY,
  BLOCKBERRY_API_KEY,
  BLOCKBERRY_MAINNET_BASE_URL,
  isMockEnv,
} from "@/constants";
import { useAtom } from "jotai";
import { globalConfigAtom, globalConfigLoadingAtom } from "@/contexts/atoms";
import { ChallengeResponse, PublicProfile } from "@/types";
import { MOCK_GLOBAL_CONFIG } from "./mock-data/globalConfig";
import { NFTTableNames, TransactionStatus } from "@/lib/types";
import { useSetAtom } from "jotai";
import { followLoadingAtom } from "@/contexts/atoms";

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

export const useCompetitionsData = () => {
  return useQuery(
    ["tileville_competitions"],
    () => getAllCompetitionsEntries(supabaseUserClientComponentClient),
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

export const useMainnetPVPTransactionsStatus = (
  txn_hash: string,
  txn_status: TransactionStatus,
  challenge_id: number
) => {
  return useQuery(
    ["transaction_status_mainnet_pvp", txn_hash],
    () => {
      console.log(txn_hash, txn_status, challenge_id, 383);
      //TODO: Add counter for blockberry API to track how many times we calling this
      console.log(`Calling Blockberry api to check pvp txn status`);
      return fetch(
        `${BLOCKBERRY_MAINNET_BASE_URL}/v1/block-confirmation/${txn_hash}`,
        {
          headers: {
            "x-api-key": BLOCKBERRY_API_KEY,
          },
        }
      )
        .then((response) => response.json())
        .then((res) => {
          console.log("response blockberrry", res);
          if (res.blockConfirmationsCount >= 1 || res.txStatus === "applied") {
            return confirmChallengeParticipation(
              txn_hash,
              challenge_id,
              "CONFIRMED"
            );
          }
        });
    },
    {
      staleTime: Infinity,
      enabled: !!txn_hash && txn_status === "PENDING",
      retry: 5,
    }
  );
};

export const usePVPChallengeTransaction = (
  wallet_address: string,
  challenge_id: string | number
) => {
  return useQuery(
    ["pvp_challenge_transaction", wallet_address, challenge_id],
    () => fetchPVPChallengeTransaction(wallet_address, challenge_id),
    {
      enabled: !!wallet_address && !!challenge_id,
    }
  );
};

export const useTransactionLogById = (wallet_address: string, id: number) => {
  return useQuery(
    ["transaction_log_by_id", wallet_address, id],
    () => fetchTransac tionLogById(wallet_address, id),
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
  const setGlobalConfigLoading = useSetAtom(globalConfigLoadingAtom);

  return useQuery({
    queryKey: ["global_config", config_name],
    queryFn: async () => {
      setGlobalConfigLoading(true);
      try {
        const response = await fetchGlobalConfig(config_name);
        const config = isMockEnv()
          ? MOCK_GLOBAL_CONFIG
          : (response.config_values as { [key: string]: any });
        setGlobalConfig({ ...globalConfig, ...config });
        return response;
      } catch (error) {
        console.error(`Failed to fetch global config from db`, error);
        throw error;
      } finally {
        setGlobalConfigLoading(false);
      }
    },
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    onError: (error) => {
      console.error("Error loading global config:", error);
      setGlobalConfigLoading(false);
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
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
  const setFollowLoading = useSetAtom(followLoadingAtom);

  return useMutation({
    mutationFn: async ({
      follower_wallet,
      target_wallet,
    }: {
      follower_wallet: string;
      target_wallet: string;
    }) => {
      setFollowLoading(true);
      try {
        const authSignature =
          window.localStorage.getItem(ACCOUNT_AUTH_LOCAL_KEY) || "";

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
      } finally {
        setFollowLoading(false);
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
  const setFollowLoading = useSetAtom(followLoadingAtom);

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
      setFollowLoading(true);
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
      } finally {
        setFollowLoading(false);
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
      const data = await response.json();

      if (!response.ok) {
        if (response.status === 404) {
          return {
            status: false,
            data: null,
          };
        }
        throw new Error("Failed to fetch public profile");
      }

      return data;
    },
    {
      enabled: !!identifier,
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 30,
      retry: 1,
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

interface UsernameResponse {
  status: boolean;
  data?: {
    username: string;
  };
  message?: string;
}

export const useUsername = (walletAddress: string | undefined) => {
  return useQuery({
    queryKey: ["username", walletAddress],
    queryFn: async (): Promise<string | null> => {
      if (!walletAddress) return null;

      try {
        const response = await fetch(
          `/api/player/username?wallet_address=${walletAddress}`
        );
        const data: UsernameResponse = await response.json();

        if (!data.status || !data.data?.username) {
          return null;
        }

        return data.data.username;
      } catch (error) {
        console.error("Error fetching username:", error);
        return null;
      }
    },
    enabled: !!walletAddress,
    staleTime: 5 * 60 * 1000, // Consider username fresh for 5 minutes
    cacheTime: 30 * 60 * 1000, // Cache username for 30 minutes
  });
};

export function useTotalWins(wallet_address: string) {
  return useQuery({
    queryKey: ["total-wins", wallet_address],
    queryFn: async () => {
      const response = await fetch(
        `/api/player/total-wins?wallet_address=${wallet_address}`
      );
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error);
      }
      return data.total_wins;
    },
    enabled: !!wallet_address,
  });
}

interface PastCompetition {
  competitionKey: string;
  posterUrl: string;
  competitionName: string;
}

interface PastCompetitionsResponse {
  success: boolean;
  competitions: PastCompetition[];
  message?: string;
}

export function usePastCompetitions(wallet_address: string) {
  return useQuery<PastCompetitionsResponse, Error>({
    queryKey: ["past-competitions", wallet_address],
    queryFn: async () => {
      const response = await fetch(
        `/api/player/past-competitions?wallet_address=${wallet_address}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch past competitions");
      }

      return response.json();
    },
    enabled: Boolean(wallet_address), // Only run query if wallet address exists
    staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
    cacheTime: 1000 * 60 * 30, // Cache data for 30 minutes
    retry: 2, // Retry failed requests twice
    select: (data) => ({
      ...data,
      competitions: data.competitions.sort((a, b) =>
        a.competitionKey.localeCompare(b.competitionKey)
      ), // Sort competitions by key
    }),
    onError: (error) => {
      console.error("Error fetching past competitions:", error);
    },
  });
}

export const useTelegramVerify = ({
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
    async ({
      chatId,
      walletAddress,
    }: {
      chatId: string;
      walletAddress: string;
    }) => {
      const authSignature =
        window.localStorage.getItem(ACCOUNT_AUTH_LOCAL_KEY) || "";
      return fetch("/api/telegram/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Auth-Signature": authSignature,
          "Wallet-Address": walletAddress,
        },
        body: JSON.stringify({
          chatId,
          walletAddress,
        }),
      }).then((res) => res.json());
    },
    {
      onMutate: () => {
        toastRef.current = toast.loading("Verifying your account...");
        onMutate?.();
      },
      onSuccess: () => {
        toast.success("Successfully verified your telegram account!", {
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

export const useSendGroupMessage = () => {
  return useMutation({
    mutationFn: async ({
      message,
      groupTopicId,
    }: {
      message: string;
      groupTopicId: string;
    }) => {
      const response = await fetch("/api/telegram/group-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          groupTopicId,
        }),
      });
      return response.json();
    },
  });
};

export const useSendPrivateGroupMessage = () => {
  const toastRef = useRef<string | null>(null);

  return useMutation({
    mutationFn: async ({
      message,
      walletAddress,
    }: {
      message: string;
      walletAddress: string;
    }) => {
      const response = await fetch("/api/telegram/private-group-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to send message");
      }

      return response.json();
    },
    onMutate: () => {
      toastRef.current = toast.loading("Notifying about your win...");
    },
    onSuccess: () => {
      toast.success(
        "Team has been notified of your win! Prize will be sent to your wallet soon.",
        {
          id: toastRef.current ?? undefined,
        }
      );
      toastRef.current = null;
    },
    onError: (error: Error) => {
      toast.error(
        error.message ||
          "Failed to notify team. Please try again or contact support.",
        {
          id: toastRef.current ?? undefined,
        }
      );
      toastRef.current = null;
    },
  });
};

export const useCreatedChallenges = (walletAddress: string) => {
  return useQuery({
    queryKey: ["created-challenges", walletAddress],
    queryFn: async () => {
      const response = await fetch(
        `/api/pvp/challenges/created?wallet_address=${walletAddress}`
      );
      const data = await response.json();
      return data as ChallengeResponse;
    },
    enabled: !!walletAddress,
  });
};

export const useAcceptedChallenges = (walletAddress: string) => {
  return useQuery({
    queryKey: ["accepted-challenges", walletAddress],
    queryFn: async () => {
      const response = await fetch(
        `/api/pvp/challenges/accepted?wallet_address=${walletAddress}`
      );
      const data = await response.json();
      return data as ChallengeResponse;
    },
    enabled: !!walletAddress,
  });
};

export const useCreateChallenge = (wallet_address: string) => {
  const queryClient = useQueryClient();

  const authSignature = window.localStorage.getItem(ACCOUNT_AUTH_LOCAL_KEY);
  if (!authSignature) {
    console.warn("Auth signature missing in storage");
    throw new Error("Auth signature missing!");
  }

  return useMutation({
    mutationFn: async (data: {
      name: string;
      entry_fee: number;
      end_time: string;
      max_participants: number;
      is_speed_challenge: boolean;
      speed_duration?: number;
      is_public: boolean;
    }) => {
      const response = await fetch("/api/pvp/challenges", {
        method: "POST",
        headers: {
          "Auth-Signature": authSignature,
          "Wallet-Address": wallet_address,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to create challenge");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["created_challenges"] });
    },
  });
};

export const useInviteChallenge = (code: string) => {
  return useQuery({
    queryKey: ["invite-challenge", code],
    queryFn: async () => {
      const response = await fetch(`/api/pvp/challenges/${code}`);
      const data = await response.json();
      return data;
    },
    enabled: !!code,
  });
};

export const useJoinChallenge = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      challenge_id,
      wallet_address,
    }: {
      challenge_id: number;
      wallet_address: string;
    }) => {
      const response = await fetch("/api/pvp/challenges/join", {
        method: "POST",
        body: JSON.stringify({ challenge_id, wallet_address }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to join challenge");
      }

      return response.json();
    },
    onSuccess: () => {
      // Invalidate relevant queries to refetch the latest data
      queryClient.invalidateQueries({ queryKey: ["invite-challenge"] });
    },
  });
};

export const useSavePvPScore = () => {
  return useMutation({
    mutationFn: async ({
      challenge_id,
      wallet_address,
      score,
    }: {
      challenge_id: number;
      wallet_address: string;
      score: number;
    }) => {
      const authSignature =
        window.localStorage.getItem(ACCOUNT_AUTH_LOCAL_KEY) || "";

      const response = await fetch("/api/pvp/challenges/submit-score", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Wallet-Address": wallet_address,
          "Auth-Signature": authSignature,
        },
        body: JSON.stringify({
          challenge_id,
          score,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save PVP score");
      }

      return response.json();
    },
  });
};

export const useChallengeById = (challengeId: string | number) => {
  return useQuery({
    queryKey: ["challenge", challengeId],
    queryFn: async () => {
      const response = await fetch(`/api/pvp/challenge/${challengeId}`);
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error || "Failed to fetch challenge");
      }
      return data;
    },
    enabled: !!challengeId,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
};

export const useTelegramStatus = (wallet_address: string) => {
  return useQuery({
    queryKey: ["telegram-status", wallet_address],
    queryFn: async () => {
      const response = await fetch(
        `/api/telegram/status?wallet_address=${wallet_address}`
      );
      const data = await response.json();
      return data.verified;
    },
    enabled: !!wallet_address,
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 30, // 30 minutes
  });
};

export interface NFTResponse {
  nfts: Array<any>;
  count: number;
  currentPage: number;
  totalPages: number;
}

export type NFTError = {
  message: string;
  status?: number;
};

export const useNFTsWithPagination = ({
  sortOrder = "desc",
  searchTerm,
  currentPage,
  collectionTableName,
  enabled = true,
}: {
  sortOrder: "asc" | "desc";
  searchTerm: string;
  currentPage: number;
  collectionTableName: string;
  enabled?: boolean;
}) => {
  return useQuery<NFTResponse, NFTError>({
    queryKey: [sortOrder, searchTerm, currentPage, collectionTableName],
    queryFn: async () => {
      const params = [
        `sortOrder=${sortOrder}`,
        `searchTerm=${encodeURIComponent(searchTerm)}`,
        `page=${currentPage}`,
        `collectionTableName=${collectionTableName}`,
      ].join("&");

      const response = await fetch(`/api/nfts?${params}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw {
          message: errorData.error || "Failed to fetch NFTs",
          status: response.status,
        };
      }
      return response.json();
    },
    enabled: enabled && !!collectionTableName,
    keepPreviousData: true,
    staleTime: 1000 * 60,
  });
};

export const useFeaturedNFTs = () => {
  return useQuery({
    queryKey: ["featured-nfts"],
    queryFn: async () => {
      const response = await fetch("/api/nfts/featured");
      if (!response.ok) {
        const errorData = await response.json();
        throw {
          message: errorData.error || "Failed to fetch featured NFTs",
          status: response.status,
        };
      }
      return response.json();
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
