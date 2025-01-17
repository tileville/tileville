// src/app/marketplace/page.tsx
"use client";

import { Spinner2 } from "@/components/common/Spinner";
import { CreateCollectionContent } from "@/components/Marketplace/CreateCollectionContent";
import { MarketplaceCarousel } from "@/components/Marketplace/MarketplaceCarousel";
import { TopNFTCollections } from "@/components/Marketplace/TopNFTCollections";
import { NFTModal } from "@/components/NFTModal";
import {
  MinaPunksCategory,
  NFT_COLLECTIONS,
  NFTCategory,
  NFTCollectionType,
} from "@/constants";
import { globalConfigAtom } from "@/contexts/atoms";
import { useFeaturedNFTs } from "@/db/react-query-hooks";
import { useFetchNFTSAlgolia } from "@/hooks/useFetchNFTSAlgolia";
import { useAtomValue } from "jotai";

interface NFT {
  nft_id: number;
  traits: any[];
  img_url: string;
  price: number;
  name: string;
  owner_address: string | null;
  category?: NFTCategory | null | MinaPunksCategory;
  is_public_mint?: boolean;
}

interface FeaturedNFTCollection {
  collection: NFTCollectionType;
  nfts: NFT[];
}

export default function MarketplaceLanding() {
  const { data: featuredData, isLoading } = useFeaturedNFTs();
  const { mintNFTHitsResponse } = useFetchNFTSAlgolia({
    queryText: "tileville",
  });

  const globalConfig = useAtomValue(globalConfigAtom);
  const nftCollections = globalConfig?.nft_collections;

  const getCollectionConfig = (collection: string) => {
    return globalConfig?.nft_collections_config?.[collection] || {};
  };

  return (
    <div className="mx-auto max-w-[1274px] p-4 pb-8 pt-12 md:pt-20">
      <section className="mb-12">
        <MarketplaceCarousel
          nftCollections={nftCollections}
          getCollectionConfig={getCollectionConfig}
        />
      </section>

      <TopNFTCollections
        nftCollections={nftCollections}
        getCollectionConfig={getCollectionConfig}
      />

      <CreateCollectionContent />

      <section className="mt-8">
        <div className="grid grid-cols-12">
          <div className="col-span-3 flex max-w-xs items-center justify-center text-[40px] font-extrabold text-primary">
            <h3>Explore the Exclusive NFTS on MINA!</h3>
          </div>

          <div className="col-span-9">
            <div className="">
              {isLoading ? (
                <Spinner2 />
              ) : featuredData?.featuredNFTs?.length > 0 ? (
                <div className="grid flex-1 grid-cols-4 gap-3 pr-2 text-lg">
                  {featuredData.featuredNFTs.map(
                    (collection: FeaturedNFTCollection) =>
                      collection.nfts.map((nft: NFT) => {
                        const isNftAlreadyMinted = mintNFTHitsResponse.find(
                          ({ name: nftName }) => nftName === nft.name
                        );

                        const {
                          nft_id,
                          traits,
                          img_url,
                          price,
                          name,
                          owner_address,
                          category,
                          is_public_mint,
                        } = nft;

                        return (
                          <NFTModal
                            key={nft_id}
                            traits={traits}
                            img_url={img_url}
                            price={price}
                            name={name}
                            nftID={nft_id}
                            nftPrice={price}
                            ownerAddress={owner_address}
                            algoliaHitData={isNftAlreadyMinted}
                            renderStyle="view1"
                            collection={collection.collection}
                            NFTCategory={
                              collection.collection ===
                                NFT_COLLECTIONS.MINATY ||
                              collection.collection ===
                                NFT_COLLECTIONS.MINAPUNKS
                                ? category
                                : null
                            }
                            isPublicMint={
                              is_public_mint === false ? false : true
                            }
                          />
                        );
                      })
                  )}
                </div>
              ) : (
                <div className="text-center text-xl text-gray-500">
                  No featured NFTs available at the moment
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
