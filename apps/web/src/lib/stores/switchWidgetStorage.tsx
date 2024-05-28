import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface SwitchWidgetStorageState {
  competitionId: number | undefined;
  getCompetitionId: () => number | undefined;
  setCompetitionId: (competitionId: number) => void;
}

export const useSwitchWidgetStorage = create<
  SwitchWidgetStorageState,
  [["zustand/persist", never]]
>(
  persist(
    (set, get) => ({
      competitionId: undefined,
      getCompetitionId() {
        return this.competitionId;
      },
      setCompetitionId: (competitionId) => {
        set((state) => ({
          competitionId: competitionId,
        }));
      },
    }),
    {
      name: "switchWidgetStorage",
    }
  )
);
