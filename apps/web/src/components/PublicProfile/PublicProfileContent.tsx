"use client";

import { useNetworkStore } from "@/lib/stores/network";
import { Achievements } from "./Achievements";
import { Connections } from "./Connections";
import { ProfileBasicInfo } from "./ProfileBasicInfo";
import SearchFriendsModal from "../Modals/SearchFriendsModal/SearchFriendsModal";
import { useGetConnections, usePublicProfile } from "@/db/react-query-hooks";
import { Spinner } from "../common/Spinner";
import { Connection } from "@/types";
import PublicProfileTabs from "./PublicProfileTabs";
import { useSearchParams } from "next/navigation";

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

  const {
    data: profileData,
    isLoading,
    error,
  } = usePublicProfile(params.handle);

  const profile = profileData?.data;

  const { data: connections, isLoading: connectionsLoading } =
    useGetConnections(profile?.wallet_address || "");

  const { data: loggedInUserConnections, isLoading: loggedInUserLoading } =
    useGetConnections(networkStore.address || "");

  const loggedInUserFollowing = new Set<string>(
    loggedInUserConnections?.following?.map(
      (f: Connection) => f.wallet_address
    ) || []
  );

  if (isLoading || loggedInUserLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center text-red-500">
        {error.message}
      </div>
    );
  }

  if (!profile) {
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
              <ProfileBasicInfo
                avatar_url={profile.avatar_url}
                username={profile.username || ""}
                fullName={profile.fullname || ""}
                walletAddress={profile.wallet_address || ""}
                followersCount={profile.followers?.length || 0}
                followingCount={profile.following?.length || 0}
                discordUsername={profile.discord_username || null}
                telegramUsername={profile.telegram_username || null}
                twitterUsername={profile.twitter_username || null}
                isFollowing={loggedInUserFollowing.has(profile.wallet_address)}
                loggedInUserWalletAddress={networkStore.address || ""}
              />
            </div>

            <div className="col-[span_24_/_span_24] md:col-span-12 xl:col-[span_9_/_span_9]">
              <Achievements />
            </div>

            <div className="col-[span_24_/_span_24] grid gap-4 md:col-[span_12_/_span_12] xl:col-[span_8_/_span_8]">
              <Connections
                loggedInUserWalletAddress={networkStore.address || ""}
                loggedInUserFollowing={loggedInUserFollowing}
                isLoading={connectionsLoading}
                following={connections?.following}
                followers={connections?.followers}
              />
              <SearchFriendsModal
                walletAddress={networkStore.address || ""}
                loggedInUserWalletAddress={networkStore.address || ""}
                loggedInUserFollowing={loggedInUserFollowing}
              />
            </div>

            <div className="col-[span_24_/_span_24] xl:col-[span_17_/_span_17]">
              <PublicProfileTabs
                loggedInUserWalletAddress={networkStore.address || ""}
                walletAddress={profile.wallet_address}
                initialTab={initialTab}
                username={profile.username || ""}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
