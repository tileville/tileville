import { useEffect } from "react";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { NETWORKS } from "@/constants/network";

import { useChainStore } from "./minaChain";
import { useNetworkStore } from "./network";

export interface BalancesState {
  loading: boolean;
  balances: {
    // address - balance
    [key: string]: bigint;
  };
  loadBalance: (chainId: string, address: string) => Promise<void>;
}


export interface BalanceQueryResponse {
  data: {
    account:
      | {
          balance: {
            total: string;
          };
        }
      | undefined;
  };
}



export const useMinaBalancesStore = create<
  BalancesState,
  [["zustand/immer", never]]
>(
  immer((set) => ({
    loading: Boolean(false),
    balances: {},
    async loadBalance(chainId: string, address: string) {
      set((state) => {
        state.loading = true;
      });

      const response = await fetch(
        NETWORKS.find((x) => x.chainId == chainId)?.graphql!,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `
            query {
              account(publicKey: "${address}") {
                balance {
                  total
                }
                delegate
                nonce
              }
            }
          `,
          }),
        }
      );

      const { data } = (await response.json()) as BalanceQueryResponse;
      const balance = BigInt(data.account?.balance.total ?? "0");

      set((state) => {
        state.loading = false;
        state.balances[address] = balance ?? 0n;
      });
    },
  }))
);

export const useObserveMinaBalance = () => {
  const chain = useChainStore();
  const balances = useMinaBalancesStore();
  const network = useNetworkStore();

  useEffect(() => {
    if (
      !network.walletConnected ||
      !network.address ||
      !network.minaNetwork?.chainId
    )
      return;
    balances.loadBalance(network.minaNetwork?.chainId, network.address);
  }, [
    chain.block?.height,
    network.walletConnected,
    network.minaNetwork?.chainId,
    network.address,
    balances,
  ]);
};
