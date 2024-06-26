import Image from "next/image";
import { Competition } from "@/types";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getTime, isAfter, isBefore } from "date-fns";
import * as Tooltip from "@radix-ui/react-tooltip";
import { CountdownTimer } from "./common/CountdownTimer";
import { HtmlRenderer } from "./common/HTMLRenderer";

type CompetitionCardProps = {
  competition: Competition;
  setSelectedCompetition: Dispatch<SetStateAction<Competition>>;
  setIsFeesModalOpen: Dispatch<SetStateAction<boolean>>;
};

const DEFAULT_POSTER_URL = "/img/avatars/2.jpeg";

type CompetitionStatus = "upcoming" | "ongoing" | "over";
export const CompetitionCard = ({
  competition,
  setSelectedCompetition,
  setIsFeesModalOpen,
}: CompetitionCardProps) => {
  const [competitionStatus, setCompetitionStatus] =
    useState<CompetitionStatus>("upcoming");
  const [currentDate] = useState(new Date());

  useEffect(() => {
    const isStartBeforeCurrent = isBefore(competition.start_date, currentDate);
    const isStartAfterCurrent = isAfter(competition.start_date, currentDate);
    const isEndAfterCurrent = isAfter(competition.end_date, currentDate);
    const isEndBeforeCurrent = isBefore(competition.end_date, currentDate);
    if (isStartAfterCurrent) {
      setCompetitionStatus("upcoming");
    } else if (isEndBeforeCurrent) {
      setCompetitionStatus("over");
    } else if (isStartBeforeCurrent && isEndAfterCurrent) {
      setCompetitionStatus("ongoing");
    }
  }, []);

  return (
    <div
      className="border-primary-30 competitionCard group relative grid min-h-[320px] grid-cols-12 gap-3 overflow-hidden rounded-lg"
      key={competition.id}
    >
      <div className="relative col-span-4 h-full overflow-hidden">
        <Image
          src={competition.poster_url ?? DEFAULT_POSTER_URL}
          alt="competition poster url"
          fill
          className="h-full w-full object-cover object-left transition-transform group-hover:scale-110"
        />
      </div>
      <div className="col-span-5 flex flex-col p-4">
        <h2 className="text-xl font-semibold">{competition.name}</h2>
        <div className="mb-2 flex flex-col flex-wrap space-y-2 text-sm text-black/50">
          <HtmlRenderer htmlContent={competition.description} />
        </div>
        <div className="my-3 mt-auto h-[1px] w-full bg-primary/30"></div>
        <div className="flex justify-between gap-3 text-sm font-medium">
          <div className="flex items-center gap-2">
            <p>Entry Fees:</p>
            <p className="text-base font-semibold">
              {competition.participation_fee} MINA
            </p>
          </div>
          <div className="h-full w-[1px] bg-primary/30"></div>
          <div className="flex items-center gap-2">
            <p>Prize Money 🤑:</p>
            <p className="text-base font-semibold">{competition.funds} MINA</p>
          </div>
        </div>
      </div>
      <div className="col-span-3 p-4">
        <div className="flex h-full flex-col items-start justify-between">
          <div className="mx-auto mb-1 flex items-center gap-2">
            {competitionStatus === "upcoming" && (
              <div>
                <h3 className="py-4 text-xl font-medium">
                  Competition Starts In
                </h3>
                <CountdownTimer initialTime={getTime(competition.start_date)} />
              </div>
            )}
            {competitionStatus === "ongoing" && (
              <div>
                <h3 className="pb-4 text-xl font-medium">
                  Competition Ends In
                </h3>
                <CountdownTimer initialTime={getTime(competition.end_date)} />
              </div>
            )}
          </div>

          <Tooltip.Provider delayDuration={300}>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <button
                  className="animated-button-v1 mx-auto w-full cursor-pointer whitespace-nowrap rounded-md border-2 border-primary bg-primary bg-opacity-30 py-2 text-center leading-none text-white disabled:cursor-not-allowed disabled:bg-primary/60"
                  onClick={() => {
                    setSelectedCompetition(competition);
                    setIsFeesModalOpen(true);
                  }}
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
          {competition.competition_tweet_content && (
            <button
              onClick={() => {
                window.open(
                  `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                    competition.competition_tweet_content
                  )}`,
                  "_blank",
                  "noopener,noreferrer"
                );
              }}
            >
              Tweet About US
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
