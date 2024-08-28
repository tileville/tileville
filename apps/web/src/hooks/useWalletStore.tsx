import { requestAccounts } from "@/lib/helpers";
import { PendingTransaction } from "@proto-kit/sequencer";
// import { MethodIdResolver } from "@proto-kit/module";
// import { useCallback, useEffect, useMemo } from "react";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
// import truncateMiddle from "truncate-middle";
// import { useClientStore } from "./useClientStore";
// import { useChainStore } from "./useChainStore";
// import { Field, PublicKey, Signature, UInt64 } from "o1js";

export interface WalletState {
  wallet?: string;
  initializeWallet: () => Promise<void>;
  connectWallet: () => Promise<void>;
  observeWalletChange: () => void;

  pendingTransactions: PendingTransaction[];
  addPendingTransaction: (pendingTransaction: PendingTransaction) => void;
  removePendingTransaction: (pendingTransaction: PendingTransaction) => void;
}

export const useWalletStore = create<WalletState, [["zustand/immer", never]]>(
  immer((set) => ({
    async initializeWallet() {
      if (typeof mina === "undefined") {
        throw new Error("Aura wallet not installed");
      }

      const [wallet] = await mina.getAccounts();
      set((state) => {
        state.wallet = wallet;
      });
    },
    async connectWallet() {
      if (typeof mina === "undefined") {
        throw new Error("Aura wallet not installed");
      }
      const [wallet] = await requestAccounts();
      set((state) => {
        state.wallet = wallet;
      });
    },

    observeWalletChange() {
      if (typeof mina === "undefined") {
        throw new Error("Auro wallet not installed");
      }

      mina.on("accountsChanged", ([wallet]) => {
        set((state) => {
          state.wallet = wallet;
        });
      });
    },
    pendingTransactions: [] as PendingTransaction[],
    addPendingTransaction(pendingTransaction) {
      set((state) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        state.pendingTransactions.push(pendingTransaction);
      });
    },
    removePendingTransaction(pendingTransaction) {
      set((state) => {
        state.pendingTransactions = state.pendingTransactions.filter((tx) => {
          return tx.hash().toString() !== pendingTransaction.hash().toString();
        });
      });
    },
  }))
);
