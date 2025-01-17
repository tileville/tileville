"use client";

import MarketplaceContent from "@/components/Marketplace/MarketplaceContent";
import { NFTCollectionType } from "@/constants";
import { globalConfigAtom } from "@/contexts/atoms";
import { useAtomValue } from "jotai";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function NFTCollection() {
  const params = useParams<{
    collection: NFTCollectionType;
  }>();

  const globalConfig = useAtomValue(globalConfigAtom);

  const collecitonConfig =
    globalConfig?.nft_collections_config?.[params.collection] || {};

  const collectionProfileImage = collecitonConfig.profile_url;
  const collectionCoverImage = collecitonConfig.poster_url;
  const collectionDescription = collecitonConfig.description2;

  return (
    <div className="mx-auto max-w-[1274px] p-4 pb-8 pt-12 md:pt-20">
      <div className="relative h-[335px] w-full">
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/0 to-black/[0.73]"></div>
        <Image
          src={collectionCoverImage}
          alt="Carousel"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="mx-auto max-w-[1200px]">
        <div>
          <div className="relative z-10 -mt-20 h-[127px] w-[127px] rounded-[5px] border border-white">
            <Image
              src={collectionProfileImage}
              alt="Logo"
              width={127}
              height={127}
              className="h-full w-full rounded-[5px] object-cover"
            />
          </div>
        </div>

        <h2 className="my-2 text-2xl font-extrabold">{params.collection}</h2>
        <p className="max-w-[500px] text-sm font-semibold">
          {collectionDescription}
        </p>

        {/* <button className="text-sm font-semibold text-primary">
          show more
        </button> */}

        <MarketplaceContent
          collection={params.collection}
          isMarketplaceV2={true}
        />
      </div>
    </div>
  );
}
