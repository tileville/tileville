"use client";
import { useFollowUser } from "@/db/react-query-hooks";
import { Tabs } from "@radix-ui/themes";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { NoFriends } from "./NoFriends";
import { PRIMARY_BUTTON_STYLES } from "@/constants";
import { UpdateIcon } from "@radix-ui/react-icons";
import { Connection } from "@/types";

type ConnectionsType = {
  walletAddress: string;
  isLoading: boolean;
  following: Connection[];
  followers: Connection[];
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
                following.map((following: any) => {
                  return (
                    <li key={following.username}>
                      <div className="flex items-center gap-4">
                        <div className="h-[50px] w-[50px] flex-shrink-0 flex-grow-0 basis-auto rounded-full border-4 border-[#D3F49E]">
                          <Image
                            src={following.avatar_url}
                            width={200}
                            height={200}
                            alt="profile"
                            className="h-full w-full rounded-full object-cover"
                          />
                        </div>

                        <p className="text-xl">{following.username}</p>
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
                  User do not have any followers yet!
                </li>
              ) : (
                followers.map((follower: any) => {
                  return (
                    <li key={follower.username}>
                      <div className="flex items-center gap-4">
                        <div className="h-[40px] w-[40px] flex-shrink-0 flex-grow-0 basis-auto rounded-full border-4 border-[#D3F49E]">
                          <Image
                            src={follower.avatar_url}
                            width={200}
                            height={200}
                            alt="profile"
                            className="h-full w-full rounded-full object-cover"
                          />
                        </div>

                        <p className="text-xl">{follower.username}</p>
                        <button
                          className={`${PRIMARY_BUTTON_STYLES} relative ms-auto`}
                          onClick={() => handleFollow(follower.wallet_address)}
                        >
                          Follow
                          {isFollowLoading && (
                            <span className="absolute right-5 top-1/2 -translate-y-1/2">
                              <UpdateIcon className="animate-spin" />
                            </span>
                          )}
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
