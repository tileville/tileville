import { FOLLOWING_BTN } from "@/constants";
import { useUnfollowUser } from "@/db/react-query-hooks";
import { UpdateIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

type FollowingBtnType = {
  followingWalletAddress: string;
  followingAvatarUrl: string;
  followingUsername: string;
  profileWalletAddress: string;
};

export const FollowingListItem = ({
  followingWalletAddress,
  followingAvatarUrl,
  followingUsername,
  profileWalletAddress,
}: FollowingBtnType) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const unfollowMutation = useUnfollowUser();

  const handleUnfollow = async (targetWallet: string) => {
    if (!profileWalletAddress) {
      toast.error("Please connect your wallet first");
      return;
    }

    setIsLoading(true);
    try {
      await unfollowMutation.mutateAsync({
        follower_wallet: profileWalletAddress,
        target_wallet: targetWallet,
      });

      toast.success("Successfully unfollowed user");
    } catch (error: any) {
      toast.error(error.message || "Failed to unfollow user");
    } finally {
      setIsLoading(false);
    }
  };

  const isCurrentUser = profileWalletAddress === followingWalletAddress;
  console.log("currentuser", isCurrentUser);
  console.log("profileWalletAddress", profileWalletAddress);
  console.log("followingWalletAddress", followingWalletAddress);
  return (
    <Link href={`/u/${followingWalletAddress}`}>
      <div className="flex items-center gap-4">
        <div className="h-[50px] w-[50px] flex-shrink-0 flex-grow-0 basis-auto rounded-full border-4 border-[#D3F49E]">
          <Image
            src={followingAvatarUrl}
            width={200}
            height={200}
            alt="profile"
            className="h-full w-full rounded-full object-cover"
          />
        </div>

        <p className="text-xl">{followingUsername}</p>

        {!isCurrentUser && (
          <button
            type="button"
            className={`${FOLLOWING_BTN} relative ms-auto`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={(e) => {
              e.preventDefault();
              handleUnfollow(followingWalletAddress);
            }}
          >
            {isHovered ? "Unfollow" : "Following"}

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
