"use client";
import React, { useCallback, useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { DropdownMenu } from "@radix-ui/themes";
import { useAtomValue } from "jotai";
import clsx from "clsx";

import { NFTModal } from "@/components/NFTModal";
import { MarketplaceLoading } from "@/components/Marketplace/maretplaceLoading";
import { Pagination } from "@/components/common/Pagination";
import { TraitsInfoBtn } from "@/components/Marketplace/TraitsInfoBtn";
import CollectionSelector from "@/components/Marketplace/CollectionSelector";
import { useNFTsWithPagination } from "@/db/react-query-hooks";
import { useFetchNFTSAlgolia } from "@/hooks/useFetchNFTSAlgolia";
import { globalConfigAtom } from "@/contexts/atoms";
import {
  NFT_COLLECTIONS,
  NFTCollectionType,
  SORT_OPTIONS,
  TOGGLE_GROUP_OPTIONS,
} from "@/constants";

const DEFAULT_SORT = "Price: High to Low";
const DEFAULT_SORT_ORDER = "desc";
const DEFAULT_PAGE = 1;
const DEFAULT_VIEW = 0;
const DEFAULT_COLLECTION = NFT_COLLECTIONS.TILEVILLE;

interface MarketplaceContentProps {
  collection?: NFTCollectionType;
  isMarketplaceV2?: boolean;
}

export default function MarketplaceContent({
  collection,
  isMarketplaceV2,
}: MarketplaceContentProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const globalConfig = useAtomValue(globalConfigAtom);

  // State management with URL params sync
  const [selectedItem, setSelectedItem] = useState(
    searchParams.get("sort") || DEFAULT_SORT
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">(
    (searchParams.get("sortOrder") as "asc" | "desc") || DEFAULT_SORT_ORDER
  );
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );
  const [selectedToggle, setSelectedToggle] = useState(
    Number(searchParams.get("view")) || DEFAULT_VIEW
  );
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("page")) || DEFAULT_PAGE
  );
  const [selectedCollection, setSelectedCollection] =
    useState<NFTCollectionType>(
      collection ||
        (searchParams.get("collection") as NFTCollectionType) ||
        DEFAULT_COLLECTION
    );
  const [renderStyle, setRenderStyle] = useState(
    TOGGLE_GROUP_OPTIONS[selectedToggle].gridApplyClass
  );

  // Collection configuration
  const collectionConfig =
    globalConfig?.nft_collections_config?.[selectedCollection] || {};
  const collectionTableName = collectionConfig.table_name;

  // Data fetching
  const {
    data: nftData,
    isLoading: isNFTLoading,
    error: nftError,
  } = useNFTsWithPagination({
    sortOrder,
    searchTerm,
    currentPage,
    collectionTableName,
  });

  const { mintNFTHitsResponse } = useFetchNFTSAlgolia({
    queryText: selectedCollection,
  });

  // URL param management
  const updateSearchParams = useCallback(
    (newParams: Record<string, string>) => {
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

  // Event handlers
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
      const newSortOrder =
        selectedOption === "Price: Low to High" ? "asc" : "desc";
      setSortOrder(newSortOrder);
      updateSearchParams({
        sort: selectedOption,
        sortOrder: newSortOrder,
        page: "1",
      });
    },
    [updateSearchParams]
  );

  const handleCollectionChange = useCallback(
    (newCollection: NFTCollectionType) => {
      if (!collection) {
        // Only allow changing collection if no collection prop is provided
        setSelectedCollection(newCollection);
        updateSearchParams({ collection: newCollection, page: "1" });
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

  // Sync state with URL params
  useEffect(() => {
    setSearchTerm(searchParams.get("search") || "");
    setSelectedItem(searchParams.get("sort") || DEFAULT_SORT);
    setSortOrder(
      (searchParams.get("sortOrder") as "asc" | "desc") || DEFAULT_SORT_ORDER
    );
    setSelectedToggle(Number(searchParams.get("view")) || DEFAULT_VIEW);
    setCurrentPage(Number(searchParams.get("page")) || DEFAULT_PAGE);
    setSelectedCollection(
      collection ||
        (searchParams.get("collection") as NFTCollectionType) ||
        DEFAULT_COLLECTION
    );
    setRenderStyle(
      TOGGLE_GROUP_OPTIONS[Number(searchParams.get("view")) || DEFAULT_VIEW]
        .gridApplyClass
    );
  }, [searchParams, collection]);

  // Error handling
  if (nftError) {
    return (
      <div className="py-36 text-center">
        <h2 className="text-center text-3xl font-semibold text-red-500">
          Error loading NFTs: {nftError.message || "An unknown error occurred"}
        </h2>
      </div>
    );
  }

  return (
    <div
      className={`relative ${
        isMarketplaceV2 ? "pt-0" : "p-4 pb-0 pt-12 md:pb-28 md:pt-20"
      }`}
    >
      <div className="mx-auto max-w-[1280px] pt-3">
        {/* Filters and controls */}
        <FilterControls
          isMarketplaceV2={isMarketplaceV2}
          selectedCollection={selectedCollection}
          handleCollectionChange={handleCollectionChange}
          selectedToggle={selectedToggle}
          handleViewChange={handleViewChange}
          searchTerm={searchTerm}
          handleSearchInputChange={handleSearchInputChange}
          selectedItem={selectedItem}
          handleSortChange={handleSortChange}
        />

        {/* NFT list header (for list view) */}
        {renderStyle === TOGGLE_GROUP_OPTIONS[2].gridApplyClass && (
          <ListViewHeader />
        )}

        {/* NFT grid */}
        <div className="mb-16">
          {!isNFTLoading && nftData?.nfts.length === 0 ? (
            <div className="py-36 text-center">
              <h2 className="text-center text-3xl font-semibold">
                No Results Found
              </h2>
            </div>
          ) : (
            <div className={`${renderStyle} pr-2 text-lg`}>
              {isNFTLoading ? (
                <MarketplaceLoading />
              ) : (
                <NFTGrid
                  nfts={nftData?.nfts || []}
                  renderStyle={renderStyle}
                  selectedCollection={selectedCollection}
                  mintNFTHitsResponse={mintNFTHitsResponse}
                />
              )}
            </div>
          )}
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

// Extracted components

interface FilterControlsProps {
  isMarketplaceV2?: boolean;
  selectedCollection: NFTCollectionType;
  handleCollectionChange: (collection: NFTCollectionType) => void;
  selectedToggle: number;
  handleViewChange: (toggle: number) => void;
  searchTerm: string;
  handleSearchInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedItem: string;
  handleSortChange: (option: string) => void;
}

function FilterControls({
  isMarketplaceV2,
  selectedCollection,
  handleCollectionChange,
  selectedToggle,
  handleViewChange,
  searchTerm,
  handleSearchInputChange,
  selectedItem,
  handleSortChange,
}: FilterControlsProps) {
  return (
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
                selectedToggle === option.id ? "bg-primary" : "bg-primary/30"
              )}
              onClick={() => handleViewChange(option.id)}
            >
              <Image src={option.iconSrc} alt="grid" width={20} height={20} />
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

      {selectedCollection === NFT_COLLECTIONS.TILEVILLE && <TraitsInfoBtn />}

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
          {SORT_OPTIONS.map((option) => (
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
  );
}

function ListViewHeader() {
  return (
    <div className="list-header">
      <div className="nft-item">Item</div>
      <div className="Last-sold">Last Sold</div>
      <div>Owner</div>
      <div>Listed Time</div>
      <div>Listed Price</div>
      <div>MINTED</div>
    </div>
  );
}

interface NFTGridProps {
  nfts: any[];
  renderStyle: string;
  selectedCollection: NFTCollectionType;
  mintNFTHitsResponse: any[];
}

function NFTGrid({
  nfts,
  renderStyle,
  selectedCollection,
  mintNFTHitsResponse,
}: NFTGridProps) {
  return (
    <>
      {nfts.map((nft: any) => (
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
      ))}
    </>
  );
}
