import { GLOBAL_CONFIG_DEFAULT } from "@/constants";
import { AlgoliaHitResponse } from "@/hooks/useFetchNFTSAlgolia";
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

export const mintProgressAtom = atom<{ step: number; message: string }>({
  step: 0,
  message: "Mint Started",
});

export const algoliaHitsResponseAtom = atom<AlgoliaHitResponse[]>([]);
