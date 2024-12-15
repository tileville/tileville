"use client";
import { Dialog } from "@radix-ui/themes";
import { Cross1Icon, UpdateIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { useNetworkStore } from "@/lib/stores/network";
import { useCreateChallenge } from "@/db/react-query-hooks";
import { ChallengeCreatedModal } from "./ChallengeCreatedModal";
import { PRIMARY_BUTTON_V2_LG } from "@/constants";
import { SpinnerWhite } from "../common/Spinner";
import { generateChallengeName } from "@/lib/helpers";
import { CustomTooltip } from "../common/CustomTooltip";

const INPUT_CLASS =
  "min-h-[54px] w-full rounded-md border-2 border-primary bg-transparent px-2 text-xl font-medium outline-none";

export const CreateChallengeModal = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const networkStore = useNetworkStore();
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [createdChallengeInviteLink, setCreatedChallengeInviteLink] =
    useState("");

  // Form states
  const [name, setName] = useState(generateChallengeName());
  const [entryFee, setEntryFee] = useState(1); // 1 MINA default
  const [endTime, setEndTime] = useState("24"); // 24 hours default
  const [maxParticipants, setMaxParticipants] = useState(2); // minimum 2 players
  const [isSpeedChallenge, setIsSpeedChallenge] = useState(false);
  const [speedDuration, setSpeedDuration] = useState(180); // 180 seconds default

  const createChallengeMutation = useCreateChallenge(
    networkStore.address || ""
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!networkStore.address) {
      networkStore.connectWallet(false);
      return;
    }

    setLoading(true);
    try {
      const endTimeDate = new Date();
      endTimeDate.setHours(endTimeDate.getHours() + parseInt(endTime));
      const response = await createChallengeMutation.mutateAsync({
        name,
        entry_fee: entryFee,
        end_time: endTimeDate.toISOString(),
        max_participants: maxParticipants,
        is_speed_challenge: isSpeedChallenge,
        speed_duration: isSpeedChallenge ? speedDuration : undefined,
      });

      if (response.success) {
        const inviteLink = `${window.location.origin}/pvp/invite/${response.data.invite_code}`;
        setCreatedChallengeInviteLink(inviteLink);
        setShowSuccessModal(true);
        onOpenChange(false);
      }
    } catch (error) {
      console.error("Failed to create challenge:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog.Root open={open} onOpenChange={onOpenChange}>
        <Dialog.Content className="relative max-w-[500px] !rounded-md !bg-[#99B579] !p-8">
          <Dialog.Title className="text-center !text-[28px] font-bold">
            Create Challenge
          </Dialog.Title>

          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            {/* Challenge Name */}
            <div className="relative">
              <Dialog.Description className="!mb-2 block  !text-2xl font-medium">
                Challenge Name
                <span className="!text-2xl text-red-500">*</span>
              </Dialog.Description>
              <div className="relative flex items-center gap-2">
                <input
                  type="text"
                  className={INPUT_CLASS}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <div className="absolute bottom-0 right-0 top-0 flex items-center justify-center gap-1">
                  <button
                    type="button"
                    onClick={() => setName(generateChallengeName)}
                    className="w-full p-3"
                  >
                    <UpdateIcon width={20} height={20} />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setName("");
                    }}
                    className="w-full p-3"
                  >
                    <Cross1Icon width={20} height={20} />
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Entry Fee */}
              <div>
                <div className="mb-2 flex items-center justify-start gap-1 ">
                  <label className="block font-medium">
                    Entry Fee (MINA)
                    <span className="text-red-500">*</span>
                  </label>

                  <CustomTooltip
                    tooltipContent="Specify the amount participants need to pay to join
                          this challenge."
                  />
                </div>

                <input
                  type="number"
                  min="0"
                  step="1"
                  className={INPUT_CLASS}
                  value={entryFee}
                  onChange={(e) => setEntryFee(Number(e.target.value))}
                  required
                />
              </div>

              {/* Challenge End Time */}
              <div>
                <div className="mb-2 flex items-center justify-start gap-1 ">
                  <label className="block font-medium">
                    End Time (Hours)
                    <span className="text-red-500">*</span>
                  </label>

                  <CustomTooltip
                    tooltipContent="Specify the time limit for the challenge to end,
                          ensuring participants have enough time to complete it."
                  />
                </div>

                <select
                  className={INPUT_CLASS}
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  required
                >
                  <option value="24">24 hours</option>
                  <option value="48">48 hours</option>
                  <option value="72">72 hours</option>
                </select>
              </div>

              {/* Max Participants */}
              <div>
                <div className="mb-2 flex items-center justify-start gap-1 ">
                  <label className="block font-medium">
                    Max Participants
                    <span className="text-red-500">*</span>
                  </label>

                  <CustomTooltip
                    tooltipContent="Select the maximum number of participants allowed to
                          join this challenge"
                  />
                </div>
                <input
                  type="number"
                  min="2"
                  max="10"
                  className={INPUT_CLASS}
                  value={maxParticipants}
                  onChange={(e) => setMaxParticipants(Number(e.target.value))}
                  required
                />
              </div>

              {/* Speed Challenge */}
              <div>
                <div className="mb-2 flex items-center justify-start gap-1 ">
                  <label className="block font-medium">Speed Challenge</label>

                  <CustomTooltip
                    tooltipContent="Enable this option if the challenge requires
                          participants to place all tiles within a specified
                          time limit."
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-5 w-5"
                    checked={isSpeedChallenge}
                    onChange={(e) => setIsSpeedChallenge(e.target.checked)}
                  />
                  <span>Enable Speed Mode</span>
                </div>
              </div>

              {/* Speed Duration (only shown if Speed Challenge is enabled) */}
              {isSpeedChallenge && (
                <div className="col-span-2">
                  <label className="mb-2 block font-medium">
                    Speed Duration (Seconds)
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    min="60"
                    max="300"
                    className={INPUT_CLASS}
                    value={speedDuration}
                    onChange={(e) => setSpeedDuration(Number(e.target.value))}
                    required={isSpeedChallenge}
                  />
                </div>
              )}
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="submit"
                disabled={loading}
                className={`${PRIMARY_BUTTON_V2_LG} relative min-h-[50px] w-full`}
              >
                {loading && (
                  <span className="absolute right-6 top-1/2  -translate-y-1/2">
                    <SpinnerWhite size={18} />
                  </span>
                )}
                <span>Create Challenge</span>
              </button>
            </div>
          </form>

          <Dialog.Close>
            <button className="absolute right-4 top-4">
              <Cross1Icon width={24} height={24} />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Root>

      <ChallengeCreatedModal
        open={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        inviteLink={createdChallengeInviteLink}
      />
    </>
  );
};
