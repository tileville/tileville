"use client";

import { useNetworkStore } from "@/lib/stores/network";
import { Achievements } from "./Achievements";
import { Connections } from "./Connections";
import { ProfileBasicInfo } from "./ProfileBasicInfo";
import {
  useGetConnections,
  usePrivateProfile,
  usePublicProfile,
} from "@/db/react-query-hooks";
import { Connection } from "@/types";
import PublicProfileTabs from "./PublicProfileTabs";
import { useSearchParams } from "next/navigation";
import { ProfileBasicInfoPLaceholder } from "./Placeholders/ProfileBasicInfoPlaceholder";
import { ConnectionsPlaceholder } from "./Placeholders/ConnectionsPlaceholder";
import { useEffect, useState } from "react";
import EditProfileModalWrap from "./EditProfileModalWrap";
import { useAuthSignature } from "@/hooks/useAuthSignature";
import { LockClosedIcon } from "@radix-ui/react-icons";
import { PublicProfileTabsPlaceholder } from "./Placeholders/PublicProfileTabsPlaceholder";

export const PublicProfileContent = ({
  params = {
    handle: "",
  },
}: {
  params?: { handle: string };
}) => {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "collection";
  const networkStore = useNetworkStore();
  const [isProfileOwner, setIsProfileOwner] = useState(false);
  const { validateOrSetSignature, accountAuthSignature } = useAuthSignature();
  let isUserHasProfile;
  const {
    data: publicProfileData,
    isLoading: isPublicLoading,
    error: publicError,
  } = usePublicProfile(params.handle);

  const publicProfile = publicProfileData?.data;

  useEffect(() => {
    if (publicProfile?.wallet_address && networkStore.address) {
      setIsProfileOwner(publicProfile.wallet_address === networkStore.address);
    } else {
      setIsProfileOwner(false);
    }
  }, [publicProfile?.wallet_address, networkStore.address]);

  const shouldFetchPrivateData = Boolean(
    networkStore.address && accountAuthSignature && isProfileOwner
  );

  const { data: privateProfileData, isLoading: isPrivateLoading } =
    usePrivateProfile(
      shouldFetchPrivateData ? publicProfile?.wallet_address || "" : ""
    );

  const { data: connections, isLoading: connectionsLoading } =
    useGetConnections(publicProfile?.wallet_address || "");

  const {
    data: loggedInUserConnections,
    // isLoading: loggedInUserConnectionsLoading,
  } = useGetConnections(networkStore.address || "");

  const loggedInUserFollowing = new Set<string>(
    loggedInUserConnections?.following?.map(
      (f: Connection) => f.wallet_address
    ) || []
  );

  const loggedInUserFollowers = new Set<string>(
    loggedInUserConnections?.followers?.map(
      (f: Connection) => f.wallet_address
    ) || []
  );

  const profileData =
    shouldFetchPrivateData && privateProfileData?.data
      ? {
          ...publicProfile,
          ...privateProfileData.data,
          discord_username:
            privateProfileData.data.social_accounts?.discord.username ||
            publicProfile?.discord_username,
          telegram_username:
            privateProfileData.data.social_accounts?.telegram.username ||
            publicProfile?.telegram_username,
          twitter_username:
            privateProfileData.data.social_accounts?.twitter.username ||
            publicProfile?.twitter_username,
          email_address:
            privateProfileData.data.email_address.email ||
            publicProfile?.email_address,
        }
      : publicProfile;

  if (publicError) {
    return (
      <div className="flex min-h-screen items-center justify-center text-red-500">
        {publicError.message}
      </div>
    );
  }

  const isLoading =
    isPublicLoading || (shouldFetchPrivateData && isPrivateLoading);

  if (!isLoading && !profileData) {
    isUserHasProfile = false;
    // return (
    //   <div className="flex min-h-screen items-center justify-center">
    //     Profile not found
    //   </div>
    // );
  } else {
    isUserHasProfile = true;
  }

  return (
    <div>
      <div className="fade-slide-in p-4 pb-24 pt-12 md:pt-40">
        <div className="mx-auto max-w-[1280px] font-roboto">
          <div className="grid grid-cols-[repeat(24,minmax(0,1fr))] gap-3">
            {isUserHasProfile ? (
              <>
                <div className="relative col-[span_24_/_span_24] md:col-span-12 xl:col-[span_7_/_span_7]">
                  {isLoading ? (
                    <ProfileBasicInfoPLaceholder />
                  ) : (
                    <>
                      {isProfileOwner && accountAuthSignature && (
                        <EditProfileModalWrap
                          isUserHasProfile={isUserHasProfile}
                        />
                      )}

                      {networkStore.address && !accountAuthSignature && (
                        <button
                          className="badge-base-classes absolute right-3 top-3 z-10"
                          onClick={async () => {
                            await validateOrSetSignature();
                          }}
                        >
                          <span>Sign in</span>
                          <span className="text-white">
                            <LockClosedIcon />
                          </span>
                        </button>
                      )}

                      <ProfileBasicInfo
                        avatar_url={profileData?.avatar_url}
                        username={profileData?.username || ""}
                        fullName={profileData?.fullname || ""}
                        walletAddress={profileData?.wallet_address || ""}
                        followersCount={profileData?.followers?.length || 0}
                        followingCount={profileData?.following?.length || 0}
                        discordUsername={profileData?.discord_username || null}
                        telegramUsername={
                          profileData?.telegram_username || null
                        }
                        twitterUsername={profileData?.twitter_username || null}
                        isFollowing={loggedInUserFollowing.has(
                          profileData?.wallet_address || ""
                        )}
                        loggedInUserWalletAddress={networkStore.address || ""}
                        isProfileOwner={isProfileOwner}
                        emailAddress={profileData?.email_address || null}
                        loggedInUserFollowing={loggedInUserFollowing}
                        loggedInUserFollowers={loggedInUserFollowers}
                      />
                    </>
                  )}
                </div>

                <div className="col-[span_24_/_span_24] md:col-span-12 xl:col-[span_9_/_span_9]">
                  <Achievements
                    highestScore={profileData?.highest_score}
                    isPublicLoading={isPublicLoading}
                    totalGames={profileData?.total_games}
                    totalRewards={profileData?.total_rewards}
                    walletAddress={profileData?.wallet_address}
                  />
                </div>

                <div className="col-[span_24_/_span_24] grid gap-4 md:col-[span_12_/_span_12] xl:col-[span_8_/_span_8]">
                  {connectionsLoading ? (
                    <ConnectionsPlaceholder />
                  ) : (
                    <>
                      <Connections
                        loggedInUserWalletAddress={networkStore.address || ""}
                        loggedInUserFollowing={loggedInUserFollowing}
                        loggedInUserFollowers={loggedInUserFollowers}
                        isLoading={connectionsLoading}
                        following={connections?.following}
                        followers={connections?.followers}
                      />
                    </>
                  )}
                </div>
              </>
            ) : (
              <div className="relative col-[span_24_/_span_24]">
                <div className="flex flex-col items-center justify-center gap-4 rounded-xl bg-primary/10 p-6 text-center">
                  <div className="text-lg font-medium text-primary">
                    Create your profile to start tracking your achievements!
                  </div>
                  <EditProfileModalWrap isUserHasProfile={isUserHasProfile} />
                </div>
              </div>
            )}

            <div className="col-[span_24_/_span_24] xl:col-[span_17_/_span_17]">
              {isLoading ? (
                <PublicProfileTabsPlaceholder />
              ) : (
                <PublicProfileTabs
                  walletAddress={
                    isUserHasProfile
                      ? profileData?.wallet_address || ""
                      : networkStore.address
                  }
                  initialTab={initialTab}
                  username={profileData?.username || ""}
                  isProfileOwner={isProfileOwner}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
