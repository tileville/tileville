import { atom } from "jotai";

type DisallowType =
  | "TRANSACTION_FAILED"
  | "TRANSACTION_PENDING"
  | "GAME_ALREADY_PLAYED"
  | "NONE";
export const gameplayDisallowTypeAtom = atom<DisallowType>(
  "TRANSACTION_PENDING"
);
