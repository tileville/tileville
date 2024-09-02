"use client";

import { useCompetitionByKey } from "@/db/react-query-hooks";
import Image from "next/image";
import { getTime, isAfter, isBefore } from "date-fns";
import { useParams } from "next/navigation";
import { DEFAULT_POSTER_URL } from "@/constants";
import { HtmlRenderer } from "@/components/common/HTMLRenderer";
import * as Tooltip from "@radix-ui/react-tooltip";
import { InfoCircledIcon, TimerIcon } from "@radix-ui/react-icons";
import { getDateDifference } from "@/components/CompetitionCard";
import { useEffect, useState } from "react";

type CompetitionStatus = "upcoming" | "ongoing" | "over";

export default function Competition() {
  const params = useParams<{
    uniqueKey: string;
    gameId: string;
  }>();

  const [competitionStatus, setCompetitionStatus] =
    useState<CompetitionStatus>("upcoming");
  const [currentDate] = useState(new Date());
  const { data: competitionData, isLoading } = useCompetitionByKey(
    params.uniqueKey
  );

  useEffect(() => {
    const isStartBeforeCurrent = isBefore(
      competitionData?.start_date && new Date(),
      currentDate
    );
    const isStartAfterCurrent = isAfter(
      competitionData?.start_date,
      currentDate
    );

    console.log("isStartAfterCurrent ", isStartAfterCurrent);
    console.log("isStartBeforeCurrent ", isStartBeforeCurrent);
    const isEndAfterCurrent = isAfter(competitionData?.end_date, currentDate);
    const isEndBeforeCurrent = isBefore(competitionData?.end_date, currentDate);
    if (isStartAfterCurrent) {
      setCompetitionStatus("upcoming");
    } else if (isEndBeforeCurrent) {
      setCompetitionStatus("over");
    } else if (isStartBeforeCurrent && isEndAfterCurrent) {
      setCompetitionStatus("ongoing");
    }
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="">Loading</div>
      ) : (
        <div className="mx-auto max-w-[1280px] p-4 py-20">
          <div className="grid grid-cols-2 gap-3">
            <div className="w-full">
              <h1 className="text-3xl font-semibold">
                {competitionData?.name}
              </h1>

              <div>
                <HtmlRenderer htmlContent={competitionData?.description} />
              </div>

              {competitionData?.is_speed_version && (
                <div className="pt-4">
                  <div className="mb-2 flex items-center gap-2 text-xl">
                    <span>
                      <Image
                        src="/icons/speed.svg"
                        alt="speed"
                        width="30"
                        height="30"
                      />
                    </span>
                    <p className="text-medium ">Speedy Version</p>
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
                            In the speedy version of the game, the player will
                            need to finish the game in specific amount of time.
                            <Tooltip.Arrow className="TooltipArrow" />
                          </Tooltip.Content>
                        </Tooltip.Portal>
                      </Tooltip.Root>
                    </Tooltip.Provider>
                  </div>

                  <div className="flex items-center gap-2 text-xl">
                    <span>
                      <TimerIcon width={24} height={24} />
                    </span>
                    <p className="text-medium ">Game Time:-</p>
                    <p className="text-medium ">
                      {competitionData.speed_duration} Secs
                    </p>
                  </div>
                </div>
              )}

              <div className="flex flex-col justify-between divide-y divide-primary/30 pt-4 text-sm font-medium">
                <div className="grid grid-cols-12 py-2">
                  <div className="col-span-4">
                    <p>Entry Fees:</p>
                  </div>
                  <div className="col-span-6">
                    <p className="text-base font-semibold">
                      {competitionData?.participation_fee} MINA
                    </p>
                  </div>
                </div>

                {competitionStatus === "upcoming" && (
                  <div className="grid grid-cols-12 py-2">
                    <div className="col-span-4">
                      <p>Duration:</p>
                    </div>
                    <div className="col-span-6">
                      <p className="text-base font-semibold">
                        {getDateDifference(
                          competitionData?.start_date,
                          competitionData?.end_date
                        )}
                      </p>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-12 py-2">
                  <div className="col-span-4">
                    <p>Prize Money 🤑:</p>
                  </div>
                  <div className="col-span-6">
                    <p className="text-base font-semibold">
                      {competitionData?.funds}{" "}
                      {competitionData?.currency_symbol}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full">
              <Image
                src={competitionData?.poster_url ?? DEFAULT_POSTER_URL}
                width={500}
                height={500}
                alt="competition"
                className="w-full rounded-md"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
