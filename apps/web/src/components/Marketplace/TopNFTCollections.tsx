import { NFTCollectionType } from "@/constants";
import Image from "next/image";
import Link from "next/link";

type TopNFTCollectionsType = {
  nftCollections: NFTCollectionType[];
  getCollectionConfig: (collection: string) => any;
};
export const TopNFTCollections = ({
  nftCollections,
  getCollectionConfig,
}: TopNFTCollectionsType) => {
  return (
    <section className="mb-6">
      <h2 className="text-[28px] font-bold text-primary underline">
        Top NFT COLLECTIONS
      </h2>

      <div className="mt-4">
        <div className="grid grid-cols-4 gap-6 text-center">
          {nftCollections?.map((collection) => {
            const collectionConfig = getCollectionConfig(collection);

            return (
              <div
                className="flex flex-col items-center rounded-[10px] border-2 border-primary p-6 bg-[#A0B775]"
                key={collection}
              >
                <div className="h-[200px] w-[200px] mb-1 border border-white rounded-[5px]">
                  <Image
                    src={collectionConfig.profile_url}
                    alt="Logo"
                    width={100}
                    height={100}
                    className="h-full w-full object-cover rounded-[5px]"
                  />
                </div>

                <h3 className="mb-5 text-2xl font-extrabold text-black">
                  {collection}
                </h3>

                <Link
                  href={`/marketplace/landing/${collection}`}
                  className="flex min-h-[60px] w-full items-center justify-center rounded-lg bg-primary px-3 text-base font-bold text-white"
                >
                  Explore
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
