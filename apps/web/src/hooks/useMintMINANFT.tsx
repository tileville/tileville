"use client";
import type { blockchain, MintParams } from "minanft";
import {
  serializeTransaction,
  sendTransaction,
} from "@/app/api/mint-nft/client-utils";
import type { VerificationKey } from "o1js";
import {
  CHAIN_NAME,
  FEEMASTER_PUBLIC_KEY_DEFAULT,
  MINANFT_CONTRACT_ADDRESS,
  RESERVED_PRICE_REDUCE_KEY_DEFAULT,
  ProofOfNFT,
} from "@/app/api/mint-nft/constants";
import { createFileFromImageUrl } from "@/app/api/mint-nft/common-utils";
import { useAtomValue, useSetAtom } from "jotai";
import { globalConfigAtom, mintProgressAtom } from "@/contexts/atoms";
import { requestAccounts } from "@/lib/helpers";
import { SENDER_PUBLIC_KEY, SENDER_PRIVATE_KEY, isMockEnv } from "@/constants";
import { Client, NetworkId } from "mina-signer";
import { NETWORKS } from "@/constants/network";

export type MintNFTParams = {
  name: string;
  signed_image_url: string;
  collection: string;
  collectionDescription: string;
  price: number;
  keys: ProofOfNFT[];
  owner_address: string;
  ipfs: string;
  nft_id: number;
};

const client = new Client({
  network: NETWORKS[0].chainId as NetworkId,
});

export function useMintMINANFT() {
  const setMintProgress = useSetAtom(mintProgressAtom);
  const globalConfig = useAtomValue(globalConfigAtom);
  const mintMINANFTHelper = async (params: MintNFTParams) => {
    console.log("######## MINT NFT Flow Starts ######");
    console.log("params", params);
    const {
      name,
      price,
      collection,
      collectionDescription,
      keys,
      ipfs,
      signed_image_url,
      nft_id,
    } = params;
    const collectionConfig =
      globalConfig?.nft_collections_config?.[collection] || {};
    const feeMasterPublicKey =
      collectionConfig.fee_master_public_key || FEEMASTER_PUBLIC_KEY_DEFAULT;
    const reserved_price_reduce_key =
      collectionConfig.reserved_price_reduce_key ||
      RESERVED_PRICE_REDUCE_KEY_DEFAULT;
    const image_format = collectionConfig.img_format || "png";
    const collectionTableName = collectionConfig.table_name;
    const isZeko = collectionConfig.is_zeko;

    console.log("isZeko", isZeko);

    console.log("feeMasterPublicKey", feeMasterPublicKey);
    const contractAddress = MINANFT_CONTRACT_ADDRESS;
    const chain: blockchain = CHAIN_NAME;

    const image = await createFileFromImageUrl({
      image_url: signed_image_url,
      name: `${nft_id}.${image_format}`,
    });

    // this is auro wallet address
    const owner = await getAccount();
    if (!owner) {
      return { success: false, message: "No account found" };
    }

    const { Field, PrivateKey, PublicKey, UInt64, Mina, Signature, UInt32 } =
      await import("o1js");
    console.log("imported o1js");
    const {
      MinaNFT,
      NameContractV2,
      RollupNFT,
      FileData,
      initBlockchain,
      MINANFT_NAME_SERVICE_V2,
      VERIFICATION_KEY_V2_JSON,
      fetchMinaAccount,
      api,
      serializeFields,
      MintParams,
    } = await import("minanft");
    console.log("imported minanft ");
    if (contractAddress !== MINANFT_NAME_SERVICE_V2) {
      console.error(
        "Contract address is not the same as MINANFT_NAME_SERVICE_V2"
      );
      return {
        success: false,
        message: "Contract address is not the same as MINANFT_NAME_SERVICE_V2",
      };
    }

    setMintProgress({
      [nft_id]: {
        step: 3,
        message: "Checking if the name is reserved or not",
      },
    });

    const nftPrivateKey = PrivateKey.random();
    const address = nftPrivateKey.toPublicKey();
    const net = await initBlockchain(chain);
    const ownerPk = PublicKey.fromBase58(owner);
    const senderPK = isZeko ? SENDER_PUBLIC_KEY : owner;
    const sender = PublicKey.fromBase58(senderPK);
    console.log("sender public key", sender.toBase58());
    const pinataJWT = process.env.NEXT_PUBLIC_PINATA_JWT!;
    const jwt = process.env.NEXT_PUBLIC_MINANFT_JWT!;
    const minanft = new api(jwt);

    // const nonceResponse = await fetch(`/api/nonce?wallet_address=${owner}`);

    const nonceResponse = await fetch(`/api/nonce?wallet_address=${senderPK}`);

    const nonce = await nonceResponse.json();
    console.log("NONCE", nonce);
    if (!nonce.success) {
      throw new Error("failed to fetch nonce");
      return;
    }

    const reservedPromise = minanft.reserveName({
      name,
      publicKey: owner,
      chain: CHAIN_NAME,
      contract: contractAddress,
      version: "v2",
      developer: "Tileville",
      repo: "tileville",
      key: reserved_price_reduce_key,
    } as any);

    const nft = new RollupNFT({
      name,
      address,
      external_url: net.network.explorerAccountUrl + address.toBase58(),
    });

    console.log("prepared data", nft);

    if (collection !== undefined && collection !== "")
      nft.update({ key: `collection`, value: collection });

    if (collectionDescription !== undefined && collectionDescription !== "")
      nft.updateText({
        key: `description`,
        text: collectionDescription,
      });

    for (const item of keys) {
      const { key, value, isPublic } = item;
      nft.update({ key, value, isPrivate: isPublic === false });
    }

    nft.update({ key: "rarity", value: "70%" });

    const sha3_512 = await calculateSHA512(image as File);
    const reserved = await reservedPromise;

    console.log("Reserved name", reserved);
    if (
      reserved === undefined ||
      reserved.isReserved !== true ||
      reserved.signature === undefined ||
      reserved.signature === "" ||
      reserved.price === undefined ||
      reserved.expiry === undefined ||
      (reserved.price as any)?.price === undefined
    ) {
      console.error("Name is not reserved");
      return {
        success: false,
        message: "Name is not reserved",
        reason: reserved.reason,
      };
    }

    setMintProgress({
      [nft_id]: {
        step: 4,
        message: "Sending transaction",
      },
    });

    const signature = Signature.fromBase58(reserved.signature);
    if (signature === undefined) {
      console.error("Signature is undefined");
      return {
        success: false,
        message: "reserved response signature is undefined",
      };
    }

    const expiry = UInt32.from(BigInt(reserved.expiry));

    const imageData = new FileData({
      fileRoot: Field(0),
      height: 0,
      filename: image!.name.substring(0, 30),
      size: image!.size,
      mimeType: image!.type.substring(0, 30),
      sha3_512,
      storage: `i:${ipfs}`,
    });

    nft.updateFileData({ key: `image`, type: "image", data: imageData });

    const commitPromise = nft.prepareCommitData({ pinataJWT });

    const zkAppAddress = PublicKey.fromBase58(MINANFT_NAME_SERVICE_V2);
    const zkApp = new NameContractV2(zkAppAddress);
    const fee = Number((await MinaNFT.fee()).toBigInt());
    const memo = ("mint@" + name).substring(0, 30);
    await fetchMinaAccount({ publicKey: sender });

    await fetchMinaAccount({ publicKey: zkAppAddress });
    console.time("prepared commit data");
    await commitPromise;
    console.timeEnd("prepared commit data");
    console.time("prepared tx");
    const feeMaster = PublicKey.fromBase58(feeMasterPublicKey);

    if (nft.storage === undefined) {
      return {
        success: false,
        message: "nft storeage is undefined",
      };
    }
    if (nft.metadataRoot === undefined) {
      return {
        success: false,
        message: "nft metadata root is undefined",
      };
    }

    const json = JSON.stringify(
      nft.toJSON({
        includePrivateData: true,
      }),
      null,
      2
    );
    console.log("nft json", json);

    const verificationKey: VerificationKey = {
      hash: Field.fromJSON(VERIFICATION_KEY_V2_JSON[CHAIN_NAME].hash),
      data: VERIFICATION_KEY_V2_JSON[CHAIN_NAME].data,
    };

    const mintParams: MintParams = {
      name: MinaNFT.stringToField(nft.name!),
      address,
      owner: ownerPk,
      price: UInt64.from(BigInt(price * 1e9)),
      fee: UInt64.from(BigInt((reserved.price as any)?.price * 1_000_000_000)),
      feeMaster: feeMaster,
      verificationKey,
      signature,
      expiry,
      metadataParams: {
        metadata: nft.metadataRoot,
        storage: nft.storage,
      },
    };
    console.log("============= mint params ===============", mintParams);
    let tx: any;
    try {
      tx = await Mina.transaction({ sender, fee, memo }, async () => {
        await zkApp.mint(mintParams);
      });
      console.log("JSON transaction", tx.to);
      // Mina.setActiveInstance(
      //   Mina.Network("https://api.minascan.io/node/devnet/v1/graphql")
      // );
      console.log("MINT Transaction done");
    } catch (error: any) {
      if (error) {
        console.log("transaction error 273", error);
        return {
          success: false,
          message: "Transaction failed! Please try again",
        };
      }

      return {
        success: false,
        message: "An unexpected error occurred",
      };
    }
    tx.sign([nftPrivateKey]);

    const serializedTransaction = serializeTransaction(tx);

    const transaction = tx.toJSON();

    const payload = isZeko
      ? {
          zkappCommand: JSON.parse(transaction),
          feePayer: {
            feePayer: SENDER_PUBLIC_KEY,
            fee: fee,
            memo: memo,
            nonce: String(nonce.nonce),
          },
        }
      : {
          transaction,
          onlySign: true,
          feePayer: {
            fee: fee,
            memo: memo,
          },
        };

    console.timeEnd("prepared tx");
    console.timeEnd("ready to sign");
    let txResult;
    function isErrorWithCode(error: unknown): error is { code: number } {
      return typeof error === "object" && error !== null && "code" in error;
    }

    try {
      txResult =
        !isZeko && (await (window as any).mina?.sendTransaction(payload));
      // txResult = { signedData: "abc123" };
    } catch (error: unknown) {
      if (isErrorWithCode(error) && error.code === 1002) {
        console.log("transaction error 273", error);
        return {
          success: false,
          message: "You cancelled the transaction! Please try again",
        };
      }
      // Handle other types of errors
      console.error("An unexpected error occurred:", error);
      return {
        success: false,
        message: "An unexpected error occurred",
      };
    }
    // console.log("Transaction result", txResult);
    console.time("sent transaction");
    setMintProgress({
      [nft_id]: {
        step: 5,
        message: "Waiting for Transaction Confirmation...",
      },
    });

    const signedData = isZeko
      ? client.signTransaction(payload as any, SENDER_PRIVATE_KEY)
      : txResult?.signedData;

    console.log("Signed data", signedData);

    if (signedData === undefined) {
      console.log("No signed data");
      return undefined;
    }

    // signedData = JSON.stringify(signedData);
    // if (signedData === undefined) {
    //   console.log("No signed data");
    //   return undefined;
    // }

    const signedDatastr = isZeko ? JSON.stringify(signedData.data) : signedData;

    const sentTx = await sendTransaction({
      serializedTransaction,
      signedData: signedDatastr,
      mintParams: serializeFields(MintParams.toFields(mintParams)),
      contractAddress,
      name,
      nonce,
      wallet_address: senderPK,
    });

    if (
      !sentTx.isSent ||
      sentTx.error ||
      sentTx.hash.toLowerCase().includes("error")
    ) {
      setMintProgress({
        [nft_id]: {
          step: 5,
          message: `Transaction failed: ${
            sentTx.error || "Unknown error occurred"
          }`,
        },
      });
      return {
        success: false,
        message: sentTx.error || "Failed to send transaction",
      };
    }

    if (sentTx.isSent || sentTx.hash) {
      try {
        if (collection.toLowerCase() === "zeko") {
          const response = await fetch("/api/nfts/update-nft-status", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Wallet-Address": owner,
            },
            body: JSON.stringify({
              nft_id,
              collection,
              txn_hash: sentTx.hash,
              collectionTableName,
            }),
          });

          const result = await response.json();
          if (!result.success) {
            console.warn("Failed to update NFT minted status:", result.message);
          }
        }
      } catch (error) {
        console.error("Error updating NFT status:", error);
      }
    }

    // Only set success state if we actually succeeded
    setMintProgress({
      [nft_id]: {
        step: 6,
        message: "Transaction confirmed and NFT Minted successfully.",
      },
    });

    return {
      success: true,
      txHash: sentTx.hash,
    };

    // if (sentTx.hash.toLocaleLowerCase().includes("error")) {
    //   return { success: false, message: sentTx.hash };
    // }
    // return { success: true, txHash: sentTx.hash };
  };

  return { mintMINANFTHelper };
}

export async function getAccount(): Promise<string | undefined> {
  const accounts = await requestAccounts();
  let address: string | undefined = undefined;
  if (accounts?.code === undefined && accounts?.length > 0) {
    address = accounts[0];
    // console.log("Address", address);
  }
  return address;
}

export async function calculateSHA512(file: File): Promise<string> {
  const readFileAsArrayBuffer = (file: File) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  };

  const arrayBufferToBase64 = (buffer: ArrayBuffer) => {
    const binary = String.fromCharCode(...new Uint8Array(buffer));
    return window.btoa(binary);
  };

  try {
    const arrayBuffer = await readFileAsArrayBuffer(file);

    const hashBuffer = await crypto.subtle.digest(
      "SHA-512",
      arrayBuffer as BufferSource
    );

    const hashBase64 = arrayBufferToBase64(hashBuffer);

    return hashBase64;
  } catch (error) {
    console.error("Error calculating SHA-512 hash:", error);
    throw error;
  }
}
