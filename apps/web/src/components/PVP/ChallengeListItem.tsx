import { Badge } from "@radix-ui/themes";
import { CountdownTimerSmall } from "../common/CountdownTimerSmall";
import { PRIMARY_OUTLINE_BUTTON } from "@/constants";
import { TransactionStatus } from "@/lib/types";

type ChallengeListItemType = {
  challengeID: number;
  sn: number;
  challengeName: string;
  txn_status: TransactionStatus;
  has_played: boolean;
  participantsLength: number;
  selectedChallengeId: number | undefined;
  selectChallengeFn: () => void;
  endTime: string;
  entryFee: number;
};

export const ChallengeListItem = ({
  challengeID,
  sn,
  challengeName,
  txn_status,
  has_played,
  participantsLength,
  selectedChallengeId,
  selectChallengeFn,
  endTime,
  entryFee,
}: ChallengeListItemType) => {
  const challengeStatus =
    participantsLength > 0
      ? getChallengeStatus({
          txn_status,
          has_played,
        })
      : ChallengeStatus.UNKNOWN_ERROR;

  const buttonState = getButtonState(challengeStatus);

  return (
    <div
      className={`grid w-full cursor-pointer grid-cols-12 rounded-[10px] border border-[#76993E] p-4 ${
        selectedChallengeId === challengeID
          ? "border-primary bg-[#99B579] outline outline-2 outline-[#38830A]"
          : "border-[#76993E]"
      }`}
      onClick={selectChallengeFn}
    >
      <div className="col-span-1">{sn}</div>
      <div className="col-span-3">{challengeName}</div>
      <div className="col-span-3 text-center">
        <CountdownTimerSmall endTime={endTime} />
      </div>
      <div className="col-span-2 text-center">{entryFee} MINA</div>
      <div className="col-span-3 text-center">
        <Badge
          color={getBadgeColorFromStatus(challengeStatus)}
          className="mb-2 !text-[10px]"
        >
          {challengeStatus}
        </Badge>
        <button
          className={`${PRIMARY_OUTLINE_BUTTON} disabled:opacity-60`}
          onClick={() => {
            if (buttonState.action === "play") {
              // Handle play action
            } else if (buttonState.action === "retry") {
              // Handle retry action
            }
          }}
          disabled={buttonState.disabled}
        >
          {buttonState.text}
        </button>
      </div>
    </div>
  );
};

enum ChallengeStatus {
  PAYMENT_PENDING = "PAYMENT_PENDING",
  READY_TO_PLAY = "READY_TO_PLAY",
  ALREADY_PLAYED = "ALREADY_PLAYED",
  PAYMENT_FAILED = "PAYMENT_FAILED",
  UNKNOWN_ERROR = "UNKNOWN_ERROR",
}

type ButtonState = {
  text: string;
  disabled: boolean;
  action: "play" | "retry" | "none";
};

export const getButtonState = (status: ChallengeStatus): ButtonState => {
  switch (status) {
    case ChallengeStatus.PAYMENT_PENDING:
      return {
        text: "Play",
        disabled: true,
        action: "none",
      };
    case ChallengeStatus.READY_TO_PLAY:
      return {
        text: "Play",
        disabled: false,
        action: "play",
      };
    case ChallengeStatus.ALREADY_PLAYED:
      return {
        text: "Played",
        disabled: true,
        action: "none",
      };
    case ChallengeStatus.PAYMENT_FAILED:
      return {
        text: "Retry",
        disabled: false,
        action: "retry",
      };
    case ChallengeStatus.UNKNOWN_ERROR:
      return {
        text: "Retry",
        disabled: false,
        action: "retry",
      };
  }
};

const getChallengeStatus = ({
  txn_status,
  has_played,
}: {
  txn_status: TransactionStatus;
  has_played: boolean;
}): ChallengeStatus => {
  if (has_played) return ChallengeStatus.ALREADY_PLAYED;
  if (txn_status === "PENDING") return ChallengeStatus.PAYMENT_PENDING;
  if (txn_status === "FAILED") return ChallengeStatus.PAYMENT_FAILED;
  return ChallengeStatus.READY_TO_PLAY;
};

const getBadgeColorFromStatus = (challengeStatus: ChallengeStatus) => {
  if (challengeStatus === ChallengeStatus.PAYMENT_PENDING) {
    return "yellow";
  } else if (
    challengeStatus === ChallengeStatus.READY_TO_PLAY ||
    challengeStatus === ChallengeStatus.ALREADY_PLAYED
  ) {
    return "green";
  } else {
    return "red";
  }
};
