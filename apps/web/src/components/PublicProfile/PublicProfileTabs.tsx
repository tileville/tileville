import { useState } from "react";
import { Box, Tabs } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import PastGames from "@/components/profileTabs/pastGames";
import DigitalCollection from "../profileTabs/DigitalCollection/DigitalCollection";

const PUBLIC_TABS_HEADINGS = [
  {
    value: "collection",
    text: "Digital Collection",
  },
  {
    value: "past-games",
    text: "Past Games",
  },
];

type PublicProfileTabsProps = {
  walletAddress: string;
  initialTab?: string;
  username: string;
  loggedInUserWalletAddress: string;
};

const PublicProfileTabs = ({
  walletAddress,
  initialTab = "collection",
  username,
  loggedInUserWalletAddress,
}: PublicProfileTabsProps) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const router = useRouter();

  return (
    <Tabs.Root
      value={String(activeTab)}
      defaultValue="collection"
      onValueChange={(value) => {
        router.push(`/u/${username}?tab=${value}`);
        setActiveTab(value);
      }}
    >
      <Tabs.List className="mt-8">
        {PUBLIC_TABS_HEADINGS.map((tab) => (
          <Tabs.Trigger value={tab.value} key={tab.value}>
            {tab.text}
          </Tabs.Trigger>
        ))}
      </Tabs.List>

      <Box pt="3">
        <Tabs.Content value="collection">
          <DigitalCollection
            walletAddress={walletAddress}
            isOwner={loggedInUserWalletAddress === walletAddress}
          />
        </Tabs.Content>

        <Tabs.Content value="past-games">
          <PastGames walletAddress={walletAddress} />
        </Tabs.Content>
      </Box>
    </Tabs.Root>
  );
};

export default PublicProfileTabs;
