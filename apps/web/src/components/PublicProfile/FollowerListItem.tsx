import { PRIMARY_BUTTON_STYLES } from "@/constants";
import { useFollowUser } from "@/db/react-query-hooks";
import { UpdateIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

type FollowerListItemType = {
  followerWalletAddress: string;
  followerAvatarUrl: string;
  followerUsername: string;
  profileWalletAddress: string;
};

export const FollowerListItem = ({
  followerWalletAddress,
  followerAvatarUrl,
  followerUsername,
  profileWalletAddress,
}: FollowerListItemType) => {
  const [isLoading, setIsLoading] = useState(false);
  const followMutation = useFollowUser();

  const handleFollow = async (targetWallet: string) => {
    if (!profileWalletAddress) {
      toast.error("Please connect your wallet first");
      return;
    }

    setIsLoading(true);

    try {
      await followMutation.mutateAsync({
        follower_wallet: profileWalletAddress,
        target_wallet: targetWallet,
      });

      toast.success("Successfully followed user");
    } catch (error: any) {
      toast.error(error.message || "Failed to follow user");
    } finally {
      setIsLoading(false);
    }
  };

  const isCurrentUser = profileWalletAddress === followerWalletAddress;

  return (
    <Link href={`/u/${followerWalletAddress}`}>
      <div className="flex items-center gap-4">
        <div className="h-[40px] w-[40px] flex-shrink-0 flex-grow-0 basis-auto rounded-full border-4 border-[#D3F49E]">
          <Image
            src={followerAvatarUrl}
            width={200}
            height={200}
            alt="profile"
            className="h-full w-full rounded-full object-cover"
          />
        </div>

        <p className="text-xl">{followerUsername}</p>
        {!isCurrentUser && (
          <button
            className={`${PRIMARY_BUTTON_STYLES} relative ms-auto`}
            onClick={(e) => {
              e.preventDefault();
              handleFollow(followerWalletAddress);
            }}
            type="button"
          >
            Follow
            {isLoading && (
              <span className="absolute right-5 top-1/2 -translate-y-1/2">
                <UpdateIcon className="animate-spin" />
              </span>
            )}
          </button>
        )}
      </div>
    </Link>
  );
};
