import { Dialog, Flex } from "@radix-ui/themes";
import { ReactNode } from "react";
import Image from "next/image";
import {
  BoxIcon,
  CubeIcon,
  FileTextIcon,
  GlobeIcon,
  LightningBoltIcon,
  StarFilledIcon,
  ThickArrowUpIcon,
} from "@radix-ui/react-icons";
import { Json } from "@/lib/database.types"; // Import the Json type from your database types

type Trait = {
  key: string;
  value: string | number;
};

export const NFTModal = ({
  traits,
  img_url,
  price,
  name,
}: {
  traits: Json;
  img_url: string;
  price: ReactNode;
  name: string;
}) => {
  // Function to parse traits
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

  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger>
          <button className="w-full bg-primary/30 p-2 font-semibold text-white transition-colors hover:bg-primary">
            Connect Wallet
          </button>
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

                <button className="animated-button-v1 mx-auto w-full cursor-pointer whitespace-nowrap rounded-md border-2 border-primary bg-primary bg-opacity-30 py-2 text-center leading-none text-white disabled:cursor-not-allowed disabled:bg-primary/60">
                  Connect Wallet
                </button>

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
            <Dialog.Close>
              <button className="h-10 rounded-full border-primary bg-primary px-5 py-2 text-sm font-medium text-white hover:bg-primary/90">
                MINT
              </button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
};
