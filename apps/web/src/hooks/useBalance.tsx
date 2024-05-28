import { create } from "zustand";
import { Client, useClientStore } from "./useClientStore";
import { immer } from "zustand/middleware/immer";
import { PendingTransaction, UnsignedTransaction } from "@proto-kit/sequencer";
import { PublicKey } from "o1js";
import { useChainStore } from "./useChainStore";
import { useWalletStore } from "./useWalletStore";
import { Balance, TokenId, UInt64 } from "@proto-kit/library";
import { useEffect } from "react";

export interface BalancesState {
  loading: boolean;
  balances: {
    // address - balance
    [key: string]: string;
  };
  loadBalance: (client: Client, address: string) => Promise<void>;
  faucet: (client: Client, address: string) => Promise<PendingTransaction>;
}

function isPendingTransaction(
  transaction: PendingTransaction | UnsignedTransaction | undefined
): asserts transaction is PendingTransaction {
  if (!(transaction instanceof PendingTransaction))
    throw new Error("Transaction is not a PendingTransaction");
}

export const useBalancesStore = create<
  BalancesState,
  [["zustand/immer", never]]
>(
  immer((set) => ({
    loading: Boolean(false),
    balances: {},
    async loadBalance(client: Client, address: string) {
      set((state) => {
        state.loading = true;
      });

      const balance = await client.query.runtime.Balances.balances.get({
        tokenId: TokenId.from(0),
        address: PublicKey.fromBase58(address),
      });

      set((state) => {
        state.loading = false;
        state.balances[address] = balance?.toString() ?? "0";
      });
    },
    async faucet(client: Client, address: string) {
      const balances = client.runtime.resolve("Balances");
      const sender = PublicKey.fromBase58(address);

      const tx = await client.transaction(sender, () => {
        return balances.addBalance(
          TokenId.from(0),
          sender,
          UInt64.from(1000) as any
        );
      });

      await tx.sign();
      await tx.send();

      isPendingTransaction(tx.transaction);
      return tx.transaction;
    },
  }))
);

export const useObserveBalance = () => {
  const client = useClientStore();
  const chain = useChainStore();
  const wallet = useWalletStore();
  const balances = useBalancesStore();

  useEffect(() => {
    if (!client.client || !wallet.wallet) return;

    balances.loadBalance(client.client, wallet.wallet).catch((err) => {
      console.error(`Failed to load balance`, err);
    });
  }, [client.client, chain.block?.height, wallet.wallet]);
};
