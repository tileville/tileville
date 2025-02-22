import * as Tooltip from "@radix-ui/react-tooltip";
import { CompetitionStatus } from "./CompetitionCard";

type JoinCompetitionButtonType = {
  competitionStatus: CompetitionStatus;
  joinCompetition: () => void;
};

export const JoinCompetitionButton = ({
  competitionStatus,
  joinCompetition,
}: JoinCompetitionButtonType) => {
  return (
    <Tooltip.Provider delayDuration={300}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button
            className="animated-button-v1 mx-auto w-full cursor-pointer whitespace-nowrap rounded-md border-2 border-primary bg-primary bg-opacity-30 py-2 text-center leading-none text-white disabled:cursor-not-allowed disabled:bg-primary/60"
            onClick={joinCompetition}
            disabled={competitionStatus !== "ongoing"}
          >
            {competitionStatus === "ongoing"
              ? "Join Now"
              : competitionStatus === "upcoming"
              ? "Competition Starts Soon"
              : "Competition Ended"}
          </button>
        </Tooltip.Trigger>
        {competitionStatus === "upcoming" && (
          <Tooltip.Portal>
            <Tooltip.Content
              className="whitespace-nowrap rounded-md bg-primary/10 px-4 py-1 shadow-lg backdrop-blur-xl"
              sideOffset={5}
            >
              Competition Starts Soon...
              <Tooltip.Arrow className="TooltipArrow" />
            </Tooltip.Content>
          </Tooltip.Portal>
        )}
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};
