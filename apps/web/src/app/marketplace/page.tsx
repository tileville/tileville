"use client";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { useCallback, useState, useEffect, useMemo } from "react";
import { DropdownMenu } from "@radix-ui/themes";
import { NFTModal } from "@/components/NFTModal";
import { useNFTEntries } from "@/db/react-query-hooks";
import { MarketplaceLoading } from "@/components/Marketplace/maretplaceLoading";
import { Pagination } from "@/components/common/Pagination";
import { useFetchNFTSAlgolia } from "@/hooks/useFetchNFTSAlgolia";
import clsx from "clsx";
import { SORT_OPTIONS, TOGGLE_GROUP_OPTIONS } from "@/constants";
import { TraitsInfoBtn } from "@/components/Marketplace/TraitsInfoBtn";

export default function Marketplace() {
  const [selectedItem, setSelectedItem] =
    useState<string>("Price: High to Low");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeSearchTerm, setActiveSearchTerm] = useState<string>("");
  const [selectedToggle, setSelectedToggle] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [renderStyle, setRenderStyle] = useState(
    TOGGLE_GROUP_OPTIONS[0].gridApplyClass
  );

  const { data, isLoading, isError, error } = useNFTEntries({
    sortOrder,
    searchTerm: activeSearchTerm,
    currentPage,
  });
  const { mintNFTHitsResponse } = useFetchNFTSAlgolia({});

  const debouncedSearch = useMemo(() => {
    let timeoutId: NodeJS.Timeout;
    return (term: string) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setActiveSearchTerm(term);
        setCurrentPage(1);
      }, 300);
    };
  }, []); // Empty dependency array as this function doesn't depend on any props or state

  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm, debouncedSearch]);

  const handleSearchInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    },
    []
  );

  const handleSortChange = (selectedOption: string) => {
    setSelectedItem(selectedOption);
    if (selectedOption === "Price: Low to High") {
      setSortOrder("asc");
    } else if (selectedOption === "Price: High to Low") {
      setSortOrder("desc");
    }
  };

  if (isError) {
    return (
      <div className="py-40 text-center">
        Error: {(error as { message: string }).message}
      </div>
    );
  }

  return (
    <div className="relative p-4 pb-0 pt-12 md:pb-28 md:pt-20">
      <div className="mx-auto max-w-[1280px] pt-3">
        <div className="mb-8 flex flex-wrap gap-3">
          <ul className="grid w-fit grid-cols-3 overflow-hidden rounded-md">
            {TOGGLE_GROUP_OPTIONS.map((option) => {
              return (
                <li key={option.id}>
                  <button
                    className={`flex h-10 w-10 items-center justify-center hover:opacity-80 ${selectedToggle === option.id
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
          <div className="relative min-h-[40px] min-w-[200px] flex-1 overflow-hidden">
            <span className="text-primary-50 absolute left-3 top-1/2 -translate-y-1/2">
              <MagnifyingGlassIcon width={20} height={20} />
            </span>
            <input
              type="text"
              className="border-primary-30 h-full w-full rounded-md border bg-transparent pl-10 pr-2 font-medium outline-none placeholder:text-primary/30"
              placeholder="Search items"
              value={searchTerm}
              onChange={handleSearchInputChange}
            />
          </div>

          <div>
            <TraitsInfoBtn />
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
              {SORT_OPTIONS.map((option) => {
                return (
                  <DropdownMenu.Item
                    key={option.id}
                    onClick={() => handleSortChange(option.text)}
                    className={clsx(
                      "hover:bg-primary mt-1",
                      selectedItem === option.text
                        ? "bg-primary text-white"
                        : ""
                    )}
                  >
                    {option.text}
                  </DropdownMenu.Item>
                );
              })}
            </DropdownMenu.Content>

          </DropdownMenu.Root>
        </div>
        <div className="overflow-auto">
          {renderStyle === TOGGLE_GROUP_OPTIONS[2].gridApplyClass && (
            <div
              className={clsx({
                "list-header": true,
              })}
            >
              <div className="nft-item">Item</div>
              <div className="Last-sold">Last Sold</div>
              <div>Owner</div>
              <div>Listed Time</div>
              <div>Listed Price</div>
              <div>MINTED</div>
            </div>
          )}

          <div className="mb-16">
            {data?.nfts.length === 0 ? (
              <div className="py-36 text-center">
                <h2 className="text-center text-3xl font-semibold">
                  No Results Found
                </h2>
              </div>
            ) : (
              ""
            )}

            <div className={`${renderStyle} pr-2 text-lg`}>
              {isLoading ? (
                <MarketplaceLoading />
              ) : (
                <>
                  {data?.nfts.map((nft) => {
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
                        ownerAddress={nft.owner_address}
                        algoliaHitData={mintNFTHitsResponse.find(
                          ({ name }) => name === nft.name
                        )}
                      />
                    );
                  })}
                </>
              )}
            </div>
          </div>
        </div>

        <Pagination
          currentPage={currentPage}
          totalCount={data?.count || 0}
          onPageChange={(page) => {
            setCurrentPage(page);
          }}
        />
      </div>
    </div>
  );
}
