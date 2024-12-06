"use client";
import { useState } from "react";
import { Box, Tabs } from "@radix-ui/themes";
import { useNetworkStore } from "@/lib/stores/network";
import {
  useAcceptedChallenges,
  useCreatedChallenges,
} from "@/db/react-query-hooks";
import { PRIMARY_BUTTON_STYLES_LG } from "@/constants";
import { CreateChallengeModal } from "@/components/PVP/CreateChallengeModal";

const TABS = [
  { value: "accepted", text: "Accepted Challenges" },
  { value: "created", text: "Created Challenges" },
];

export default function PVPContent() {
  const networkStore = useNetworkStore();
  const [activeTab, setActiveTab] = useState("accepted");
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const { data: acceptedChallenges, isLoading: isLoadingAccepted } =
    useAcceptedChallenges(networkStore.address || "");

  const { data: createdChallenges, isLoading: isLoadingCreated } =
    useCreatedChallenges(networkStore.address || "");

  return (
    <div className="p-4 pb-24 pt-12 md:pt-40">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary">PVP Challenges</h1>
          <button
            className={PRIMARY_BUTTON_STYLES_LG}
            onClick={() => setCreateModalOpen(true)}
          >
            Create Challenge
          </button>
        </div>

        <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
          <Tabs.List className="mt-4 whitespace-nowrap">
            {TABS.map((tab) => (
              <Tabs.Trigger key={tab.value} value={tab.value}>
                {tab.text}
              </Tabs.Trigger>
            ))}
          </Tabs.List>

          <Box pt="3">
            <Tabs.Content value="accepted">
              {isLoadingAccepted ? (
                <div>Loading...</div>
              ) : acceptedChallenges?.data?.length ? (
                <div className="grid gap-4">
                  {/* We'll add ChallengeList component here */}
                  Accepted Challenges List
                </div>
              ) : (
                <div className="flex min-h-[200px] items-center justify-center text-center">
                  <p className="text-lg font-medium text-gray-500">
                    You Have not accepted any challenges yet!
                  </p>
                </div>
              )}
            </Tabs.Content>

            <Tabs.Content value="created">
              {isLoadingCreated ? (
                <div>Loading...</div>
              ) : createdChallenges?.data?.length ? (
                <div className="grid gap-4">
                  {/* We'll add ChallengeList component here */}
                  Created Challenges List
                </div>
              ) : (
                <div className="flex min-h-[200px] items-center justify-center text-center">
                  <p className="text-lg font-medium text-gray-500">
                    You Have not created any challenges yet!
                  </p>
                </div>
              )}
            </Tabs.Content>
          </Box>
        </Tabs.Root>
      </div>
      <CreateChallengeModal
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
      />
    </div>
  );
}
