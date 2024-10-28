"use client";

import { useNetworkStore } from "@/lib/stores/network";
import { Achievements } from "./Achievements";
import { Connections } from "./Connections";
import { ProfileBasicInfo } from "./ProfileBasicInfo";
import SearchFriendsModal from "../Modals/SearchFriendsModal/SearchFriendsModal";
import { useGetConnections } from "@/db/react-query-hooks";

export const PublicProfileContent = () => {
  const networkStore = useNetworkStore();

  const {
    data: connections,
    isLoading,
    error,
  } = useGetConnections(networkStore.address || "");

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

            <div className="col-span-12 md:col-span-6 grid gap-4 xl:col-span-4">
              <Connections
                walletAddress={networkStore.address || ""}
                isLoading={isLoading}
                following={connections?.following}
                followers={connections?.followers}
              />
              <SearchFriendsModal
                walletAddress={networkStore.address || ""}
                following={connections?.following}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
