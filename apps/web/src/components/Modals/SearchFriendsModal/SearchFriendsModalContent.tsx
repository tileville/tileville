import { Spinner2 } from "@/components/common/Spinner";
import { UserListItem } from "@/components/PublicProfile/UserListItem";
import { useGetAllUsers } from "@/db/react-query-hooks";
import { User } from "@/types";
import { Cross1Icon } from "@radix-ui/react-icons";
import Image from "next/image";
import { useCallback, useState } from "react";
import { useDebounce } from "react-use";

type SearchFriendsModalContentProps = {
  walletAddress?: string;
  loggedInUserWalletAddress: string;
  loggedInUserFollowing: Set<string>;
  loggedInUserFollowers: Set<string>;
};

export const SearchFriendsModalContent = ({
  walletAddress,
  loggedInUserWalletAddress,
  loggedInUserFollowing,
  loggedInUserFollowers,
}: SearchFriendsModalContentProps) => {
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
    walletAddress || "all",
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
          <Spinner2 />
        </div>
      );
    }

    if (!users.length) {
      return (
        <div className="flex min-h-[400px] items-center justify-center text-center">
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
      <ul className="flex max-h-[400px] flex-col gap-4 overflow-y-auto pr-1">
        {users.map((user: User) => (
          <li key={user.username}>
            <UserListItem
              userInfo={user}
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
    <>
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

      <div className="mb-4 flex items-center justify-between">
        <span className="text-xl font-bold">
          {debouncedQuery
            ? `Search Results (${users.length})`
            : "Suggested people"}
        </span>
        {isSearching && (
          <span className="flex items-center gap-2 text-sm">
            <Spinner2 /> Searching...
          </span>
        )}
      </div>

      {renderContent()}
    </>
  );
};
