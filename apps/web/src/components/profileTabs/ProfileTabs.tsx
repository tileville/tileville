import { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Tabs } from "@radix-ui/themes";
import ActiveGames from "@/components/profileTabs/activeGames";
import PastGames from "@/components/profileTabs/pastGames";
import Transactions from "@/components/profileTabs/transactions";
import Preferences from "@/components/profileTabs/preferences";
import { TABS_HEADINGS } from "@/constants";
import DigitalCollection from "./DigitalCollection/DigitalCollection";

type ProfileTabsType = {
  walletAddress: string;
  initialTab: string;
};

export const ProfileTabs = ({ walletAddress, initialTab }: ProfileTabsType) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const router = useRouter();

  return (
    <Tabs.Root
      value={String(activeTab)}
      defaultValue="collection"
      onValueChange={(e) => {
        router.push(`/profile?tab=${e}`);
        setActiveTab(e);
      }}
    >
      <Tabs.List className="mt-4 whitespace-nowrap">
        {TABS_HEADINGS.map((tab) => {
          return (
            <Tabs.Trigger value={tab.value} key={tab.value}>
              {tab.text}
            </Tabs.Trigger>
          );
        })}
      </Tabs.List>

      <Box pt="3">
        <Tabs.Content value="collection">
          <DigitalCollection />
        </Tabs.Content>

        <Tabs.Content value="active-games">
          <ActiveGames walletAddress={walletAddress} />
        </Tabs.Content>

        <Tabs.Content value="past-games">
          <PastGames walletAddress={walletAddress} />
        </Tabs.Content>

        <Tabs.Content value="transactions">
          <Transactions walletAddress={walletAddress} />
        </Tabs.Content>

        <Tabs.Content value="preferences">
          <Preferences />
        </Tabs.Content>
      </Box>
    </Tabs.Root>
  );
};
