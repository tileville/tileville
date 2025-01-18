import { NFTCollectionType } from "@/constants";
import { Skeleton } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";

type TopNFTCollectionsType = {
  nftCollections: NFTCollectionType[];
  getCollectionConfig: (collection: string) => any;
  globalConfigLoading: boolean;
};
export const TopNFTCollections = ({
  nftCollections,
  getCollectionConfig,
  globalConfigLoading,
}: TopNFTCollectionsType) => {
  return (
    <section className="mb-6">
      <h2 className="text-xl  md:text-[28px] md:leading-snug font-bold text-primary underline">
        T0P NFT COLLECTIONS
      </h2>

      <div className="mt-4">
        {globalConfigLoading ? (
          <div className="grid grid-cols-4 gap-2 sm:gap-3 text-center md:gap-4 lg:gap-6">
            {Array(4)
              .fill(0)
              .map((arr, index) => {
                return (
                  <Skeleton
                    className="min-h-[366px] rounded-[10px]"
                    key={index}
                  ></Skeleton>
                );
              })}
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-2 sm:gap-3 text-center md:gap-4 lg:gap-6">
            {nftCollections?.map((collection) => {
              const collectionConfig = getCollectionConfig(collection);

              return (
                <div
                  className="flex flex-col items-center rounded-[10px] border-2 border-primary bg-[#A0B775] p-2 sm:p-3 lg:p-6"
                  key={collection}
                >
                  <div className="mb-1 h-[75px] w-[75px] rounded-[5px] border border-white md:h-[100px] md:w-[100px] lg:h-[200px] lg:w-[200px]">
                    <Image
                      src={collectionConfig.profile_url}
                      alt="Logo"
                      width={100}
                      height={100}
                      className="h-full w-full rounded-[5px] object-cover"
                    />
                  </div>

                  <h3 className="mb:2 lg:mb-5 text-lg font-extrabold text-black lg:text-2xl">
                    {collection}
                  </h3>

                  <Link
                    href={`/marketplace/collection/${collection}`}
                    className="flex w-full items-center justify-center rounded-lg bg-primary p-2 lg:p-3 text-sm lg:text-base font-bold text-white hover:bg-primary/80 lg:min-h-[60px]"
                  >
                    Explore
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
