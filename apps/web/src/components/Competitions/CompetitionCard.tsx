import Image from "next/image";
import Link from "next/link";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Competition } from "@/types";
import { getTime, isAfter, isBefore } from "date-fns";
import { CountdownTimer } from "../common/CountdownTimer";
import { HtmlRenderer } from "../common/HTMLRenderer";
import { DEFAULT_POSTER_URL } from "@/constants";
import { CompetitionTweetButton } from "./CompetitionTweetButton";
import { SpeedVersionContent } from "./SpeedVersionContent";
import { JoinCompetitionButton } from "./JoinCompetitionButton";

type CompetitionCardProps = {
  competition: Competition;
  setSelectedCompetition: Dispatch<SetStateAction<Competition>>;
  setIsFeesModalOpen: Dispatch<SetStateAction<boolean>>;
};

export type CompetitionStatus = "upcoming" | "ongoing" | "over";
export const CompetitionCard = ({
  competition,
  setSelectedCompetition,
  setIsFeesModalOpen,
}: CompetitionCardProps) => {
  const [competitionStatus, setCompetitionStatus] =
    useState<CompetitionStatus>("upcoming");

  useEffect(() => {
    const currentDate = new Date();
    if (isAfter(competition.start_date, currentDate)) {
      setCompetitionStatus("upcoming");
    } else if (isBefore(competition.end_date, currentDate)) {
      setCompetitionStatus("over");
    } else {
      setCompetitionStatus("ongoing");
    }
  }, [competition.start_date, competition.end_date]);

  return (
    <div
      className="border-primary-30 competitionCard group relative grid min-h-[320px] grid-cols-12 gap-2 overflow-hidden rounded-lg pb-3 md:gap-3 md:pb-0"
      key={competition.id}
    >
      <div className="relative col-span-12 aspect-square h-auto w-full overflow-hidden rounded-br-md md:col-span-4 md:h-full md:rounded-none xl:h-[400px] xl:w-[400px]">
        <Image
          src={competition.poster_url ?? DEFAULT_POSTER_URL}
          alt="competition poster"
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
      <div className="col-span-12 px-1 md:col-span-3 md:py-4">
        <div className="grid h-full grid-cols-4 flex-wrap items-center justify-between md:flex md:flex-col md:items-start">
          <div className="col-span-4 mx-auto py-1 md:mr-4 md:ms-auto">
            <Link
              className="ms-auto rounded-md border-2 border-primary bg-primary bg-opacity-30 px-2 py-1 text-center font-mono text-sm leading-none text-white hover:shadow-[0_0_8px_hsl(var(--primary))]"
              href={`leaderboard?competition=${competition.unique_keyname}`}
            >
              View Leaderboard
            </Link>
          </div>
          <div className="col-span-4 mx-auto mb-1 flex items-center gap-2">
            {competitionStatus === "upcoming" && (
              <CountdownTimer initialTime={getTime(competition.start_date)} />
            )}
            {competitionStatus === "ongoing" && (
              <CountdownTimer initialTime={getTime(competition.end_date)} />
            )}
          </div>
          {competition.is_speed_version && (
            <SpeedVersionContent speedDuration={competition.speed_duration} />
          )}
          <div className="col-span-4 flex w-full md:flex-none">
            <JoinCompetitionButton
              competitionStatus={competitionStatus}
              joinCompetition={() => {
                setSelectedCompetition(competition);
                setIsFeesModalOpen(true);
              }}
            />
          </div>
        </div>
      </div>
      {competition.competition_tweet_content &&
        competitionStatus !== "over" && (
          <CompetitionTweetButton
            tweetContent={competition.competition_tweet_content}
          />
        )}
    </div>
  );
};

export const getDateDifference = (date1: string, date2: string): string => {
  const time1 = new Date(date1);
  const time2 = new Date(date2);
  const totalHours = Math.round(
    (time2.getTime() - time1.getTime()) / (1000 * 60 * 60)
  );
  return `${totalHours} hour${totalHours !== 1 ? "s" : ""}`;
};
