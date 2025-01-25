import { Badge } from "@radix-ui/themes";
import { CountdownTimerSmall } from "../common/CountdownTimerSmall";
import { getBadgeColorFromStatus } from "@/lib/helpers";
import { ChallengeStatus } from "./ChallengesTabs/ChallengesList";

type ChallengeListItemType = {
  challengeID: number;
  sn: number;
  challengeName: string;
  selectedChallengeId: number | undefined;
  selectChallengeFn: () => void;
  endTime: string;
  entryFee: number;
  challengeStatus: ChallengeStatus;
};

export const ChallengeListItem = ({
  challengeID,
  sn,
  challengeName,
  selectedChallengeId,
  selectChallengeFn,
  endTime,
  entryFee,
  challengeStatus,
}: ChallengeListItemType) => {
  return (
    <>
      <div
        className={`grid w-full cursor-pointer grid-cols-12 rounded-[10px] border border-primary p-4 ${
          selectedChallengeId === challengeID
            ? "border-primary bg-primary/30 outline outline-2 outline-[#38830A]"
            : "border-primary"
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
        </div>
      </div>
    </>
  );
};
