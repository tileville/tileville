"use server";

import { NextRequest } from "next/server";
import { fetchNFTImageUrl } from "./server-utils";
// import { withAuth } from "../authMiddleware";
import {
  MINAPUNKS_NFT_DESCRIPTION,
  MINATY_NFT_DESCRIPTION,
  NFT_COLLECTIONS,
  TILEVILLE_BUILDER_NFT_DESCRIPTION,
} from "@/constants";
import { error } from "console";
import { supabaseServiceClient as supabase } from "@/db/config/server";
import { CHAIN_NAME, MINANFT_CONTRACT_ADDRESS, ProofOfNFT } from "./constants";
import { pinFile } from "./server-utils";
import { createFileFromImageUrl } from "./common-utils";
import { NFTTableNames } from "@/lib/types";

const postHandler = async (request: NextRequest) => {
  const payload = await request.json();
  console.log("payload", payload);
  const {
    wallet_address,
    nft_id,
    collection = NFT_COLLECTIONS.TILEVILLE,
  } = payload;

  //TODO: Make this generic
  let tableName: NFTTableNames;
  switch (collection) {
    case NFT_COLLECTIONS.MINATY:
      tableName = "minaty_nfts";
      break;
    case NFT_COLLECTIONS.MINAPUNKS:
      tableName = "minapunks_nfts";
      break;
    case NFT_COLLECTIONS.TILEVILLE:
    default:
      tableName = "tileville_builder_nfts";
  }

  let description;
  switch (collection) {
    case NFT_COLLECTIONS.MINATY:
      description = MINATY_NFT_DESCRIPTION;
      break;
    case NFT_COLLECTIONS.MINAPUNKS:
      description = MINAPUNKS_NFT_DESCRIPTION;
      break;
    case NFT_COLLECTIONS.TILEVILLE:
    default:
      description = TILEVILLE_BUILDER_NFT_DESCRIPTION;
  }

  // const authSignature = request.headers.get("Auth-Signature");

  // console.log({ wallet_address, nft_id, txn_hash, authSignature });

  try {
    const { data: nftData, error: nftFetchError } = await supabase
      .from(tableName) // Using dynamic table name based on collection
      .select("*")
      .eq("nft_id", nft_id)
      .single();

    if (nftFetchError) {
      return Response.json(
        { success: false, message: "Invalid NFT id" },
        { status: 400 }
      );
    }

    const image_url = await fetchNFTImageUrl(nft_id,collection);
    if (!image_url) {
      return Response.json(
        {
          success: false,
          message: `Failed to fetch image asset for nft id ${nft_id}`,
        },
        { status: 400 }
      );
    }
    const {
      name,
      traits = [],
    }: {
      name: string;
      traits: any;
    } = nftData;
    const nft_image: any = await createFileFromImageUrl({
      image_url,
      name: `${nft_id}.png`,
    });
    console.log({ image_url, traits });
    const modified_traits: ProofOfNFT[] = traits.map(
      ({ key, value }: { key: string; value: string }) => ({
        key,
        value,
        isPublic: true,
      })
    );
    const ipfs = await pinFile({
      file: nft_image,
      keyvalues: {
        name,
        owner: wallet_address,
        contractAddress: MINANFT_CONTRACT_ADDRESS,
        chain: CHAIN_NAME,
        developer: "Tileville",
        repo: "tileville",
      },
    });

    return Response.json(
      {
        name,
        image_signed_url: image_url,
        collection,
        description,
        price: 0,
        owner_address: wallet_address,
        keys: modified_traits,
        ipfs,
        nft_id,
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {}
  console.error(error);
  return Response.json({ success: false }, { status: 500 });
};

//TODO: Lets handle the auth part later
// export const POST = withAuth(postHandler);

export const POST = postHandler;
