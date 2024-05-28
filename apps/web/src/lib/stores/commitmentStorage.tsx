import { Field, UInt64 } from "o1js";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface SessionKeyStorageState {
  salt: string;
  value: string;
  getCommitment: () => { value: UInt64; salt: Field };
  commit: (value: number) => Field;
}

export const useCommitmentStore = create<
  SessionKeyStorageState,
  [["zustand/persist", never]]
>(
  persist(
    (set, get) => ({
      commitment: "0",
      value: "0",
      salt: "0",
      getCommitment() {
        return {
          value: UInt64.from(this.value),
          salt: Field.from(this.salt),
        };
      },
      commit(value: number) {
        const salt = Field.random();
        set({
          value: value.toString(),
          salt: salt.toString(),
        });
        return salt;
      },
    }),
    {
      name: "commitmentStorage",
    }
  )
);
