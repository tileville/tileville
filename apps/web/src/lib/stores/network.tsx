"use client";
import { type PendingTransaction } from "@proto-kit/sequencer";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { NETWORKS, Network } from "@/constants/network";

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
        console.log("Target network", network);
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
        const minaNetwork = NETWORKS.find((x) =>
          network.chainId != "unknown"
            ? x.chainId == network.chainId
            : x.name == network.name
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
