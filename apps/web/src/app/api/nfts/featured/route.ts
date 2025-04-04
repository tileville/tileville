// src/app/api/nfts/featured/route.ts

import { supabaseServiceClient as supabase } from "@/db/config/server";
import { Database } from "@/lib/database.types";

type TableNames = keyof Database["public"]["Tables"];

interface CollectionConfig {
  table_name: TableNames;
  bucket_name: string;
  description: string;
  owner_address?: string;
  is_mint_public: boolean;
  fee_master_public_key?: string;
  reserved_price_reduce_key?: string;
  nft_mint_start_date_time_utc: string;
  featured_nfts?: number[];
}

interface GlobalConfig {
  nft_collections: string[];
  nft_collections_config: {
    [key: string]: CollectionConfig;
  };
}

export async function GET() {
  try {
    const { data: globalConfig, error: configError } = await supabase
      .from("global_config")
      .select("config_values")
      .eq("name", "config_v1")
      .single();

    if (configError || !globalConfig?.config_values) {
      throw new Error("Failed to fetch global config");
    }

    const configValues = globalConfig.config_values as unknown;
    const config = configValues as GlobalConfig;

    if (!config.nft_collections_config) {
      throw new Error("Invalid config structure");
    }

    const queries = Object.entries(config.nft_collections_config)
      .filter(
        ([_, collectionConfig]) =>
          // Only process collections that have featured NFTs defined
          collectionConfig.featured_nfts &&
          collectionConfig.featured_nfts.length > 0
      )
      .map(async ([collectionName, collectionConfig]) => {
        const { table_name, featured_nfts } = collectionConfig;

        if (!table_name || !featured_nfts) {
          return null;
        }

        // Fetch all featured NFTs for this collection
        const { data, error } = await supabase
          .from(table_name)
          .select("*")
          .in("nft_id", featured_nfts);

        if (error) {
          console.error(
            `Error fetching featured NFTs from ${table_name}:`,
            error
          );
          return null;
        }

        // Return all featured NFTs for this collection
        return {
          collection: collectionName,
          nfts: data,
        };
      });

    const results = (await Promise.all(queries)).filter(
      (result) => result !== null && result.nfts.length > 0
    );

    return Response.json({
      success: true,
      featuredNFTs: results,
    });
  } catch (error: any) {
    console.error("Featured NFTs fetch error:", String(error.message));
    return Response.json(
      { success: false, error: String(error.message) },
      { status: 500 }
    );
  }
}
