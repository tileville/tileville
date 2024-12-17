// src/components/PVP/ParticipantsList.tsx
import { ChallengeParticipant } from "@/types";
import { Badge } from "@radix-ui/themes";
import { getBadgeColorFromStatus } from "./ChallengeListItem";
import { TransactionStatus } from "@/lib/types";
import { getChallengeStatus } from "./ChallengesTabs/ChallengesList";

type ParticipantsListProps = {
  participants: ChallengeParticipant[];
  winner: ChallengeParticipant | null;
};

export const ParticipantsList = ({
  participants,
  winner,
}: ParticipantsListProps) => {
  return (
    <div className="max-h-[180px] overflow-auto rounded-lg border border-black/20 p-4 shadow-[0px_4px_4px_0px_#00000040]">
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
              <td colSpan={4} className="p-4 text-center text-2xl font-bold">
                No one has joined Yet!
              </td>
            </tr>
          ) : (
            participants.map((participant, index) => {
              const txn_status = participant?.txn_status as TransactionStatus;
              const has_played = participant?.has_played
                ? participant?.has_played
                : false;
              const participantChallengeStatus = getChallengeStatus({
                txn_status,
                has_played,
              });

              return (
                <tr key={index} className="border-none">
                  <td className="py-2">{index + 1}</td>
                  <td>
                    {participant.wallet_address.slice(0, 6)}...
                    {participant.wallet_address.slice(-4)}
                    {winner &&
                      participant.wallet_address === winner.wallet_address && (
                        <span className="ml-2 text-xs font-bold text-green-600">
                          (Winner!)
                        </span>
                      )}
                  </td>
                  <td className="text-xs">
                    <Badge
                      color={getBadgeColorFromStatus(
                        participantChallengeStatus
                      )}
                      className="!text-[10px]"
                    >
                      {participantChallengeStatus}
                    </Badge>
                  </td>
                  <td>{participant.score || "-"}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};
