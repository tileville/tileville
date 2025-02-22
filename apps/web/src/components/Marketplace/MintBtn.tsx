import * as Tooltip from "@radix-ui/react-tooltip";
import clsx from "clsx";
import { Spinner } from "../common/Spinner";
import { NFT_COLLECTIONS, NFTCollectionType } from "@/constants";
import { useFetchNFTSAlgolia } from "@/hooks/useFetchNFTSAlgolia";
import { PalladNotSupportedContent } from "./PalladNotSupportedContent";

type MintBtnType = {
  isMintingDisabled: boolean;
  mintLoading: boolean;
  isMintingStyledDisabled: boolean;
  btnText: string;
  handleMint: (nftId: number) => Promise<void>;
  nftID: number;
  collection: NFTCollectionType;
  currentUserAddress: string;
  isPublicMint: boolean;
  collectionOwner: string;
  maxMintsPerWallet?: number;
};

const hasCollectionNFTs = (nfts: Array<any>, collectionName: string) => {
  return nfts.filter((nft) =>
    nft.name.toLowerCase().includes(collectionName.toLowerCase())
  ).length;
};

export const MintBtn = ({
  isMintingDisabled,
  isMintingStyledDisabled,
  mintLoading,
  btnText,
  handleMint,
  nftID,
  collection,
  currentUserAddress,
  isPublicMint,
  collectionOwner,
  maxMintsPerWallet,
}: MintBtnType) => {
  const { mintNFTHitsResponse } = useFetchNFTSAlgolia({
    owner: currentUserAddress || "none",
  });

  console.log("mintNFTHitsResponse", mintNFTHitsResponse);
  // Check if user is collection owner
  const isOwner = currentUserAddress === collectionOwner;

  // Check if the current user is authorized to mint
  const isUnauthorizedMint = !isPublicMint && !isOwner;

  const isNotForSoldNFT =
    collection === NFT_COLLECTIONS.MINATY && nftID === 100;

  const checkMintLimit = () => {
    // Collection owner is exempt from mint limits
    if (isOwner) return false;

    // If maxMintsPerWallet is undefined, there is no limit
    if (!maxMintsPerWallet || !mintNFTHitsResponse || !collection) return false;

    const userNFTCount = hasCollectionNFTs(mintNFTHitsResponse, collection);
    return userNFTCount >= maxMintsPerWallet;
  };

  const hasReachedMintLimit = checkMintLimit();

  const isButtonDisabled =
    isMintingStyledDisabled ||
    isNotForSoldNFT ||
    isUnauthorizedMint ||
    (!isOwner && hasReachedMintLimit);

  const getDisplayText = () => {
    if (isUnauthorizedMint) return "Only Owner Can Mint";
    if (hasReachedMintLimit) {
      return `Max ${maxMintsPerWallet} NFTs Per Wallet`;
    }
    return btnText;
  };

  return (
    <Tooltip.Provider delayDuration={100}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button
            className={clsx({
              "relative h-10 rounded-md border-primary px-5 py-2 text-sm font-medium text-white focus-visible:outline-none disabled:cursor-not-allowed":
                true,
              "bg-[#a3b2a0] disabled:bg-[#a3b2a0] disabled:hover:bg-[#a3b2a0]":
                isButtonDisabled,
              "bg-primary hover:bg-primary/80 disabled:bg-primary/80 disabled:hover:bg-primary/80":
                !isMintingDisabled,
            })}
            onClick={() => handleMint(nftID)}
            disabled={isButtonDisabled}
          >
            {mintLoading && (
              <span className="absolute right-1/2 top-[5px] w-5 -translate-x-16">
                <Spinner />
              </span>
            )}
            {getDisplayText()}
          </button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          {(window.mina?.isPallad ||
            isUnauthorizedMint ||
            hasReachedMintLimit) && (
            <Tooltip.Content
              className="gradient-bg max-w-[350px] rounded-xl px-3 py-2 shadow-sm"
              sideOffset={5}
            >
              {isUnauthorizedMint ? (
                <div className="max-w-md">
                  <p className="mb-2 font-bold">
                    This NFT is currently only available for minting by the
                    collection owner.
                  </p>
                </div>
              ) : hasReachedMintLimit ? (
                <div className="max-w-md">
                  <p className="mb-2 font-bold">
                    You have reached the maximum number of NFTs allowed for this
                    collection.
                  </p>
                </div>
              ) : (
                <PalladNotSupportedContent />
              )}
              <Tooltip.Arrow className="TooltipArrow" />
            </Tooltip.Content>
          )}
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};
