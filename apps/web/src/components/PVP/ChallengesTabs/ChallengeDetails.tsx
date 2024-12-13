import { copyToClipBoard } from "@/lib/helpers";
import { Challenge, ChallengeParticipant } from "@/types";
import { CopyIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { CountdownTimerSmall } from "@/components/common/CountdownTimerSmall";
import { useNetworkStore } from "@/lib/stores/network";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type ChallengeDetailsProps = {
  challenge: Challenge;
  participants: ChallengeParticipant[];
};

export const ChallengeDetails = ({
  challenge,
  participants,
}: ChallengeDetailsProps) => {
  const networkStore = useNetworkStore();
  const router = useRouter();

  // Function to check if challenge has ended
  const isChallengeEnded = () => {
    return new Date(challenge.end_time) < new Date();
  };

  // Function to check if current user has already played
  const hasUserPlayed = () => {
    const currentParticipant = participants.find(
      (p) => p.wallet_address === networkStore.address
    );
    return currentParticipant?.has_played;
  };

  const haveAllParticipantsPlayed = () => {
    return participants.length > 0 && participants.every((p) => p.has_played);
  };

  const getWinner = (): ChallengeParticipant | null => {
    // Only show winner if challenge ended OR all participants have played
    if (!isChallengeEnded() && !haveAllParticipantsPlayed()) return null;

    const playedParticipants = participants.filter((p) => p.has_played);
    if (playedParticipants.length === 0) return null;

    return playedParticipants.reduce((highest, current) => {
      if (!highest || (current.score || 0) > (highest.score || 0)) {
        return current;
      }
      return highest;
    }, playedParticipants[0]);
  };

  const winner = getWinner();

  const handlePlayGame = () => {
    // Find participant's game record
    const currentParticipant = participants.find(
      (p) => p.wallet_address === networkStore.address
    );

    if (!currentParticipant) {
      toast.error("You haven't joined this challenge yet!");
      return;
    }

    if (currentParticipant.has_played) {
      toast.error("You've already played this challenge!");
      return;
    }

    if (isChallengeEnded()) {
      toast.error("This challenge has ended!");
      return;
    }

    toast.success(
      `You have joined the ${challenge.name} Challenge successfully. Redirecting you to the game screen now.`
    );
    setTimeout(() => {
      router.push(`/pvp/${challenge.id}/game`);
    }, 3000);
  };

  const inviteLink = `https://www.tileville.xyz/pvp/invite/${challenge.invite_code}`;

  return (
    <div className="rounded-lg bg-[#99B579] p-6 border border-[#38830A]">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold">{challenge.name}</h2>
        <p className="text-sm">
          Challenge Created by: {challenge.created_by.slice(0, 6)}...
          {challenge.created_by.slice(-4)}
        </p>
      </div>

      <div className="mb-8 grid grid-cols-3 gap-4">
        <div className="flex flex-col items-center rounded-lg bg-[#99B579] border border-[#76993E] p-4">
          {/* <Image src="/icons/timer.svg" width={24} height={24} alt="timer" /> */}
          <p className="mt-2 font-medium">Time remaining</p>
          <CountdownTimerSmall endTime={challenge.end_time} />
        </div>

        <div className="flex flex-col items-center rounded-lg bg-[#99B579] border border-[#76993E] p-4">
          {/* <Image src="/icons/mina.svg" width={24} height={24} alt="mina" /> */}
          <p className="mt-2 font-medium">Entry Fees</p>
          <p>{challenge.entry_fee} MINA</p>
        </div>

        {challenge.is_speed_challenge && (
          <div className="flex flex-col items-center rounded-lg bg-[#99B579] border border-[#76993E] p-4">
            {/* <Image src="/icons/speed.svg" width={24} height={24} alt="speed" /> */}
            <p className="mt-2 font-medium">Speed Challenge</p>
            <p>{challenge.speed_duration} seconds</p>
          </div>
        )}
      </div>

      <div className="mb-6">
        <h3 className="mb-2 text-lg font-semibold">Share Invite Link</h3>
        <div className="flex items-center gap-2 rounded-lg bg-white/20 p-2">
          <input
            type="text"
            value={inviteLink}
            readOnly
            className="flex-1 bg-transparent px-2"
          />
          <button
            onClick={() =>
              copyToClipBoard({
                toCopyContent: inviteLink,
                copiedType: "Invite Link",
              })
            }
            className="rounded-md bg-primary p-2 text-white"
          >
            <CopyIcon />
          </button>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="mb-2 text-lg font-semibold">
          Share Invite Link on Socials
        </h3>
        <div className="flex gap-4">
          <Link
            href={`https://twitter.com/intent/tweet?text=Join my TileVille challenge! ${inviteLink}`}
            target="_blank"
            className="rounded-full bg-black p-2"
          >
            <Image src="/icons/x.svg" width={24} height={24} alt="X" />
          </Link>
          <Link
            href={`https://t.me/share/url?url=${inviteLink}`}
            target="_blank"
            className="rounded-full bg-[#229ED9] p-2"
          >
            <Image
              src="/icons/telegram.svg"
              width={24}
              height={24}
              alt="Telegram"
            />
          </Link>
          <Link
            href={`https://discord.com/`}
            target="_blank"
            className="rounded-full bg-[#5865F2] p-2"
          >
            <Image
              src="/icons/discord.svg"
              width={24}
              height={24}
              alt="Discord"
            />
          </Link>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Participants List</h3>
        <div className="rounded-lg bg-white/20 p-4">
          <table className="w-full">
            <thead>
              <tr className="text-left">
                <th>S.N</th>
                <th>Wallet Address</th>
                <th>Status</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {participants.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="p-4 text-center text-2xl font-bold"
                  >
                    No one has joined Yet!
                  </td>
                </tr>
              ) : (
                participants.map((participant, index) => (
                  <tr key={index} className="border-t border-white/10">
                    <td className="py-2">{index + 1}</td>
                    <td>
                      {participant.wallet_address.slice(0, 6)}...
                      {participant.wallet_address.slice(-4)}
                      {winner &&
                        participant.wallet_address ===
                          winner.wallet_address && (
                          <span className="ml-2 text-xs font-bold text-green-600">
                            (Winner!)
                          </span>
                        )}
                    </td>
                    <td>{participant.status}</td>
                    <td>{participant.score || "-"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Update the play button */}
      <div className="mt-6 flex justify-between">
        <button
          onClick={handlePlayGame}
          disabled={isChallengeEnded() || hasUserPlayed()}
          className="rounded-lg bg-primary px-6 py-2 text-white  disabled:opacity-50"
        >
          {isChallengeEnded()
            ? "Challenge Ended"
            : hasUserPlayed()
            ? "Already Played"
            : "Play"}
        </button>
      </div>
    </div>
  );
};
