"use client";
import { type PendingTransaction } from "@proto-kit/sequencer";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { NETWORKS, Network } from "@/constants/network";
import { useSessionStorage } from "react-use";
import { GAME_ENTRY_FEE_KEY } from "@/constants";
import toast from "react-hot-toast";
import { addTransactionLog } from "@/db/supabase-queries";
import { usePosthogEvents } from "@/hooks/usePosthogEvents";
import { v4 as uuidv4 } from "uuid";
import { useMutation } from "@tanstack/react-query";
// import { mintNFT } from "@/app/api/mint-nft/minanft-call";
import { useSetAtom } from "jotai";
import { mintProgressAtom } from "@/contexts/atoms";
import { useMintMINANFT } from "@/hooks/useMintMINANFT";
import { requestAccounts, requestNetwork, sendPayment } from "../helpers";
import { useCompetitionErrorTracking } from "@/hooks/useCompetitionErrorTracking";
import { NFTBucketNames, NFTTableNames } from "../types";
// import uuid from "uuid";

export interface NetworkState {
  minaNetwork: Network | undefined;
  setNetwork: (network: Network | undefined) => Promise<void>;
  address: string | undefined;
  walletConnected: boolean;
  protokitClientStarted: boolean;
  onWalletConnected: (address: string | undefined) => Promise<void>;
  onProtokitClientStarted: () => void;
  connectWallet: (soft: boolean) => Promise<void>;
  walletInstalled: () => boolean;
  // accountAuthSignature?: string | undefined;
  pendingL2Transactions: PendingTransaction[];
  addPendingL2Transaction: (pendingTransaction: PendingTransaction) => void;
  removePendingL2Transaction: (pendingTransaction: PendingTransaction) => void;
  // setAuthSignature: () => Promise<boolean>;
}

export const useNetworkStore = create<NetworkState, [["zustand/immer", never]]>(
  immer((set) => {
    return {
      walletConnected: false,
      protokitClientStarted: false,
      minaNetwork: undefined,
      onProtokitClientStarted() {
        set({
          protokitClientStarted: true,
        });
      },
      async setNetwork(network: Network | undefined) {
        const O1js = await import("o1js");

        set((state) => {
          // console.log("###Target network###", network);
          state.minaNetwork = network;
          if (network) {
            const Network = O1js.Mina.Network(network?.graphql);
            O1js.Mina.setActiveInstance(Network);
          }
        });
      },

      address: undefined,

      async onWalletConnected(address: string | undefined) {
        if (address) {
          localStorage.minaAdderess = address;
          const network = await requestNetwork();
          const minaNetwork = NETWORKS.find(
            (x) =>
              (network.chainId != "unknown"
                ? x.chainId == network.chainId ||
                  x.palladNetworkID === network.chainId
                : x.name == network.name) || x.networkID === network.networkID
          );
          const accountAuthSignature =
            localStorage.ACCOUNT_AUTH_LOCALSTORAGE_KEY;

          this.setNetwork(minaNetwork);
        } else {
          localStorage.minaAdderess = "";
        }
        set((state) => {
          state.address = address;
          state.walletConnected = !!address;
        });
      },
      async connectWallet(soft: boolean) {
        if (soft) {
          if (localStorage.minaAdderess) {
            this.onWalletConnected(localStorage.minaAdderess);
          }
        } else {
          const accounts = await requestAccounts();
          this.onWalletConnected(accounts[0]);
        }
      },
      walletInstalled() {
        return typeof mina !== "undefined";
      },
      pendingL2Transactions: [],
      addPendingL2Transaction(pendingTransaction) {
        set((state) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          state.pendingL2Transactions.push(pendingTransaction);
        });
      },
      removePendingL2Transaction(pendingTransaction) {
        set((state) => {
          state.pendingL2Transactions = state.pendingL2Transactions.filter(
            (tx) => {
              return (
                tx.hash().toString() !== pendingTransaction.hash().toString()
              );
            }
          );
        });
      },
    };
  })
);

//TODO: Move this to new files
export const useParticipationFee = () => {
  const networkStore = useNetworkStore();
  const redeemVoucher = useMutation({
    mutationFn: ({
      code,
      wallet_address,
    }: {
      code: string;
      wallet_address: string;
    }) =>
      fetch(`/api/vouchers`, {
        method: "POST",
        body: JSON.stringify({ code, wallet_address }),
      }),
  });

  const [, setIsEntryFeePaid] = useSessionStorage(GAME_ENTRY_FEE_KEY, false);
  const {
    joinedCompetition: [logJoinCompetition, logJoinCompetitionError],
  } = usePosthogEvents();
  const { trackCompetitionError, COMPETITION_ERRORS } =
    useCompetitionErrorTracking();

  const payParticipationFees = async ({
    participation_fee,
    treasury_address,
    competition_key,
    code,
    type,
    competition_name,
  }: {
    participation_fee: number;
    treasury_address: string;
    competition_key: string;
    code?: string;
    type: "VOUCHER" | "NETWORK" | "FREE";
    competition_name: string;
  }): Promise<{ id: number } | null | undefined> => {
    let hash;
    let network = window.mina?.isPallad
      ? networkStore.minaNetwork?.palladNetworkID || NETWORKS[1].palladNetworkID
      : networkStore.minaNetwork?.networkID || NETWORKS[1].networkID;
    let txn_status = "PENDING";

    if (!networkStore.address) {
      trackCompetitionError(
        COMPETITION_ERRORS.WALLET_NOT_CONNECTED(competition_name)
      );
      networkStore.connectWallet(false);
      return null;
    }

    try {
      // TODO: REMOVE THIS BEFORE COMMITTING THIS IS FOR TESTING
      COMPETITION_ERRORS.PAYMENT_FAILED(
        competition_name,
        type,
        "error message",
        {
          amount: participation_fee,
        }
      );

      logJoinCompetition({
        walletAddress: networkStore.address,
        competition_name,
        network: type,
      });

      switch (type) {
        case "FREE":
          hash = uuidv4();
          network = "FREE";
          txn_status = "CONFIRMED";
          break;

        case "VOUCHER":
          try {
            await redeemVoucher.mutateAsync({
              code: code!,
              wallet_address: networkStore.address,
            });
            hash = code;
            network = "VOUCHER";
            txn_status = "CONFIRMED";
          } catch (err: any) {
            trackCompetitionError(
              COMPETITION_ERRORS.VOUCHER_REDEMPTION_FAILED(
                competition_name,
                type,
                err,
                { voucherCode: code }
              )
            );
            toast(`Failed to redeem voucher code. Please report a bug`);
            return null;
          }
          break;

        case "NETWORK":
          try {
            hash = await sendPayment({
              from: networkStore.address,
              amount: participation_fee,
            });
            if (!hash) {
              throw new Error("No transaction hash returned");
            }
            txn_status = "PENDING";
          } catch (err: any) {
            trackCompetitionError(
              COMPETITION_ERRORS.PAYMENT_FAILED(competition_name, type, err, {
                amount: participation_fee,
              })
            );
            toast(`Transaction failed: ${err.toString()}. Please report a bug`);
            return null;
          }
          break;
      }

      if (hash) {
        try {
          setIsEntryFeePaid(true);
          const response = await addTransactionLog({
            txn_hash: hash,
            wallet_address: networkStore.address,
            network,
            competition_key,
            txn_status,
            is_game_played: false,
          });
          return response;
        } catch (err: any) {
          trackCompetitionError(
            COMPETITION_ERRORS.TRANSACTION_LOG_FAILED(
              competition_name,
              network,
              err,
              { txnHash: hash }
            )
          );
          toast("Failed to record transaction. Please report a bug.");
          return null;
        }
      }
    } catch (err: any) {
      trackCompetitionError(
        COMPETITION_ERRORS.PAYMENT_FAILED(competition_name, type, err, {
          amount: participation_fee,
        })
      );
      toast("Failed to transfer entry fees😭");
      return null;
    }
  };

  return { payParticipationFees };
};

const MINTING_STEPS = {
  STARTED: 1,
  IPFS_UPLOAD: 2,
  O1JS_LOADING: 3,
  TRANSACTION_SIGNING: 4,
  TRANSACTION_SENDING: 5,
  COMPLETED: 6,
} as const;

//TODO: Move this to new files
export const useMintNFT = () => {
  const networkStore = useNetworkStore();
  const setMintProgress = useSetAtom(mintProgressAtom);
  const { mintMINANFTHelper } = useMintMINANFT();
  const {
    nftMinting: [logNFTMinting, logNFTMintingError],
    nftMintingStepComplete: [logNFTMintingStepComplete],
    nftMintingSuccess: [logNFTMintingSuccess],
  } = usePosthogEvents();

  const mintNft = async ({
    nft_id,
    collection,
    category,
    collectionTableName,
    collectionBucketName,
    collectionDescription,
    imageFormat,
    isZeko,
  }: {
    nft_id: number;
    collection?: string;
    category?: string;
    collectionTableName: NFTTableNames;
    collectionBucketName: NFTBucketNames;
    collectionDescription: string;
    imageFormat: string;
    isZeko: boolean;
  }) => {
    if (!networkStore.address) {
      networkStore.connectWallet(false);
      return null;
    }

    try {
      // Step 1: Started
      logNFTMinting({
        nftId: nft_id,
        walletAddress: networkStore.address,
        step: MINTING_STEPS.STARTED,
        collection,
        category,
      });

      const nft_payload_response = await fetch(`/api/mint-nft`, {
        method: "POST",
        body: JSON.stringify({
          wallet_address: networkStore.address,
          nft_id,
          collection,
          collectionTableName,
          collectionBucketName,
          collectionDescription,
          imageFormat,
          isZeko,
        }),
        headers: {
          "Auth-Signature": "abv1",
        },
      });

      const nft_payload = await nft_payload_response.json();

      if (nft_payload.success === false) {
        logNFTMintingError({
          nftId: nft_id,
          walletAddress: networkStore.address,
          step: MINTING_STEPS.IPFS_UPLOAD,
          error: nft_payload.message,
          collection,
          category,
        });
        return nft_payload;
      }

      // Step 2: IPFS Upload Complete
      logNFTMintingStepComplete({
        nftId: nft_id,
        walletAddress: networkStore.address,
        price: nft_payload.price,
        step: MINTING_STEPS.IPFS_UPLOAD,
        collection,
        category,
      });

      setMintProgress({
        [nft_id]: {
          step: 2,
          message: "Loading O1JS and MINANFT Environment",
        },
      });

      // Step 3: O1JS Loading
      logNFTMintingStepComplete({
        nftId: nft_id,
        walletAddress: networkStore.address,
        price: nft_payload.price,
        step: MINTING_STEPS.O1JS_LOADING,
        collection,
        category,
      });

      const response = await mintMINANFTHelper(nft_payload);

      if (response?.success) {
        logNFTMintingSuccess({
          nftId: nft_id,
          walletAddress: networkStore.address,
          price: nft_payload.price,
          txHash: response?.txHash,
          step: MINTING_STEPS.COMPLETED,
          collection,
          category,
        });
      } else {
        logNFTMintingError({
          nftId: nft_id,
          walletAddress: networkStore.address,
          price: nft_payload.price,
          error: response?.message || "Unknown error",
          step: MINTING_STEPS.TRANSACTION_SIGNING,
          collection,
          category,
        });
      }

      return response;
    } catch (error: any) {
      logNFTMintingError({
        nftId: nft_id,
        walletAddress: networkStore.address,
        step: MINTING_STEPS.TRANSACTION_SIGNING,
        error: error.toString(),
        collection,
        category,
      });
      toast(`Txn failed with error ${error.toString()}. report a bug`);
    }
  };

  return { mintNft };
};
