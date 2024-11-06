import { FOLLOWING_BTN_LG, PRIMARY_BUTTON_STYLES_LG } from "@/constants";
import { useFollowUser, useUnfollowUser } from "@/db/react-query-hooks";
import { copyToClipBoard, formatAddress } from "@/lib/helpers";
import { CopyIcon, Pencil1Icon, UpdateIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

const BADGE_BASE_CLASSES =
  "flex items-center justify-center gap-1 whitespace-nowrap rounded-[5px] bg-primary/20 px-1 py-[1px] text-[10px] text-[#445137";

type ProfileBasicInfoType = {
  avatar_url: string | undefined;
  username: string;
  fullName: string;
  walletAddress: string;
  followersCount: number;
  followingCount: number;
  discordUsername: string | null;
  telegramUsername: string | null;
  twitterUsername: string | null;
  isFollowing: boolean;
  loggedInUserWalletAddress: string;
};

export const ProfileBasicInfo = ({
  avatar_url,
  username,
  fullName,
  walletAddress,
  followersCount,
  followingCount,
  discordUsername,
  telegramUsername,
  twitterUsername,
  isFollowing,
  loggedInUserWalletAddress,
}: ProfileBasicInfoType) => {
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
          target_wallet: walletAddress,
        });
        toast.success("Successfully unfollowed user");
      } else {
        await followMutation.mutateAsync({
          follower_wallet: loggedInUserWalletAddress,
          target_wallet: walletAddress,
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

  const isCurrentUser = loggedInUserWalletAddress === walletAddress;

  return (
    <div className="flex h-full w-full flex-col rounded-xl bg-primary/20 px-2 py-4 backdrop-blur-sm">
      {/* //TODO: don't remove below code it will come when users is the user himself */}
      {/* <div className="mb-8 flex justify-end">
        <button className={BADGE_BASE_CLASSES}>
          <span>Edit Profile</span>
          <span className="text-white">
            <Pencil1Icon />
          </span>
        </button>
      </div> */}

      <div className="mb-4 flex items-start gap-3">
        {avatar_url && (
          <div className="h-[100px] w-[100px] flex-shrink-0 flex-grow-0 basis-auto rounded-full border-4 border-[#D3F49E]">
            <Image
              src={avatar_url}
              width={200}
              height={200}
              alt="profile"
              className="h-full w-full rounded-full object-cover"
            />
          </div>
        )}

        <div className="flex flex-col gap-2">
          <div>
            <h2 className="text-2xl font-bold text-[#224D08]">{fullName}</h2>
            <p className="text-xs text-[#747474]">{username}</p>
          </div>

          <div className="flex items-center gap-3">
            <div className={BADGE_BASE_CLASSES}>
              <span>{formatAddress(walletAddress)}</span>
              <button
                onClick={() =>
                  copyToClipBoard({
                    toCopyContent: `${walletAddress}`,
                    copiedType: "Wallet Address",
                  })
                }
              >
                <CopyIcon width={12} height={12} />
              </button>
            </div>

            {/* //TODO: I think we will not show balance in the user public profile we are not saving it in db  */}
            {/* <div className={BADGE_BASE_CLASSES}>
              <span>
                Balance :<span className="text-[#010201]">200 MINA</span>
              </span>
            </div> */}
          </div>

          <div className="flex items-center justify-between gap-3 text-xs">
            <span>
              <span className="mr-1 text-base font-bold text-black">
                {followersCount}
              </span>
              followers
            </span>

            <span>
              <span className="mr-1 text-base font-bold text-black">
                {followingCount}
              </span>
              following
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        {discordUsername && (
          <Link
            target="_blank"
            href={`https://discord.com/users/${discordUsername}`}
          >
            <Image
              src="/icons/discord.svg"
              width={20}
              height={20}
              alt="discord"
            />
          </Link>
        )}

        {telegramUsername && (
          <Link
            target="_blank"
            href={`https://t.me/${telegramUsername.replace("@", "")}`}
          >
            <Image
              src="/icons/telegram.svg"
              width={20}
              height={20}
              alt="telegram"
            />
          </Link>
        )}

        {twitterUsername && (
          <Link
            target="_blank"
            href={`https://twitter.com/${twitterUsername.replace("@", "")}`}
          >
            <Image src="/icons/x.svg" width={20} height={20} alt="x" />
          </Link>
        )}
      </div>

      <div className="mt-auto w-full">
        {!isCurrentUser && (
          <button
            type="button"
            className={`${
              isFollowing ? FOLLOWING_BTN_LG : PRIMARY_BUTTON_STYLES_LG
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
    </div>
  );
};
