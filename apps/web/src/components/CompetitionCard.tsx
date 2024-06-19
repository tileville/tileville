import Image from "next/image";
import { Competition } from "@/types";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getMilliseconds, isAfter, isBefore } from "date-fns";
import * as Tooltip from "@radix-ui/react-tooltip";
import { CountdownTimer } from "./common/CountdownTimer";

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

  useEffect(() => {
    const currentDate = new Date();
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
      className="border-primary-30 competitionCard group relative grid grid-cols-12 gap-3 overflow-hidden rounded-lg"
      key={competition.id}
    >
      <div className="col-span-2 h-36 overflow-hidden">
        <Image
          src={competition.poster_url ?? DEFAULT_POSTER_URL}
          alt="competition poster url"
          width={300}
          height={200}
          className="h-full w-full object-cover transition-transform group-hover:scale-110"
        />
      </div>

      <div className="col-span-8 flex flex-col p-4">
        <h2 className="text-xl font-semibold">{competition.name}</h2>
        <p className="mb-2 line-clamp-2 text-sm text-black/50">
          {competition.description}
        </p>
        <div className="my-3 mt-auto h-[1px] w-full bg-primary/30"></div>
        <div className="flex justify-between gap-3 text-sm font-medium">
          <div className="flex items-center gap-2">
            <CalendarIcon />

            {competitionStatus === "upcoming" && (
              <div>
                <h3>Competiton Starts In</h3>
                <CountdownTimer
                  countdownTime={getMilliseconds(competition.start_date)}
                />
              </div>
            )}
            {competitionStatus === "ongoing" && (
              <div>
                <h3>Competiton Ends In</h3>
                <CountdownTimer
                  countdownTime={getMilliseconds(competition.end_date)}
                />
              </div>
            )}
          </div>
          <>
            <div className="h-full w-[1px] bg-primary/30"></div>
            <div className="flex items-center gap-2">
              <p>Entry Fees:</p>
              <p className="text-base font-semibold">
                {competition.participation_fee} MINA
              </p>
            </div>
            <div className="h-full w-[1px] bg-primary/30"></div>
            <div className="flex items-center gap-2">
              <p>Prize Money 🤑:</p>
              <p className="text-base font-semibold">
                {competition.funds} MINA
              </p>
            </div>
          </>
        </div>
      </div>
      <div className="col-span-2 p-4">
        <div className="flex h-full items-start">
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
        </div>
      </div>
    </div>
  );
};
