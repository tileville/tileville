"use server";

import { NextRequest } from "next/server";
import { fetchNFTImageUrl } from "./server-utils";
import { NFT_COLLECTIONS } from "@/constants";
import { error } from "console";
import { supabaseServiceClient as supabase } from "@/db/config/server";
import { CHAIN_NAME, MINANFT_CONTRACT_ADDRESS, ProofOfNFT } from "./constants";
import { pinFile } from "./server-utils";
import { createFileFromImageUrl } from "./common-utils";
import { extractIPFSHash } from "@/lib/helpers";

const postHandler = async (request: NextRequest) => {
  const payload = await request.json();
  console.log("mint nft payload", payload);
  const {
    wallet_address,
    nft_id,
    collection = NFT_COLLECTIONS.TILEVILLE,
    collectionTableName,
    collectionBucketName,
    collectionDescription,
    imageFormat,
    isZeko,
  } = payload;

  // const authSignature = request.headers.get("Auth-Signature");

  // console.log({ wallet_address, nft_id, txn_hash, authSignature });

  try {
    const { data: nftData, error: nftFetchError } = await supabase
      .from(collectionTableName)
      .select("*")
      .eq("nft_id", nft_id)
      .single();

    if (nftFetchError) {
      return Response.json(
        { success: false, message: "Invalid NFT id" },
        { status: 400 }
      );
    }

    let image_url;
    console.log("is zeko in api", isZeko);

    if (isZeko) {
      image_url = nftData.img_url;
    } else {
      image_url = await fetchNFTImageUrl(
        nft_id,
        collectionBucketName,
        imageFormat
      );
    }

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

    let nft_image: any;
    let ipfs;

    if (isZeko) {
    } else {
      nft_image = await createFileFromImageUrl({
        image_url,
        name: `${nft_id}.${imageFormat}`,
      });
    }

    console.log({ image_url, traits });

    const modified_traits: ProofOfNFT[] = traits.map(
      ({ key, value }: { key: string; value: string }) => ({
        key,
        value,
        isPublic: true,
      })
    );

    if (isZeko) {
      ipfs = extractIPFSHash(image_url);
    } else {
      ipfs = await pinFile({
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
    }

    return Response.json(
      {
        name,
        image_signed_url: image_url,
        collection,
        collectionDescription,
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
