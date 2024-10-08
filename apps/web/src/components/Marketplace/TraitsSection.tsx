import Link from "next/link";
import { TraitsInfoCard } from "./TraitsInfoCard";
import { Dialog } from "@radix-ui/themes";
import { ATTRIBUTES_DATA, AttributesDataType } from "@/constants";
import { Json } from "@/lib/database.types";

type TraitsSectionType = {
  traits: Json;
};

type Trait = {
  key: string;
  value: string | number;
};

export const TraitsSection = ({ traits }: TraitsSectionType) => {
  const parsedTraits = parseTraits(traits);

  return (
    <div className="mt-4 rounded-md">
      <h3 className="mb-2 font-semibold">Traits</h3>
      <ul className="grid grid-cols-2 gap-2 text-center text-xs">
        {parsedTraits.map((trait) => {
          const attributeData =
            ATTRIBUTES_DATA[trait.key as keyof AttributesDataType];
          return (
            <TraitsInfoCard
              key={trait.key}
              traitKey={trait.key}
              traitIcon={attributeData.Icon}
              traitValue={trait.value}
              description={attributeData.description}
              value={attributeData.values[trait.value]}
            />
          );
        })}
      </ul>
      <div className="pt-[0.5px]">
        <Dialog.Description>
          <Link
            href="/faq#tileville-builder-nfts"
            className="text-xs font-semibold text-primary underline hover:no-underline"
          >
            Learn more about the utility of TileVille NFTs
          </Link>
        </Dialog.Description>
      </div>
    </div>
  );
};

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
