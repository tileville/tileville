// Example of how to integrate the achievements list into your public profile page
// Modified version of src/components/PublicProfile/PublicProfileTabs.tsx

import { useState } from "react";
import { Box, Tabs } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import PastGames from "@/components/profileTabs/pastGames";
import DigitalCollection from "../profileTabs/DigitalCollection/DigitalCollection";
import ActiveGames from "../profileTabs/activeGames";
import Transactions from "../profileTabs/transactions";
import Preferences from "../profileTabs/preferences";
import { TABS_HEADINGS } from "@/constants";
import GameAchievementsList from "./GameAchievementsList";

type PublicProfileTabsProps = {
  walletAddress: string;
  initialTab?: string;
  username: string;
  isProfileOwner: boolean;
};

// Add a new tab for achievements
const UPDATED_TABS = [
  ...TABS_HEADINGS,
  { value: "achievements", text: "Achievements", showOnPublicProfile: true }
];

const TestPublicProfileTabs = ({
  walletAddress,
  initialTab = "collection",
  username,
  isProfileOwner,
}: PublicProfileTabsProps) => {
  const visibleTabs = UPDATED_TABS.filter(
    (tab) => isProfileOwner || tab.showOnPublicProfile
  );

  const validInitialTab = visibleTabs.some((tab) => tab.value === initialTab)
    ? initialTab
    : visibleTabs[0].value;

  const [activeTab, setActiveTab] = useState(validInitialTab);
  const router = useRouter();

  const handleTabChange = (value: string) => {
    router.push(`/u/${username}?tab=${value}`);
    setActiveTab(value);
  };

  return (
    <Tabs.Root
      value={String(activeTab)}
      defaultValue="collection"
      onValueChange={handleTabChange}
    >
      <Tabs.List className="mt-8">
        {visibleTabs.map((tab) => (
          <Tabs.Trigger value={tab.value} key={tab.value}>
            {tab.text}
          </Tabs.Trigger>
        ))}
      </Tabs.List>

      <Box pt="3">
        {visibleTabs.map((tab) => (
          <Tabs.Content value={tab.value} key={tab.value}>
            {tab.value === "collection" && (
              <DigitalCollection
                walletAddress={walletAddress}
                isOwner={isProfileOwner}
              />
            )}
            {tab.value === "active-games" && isProfileOwner && (
              <ActiveGames walletAddress={walletAddress} />
            )}
            {tab.value === "past-games" && (
              <PastGames walletAddress={walletAddress} />
            )}
            {tab.value === "transactions" && isProfileOwner && (
              <Transactions walletAddress={walletAddress} />
            )}
            {tab.value === "preferences" && isProfileOwner && <Preferences />}
            {tab.value === "achievements" && (
              <GameAchievementsList walletAddress={walletAddress} />
            )}
          </Tabs.Content>
        ))}
      </Box>
    </Tabs.Root>
  );
};

export default TestPublicProfileTabs;