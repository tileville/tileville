"use client";
import { type PendingTransaction } from "@proto-kit/sequencer";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import {
  SendTransactionResult,
  ProviderError,
} from "@aurowallet/mina-provider";
import { NETWORKS, Network } from "@/constants/network";
import { useState } from "react";
import { useSessionStorage } from "react-use";
import { GAME_ENTRY_FEE_KEY } from "@/constants";
import toast from "react-hot-toast";

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
        console.log("###Target network###", network);
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
        console.log("network from wallet", network, network.chainId);
        const minaNetwork = NETWORKS.find(
          (x) =>
            (network.chainId != "unknown"
              ? x.chainId == network.chainId
              : x.name == network.name) || x.networkID === network.networkID
        );
        console.log("mina network", minaNetwork);
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

// type ParticipationFeeState = {
//   payParticipationFee: (fees)
// }

export const useParticipationFee = () => {
  const networkStore = useNetworkStore();
  const [resHash, setResHash] = useState("");
  const [, setIsEntryFeeFaid] = useSessionStorage(GAME_ENTRY_FEE_KEY, false);

  const payParticipationFees = async (
    participation_fee: number,
    treasury_address: string
  ) => {
    if (!networkStore.address) {
      return networkStore.connectWallet(false);
    }
    try {
      const data: SendTransactionResult | ProviderError = await (
        window as any
      )?.mina?.sendPayment({
        amount: participation_fee,
        to: treasury_address,
        memo: `Pay fee of ${participation_fee} MINA to tileville.`,
      });
      const hash = (data as SendTransactionResult).hash;
      if (hash) {
        console.log("response hash", hash);
        setResHash(hash);
        setIsEntryFeeFaid(true);
        // TODO: Store transaction log to supabase
      } else {
        toast((data as ProviderError).message || "");
      }
    } catch (err) {
      toast("Failed to transfer entry fees😭");
    }
  };

  return { payParticipationFees };
};
