import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { PublicKey, UInt64 } from "o1js";
import { MutableRefObject, useContext, useEffect } from "react";
import { useProtokitChainStore } from "@/lib/stores/protokitChain";
import { useNetworkStore } from "@/lib/stores/network";
import { LeaderboardIndex } from "tileville-chain-dev";
import { type ClientAppChain } from "@proto-kit/sdk";
import { minapolisConfig } from "@/game-config";

import AppChainClientContext from "@/lib/contexts/AppChainClientContext";

interface ILeaderboardInfo {
  score: UInt64;
  player: PublicKey;
}

const LEADERBOARD_SIZE = 20;

export interface LeaderboardState {
  loading: boolean;
  leaderboard: {
    [competitionId: string]: ILeaderboardInfo[];
  };
  getLeaderboard: (competitionId: string) => ILeaderboardInfo[];
  loadLeaderboard: (
    client: ClientAppChain<
      typeof minapolisConfig.runtimeModules,
      any,
      any,
      any
    >,
    competitionId: string
  ) => Promise<void>;
}

export const useArkanoidLeaderboardStore = create<
  LeaderboardState,
  [["zustand/immer", never]]
>(
  immer((set) => ({
    loading: Boolean(false),
    leaderboard: {},
    getLeaderboard(competitionId: string) {
      return this.leaderboard?.[competitionId] ?? [];
    },
    async loadLeaderboard(
      client: ClientAppChain<
        typeof minapolisConfig.runtimeModules,
        any,
        any,
        any
      >,
      competitionId: string
    ) {
      if (isNaN(+competitionId)) {
        console.log("Can't get leaderbord for NaN competitionId");
        return;
      }
      set((state) => {
        state.loading = true;
      });

      const leaderboard = [] as ILeaderboardInfo[];

      for (let i = 0; i < LEADERBOARD_SIZE; i++) {
        const leaderboardItem =
          await client.query.runtime.MinapolisGameHub.leaderboard.get(
            new LeaderboardIndex({
              competitionId: UInt64.from(+competitionId),
              index: UInt64.from(i),
            })
          );
        if (
          leaderboardItem !== undefined &&
          leaderboardItem.player.equals(PublicKey.empty()).not().toBoolean()
        ) {
          leaderboard.push({
            score: leaderboardItem.score,
            player: leaderboardItem.player,
          });
        }
      }
      set((state) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        state.leaderboard[competitionId] = leaderboard;
        state.loading = false;
      });
    },
  }))
);

export const useObserveArkanoidLeaderboard = (
  competitionId: string,
  shouldUpdate: MutableRefObject<boolean>
) => {
  const client = useContext<
    | ClientAppChain<typeof minapolisConfig.runtimeModules, any, any, any>
    | undefined
  >(AppChainClientContext);
  const chain = useProtokitChainStore();
  const network = useNetworkStore();
  const leaderboard = useArkanoidLeaderboardStore();

  useEffect(() => {
    console.log("Block id", chain.block?.height);
    if (!client) {
      throw Error("Client is not set in context");
    }
    if (!network.protokitClientStarted) return;

    if (!shouldUpdate.current) return;

    leaderboard.loadLeaderboard(client, competitionId);
  }, [chain.block?.height, network.protokitClientStarted]);
};
