import Link from "next/link";
import { TraitsInfoCard } from "./TraitsInfoCard";
import { Dialog } from "@radix-ui/themes";
import {
  ATTRIBUTES_DATA,
  AttributesDataType,
  NFTCollectionType,
  NFT_ATTRIBUTES,
  NFTCategory,
  NFT_COLLECTIONS,
  MinaPunksCategory,
  MINAPUNKS_ATTRIBUTES,
} from "@/constants";
import { Json } from "@/lib/database.types";

type TraitsSectionType = {
  traits: Json;
  collection: NFTCollectionType;
  category: NFTCategory | null | MinaPunksCategory | undefined;
  nftDescription?: string;
};

type Trait = {
  key: string;
  value: string;
};

/**
 * Parse traits from various formats into a unified Trait array
 */
const parseTraits = (traits: Json): Trait[] => {
  if (!traits) return [];

  if (Array.isArray(traits)) {
    return traits.filter(
      (trait): trait is Trait =>
        typeof trait === "object" &&
        trait !== null &&
        "key" in trait &&
        "value" in trait &&
        typeof trait.key === "string" &&
        typeof trait.value === "string"
    );
  }

  if (typeof traits === "object" && traits !== null) {
    return Object.entries(traits).map(([key, value]) => ({
      key,
      value: String(value),
    }));
  }

  return [];
};

/**
 * Renders traits for TileVille collection
 */
const TileVilleTraits = ({ parsedTraits }: { parsedTraits: Trait[] }) => (
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

/**
 * Renders traits for Minaty collection
 */
const MinatyTraits = ({
  parsedTraits,
  category,
  nftDescription,
}: {
  parsedTraits: Trait[];
  category: NFTCategory;
  nftDescription?: string;
}) => {
  const categoryData = NFT_ATTRIBUTES[category as keyof typeof NFT_ATTRIBUTES];

  return (
    <div className="mt-4 space-y-6">
      <div className="space-y-4">
        {nftDescription ? (
          <p className="text-sm leading-relaxed text-gray-700">
            {nftDescription}
          </p>
        ) : (
          <>
            <h3 className="font-semibold">About {category}</h3>
            <p className="text-sm leading-relaxed text-gray-700">
              {categoryData.description}
            </p>
          </>
        )}
      </div>
      {/* Traits */}
      <div>
        <h3 className="mb-4 font-semibold">Traits</h3>
        <div className="">
          <ul className="grid grid-cols-1 gap-4 text-center text-xs md:grid-cols-2">
            {parsedTraits.map((trait) => (
              <li
                key={trait.key}
                className="relative flex flex-col items-center gap-2 rounded-md bg-white px-3 py-5"
              >
                <div className="flex items-center gap-2">
                  <span className="text-black/70">{trait.key}</span>
                </div>
                <div className="text-md font-semibold">{trait.value}</div>
              </li>
            ))}
          </ul>
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
};

/**
 * Renders traits for MinaPunks collection
 */
const MinaPunksTraits = ({
  parsedTraits,
  category,
}: {
  parsedTraits: Trait[];
  category: MinaPunksCategory;
}) => (
  <div className="mt-4 space-y-6">
    {MINAPUNKS_ATTRIBUTES[category] && (
      <div className="space-y-4">
        <h3 className="font-semibold">About {category}</h3>
        <p className="text-sm leading-relaxed text-gray-700">
          {MINAPUNKS_ATTRIBUTES[category]?.description}
        </p>
      </div>
    )}

    {/* Traits */}
    <div>
      <h3 className="mb-4 font-semibold">Traits</h3>
      <div className="">
        <ul className="grid grid-cols-1 gap-4 text-center text-xs md:grid-cols-2">
          {parsedTraits.map((trait) => (
            <li
              key={trait.key}
              className="relative flex flex-col items-center gap-2 rounded-md bg-white px-3 py-5"
            >
              <div className="flex items-center gap-2">
                <span className="text-black/70">{trait.key}</span>
              </div>
              <div className="text-md font-semibold">{trait.value}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

/**
 * Default traits view when no specific collection is selected
 */
const DefaultTraits = () => (
  <div className="mt-4 rounded-md">
    <h3 className="mb-2 font-semibold">Traits</h3>
    <p className="text-gray-500">Select a specific collection to view traits</p>
  </div>
);

/**
 * Main TraitsSection component that renders the appropriate traits view
 * based on the collection and category
 */
export const TraitsSection = ({
  traits,
  collection,
  category,
  nftDescription,
}: TraitsSectionType) => {
  const parsedTraits = parseTraits(traits);

  // TileVille Collection
  if (collection === NFT_COLLECTIONS.TILEVILLE) {
    return <TileVilleTraits parsedTraits={parsedTraits} />;
  }

  // Minaty Collection
  if (
    collection === NFT_COLLECTIONS.MINATY &&
    category &&
    category in NFT_ATTRIBUTES
  ) {
    return (
      <MinatyTraits
        parsedTraits={parsedTraits}
        category={category as NFTCategory}
        nftDescription={nftDescription}
      />
    );
  }

  // MinaPunks Collection
  if (collection === NFT_COLLECTIONS.MINAPUNKS) {
    return (
      <MinaPunksTraits
        parsedTraits={parsedTraits}
        category={category as MinaPunksCategory}
      />
    );
  }

  // Default case
  return <DefaultTraits />;
};
