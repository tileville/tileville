import React from "react";
import { Cross1Icon } from "@radix-ui/react-icons";
import { Dialog } from "@radix-ui/themes";
import Image from "next/image";
import { SearchFriendsModalContent } from "./SearchFriendsModalContent";

type SearchFriendsModalProps = {
  walletAddress?: string;
  loggedInUserWalletAddress?: string;
  loggedInUserFollowing?: Set<string>;
  loggedInUserFollowers?: Set<string>;
};

export default function SearchFriendsModal({
  walletAddress = "",
  loggedInUserWalletAddress = "",
  loggedInUserFollowing = new Set(),
  loggedInUserFollowers = new Set(),
}: SearchFriendsModalProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <button className="primary-button-styles-lg flex items-center justify-center gap-3 rounded-[10px] transition-transform hover:scale-105">
          <span>
            <Image
              src="/icons/search.svg"
              width={20}
              height={20}
              alt="search"
            />
          </span>
          <Dialog.Description>
            <span>search friends</span>
          </Dialog.Description>
        </button>
      </Dialog.Trigger>

      <Dialog.Content
        className="relative !max-w-[500px] !bg-[#99B579] p-4 md:!p-8"
        size="1"
      >
        <Dialog.Title className="text-2xl font-bold">
          Search For Friends
        </Dialog.Title>
        <div className="min-h-[524px]">
          <SearchFriendsModalContent
            walletAddress={walletAddress}
            loggedInUserWalletAddress={loggedInUserWalletAddress}
            loggedInUserFollowing={loggedInUserFollowing}
            loggedInUserFollowers={loggedInUserFollowers}
          />
        </div>

        <Dialog.Close>
          <button className="absolute right-4 top-4">
            <Cross1Icon />
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Root>
  );
}
