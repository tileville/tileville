export const CHAIN_NAME = (process.env.NEXT_PUBLIC_CHAIN || "devnet") as
  | "devnet"
  | "mainnet";

export const FEEMASTER_PUBLIC_KEY =
  process.env.NEXT_PUBLIC_FEEMASTER_PUBLIC_KEY ||
  "B62qqhL8xfHBpCUTk1Lco2Sq8HitFsDDNJraQG9qCtWwyvxcPADn4EV";
export const MINTER_PRIVATE_KEY = process.env.MINTER_PRIVATE_KEY || "";
export const TILEVILLE_NFT_BUCKET_NAME = "builder_nfts";
export const MINATY_NFT_BUCKET_NAME = "minaty_nfts";
export const MINANFT_CONTRACT_ADDRESS =
  process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "";

export const RESERVED_PRICE_REDUCE_KEY =
  process.env.NEXT_PUBLIC_RESERVED_PRICE_REDUCE_KEY ||
  "dbnggujMBvxEc8cVXDpGaiokANYvYCHW_DfBu567eqhi_V";

export interface ProofOfNFT {
  key: string;
  value: string;
  isPublic?: boolean;
}
