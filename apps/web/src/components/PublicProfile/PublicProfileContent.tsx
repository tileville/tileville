"use client";

import { useNetworkStore } from "@/lib/stores/network";
import { Achievements } from "./Achievements";
import { Connections } from "./Connections";
import { ProfileBasicInfo } from "./ProfileBasicInfo";

export const PublicProfileContent = () => {
  const networkStore = useNetworkStore();

  return (
    <div>
      <div className="fade-slide-in p-4 pb-24 pt-12 md:pt-40">
        <div className="mx-auto max-w-[1280px] font-roboto">
          <div className="grid grid-cols-12 gap-3">
            <ProfileBasicInfo />
            <Achievements />
            <Connections walletAddress={networkStore.address || ""} />
          </div>
        </div>
      </div>
    </div>
  );
};
