"use client";

import { useNetworkStore } from "@/lib/stores/network";
import { Achievements } from "./Achievements";
import { Connections } from "./Connections";
import { ProfileBasicInfo } from "./ProfileBasicInfo";
import SearchFriendsModal from "../Modals/SearchFriendsModal/SearchFriendsModal";
import { useGetConnections, usePublicProfile } from "@/db/react-query-hooks";

export const PublicProfileContent = ({
  params,
}: {
  params: { handle: string };
}) => {
  const networkStore = useNetworkStore();

  const { data: connections, isLoading: connectionsLoading } =
    useGetConnections(networkStore.address || "");

  const {
    data: profileData,
    isLoading,
    error,
  } = usePublicProfile(params.handle);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
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

  const profile = profileData.data;

  console.log("PUBLIC" , profile)

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
          <div className="grid grid-cols-12 gap-3">
            <div className="col-span-12 md:col-span-6 xl:col-span-3">
              <ProfileBasicInfo />
            </div>

            <div className="col-span-12 md:col-span-6 xl:col-span-5">
              <Achievements />
            </div>

            <div className="col-span-12 grid gap-4 md:col-span-6 xl:col-span-4">
              <Connections
                walletAddress={networkStore.address || ""}
                isLoading={connectionsLoading}
                following={connections?.following}
                followers={connections?.followers}
              />
              <SearchFriendsModal
                walletAddress={networkStore.address || ""}
                followingAddresses={profile?.following || []}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
