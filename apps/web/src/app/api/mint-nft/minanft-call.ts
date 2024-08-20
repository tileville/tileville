"use client";

import type { blockchain, MintParams } from "minanft";
import { serializeTransaction, sendTransaction } from "./utils";
import type { VerificationKey } from "o1js";
import {
  CHAIN_NAME,
  MINANFT_CONTRACT_ADDRESS,
  MINTER_PUBLIC_KEY,
} from "./constants";
import { createFileFromImageUrl } from "./server-utils";

export interface ProofOfNFT {
  key: string;
  value: string;
  isPublic?: boolean;
}

export type MintNFTParams = {
  name: string;
  signed_image_url: string;
  collection: string;
  description: string;
  price: number;
  keys: ProofOfNFT[];
  owner_address: string;
  ipfs: string;
  nft_id: number;
};

export async function mintNFT(params: MintNFTParams) {
  console.log("ready to sign");
  const {
    name,
    price,
    collection,
    description,
    keys,
    owner_address,
    ipfs,
    signed_image_url,
    nft_id,
  } = params;

  console.log("params", params);

  const image = await createFileFromImageUrl({
    image_url: signed_image_url,
    name: `${nft_id}.png`,
  });
  const contractAddress = MINANFT_CONTRACT_ADDRESS;
  if (contractAddress === undefined) {
    console.error("Contract address is undefined");
    return;
  }

  const chain: blockchain = CHAIN_NAME;
  const owner = await getAccount();
  if (!owner) {
    throw new Error(`No account`);
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
    wallet,
    fetchMinaAccount,
    api,
    serializeFields,
    MintParams,
  } = await import("minanft");
  console.log("imported minanft ");
  console.log("prepared data");
  if (contractAddress !== MINANFT_NAME_SERVICE_V2) {
    console.error(
      "Contract address is not the same as MINANFT_NAME_SERVICE_V2"
    );
    return;
  }

  console.log("contractAddress", contractAddress);

  const nftPrivateKey = PrivateKey.random();
  const address = nftPrivateKey.toPublicKey();
  const net = await initBlockchain(chain);
  const sender = PublicKey.fromBase58(owner);
  const pinataJWT = process.env.NEXT_PUBLIC_PINATA_JWT!;
  const jwt = process.env.NEXT_PUBLIC_MINANFT_JWT!;
  if (jwt === undefined) {
    console.error("JWT is undefined");
    return;
  }
  const minanft = new api(jwt);
  const reservedPromise = minanft.reserveName({
    name,
    publicKey: owner,
    chain: CHAIN_NAME,
    contract: contractAddress,
    version: "v2",
    developer: "Tileville",
    repo: "tileville",
  });

  const nft = new RollupNFT({
    name,
    address,
    external_url: net.network.explorerAccountUrl + address.toBase58(),
  });

  console.log("prepared data", nft);

  if (pinataJWT === undefined) {
    console.error("pinataJWT is undefined");
    return;
  }

  if (collection !== undefined && collection !== "")
    nft.update({ key: `collection`, value: collection });

  if (description !== undefined && description !== "")
    nft.updateText({
      key: `description`,
      text: description,
    });

  for (const item of keys) {
    const { key, value, isPublic } = item;
    nft.update({ key, value, isPrivate: isPublic === false });
  }

  console.log("calculated sha3_512");
  const sha3_512 = await calculateSHA512(image as File);
  console.timeEnd("calculated sha3_512");
  console.time("reserved name");
  const reserved = await reservedPromise;
  console.timeEnd("reserved name");

  console.log("Reserved", reserved);
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
      error: "Name is not reserved",
      reason: reserved.reason,
    };
  }

  const signature = Signature.fromBase58(reserved.signature);
  if (signature === undefined) {
    console.error("Signature is undefined");
    return;
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
  const memo = "mint";
  await fetchMinaAccount({ publicKey: sender });
  await fetchMinaAccount({ publicKey: zkAppAddress });
  console.time("prepared commit data");
  await commitPromise;
  console.timeEnd("prepared commit data");
  console.time("prepared tx");

  if (nft.storage === undefined) throw new Error("Storage is undefined");
  if (nft.metadataRoot === undefined) throw new Error("Metadata is undefined");
  const json = JSON.stringify(
    nft.toJSON({
      includePrivateData: true,
    }),
    null,
    2
  );
  console.log("json 205", json);

  // const verificationKey: VerificationKey = {
  //   hash: Field.fromJSON(VERIFICATION_KEY_V2_JSON[CHAIN_NAME].hash),
  //   data: VERIFICATION_KEY_V2_JSON[CHAIN_NAME].data,
  // };
  // const mintParams: MintParams = {
  //   name: MinaNFT.stringToField(nft.name!),
  //   address,
  //   owner,
  //   price: UInt64.from(BigInt(price * 1e9)),
  //   fee: UInt64.from(BigInt((reserved.price as any)?.price * 1_000_000_000)),
  //   feeMaster: wallet,
  //   verificationKey,
  //   signature,
  //   expiry,
  //   metadataParams: {
  //     metadata: nft.metadataRoot,
  //     storage: nft.storage,
  //   },
  // };
  // const tx = await Mina.transaction({ sender, fee, memo }, async () => {
  //   await zkApp.mint(mintParams);
  // });

  // tx.sign([nftPrivateKey]);
  // const serializedTransaction = serializeTransaction(tx);
  // const transaction = tx.toJSON();
  // console.log("Transaction", tx.toPretty());
  // const payload = {
  //   transaction,
  //   onlySign: true,
  //   feePayer: {
  //     fee: fee,
  //     memo: memo,
  //   },
  // };
  // console.timeEnd("prepared tx");
  // console.timeEnd("ready to sign");
  // const txResult = await (window as any).mina?.sendTransaction(payload);
  // console.log("Transaction result", txResult);
  // console.time("sent transaction");
  // const signedData = txResult?.signedData;
  // if (signedData === undefined) {
  //   console.log("No signed data");
  //   return undefined;
  // }

  // const sentTx = await sendTransaction({
  //   serializedTransaction,
  //   signedData,
  //   mintParams: serializeFields(MintParams.toFields(mintParams)),
  //   contractAddress,
  //   name,
  // });
  // console.timeEnd("sent transaction");
  // console.log("Sent transaction", sentTx);
}

export async function getAccount(): Promise<string | undefined> {
  const accounts = await (window as any)?.mina?.requestAccounts();
  let address: string | undefined = undefined;
  if (accounts?.code === undefined && accounts?.length > 0) {
    address = accounts[0];
    console.log("Address", address);
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