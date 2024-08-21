import React, { useState } from "react";
import { Dialog, Flex } from "@radix-ui/themes";
import { ReactNode } from "react";
import Image from "next/image";
import * as Tooltip from "@radix-ui/react-tooltip";
import { Cross1Icon, InfoCircledIcon } from "@radix-ui/react-icons";
import { Json } from "@/lib/database.types"; // Import the Json type from your database types
import { useNetworkStore, usePayNFTMintFee } from "@/lib/stores/network";
import {
  ATTRIBUTES_DATA,
  BLOCKBERRY_API_KEY,
  BLOCKBERRY_MAINNET_BASE_URL,
} from "@/constants";
import {
  useGlobalConfig,
  useMainnetTransactionStatusForMint,
} from "@/db/react-query-hooks";
import { UseQueryResult } from "@tanstack/react-query";
import Link from "next/link";
import { CountdownTimer } from "./common/CountdownTimer";
import { getTime } from "date-fns";
import { useAtomValue } from "jotai";
import { globalConfigAtom } from "@/contexts/atoms";
import { MintRegisterModal } from "./Marketplace/mintRegisterModal";
import { Spinner } from "./common/Spinner";
import toast from "react-hot-toast";

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
  ownerAddress,
  txnHash,
  nftID,
}: {
  traits: Json;
  img_url: string;
  price: ReactNode;
  name: string;
  nftID: number;
  nftPrice: number;
  renderStyle: string;
  ownerAddress: string | null;
  txnHash: string | null;
}) => {
  // Function to parse traits
  const [isLoading, setisLoading] = useState(false);
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

  const networkStore = useNetworkStore();
  const { payNFTMintFees, mintNft } = usePayNFTMintFee();

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

  const handlePayMintFees = async () => {
    setNftMintResponse(INITIAL_MINT_RESPONSE);
    //TODO: Handle loading state for mint button
    setisLoading(true);
    try {
      const response = await payNFTMintFees({
        nft_id: nftID,
        nft_price: nftPrice,
      });

      if (response.success && response.txn_hash) {
        setMintTxnHash(response.txn_hash);
      }

      setNftMintResponse({ state: "active", ...response });

      console.log("response 119", response);
      console.log("nft mint response state 120", nftMintResponse);
      if (response.success) {
      }
      setisLoading(false);
    } catch (error) {
      //TODO: Handle error with proper toast
      setisLoading(false);
    }
  };

  const handleMint = async () => {
    //TODO: Handle loading state for mint button
    setisLoading(true);

    try {
      const txnResponse = await fetch(
        `${BLOCKBERRY_MAINNET_BASE_URL}/v1/block-confirmation/${mintTxnHash}`,
        {
          headers: {
            "x-api-key": BLOCKBERRY_API_KEY,
          },
        }
      );
      const txnStatusJson = await txnResponse.json();
      if (txnStatusJson.blockConfirmationsCount < 1) {
        toast("Please wait for the mint fee transaction to confirm");
        return;
      }
    } catch (err) {
      toast("Failed to check txn status for mint fees");
      return;
    }
    try {
      const response = await mintNft({
        nft_id: nftID,
        txn_hash: mintTxnHash,
      });

      if (response.success && response.txn_hash) {
        setMintTxnHash(response.txn_hash);
      }

      setNftMintResponse({ state: "active", ...response });

      console.log("response 119", response);
      console.log("nft mint response state 120", nftMintResponse);
      if (response.success) {
      }
      setisLoading(false);
    } catch (error) {
      //TODO: Handle error with proper toast
      setisLoading(false);
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
  // const isMintingDisabled = isFuture(globalConfig.nft_mint_start_date);
  const isMintingDisabled = false;

  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger>
          <div className="border-primary-30 group/item listItem fade-slide-in cursor-pointer overflow-hidden rounded-md transition-colors">
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

              <div className="font-semibold">
                {nftPrice}
                <span className="text-primary-50"> MINA</span>
              </div>
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
                  onClick={handlePayMintFees}
                  disabled={isMintingDisabled || isLoading}
                >
                  {!!networkStore.address
                    ? isMintingDisabled
                      ? `MINTING STARTS SOON`
                      : "PAY MINT FEE"
                    : "Connect Wallet"}

                  {isLoading && (
                    <span className="absolute right-1/2 top-[5px] w-5 -translate-x-16">
                      <Spinner />
                    </span>
                  )}
                </button>
                {mintTxnHash && <button onClick={handleMint}>MINT NFT</button>}
              </Flex>
              <MintRegisterModal
                triggerBtnClasses={
                  "cursor-pointer text-xs font-semibold text-primary underline hover:no-underline focus-visible:outline-none"
                }
              />
              {nftMintResponse.state === "active" &&
                nftMintResponse.success && (
                  <>
                    {toast.success(
                      (t) => (
                        <>
                          <p>
                            NFT minted successfully. You can check your new nft
                            on{" "}
                            <Link
                              target="_blank"
                              href={`https://testnet.minanft.io/explore?query=${nftMintResponse.txHash}`}
                              className="font-semibold text-primary underline hover:no-underline"
                            >
                              minanft
                            </Link>
                          </p>

                          <button onClick={() => toast.dismiss(t.id)}>
                            <Cross1Icon />
                          </button>
                        </>
                      ),
                      { id: "mint-success" }
                    )}

                    <p>
                      NFT minted successfully. You can check your new nft on{" "}
                      <a
                        target="_blank"
                        href={`https://testnet.minanft.io/explore?query=${nftMintResponse.txHash}`}
                      >
                        minanft
                      </a>
                    </p>
                  </>
                )}
              <div className="hidden">
                {nftMintResponse.state === "active" &&
                  !nftMintResponse.success &&
                  toast.custom(
                    (t) => (
                      <div
                        className={`${
                          t.visible ? "animate-enter" : "animate-leave"
                        } pointer-events-auto flex w-full max-w-xs rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5`}
                      >
                        <div className="w-0 flex-1 p-4">
                          <div className="flex items-start">
                            <div className="ml-3 flex-1">
                              <p className="text-sm font-medium text-red-700">
                                NFT mint failed 😭
                              </p>
                              <p className="mt-1 text-sm text-gray-500">
                                {nftMintResponse.message}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div>
                          <button
                            onClick={() => toast.dismiss(t.id)}
                            className="flex w-full items-center justify-center rounded-none rounded-r-lg border border-transparent p-4 text-sm font-medium text-red-600 hover:text-red-500 focus:outline-none"
                          >
                            <Cross1Icon />
                          </button>
                        </div>
                      </div>
                    ),
                    {
                      id: "nft-mint-failed",
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
