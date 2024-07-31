import React from "react";
import { Dialog, Flex } from "@radix-ui/themes";
import { ReactNode } from "react";
import Image from "next/image";
import * as Tooltip from "@radix-ui/react-tooltip";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Json } from "@/lib/database.types"; // Import the Json type from your database types
import { useNetworkStore } from "@/lib/stores/network";
import { ATTRIBUTES_DATA } from "@/constants";
import { useGlobalConfig } from "@/db/react-query-hooks";
import { UseQueryResult } from "@tanstack/react-query";

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

export const NFTModal = ({
  traits,
  img_url,
  price,
  name,
  nftPrice,
  renderStyle,
}: {
  traits: Json;
  img_url: string;
  price: ReactNode;
  name: string;
  nftID: number;
  nftPrice: number;
  renderStyle: string;
}) => {
  // Function to parse traits
  const configData: UseQueryResult<void | GlobalConfig, unknown> =
    useGlobalConfig("config_v1");
  const configValues = configData.data?.config_values as
    | ConfigValues
    | undefined;
  const rarityData = configValues?.traits_rarity_counts;
  const totalNFTCount = parseInt(configValues?.total_nft_count || "0", 10);

  const networkStore = useNetworkStore();
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

  const handlePayParticipationFess = () => {
    if (!networkStore.address) {
      try {
        networkStore.connectWallet(false);
      } catch (error) {
        console.error(`Failed to connect with wallet`, error);
      } finally {
        return;
      }
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

  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger>
          <div className="border-primary-30 group/item listItem cursor-pointer overflow-hidden rounded-md">
            <div className="nft-img w-full overflow-hidden">
              <Image
                className="w-full transition-all group-hover/item:scale-110"
                width="100"
                height="200"
                alt="NFT Image"
                src={img_url}
                quality={100}
              />
            </div>

            <div className="nft-content px-2 py-3">
              <div className="nft-content-info flex items-center justify-between">
                <p className="text-sm font-semibold">{name}</p>
              </div>

              {renderStyle === "list-style" && (
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

        <Dialog.Content className="!max-w-[1020px]">
          <Dialog.Title>
            <h1>{name}</h1>
          </Dialog.Title>
          <Dialog.Description size="2" mb="4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Image
                  src={img_url}
                  width={853}
                  height={845}
                  alt="img"
                  className="rounded-md"
                />
              </div>

              <div>
                <div className="mb-3">
                  Price:{" "}
                  <span>
                    <span className="text-lg font-semibold">{price}</span> MINA
                  </span>{" "}
                </div>

                <div className="mt-4 rounded-md bg-primary/30 p-4">
                  <h3 className="mb-2 text-xl font-semibold">Attributes</h3>
                  <ul className="grid grid-cols-2 gap-2 text-center">
                    {parsedTraits.map((trait, index) => {
                      const traitCount =
                        rarityData?.[trait.key]?.[trait.value as string] ?? 0;
                      const rarityPercentage = getRarityPercentage(
                        traitCount,
                        totalNFTCount
                      );
                      const bgColor =
                        getRarityBackgroundColor(rarityPercentage);
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
                          <div className="text-lg font-semibold">
                            {trait.value}
                          </div>

                          <div>
                            <span className={`rounded p-2 ${bgColor}`}>
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
                </div>
              </div>
            </div>
          </Dialog.Description>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <button className="h-10 rounded-full border-primary bg-primary/30 px-5 py-2 text-sm font-medium hover:bg-primary/50 focus-visible:outline-none">
                Cancel
              </button>
            </Dialog.Close>
            {/* <Dialog.Close> */}
            <button
              className="h-10 rounded-full border-primary bg-primary px-5 py-2 text-sm font-medium text-white hover:bg-primary/90"
              onClick={handlePayParticipationFess}
            >
              {!!networkStore.address ? "MINT" : "Connect Wallet"}
            </button>
            {/* </Dialog.Close> */}
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
};
