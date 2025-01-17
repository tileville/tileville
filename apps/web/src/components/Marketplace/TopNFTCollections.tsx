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
      <h2 className="text-[28px] font-bold text-primary underline">
        T0P NFT COLLECTIONS
      </h2>

      <div className="mt-4">
        {globalConfigLoading ? (
          <div className="grid grid-cols-4 gap-6 text-center">
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
          <div className="grid grid-cols-4 gap-6 text-center">
            {nftCollections?.map((collection) => {
              const collectionConfig = getCollectionConfig(collection);

              return (
                <div
                  className="flex flex-col items-center rounded-[10px] border-2 border-primary bg-[#A0B775] p-6"
                  key={collection}
                >
                  <div className="mb-1 h-[200px] w-[200px] rounded-[5px] border border-white">
                    <Image
                      src={collectionConfig.profile_url}
                      alt="Logo"
                      width={100}
                      height={100}
                      className="h-full w-full rounded-[5px] object-cover"
                    />
                  </div>

                  <h3 className="mb-5 text-2xl font-extrabold text-black">
                    {collection}
                  </h3>

                  <Link
                    href={`/marketplace/collection/${collection}`}
                    className="flex min-h-[60px] w-full items-center justify-center rounded-lg bg-primary px-3 text-base font-bold text-white"
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
