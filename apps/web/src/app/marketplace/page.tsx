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
  const toggleGroupOptions = [
    {
      iconSrc: "/icons/gridFour.svg",
      gridApplyClass:
        "grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6",
      id: 0,
    },

    {
      iconSrc: "/icons/gridEight.svg",
      gridApplyClass:
        "grid sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8",
      id: 1,
    },

    {
      iconSrc: "/icons/listThree.svg",
      gridApplyClass: "list-style",
      id: 2,
    },
  ];
  const [selectedToggle, setSelectedToggle] = useState(0);

  const [renderStyle, setRenderStyle] = useState(
    toggleGroupOptions[0].gridApplyClass
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
          <ul className="grid w-fit grid-cols-3 overflow-hidden rounded-md">
            {toggleGroupOptions.map((option) => {
              return (
                <li key={option.id}>
                  <button
                    className={`flex h-10 w-10 items-center justify-center hover:opacity-80 ${
                      selectedToggle === option.id
                        ? "bg-primary"
                        : "bg-primary/30"
                    }`}
                    onClick={() => {
                      setRenderStyle(option.gridApplyClass);
                      setSelectedToggle(option.id);
                    }}
                  >
                    <Image
                      src={option.iconSrc}
                      alt="grid"
                      width="20"
                      height="20"
                    />
                  </button>
                </li>
              );
            })}
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
        {renderStyle === "list-style" && (
          <div className="list-header">
            <div className="nft-item">Item</div>
            <div className="Last-sold">Last Sold</div>
            <div>Owner</div>
            <div>Listed Time</div>
            <div>Listed Price</div>
          </div>
        )}

        <div className="max-h-[calc(100vh-212px)] overflow-auto">
          <div className={`${renderStyle}  gap-4  pr-2 text-lg`}>
            {isLoading ? (
              <MarketplaceLoading />
            ) : (
              <>
                {data?.map((nft) => {
                  return (
                    <NFTModal
                      traits={nft.traits}
                      img_url={nft.img_url}
                      price={nft.price}
                      name={nft.name}
                      key={nft.nft_id}
                      nftID={nft.nft_id}
                      nftPrice={nft.price}
                      renderStyle={renderStyle}
                    />
                  );
                })}
              </>
            )}
          </div>
        </div>
      </div>

      {/* <MarketplaceOverlay /> */}
    </div>
  );
}
