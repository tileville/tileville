import React, { useState } from "react";
import { Cross1Icon } from "@radix-ui/react-icons";
import { Dialog } from "@radix-ui/themes";
import Image from "next/image";
import { useFollowUser, useGetAllUsers } from "@/db/react-query-hooks";
import toast from "react-hot-toast";

type SearchFriendsModalProps = {
  walletAddress: string;
};

export default function SearchFriendsModal({
  walletAddress,
}: SearchFriendsModalProps) {
  const { data: users, isLoading, error } = useGetAllUsers(walletAddress);

  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>(
    {}
  );

  const followMutation = useFollowUser();

  const handleFollow = async (targetWallet: string) => {
    if (!walletAddress) {
      toast.error("Please connect your wallet first");
      return;
    }

    setLoadingStates((prev) => ({ ...prev, [targetWallet]: true }));
    try {
      await followMutation.mutateAsync({
        follower_wallet: walletAddress,
        target_wallet: targetWallet,
      });

      toast.success("Successfully followed user");
    } catch (error: any) {
      toast.error(error.message || "Failed to follow user");
    } finally {
      setLoadingStates((prev) => ({ ...prev, [targetWallet]: false }));
    }
  };

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

      <Dialog.Content className="relative !max-w-[500px]" size="1">
        <Dialog.Title className="text-2xl font-bold">
          Search For Friends
        </Dialog.Title>

        <p>Suggested people based on your activity</p>
        <ul className="flex flex-col gap-4">
          {users.map((user: any) => {
            const isFollowingUser = loadingStates[user.wallet_address];
            return (
              <div key={user.username} className="flex items-center gap-4">
                <div>
                  <div className="h-[55px] w-[55px] flex-shrink-0 flex-grow-0 basis-auto rounded-full border-4 border-[#D3F49E]">
                    <Image
                      src={user.avatar_url}
                      width={200}
                      height={200}
                      alt="profile"
                      className="h-full w-full rounded-full object-cover"
                    />
                  </div>
                </div>
                <div>{user.username}</div>

                <div className="ms-auto">
                  <button
                    className="border border-black p-2"
                    onClick={() => handleFollow(user.wallet_address)}
                  >
                    Follow
                    {isFollowingUser && "...."}
                  </button>
                </div>
              </div>
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
