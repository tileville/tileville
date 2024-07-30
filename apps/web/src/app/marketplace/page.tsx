"use client";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { useCallback, useState } from "react";
import { DropdownMenu } from "@radix-ui/themes";
import { MarketplaceOverlay } from "@/components/Marketplace/marketplaceOverlay";
import { NFTModal } from "@/components/NFTModal";
import { useNFTEntries } from "@/db/react-query-hooks";
import { MarketplaceLoading } from "@/components/Marketplace/maretplaceLoading";

export default function Marketplace() {
  const [selectedItem, setSelectedItem] =
    useState<string>("Price: High to Low");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeSearchTerm, setActiveSearchTerm] = useState<string>("");
  const [renderStyle, setRenderStyle] = useState(
    "grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
  );

  const { data, isLoading, isError, error } = useNFTEntries(
    sortOrder,
    activeSearchTerm
  );

  const handleSearch = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        setActiveSearchTerm(searchTerm);
      }
    },
    [searchTerm]
  );

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTerm(event.target.value);
  };
  const options = [
    {
      text: "Price: High to Low",
      id: 0,
    },
    {
      text: "Price: Low to High",
      id: 1,
    },
    {
      text: "Recently Listed",
      id: 2,
    },
    {
      text: "Common to Rare",
      id: 3,
    },
    {
      text: "Rare to Common",
      id: 4,
    },
  ];

  const handleSortChange = (selectedOption: string) => {
    setSelectedItem(selectedOption);
    if (selectedOption === "Price: Low to High") {
      setSortOrder("asc");
    } else if (selectedOption === "Price: High to Low") {
      setSortOrder("desc");
    }
  };

  if (isError) {
    return <div>Error: {(error as { message: string }).message}</div>;
  }

  return (
    <div className="relative p-4 pt-20">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-8 flex gap-3">
          <ul className="grid w-fit grid-cols-3">
            <li>
              <button
                className="flex h-10 w-10 items-center justify-center rounded-l-md bg-primary hover:opacity-80"
                onClick={() => {
                  setRenderStyle(
                    "grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
                  );
                }}
              >
                <Image
                  src="/icons/gridFour.svg"
                  alt="grid"
                  width="20"
                  height="20"
                />
              </button>
            </li>
            <li>
              <button
                className="bg-primary-30 flex h-10 w-10 items-center justify-center hover:opacity-80"
                onClick={() => {
                  setRenderStyle(
                    "grid sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7"
                  );
                }}
              >
                <Image
                  src="/icons/gridEight.svg"
                  alt="grid"
                  width="20"
                  height="20"
                />
              </button>
            </li>
            <li>
              <button className="bg-primary-30 flex h-10 w-10 items-center justify-center rounded-r-md hover:opacity-80">
                <Image
                  src="/icons/listThree.svg"
                  alt="grid"
                  width="20"
                  height="20"
                />
              </button>
            </li>
          </ul>

          <div className="relative flex-1">
            <span className="text-primary-50 absolute left-3 top-1/2 -translate-y-1/2">
              <MagnifyingGlassIcon width={20} height={20} />
            </span>
            <input
              type="text"
              className="border-primary-30 h-full w-full rounded-md border bg-transparent pl-10 pr-2 font-medium outline-none placeholder:text-primary/30"
              placeholder="Search items"
              value={searchTerm}
              onChange={handleSearchInputChange}
              onKeyPress={handleSearch}
            />
          </div>

          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <button className="border-primary-30 flex min-w-[190px] items-center justify-between rounded-md border bg-transparent px-3 font-semibold text-primary outline-none">
                <span>{selectedItem}</span>
                <span>
                  <Image
                    src="icons/topBottomArrows.svg"
                    width={24}
                    height={24}
                    alt="arrows"
                  />
                </span>
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content className="min-w-[190px] !bg-transparent backdrop-blur-2xl">
              {options.map((option) => {
                return (
                  <DropdownMenu.Item
                    key={option.id}
                    onClick={() => handleSortChange(option.text)}
                    className="hover:bg-primary"
                  >
                    {option.text}
                  </DropdownMenu.Item>
                );
              })}
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </div>

        <div className={`${renderStyle} gap-4 text-lg `}>
          {isLoading ? (
            <MarketplaceLoading />
          ) : (
            <>
              {data?.map((nft) => {
                return (
                  <div
                    className="border-primary-30 group/item cursor-pointer overflow-hidden rounded-md"
                    key={nft.nft_id}
                  >
                    <div className="w-full overflow-hidden">
                      <Image
                        className="w-full transition-all group-hover/item:scale-110"
                        width="100"
                        height="200"
                        alt="NFT Image"
                        src={nft.img_url}
                        quality={100}
                      />
                    </div>

                    <div className="px-2 pt-3">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold">#{nft.nft_id}</p>
                        {/* <div className="rounded-md bg-primary px-3 py-[2px] text-white">
                      3888
                    </div> */}
                      </div>

                      <div className="mt-1 font-semibold">
                        {nft.price}
                        <span className="text-primary-50"> MINA</span>
                      </div>
                    </div>

                    <div className="opacity-0 transition-opacity group-hover/item:opacity-100">
                      <NFTModal
                        traits={nft.traits}
                        img_url={nft.img_url}
                        price={nft.price}
                        name={nft.name}
                      />
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>

      <MarketplaceOverlay />
    </div>
  );
}
