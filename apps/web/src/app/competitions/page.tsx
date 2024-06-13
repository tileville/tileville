"use client";
import { useCompetitionsData } from "@/db/react-query-hooks";
import { CalendarIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "@radix-ui/themes";
export default function Competitions() {
  const { data, isLoading, isError, error } = useCompetitionsData();
  const initialArray = Array(2).fill(0);

  if (isError) {
    return <div>Error: {(error as { message: string }).message}</div>;
  }

  console.log(data);

  return (
    <>
      <div className="mx-auto max-w-[1280px] p-4 pt-20">
        <div className="flex items-center justify-center">
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

        <div className="mt-5 grid grid-cols-1 gap-3">
          {isLoading ? (
            <>Loading....</>
          ) : (
            <>
              {data?.map((competition) => {
                return (
                  <>
                    <div
                      className="border-primary-30 group relative grid grid-cols-12 gap-3 overflow-hidden rounded-lg"
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
                        <div className="flex gap-3 text-sm font-medium">
                          <div className="flex items-center gap-2">
                            <CalendarIcon />
                            <p>
                              Event Startig in 12 days 12 hours 23 mins 23 sec
                            </p>
                          </div>
                          <div className="h-full w-[1px] bg-primary/30"></div>
                          <div className="flex items-center gap-2">
                            {/* <CalendarIcon /> */}
                            <p>Entry Fees:</p>
                            <p className="text-base font-semibold">
                              {competition.participation_fee} MINA
                            </p>
                          </div>{" "}
                          <div className="h-full w-[1px] bg-primary/30"></div>
                          <div className="flex items-center gap-2">
                            {/* <CalendarIcon /> */}
                            <p>Prize Money:</p>
                            <p className="text-base font-semibold">
                              {competition.funds} MINA
                            </p>
                          </div>{" "}
                        </div>
                      </div>

                      <div className="col-span-2 p-4">
                        <div className="flex h-full items-start">
                          <div className="mr-3 flex h-full w-[1px] flex-col items-start bg-primary/30"></div>
                          <Link
                            className="mx-auto w-full cursor-pointer rounded-md border-2 border-primary bg-primary bg-opacity-30 px-[15px] py-2 text-center font-mono leading-none text-white hover:shadow-[0_0_8px_hsl(var(--primary))]"
                            href={`/competitions/${competition.unique_keyname}/game`}
                          >
                            Join Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </>
          )}
        </div>
      </div>
    </>
  );
}
