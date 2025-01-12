"use client";

import { MarketplaceCarousel } from "@/components/Marketplace/MarketplaceCarousel";
import { TopNFTCollections } from "@/components/Marketplace/TopNFTCollections";
import { NFTModal } from "@/components/NFTModal";
import { NFT_COLLECTIONS, NFTCollection, NFTCollectionType } from "@/constants";
import { useFeaturedNFTs } from "@/db/react-query-hooks";
import { useFetchNFTSAlgolia } from "@/hooks/useFetchNFTSAlgolia";
import Image from "next/image";

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
      {/* Hero Section with Carousel */}
      <section className="mb-12">
        <MarketplaceCarousel />
      </section>
      <TopNFTCollections />

      <section>
        <div className="rounded-xl border-primary bg-[#99B579]">
          <div className="grid grid-cols-2 items-center gap-4">
            <div>
              <Image
                src="/img/avatars/nftsPreview.png"
                width={600}
                height={600}
                alt="nfts preview"
                className="-ml-16"
              />
            </div>

            <div>
              <h2 className="text-[40px] font-extrabold text-primary">
                CREATE YOUR OWN COLLECTION
              </h2>

              <p className="my-6 max-w-[333px] text-xl font-semibold">
                Create your unique NFT collection on{" "}
                <b> TILEVILLE MARKETPLACE: </b>
                unleash your creativity now
              </p>

              <div>
                <button className="min-h-[60px] rounded-lg bg-primary px-5 py-2 text-base font-bold text-white hover:bg-primary/80 md:min-w-[250px]">
                  CREATE
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <div className="flex gap-3">
          <h3 className="max-w-xs text-[40px] font-extrabold text-primary">
            Explore the Exclusive NFTS on MINA!
          </h3>

          <div className="">
            <div className="">
              {isLoading ? (
                "Loading.............."
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
                          algoliaHitData={mintNFTHitsResponse.find(
                            ({ name }) => name === nft.name
                          )}
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
