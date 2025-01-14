"use client";

import { Spinner2 } from "@/components/common/Spinner";
import { CreateCollectionContent } from "@/components/Marketplace/CreateCollectionContent";
import { MarketplaceCarousel } from "@/components/Marketplace/MarketplaceCarousel";
import { TopNFTCollections } from "@/components/Marketplace/TopNFTCollections";
import { NFTModal } from "@/components/NFTModal";
import { NFT_COLLECTIONS, NFTCollectionType } from "@/constants";
import { useFeaturedNFTs } from "@/db/react-query-hooks";
import { useFetchNFTSAlgolia } from "@/hooks/useFetchNFTSAlgolia";

type featuredNFTType = {
  collection: NFTCollectionType;
  nft: any;
};

export default function MarketplaceLanding() {
  const { data: featuredNFTs, isLoading } = useFeaturedNFTs();
  const { mintNFTHitsResponse } = useFetchNFTSAlgolia({
    queryText: "tileville",
  });
  return (
    <div className="mx-auto max-w-[1274px] p-4 pb-8 pt-12 md:pt-20">
      <section className="mb-12">
        <MarketplaceCarousel />
      </section>
      <TopNFTCollections />

    <CreateCollectionContent />

      <section className="mt-8">
        <div className="grid grid-cols-12">
          <div className="col-span-3 max-w-xs text-[40px] font-extrabold text-primary flex items-center justify-center">
            <h3>Explore the Exclusive NFTS on MINA!</h3>
          </div>

          <div className="col-span-9">
            <div className="">
              {isLoading ? (
                <Spinner2 />
              ) : (
                <div className="grid flex-1 grid-cols-4 gap-3 pr-2 text-lg">
                  {featuredNFTs?.featuredNFTs.map(
                    ({ collection, nft }: featuredNFTType) => {
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

                      const isNftAlreadyMinted = mintNFTHitsResponse.find(
                        ({ name: nftName }) => nftName === name
                      );

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
                          renderStyle="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-2"
                          collection={collection}
                          NFTCategory={
                            collection === NFT_COLLECTIONS.MINATY ||
                            collection === NFT_COLLECTIONS.MINAPUNKS
                              ? category
                              : null
                          }
                          isPublicMint={is_public_mint === false ? false : true}
                        />
                      );
                    }
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
