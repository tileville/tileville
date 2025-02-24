import { Badge } from "@radix-ui/themes";
import { CountdownTimerSmall } from "../common/CountdownTimerSmall";
import { getBadgeColorFromStatus } from "@/lib/helpers";
import { ChallengeStatus } from "./ChallengesTabs/ChallengesList";

interface ChallengeListItemProps {
  challengeID: number;
  sn: number;
  challengeName: string;
  selectedChallengeId: number | undefined;
  selectChallengeFn: () => void;
  endTime: string;
  entryFee: number;
  challengeStatus: ChallengeStatus;
}

interface ColumnProps {
  className?: string;
  children: React.ReactNode;
}

// Column components for better organization
const Column = ({ className = "", children }: ColumnProps) => (
  <div className={className}>{children}</div>
);

const StatusBadge = ({ status }: { status: ChallengeStatus }) => (
  <Badge color={getBadgeColorFromStatus(status)} className="mb-2 !text-[10px]">
    {status}
  </Badge>
);

export const ChallengeListItem = ({
  challengeID,
  sn,
  challengeName,
  selectedChallengeId,
  selectChallengeFn,
  endTime,
  entryFee,
  challengeStatus,
}: ChallengeListItemProps) => {
  const isSelected = selectedChallengeId === challengeID;

  const baseClasses =
    "grid w-full cursor-pointer grid-cols-12 rounded-[10px] border";
  const responsiveClasses =
    "min-w-[120px] md:min-w-0 p-2 text-sm md:p-4 md:text-base";
  const selectedClasses = isSelected
    ? "border-primary bg-primary/30 outline outline-2 outline-[#38830A]"
    : "border-primary";

  return (
    <div
      className={`${baseClasses} ${responsiveClasses} ${selectedClasses}`}
      onClick={selectChallengeFn}
    >
      {/* Serial Number - Desktop only */}
      <Column className="col-span-1 hidden md:block">{sn}</Column>

      {/* Challenge Name - Full width on mobile */}
      <Column className="col-span-12 md:col-span-3">{challengeName}</Column>

      {/* Countdown Timer - Desktop only */}
      <Column className="col-span-3 hidden text-center md:block">
        <CountdownTimerSmall endTime={endTime} />
      </Column>

      {/* Entry Fee - Desktop only */}
      <Column className="col-span-2 hidden text-center md:block">
        {entryFee} MINA
      </Column>

      {/* Challenge Status - Desktop only */}
      <Column className="col-span-3 hidden text-center md:block">
        <StatusBadge status={challengeStatus} />
      </Column>
    </div>
  );
};
