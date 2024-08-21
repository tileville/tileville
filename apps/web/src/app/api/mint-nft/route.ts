"use server";

import { NextRequest } from "next/server";
import { fetchNFTImageUrl } from "./server-utils";
import { withAuth } from "../authMiddleware";
import {
  BLOCKBERRY_API_KEY,
  BLOCKBERRY_MAINNET_BASE_URL,
  NFT_DESCRIPTION,
} from "@/constants";
import { error } from "console";
import { supabaseServiceClient as supabase } from "@/db/config/server";
import { ProofOfNFT } from "./minanft-call";
import { CHAIN_NAME, MINANFT_CONTRACT_ADDRESS } from "./constants";
import { pinFile } from "./server-utils";
import { createFileFromImageUrl } from "./common-utils";
import { ERROR_CODES } from "@/constants/errorCodes";

const postHandler = async (request: NextRequest) => {
  const payload = await request.json();
  console.log("payload", payload);
  const { wallet_address, nft_id, txn_hash } = payload;
  const authSignature = request.headers.get("Auth-Signature");

  console.log({ wallet_address, nft_id, txn_hash, authSignature });

  try {
    console.log("Verification done");
    // Add log
    // add transaction status
    //TODO: Check transaction status
    const response = await fetch(
      `${BLOCKBERRY_MAINNET_BASE_URL}/v1/block-confirmation/${txn_hash}`,
      {
        headers: {
          "x-api-key": BLOCKBERRY_API_KEY,
        },
      }
    );

    try {
      const jsonResponse = await response.json();
      console.log({ jsonResponse });
      if (jsonResponse.blockConfirmationsCount < 1) {
        return Response.json({
          success: false,
          code: ERROR_CODES.TXN_PENDING,
          message:
            "Transaction pending. Please try the operation after some time!",
        });
      }
    } catch (error) {
      console.log(error);
      return Response.json({
        success: false,
        code: ERROR_CODES.TXN_FAILED,
        message:
          "Transaction failed. If you see this message and your transaction succeeded, please report a bug!",
      });
    }

    // check nft_id
    // check if nft is already minted or not
    // fetch signed url
    //
    const { data: nftData, error: nftFetchError } = await supabase
      .from("tileville_builder_nfts")
      .select("*")
      .eq("nft_id", nft_id)
      .single();
    if (nftFetchError) {
      return Response.json(
        { success: false, message: "Invalid NFT id" },
        { status: 400 }
      );
    }
    const image_url = await fetchNFTImageUrl(nft_id);
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

    console.log("=== wallet  address ===", wallet_address);

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

    console.log({ ipfs });

    return Response.json(
      {
        name,
        image_signed_url: image_url,
        collection: "Tileville",
        description: NFT_DESCRIPTION,
        price: 0,
        owner_address: wallet_address,
        keys: modified_traits,
        ipfs,
        nft_id,
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
