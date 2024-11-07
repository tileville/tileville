"use client";

import { useNetworkStore } from "@/lib/stores/network";
import { Achievements } from "./Achievements";
import { Connections } from "./Connections";
import { ProfileBasicInfo } from "./ProfileBasicInfo";
import SearchFriendsModal from "../Modals/SearchFriendsModal/SearchFriendsModal";
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

  const {
    data: publicProfileData,
    isLoading: isPublicLoading,
    error: publicError,
  } = usePublicProfile(params.handle);

  const publicProfile = publicProfileData?.data;

  useEffect(() => {
    if (publicProfile?.wallet_address && networkStore.address) {
      setIsProfileOwner(publicProfile.wallet_address === networkStore.address);
    }
  }, [publicProfile?.wallet_address, networkStore.address]);

  const { data: privateProfileData, isLoading: isPrivateLoading } =
    usePrivateProfile(
      isProfileOwner ? publicProfile?.wallet_address || "" : ""
    );

  const { data: connections, isLoading: connectionsLoading } =
    useGetConnections(publicProfile?.wallet_address || "");

  const { data: loggedInUserConnections, isLoading: loggedInUserLoading } =
    useGetConnections(networkStore.address || "");

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

  const profileData = isProfileOwner
    ? {
        ...publicProfile,
        ...(privateProfileData?.data || {}),
        // Override social accounts with private data if available
        discord_username:
          privateProfileData?.data?.social_accounts?.discord.username ||
          publicProfile?.discord_username,
        telegram_username:
          privateProfileData?.data?.social_accounts?.telegram.username ||
          publicProfile?.telegram_username,
        twitter_username:
          privateProfileData?.data?.social_accounts?.twitter.username ||
          publicProfile?.twitter_username,
        email_address:
          privateProfileData?.data?.email_address.email ||
          publicProfile?.email_address,
      }
    : publicProfile;

  console.log("COMPLETE PROFILE DATA", profileData);

  if (publicError) {
    return (
      <div className="flex min-h-screen items-center justify-center text-red-500">
        {publicError.message}
      </div>
    );
  }

  const isLoading = isPublicLoading || (isProfileOwner && isPrivateLoading);

  if (!isLoading && !loggedInUserLoading && !profileData) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Profile not found
      </div>
    );
  }

  return (
    <div>
      <div className="fade-slide-in p-4 pb-24 pt-12 md:pt-40">
        <div className="mx-auto max-w-[1280px] font-roboto">
          <div className="grid grid-cols-[repeat(24,minmax(0,1fr))] gap-3">
            <div className="col-[span_24_/_span_24] md:col-span-12 xl:col-[span_7_/_span_7]">
              {isLoading || loggedInUserLoading ? (
                <ProfileBasicInfoPLaceholder />
              ) : (
                <>
                  <EditProfileModalWrap />
                  <ProfileBasicInfo
                    avatar_url={profileData?.avatar_url}
                    username={profileData?.username || ""}
                    fullName={profileData?.fullname || ""}
                    walletAddress={profileData?.wallet_address || ""}
                    followersCount={profileData?.followers?.length || 0}
                    followingCount={profileData?.following?.length || 0}
                    discordUsername={profileData?.discord_username || null}
                    telegramUsername={profileData?.telegram_username || null}
                    twitterUsername={profileData?.twitter_username || null}
                    isFollowing={loggedInUserFollowing.has(
                      profileData?.wallet_address || ""
                    )}
                    loggedInUserWalletAddress={networkStore.address || ""}
                    // isProfileOwner={isProfileOwner}
                    // emailAddress={profileData?.email_address || null}
                  />
                </>
              )}
            </div>

            <div className="col-[span_24_/_span_24] md:col-span-12 xl:col-[span_9_/_span_9]">
              <Achievements />
            </div>

            <div className="col-[span_24_/_span_24] grid gap-4 md:col-[span_12_/_span_12] xl:col-[span_8_/_span_8]">
              {loggedInUserLoading ? (
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
                  <SearchFriendsModal
                    walletAddress={networkStore.address || ""}
                    loggedInUserWalletAddress={networkStore.address || ""}
                    loggedInUserFollowing={loggedInUserFollowing}
                    loggedInUserFollowers={loggedInUserFollowers}
                  />
                </>
              )}
            </div>

            <div className="col-[span_24_/_span_24] xl:col-[span_17_/_span_17]">
              {isLoading ? (
                "Profile data loading..."
              ) : (
                <PublicProfileTabs
                  loggedInUserWalletAddress={networkStore.address || ""}
                  walletAddress={profileData?.wallet_address || ""}
                  initialTab={initialTab}
                  username={profileData?.username || ""}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
