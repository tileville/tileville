import { GLOBAL_CONFIG_DEFAULT } from "@/constants";
import { atom } from "jotai";

type DisallowType =
  | "TRANSACTION_FAILED"
  | "TRANSACTION_PENDING"
  | "GAME_ALREADY_PLAYED"
  | "TRANSACTION_CONFIRMED"
  | "NONE";
export const gameplayDisallowTypeAtom = atom<DisallowType>(
  "TRANSACTION_PENDING"
);

export const globalConfigAtom = atom<{ [key: string]: any }>(
  GLOBAL_CONFIG_DEFAULT
);
