"use client";
import React from "react";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { useCallback, useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { DropdownMenu } from "@radix-ui/themes";
import { NFTModal } from "@/components/NFTModal";
import { useNFTsWithPagination } from "@/db/react-query-hooks";
import { MarketplaceLoading } from "@/components/Marketplace/maretplaceLoading";
import { Pagination } from "@/components/common/Pagination";
import { useFetchNFTSAlgolia } from "@/hooks/useFetchNFTSAlgolia";
import clsx from "clsx";
import {
  NFT_COLLECTIONS,
  NFTCollectionType,
  SORT_OPTIONS,
  TOGGLE_GROUP_OPTIONS,
} from "@/constants";
import { TraitsInfoBtn } from "@/components/Marketplace/TraitsInfoBtn";
import CollectionSelector from "@/components/Marketplace/CollectionSelector";
import { useAtomValue } from "jotai";
import { globalConfigAtom } from "@/contexts/atoms";

export default function MarketplaceContent({
  collection,
  isMarketplaceV2,
}: {
  collection?: NFTCollectionType;
  isMarketplaceV2?: boolean;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [selectedItem, setSelectedItem] = useState(
    searchParams.get("sort") || "Price: High to Low"
  );

  const [sortOrder, setSortOrder] = useState<"asc" | "desc">(
    (searchParams.get("sortOrder") as "asc" | "desc") || "desc"
  );
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );
  const [selectedToggle, setSelectedToggle] = useState(
    Number(searchParams.get("view")) || 0
  );
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("page")) || 1
  );
  const [renderStyle, setRenderStyle] = useState(
    TOGGLE_GROUP_OPTIONS[selectedToggle].gridApplyClass
  );

  const [selectedCollection, setSelectedCollection] =
    useState<NFTCollectionType>(
      collection ||
        (searchParams.get("collection") as NFTCollectionType) ||
        NFT_COLLECTIONS.TILEVILLE
    );

  const [mintedFilter, setMintedFilter] = useState<string | null>(
    searchParams.get("mintedFilter") || null
  );

  const globalConfig = useAtomValue(globalConfigAtom);
  const collectionConfig =
    globalConfig?.nft_collections_config?.[selectedCollection] || {};
  const collectionTableName = collectionConfig.table_name;

  const {
    data: nftData,
    isLoading: isNFTLoading,
    error: nftError,
  } = useNFTsWithPagination({
    sortOrder,
    searchTerm,
    currentPage,
    collectionTableName,
    mintedFilter:
      selectedCollection === NFT_COLLECTIONS.ZEKO ? mintedFilter : null,
  });

  const { mintNFTHitsResponse } = useFetchNFTSAlgolia({
    queryText: selectedCollection,
  });

  const updateSearchParams = useCallback(
    (newParams: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(newParams).forEach(([key, value]) => {
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });
      router.push(`${pathname}?${params.toString()}`);
    },
    [searchParams, router, pathname]
  );

  const handleSearchInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newSearchTerm = event.target.value;
      setSearchTerm(newSearchTerm);
      updateSearchParams({ search: newSearchTerm, page: "1" });
    },
    [updateSearchParams]
  );

  const handleSortChange = useCallback(
    (selectedOption: string) => {
      setSelectedItem(selectedOption);

      if (selectedOption === "Show Minted NFTs") {
        setMintedFilter("true");
        updateSearchParams({
          sort: selectedOption,
          mintedFilter: "true",
          page: "1",
        });
        return;
      } else if (selectedOption === "Show Non-Minted NFTs") {
        setMintedFilter("false");
        updateSearchParams({
          sort: selectedOption,
          mintedFilter: "false",
          page: "1",
        });
        return;
      } else {
        const newSortOrder =
          selectedOption === "Price: Low to High" ? "asc" : "desc";
        setSortOrder(newSortOrder);
        setMintedFilter(null);
        updateSearchParams({
          sort: selectedOption,
          sortOrder: newSortOrder,
          mintedFilter: null,
          page: "1",
        });
      }
    },
    [updateSearchParams]
  );

  const handleCollectionChange = useCallback(
    (newCollection: NFTCollectionType) => {
      if (!collection) {
        // Only allow changing collection if no collection prop is provided
        setSelectedCollection(newCollection);

        if (newCollection !== NFT_COLLECTIONS.ZEKO) {
          setMintedFilter(null);
          updateSearchParams({
            collection: newCollection,
            page: "1",
            mintedFilter: null,
            sort: "Price: High to Low",
          });
        } else {
          updateSearchParams({ collection: newCollection, page: "1" });
        }
      }
    },
    [updateSearchParams, collection]
  );

  const handlePageChange = useCallback(
    (newPage: number) => {
      setCurrentPage(newPage);
      updateSearchParams({ page: newPage.toString() });
    },
    [updateSearchParams]
  );

  const handleViewChange = useCallback(
    (newToggle: number) => {
      setSelectedToggle(newToggle);
      const newRenderStyle = TOGGLE_GROUP_OPTIONS[newToggle].gridApplyClass;
      setRenderStyle(newRenderStyle);
      updateSearchParams({ view: newToggle.toString() });
    },
    [updateSearchParams]
  );

  useEffect(() => {
    // Sync state with URL params on initial load and when URL changes
    setSearchTerm(searchParams.get("search") || "");
    setSelectedItem(searchParams.get("sort") || "Price: High to Low");
    setSortOrder((searchParams.get("sortOrder") as "asc" | "desc") || "desc");
    setSelectedToggle(Number(searchParams.get("view")) || 0);
    setCurrentPage(Number(searchParams.get("page")) || 1);
    setSelectedCollection(
      collection ||
        (searchParams.get("collection") as NFTCollectionType) ||
        NFT_COLLECTIONS.TILEVILLE
    );
    setRenderStyle(
      TOGGLE_GROUP_OPTIONS[Number(searchParams.get("view")) || 0].gridApplyClass
    );
    setMintedFilter(searchParams.get("mintedFilter"));
  }, [searchParams, collection]);

  if (nftError) {
    return (
      <div className="py-36 text-center">
        <h2 className="text-center text-3xl font-semibold text-red-500">
          Error loading NFTs: {nftError.message || "An unknown error occurred"}
        </h2>
      </div>
    );
  }

  const getSortOptions = () => {
    if (selectedCollection === NFT_COLLECTIONS.ZEKO) {
      return [
        ...SORT_OPTIONS,
        { text: "Show Minted NFTs", id: 2 },
        { text: "Show Non-Minted NFTs", id: 3 },
      ];
    }
    return SORT_OPTIONS;
  };

  return (
    <div
      className={`relative ${
        isMarketplaceV2 ? "pt-0" : "p-4 pb-0 pt-12 md:pb-28 md:pt-20"
      }`}
    >
      <div className="mx-auto max-w-[1280px] pt-3">
        {/* Filters and controls */}
        <div className="mb-8 flex flex-wrap gap-3">
          {!isMarketplaceV2 && (
            <CollectionSelector
              selectedCollection={selectedCollection}
              onSelect={handleCollectionChange}
            />
          )}

          {/* View toggle buttons */}
          <ul className="grid w-fit grid-cols-3 overflow-hidden rounded-md">
            {TOGGLE_GROUP_OPTIONS.map((option) => (
              <li key={option.id}>
                <button
                  className={clsx(
                    "flex h-10 w-10 items-center justify-center hover:opacity-80",
                    selectedToggle === option.id
                      ? "bg-primary"
                      : "bg-primary/30"
                  )}
                  onClick={() => handleViewChange(option.id)}
                >
                  <Image
                    src={option.iconSrc}
                    alt="grid"
                    width={20}
                    height={20}
                  />
                </button>
              </li>
            ))}
          </ul>

          {/* Search input */}
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

          {selectedCollection === NFT_COLLECTIONS.TILEVILLE && (
            <TraitsInfoBtn />
          )}

          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <button className="border-primary-30 flex min-w-[190px] items-center justify-between rounded-md border bg-transparent px-3 font-semibold text-primary outline-none">
                <span>{selectedItem}</span>
                <Image
                  src="/icons/topBottomArrows.svg"
                  width={24}
                  height={24}
                  alt="arrows"
                />
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content className="min-w-[190px] !bg-transparent backdrop-blur-2xl">
              {getSortOptions().map((option) => (
                <DropdownMenu.Item
                  key={option.id}
                  onClick={() => handleSortChange(option.text)}
                  className={clsx(
                    "mt-1 hover:bg-primary",
                    selectedItem === option.text ? "bg-primary text-white" : ""
                  )}
                >
                  {option.text}
                </DropdownMenu.Item>
              ))}
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </div>

        {/* NFT list header (for list view) */}
        {renderStyle === TOGGLE_GROUP_OPTIONS[2].gridApplyClass && (
          <div className="list-header">
            <div className="nft-item">Item</div>
            <div className="Last-sold">Last Sold</div>
            <div>Owner</div>
            <div>Listed Time</div>
            <div>Listed Price</div>
            <div>MINTED</div>
          </div>
        )}

        {/* NFT grid */}
        <div className="mb-16">
          {nftData?.nfts.length === 0 && !isNFTLoading ? (
            <div className="py-36 text-center">
              <h2 className="text-center text-3xl font-semibold">
                No Results Found
              </h2>
            </div>
          ) : (
            ""
          )}

          <div className={`${renderStyle} pr-2 text-lg`}>
            {isNFTLoading ? (
              <MarketplaceLoading />
            ) : (
              <>
                {nftData?.nfts.map((nft: any) => {
                  return (
                    <NFTModal
                      key={nft.nft_id}
                      traits={nft.traits}
                      img_url={nft.img_url}
                      price={nft.price}
                      name={nft.name}
                      nftID={nft.nft_id}
                      nftPrice={nft.price}
                      renderStyle={renderStyle}
                      ownerAddress={nft.owner_address}
                      algoliaHitData={mintNFTHitsResponse.find(
                        ({ name }) => name === nft.name
                      )}
                      collection={selectedCollection}
                      NFTCategory={
                        selectedCollection === NFT_COLLECTIONS.MINATY
                          ? nft.category
                          : selectedCollection === NFT_COLLECTIONS.MINAPUNKS
                          ? nft.category
                          : null
                      }
                      nftDescription={nft?.description}
                      isPublicMint={nft.is_public_mint === false ? false : true}
                    />
                  );
                })}
              </>
            )}
          </div>
        </div>
      </div>

      {!isNFTLoading && (
        <Pagination
          currentPage={currentPage}
          totalCount={nftData?.count || 0}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
