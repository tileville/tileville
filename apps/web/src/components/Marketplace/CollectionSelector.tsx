import { DropdownMenu } from "@radix-ui/themes";
import { NFTCollectionType, NFT_COLLECTIONS } from "@/constants";
import Image from "next/image";

interface CollectionSelectorProps {
  selectedCollection: NFTCollectionType;
  onSelect: (collection: NFTCollectionType) => void;
}

const CollectionSelector: React.FC<CollectionSelectorProps> = ({
  selectedCollection,
  onSelect,
}) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <button className="border-primary-30 flex min-w-[190px] items-center justify-between rounded-md border bg-transparent px-3 font-semibold text-primary outline-none">
          <span>{selectedCollection}</span>
          <Image
            src="icons/topBottomArrows.svg"
            width={24}
            height={24}
            alt="arrows"
          />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className="min-w-[190px] !bg-transparent backdrop-blur-2xl">
        <DropdownMenu.Item
          key={NFT_COLLECTIONS.TILEVILLE}
          onClick={() => onSelect(NFT_COLLECTIONS.TILEVILLE)}
          className="hover:bg-primary"
        >
          Tileville
        </DropdownMenu.Item>
        <DropdownMenu.Item
          key={NFT_COLLECTIONS.MINATY}
          onClick={() => onSelect(NFT_COLLECTIONS.MINATY)}
          className="hover:bg-primary"
        >
          Minaty
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default CollectionSelector;
