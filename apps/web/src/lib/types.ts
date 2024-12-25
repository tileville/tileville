import { Currency } from "@/constants";
import { ZkNoidGameGenre } from "@/lib/platform/game_tags";
import { PublicKey } from "o1js";

export interface ICompetition {
  id: number;
  creator?: PublicKey;
  seed: number;
  game: { id: string; genre: ZkNoidGameGenre; rules: string };
  title: string;
  preReg: boolean;
  preRegDate: {
    start: Date;
    end: Date;
  };
  competitionDate: {
    start: Date;
    end: Date;
  };
  participationFee: bigint;
  currency: Currency;
  reward: bigint;
  registered?: boolean;
}

export type TransactionLog = {
  txn_hash: string;
  wallet_address: string;
  competition_key: string;
  network: string;
  txn_status: string;
  is_game_played: boolean;
};

export interface PVPTransactionLog {
  txn_hash: string;
  wallet_address: string;
  network: string;
  challenge_id: number;
  txn_status: TransactionStatus;
  amount: number;
  is_game_played: boolean;
}

export type TransactionStatus = "PENDING" | "CONFIRMED" | "FAILED" | "NOT_INIT";

export type NFTTableNames =
  | "tileville_builder_nfts"
  | "minaty_nfts"
  | "minapunks_nfts"
  | "zkgod_nfts";
