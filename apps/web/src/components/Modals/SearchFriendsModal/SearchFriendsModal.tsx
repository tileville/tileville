import React from "react";
import { Cross1Icon } from "@radix-ui/react-icons";
import { Dialog } from "@radix-ui/themes";
import Image from "next/image";
import { useGetAllUsers } from "@/db/react-query-hooks";
import { User } from "@/types";
import { UserListItem } from "@/components/PublicProfile/UserListItem";

type SearchFriendsModalProps = {
  walletAddress: string;
  loggedInUserWalletAddress: string;
  loggedInUserFollowing: Set<string>;
};

export default function SearchFriendsModal({
  walletAddress,
  loggedInUserWalletAddress,
  loggedInUserFollowing,
}: SearchFriendsModalProps) {
  const { data: users, isLoading, error } = useGetAllUsers(walletAddress);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading users</div>;

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
            className="w-full rounded-lg bg-[#748A5B] py-2 pl-10 pr-2 font-semibold outline outline-[#38830A] placeholder:text-[#90B27B]"
            placeholder="Enter name or username"
          />
        </div>

        <Dialog.Description>
          <span className="mb-4 block text-xl font-bold">Suggested people</span>
        </Dialog.Description>

        <ul className="flex flex-col gap-4">
          {users.map((user: User) => {
            return (
              <li key={user.username}>
                <UserListItem
                  userInfo={{
                    wallet_address: user.wallet_address,
                    avatar_url: user.avatar_url,
                    username: user.username,
                  }}
                  isFollowing={loggedInUserFollowing.has(user.wallet_address)}
                  loggedInUserWalletAddress={loggedInUserWalletAddress}
                />
              </li>
            );
          })}
        </ul>
        <Dialog.Close>
          <button className="absolute right-4 top-4">
            <Cross1Icon />
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Root>
  );
}
