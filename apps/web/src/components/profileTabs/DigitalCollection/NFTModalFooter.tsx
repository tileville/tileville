import { getMINANFTLink } from "@/lib/helpers";
import Link from "next/link";

type NFTModalFooterType = {
  externalUrl: string;
  nftHash: string;
  nftName: string;
  isOwner: boolean;
};

export const NFTModalFooter = ({
  externalUrl,
  nftHash,
  nftName,
  isOwner,
}: NFTModalFooterType) => {
  return (
    <div className="mt-4 space-y-3 text-sm">
      <Link
        href="/faq#tileville-builder-nfts"
        className="block text-primary hover:underline"
      >
        Learn more about the utility of TileVille NFTs
      </Link>
      {isOwner && (
        <>
          <div className="h-[1px] w-full bg-primary/30"></div>
          <div className="flex items-center space-x-2">
            <Link
              href={`https://minanft.io/@${nftName}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:bg-primary-dark inline-flex items-center rounded-full bg-primary px-3 py-1 text-white transition-colors"
            >
              Sell
            </Link>
            <span className="text-gray-500">or</span>
            <Link
              href="https://minanft.io/transfer"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:bg-primary-dark inline-flex items-center rounded-full bg-primary px-3 py-1 text-white transition-colors"
            >
              Transfer
            </Link>
            <span className="text-gray-500">on MINANFT</span>
          </div>
        </>
      )}

      <div className="h-[1px] w-full bg-primary/30"></div>
      <div className="flex space-x-4">
        <Link
          href={externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          See on MinaScan
        </Link>
        <Link
          href={getMINANFTLink(nftHash)}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          See on minanft.io
        </Link>
      </div>
    </div>
  );
};
