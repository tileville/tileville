"use client";
import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
// import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";

const CarouselSlide = ({ imageUrl }: { imageUrl: string }) => (
  <div className="relative flex-[0_0_100%] text-white">
    <div
      className={`relative h-[200px] w-full overflow-hidden rounded-lg md:h-[418px]`}
    >
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/0 to-black/[0.73]"></div>
      <div className="relative z-10 flex h-full w-full items-end justify-between p-6">
        <div className="flex max-w-[313px] flex-col items-start gap-3 text-sm font-bold">
          <div className="h-[94] w-[94]">
            <Image
              src="https://oqymtqolwjujkayjyxdt.supabase.co/storage/v1/object/public/collection_images/tileville_profile.png"
              alt="Logo"
              width={94}
              height={94}
              className="h-full w-full object-cover"
            />
          </div>
          <h2 className="text-2xl font-extrabold">Tileville</h2>
          <p>
            TileVille is a strategic city-building game on the Mina blockchain,
            where players construct and manage their own cities on the island of
            Nicobar using hexagonal tiles.
          </p>
        </div>

        <div>
          <button className="rounded-lg bg-primary px-3 py-2 font-bold text-white hover:bg-primary/80">
            View Collection &gt;{" "}
          </button>
        </div>
      </div>
      <Image
        src={imageUrl}
        alt="Carousel"
        fill
        className="object-cover"
        priority
      />
    </div>
  </div>
);

// const CarouselButton = ({
//   direction,
//   onClick,
// }: {
//   direction: "left" | "right";
//   onClick: () => void;
// }) => (
//   <button
//     className="absolute top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-primary/80 text-white transition-all hover:scale-110 hover:bg-primary"
//     onClick={onClick}
//     style={{ [direction]: "1rem" }}
//   >
//     {direction === "left" ? (
//       <ChevronLeftIcon width={24} height={24} />
//     ) : (
//       <ChevronRightIcon width={24} height={24} />
//     )}
//   </button>
// );

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

export const MarketplaceCarousel = () => {
  const autoplayOptions = {
    delay: 4000,
    rootNode: (emblaRoot: any) => emblaRoot.parentElement,
  };

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay(autoplayOptions),
  ]);

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);

  // const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  // const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
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

  const slides = [
    "https://oqymtqolwjujkayjyxdt.supabase.co/storage/v1/object/public/collection_images/tileville_cover.jpeg?t=2025-01-10T13%3A09%3A55.259Z",
    "https://oqymtqolwjujkayjyxdt.supabase.co/storage/v1/object/public/collection_images/tileville_cover.jpeg?t=2025-01-10T13%3A09%3A55.259Z",
    "https://oqymtqolwjujkayjyxdt.supabase.co/storage/v1/object/public/collection_images/tileville_cover.jpeg?t=2025-01-10T13%3A09%3A55.259Z",
  ];

  return (
    <div className="relative mx-auto max-w-[1280px]">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, index) => (
            <CarouselSlide key={index} imageUrl={slide} />
          ))}
        </div>
      </div>

      {/* <CarouselButton direction="left" onClick={scrollPrev} />
      <CarouselButton direction="right" onClick={scrollNext} /> */}

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
