import { supabaseServiceClient as supabase } from "@/db/config/server";
import { Table } from "@/types";

export const addNFTTransactionHash = async ({
  txn_hash,
  nft_id,
}: {
  txn_hash: string;
  nft_id: number;
}): Promise<Table<"tileville_builder_nfts">> => {
  const { data, error } = await supabase
    .from("tileville_builder_nfts")
    .update({ txn_hash })
    .eq("nft_id", nft_id)
    .single();

  if (error) {
    throw error;
  }
  return data;
};
