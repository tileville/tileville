import React from "react";
import {
  useFetchNFTSAlgolia,
  AlgoliaHitResponse,
} from "@/hooks/useFetchNFTSAlgolia";
import { Cross1Icon } from "@radix-ui/react-icons";
import { Dialog } from "@radix-ui/themes";
import { NFTModalTriggerContent } from "./NFTModalTriggerContent";
import { NFTModalContent } from "./NFTModalContent";
import { Spinner2 } from "@/components/common/Spinner";

type DigitalCollectionType = {
  walletAddress: string;
  isOwner: boolean;
};

export default function DigitalCollection({
  walletAddress,
  isOwner,
}: DigitalCollectionType) {
  // Fetch Minaty NFTs
  const { mintNFTHitsResponse: minatyNfts = [], isLoading: isMinatyLoading } =
    useFetchNFTSAlgolia({
      owner: walletAddress,
      queryText: "MINATY",
    });

  // Fetch Tileville NFTs
  const {
    mintNFTHitsResponse: tilevilleNfts = [],
    isLoading: isTilevilleLoading,
  } = useFetchNFTSAlgolia({
    owner: walletAddress,
    queryText: "TILEVILLE BUILDER",
  });

  // Fetch MinaPunks NFTs
  const {
    mintNFTHitsResponse: minaPunksNfts = [],
    isLoading: isMinaPunksLoading,
  } = useFetchNFTSAlgolia({
    owner: walletAddress,
    queryText: "MINAPUNKS",
  });

  // Fetch ZkGod NFTs
  const { mintNFTHitsResponse: zkGodNfts = [], isLoading: isZkGodLoading } =
    useFetchNFTSAlgolia({
      owner: walletAddress,
      queryText: "ZKGOD",
    });

  const { mintNFTHitsResponse: zekoNfts = [], isLoading: isZekoLoading } =
    useFetchNFTSAlgolia({
      owner: walletAddress,
      queryText: "ZEKO",
    });

  const isLoading =
    isMinatyLoading ||
    isTilevilleLoading ||
    isMinaPunksLoading ||
    isZekoLoading ||
    isZkGodLoading;
  const totalNfts = [
    ...minatyNfts,
    ...tilevilleNfts,
    ...minaPunksNfts,
    ...zkGodNfts,
    ...zekoNfts,
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Spinner2 />
      </div>
    );
  }

  return (
    <>
      {totalNfts.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {totalNfts.map((nft: AlgoliaHitResponse) => (
            <Dialog.Root key={nft.jobId || nft.hash}>
              <Dialog.Trigger>
                <div>
                  <NFTModalTriggerContent
                    nftImg={nft.image}
                    nftName={nft.name}
                  />
                </div>
              </Dialog.Trigger>

              <Dialog.Content className="relative !m-0 !max-w-[1020px] !rounded-md !p-0">
                <NFTModalContent
                  nftName={nft.name}
                  nftAddress={nft.address}
                  nftHash={nft.hash}
                  nftImg={nft.image}
                  externalUrl={nft.external_url}
                  nftProperties={nft.properties}
                  isOwner={isOwner}
                />
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
            {isOwner ? "You" : "User"} do not own any Collection right now
          </h2>
        </div>
      )}
    </>
  );
}
