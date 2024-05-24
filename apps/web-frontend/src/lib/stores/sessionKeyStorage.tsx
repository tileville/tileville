import { PrivateKey } from "o1js";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface SessionKeyStorageState {
  sessionKeyBase58: any;
  getSessionKey: () => PrivateKey;
  newSessionKey: () => PrivateKey;
}

export const useSessionKeyStore = create<
  SessionKeyStorageState,
  [["zustand/persist", never]]
>(
  persist(
    (set) => ({
      sessionKeyBase58: PrivateKey.random().toBase58(),
      getSessionKey() {
        return PrivateKey.fromBase58(this.sessionKeyBase58);
      },
      newSessionKey() {
        const newPK = PrivateKey.random();
        set({
          sessionKeyBase58: newPK.toBase58(),
        });
        return newPK;
      },
    }),
    {
      name: "sessionStorage",
    }
  )
);
