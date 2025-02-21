import { SelectedCompetition } from "./LeaderboardContent";
import { DropdownMenu } from "@radix-ui/themes";

export const CompetitionMenuItem = ({
  competition,
  isSelected,
  onSelect,
}: {
  competition: any;
  isSelected: boolean;
  onSelect: (competition: SelectedCompetition) => void;
}) => (
  <DropdownMenu.Item
    onClick={() =>
      onSelect({
        id: competition.id,
        competition_key: competition.unique_keyname,
        name: competition.name,
        start_date: competition.start_date,
        end_date: competition.end_date,
      })
    }
    className={`!md:h-8 mt-1 !h-auto py-2 transition-colors ${
      isSelected ? "bg-primary text-white" : "hover:bg-primary hover:text-white"
    }`}
  >
    <div className="flex w-full items-center justify-between px-2">
      <span>{competition.name}</span>
      {isSelected && <span className="text-sm">✓</span>}
    </div>
  </DropdownMenu.Item>
);
