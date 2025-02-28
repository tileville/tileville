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

export type CompetitionStatus = "upcoming" | "ongoing" | "over";

type CompetitionCardProps = {
  competition: Competition;
  setSelectedCompetition: Dispatch<SetStateAction<Competition>>;
  setIsFeesModalOpen: Dispatch<SetStateAction<boolean>>;
};

// Helper function moved outside the component
export const getDateDifference = (date1: string, date2: string): string => {
  const time1 = new Date(date1);
  const time2 = new Date(date2);

  const differenceMs = time2.getTime() - time1.getTime();
  const totalHours = Math.round(differenceMs / (1000 * 60 * 60));

  return `${totalHours} hour${totalHours !== 1 ? "s" : ""}`;
};

// Helper to determine competition status
const determineCompetitionStatus = (
  competition: Competition,
  currentDate: Date
): CompetitionStatus => {
  const isStartBeforeCurrent = isBefore(competition.start_date, currentDate);
  const isStartAfterCurrent = isAfter(competition.start_date, currentDate);
  const isEndAfterCurrent = isAfter(competition.end_date, currentDate);
  const isEndBeforeCurrent = isBefore(competition.end_date, currentDate);

  if (isStartAfterCurrent) {
    return "upcoming";
  } else if (isEndBeforeCurrent) {
    return "over";
  } else if (isStartBeforeCurrent && isEndAfterCurrent) {
    return "ongoing";
  }

  // Default case (should never reach here with valid dates)
  return "upcoming";
};

export const CompetitionCard = ({
  competition,
  setSelectedCompetition,
  setIsFeesModalOpen,
}: CompetitionCardProps) => {
  const [competitionStatus, setCompetitionStatus] =
    useState<CompetitionStatus>("upcoming");
  const [currentDate] = useState(new Date());

  useEffect(() => {
    setCompetitionStatus(determineCompetitionStatus(competition, currentDate));
  }, [competition, currentDate]);

  const handleJoinCompetition = () => {
    setSelectedCompetition(competition);
    setIsFeesModalOpen(true);
  };

  return (
    <div
      className="border-primary-30 competitionCard group relative grid min-h-[320px] grid-cols-12 gap-2 overflow-hidden rounded-lg pb-3 md:gap-3 md:pb-0"
      key={competition.id}
    >
      {/* Competition Image */}
      <div className="relative col-span-12 aspect-square h-auto w-full overflow-hidden rounded-br-md md:col-span-4 md:h-full md:rounded-none xl:h-[400px] xl:w-[400px]">
        <Image
          src={competition.poster_url ?? DEFAULT_POSTER_URL}
          alt="competition poster url"
          fill
          className="h-full w-full object-cover object-left transition-transform group-hover:scale-110"
          sizes="(max-width: 1600px) 100%"
          priority={false}
        />
      </div>

      {/* Competition Details */}
      <div className="col-span-12 flex flex-col pb-0 pr-2 ps-2 pt-0 md:col-span-5 md:py-4 md:pr-0 md:ps-1">
        <h2 className="text-xl font-semibold">{competition.name}</h2>
        <div className="mb-2 flex flex-col flex-wrap space-y-2 text-sm text-black/50">
          <HtmlRenderer htmlContent={competition.description} />
        </div>
        <div className="my-3 mt-auto h-[1px] w-full bg-primary/30"></div>

        {/* Competition Fee and Duration Info */}
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

      {/* Competition Actions */}
      <div className="col-span-12 px-1 md:col-span-3 md:py-4">
        <div className="grid h-full grid-cols-4 flex-wrap items-center justify-between md:flex md:flex-col md:items-start">
          {/* Leaderboard Link */}
          <div className="col-span-4 mx-auto py-1 md:mr-4 md:ms-auto">
            <Link
              className="ms-auto rounded-md border-2 border-primary bg-primary bg-opacity-30 px-2 py-1 text-center font-mono text-sm leading-none text-white hover:shadow-[0_0_8px_hsl(var(--primary))]"
              href={`leaderboard?competition=${competition.unique_keyname}`}
            >
              View Leaderboard
            </Link>
          </div>

          {/* Countdown Timer */}
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

          {/* Speed Version Content */}
          {competition.is_speed_version && (
            <SpeedVersionContent speedDuration={competition.speed_duration} />
          )}

          {/* Join Competition Button */}
          <div className="md:flex-0 col-span-4 flex w-full flex-1 flex-grow md:flex-none">
            <JoinCompetitionButton
              competitionStatus={competitionStatus}
              joinCompetition={handleJoinCompetition}
            />
          </div>
        </div>
      </div>

      {/* Tweet Button */}
      {competition.competition_tweet_content &&
        competitionStatus !== "over" && (
          <CompetitionTweetButton
            tweetContent={competition.competition_tweet_content}
          />
        )}
    </div>
  );
};
