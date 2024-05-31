import { useEffect } from "react";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { NETWORKS } from "@/constants/network";
import { useNetworkStore } from "./network";

export interface ComputedTransactionJSON {
  argsFields: string[];
  argsJSON: string[];
  methodId: string;
  nonce: string;
  sender: string;
  signature: {
    r: string;
    s: string;
  };
}

export interface ComputedBlockJSON {
  txs?: {
    status: boolean;
    statusMessage?: string;
    tx: ComputedTransactionJSON;
  }[];
}

export interface ChainState {
  loading: boolean;
  block?: {
    height: string;
  } & ComputedBlockJSON;
  loadBlock: (chainId: string) => Promise<void>;
}

export interface BlockQueryResponse {
  data: {
    bestChain: {
      protocolState: {
        consensusState: {
          blockHeight: string;
        };
      };
    }[];
    block: ComputedBlockJSON;
  };
}

export const useChainStore = create<ChainState, [["zustand/immer", never]]>(
  immer((set) => ({
    loading: Boolean(false),
    async loadBlock(chainId: string) {
      if (chainId == undefined) return;

      set((state) => {
        state.loading = true;
      });

      const response = await fetch(
        // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
        NETWORKS.find((x) => x.chainId == chainId)?.graphql!,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `
            query {
              bestChain(maxLength:1) {
                protocolState {
                  consensusState {
                    blockHeight
                  }
                }
              }
            }
          `,
          }),
        }
      );

      const { data } = (await response.json()) as BlockQueryResponse;
      const height = data.bestChain[0].protocolState.consensusState.blockHeight;

      if (height) {
        return;
      }

      set((state) => {
        state.loading = false;
        state.block = {
          height,
          ...data.block,
        };
      });
    },
  }))
);

export const tickInterval = 5000;
export const usePollMinaBlockHeight = () => {
  const chain = useChainStore();
  const network = useNetworkStore();

  useEffect(() => {
    const intervalId = setInterval(
      () => chain.loadBlock(network.minaNetwork?.chainId!),
      tickInterval
    );
    chain.loadBlock(network.minaNetwork?.chainId!);

    return () => clearInterval(intervalId);
  }, []);
};
