"use client";
import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { NFTCollectionType } from "@/constants";
import Link from "next/link";

type MarketplaceCarouselType = {
  nftCollections: NFTCollectionType[];
  getCollectionConfig: (collection: string) => any;
};

const CarouselSlide = ({
  posterUrl,
  profileUrl,
  collectionName,
  CollectionDescription,
}: {
  posterUrl: string;
  profileUrl: string;
  collectionName: string;
  CollectionDescription: string;
}) => (
  <div className="relative flex-[0_0_100%] text-white">
    <div
      className={`relative h-[200px] w-full overflow-hidden rounded-lg md:h-[418px]`}
    >
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/0 to-black/[0.73]"></div>
      <div className="relative z-10 flex h-full w-full items-end justify-between p-6">
        <div className="flex max-w-[313px] flex-col items-start gap-3 text-sm font-bold">
          <div className="h-[94] w-[94]">
            <Image
              src={profileUrl}
              alt="Logo"
              width={94}
              height={94}
              className="h-full w-full object-cover"
            />
          </div>
          <h2 className="text-2xl font-extrabold">{collectionName}</h2>
          <p>{CollectionDescription}</p>
        </div>

        <div>
          <Link
            href={`/marketplace/landing/${collectionName}`}
            className="rounded-lg bg-primary px-3 py-2 font-bold text-white hover:bg-primary/80"
          >
            View Collection &gt;{" "}
          </Link>
        </div>
      </div>
      <Image
        src={posterUrl}
        alt="Carousel"
        fill
        className="object-cover"
        priority
      />
    </div>
  </div>
);

const DotButton = ({
  selected,
  onClick,
}: {
  selected: boolean;
  onClick: () => void;
}) => (
  <button
    className={`mx-1 h-[2px] w-11 rounded-full transition-all ${
      selected ? "bg-primary" : "bg-white"
    }`}
    onClick={onClick}
  />
);

export const MarketplaceCarousel = ({
  nftCollections,
  getCollectionConfig,
}: MarketplaceCarouselType) => {
  const autoplayOptions = {
    delay: 4000,
    rootNode: (emblaRoot: any) => emblaRoot.parentElement,
  };

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay(autoplayOptions),
  ]);

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);

  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi]
  );

  const onInit = useCallback((emblaApi: any) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: any) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  React.useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on("reInit", onInit);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  return (
    <div className="relative mx-auto max-w-[1280px]">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {nftCollections?.map((collection) => {
            const collectionConfig = getCollectionConfig(collection);
            return (
              <CarouselSlide
                key={collection}
                posterUrl={collectionConfig.poster_url}
                profileUrl={collectionConfig.profile_url}
                collectionName={collection}
                CollectionDescription={collectionConfig.description}
              />
            );
          })}
        </div>
      </div>
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 transform">
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            selected={index === selectedIndex}
            onClick={() => scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
};
