import Image from "next/image";

type NFTModalTriggerContentType = {
  nftImg: string;
  nftName: string;
};

export const NFTModalTriggerContent = ({
  nftImg,
  nftName,
}: NFTModalTriggerContentType) => {
  return (
    <div className="border-primary-30 group/item listItem fade-slide-in relative cursor-pointer overflow-hidden rounded-md transition-colors h-full">
      <div className="nft-img w-full overflow-hidden">
        <Image
          className="h-full w-full object-cover transition-all group-hover/item:scale-110"
          width={852}
          height={845}
          alt="NFT"
          src={nftImg}
          quality={100}
          priority={false}
          placeholder="blur"
          blurDataURL="/img/load/load.png"
        />
      </div>
      <div className="nft-content px-2 py-3">
        <div className="nft-content-info flex items-center justify-between">
          <p className="font-semibold">{nftName}</p>
        </div>
      </div>
    </div>
  );
};
