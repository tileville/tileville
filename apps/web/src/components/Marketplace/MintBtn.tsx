import * as Tooltip from "@radix-ui/react-tooltip";
import clsx from "clsx";
import { Spinner } from "../common/Spinner";
import {
  NFT_COLLECTIONS,
  NFTCollectionType,
  COLLECTION_MINT_RULES,
} from "@/constants";
import { useFetchNFTSAlgolia } from "@/hooks/useFetchNFTSAlgolia";

type MintBtnType = {
  isMintingDisabled: boolean;
  mintLoading: boolean;
  isMintingStyledDisabled: boolean;
  btnText: string;
  handleMint: (nftId: number) => Promise<void>;
  nftID: number;
  collection: NFTCollectionType;
  currentUserAddress: string;
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
}: MintBtnType) => {
  const { mintNFTHitsResponse } = useFetchNFTSAlgolia({
    owner: currentUserAddress || "none",
  });

  const isSpecialNFT = (nftID: number) => {
    const rules = COLLECTION_MINT_RULES[NFT_COLLECTIONS.MINATY]?.specialRules;
    return (
      rules &&
      nftID >= rules.nftRange.start &&
      nftID <= rules.nftRange.end &&
      collection === NFT_COLLECTIONS.MINATY
    );
  };

  const isUnauthorizedForSpecialNFT =
    isSpecialNFT(nftID) &&
    currentUserAddress !==
      COLLECTION_MINT_RULES[NFT_COLLECTIONS.MINATY].specialRules.address;

  const isNotForSoldNFT =
    collection === NFT_COLLECTIONS.MINATY && (nftID === 100 || nftID === 101);

  const checkMintLimit = () => {
    if (!mintNFTHitsResponse || !collection) return false;

    const rules =
      COLLECTION_MINT_RULES[collection as keyof typeof COLLECTION_MINT_RULES];
    if (!rules) return false;

    const userNFTCount = hasCollectionNFTs(mintNFTHitsResponse, collection);
    return userNFTCount >= rules.maxMintsPerWallet;
  };

  const hasReachedMintLimit = checkMintLimit();

  const isButtonDisabled =
    isMintingStyledDisabled ||
    isNotForSoldNFT ||
    hasReachedMintLimit ||
    isUnauthorizedForSpecialNFT;

  const getDisplayText = () => {
    if (hasReachedMintLimit) {
      const rules =
        COLLECTION_MINT_RULES[collection as keyof typeof COLLECTION_MINT_RULES];
      return `Max ${rules?.maxMintsPerWallet} NFTs Per Wallet`;
    }
    if (isUnauthorizedForSpecialNFT) return "Not Authorized";
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
            hasReachedMintLimit ||
            isUnauthorizedForSpecialNFT) && (
            <Tooltip.Content
              className="gradient-bg max-w-[350px] rounded-xl px-3 py-2 shadow-sm"
              sideOffset={5}
            >
              {hasReachedMintLimit ? (
                <div className="max-w-md">
                  <p className="mb-2 font-bold">
                    You have reached the maximum number of NFTs allowed for this
                    collection.
                  </p>
                </div>
              ) : isUnauthorizedForSpecialNFT ? (
                <div className="max-w-md">
                  <p className="mb-2 font-bold">
                    This NFT can only be minted by the collection owner.
                  </p>
                </div>
              ) : (
                <div className="max-w-md">
                  <p className="mb-2 font-bold">
                    Pallad wallet is not supported yet. Please use Auro wallet
                    instead.
                  </p>
                  <ol className="mb-2 list-inside list-decimal text-sm">
                    <li>
                      Open a new tab and go to{" "}
                      <span className="rounded bg-gray-200 px-1 font-mono">
                        chrome://extensions
                      </span>
                    </li>
                    <li>
                      Find &quot;Pallad Wallet&quot; in your list of extensions
                    </li>
                    <li>Toggle the switch to disable it</li>
                  </ol>
                  <div className="mt-2 text-sm">
                    <a
                      href="https://chromewebstore.google.com/detail/auro-wallet/cnmamaachppnkjgnildpdmkaakejnhae"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      Get Auro Wallet
                    </a>
                  </div>
                </div>
              )}
              <Tooltip.Arrow className="TooltipArrow" />
            </Tooltip.Content>
          )}
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};
