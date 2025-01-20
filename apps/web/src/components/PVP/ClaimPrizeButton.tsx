import Image from "next/image";
import { Spinner2 } from "../common/Spinner";
import {
  useSendPrivateGroupMessage,
  useUsername,
} from "@/db/react-query-hooks";
import {
  generatePVPChallengeInviteLink,
  getMinaScanNormalLink,
} from "@/lib/helpers";

type ClaimPrizeButtonType = {
  challengeName: string;
  challengeId: number;
  winnerAddress: string;
  winnerScore: number;
  challengeEntryFees: number;
  participantsLength: number;
  inviteCode: string;
  participantTxnHash: string;
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
}: ClaimPrizeButtonType) => {
  const sendPrivateGroupMessageMutation = useSendPrivateGroupMessage();

  const { data: winnerUsername, isLoading: usernameLoading } =
    useUsername(winnerAddress);

  return (
    <button
      onClick={async () => {
        if (!winnerAddress) return;

        const message = `🎮 Challenge "${challengeName}" Results 🏆
        
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

        try {
          await sendPrivateGroupMessageMutation.mutateAsync({
            message,
            walletAddress: winnerAddress,
          });
        } catch (error) {
          console.error("Failed to send winner message:", error);
        }
      }}
      className="primary-outline-button flex items-center gap-2"
      disabled={sendPrivateGroupMessageMutation.isLoading || usernameLoading}
    >
      {sendPrivateGroupMessageMutation.isLoading ? (
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
