import {
  copyToClipBoard,
  formatAddress,
  generatePVPChallengeInviteLink,
  getMinaScanNormalLink,
  handleSocialShare,
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
import { ClaimPrizeButton } from "../ClaimPrizeButton";
import { RewardsSentContent } from "../RewardsSentContent";

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

  const getWinner = (): ChallengeParticipant | null => {
    // Challenge is finished if either it's ended or max participants reached and all have played
    const isChallengeFinished =
      (!isChallengeActive ||
        participants.length >= challenge.max_participants) &&
      participants.every((p) => p.has_played);

    if (!isChallengeFinished) return null;

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

  const inviteLink = generatePVPChallengeInviteLink(challenge.invite_code);
  const winner = getWinner();

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
      <div className="mb-2">
        The winner will receive{" "}
        <span className="font-semibold">
          {participants.length * challenge.entry_fee - 1} MINA{" "}
        </span>
        rewards
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
          <button
            onClick={() =>
              handleSocialShare({
                platform: "twitter",
                inviteLink,
                challengeName: challenge.name,
                entryFee: challenge.entry_fee || 0,
              })
            }
          >
            <Image src="/icons/x.svg" width={43} height={43} alt="X" />
          </button>
          <button
            onClick={() =>
              handleSocialShare({
                platform: "telegram",
                inviteLink,
                challengeName: challenge.name,
                entryFee: challenge.entry_fee || 0,
              })
            }
          >
            <Image
              src="/icons/telegram.svg"
              width={43}
              height={43}
              alt="Telegram"
            />
          </button>
        </div>
      </div>
      {((participants.length >= challenge.max_participants &&
        participants.every((p) => p.has_played)) ||
        !isChallengeActive) &&
        winner?.wallet_address === networkStore.address && (
          <div className="my-2 flex justify-center">
            {challenge.is_reward_sent ? (
              <RewardsSentContent
                rewardCount={participants.length * challenge.entry_fee - 1}
                rewardTxnHash={challenge.reward_txn_hash}
              />
            ) : (
              <ClaimPrizeButton
                challengeName={challenge.name}
                challengeId={challenge.id}
                winnerAddress={winner?.wallet_address || ""}
                winnerScore={winner?.score || 0}
                challengeEntryFees={challenge.entry_fee}
                participantsLength={participants.length}
                inviteCode={challenge.invite_code}
                participantTxnHash={challengeTransaction?.txn_hash || ""}
              />
            )}
          </div>
        )}
      <div>
        <h3 className="mb-4 text-lg font-bold">Participants List</h3>
        <ParticipantsList winner={winner} participants={participants} />
      </div>

      {/* Update the play button */}
      <div className="mt-6 flex justify-end">
        {challengeStatus === ChallengeStatus.PAYMENT_NOT_INIT &&
          isChallengeActive && (
            <button
              className={`${PRIMARY_OUTLINE_BUTTON} relative min-w-[120px] disabled:opacity-60`}
              onClick={handlePayParticipationFess}
            >
              Pay Now
              {payLoading && (
                <span className="absolute left-1 top-1/2 -translate-y-1/2">
                  <Spinner2 size={12} />
                </span>
              )}
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
              className={`${PRIMARY_OUTLINE_BUTTON} relative min-w-[120px] disabled:opacity-60`}
              onClick={handlePayParticipationFess}
            >
              Retry
              {payLoading && (
                <span className="absolute left-1 top-1/2 -translate-y-1/2">
                  <Spinner2 size={12} />
                </span>
              )}
            </button>
          )}
      </div>
    </div>
  );
};
