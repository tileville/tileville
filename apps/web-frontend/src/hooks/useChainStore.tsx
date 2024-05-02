import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { useEffect, useState } from "react";
import { SEQUENCER_GRAPHQL_URL } from "@/constants";

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

export type Transaction = {
  status: boolean;
  statusMessage?: string;
  tx: ComputedTransactionJSON;
};

export interface ComputedBlockJSON {
  txs?: Transaction[];
}

export interface ChainState {
  loading: boolean;
  block?: {
    height: string;
  } & ComputedBlockJSON;
  loadBlock: () => Promise<void>;
}

export interface BlockQueryResponse {
  data: {
    network: {
      unproven?: {
        block: {
          height: string;
        };
      };
    };
    block: ComputedBlockJSON;
  };
}

export const useChainStore = create<ChainState, [["zustand/immer", never]]>(
  immer((set) => ({
    loading: false,
    async loadBlock() {
      set((state) => {
        state.loading = true;
      });

      const response = await fetch(SEQUENCER_GRAPHQL_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
          
          query GetBlock {
            block {
              txs {
                tx {
                  argsFields
                  argsJSON
                  methodId
                  nonce
                  sender
                  signature {
                    r
                    s
                  }
                }
                status
                statusMessage
              }
            }

            network {
              unproven {
                block {
                  height
                }
              }
            }
          }`,
        }),
      });

      const { data } = (await response.json()) as BlockQueryResponse;

      set((state) => {
        state.loading = false;
        state.block = data.network.unproven
          ? {
              height: data.network.unproven.block.height,
              ...data.block,
            }
          : undefined;
      });
    },
  }))
);
