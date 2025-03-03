import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useNetworkStore } from "@/lib/stores/network";
import { isFuture } from "date-fns";
import {
  usePVPChallengeTransaction,
  useMainnetPVPTransactionsStatus,
  useUsername,
} from "@/db/react-query-hooks";
import { Skeleton } from "@radix-ui/themes";
import { CopyIcon } from "@radix-ui/react-icons";
import { Challenge, ChallengeParticipant } from "@/types";
import { TransactionStatus } from "@/lib/types";
import { ChallengeStatus } from "./ChallengesList";
import { useThrottleWithIncreasingDelay } from "@/hooks/useThrottleWithIncreasingDelay";
import { Spinner2 } from "@/components/common/Spinner";
import { CountdownTimerSmall } from "@/components/common/CountdownTimerSmall";
import { ParticipantsList } from "../ParticipantsList";
import { ClaimPrizeButton } from "../ClaimPrizeButton";
import { RewardsSentContent } from "../RewardsSentContent";
import { usePayPVPFees } from "@/hooks/usePayPVPFees";
import {
  copyToClipBoard,
  generatePVPChallengeInviteLink,
  getChallengeStatus,
  getMinaScanNormalLink,
  handleSocialShare,
  formatAddress,
} from "@/lib/helpers";

// Types
type ChallengeDetailsProps = {
  challenge: Challenge;
  participants: ChallengeParticipant[];
};

type InfoCardProps = {
  icon: string;
  title: string;
  value: React.ReactNode;
};

// Component for challenge info cards
const InfoCard = ({ icon, title, value }: InfoCardProps) => (
  <div className="flex flex-col rounded-lg border border-primary bg-transparent p-2 md:p-4">
    <div>
      <Image src={icon} width={27} height={27} alt={title} />
    </div>
    <p className="mb-1 mt-2 text-sm font-bold md:text-xl">{title}</p>
    <div className="mt-auto">{value}</div>
  </div>
);

// Component for share section
const ShareSection = ({
  inviteLink,
  challengeName,
  entryFee,
}: {
  inviteLink: string;
  challengeName: string;
  entryFee: number;
}) => (
  <>
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
              challengeName,
              entryFee,
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
              challengeName,
              entryFee,
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
  </>
);

// Play button section with different states
const ActionButtons = ({
  challengeStatus,
  isChallengeActive,
  challengeTransaction,
  handleRefreshStatus,
  isThrottled,
  currentDelay,
  payLoading,
  handlePayFees,
  router,
  challengeId,
}: {
  challengeStatus: ChallengeStatus;
  isChallengeActive: boolean;
  challengeTransaction: any;
  handleRefreshStatus: () => void;
  isThrottled: boolean;
  currentDelay: number;
  payLoading: boolean;
  handlePayFees: () => Promise<void>;
  router: any;
  challengeId: number;
}) => {
  if (!isChallengeActive) return null;

  switch (challengeStatus) {
    case ChallengeStatus.PAYMENT_NOT_INIT:
      return (
        <button
          className="primary-outline-button relative min-w-[120px] disabled:opacity-60"
          onClick={handlePayFees}
        >
          Pay Now
          {payLoading && (
            <span className="absolute left-1 top-1/2 -translate-y-1/2">
              <Spinner2 size={12} />
            </span>
          )}
        </button>
      );

    case ChallengeStatus.TXN_NOT_CONFIRMED:
      return (
        <div className="flex w-full justify-between gap-2">
          <Link
            className="primary-outline-button min-w-[140px] text-center disabled:opacity-60"
            onClick={handleRefreshStatus}
            href={getMinaScanNormalLink(challengeTransaction?.txn_hash || "")}
            target="_blank"
          >
            Check Status
          </Link>

          <button
            className="primary-outline-button min-w-[140px] disabled:opacity-60"
            onClick={handleRefreshStatus}
            disabled={isThrottled}
          >
            {isThrottled
              ? `Try again in ${Math.ceil(currentDelay / 1000)}s`
              : "Refresh Status"}
          </button>

          <button
            className="primary-outline-button relative min-w-[120px] disabled:opacity-60"
            onClick={handlePayFees}
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
      );

    case ChallengeStatus.READY_TO_PLAY:
      return (
        <button
          className="primary-outline-button disabled:opacity-60"
          onClick={() => router.push(`/pvp/${challengeId}/game`)}
        >
          Play
        </button>
      );

    case ChallengeStatus.PAYMENT_FAILED:
      return (
        <button
          className="primary-outline-button relative min-w-[120px] disabled:opacity-60"
          onClick={handlePayFees}
        >
          Retry
          {payLoading && (
            <span className="absolute left-1 top-1/2 -translate-y-1/2">
              <Spinner2 size={12} />
            </span>
          )}
        </button>
      );

    default:
      return null;
  }
};

export const ChallengeDetails = ({
  challenge,
  participants,
}: ChallengeDetailsProps) => {
  const [payLoading, setPayLoading] = useState(false);
  const networkStore = useNetworkStore();
  const router = useRouter();
  const { payPVPFees } = usePayPVPFees();

  // Custom hooks
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

  const { throttledFunction, isThrottled, currentDelay } =
    useThrottleWithIncreasingDelay(2000, 1000);

  // Derived state
  const txn_status = participants[0]?.txn_status as TransactionStatus;
  const has_played = participants[0]?.has_played;
  const challengeStatus = getChallengeStatus({ txn_status, has_played });
  const isChallengeActive = isFuture(challenge.end_time);
  const inviteLink = generatePVPChallengeInviteLink(challenge.invite_code);

  // Helper functions
  const handleRefreshStatus = () => {
    throttledFunction(() => {
      refetchTxnStatus();
    });
  };

  const handlePayFees = async () => {
    if (!networkStore.address) {
      return networkStore.connectWallet(false);
    }
    setPayLoading(true);

    await payPVPFees({
      participation_fee: challenge.entry_fee ?? 0,
      challenge_id: challenge.id,
    });
    setPayLoading(false);
  };

  const getWinner = (): ChallengeParticipant | null => {
    // Challenge is finished if either it's ended or max participants reached and all have played
    const isChallengeFinished =
      !isChallengeActive ||
      (participants.length >= challenge.max_participants &&
        participants.every((p) => p.has_played));

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

  const winner = getWinner();
  const showWinnerSection =
    ((participants.length >= challenge.max_participants &&
      participants.every((p) => p.has_played)) ||
      !isChallengeActive) &&
    winner?.wallet_address === networkStore.address;

  return (
    <div className="relative rounded-lg border border-primary bg-primary/40 p-2 text-sm md:p-6 md:text-base">
      {/* Header section */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-bold md:text-2xl">{challenge.name}</h2>
        <p className="absolute right-2 top-2 flex min-h-[15px] items-center justify-center rounded-[5px] bg-primary/10 px-2 text-[10px] font-medium text-[#0D0D0D]">
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

      {/* Info cards */}
      <div className="mb-4 grid grid-cols-3 gap-2">
        <InfoCard
          icon="/icons/timer.png"
          title="Time remaining"
          value={<CountdownTimerSmall endTime={challenge.end_time} />}
        />

        <InfoCard
          icon="/icons/cashCoin.png"
          title="Entry Fees"
          value={`${challenge.entry_fee} MINA`}
        />

        {challenge.is_speed_challenge && (
          <InfoCard
            icon="/icons/rocket.png"
            title="Speed Challenge"
            value={`${challenge.speed_duration} seconds`}
          />
        )}
      </div>

      {/* Challenge details */}
      <div className="mb-2">
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

      {/* Share section */}
      <ShareSection
        inviteLink={inviteLink}
        challengeName={challenge.name}
        entryFee={challenge.entry_fee}
      />

      {/* Winner section */}
      {showWinnerSection && (
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

      {/* Participants list */}
      <div>
        <h3 className="mb-4 text-lg font-bold">Participants List</h3>
        <ParticipantsList winner={winner} participants={participants} />
      </div>

      {/* Action buttons */}
      <div className="mt-6 flex justify-end">
        <ActionButtons
          challengeStatus={challengeStatus}
          isChallengeActive={isChallengeActive}
          challengeTransaction={challengeTransaction}
          handleRefreshStatus={handleRefreshStatus}
          isThrottled={isThrottled}
          currentDelay={currentDelay}
          payLoading={payLoading}
          handlePayFees={handlePayFees}
          router={router}
          challengeId={challenge.id}
        />
      </div>
    </div>
  );
};
