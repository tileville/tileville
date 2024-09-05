import React, { ReactNode } from "react";
import {
  useFetchNFTSAlgolia,
  AlgoliaHitResponse,
} from "@/hooks/useFetchNFTSAlgolia";
import { useNetworkStore } from "@/lib/stores/network";
import { Cross1Icon, InfoCircledIcon } from "@radix-ui/react-icons";
import { Dialog } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";
import * as Tooltip from "@radix-ui/react-tooltip";
import { ATTRIBUTES_DATA } from "@/constants";
import { getMINANFTLink } from "@/lib/helpers";

interface AttributesData {
  [key: string]: {
    Icon?: React.ComponentType;
    description?: string;
    values?: {
      [key: string]: string;
    };
  };
}

export default function DigitalCollection() {
  const { address } = useNetworkStore();
  const { mintNFTHitsResponse } = useFetchNFTSAlgolia({ owner: address });

  return (
    <>
      {mintNFTHitsResponse && mintNFTHitsResponse.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {mintNFTHitsResponse.map((nft: AlgoliaHitResponse) => (
            <Dialog.Root key={nft.jobId}>
              <Dialog.Trigger>
                <div className="border-primary-30 group/item listItem fade-slide-in relative cursor-pointer overflow-hidden rounded-md transition-colors">
                  <div className="nft-img w-full overflow-hidden">
                    <Image
                      className="h-full w-full object-cover transition-all group-hover/item:scale-110"
                      width={852}
                      height={845}
                      alt="NFT"
                      src={nft.image}
                      quality={100}
                      priority={false}
                      placeholder="blur"
                      blurDataURL="/img/load/load.png"
                    />
                  </div>
                  <div className="nft-content px-2 py-3">
                    <div className="nft-content-info flex items-center justify-between">
                      <p className="font-semibold">{nft.name}</p>
                    </div>
                  </div>
                </div>
              </Dialog.Trigger>

              <Dialog.Content className="relative !m-0 !max-w-[1020px] !rounded-md !p-0">
                <div className="grid grid-cols-2">
                  <div className="h-full w-full">
                    <Image
                      src={nft.image}
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
                      {nft.name}
                    </Dialog.Title>

                    <div className="mt-4 rounded-md">
                      <Dialog.Description className="!mb-2 font-semibold">
                        Traits
                      </Dialog.Description>
                      <ul className="grid grid-cols-2 gap-2 text-center text-xs">
                        {Object.entries(nft.properties).map(([key, value]) => {
                          if (
                            typeof value === "object" &&
                            value !== null &&
                            "data" in value &&
                            key !== "description" &&
                            key !== "image"
                          ) {
                            const attributeData = (
                              ATTRIBUTES_DATA as AttributesData
                            )[key];
                            const hasTooltip =
                              attributeData?.description ||
                              attributeData?.values?.[value.data as string];

                            return (
                              <li
                                key={key}
                                className="relative flex flex-col items-center gap-2 rounded-md bg-white px-3 py-5"
                              >
                                <div className="flex items-center gap-2">
                                  <span className="text-black/70">{key}</span>

                                  <span className="absolute left-2 top-2">
                                    {attributeData?.Icon &&
                                      React.createElement(attributeData.Icon)}
                                  </span>
                                  {hasTooltip && (
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
                                              {attributeData?.description && (
                                                <li className="text-xs text-black/80">
                                                  {attributeData.description}
                                                </li>
                                              )}
                                              {attributeData?.values?.[
                                                value.data as string
                                              ] && (
                                                <li className="text-xs">
                                                  {
                                                    attributeData.values[
                                                      value.data as string
                                                    ]
                                                  }
                                                </li>
                                              )}
                                            </ul>
                                            <Tooltip.Arrow className="TooltipArrow" />
                                          </Tooltip.Content>
                                        </Tooltip.Portal>
                                      </Tooltip.Root>
                                    </Tooltip.Provider>
                                  )}
                                </div>
                                <div className="text-md font-semibold">
                                  {value.data as ReactNode}
                                </div>
                              </li>
                            );
                          }
                          return null;
                        })}
                      </ul>
                    </div>

                    <div className="pt-4">
                      <Link
                        href="/faq#tileville-builder-nfts"
                        className="text-xs font-semibold text-primary underline hover:no-underline"
                      >
                        Learn more about the utility of TileVille NFTs
                      </Link>
                    </div>

                    <div className="mt-4 flex gap-6 text-sm">
                      <Link
                        target="_blank"
                        href={nft.external_url}
                        className="font-semibold text-primary underline hover:no-underline"
                      >
                        See on MinaScan
                      </Link>
                      <Link
                        target="_blank"
                        href={getMINANFTLink(nft.hash)}
                        className="font-semibold text-primary underline hover:no-underline"
                      >
                        See on minanft.io
                      </Link>
                    </div>
                  </div>
                </div>

                <Dialog.Close>
                  <button className="absolute right-4 top-4">
                    <Cross1Icon />
                  </button>
                </Dialog.Close>
              </Dialog.Content>
            </Dialog.Root>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center pt-8">
          <h2 className="text-2xl font-semibold">
            You do not own any Collection right now
          </h2>
        </div>
      )}
    </>
  );
}
