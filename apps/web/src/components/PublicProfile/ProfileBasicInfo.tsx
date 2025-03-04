import { useState } from "react";
import { copyToClipBoard, formatAddress } from "@/lib/helpers";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import * as Tooltip from "@radix-ui/react-tooltip";
import { Skeleton } from "@radix-ui/themes";
import { CopyIcon } from "@radix-ui/react-icons";
import {
  useBlockberryBalance,
  useFollowUser,
  usePastCompetitions,
  useUnfollowUser,
} from "@/db/react-query-hooks";
import SearchFriendsModal from "../Modals/SearchFriendsModal/SearchFriendsModal";
import { Spinner2 } from "../common/Spinner";

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
  isProfileOwner: boolean;
  emailAddress: string;
  loggedInUserFollowing?: Set<string>;
  loggedInUserFollowers?: Set<string>;
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
  isProfileOwner,
  emailAddress,
  loggedInUserFollowing,
  loggedInUserFollowers,
}: ProfileBasicInfoType) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const followMutation = useFollowUser();
  const unfollowMutation = useUnfollowUser();

  const {
    data: BalanceData,
    isLoading: isFetchingBalance,
    error,
  } = useBlockberryBalance(walletAddress);

  const { data: pastCompetitions, isLoading: competitonsLoading } =
    usePastCompetitions(walletAddress);

  if (error) return <div>Error: {error.message}</div>;

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

  return (
    <div className="flex h-full w-full flex-col rounded-xl bg-primary/20 px-2 py-4 backdrop-blur-sm">
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
            <p className="text-xs text-[#747474]">@{username}</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="badge-base-classes">
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

            <div className="badge-base-classes">
              <span className="flex items-center gap-1">
                Balance :
                <span className="text-[#010201]">
                  {isFetchingBalance ? (
                    <Skeleton className="h-2 w-12" />
                  ) : (
                    `${(Number(BalanceData?.data?.balance) * 10 ** 9).toFixed(
                      2
                    )} MINA`
                  )}
                </span>
              </span>
            </div>
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
        {emailAddress && (
          <Tooltip.Provider delayDuration={200}>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <button
                  className="transition-all hover:scale-110"
                  onClick={() => {
                    copyToClipBoard({
                      toCopyContent: emailAddress,
                      copiedType: "Email address",
                    });
                  }}
                >
                  <Image
                    src="/icons/email.svg"
                    width={20}
                    height={20}
                    alt="x"
                  />
                </button>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content
                  className="max-w-[250px] rounded-[5px] bg-[#90AA70] px-1 py-[2px] text-[10px] text-[#435133] shadow-sm"
                  sideOffset={5}
                >
                  {emailAddress}
                  <Tooltip.Arrow className="TooltipArrow" />
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </Tooltip.Provider>
        )}

        {discordUsername && (
          <Link
            target="_blank"
            href={`https://discord.com/users/${discordUsername}`}
            className="transition-all hover:scale-110"
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
            className="transition-all hover:scale-110"
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
            className="transition-all hover:scale-110"
          >
            <Image src="/icons/x.svg" width={20} height={20} alt="x" />
          </Link>
        )}
      </div>
      <div className="mb-3 mt-auto">
        {competitonsLoading ? (
          <div className="flex items-center justify-center p-3">
            <Spinner2 />
          </div>
        ) : !pastCompetitions?.competitions ||
          pastCompetitions.competitions.length <= 0 ? (
          <h3 className="mt-2 text-center text-xl font-semibold">
            No past games found
          </h3>
        ) : (
          <div>
            <h3 className="text-base font-bold text-[#435133]">Past Games</h3>
            <div className="flex max-w-full gap-3 overflow-auto overflow-y-hidden pb-2">
              {pastCompetitions?.competitions?.map((competition) => {
                return (
                  <div
                    key={competition.competitionKey}
                    className="group relative w-full min-w-[30%] flex-[0.33]"
                  >
                    <Link
                      href={`/leaderboard?competition=${competition.competitionKey}`}
                      className="block h-20 w-full rounded-[10px] shadow-[0px_4px_4px_0px_#00000040]"
                    >
                      <Image
                        className="h-full w-full rounded-[10px] object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                        width={100}
                        height={100}
                        src={competition.posterUrl}
                        alt={competition.posterUrl}
                      />
                      <div className="absolute inset-0 flex items-center justify-center rounded-[10px] bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <div className="translate-y-4 text-center text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                          <p className="text-xs font-semibold">
                            {competition.competitionName}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div className="mt-auto w-full">
        {!isProfileOwner ? (
          <button
            type="button"
            className={`${
              isFollowing ? "following-btn-lg" : "primary-button-styles-lg"
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
                <Spinner2 size={18} />
              </span>
            )}
          </button>
        ) : (
          <SearchFriendsModal
            walletAddress={walletAddress}
            loggedInUserWalletAddress={loggedInUserWalletAddress}
            loggedInUserFollowing={loggedInUserFollowing}
            loggedInUserFollowers={loggedInUserFollowers}
          />
        )}
      </div>
    </div>
  );
};
