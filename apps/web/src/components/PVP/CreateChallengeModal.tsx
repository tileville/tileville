"use client";
import { Dialog } from "@radix-ui/themes";
import { Cross1Icon, UpdateIcon, LoopIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { useNetworkStore } from "@/lib/stores/network";
import { useCreateChallenge } from "@/db/react-query-hooks";

// Game name suggestions for regeneration
const GAME_NAMES = [
  "TileVille Heroes",
  "TileVille Clash",
  "TileVille Rush",
  "TileVille Duel",
  "TileVille Battle",
  "TileVille Champions",
  "TileVille Rivals",
  "TileVille Masters",
];

export const CreateChallengeModal = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const networkStore = useNetworkStore();
  const [loading, setLoading] = useState(false);

  // Form states
  const [name, setName] = useState(GAME_NAMES[0]);
  const [entryFee, setEntryFee] = useState(1); // 1 MINA default
  const [endTime, setEndTime] = useState("24"); // 24 hours default
  const [maxParticipants, setMaxParticipants] = useState(2); // minimum 2 players
  const [isSpeedChallenge, setIsSpeedChallenge] = useState(false);
  const [speedDuration, setSpeedDuration] = useState(180); // 180 seconds default

  const createChallengeMutation = useCreateChallenge(
    networkStore.address || ""
  );

  const generateRandomName = () => {
    const randomIndex = Math.floor(Math.random() * GAME_NAMES.length);
    setName(GAME_NAMES[randomIndex]);
  };

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

      await createChallengeMutation.mutateAsync({
        name,
        entry_fee: entryFee,
        end_time: endTimeDate.toISOString(),
        max_participants: maxParticipants,
        is_speed_challenge: isSpeedChallenge,
        speed_duration: isSpeedChallenge ? speedDuration : undefined,
      });

      onOpenChange(false);
    } catch (error) {
      console.error("Failed to create challenge:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content className="relative max-w-[500px] !rounded-md !bg-[#99B579] !p-8">
        <Dialog.Title className="text-2xl font-bold">
          Create Challenge
        </Dialog.Title>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          {/* Challenge Name */}
          <div className="relative">
            <label className="mb-2 block font-medium">
              Challenge Name
              <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                className="min-h-10 w-full rounded-md border-2 border-primary bg-transparent px-2 font-medium outline-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={generateRandomName}
                className="flex h-10 w-10 items-center justify-center rounded-md border-2 border-primary bg-transparent"
              >
                <LoopIcon />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Entry Fee */}
            <div>
              <label className="mb-2 block font-medium">
                Entry Fee (MINA)
                <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min="0"
                step="1"
                className="min-h-10 w-full rounded-md border-2 border-primary bg-transparent px-2 font-medium outline-none"
                value={entryFee}
                onChange={(e) => setEntryFee(Number(e.target.value))}
                required
              />
            </div>

            {/* Challenge End Time */}
            <div>
              <label className="mb-2 block font-medium">
                End Time (Hours)
                <span className="text-red-500">*</span>
              </label>
              <select
                className="min-h-10 w-full rounded-md border-2 border-primary bg-transparent px-2 font-medium outline-none"
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
              <label className="mb-2 block font-medium">
                Max Participants
                <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min="2"
                max="10"
                className="min-h-10 w-full rounded-md border-2 border-primary bg-transparent px-2 font-medium outline-none"
                value={maxParticipants}
                onChange={(e) => setMaxParticipants(Number(e.target.value))}
                required
              />
            </div>

            {/* Speed Challenge */}
            <div>
              <label className="mb-2 block font-medium">Speed Challenge</label>
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
                  className="min-h-10 w-full rounded-md border-2 border-primary bg-transparent px-2 font-medium outline-none"
                  value={speedDuration}
                  onChange={(e) => setSpeedDuration(Number(e.target.value))}
                  required={isSpeedChallenge}
                />
              </div>
            )}
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="min-h-10 rounded-md border-2 border-primary bg-transparent px-6 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="min-h-10 relative rounded-md bg-primary px-6 font-medium text-white disabled:opacity-70"
            >
              {loading && (
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <UpdateIcon className="h-5 w-5 animate-spin" />
                </span>
              )}
              <span className={loading ? "invisible" : ""}>
                Create Challenge
              </span>
            </button>
          </div>
        </form>

        <Dialog.Close>
          <button className="absolute right-4 top-4">
            <Cross1Icon />
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Root>
  );
};
