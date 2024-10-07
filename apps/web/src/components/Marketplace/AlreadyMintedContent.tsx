import {
  formatAddress,
  getMINANFTLink,
  getMINAScanAccountLink,
} from "@/lib/helpers";
import Link from "next/link";

type AlreadyMintedContentType = {
  ownerAddress: string;
  minaScanURL: string;
  nftHash: string;
};

export const AlreadyMintedContent = ({
  ownerAddress,
  minaScanURL,
  nftHash,
}: AlreadyMintedContentType) => {
  return (
    <div className="flex justify-between gap-1 text-sm">
      <p className="font-semibold text-primary">
        Owned by{" "}
        <Link
          target="_blank"
          href={getMINAScanAccountLink(ownerAddress)}
          className="underline hover:no-underline"
        >
          {formatAddress(ownerAddress)}
        </Link>
      </p>

      <Link
        target="_blank"
        href={minaScanURL}
        className="font-semibold text-primary underline hover:no-underline"
      >
        See on MinaScan
      </Link>
      <Link
        target="_blank"
        href={getMINANFTLink(nftHash)}
        className="font-semibold text-primary underline hover:no-underline"
      >
        See on minanft.io
      </Link>
    </div>
  );
};
