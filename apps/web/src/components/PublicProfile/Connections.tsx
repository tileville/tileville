"use client";
import { Tabs } from "@radix-ui/themes";
import { NoFriends } from "./NoFriends";
import { Connection } from "@/types";
import { UserListItem } from "./UserListItem";

type ConnectionsType = {
  isLoading: boolean;
  following: Connection[];
  followers: Connection[];
  loggedInUserWalletAddress: string;
  loggedInUserFollowing: Set<string>;
  loggedInUserFollowers: Set<string>;
};

export const Connections = ({
  isLoading,
  following,
  followers,
  loggedInUserWalletAddress,
  loggedInUserFollowing,
  loggedInUserFollowers,
}: ConnectionsType) => {
  return (
    <div className="w-full rounded-xl bg-primary/20 p-2 md:p-4 text-black backdrop-blur-sm">
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
            <ul className="flex flex-col gap-1 max-h-[280px] overflow-auto pr-1">
              {isLoading ? (
                "Loading please wait"
              ) : following.length <= 0 ? (
                <NoFriends />
              ) : (
                following.map((user: Connection) => (
                  <li key={user.username}>
                    <UserListItem
                      userInfo={{
                        wallet_address: user.wallet_address,
                        avatar_url: user.avatar_url,
                        username: user.username,
                        fullname: user.fullname,
                      }}
                      isFollowing={loggedInUserFollowing.has(
                        user.wallet_address
                      )}
                      isFollowsYou={loggedInUserFollowers.has(
                        user.wallet_address
                      )}
                      loggedInUserWalletAddress={loggedInUserWalletAddress}
                    />
                  </li>
                ))
              )}
            </ul>
          </div>
        </Tabs.Content>

        <Tabs.Content value="followers">
          <div className="pt-3">
            <ul className="flex flex-col gap-1 max-h-[280px] overflow-auto pr-1">
              {isLoading ? (
                "Loading please wait"
              ) : followers.length <= 0 ? (
                <li className="text-xm text-center font-bold">
                  User do not have any followers yet!
                </li>
              ) : (
                followers.map((user: Connection) => (
                  <li key={user.username}>
                    <UserListItem
                      userInfo={{
                        wallet_address: user.wallet_address,
                        avatar_url: user.avatar_url,
                        username: user.username,
                        fullname: user.fullname,
                      }}
                      isFollowing={loggedInUserFollowing.has(
                        user.wallet_address
                      )}
                      isFollowsYou={loggedInUserFollowers.has(
                        user.wallet_address
                      )}
                      loggedInUserWalletAddress={loggedInUserWalletAddress}
                    />
                  </li>
                ))
              )}
            </ul>
          </div>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
};
