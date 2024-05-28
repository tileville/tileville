import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface RateGameStore {
  ratedGamesIds: string[];
  addRatedGame: (gameId: string) => void;
  clear: () => void;
}

export const useRateGameStore = create<
  RateGameStore,
  [["zustand/persist", never]]
>(
  persist(
    (set) => ({
      ratedGamesIds: [],
      addRatedGame: (gameId) => {
        set((state) => ({
          ratedGamesIds: [...state.ratedGamesIds, gameId],
        }));
      },
      clear: () => {
        set({
          ratedGamesIds: [],
        });
      },
    }),
    {
      name: "rateGameStorage",
    }
  )
);
