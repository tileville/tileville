"use client";

import { MarketplaceCarousel } from "@/components/Marketplace/MarketplaceCarousel";
import Image from "next/image";

export default function MarketplaceLanding() {
  return (
    <div className="mx-auto max-w-[1274px] p-4 pb-8 pt-12 md:pt-20">
      {/* Hero Section with Carousel */}
      <section className="mb-12">
        <MarketplaceCarousel />
      </section>

      <section>
        <h2 className="text-[28px] font-bold text-primary underline">
          Top NFT COLLECTIONS
        </h2>

        <div className="mt-4">
          <div className="grid grid-cols-6 gap-6 text-center">
            <div className="flex flex-col items-center rounded-[10px] border-2 border-primary p-1">
              <div className="h-[140px] w-[140px]">
                <Image
                  src="https://oqymtqolwjujkayjyxdt.supabase.co/storage/v1/object/public/collection_images/tileville_profile.png"
                  alt="Logo"
                  width={140}
                  height={140}
                  className="h-full w-full object-cover"
                />
              </div>

              <h3 className="text-2xl font-extrabold text-black">Tileville</h3>

              <button className="h-11 w-full rounded-lg bg-primary px-3 text-base font-bold text-white">
                Explore
              </button>
            </div>
            <div className="flex flex-col items-center rounded-[10px] border-2 border-primary p-1">
              <div className="h-[140px] w-[140px]">
                <Image
                  src="https://oqymtqolwjujkayjyxdt.supabase.co/storage/v1/object/public/collection_images/tileville_profile.png"
                  alt="Logo"
                  width={140}
                  height={140}
                  className="h-full w-full object-cover"
                />
              </div>

              <h3 className="text-2xl font-extrabold text-black">Tileville</h3>

              <button className="h-11 w-full rounded-lg bg-primary px-3 text-base font-bold text-white">
                Explore
              </button>
            </div>
            <div className="flex flex-col items-center rounded-[10px] border-2 border-primary p-1">
              <div className="h-[140px] w-[140px]">
                <Image
                  src="https://oqymtqolwjujkayjyxdt.supabase.co/storage/v1/object/public/collection_images/tileville_profile.png"
                  alt="Logo"
                  width={140}
                  height={140}
                  className="h-full w-full object-cover"
                />
              </div>

              <h3 className="text-2xl font-extrabold text-black">Tileville</h3>

              <button className="h-11 w-full rounded-lg bg-primary px-3 text-base font-bold text-white">
                Explore
              </button>
            </div>

            <div className="flex flex-col items-center rounded-[10px] border-2 border-primary p-1">
              <div className="h-[140px] w-[140px]">
                <Image
                  src="https://oqymtqolwjujkayjyxdt.supabase.co/storage/v1/object/public/collection_images/tileville_profile.png"
                  alt="Logo"
                  width={140}
                  height={140}
                  className="h-full w-full object-cover"
                />
              </div>

              <h3 className="text-2xl font-extrabold text-black">Tileville</h3>

              <button className="h-11 w-full rounded-lg bg-primary px-3 text-base font-bold text-white">
                Explore
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Rest of your content */}
    </div>
  );
}
