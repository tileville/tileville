import { FOLLOWING_BTN, PRIMARY_BUTTON_STYLES } from "@/constants";
import { useFollowUser, useUnfollowUser } from "@/db/react-query-hooks";
import { UpdateIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

type UserListItemType = {
  userInfo: {
    wallet_address: string;
    avatar_url: string;
    username: string;
  };
  isFollowing: boolean;
  loggedInUserWalletAddress: string;
  className?: string;
};

export const UserListItem = ({
  userInfo,
  isFollowing,
  loggedInUserWalletAddress,
  className = "",
}: UserListItemType) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const followMutation = useFollowUser();
  const unfollowMutation = useUnfollowUser();

  const handleFollowAction = async () => {
    if (!loggedInUserWalletAddress) {
      toast.error("Please connect your wallet first");
      return;
    }

    setIsLoading(true);
    try {
      if (isFollowing) {
        await unfollowMutation.mutateAsync({
          follower_wallet: loggedInUserWalletAddress,
          target_wallet: userInfo.wallet_address,
        });
        toast.success("Successfully unfollowed user");
      } else {
        await followMutation.mutateAsync({
          follower_wallet: loggedInUserWalletAddress,
          target_wallet: userInfo.wallet_address,
        });
        toast.success("Successfully followed user");
      }
    } catch (error: any) {
      toast.error(
        error.message || `Failed to ${isFollowing ? "unfollow" : "follow"} user`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const isCurrentUser = loggedInUserWalletAddress === userInfo.wallet_address;

  return (
    <Link href={`/u/${userInfo.wallet_address}`} className={className}>
      <div className="flex items-center gap-4">
        <div className="h-[50px] w-[50px] flex-shrink-0 flex-grow-0 basis-auto rounded-full border-4 border-[#D3F49E]">
          <Image
            src={userInfo.avatar_url}
            width={200}
            height={200}
            alt="profile"
            className="h-full w-full rounded-full object-cover"
          />
        </div>

        <p className="text-xl">{userInfo.username}</p>

        {!isCurrentUser && (
          <button
            type="button"
            className={`${
              isFollowing ? FOLLOWING_BTN : PRIMARY_BUTTON_STYLES
            } relative ms-auto`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={(e) => {
              e.preventDefault();
              handleFollowAction();
            }}
            disabled={isLoading}
          >
            {isFollowing ? (isHovered ? "Unfollow" : "Following") : "Follow"}

            {isLoading && (
              <span className="absolute right-4 top-1/2 -translate-y-1/2">
                <UpdateIcon className="animate-spin" />
              </span>
            )}
          </button>
        )}
      </div>
    </Link>
  );
};
