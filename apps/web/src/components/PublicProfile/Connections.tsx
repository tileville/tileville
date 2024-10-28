"use client";
import { useFollowUser, useGetConnections } from "@/db/react-query-hooks";
import { formatAddress } from "@/lib/helpers";
import { Tabs } from "@radix-ui/themes";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { NoFriends } from "./NoFriends";
import { PRIMARY_BUTTON_STYLES } from "@/constants";

type ConnectionsType = {
  walletAddress: string;
  isLoading: boolean;
  following: string[];
  followers: string[];
};

export const Connections = ({
  walletAddress,
  isLoading,
  following,
  followers,
}: ConnectionsType) => {
  const followMutation = useFollowUser();
  const [isFollowLoading, setIsFollowLoading] = useState(false);

  const handleFollow = async (targetWallet: string) => {
    if (!walletAddress) {
      toast.error("Please connect your wallet first");
      return;
    }

    setIsFollowLoading(true);

    try {
      await followMutation.mutateAsync({
        follower_wallet: walletAddress,
        target_wallet: targetWallet,
      });

      toast.success("Successfully followed user");
    } catch (error: any) {
      toast.error(error.message || "Failed to follow user");
    } finally {
      setIsFollowLoading(false);
    }
  };

  return (
    <div className="w-full rounded-xl bg-primary/20 p-4 text-black backdrop-blur-sm">
      <Tabs.Root defaultValue="following">
        <Tabs.List className="mt-4 whitespace-nowrap">
          <Tabs.Trigger
            value="following"
            className="w-1/2 cursor-pointer rounded-md !pb-3 !text-xl text-black hover:bg-[#99B579]"
          >
            Following
          </Tabs.Trigger>
          <Tabs.Trigger
            value="followers"
            className="w-1/2 cursor-pointer rounded-md !pb-3 !text-xl text-black hover:bg-[#99B579]"
          >
            Followers
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="following">
          <div className="pt-3">
            <ul className="flex flex-col gap-1">
              {isLoading ? (
                "Loading please wait"
              ) : following.length <= 0 ? (
                <NoFriends />
              ) : (
                following.map((following: string) => {
                  return (
                    // TODO: just address is not enough we need to do something so that we can get the user's profile image and name
                    <li key={following}>
                      <div className="flex items-center gap-4">
                        <div className="h-[50px] w-[50px] flex-shrink-0 flex-grow-0 basis-auto rounded-full border-4 border-[#D3F49E]">
                          <Image
                            src="/img/avatars/1.jpeg"
                            width={200}
                            height={200}
                            alt="profile"
                            className="h-full w-full rounded-full object-cover"
                          />
                        </div>

                        <p className="text-xl">{formatAddress(following)}</p>
                        <button className={`${PRIMARY_BUTTON_STYLES} ms-auto`}>
                          Remove
                        </button>
                      </div>
                    </li>
                  );
                })
              )}
            </ul>
          </div>
        </Tabs.Content>
        <Tabs.Content value="followers">
          <div className="pt-3">
            <ul className="flex flex-col gap-1">
              {isLoading ? (
                "Loading please wait"
              ) : followers.length <= 0 ? (
                <li className="text-xm font-bold">
                  You do not have any followers yet!
                </li>
              ) : (
                followers.map((follower: string) => {
                  return (
                    <li key={follower}>
                      <div className="flex items-center gap-4">
                        <div className="h-[40px] w-[40px] flex-shrink-0 flex-grow-0 basis-auto rounded-full border-4 border-[#D3F49E]">
                          <Image
                            src="/img/avatars/1.jpeg"
                            width={200}
                            height={200}
                            alt="profile"
                            className="h-full w-full rounded-full object-cover"
                          />
                        </div>

                        <p className="text-xl">{formatAddress(follower)}</p>
                        <button
                          className={`${PRIMARY_BUTTON_STYLES} ms-auto`}
                          onClick={() => handleFollow(follower)}
                        >
                          Follow
                          {isFollowLoading && "loading..."}
                        </button>
                      </div>
                    </li>
                  );
                })
              )}
            </ul>
          </div>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
};
