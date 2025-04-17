import * as Tooltip from "@radix-ui/react-tooltip";
import clsx from "clsx";
import { Spinner } from "../common/Spinner";
import { NFT_COLLECTIONS, NFTCollectionType } from "@/constants";
import { useFetchNFTSAlgolia } from "@/hooks/useFetchNFTSAlgolia";
import { PalladNotSupportedContent } from "./PalladNotSupportedContent";
import { useZekoMint } from "@/hooks/useZekoMint";

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
  nftName?: string;
  isNftRequested?: boolean;
  hasUserRequest?: boolean;
  hasCompletedRequest?: boolean;
  mintStatusLoading?: boolean;
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
  nftName,
  isNftRequested,
  hasUserRequest,
  hasCompletedRequest,
  mintStatusLoading,
}: MintBtnType) => {
  const { mintNFTHitsResponse } = useFetchNFTSAlgolia({
    owner: currentUserAddress || "none",
  });
  const { requestZekoMint, isLoading: zekoMintLoading } = useZekoMint();

  const isZeko = collection === NFT_COLLECTIONS.ZEKO;
  // console.log("IS ZEKO IN MINT BUTTON", isZeko);

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

  const handleZekoMint = async () => {
    if (!currentUserAddress || !nftName) return;

    await requestZekoMint({
      nft_id: nftID,
      nft_name: nftName,
      wallet_address: currentUserAddress,
    });
  };

  const isZekoMintDisabled =
    isZeko && (isNftRequested || hasUserRequest || hasCompletedRequest);

  const isButtonDisabled =
    isMintingStyledDisabled ||
    isNotForSoldNFT ||
    isUnauthorizedMint ||
    (!isOwner && hasReachedMintLimit) ||
    isZekoMintDisabled ||
    mintStatusLoading;

  const getDisplayText = () => {
    if (isZeko) {
      if (isNftRequested) return "Already Requested";
      if (hasCompletedRequest) return "You Already Own an NFT";
      if (hasUserRequest) return "You Have Pending Request";
      return "Request Mint";
    }

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
            onClick={isZeko ? handleZekoMint : () => handleMint(nftID)}
            disabled={isButtonDisabled || (isZeko && zekoMintLoading)}
          >
            {(mintLoading || zekoMintLoading) && (
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
            hasReachedMintLimit ||
            isZekoMintDisabled) && (
            <Tooltip.Content
              className="gradient-bg max-w-[350px] rounded-xl px-3 py-2 shadow-sm"
              sideOffset={5}
            >
              {isZekoMintDisabled ? (
                <div className="max-w-md">
                  {isNftRequested ? (
                    <p className="mb-2 font-bold">
                      This NFT has already been requested for minting by another
                      user.
                    </p>
                  ) : hasCompletedRequest ? (
                    <p className="mb-2 font-bold">
                      You already own a Zeko NFT. Only one Zeko NFT is allowed
                      per wallet.
                    </p>
                  ) : (
                    <p className="mb-2 font-bold">
                      You already have a pending mint request for a Zeko NFT.
                      You can only request one Zeko NFT at a time.
                    </p>
                  )}
                </div>
              ) : isUnauthorizedMint ? (
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
