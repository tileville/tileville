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

const TABS = {
  ACCEPTED: {
    id: "accepted",
    label: "Accepted Challenges",
  },
  CREATED: {
    id: "created",
    label: "Created Challenges",
  },
};

export default function PVPContent() {
  const networkStore = useNetworkStore();
  const [activeTab, setActiveTab] = useState(TABS.ACCEPTED.id);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const { validateOrSetSignature, accountAuthSignature } = useAuthSignature();

  const { data: acceptedChallenges, isLoading: isLoadingAccepted } =
    useAcceptedChallenges(networkStore.address || "");

  const { data: createdChallenges, isLoading: isLoadingCreated } =
    useCreatedChallenges(networkStore.address || "");

  const handleCreateChallenge = async () => {
    if (!networkStore.address) {
      try {
        networkStore.connectWallet(false);
      } catch (error) {
        console.error(`Failed to connect with wallet`, error);
      } finally {
        return;
      }
    }

    if (!accountAuthSignature) {
      await validateOrSetSignature();
      return;
    }

    setCreateModalOpen(true);
  };

  //TODO: Instead of hiding whole PVP content, show the tabs if wallet is not connected
  if (!networkStore.address) {
    return (
      <div className="flex min-h-screen items-center justify-center p-8">
        <button
          className="flex cursor-pointer items-center rounded-full bg-primary px-3 py-2 font-medium text-white"
          onClick={() => {
            networkStore.connectWallet(false);
          }}
        >
          Connect your wallet first
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 pb-16 pt-12 font-roboto md:pt-24">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary">
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
          <Tabs.List className="mt-4 whitespace-nowrap !text-xl !text-black">
            {Object.values(TABS).map((tab) => (
              <Tabs.Trigger
                key={tab.id}
                value={tab.id}
                className={`${activeTab === tab.id ? "!font-bold" : ""}`}
              >
                {tab.label}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
          <Box pt="3">
            <Tabs.Content value={TABS.ACCEPTED.id}>
              <ChallengesList
                isLoadingAccepted={isLoadingAccepted}
                challenges={acceptedChallenges}
                challengesType={TABS.ACCEPTED.id}
              />
            </Tabs.Content>
            <Tabs.Content value={TABS.CREATED.id}>
              <ChallengesList
                isLoadingCreated={isLoadingCreated}
                challenges={createdChallenges}
                challengesType={TABS.CREATED.id}
              />
            </Tabs.Content>
          </Box>
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
