import Image from "next/image";
import { Competition } from "@/types";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getTime, isAfter, isBefore } from "date-fns";
import * as Tooltip from "@radix-ui/react-tooltip";
import { CountdownTimer } from "./common/CountdownTimer";
import { HtmlRenderer } from "./common/HTMLRenderer";
import { InfoCircledIcon, TimerIcon } from "@radix-ui/react-icons";
import { DEFAULT_POSTER_URL } from "@/constants";

type CompetitionCardProps = {
  competition: Competition;
  setSelectedCompetition: Dispatch<SetStateAction<Competition>>;
  setIsFeesModalOpen: Dispatch<SetStateAction<boolean>>;
};

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
      className="border-primary-30 competitionCard group relative grid min-h-[320px] grid-cols-12 gap-2 overflow-hidden rounded-lg pb-3 md:gap-3 md:pb-0"
      key={competition.id}
    >
      <div className="relative col-span-12 aspect-square w-full overflow-hidden rounded-br-md h-auto md:h-full md:col-span-4 xl:h-[400px] xl:w-[400px] md:rounded-none">
        <Image
          src={competition.poster_url ?? DEFAULT_POSTER_URL}
          alt="competition poster url"
          fill
          className="h-full w-full object-cover object-left transition-transform group-hover:scale-110"
          sizes="(max-width: 1600px) 100%"
          priority={false}
        />
      </div>
      <div className="col-span-12 flex flex-col pb-0 pr-2 ps-2 pt-0 md:col-span-5 md:py-4 md:pr-0 md:ps-1">
        <h2 className="text-xl font-semibold">{competition.name}</h2>
        <div className="mb-2 flex flex-col flex-wrap space-y-2 text-sm text-black/50">
          <HtmlRenderer htmlContent={competition.description} />
        </div>
        <div className="my-3 mt-auto h-[1px] w-full bg-primary/30"></div>
        <div className="flex justify-between gap-1 text-sm font-medium md:gap-2">
          <div className="flex items-center gap-2">
            <p>Entry Fees:</p>
            <p className="text-base font-semibold">
              {competition.participation_fee} MINA
            </p>
          </div>

          {competitionStatus === "upcoming" && (
            <>
              <div className="h-full w-[1px] bg-primary/30"></div>
              <div className="flex items-center gap-2">
                <p>Duration:</p>
                <p className="text-base font-semibold">
                  {getDateDifference(
                    competition.start_date,
                    competition.end_date
                  )}
                </p>
              </div>
            </>
          )}

          <div className="h-full w-[1px] bg-primary/30"></div>
          <div className="flex items-center gap-2">
            <p>Prize Money 🤑:</p>
            <p className="text-base font-semibold">
              {competition.funds} {competition.currency_symbol}
            </p>
          </div>
        </div>
      </div>
      <div className=" col-span-12 px-1 md:col-span-3 md:py-4">
        <div className="grid h-full grid-cols-4 flex-wrap items-center justify-between md:flex md:flex-col md:items-start">
          <div className="col-span-4 mx-auto mb-1 flex items-center gap-2">
            {competitionStatus === "upcoming" && (
              <div>
                <h3 className="py-2 text-xl font-medium md:py-4">
                  Competition Starts In
                </h3>
                <CountdownTimer initialTime={getTime(competition.start_date)} />
              </div>
            )}
            {competitionStatus === "ongoing" && (
              <div>
                <h3 className="py-2 text-xl font-medium md:py-4">
                  Competition Ends In
                </h3>
                <CountdownTimer initialTime={getTime(competition.end_date)} />
              </div>
            )}
          </div>
          {competition.is_speed_version && (
            <div className="col-span-4">
              <div className="mb-2 flex justify-center md:justify-start items-center gap-2 text-xl">
                <span>
                  <Image
                    src="/icons/speed.svg"
                    alt="speed"
                    width="30"
                    height="30"
                  />
                </span>
                <p className="text-medium text-sm md:text-base">Speedy Version</p>
                <Tooltip.Provider delayDuration={200}>
                  <Tooltip.Root>
                    <Tooltip.Trigger asChild>
                      <InfoCircledIcon
                        width={24}
                        height={24}
                        className="text-black/50 hover:text-black"
                      />
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                      <Tooltip.Content
                        className="max-w-[250px] rounded-xl bg-white p-4 shadow-sm"
                        sideOffset={5}
                      >
                        In the speedy version of the game, the player will need
                        to finish the game in specific amount of time.
                        <Tooltip.Arrow className="TooltipArrow" />
                      </Tooltip.Content>
                    </Tooltip.Portal>
                  </Tooltip.Root>
                </Tooltip.Provider>
              </div>

              <div className="flex items-center justify-center md:justify-start gap-2 text-xl">
                <span>
                  <TimerIcon width={24} height={24} />
                </span>
                <p className="text-medium text-sm md:text-base">Game Time:-</p>
                <p className="text-medium text-sm md:text-base">
                  {competition.speed_duration} Secs
                </p>
              </div>
            </div>
          )}
          <div className="md:flex-0 col-span-4 flex w-full flex-1 flex-grow md:flex-none">
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
      {competition.competition_tweet_content &&
        competitionStatus !== "over" && (
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
            className="competition-tweet-btn ms-auto flex cursor-pointer items-center rounded-full bg-primary px-2 py-1 font-medium text-white"
          >
            <i className="twitterIcon h-3 w-3"></i>
            <span className="label whitespace-nowraw ms-1 font-medium" id="l">
              Tweet about competition
            </span>
          </button>
        )}
    </div>
  );
};

export const getDateDifference = (date1: string, date2: string): string => {
  const time1 = new Date(date1);
  const time2 = new Date(date2);

  const differenceMs = time2.getTime() - time1.getTime();
  const totalHours = Math.round(differenceMs / (1000 * 60 * 60));

  return `${totalHours} hour${totalHours !== 1 ? "s" : ""}`;
};
