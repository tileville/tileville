import { Dialog, Flex } from "@radix-ui/themes";
import { ReactNode } from "react";
import Image from "next/image";
import {
  CubeIcon,
  FileTextIcon,
  GlobeIcon,
  LightningBoltIcon,
  StarFilledIcon,
  ThickArrowUpIcon,
} from "@radix-ui/react-icons";
import { Json } from "@/lib/database.types"; // Import the Json type from your database types
import { useNetworkStore, usePayNFTMintFee } from "@/lib/stores/network";

type Trait = {
  key: string;
  value: string | number;
};

export const NFTModal = ({
  traits,
  img_url,
  price,
  name,
  nftID,
  nftPrice,
  renderStyle,
  ownerAddress,
  txnHash,
}: {
  traits: Json;
  img_url: string;
  price: ReactNode;
  name: string;
  nftID: number;
  nftPrice: number;
  renderStyle: string;
  ownerAddress: string | null;
  txnHash: string | null;
}) => {
  // Function to parse traits
  const networkStore = useNetworkStore();
  const { payNFTMintFees } = usePayNFTMintFee();
  const parseTraits = (traits: Json): Trait[] => {
    if (Array.isArray(traits)) {
      return traits.filter(
        (trait): trait is Trait =>
          typeof trait === "object" &&
          trait !== null &&
          "key" in trait &&
          "value" in trait
      );
    } else if (typeof traits === "object" && traits !== null) {
      return Object.entries(traits).map(([key, value]) => ({
        key,
        value: String(value),
      }));
    }
    return [];
  };

  const parsedTraits = parseTraits(traits);

  const handleMint = async () => {
    //TODO: Handle loading state for mint button

    try {
      await payNFTMintFees({ nft_id: nftID, nft_price: nftPrice });
    } catch (error) {
      //TODO: Handle error with proper toast
    }
  };

  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger>
          <div className="border-primary-30 group/item listItem cursor-pointer overflow-hidden rounded-md">
            <div className="nft-img w-full overflow-hidden">
              <Image
                className="w-full transition-all group-hover/item:scale-110"
                width="100"
                height="200"
                alt="NFT Image"
                src={img_url}
                quality={100}
              />
            </div>

            <div className="nft-content px-2 pt-3">
              <div className="nft-content-info flex items-center justify-between">
                <p className="font-semibold">#{nftID}</p>
              </div>

              {renderStyle === "list-style" && (
                <>
                  <div>-</div>
                  <div>-</div>
                  <div>-</div>
                </>
              )}

              <div className="font-semibold">
                {nftPrice}
                <span className="text-primary-50"> MINA</span>
              </div>
            </div>
          </div>
        </Dialog.Trigger>

        <Dialog.Content className="!max-w-[1020px]">
          <Dialog.Title>
            <h1>{name}</h1>
          </Dialog.Title>
          <Dialog.Description size="2" mb="4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Image
                  src={img_url}
                  width={853}
                  height={845}
                  alt="img"
                  className="rounded-md"
                />
              </div>

              <div>
                <div className="mb-3">
                  Price:{" "}
                  <span>
                    <span className="text-lg font-semibold">{price}</span> MINA
                  </span>{" "}
                </div>

                <div className="mt-4 rounded-md bg-primary/30 p-4">
                  <h3 className="mb-2 text-xl font-semibold">Attributes</h3>
                  <ul className="grid grid-cols-2 gap-3 text-center">
                    {parsedTraits.map((trait, index) => (
                      <li
                        key={index}
                        className="relative flex flex-col items-center gap-2 rounded-md bg-white px-3 py-5"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-black/70">{trait.key}</span>

                          {trait.key === "sustainability_rating" && (
                            <span className="absolute left-2 top-2">
                              <StarFilledIcon />
                            </span>
                          )}

                          {trait.key === "efficiency_level" && (
                            <span className="absolute left-2 top-2">
                              <ThickArrowUpIcon />
                            </span>
                          )}

                          {trait.key === "environmental_affinity" && (
                            <span className="absolute left-2 top-2">
                              <GlobeIcon />
                            </span>
                          )}

                          {trait.key === "urban_planning_expertise" && (
                            <span className="absolute left-2 top-2">
                              <CubeIcon />
                            </span>
                          )}

                          {trait.key === "special_ability" && (
                            <span className="absolute left-2 top-2">
                              <LightningBoltIcon />
                            </span>
                          )}

                          {trait.key === "edition" && (
                            <span className="absolute left-2 top-2">
                              <FileTextIcon />
                            </span>
                          )}
                        </div>
                        <div className="text-lg font-semibold">
                          {trait.value}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Dialog.Description>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <button className="h-10 rounded-full border-primary bg-primary/30 px-5 py-2 text-sm font-medium hover:bg-primary/50">
                Cancel
              </button>
            </Dialog.Close>
            {/* <Dialog.Close> */}
            <button
              className="h-10 rounded-full border-primary bg-primary px-5 py-2 text-sm font-medium text-white hover:bg-primary/90"
              onClick={handleMint}
              disabled={ownerAddress !== null}
            >
              {!!networkStore.address ? "MINT" : "Connect Wallet"}
            </button>
            {/* </Dialog.Close> */}
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
};
