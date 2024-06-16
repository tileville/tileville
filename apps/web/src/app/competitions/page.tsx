"use client";
import { useCompetitionsData } from "@/db/react-query-hooks";
import { CalendarIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { GameEntryFeesModal } from "@/components/GameEntryFeesModal";
import { useEffect, useState } from "react";
import Link from "next/link";
import CompetitionLoading from "./competitionLoading";

export type Competition = {
  created_at: string;
  description: string;
  end_date: string;
  funds: number;
  id: number;
  name: string;
  participation_fee: number | null;
  poster_url: string | null;
  seed: number;
  start_date: string;
  unique_keyname: string;
};

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export default function Competitions() {
  const { data, isLoading, isError, error } = useCompetitionsData();
  const [isFeeModalOpen, setIsFeesModalOpen] = useState(false);
  const [selectedCompetition, setSelectedCompetition] = useState<Competition>(
    {} as Competition
  );
  const [timeLeft, setTimeLeft] = useState<Record<number, TimeLeft>>({});

  const calculateTimeLeft = (endDate: string): TimeLeft => {
    const difference = +new Date(endDate) - +new Date();
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  useEffect(() => {
    if (data) {
      const initialTimeLeft = data.reduce(
        (acc: Record<number, TimeLeft>, competition: Competition) => {
          acc[competition.id] = calculateTimeLeft(competition.end_date);
          return acc;
        },
        {}
      );
      setTimeLeft(initialTimeLeft);

      const timer = setInterval(() => {
        setTimeLeft((prevTimeLeft) => {
          const newTimeLeft = { ...prevTimeLeft };
          data.forEach((competition) => {
            newTimeLeft[competition.id] = calculateTimeLeft(
              competition.end_date
            );
          });
          return newTimeLeft;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [data]);

  if (isError) {
    return <div>Error: {(error as { message: string }).message}</div>;
  }

  return (
    <>
      <div>
        <div className="mx-auto max-w-[1280px] p-4 pt-20">
          <div className="relative flex items-center justify-between">
            <div className="flex items-center">
              <h2 className="text-4xl">Competitions</h2>
              <div>
                <Image
                  src="/image/cards/trophyGolden.png"
                  width={70}
                  height={70}
                  alt="trophy"
                />
              </div>
            </div>
            <Link
              href="/competitions/demo-game"
              className="rounded-md border-2 border-primary bg-primary bg-opacity-30 px-[15px] py-2 text-center font-mono leading-none text-white hover:shadow-[0_0_8px_hsl(var(--primary))]"
            >
              Play Demo Game
            </Link>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-3">
            {isLoading ? (
              <CompetitionLoading />
            ) : (
              <>
                {data?.map((competition) => {
                  const time = timeLeft[competition.id] || {
                    days: 0,
                    hours: 0,
                    minutes: 0,
                    seconds: 0,
                  };
                  return (
                    <div
                      className="border-primary-30 competitionCard group relative grid grid-cols-12 gap-3 overflow-hidden rounded-lg"
                      key={competition.id}
                    >
                      <div className="col-span-2 h-36 overflow-hidden">
                        <Image
                          src={
                            competition.poster_url
                              ? competition.poster_url
                              : "/img/avatars/2.jpeg"
                          }
                          alt=""
                          width={300}
                          height={200}
                          className="h-full w-full object-cover transition-transform group-hover:scale-110"
                        />
                      </div>

                      <div className="col-span-8 flex flex-col p-4">
                        <h2 className="text-xl font-semibold">
                          {competition.name}
                        </h2>
                        <p className="mb-2 line-clamp-2 text-sm text-black/50">
                          {competition.description}
                        </p>
                        <div className="my-3 mt-auto h-[1px] w-full bg-primary/30"></div>
                        <div className="flex justify-between gap-3 text-sm font-medium">
                          <div className="flex items-center gap-2">
                            <CalendarIcon />
                            <p>
                              Event Starting in {time.days} days{" "}
                              {time.hours < 10 ? `0${time.hours}` : time.hours}{" "}
                              hours{" "}
                              {time.minutes < 10
                                ? `0${time.minutes}`
                                : time.minutes}{" "}
                              mins{" "}
                              {time.seconds < 10
                                ? `0${time.seconds}`
                                : time.seconds}
                              sec
                            </p>
                          </div>
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
                        </div>
                      </div>

                      <div className="col-span-2 p-4">
                        <div className="flex h-full items-start">
                          <button
                            className="animated-button-v1 mx-auto w-full cursor-pointer whitespace-nowrap rounded-md border-2 border-primary bg-primary bg-opacity-30 py-2 text-center leading-none text-white"
                            onClick={() => {
                              setSelectedCompetition(competition);
                              setIsFeesModalOpen(true);
                            }}
                          >
                            Join Now
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </div>
      <GameEntryFeesModal
        open={isFeeModalOpen}
        handleClose={() => {
          setIsFeesModalOpen(false);
        }}
        competition={selectedCompetition}
      />
    </>
  );
}
