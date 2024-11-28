import React, { useEffect, useState } from "react";
import { Dialog, Flex } from "@radix-ui/themes";
import { ReactNode } from "react";
import Image from "next/image";
import { Cross1Icon } from "@radix-ui/react-icons";
import toast from "react-hot-toast";
import { Json } from "@/lib/database.types"; // Import the Json type from your database types
import { useNetworkStore, useMintNFT } from "@/lib/stores/network";
import {
  COLLECTION_URL,
  INITIAL_MINT_RESPONSE,
  isMockEnv,
  NFTCollectionType,
  NFTCategory,
} from "@/constants";
import Link from "next/link";
import { isFuture } from "date-fns";
import { useAtomValue, useSetAtom } from "jotai";
import { globalConfigAtom, mintProgressAtom } from "@/contexts/atoms";
import { StepProgressBar } from "./ProgressBar";
import { AlgoliaHitResponse } from "@/hooks/useFetchNFTSAlgolia";
import { getMINANFTLink } from "@/lib/helpers";
import { useMinaBalancesStore } from "@/lib/stores/minaBalances";
import { useSwitchNetwork } from "@/hooks/useSwitchNetwork";
import { MAINNET_NETWORK } from "@/constants/network";
import { useLocalStorage } from "react-use";
import { MintBtn } from "./Marketplace/MintBtn";
import { TraitsSection } from "./Marketplace/TraitsSection";
import { AlreadyMintedContent } from "./Marketplace/AlreadyMintedContent";
import { NFTModalTriggerContent } from "./Marketplace/NFTModalTriggerContent";

export const NFTModal = ({
  traits,
  img_url,
  price,
  name,
  nftPrice,
  renderStyle,
  nftID,
  algoliaHitData,
  collection,
  NFTCategory,
}: {
  traits: Json;
  img_url: string;
  price: ReactNode;
  name: string;
  nftID: number;
  nftPrice: number;
  renderStyle: string;
  ownerAddress: string | null;
  algoliaHitData: AlgoliaHitResponse | undefined;
  collection: NFTCollectionType;
  NFTCategory: NFTCategory | null;
}) => {
  // Function to parse traits
  const [mintLoading, setMintLoading] = useState(false);
  const globalConfig = useAtomValue(globalConfigAtom);
  const [nftMintResponse, setNftMintResponse] = useState(INITIAL_MINT_RESPONSE);
  const [mintTxnHash, setMintTxnHash] = useState("");
  const mintProgress = useAtomValue(mintProgressAtom);
  const minaBalancesStore = useMinaBalancesStore();

  const networkStore = useNetworkStore();
  const { mintNft } = useMintNFT();
  const setMintProgress = useSetAtom(mintProgressAtom);
  const [error, setError] = useState<string | null>(null);
  const { switchNetwork } = useSwitchNetwork();
  const [mintKey] = useLocalStorage("MINTING_ENABLE", "");

  useEffect(() => {
    if (nftMintResponse.state === "active") {
      if (nftMintResponse.success) {
        toast.success(
          <>
            <NFTSuccessMintContent nftTxnHash={nftMintResponse.txHash} />
          </>,
          {
            id: "mint-success-toast",
          }
        );
      } else {
        toast.error(
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium text-red-700">
              NFT mint failed 😭
            </p>
            <p className="mt-1 text-sm text-gray-500">
              {nftMintResponse.message}
            </p>
            {nftMintResponse.reason && (
              <p className="text-xs text-gray-500">{nftMintResponse.reason}</p>
            )}
          </div>,
          {
            id: "mint-error-toast",
          }
        );
      }
    }
  }, [nftMintResponse]);

  let isMintingDisabled: boolean;
  if (window.mina?.isPallad) {
    isMintingDisabled = true;
  } else if (isMockEnv()) {
    isMintingDisabled = false;
  } else if (mintKey) {
    isMintingDisabled = false;
  } else if (isFuture(globalConfig.nft_mint_start_date)) {
    isMintingDisabled = true;
  } else {
    isMintingDisabled = false;
  }

  const handleMint = async (nft_id: number) => {
    if (networkStore.minaNetwork?.chainId !== MAINNET_NETWORK.chainId) {
      await switchNetwork(MAINNET_NETWORK);
      return;
    }
    if (!networkStore.address) {
      try {
        networkStore.connectWallet(false);
      } catch (error) {
        console.error(`Failed to connect with wallet`, error);
      } finally {
        return;
      }
    }

    setMintLoading(true);
    setError(null);
    setMintProgress({
      [nftID]: {
        step: 1,
        message: "Uploading image to IPFS",
      },
    });

    try {
      const response = await mintNft({
        nft_id,
      });

      console.log("186 response", response);

      if (response.success && response.txn_hash) {
        setMintTxnHash(response.txn_hash);
      }
      setNftMintResponse({ state: "active", ...response });
      if (response.success) {
      }
      setMintLoading(false);

      if (!response.success) {
        setError(response.message);

        setMintProgress((prev) => ({
          ...prev,
          [nft_id]: {
            ...prev[nft_id],
            message: response.message,
          },
        }));
      }
    } catch (err) {
      console.error("Minting error:", err);

      let errorMessage: string;

      if (err instanceof Error) {
        errorMessage = err.message;
      } else if (typeof err === "string") {
        errorMessage = err;
      } else {
        errorMessage = "An unknown error occurred during minting";
      }

      setError(errorMessage);
      setMintProgress((prev) => ({
        ...prev,
        message: errorMessage,
      }));
    } finally {
      setMintLoading(false);
    }
  };

  const isSufficientBalance = (price: number) => {
    if (!networkStore.address) {
      return true;
    } else if (
      minaBalancesStore.balances[networkStore.address] &&
      Number(minaBalancesStore.balances[networkStore.address] ?? 0n) / 10 ** 9 >
        price + 0.1
    ) {
      return true;
    } else {
      return false;
    }
  };

  const getMINTText = (price: number) => {
    if (window.mina?.isPallad) {
      return "MINT NFT";
    } else if (!networkStore.address) {
      return "Connect Wallet";
    } else if (!!algoliaHitData) {
      return "ALREADY MINTED";
    } else if (!isSufficientBalance(price)) {
      return "Insufficient Balance";
    } else {
      return "MINT NFT";
    }
  };

  const date = algoliaHitData
    ? new Date(algoliaHitData?.time).toUTCString()
    : "-";

  const isAvailableToPurchase =
    !!algoliaHitData?.price && +algoliaHitData?.price > 0;

  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger>
          <div className="">
            <NFTModalTriggerContent
              imgUrl={img_url}
              nftName={name}
              isListStyle={renderStyle.includes("list-style")}
              isAlreadyMinted={!!algoliaHitData}
              ownerAddress={algoliaHitData?.owner || ""}
              mintDate={date}
              nftPrice={nftPrice}
              isAvailableToPurchase={isAvailableToPurchase}
              nftHash={algoliaHitData?.hash || ""}
              isCurrentlyMiting={mintProgress[nftID]?.step > 0 && !error}
            />
          </div>
        </Dialog.Trigger>

        <Dialog.Content className="relative !m-0 !max-w-[1020px] !rounded-md !p-0">
          <div className="grid md:grid-cols-2">
            <div className="h-full w-full">
              <Image
                src={img_url}
                width={853}
                height={845}
                alt="img"
                className="h-full object-cover"
                priority={false}
                placeholder="blur"
                blurDataURL="/img/load/load.png"
              />
            </div>
            <div className="bg-primary/30 px-4 py-8">
              <Dialog.Title className="!mb-0 text-2xl font-semibold leading-4">
                {name}
              </Dialog.Title>
              <div className="my-3">
                Price:{" "}
                <span>
                  <span className="text-lg font-semibold">{price}</span> MINA
                </span>
              </div>
              <Flex direction="column" gap="3" mt="4" justify="center">
                <MintBtn
                  isMintingDisabled={isMintingDisabled}
                  isMintingStyledDisabled={
                    collection === "MINATY" ||
                    isMintingDisabled ||
                    mintLoading ||
                    !!algoliaHitData ||
                    !isSufficientBalance(Number(price))
                  }
                  mintLoading={mintLoading}
                  btnText={getMINTText(Number(price))}
                  handleMint={handleMint}
                  nftID={nftID}
                />

                {isAvailableToPurchase && (
                  <div className="text-right">
                    <Link
                      target="_blank"
                      href={getMINANFTLink(algoliaHitData.hash)}
                      className="relative h-10 rounded-md border-primary  bg-primary px-5 py-2 text-sm font-medium text-white hover:bg-primary/80 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-primary/80 disabled:hover:bg-primary/80"
                    >
                      Buy on minanft
                    </Link>
                  </div>
                )}

                {!!algoliaHitData && (
                  <AlreadyMintedContent
                    ownerAddress={algoliaHitData.owner}
                    minaScanURL={algoliaHitData.external_url}
                    nftHash={algoliaHitData.hash}
                  />
                )}

                {mintProgress[nftID]?.step > 0 && (
                  <div className="mt-4">
                    <StepProgressBar
                      currentStep={mintProgress[nftID]?.step || 1}
                      message={mintProgress[nftID]?.message || ""}
                      error={error}
                    />
                  </div>
                )}

                {nftMintResponse.state === "active" &&
                  nftMintResponse.success && (
                    <NFTSuccessMintContent
                      nftTxnHash={nftMintResponse.txHash}
                    />
                  )}
              </Flex>
              <TraitsSection
                traits={traits}
                collection={collection}
                category={NFTCategory}
              />
            </div>
          </div>
          <Dialog.Close>
            <button className="absolute right-4 top-4">
              <Cross1Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
};

const NFTSuccessMintContent = ({ nftTxnHash }: { nftTxnHash: string }) => {
  return (
    <p className="text-sm">
      NFT minted successfully🎉. You can check your new nft on{" "}
      <Link
        target="_blank"
        href={getMINANFTLink(nftTxnHash)}
        className="font-semibold text-primary underline hover:no-underline"
      >
        minanft
      </Link>{" "}
      and{" "}
      <Link
        href={COLLECTION_URL}
        className="font-semibold text-primary underline hover:no-underline"
      >
        profile section
      </Link>
    </p>
  );
};
