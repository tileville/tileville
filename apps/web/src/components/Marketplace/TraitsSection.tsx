import Link from "next/link";
import { TraitsInfoCard } from "./TraitsInfoCard";
import { MinatyTraitCard } from "./MinatyTraitCard";
import { Dialog } from "@radix-ui/themes";
import {
  ATTRIBUTES_DATA,
  AttributesDataType,
  NFTCollectionType,
  NFT_ATTRIBUTES,
  NFTCategory,
} from "@/constants";
import { Json } from "@/lib/database.types";

type TraitsSectionType = {
  traits: Json;
  collection: NFTCollectionType;
  category: NFTCategory | null;
};

export const TraitsSection = ({
  traits,
  collection,
  category,
}: TraitsSectionType) => {
  if (collection === "TILEVILLE") {
    const parsedTraits = Array.isArray(traits)
      ? traits.filter(
          (trait): trait is { key: string; value: string } =>
            typeof trait === "object" &&
            trait !== null &&
            "key" in trait &&
            "value" in trait
        )
      : Object.entries(traits || {}).map(([key, value]) => ({
          key,
          value: String(value),
        }));

    return (
      <div className="mt-4 rounded-md">
        <h3 className="mb-2 font-semibold">Traits</h3>
        <ul className="grid grid-cols-2 gap-2 text-center text-xs">
          {parsedTraits.map((trait) => {
            const attributeData =
              ATTRIBUTES_DATA[trait.key as keyof AttributesDataType];
            if (!attributeData) return null;

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
  }

  // Handle Minaty Collection
  if (collection === "MINATY" && category && category in NFT_ATTRIBUTES) {
    const categoryData =
      NFT_ATTRIBUTES[category as keyof typeof NFT_ATTRIBUTES];

    return (
      <div className="mt-4 space-y-6">
        <div className="space-y-4">
          <h3 className="font-semibold">About {category}</h3>
          <p className="text-sm leading-relaxed text-gray-700">
            {categoryData.description}
          </p>

          {/* Unique Features if available */}
          {"uniqueFeatures" in categoryData && categoryData.uniqueFeatures && (
            <div className="space-y-2">
              <h4 className="font-medium">Unique Features</h4>
              <ul className="list-inside list-disc space-y-1 text-sm text-gray-600">
                {categoryData.uniqueFeatures.map(
                  (feature: string, index: number) => (
                    <li key={index}>{feature}</li>
                  )
                )}
              </ul>
            </div>
          )}

          {/* Design Philosophy if available */}
          {"designPhilosophy" in categoryData &&
            categoryData.designPhilosophy && (
              <div className="rounded-lg bg-primary/5 p-4">
                <p className="text-sm italic text-gray-700">
                  {categoryData.designPhilosophy}
                </p>
              </div>
            )}
        </div>
        {/* Traits */}
        <div>
          <h3 className="mb-4 font-semibold">Traits</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {Object.entries(categoryData.traits).map(
              ([traitKey, traitData]) => (
                <MinatyTraitCard
                  key={traitKey}
                  traitKey={traitKey}
                  traitIcon={traitData.Icon}
                  traitValue={Object.keys(traitData.values)[0]}
                  description={traitData.description}
                  value={Object.values(traitData.values)[0]}
                />
              )
            )}
          </div>
        </div>

        {(("founderMessage" in categoryData && categoryData.founderMessage) ||
          ("designerMessage" in categoryData &&
            categoryData.designerMessage)) && (
          <div className="rounded-xl bg-primary/10 p-6">
            <p className="text-sm italic text-primary/80">
              {"founderMessage" in categoryData
                ? String(categoryData.founderMessage)
                : "designerMessage" in categoryData
                ? String(categoryData.designerMessage)
                : ""}
            </p>
          </div>
        )}
      </div>
    );
  }

  // Default case
  return (
    <div className="mt-4 rounded-md">
      <h3 className="mb-2 font-semibold">Traits</h3>
      <p className="text-gray-500">
        Select a specific collection to view traits
      </p>
    </div>
  );
};
