"use client";
import { type PendingTransaction } from "@proto-kit/sequencer";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import {
  SendTransactionResult,
  ProviderError,
} from "@aurowallet/mina-provider";
import { NETWORKS, Network } from "@/constants/network";
import { useSessionStorage } from "react-use";
import { DEFAULT_TRASURY_ADDRESS, GAME_ENTRY_FEE_KEY } from "@/constants";
import toast from "react-hot-toast";
import {
  addNFTTransactionHash,
  addTransactionLog,
} from "@/db/supabase-queries";
import { usePosthogEvents } from "@/hooks/usePosthogEvents";
import { v4 as uuidv4 } from "uuid";
import { useMutation } from "@tanstack/react-query";
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

  pendingL2Transactions: PendingTransaction[];
  addPendingL2Transaction: (pendingTransaction: PendingTransaction) => void;
  removePendingL2Transaction: (pendingTransaction: PendingTransaction) => void;
}

export const useNetworkStore = create<NetworkState, [["zustand/immer", never]]>(
  immer((set) => ({
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
        const network = await (window as any).mina.requestNetwork();
        const minaNetwork = NETWORKS.find(
          (x) =>
            (network.chainId != "unknown"
              ? x.chainId == network.chainId
              : x.name == network.name) || x.networkID === network.networkID
        );
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
          return this.onWalletConnected(localStorage.minaAdderess);
        }
      } else {
        const accounts = await (window as any).mina.requestAccounts();
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
  }))
);

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
    joinedCompetition: [, logJoinCompetitionError],
  } = usePosthogEvents();

  const payParticipationFees = async ({
    participation_fee,
    treasury_address,
    competition_key,
    code,
    type,
  }: {
    participation_fee: number;
    treasury_address: string;
    competition_key: string;
    code?: string;
    type: "VOUCHER" | "NETWORK" | "FREE";
  }): Promise<{ id: number } | null | undefined> => {
    let hash;
    let network = networkStore.minaNetwork?.networkID || NETWORKS[1].networkID;
    let txn_status = "PENDING";
    if (!networkStore.address) {
      networkStore.connectWallet(false);
      return null;
    }
    switch (type) {
      case "FREE":
        hash = uuidv4();
        network = "FREE";
        txn_status = "CONFIRMED";
        break;
      case "VOUCHER":
        try {
          redeemVoucher.mutate({
            code: code!,
            wallet_address: networkStore.address,
          });
        } catch (err: any) {
          toast(
            `Failed to redeem voucher code. Please report a bug and help make the game better!`
          );
        }
        hash = code;
        network = "VOUCHER";
        txn_status = "CONFIRMED";
        break;
      case "NETWORK":
        try {
          const data: SendTransactionResult | ProviderError = await (
            window as any
          )?.mina?.sendPayment({
            amount: participation_fee,
            to: treasury_address,
            memo: `Pay ${participation_fee} MINA.`,
          });
          hash = (data as SendTransactionResult).hash;
          txn_status = "PENDING";
        } catch (err: any) {
          toast(`Txn failed with error ${err.toString()}. report a bug`);
        }
        break;
      default:
    }
    try {
      if (hash) {
        console.log("response hash", hash);
        setIsEntryFeePaid(true);
        const response = await addTransactionLog({
          txn_hash: hash,
          wallet_address: networkStore.address,
          network,
          competition_key,
          txn_status,
          is_game_played: false,
        });

        console.log("Add transaction log response", response);
        return response;
      } else {
        console.log("toast error");
      }
    } catch (err: any) {
      toast("Failed to transfer entry fees😭");
      logJoinCompetitionError(err.toString());
      return null;
    }
  };

  return { payParticipationFees };
};

export const usePayNFTMintFee = () => {
  const networkStore = useNetworkStore();

  const payNFTMintFees = async ({
    nft_id,
    nft_price,
  }: {
    nft_id: number;
    nft_price: number;
  }): Promise<{ id: number } | null | undefined> => {
    let txn_hash;
    if (!networkStore.address) {
      networkStore.connectWallet(false);
      return null;
    }

    //TODO: remove it after testing
    nft_price = 1;
    try {
      const data: SendTransactionResult | ProviderError = await (
        window as any
      )?.mina?.sendPayment({
        amount: nft_price,
        to: DEFAULT_TRASURY_ADDRESS,
        memo: `Pay ${nft_price} MINA to mint ${nft_id}`,
      });
      txn_hash = (data as SendTransactionResult).hash;
    } catch (err: any) {
      toast(`Txn failed with error ${err.toString()}. report a bug`);
    }
    try {
      if (txn_hash) {
        console.log("response hash", txn_hash);
        const response = await addNFTTransactionHash({ nft_id, txn_hash });
        console.log("Add nft transaction log response", response);
        return { id: nft_id };
      } else {
        console.log("toast error");
      }
    } catch (err: any) {
      toast("Failed to pay nft mint fees😭");
      return null;
    }
  };

  return { payNFTMintFees };
};
