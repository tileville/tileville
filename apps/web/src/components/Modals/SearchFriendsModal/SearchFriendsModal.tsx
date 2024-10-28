import React, { useState } from "react";
import { Cross1Icon } from "@radix-ui/react-icons";
import { Dialog } from "@radix-ui/themes";
import Image from "next/image";
import {
  useFollowUser,
  useGetAllUsers,
  useUnfollowUser,
} from "@/db/react-query-hooks";
import toast from "react-hot-toast";
import { UserListItem } from "./UserListItem";

type SearchFriendsModalProps = {
  walletAddress: string;
  following: string[];
};

export default function SearchFriendsModal({
  walletAddress,
  following = [],
}: SearchFriendsModalProps) {
  const { data: users, isLoading, error } = useGetAllUsers(walletAddress);

  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>(
    {}
  );

  const followMutation = useFollowUser();
  const unfollowMutation = useUnfollowUser();

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

  const handleUnfollow = async (targetWallet: string) => {
    if (!walletAddress) {
      toast.error("Please connect your wallet first");
      return;
    }

    setLoadingStates((prev) => ({ ...prev, [targetWallet]: true }));
    try {
      await unfollowMutation.mutateAsync({
        follower_wallet: walletAddress,
        target_wallet: targetWallet,
      });

      toast.success("Successfully unfollowed user");
    } catch (error: any) {
      toast.error(error.message || "Failed to unfollow user");
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

      <Dialog.Content
        className="relative !max-w-[500px] !bg-[#99B579]"
        size="1"
      >
        <Dialog.Title className="text-2xl font-bold">
          Search For Friends
        </Dialog.Title>

        <p>Suggested people based on your activity</p>
        <ul className="flex flex-col gap-4">
          {users.map((user: any) => {
            const isFollowing = following.includes(user.wallet_address);
            const isLoading = loadingStates[user.wallet_address];
            return (
              <UserListItem
                key={user.username}
                avatar_url={user.avatar_url}
                username={user.username}
                handleFollow={() => handleFollow(user.wallet_address)}
                handleUnfollow={() => handleUnfollow(user.wallet_address)}
                isLoading={isLoading}
                currentWalletAddress={walletAddress}
                userWalletAddress={user.wallet_address}
                isFollowing={isFollowing}
              />
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
