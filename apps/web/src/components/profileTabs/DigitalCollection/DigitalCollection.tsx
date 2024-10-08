import React from "react";
import {
  useFetchNFTSAlgolia,
  AlgoliaHitResponse,
} from "@/hooks/useFetchNFTSAlgolia";
import { useNetworkStore } from "@/lib/stores/network";
import { Cross1Icon } from "@radix-ui/react-icons";
import { Dialog } from "@radix-ui/themes";
import { NFTModalTriggerContent } from "./NFTModalTriggerContent";
import { NFTModalContent } from "./NFTModalContent";

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
            You do not own any Collection right now
          </h2>
        </div>
      )}
    </>
  );
}
