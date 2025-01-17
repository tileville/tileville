import {
  formatAddress,
  getMINANFTLink,
  getMINAScanAccountLink,
} from "@/lib/helpers";
import Image from "next/image";
import Link from "next/link";
import { Spinner } from "../common/Spinner";

type NFTModalTriggerContentType = {
  imgUrl: string;
  nftName: string;
  isListStyle: boolean;
  isAlreadyMinted: boolean;
  ownerAddress: string;
  mintDate: string;
  nftPrice: number;
  isAvailableToPurchase: boolean;
  nftHash: string;
  isCurrentlyMiting: boolean;
  isView1?: boolean;
};

export const NFTModalTriggerContent = ({
  imgUrl,
  nftName,
  isListStyle,
  isAlreadyMinted,
  ownerAddress,
  mintDate,
  nftPrice,
  isAvailableToPurchase,
  nftHash,
  isCurrentlyMiting,
  isView1,
}: NFTModalTriggerContentType) => {
  return (
    <div className="border-primary-30 group/item listItem fade-slide-in relative h-full cursor-pointer overflow-hidden rounded-md transition-colors">
      <div className="nft-img w-full overflow-hidden">
        <div className={`${isView1 && "h-[270px]"} `}>
          <Image
            className="h-full w-full object-cover transition-all group-hover/item:scale-110"
            width="852"
            height="845"
            alt="NFT"
            src={imgUrl}
            quality={100}
            priority={false}
            placeholder="blur"
            blurDataURL="/img/load/load.png"
          />
        </div>
      </div>

      <div className="nft-content px-2 py-3">
        <div className="nft-content-info flex items-center justify-between">
          <p className="text-sm font-semibold">{nftName}</p>
        </div>

        {isListStyle && (
          <>
            <div>-</div>
            <div>
              {isAlreadyMinted ? (
                <Link
                  target="_blank"
                  href={getMINAScanAccountLink(ownerAddress)}
                  className="font-semibold text-primary underline hover:no-underline"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  {formatAddress(ownerAddress)}
                </Link>
              ) : (
                "-"
              )}
            </div>
            <div>{mintDate}</div>
          </>
        )}

        <div className="nft-price mt-1 flex items-center">
          <div className="font-semibold">
            {nftPrice}
            <span className="text-primary-50"> MINA</span>
          </div>
        </div>
        <div className="flex flex-col">
          {isAlreadyMinted && (
            <div className="mt-1 rounded-md bg-primary/30 p-1 text-center text-sm">
              Already Minted
            </div>
          )}

          {isAvailableToPurchase && (
            <div className="text-center">
              <Link
                target="_blank"
                href={getMINANFTLink(nftHash)}
                className="text-sm font-semibold text-primary underline hover:no-underline"
                onClick={(e) => e.stopPropagation()}
              >
                Buy on minanft
              </Link>
            </div>
          )}
        </div>

        {isCurrentlyMiting && (
          <div className="absolute bottom-4 right-4">
            <div className="flex items-center gap-2 font-semibold">
              <span>MINTING</span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                <Spinner />
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
