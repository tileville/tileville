import React, { useState, useCallback } from "react";
import { Cross1Icon, UpdateIcon } from "@radix-ui/react-icons";
import { Dialog } from "@radix-ui/themes";
import Image from "next/image";
import { useGetAllUsers } from "@/db/react-query-hooks";
import { User } from "@/types";
import { UserListItem } from "@/components/PublicProfile/UserListItem";
import { useDebounce } from "react-use";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  useDebounce(
    () => {
      setDebouncedQuery(searchQuery);
      setIsSearching(false);
    },
    500,
    [searchQuery]
  );

  const { data: users = [], isLoading } = useGetAllUsers(
    walletAddress ? walletAddress : "all",
    debouncedQuery
  );

  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(event.target.value);
      setIsSearching(true);
    },
    []
  );

  const handleClearSearch = useCallback(() => {
    setSearchQuery("");
    setDebouncedQuery("");
  }, []);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex min-h-[200px] items-center justify-center">
          <UpdateIcon className="h-6 w-6 animate-spin" />
        </div>
      );
    }

    if (users.length === 0) {
      return (
        <div className="flex min-h-[200px] items-center justify-center text-center">
          <div>
            <p className="text-lg font-medium">No users found</p>
            <p className="text-sm text-black/60">
              Try searching with a different name or username
            </p>
          </div>
        </div>
      );
    }

    return (
      <ul className="flex max-h-[400px] flex-col gap-4 overflow-y-auto">
        {users.map((user: User) => (
          <li key={user.username}>
            <UserListItem
              userInfo={{
                wallet_address: user.wallet_address,
                avatar_url: user.avatar_url,
                username: user.username,
                fullname: user.fullname,
              }}
              isFollowing={loggedInUserFollowing.has(user.wallet_address)}
              isFollowsYou={loggedInUserFollowers.has(user.wallet_address)}
              loggedInUserWalletAddress={loggedInUserWalletAddress}
            />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <div className="w-full rounded-xl bg-primary/20 p-6 text-xl text-black backdrop-blur-sm">
          <h3 className="mb-3 font-bold">Add Friends</h3>

          <div className="flex items-center gap-3">
            <div>
              <Image
                src="/icons/search.svg"
                width={20}
                height={20}
                alt="search"
              />
            </div>

            <p>Find Friends</p>
            <p className="ms-auto">&gt;</p>
          </div>
        </div>
      </Dialog.Trigger>

      <Dialog.Content
        className="relative !max-w-[500px] !bg-[#99B579] !p-8"
        size="1"
      >
        <Dialog.Title className="text-2xl font-bold">
          Search For Friends
        </Dialog.Title>

        <div className="relative mb-10 w-full">
          <div className="absolute left-2 top-1/2 -translate-y-1/2">
            <Image
              src="/icons/searchBordered.svg"
              width={20}
              height={20}
              alt="search"
            />
          </div>

          <input
            type="text"
            className="w-full rounded-lg bg-[#748A5B] py-2 pl-10 pr-8 font-semibold outline outline-[#38830A] placeholder:text-[#90B27B]"
            placeholder="Enter name or username"
            value={searchQuery}
            onChange={handleSearchChange}
            autoComplete="off"
          />

          {searchQuery && (
            <button
              onClick={handleClearSearch}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-white/80 hover:text-white"
            >
              <Cross1Icon width={16} height={16} />
            </button>
          )}
        </div>

        <Dialog.Description>
          <span className="mb-4 flex items-center justify-between">
            <span className="text-xl font-bold">
              {debouncedQuery
                ? `Search Results (${users.length})`
                : "Suggested people"}
            </span>
            {isSearching && (
              <span className="flex items-center gap-2 text-sm">
                <UpdateIcon className="animate-spin" /> Searching...
              </span>
            )}
          </span>
        </Dialog.Description>

        {renderContent()}

        <Dialog.Close>
          <button className="absolute right-4 top-4">
            <Cross1Icon />
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Root>
  );
}
