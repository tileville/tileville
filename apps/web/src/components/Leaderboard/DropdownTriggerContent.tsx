import { Skeleton } from "@radix-ui/themes";
import Image from "next/image";
import { SelectedCompetition } from "./LeaderboardContent";

type DropdownTriggerContentType = {
  isLoading: boolean;
  selectedCompetition: SelectedCompetition | null;
};

export const DropdownTriggerContent = ({
  isLoading,
  selectedCompetition,
}: DropdownTriggerContentType) => {
  return (
    <button className="border-primary-30 flex h-10 items-center justify-between truncate rounded-md border bg-transparent px-2 text-sm font-semibold text-primary outline-none md:min-w-[224px] md:px-3 md:text-base">
      {isLoading || !selectedCompetition ? (
        <Skeleton className="h-5 w-full" />
      ) : (
        <span className="truncate">{selectedCompetition.name}</span>
      )}
      <span>
        <Image
          src="icons/topBottomArrows.svg"
          width={24}
          height={24}
          alt="arrows"
        />
      </span>
    </button>
  );
};
