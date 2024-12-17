import {
  copyToClipBoard,
  formatAddress,
  generatePVPChallengeInviteLink,
  getMinaScanNormalLink,
} from "@/lib/helpers";
import { Challenge, ChallengeParticipant } from "@/types";
import { CopyIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { CountdownTimerSmall } from "@/components/common/CountdownTimerSmall";
import { useNetworkStore } from "@/lib/stores/network";
import { useRouter } from "next/navigation";
import {
  useMainnetPVPTransactionsStatus,
  usePVPChallengeTransaction,
  useSendPrivateGroupMessage,
  useUsername,
} from "@/db/react-query-hooks";
import { Skeleton } from "@radix-ui/themes";
import { useAuthSignature } from "@/hooks/useAuthSignature";
import { ChallengeStatus, getChallengeStatus } from "./ChallengesList";
import { isFuture } from "date-fns";
import { PRIMARY_OUTLINE_BUTTON } from "@/constants";
import { usePayPVPFees } from "@/hooks/usePayPVPFees";
import { useState } from "react";
import { Spinner2 } from "@/components/common/Spinner";
import { TransactionStatus } from "@/lib/types";
import { ParticipantsList } from "../ParticipantsList";
import { useThrottleWithIncreasingDelay } from "@/hooks/useThrottleWithIncreasingDelay";

type ChallengeDetailsProps = {
  challenge: Challenge;
  participants: ChallengeParticipant[];
};

export const ChallengeDetails = ({
  challenge,
  participants,
}: ChallengeDetailsProps) => {
  const txn_status = participants[0].txn_status as TransactionStatus;
  const has_played = participants[0].has_played;
  const challengeStatus = getChallengeStatus({
    txn_status,
    has_played,
  });
  // const challengeStatus = challenge.status as ChallengeStatus;
  const networkStore = useNetworkStore();
  const [payLoading, setPayLoading] = useState(false);
  const router = useRouter();

  const { payPVPFees } = usePayPVPFees();
  const { data: createdByUsername, isLoading: usernameLoading } = useUsername(
    challenge.created_by
  );

  const { data: challengeTransaction } = usePVPChallengeTransaction(
    networkStore.address || "",
    challenge.id
  );

  const sendPrivateGroupMessageMutation = useSendPrivateGroupMessage();

  const { refetch: refetchTxnStatus } = useMainnetPVPTransactionsStatus(
    challengeTransaction?.txn_hash || "",
    challengeTransaction?.txn_status as TransactionStatus,
    challenge.id
  );

  const { validateOrSetSignature, accountAuthSignature } = useAuthSignature();

  const { throttledFunction, isThrottled, currentDelay } =
    useThrottleWithIncreasingDelay(2000, 1000);

  const handleRefreshStatus = () => {
    throttledFunction(() => {
      refetchTxnStatus();
    });
  };

  const isChallengeActive = isFuture(challenge.end_time);

  const haveAllParticipantsPlayed = () => {
    return participants.length > 0 && participants.every((p) => p.has_played);
  };

  const getWinner = (): ChallengeParticipant | null => {
    if (isChallengeActive && !haveAllParticipantsPlayed()) return null;

    const playedParticipants = participants.filter((p) => p.has_played);
    if (playedParticipants.length === 0) return null;

    return playedParticipants.reduce((highest, current) => {
      if (!highest || (current.score || 0) > (highest.score || 0)) {
        return current;
      }
      return highest;
    }, playedParticipants[0]);
  };

  const handlePayParticipationFess = async () => {
    if (!networkStore.address) {
      return networkStore.connectWallet(false);
    }
    setPayLoading(true);

    //TODO: Add posthog Event for challenges
    await payPVPFees({
      participation_fee: challenge.entry_fee ?? 0,
      challenge_id: challenge.id,
    });
    setPayLoading(false);
  };

  // const handlePlayGame = async () => {
  //   if (!accountAuthSignature) {
  //     await validateOrSetSignature();
  //     return;
  //   }
  //   // Find participant's game record
  //   const currentParticipant = participants.find(
  //     (p) => p.wallet_address === networkStore.address
  //   );

  //   if (!currentParticipant) {
  //     toast.error("You haven't joined this challenge yet!");
  //     return;
  //   }

  //   if (currentParticipant.has_played) {
  //     toast.error("You've already played this challenge!");
  //     return;
  //   }

  //   if (!isChallengeActive) {
  //     toast.error("This challenge has ended!");
  //     return;
  //   }

  //   router.push(`/pvp/${challenge.id}/game`);
  // };

  const inviteLink = generatePVPChallengeInviteLink(challenge.invite_code);

  return (
    <div className="relative rounded-lg border border-[#38830A] bg-[#99B579] p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold">{challenge.name}</h2>
        <p className="absolute right-2 top-2 flex min-h-[15px] items-center justify-center rounded-[5px] bg-[#90AA70] px-2 text-[10px] font-medium text-[#0D0D0D]">
          <span className="mr-1">Challenge Created by:</span>
          {usernameLoading ? (
            <Skeleton className="h-2 w-20" />
          ) : createdByUsername ? (
            <Link
              href={`${window.location.origin}/u/${createdByUsername}`}
              className="underline hover:no-underline"
              target="_blank"
            >
              {createdByUsername}
            </Link>
          ) : (
            formatAddress(challenge.created_by)
          )}
        </p>
      </div>

      <div className="mb-4 grid grid-cols-3 gap-2">
        <div className="flex flex-col rounded-lg border border-[#76993E] bg-[#99B579] p-4">
          <div>
            <Image src="/icons/timer.png" width={27} height={27} alt="timer" />
          </div>
          <p className="mb-1 mt-2 text-xl font-bold">Time remaining</p>
          <div className="mt-auto">
            <CountdownTimerSmall endTime={challenge.end_time} />
          </div>
        </div>

        <div className="flex flex-col rounded-lg border border-[#76993E] bg-[#99B579] p-4">
          <Image src="/icons/cashCoin.png" width={27} height={27} alt="money" />
          <p className="mb-1 mt-2 text-xl font-bold">
            Entry <br /> Fees
          </p>
          <p className="mt-auto">{challenge.entry_fee} MINA</p>
        </div>

        {challenge.is_speed_challenge && (
          <div className="flex flex-col rounded-lg border border-[#76993E] bg-[#99B579] p-4">
            <Image src="/icons/rocket.png" width={27} height={27} alt="speed" />
            <p className="mb-1 mt-2 text-xl font-bold">
              Speed <br /> Challenge
            </p>
            <p className="mt-auto">{challenge.speed_duration} seconds</p>
          </div>
        )}
      </div>

      <div className="mb-2 ">
        <span className="text-base font-medium"></span>
        Max Participants:
        <span className="ml-3 text-xl font-bold">
          {challenge.max_participants}
        </span>
      </div>

      <div className="mb-6">
        <h3 className="mb-2 text-base font-medium">Share Invite Link</h3>
        <div className="relative">
          <input
            type="text"
            value={inviteLink}
            readOnly
            className="min-h-[43px] w-full flex-1 rounded-[10px] border border-[#38830A] bg-transparent pr-14 ps-2 outline-none"
          />
          <button
            onClick={() =>
              copyToClipBoard({
                toCopyContent: inviteLink,
                copiedType: "Invite Link",
              })
            }
            className="absolute right-4 top-1/2 -translate-y-1/2"
          >
            <CopyIcon width={26} height={26} />
          </button>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="mb-2 text-base font-medium">
          Share Invite Link on Socials
        </h3>
        <div className="flex gap-2">
          <Link
            href={`https://twitter.com/intent/tweet?text=Join my TileVille challenge! ${inviteLink}`}
            target="_blank"
            className=""
          >
            <Image src="/icons/x.svg" width={43} height={43} alt="X" />
          </Link>
          <Link
            href={`https://t.me/share/url?url=${inviteLink}`}
            target="_blank"
            className=""
          >
            <Image
              src="/icons/telegram.svg"
              width={43}
              height={43}
              alt="Telegram"
            />
          </Link>
        </div>
      </div>

      {!isChallengeActive &&
        getWinner()?.wallet_address === networkStore.address && (
          <div className="mt-4 flex justify-center">
            <button
              onClick={async () => {
                if (!networkStore.address) return;

                const message = `🎮 Challenge "${challenge.name}" Results 🏆

Winner: ${createdByUsername || formatAddress(networkStore.address)}
Score: ${getWinner()?.score}
Prize Pool: ${challenge.entry_fee * participants.length} MINA
Number of Participants: ${participants.length}/${challenge.max_participants}
Challenge Link: ${generatePVPChallengeInviteLink(challenge.invite_code)}

Congratulations! 🎉

${getMinaScanNormalLink(challengeTransaction?.txn_hash || "")}`;

                try {
                  await sendPrivateGroupMessageMutation.mutateAsync({
                    message,
                    walletAddress: networkStore.address,
                  });
                } catch (error) {
                  console.error("Failed to send winner message:", error);
                }
              }}
              className={`${PRIMARY_OUTLINE_BUTTON} flex items-center gap-2`}
              disabled={sendPrivateGroupMessageMutation.isLoading}
            >
              {sendPrivateGroupMessageMutation.isLoading ? (
                <>
                  <Spinner2 size={16} />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Image
                    src="/icons/trophy.png"
                    width={20}
                    height={20}
                    alt="trophy"
                  />
                  <span>Announce Victory!</span>
                </>
              )}
            </button>
          </div>
        )}

      <div>
        <h3 className="mb-4 text-lg font-bold">Participants List</h3>
        <ParticipantsList winner={getWinner()} participants={participants} />
      </div>

      {/* Update the play button */}
      <div className="mt-6 flex justify-end">
        {/* <button
          onClick={handlePlayGame}
          disabled={isChallengeEnded() || hasUserPlayed()}
          className="rounded-lg bg-primary px-6 py-2 text-white  disabled:opacity-50"
        >
          {isChallengeEnded()
            ? "Challenge Ended"
            : hasUserPlayed()
            ? "Already Played"
            : "Play"}
        </button> */}

        {challengeStatus === ChallengeStatus.PAYMENT_NOT_INIT &&
          isChallengeActive && (
            <button
              className={`${PRIMARY_OUTLINE_BUTTON} disabled:opacity-60`}
              onClick={handlePayParticipationFess}
            >
              Pay Now
            </button>
          )}
        {challengeStatus === ChallengeStatus.TXN_NOT_CONFIRMED &&
          isChallengeActive && (
            <div className="flex w-full justify-between gap-2">
              <Link
                className={`${PRIMARY_OUTLINE_BUTTON} min-w-[140px] text-center disabled:opacity-60`}
                onClick={handleRefreshStatus}
                href={getMinaScanNormalLink(
                  challengeTransaction?.txn_hash || ""
                )}
                target="_blank"
              >
                Check Status
              </Link>

              <button
                className={`${PRIMARY_OUTLINE_BUTTON} min-w-[140px] disabled:opacity-60`}
                onClick={handleRefreshStatus}
                disabled={isThrottled}
              >
                {isThrottled
                  ? `Try again in ${Math.ceil(currentDelay / 1000)}s`
                  : "Refresh Status"}
              </button>

              <button
                className={`${PRIMARY_OUTLINE_BUTTON} relative min-w-[120px] disabled:opacity-60`}
                onClick={handlePayParticipationFess}
                disabled={payLoading}
              >
                Try Again
                {payLoading && (
                  <span className="absolute left-1 top-1/2 -translate-y-1/2">
                    <Spinner2 size={12} />
                  </span>
                )}
              </button>
            </div>
          )}
        {challengeStatus === ChallengeStatus.READY_TO_PLAY &&
          isChallengeActive && (
            <button
              className={`${PRIMARY_OUTLINE_BUTTON} disabled:opacity-60`}
              onClick={() => {
                router.push(`/pvp/${challenge.id}/game`);
              }}
            >
              Play
            </button>
          )}
        {challengeStatus === ChallengeStatus.PAYMENT_FAILED &&
          isChallengeActive && (
            <button
              className={`${PRIMARY_OUTLINE_BUTTON} disabled:opacity-60`}
              onClick={handlePayParticipationFess}
            >
              Retry
            </button>
          )}
      </div>
      <p className="mt-4 text-center text-xs text-[#5D6845]">
        Note: The winner will receive all the rewards
      </p>
    </div>
  );
};
