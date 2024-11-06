"use client";
import { Tabs } from "@radix-ui/themes";
import { NoFriends } from "./NoFriends";
import { Connection } from "@/types";
import { FollowingListItem } from "./FollowingListItem";
import { FollowerListItem } from "./FollowerListItem";

type ConnectionsType = {
  currentWalletAddress: string;
  isLoading: boolean;
  following: Connection[];
  followers: Connection[];
};

export const Connections = ({
  currentWalletAddress,
  isLoading,
  following,
  followers,
}: ConnectionsType) => {
  const followingAddresses = new Set(following?.map((f) => f.wallet_address));

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
                following.map((following: Connection) => {
                  return (
                    <li key={following.username}>
                      <FollowingListItem
                        currentWalletAddress={currentWalletAddress}
                        followingWalletAddress={following.wallet_address}
                        followingAvatarUrl={following.avatar_url}
                        followingUsername={following.username}
                      />
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
                <li className="text-xm text-center font-bold">
                  User do not have any followers yet!
                </li>
              ) : (
                followers.map((follower: Connection) => {
                  const isAlreadyFollowing = followingAddresses.has(
                    follower.wallet_address
                  );

                  return (
                    <li key={follower.username}>
                      {isAlreadyFollowing ? (
                        <FollowingListItem
                          currentWalletAddress={currentWalletAddress}
                          followingWalletAddress={follower.wallet_address}
                          followingAvatarUrl={follower.avatar_url}
                          followingUsername={follower.username}
                        />
                      ) : (
                        <FollowerListItem
                          followerAvatarUrl={follower.avatar_url}
                          followerUsername={follower.username}
                          followerWalletAddress={follower.wallet_address}
                          currentWalletAddress={currentWalletAddress}
                        />
                      )}
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
