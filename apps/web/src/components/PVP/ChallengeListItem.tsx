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
        className={`grid w-full cursor-pointer grid-cols-12 min-w-[120px] md:min-w-0 rounded-[10px] border border-primary p-2 text-sm md:p-4 md:text-base ${
          selectedChallengeId === challengeID
            ? "border-primary bg-primary/30 outline outline-2 outline-[#38830A]"
            : "border-primary"
        }`}
        onClick={selectChallengeFn}
      >
        <div className="col-span-1 hidden md:block">{sn}</div>
        <div className="col-span-12 md:col-span-3">{challengeName}</div>
        <div className="col-span-3 hidden text-center md:block">
          <CountdownTimerSmall endTime={endTime} />
        </div>
        <div className="col-span-2 hidden text-center md:block">
          {entryFee} MINA
        </div>
        <div className="col-span-3 hidden text-center md:block">
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
