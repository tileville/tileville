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
