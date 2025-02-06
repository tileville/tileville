"use client";
import { Dialog } from "@radix-ui/themes";
import { Cross1Icon, UpdateIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { useNetworkStore } from "@/lib/stores/network";
import { useCreateChallenge } from "@/db/react-query-hooks";
import { ChallengeCreatedModal } from "./ChallengeCreatedModal";
import {
  PRIMARY_BUTTON_V2_LG,
  PVP_CHALLENGES_MIN_ENTRY_FEE,
} from "@/constants";
import { SpinnerWhite } from "../common/Spinner";
import { generateChallengeName } from "@/lib/helpers";
import { CustomTooltip } from "../common/CustomTooltip";
import CustomCheckbox from "../common/CustomCheckbox";
import { usePosthogEvents } from "@/hooks/usePosthogEvents";

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
  const [isPublic, setIsPublic] = useState(true);

  // Form states
  const [name, setName] = useState(generateChallengeName());
  const [entryFee, setEntryFee] = useState(PVP_CHALLENGES_MIN_ENTRY_FEE);
  const [endTime, setEndTime] = useState("8");
  const [maxParticipants, setMaxParticipants] = useState(2); // minimum 2 players
  const [isSpeedChallenge, setIsSpeedChallenge] = useState(false);
  const [speedDuration, setSpeedDuration] = useState(180); // 180 seconds default

  const createChallengeMutation = useCreateChallenge(
    networkStore.address || ""
  );
  const {
    createdPVPChallenge: [logCreateChallenge, logCreateChallengeError],
  } = usePosthogEvents();

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
        is_public: isPublic,
      });

      if (response.success) {
        const inviteLink = `${window.location.origin}/pvp/invite/${response.data.invite_code}`;
        setCreatedChallengeInviteLink(inviteLink);
        setShowSuccessModal(true);
        onOpenChange(false);

        logCreateChallenge({
          walletAddress: networkStore.address,
          challengeId: response.data.id,
          challengeName: name,
          isSpeedChallenge,
          entryFee,
          isPublic,
        });
      }
    } catch (err) {
      console.error("Failed to create challenge:", err);
      const error = err as Error;
      logCreateChallengeError({
        walletAddress: networkStore.address,
        challengeId: 0, // Using 0 fallback for failed creation
        challengeName: name,
        isSpeedChallenge,
        entryFee,
        isPublic,
        error: error?.message || "Unknown error during challenge creation",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog.Root open={open} onOpenChange={onOpenChange}>
        <Dialog.Content className="relative max-w-[500px] !rounded-md !bg-[#99B579] !px-3 !py-6  md:!px-8 md:!py-8">
          <Dialog.Title className="text-center text-base font-bold md:!text-[28px]">
            Create Challenge
          </Dialog.Title>

          <form
            onSubmit={handleSubmit}
            className="mt-6 space-y-6 text-xs md:text-base"
          >
            {/* Challenge Name */}
            <div className="relative">
              <Dialog.Description className="!mb-2 block text-base font-medium md:!text-2xl">
                Challenge Name
                <span className="!text-2xl text-red-500">*</span>
              </Dialog.Description>
              <div className="relative flex items-center gap-2">
                <input
                  type="text"
                  className="input-v1"
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

                <div className="absolute -top-[7px] right-0 min-h-[15px] rounded-[5px] bg-[#90AA70] px-1 text-[8px] text-[#435133] md:-right-5 md:text-[10px]">
                  regenerate name
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
                <div className="relative">
                  <input
                    type="number"
                    min={PVP_CHALLENGES_MIN_ENTRY_FEE}
                    step="1"
                    className="input-v1 no-spinner"
                    value={entryFee}
                    onChange={(e) => setEntryFee(Number(e.target.value))}
                    required
                  />

                  <div className="absolute right-2 top-1/2 flex -translate-y-1/2 flex-col gap-[2px] md:gap-1">
                    <button
                      type="button"
                      onClick={() => setEntryFee(entryFee + 1)}
                      className="arrow-btn"
                    >
                      &#9652;
                    </button>
                    <button
                      type="button"
                      onClick={() => setEntryFee(entryFee - 1)}
                      className="arrow-btn"
                    >
                      &#9662;
                    </button>
                  </div>
                </div>
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

                <div className="relative">
                  <select
                    className="input-v1 appearance-none"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    required
                  >
                    <option value="1">1 hour</option>
                    <option value="2">2 hours</option>
                    <option value="3">3 hours</option>
                    <option value="5">5 hours</option>
                    <option value="8">8 hours</option>
                    <option value="13">13 hours</option>
                    <option value="21">21 hours</option>
                    <option value="24">24 hours</option>
                    <option value="48">48 hours</option>
                    <option value="72">72 hours</option>
                  </select>

                  <span className="arrow-btn pointer-events-none absolute right-2 top-1/2  -translate-y-1/2">
                    &#9662;
                  </span>
                </div>
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
                <div className="relative">
                  <input
                    type="number"
                    min="2"
                    max="10"
                    className="input-v1 no-spinner"
                    value={maxParticipants}
                    onChange={(e) => setMaxParticipants(Number(e.target.value))}
                    required
                  />

                  <div className="absolute right-2 top-1/2 flex -translate-y-1/2 flex-col gap-[2px] md:gap-1">
                    <button
                      type="button"
                      onClick={() => setMaxParticipants(maxParticipants + 1)}
                      className="arrow-btn"
                    >
                      &#9652;
                    </button>
                    <button
                      type="button"
                      onClick={() => setMaxParticipants(maxParticipants - 1)}
                      className="arrow-btn"
                    >
                      &#9662;
                    </button>
                  </div>
                </div>
              </div>

              {/* Speed Challenge */}
              <div>
                <div className="mb-2 flex justify-between">
                  <div className="flex items-center justify-start gap-1 ">
                    <label className="block font-medium">Speed Challenge</label>

                    <CustomTooltip
                      tooltipContent="Enable this option if the challenge requires
                          participants to place all tiles within a specified
                          time limit."
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <CustomCheckbox
                      checked={isSpeedChallenge}
                      onChange={() => setIsSpeedChallenge(!isSpeedChallenge)}
                    />
                  </div>
                </div>

                {/* Speed Duration (only shown if Speed Challenge is enabled) */}
                <div className="relative">
                  <input
                    type="number"
                    min="60"
                    max="300"
                    className="input-v1 no-spinner disabled:border-[#7CA550] disabled:text-gray-500"
                    value={speedDuration}
                    onChange={(e) => setSpeedDuration(Number(e.target.value))}
                    required={isSpeedChallenge}
                    disabled={!isSpeedChallenge}
                  />

                  <div className="absolute right-2 top-1/2 flex -translate-y-1/2 flex-col gap-[2px] md:gap-1">
                    <button
                      type="button"
                      onClick={() => setSpeedDuration(speedDuration + 1)}
                      className="arrow-btn"
                      disabled={!isSpeedChallenge}
                    >
                      &#9652;
                    </button>
                    <button
                      type="button"
                      onClick={() => setSpeedDuration(speedDuration - 1)}
                      className="arrow-btn"
                      disabled={!isSpeedChallenge}
                    >
                      &#9662;
                    </button>
                  </div>
                </div>
              </div>

              {/* Privacy Settings */}
              <div className="col-span-2">
                <div className="mb-2 flex justify-between">
                  <div className="flex items-center justify-start gap-1">
                    <label className="block font-medium">
                      Challenge Privacy
                    </label>
                    <CustomTooltip
                      tooltipContent={
                        isPublic
                          ? "Challenge will be shared in TileVille Telegram for anyone to join"
                          : "Challenge link shared only with players you choose"
                      }
                    />
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={isPublic}
                      onChange={() => setIsPublic(true)}
                      className="h-4 w-4"
                    />
                    <span>Public</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={!isPublic}
                      onChange={() => setIsPublic(false)}
                      className="h-4 w-4"
                    />
                    <span>Private</span>
                  </label>
                </div>
                <p className="mt-2 text-xs text-[#5D6845] md:text-sm">
                  {isPublic
                    ? "Challenge will be shared in TileVille Telegram for anyone to join"
                    : "Challenge link shared only with players you choose"}
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="submit"
                disabled={loading}
                className={`${PRIMARY_BUTTON_V2_LG} relative min-h-[32px] w-full md:min-h-[50px]`}
              >
                <span className="relative min-w-[250px]">
                  {loading && (
                    <span className="absolute -left-8 top-1/2  -translate-y-1/2">
                      <SpinnerWhite size={18} />
                    </span>
                  )}
                  <span>Create Challenge</span>
                </span>
              </button>
            </div>
          </form>

          <p className="mt-3 text-center text-xs text-[#5D6845] md:mt-6 md:text-sm">
            Note: A fee of 1 MINA will be deducted from the total prize pool to
            cover the cost of creating the challenge.
          </p>

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
        challengeName={name}
        entryFee={entryFee}
      />
    </>
  );
};
