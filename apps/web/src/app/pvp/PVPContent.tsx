"use client";
import { useState } from "react";
import { Box, Tabs } from "@radix-ui/themes";
import { useNetworkStore } from "@/lib/stores/network";
import {
  useAcceptedChallenges,
  useCreatedChallenges,
} from "@/db/react-query-hooks";
import { PRIMARY_BUTTON_V2 } from "@/constants";
import { CreateChallengeModal } from "@/components/PVP/CreateChallengeModal";
import { ChallengesList } from "@/components/PVP/ChallengesTabs/ChallengesList";
import { useAuthSignature } from "@/hooks/useAuthSignature";
import clsx from "clsx";

export const TABS = {
  ACCEPTED: { id: "accepted", label: "Accepted Challenges" },
  CREATED: { id: "created", label: "Created Challenges" },
};

export default function PVPContent() {
  const networkStore = useNetworkStore();
  const [activeTab, setActiveTab] = useState(TABS.ACCEPTED.id);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const { validateOrSetSignature, accountAuthSignature } = useAuthSignature();

  const address = networkStore.address || "";
  const { data: acceptedChallenges, isLoading: isLoadingAccepted } =
    useAcceptedChallenges(address);
  const { data: createdChallenges, isLoading: isLoadingCreated } =
    useCreatedChallenges(address);

  const handleConnectWallet = async () => {
    try {
      await networkStore.connectWallet(false);
    } catch (error) {
      console.error("Failed to connect with wallet", error);
    }
  };

  const handleCreateChallenge = async () => {
    if (!networkStore.address) {
      await handleConnectWallet();
      return;
    }

    if (!accountAuthSignature) {
      await validateOrSetSignature();
      return;
    }

    setCreateModalOpen(true);
  };

  const renderTabContent = () => {
    if (!networkStore.address) {
      return (
        <div className="flex items-center justify-center p-8">
          <button className="primary-btn" onClick={handleConnectWallet}>
            Connect your wallet first
          </button>
        </div>
      );
    }

    return (
      <>
        <Tabs.Content value={TABS.ACCEPTED.id}>
          <ChallengesList
            isLoading={isLoadingAccepted}
            challenges={acceptedChallenges}
            challengesType={TABS.ACCEPTED.id}
          />
        </Tabs.Content>
        <Tabs.Content value={TABS.CREATED.id}>
          <ChallengesList
            isLoading={isLoadingCreated}
            challenges={createdChallenges}
            challengesType={TABS.CREATED.id}
          />
        </Tabs.Content>
      </>
    );
  };

  return (
    <div className="p-2 pb-16 pt-12 font-roboto md:pt-24">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-2 flex items-center justify-between md:mb-8">
          <h1 className="text-base font-bold text-primary md:text-2xl">
            Player-vs-Player Challenges
          </h1>
          <button
            className={clsx(PRIMARY_BUTTON_V2, "py-1")}
            onClick={handleCreateChallenge}
          >
            + Create Challenge
          </button>
        </div>

        <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
          <Tabs.List className="whitespace-nowrap !text-sm !text-black md:mt-4 md:!text-xl">
            {Object.values(TABS).map((tab) => (
              <Tabs.Trigger
                key={tab.id}
                value={tab.id}
                className={activeTab === tab.id ? "!font-bold" : ""}
              >
                {tab.label}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
          <Box pt="3">{renderTabContent()}</Box>
        </Tabs.Root>
      </div>

      {accountAuthSignature && (
        <CreateChallengeModal
          open={createModalOpen}
          onOpenChange={setCreateModalOpen}
        />
      )}
    </div>
  );
}
