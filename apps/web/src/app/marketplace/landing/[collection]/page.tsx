import MarketplaceContent from "@/components/Marketplace/MarketplaceContent";
import { NFT_COLLECTIONS } from "@/constants";
import Image from "next/image";

export default function NFTCollection() {
  return (
    <div className="mx-auto max-w-[1274px] p-4 pb-8 pt-12 md:pt-20">
      <div className="relative h-[335px] w-full">
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/0 to-black/[0.73]"></div>
        <Image
          src="https://oqymtqolwjujkayjyxdt.supabase.co/storage/v1/object/public/collection_images/tileville_cover.jpeg?t=2025-01-10T13%3A09%3A55.259Z"
          alt="Carousel"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className=" mx-auto max-w-[1200px]">
        <div>
          <div className="relative z-10 -mt-20 h-[127px] w-[127px]">
            <Image
              src="https://oqymtqolwjujkayjyxdt.supabase.co/storage/v1/object/public/collection_images/tileville_profile.png"
              alt="Logo"
              width={127}
              height={127}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <h2 className="my-2 text-2xl font-extrabold">TileVille</h2>
        <p className="max-w-[313px] text-sm font-semibold">
          TileVille is a strategic city-building game on the Mina blockchain,
          where players construct
        </p>

        <button className="text-sm font-semibold text-primary">
          show more
        </button>

        <MarketplaceContent
          collection={NFT_COLLECTIONS.MINATY}
          isMarketplaceV2={true}
        />
      </div>
    </div>
  );
}
