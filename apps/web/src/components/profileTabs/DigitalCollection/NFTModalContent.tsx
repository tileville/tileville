import Image from "next/image";
import { Dialog } from "@radix-ui/themes";
import { CopyIcon } from "@radix-ui/react-icons";
import { copyToClipBoard, formatAddress } from "@/lib/helpers";
import React, { ReactNode } from "react";
import { TraitsInfoTooltip } from "@/components/Marketplace/TraitsInfoTooltip";
import { NFTModalFooter } from "./NFTModalFooter";
import { ATTRIBUTES_DATA } from "@/constants";

export interface AttributesDataType {
  [key: string]: {
    Icon?: React.ComponentType;
    description?: string;
    values?: {
      [key: string]: string;
    };
  };
}

type NFTModalContentType = {
  nftImg: string;
  nftName: string;
  nftAddress: string;
  externalUrl: string;
  nftHash: string;
  nftProperties: AttributesDataType;
  isOwner: boolean;
};

export const NFTModalContent = ({
  nftImg,
  nftName,
  nftAddress,
  externalUrl,
  nftHash,
  nftProperties,
  isOwner,
}: NFTModalContentType) => {
  return (
    <div className="grid md:grid-cols-2">
      <div className="h-full w-full">
        <Image
          src={nftImg}
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
          {nftName}
        </Dialog.Title>

        <div className="flex items-center gap-2">
          <p className="font-semibold">NFT Address:</p>
          {formatAddress(nftAddress)}
          <button
            onClick={() => {
              copyToClipBoard({
                toCopyContent: nftAddress,
                copiedType: "NFT Address",
              });
            }}
          >
            <CopyIcon />
          </button>
        </div>

        <div className="mt-4 rounded-md">
          <div className="flex items-center justify-between">
            <Dialog.Description className="!mb-2 font-semibold">
              Traits
            </Dialog.Description>
          </div>

          <ul className="grid grid-cols-2 gap-2 text-center text-xs">
            {Object.entries(nftProperties).map(([key, value]) => {
              if (
                typeof value === "object" &&
                value !== null &&
                "data" in value &&
                key !== "description" &&
                key !== "image"
              ) {
                const attributeData = (ATTRIBUTES_DATA as AttributesDataType)[
                  key
                ];
                const hasTooltip =
                  !!attributeData?.description ||
                  !!attributeData?.values?.[value.data as string];

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
                        <TraitsInfoTooltip
                          description={
                            attributeData.description
                              ? attributeData.description
                              : ""
                          }
                          value={
                            attributeData.values
                              ? attributeData.values[value.data as string]
                              : ""
                          }
                        />
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

        <NFTModalFooter
          externalUrl={externalUrl}
          nftHash={nftHash}
          nftName={nftName}
          isOwner={isOwner}
        />
      </div>
    </div>
  );
};
