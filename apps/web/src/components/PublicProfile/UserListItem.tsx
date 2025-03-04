import { useFollowUser, useUnfollowUser } from "@/db/react-query-hooks";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { Spinner2 } from "../common/Spinner";
import { useAtomValue } from "jotai";
import { followLoadingAtom } from "@/contexts/atoms";

type UserInfo = {
  wallet_address: string;
  avatar_url: string;
  username: string;
  fullname: string;
};

type UserListItemProps = {
  userInfo: UserInfo;
  isFollowing: boolean;
  isFollowsYou: boolean;
  loggedInUserWalletAddress: string;
  className?: string;
};

export const UserListItem = ({
  userInfo,
  isFollowing,
  isFollowsYou,
  loggedInUserWalletAddress,
  className = "",
}: UserListItemProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const isFollowLoading = useAtomValue(followLoadingAtom);

  const followMutation = useFollowUser();
  const unfollowMutation = useUnfollowUser();

  const isCurrentUser = loggedInUserWalletAddress === userInfo.wallet_address;

  const getButtonText = () => {
    if (isFollowing) {
      return isHovered ? "Unfollow" : "Following";
    }
    return "Follow";
  };

  const handleFollowAction = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (!loggedInUserWalletAddress) {
      toast.error("Please connect your wallet first");
      return;
    }

    setIsLoading(true);
    try {
      const mutationParams = {
        follower_wallet: loggedInUserWalletAddress,
        target_wallet: userInfo.wallet_address,
      };

      if (isFollowing) {
        await unfollowMutation.mutateAsync(mutationParams);
        toast.success("Successfully unfollowed user");
      } else {
        await followMutation.mutateAsync(mutationParams);
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

  return (
    <Link href={`/u/${userInfo.username}`} className={className}>
      <div className="flex items-center gap-2 md:gap-4">
        {/* User Avatar */}
        <div className="h-[30px] w-[30px] flex-shrink-0 flex-grow-0 basis-auto rounded-full border-2 border-[#D3F49E] md:h-[50px] md:w-[50px] md:border-4">
          <Image
            src={userInfo.avatar_url}
            width={200}
            height={200}
            alt="profile"
            className="h-full w-full rounded-full object-cover"
          />
        </div>

        {/* User Info */}
        <div>
          <p className="text-base md:text-xl">{userInfo.fullname}</p>
          <div className="flex items-center gap-1">
            <p className="text-[10px] text-[#626262] md:text-xs">
              @{userInfo.username}
            </p>
            {isFollowsYou && (
              <span className="block rounded-[2px] bg-[#A5BC8B] px-1 py-[1px] text-[10px] text-primary md:text-xs">
                follows you
              </span>
            )}
          </div>
        </div>

        {/* Follow/Unfollow Button */}
        {!isCurrentUser && (
          <button
            type="button"
            className={`${
              isFollowing ? "following-btn" : "primary-button-styles"
            } relative ms-auto`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleFollowAction}
            disabled={isFollowLoading}
            aria-label={isFollowing ? "Unfollow user" : "Follow user"}
          >
            {getButtonText()}

            {isLoading && (
              <span className="absolute right-4 top-1/2 -translate-y-1/2">
                <Spinner2 size={14} />
              </span>
            )}
          </button>
        )}
      </div>
    </Link>
  );
};
