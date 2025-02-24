import Image from "next/image";
import { Spinner2 } from "../common/Spinner";
import {
  useSendPrivateGroupMessage,
  useSendReward,
  useUsername,
} from "@/db/react-query-hooks";
import {
  generatePVPChallengeInviteLink,
  getMinaScanNormalLink,
} from "@/lib/helpers";

interface ClaimPrizeButtonProps {
  challengeName: string;
  challengeId: number;
  winnerAddress: string;
  winnerScore: number;
  challengeEntryFees: number;
  participantsLength: number;
  inviteCode: string;
  participantTxnHash: string;
}

interface WinnerMessageData {
  challengeName: string;
  challengeId: number;
  winnerAddress: string;
  winnerUsername: string | undefined | null;
  winnerScore: number;
  challengeEntryFees: number;
  participantsLength: number;
  inviteCode: string;
  participantTxnHash: string;
}

const generateWinnerMessage = ({
  challengeName,
  challengeId,
  winnerAddress,
  winnerUsername,
  winnerScore,
  challengeEntryFees,
  participantsLength,
  inviteCode,
  participantTxnHash,
}: WinnerMessageData): string => {
  return `🎮 Challenge "${challengeName}" Results 🏆
      
Challenge ID: ${challengeId}
Winner: ${winnerUsername || winnerAddress}
Winner wallet Address: ${winnerAddress}
Score: ${winnerScore}
Entry Fees: ${challengeEntryFees}
Prize Pool: ${challengeEntryFees * participantsLength} MINA
Number of Participants: ${participantsLength}
Challenge Link: ${generatePVPChallengeInviteLink(inviteCode)}

Congratulations! 🎉

${getMinaScanNormalLink(participantTxnHash)}`;
};

export const ClaimPrizeButton = ({
  challengeName,
  challengeId,
  winnerAddress,
  winnerScore,
  challengeEntryFees,
  participantsLength,
  inviteCode,
  participantTxnHash,
}: ClaimPrizeButtonProps) => {
  const sendPrivateGroupMessageMutation = useSendPrivateGroupMessage();
  const { mutate: sendReward, isError: isRewardError } = useSendReward();
  const { data: winnerUsername, isLoading: usernameLoading } =
    useUsername(winnerAddress);

  const sendPrivateMessage = async () => {
    if (!winnerAddress) return;

    const message = generateWinnerMessage({
      challengeName,
      challengeId,
      winnerAddress,
      winnerUsername,
      winnerScore,
      challengeEntryFees,
      participantsLength,
      inviteCode,
      participantTxnHash,
    });

    try {
      await sendPrivateGroupMessageMutation.mutateAsync({
        message,
        walletAddress: winnerAddress,
      });
    } catch (error) {
      console.error("Failed to send winner message:", error);
      throw error; // Re-throw to be handled by the reward sending flow
    }
  };

  const handleSendReward = () => {
    sendReward(
      {
        challengeId,
        winnerAddress,
      },
      {
        onSuccess: async (data) => {
          console.log("Reward sent successfully:", data);
          try {
            await sendPrivateMessage();
          } catch (error) {
            console.error("Error in reward claim process:", error);
            // Here you could add toast notification or other error handling UI
          }
        },
        onError: (error) => {
          console.error("Failed to send reward:", error);
          // Here you could add toast notification or other error handling UI
        },
      }
    );
  };

  const isLoading =
    sendPrivateGroupMessageMutation.isLoading || usernameLoading;
  const isDisabled = isLoading || isRewardError;

  return (
    <button
      onClick={handleSendReward}
      className="primary-outline-button flex items-center gap-2"
      disabled={isDisabled}
    >
      {isLoading ? (
        <>
          <Spinner2 size={16} />
          <span>Sending...</span>
        </>
      ) : (
        <>
          <Image src="/icons/trophy.png" width={20} height={20} alt="trophy" />
          <span>Claim Prize!</span>
        </>
      )}
    </button>
  );
};
