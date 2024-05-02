import { createContext } from "react";
import { ChainType } from "@/types";

type ChainContextType = {
  chain: ChainType;
  setChain: React.Dispatch<React.SetStateAction<ChainType>>;
};
type SignerContextType = {
  signer: string;
  setSigner: React.Dispatch<React.SetStateAction<string>>;
};

export const SignerContext = createContext<SignerContextType>(
  {} as SignerContextType,
);
export const ChainContext = createContext<ChainContextType>(
  {} as ChainContextType,
);
