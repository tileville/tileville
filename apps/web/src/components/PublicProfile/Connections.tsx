"use client";
import { useGetConnections } from "@/db/react-query-hooks";
import { formatAddress } from "@/lib/helpers";
import { Tabs } from "@radix-ui/themes";
import Image from "next/image";

type ConnectionsType = {
  walletAddress: string;
};

export const Connections = ({ walletAddress }: ConnectionsType) => {
  const {
    data: connections,
    isLoading,
    error,
  } = useGetConnections(walletAddress);

  console.log("connections data", connections);
  console.log("wallet address in connections", walletAddress);

  return (
    <div className="col-span-4 rounded-xl bg-primary/20 p-4 text-black backdrop-blur-sm">
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
            <ul>
              {isLoading
                ? "Loading please wait"
                : connections.following.map((following: string) => {
                    return (
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
                          <button className="ms-auto">Remove</button>
                        </div>
                      </li>
                    );
                  })}
            </ul>
          </div>
        </Tabs.Content>
        <Tabs.Content value="followers">
          <div className="pt-3">
            <ul>
              {isLoading
                ? "Loading please wait"
                : connections.followers.map((followers: string) => {
                    return (
                      <li key={followers}>
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

                          <p className="text-xl">{formatAddress(followers)}</p>
                          <button className="ms-auto">Remove</button>
                        </div>
                      </li>
                    );
                  })}
            </ul>
          </div>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
};
