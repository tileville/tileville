"use client";
import { useCompetitionsData } from "@/db/react-query-hooks";
import Image from "next/image";
import { GameEntryFeesModal } from "@/components/GameEntryFeesModal";
import { useState } from "react";
import Link from "next/link";
import CompetitionLoading from "./competitionLoading";
import { Competition } from "@/types";
import { CompetitionCard } from "@/components/CompetitionCard";

export default function Competitions() {
  const { data, isLoading, isError, error } = useCompetitionsData();
  const [isFeeModalOpen, setIsFeesModalOpen] = useState(false);
  const [selectedCompetition, setSelectedCompetition] = useState<Competition>(
    {} as Competition
  );
  //TODO: Error Message UI improvement
  if (isError) {
    return <div>Error: {(error as { message: string }).message}</div>;
  }

  return (
    <>
      <div>
        <div className="mx-auto max-w-[1280px] p-4 pb-2 pt-10 md:py-20">
          <div className="relative flex items-center justify-between">
            <div className="flex items-center">
              <h2 className="text-xl md:text-4xl">Competitions</h2>
              <div>
                <Image
                  src="/image/cards/trophyGolden.png"
                  width={70}
                  height={86}
                  alt="trophy"
                  className="h-auto w-8 md:w-16"
                />
              </div>
            </div>
            <Link
              href="/competitions/demo-game"
              className="rounded-md border-2 border-primary bg-primary bg-opacity-30 px-2 py-2 text-center font-mono text-sm leading-none text-white hover:shadow-[0_0_8px_hsl(var(--primary))] md:px-[15px] md:text-base"
            >
              Play Demo Game
            </Link>
          </div>
        </div>

        <div className="mt-0 grid grid-cols-1 gap-3 px-3 md:mt-5">
          {isLoading ? (
            <CompetitionLoading />
          ) : (
            <>
              {data?.map((competition) => (
                <CompetitionCard
                  competition={competition}
                  key={competition.unique_keyname}
                  setSelectedCompetition={setSelectedCompetition}
                  setIsFeesModalOpen={setIsFeesModalOpen}
                />
              ))}
            </>
          )}
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
