import React, { useState } from "react";
import { Dialog, Flex } from "@radix-ui/themes";
import { ReactNode } from "react";
import Image from "next/image";
import * as Tooltip from "@radix-ui/react-tooltip";
import { Cross1Icon, InfoCircledIcon } from "@radix-ui/react-icons";
import toast from "react-hot-toast";
import { Json } from "@/lib/database.types"; // Import the Json type from your database types
import { useNetworkStore, usePayNFTMintFee } from "@/lib/stores/network";
import { ATTRIBUTES_DATA, isMockEnv } from "@/constants";
import { useGlobalConfig } from "@/db/react-query-hooks";
import { UseQueryResult } from "@tanstack/react-query";
import Link from "next/link";
import { CountdownTimer } from "./common/CountdownTimer";
import { getTime, isFuture } from "date-fns";
import { useAtomValue, useSetAtom } from "jotai";
import { globalConfigAtom, mintProgressAtom } from "@/contexts/atoms";
import { MintRegisterModal } from "./Marketplace/mintRegisterModal";
import { Spinner } from "./common/Spinner";
import { StepProgressBar } from "./ProgressBar";
// import { useMintNFT } from "@/hooks/useMintNFT";
import { AlgoliaHitResponse } from "@/hooks/useFetchNFTSAlgolia";
import {
  formatAddress,
  getMINANFTLink,
  getMINAScanAccountLink,
} from "@/lib/helpers";
// import ProgressBar from "@/components/ProgressBar";
type Trait = {
  key: string;
  value: string | number;
};

interface TraitsRarityCounts {
  [traitName: string]: {
    [traitValue: string]: number;
  };
}

interface ConfigValues {
  total_nft_count: string;
  nft_mint_start_date: string;
  traits_rarity_counts: TraitsRarityCounts;
}

interface GlobalConfig {
  config_values: Json;
  created_at: string;
  id: number;
  name: string | null;
}

const INITIAL_MINT_RESPONSE = {
  state: "idle",
  success: false,
  message: "",
  reason: "",
  txHash: "",
};

export const NFTModal = ({
  traits,
  img_url,
  price,
  name,
  nftPrice,
  renderStyle,
  nftID,
  algoliaHitData,
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
}) => {
  // Function to parse traits
  const [mintLoading, setMintLoading] = useState(false);
  const configData: UseQueryResult<void | GlobalConfig, unknown> =
    useGlobalConfig("config_v1");
  const configValues = configData.data?.config_values as
    | ConfigValues
    | undefined;
  const rarityData = configValues?.traits_rarity_counts;
  const totalNFTCount = parseInt(configValues?.total_nft_count || "0", 10);
  const globalConfig = useAtomValue(globalConfigAtom);
  const [nftMintResponse, setNftMintResponse] = useState(INITIAL_MINT_RESPONSE);
  const [mintTxnHash, setMintTxnHash] = useState("");
  const mintProgress = useAtomValue(mintProgressAtom);

  const networkStore = useNetworkStore();
  const { mintNft } = usePayNFTMintFee();
  const setMintProgress = useSetAtom(mintProgressAtom);
  const [error, setError] = useState<string | null>(null);

  const parseTraits = (traits: Json): Trait[] => {
    if (Array.isArray(traits)) {
      return traits.filter(
        (trait): trait is Trait =>
          typeof trait === "object" &&
          trait !== null &&
          "key" in trait &&
          "value" in trait
      );
    } else if (typeof traits === "object" && traits !== null) {
      return Object.entries(traits).map(([key, value]) => ({
        key,
        value: String(value),
      }));
    }
    return [];
  };

  const parsedTraits = parseTraits(traits);

  const handleMint = async (nft_id: number) => {
    setMintLoading(true);
    setError(null);

    setMintProgress({
      step: 1,
      message: "Uploading image",
    });

    try {
      const response = await mintNft({
        nft_id,
      });

      if (response.success && response.txn_hash) {
        setMintTxnHash(response.txn_hash);
      }

      // setMintProgress({ step: 6, message: "NFT Minted Successfully" });
      setNftMintResponse({ state: "active", ...response });

      console.log("response 135", response);
      console.log("nft mint response state 136", nftMintResponse);
      if (response.success) {
      }
      setMintLoading(false);

      if (!response.success) {
        setError(response.message);

        setMintProgress((prev) => ({
          ...prev,
          message: response.message,
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

  const getRarityPercentage = (count: number, total: number) => {
    const result = Math.ceil((count / total) * 100);
    return result;
  };

  const getRarityBackgroundColor = (percentage: number) => {
    if (percentage < 5) {
      return "bg-[red]/10";
    } else if (percentage < 20) {
      return "bg-[yellow]/10";
    } else {
      return "bg-primary/30";
    }
  };

  const getRarityColor = (percentage: number) => {
    if (percentage < 5) {
      return "text-red-900";
    } else if (percentage < 20) {
      return "text-[#a5a51b]";
    } else {
      return "text-primary";
    }
  };

  const isMintingDisabled = isMockEnv
    ? false
    : isFuture(globalConfig.nft_mint_start_date);

  console.log("mint progress", mintProgress, algoliaHitData);
  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger>
          <div className="border-primary-30 group/item listItem fade-slide-in relative cursor-pointer overflow-hidden rounded-md transition-colors">
            <div className="nft-img w-full overflow-hidden">
              <Image
                className="h-full w-full object-cover transition-all group-hover/item:scale-110"
                width="852"
                height="845"
                alt="NFT"
                src={img_url}
                quality={100}
                priority={false}
              />
            </div>

            <div className="nft-content px-2 py-3">
              <div className="nft-content-info flex items-center justify-between">
                <p className="text-sm font-semibold">{name}</p>
              </div>

              {renderStyle.includes("list-style") && (
                <>
                  <div>-</div>
                  <div>-</div>
                  <div>-</div>
                </>
              )}

              <div className="mt-1 flex items-center justify-between">
                <div className="font-semibold">
                  {nftPrice}
                  <span className="text-primary-50"> MINA</span>
                </div>
              </div>
              {algoliaHitData && (
                <div className="mt-1 rounded-md bg-primary/30 p-1 text-center text-sm">
                  Already Minted
                </div>
              )}
            </div>
          </div>
        </Dialog.Trigger>

        <Dialog.Content className="relative !m-0 !max-w-[1020px] !rounded-md !p-0">
          <div className="grid grid-cols-2">
            <div className="h-full w-full">
              <Image
                src={img_url}
                width={853}
                height={845}
                alt="img"
                className="h-full object-cover"
                priority={false}
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
                </span>{" "}
              </div>
              <Flex direction="column" gap="3" mt="4" justify="center">
                {isMintingDisabled && (
                  <CountdownTimer
                    initialTime={getTime(globalConfig.nft_mint_start_date)}
                  />
                )}

                <button
                  className="relative h-10 rounded-md border-primary bg-primary px-5 py-2 text-sm font-medium text-white hover:bg-primary/80 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-primary/80 disabled:hover:bg-primary/80"
                  onClick={() => handleMint(nftID)}
                  disabled={
                    isMintingDisabled || mintLoading || !!algoliaHitData
                  }
                >
                  {mintLoading && (
                    <span className="absolute right-1/2 top-[5px] w-5 -translate-x-16">
                      <Spinner />
                    </span>
                  )}
                  {!!networkStore.address
                    ? isMintingDisabled
                      ? `MINTING STARTS SOON`
                      : !!algoliaHitData
                      ? "ALREADY MINTED"
                      : "MINT NFT"
                    : "Connect Wallet"}
                </button>

                {!!algoliaHitData && (
                  <div className="flex justify-between gap-1 text-sm">
                    <Link
                      target="_blank"
                      href={getMINAScanAccountLink(algoliaHitData.owner)}
                      className="font-semibold text-primary underline hover:no-underline"
                    >
                      Owned by {formatAddress(algoliaHitData.owner)}
                    </Link>
                    <Link
                      target="_blank"
                      href={algoliaHitData.external_url}
                      className="font-semibold text-primary underline hover:no-underline"
                    >
                      See on MinaScan
                    </Link>
                    <Link
                      target="_blank"
                      href={getMINANFTLink(algoliaHitData.hash)}
                      className="font-semibold text-primary underline hover:no-underline"
                    >
                      See on minanft.io
                    </Link>
                  </div>
                )}

                {mintProgress.step > 0 && (
                  <div className="mt-4">
                    <StepProgressBar
                      currentStep={mintProgress.step}
                      message={mintProgress.message}
                      error={error}
                    />
                  </div>
                )}

                {nftMintResponse.state === "active" &&
                  nftMintResponse.success && (
                    <p className="text-sm">
                      NFT minted successfully🎉. You can check your new nft on{" "}
                      <Link
                        target="_blank"
                        href={`https://testnet.minanft.io/explore?query=${nftMintResponse.txHash}`}
                        className="font-semibold text-primary underline hover:no-underline"
                      >
                        minanft
                      </Link>
                    </p>
                  )}
              </Flex>
              <MintRegisterModal
                triggerBtnClasses={
                  "cursor-pointer text-xs font-semibold text-primary underline hover:no-underline focus-visible:outline-none"
                }
              />
              {nftMintResponse.state === "active" &&
                nftMintResponse.success && (
                  <div className="hidden">
                    {toast.success(
                      <>
                        <p>
                          NFT minted successfully. You can check your new nft on{" "}
                          <Link
                            target="_blank"
                            href={`https://testnet.minanft.io/explore?query=${nftMintResponse.txHash}`}
                            className="font-semibold text-primary underline hover:no-underline"
                          >
                            minanft
                          </Link>
                        </p>
                      </>,
                      {
                        id: "mint-success-toast",
                      }
                    )}
                  </div>
                )}
              <div className="hidden">
                {nftMintResponse.state === "active" &&
                  !nftMintResponse.success &&
                  toast.error(
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-medium text-red-700">
                        NFT mint failed 😭
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        {nftMintResponse.message}
                      </p>
                    </div>,
                    {
                      id: "mint-error-toast",
                    }
                  )}
              </div>

              <div className="mt-4 rounded-md">
                <h3 className="mb-2 font-semibold">Traits</h3>
                <ul className="grid grid-cols-2 gap-2 text-center text-xs">
                  {parsedTraits.map((trait, index) => {
                    const traitCount =
                      rarityData?.[trait.key]?.[trait.value as string] ?? 0;
                    const rarityPercentage = getRarityPercentage(
                      traitCount,
                      totalNFTCount
                    );
                    const bgColor = getRarityBackgroundColor(rarityPercentage);
                    const textColor = getRarityColor(rarityPercentage);
                    return (
                      <li
                        key={index}
                        className="relative flex flex-col items-center gap-2 rounded-md bg-white px-3 py-5"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-black/70">{trait.key}</span>

                          <span className="absolute left-2 top-2">
                            {(ATTRIBUTES_DATA as any)[trait.key]?.Icon &&
                              React.createElement(
                                (ATTRIBUTES_DATA as any)[trait.key].Icon
                              )}
                          </span>

                          <Tooltip.Provider delayDuration={100}>
                            <Tooltip.Root>
                              <Tooltip.Trigger asChild>
                                <span className="absolute right-2 top-2">
                                  <InfoCircledIcon />
                                </span>
                              </Tooltip.Trigger>
                              <Tooltip.Portal>
                                <Tooltip.Content
                                  className="gradient-bg max-w-[350px] rounded-xl px-3 py-2 shadow-sm"
                                  sideOffset={5}
                                >
                                  <ul>
                                    <li className="text-xs text-black/80">
                                      {
                                        (ATTRIBUTES_DATA as any)[trait.key]
                                          .description
                                      }
                                    </li>

                                    {(ATTRIBUTES_DATA as any)[trait.key]
                                      ?.values?.[trait.value] && (
                                      <li className="text-xs">
                                        {
                                          (ATTRIBUTES_DATA as any)[trait.key]
                                            .values[trait.value]
                                        }
                                      </li>
                                    )}
                                  </ul>

                                  <Tooltip.Arrow className="TooltipArrow" />
                                </Tooltip.Content>
                              </Tooltip.Portal>
                            </Tooltip.Root>
                          </Tooltip.Provider>
                        </div>
                        <div className="text-md font-semibold">
                          {trait.value}
                        </div>

                        <div>
                          <span className={`block rounded p-2 ${bgColor}`}>
                            <span className="mr-1">
                              {rarityData?.[trait.key][trait.value]}
                            </span>
                            <span className={`font-semibold ${textColor}`}>
                              {rarityPercentage}%
                            </span>
                          </span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
                <div className="pt-[0.5px]">
                  <Dialog.Description>
                    <Link
                      href="/faq#tileville-builder-nfts"
                      className="text-xs font-semibold text-primary underline hover:no-underline"
                    >
                      Learn more about the utility of TileVille NFTs
                    </Link>
                  </Dialog.Description>
                </div>
              </div>
            </div>
          </div>
          <Dialog.Close>
            <button className="absolute bottom-2 right-4 rounded-md border-primary bg-primary/30 px-2 py-2 text-xs font-medium hover:bg-primary/50 focus-visible:outline-none">
              Cancel
            </button>
          </Dialog.Close>

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
