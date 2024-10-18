"use client";
import { useCompetitionsData } from "@/db/react-query-hooks";
import { GameEntryFeesModal } from "@/components/GameEntryFeesModal";
import { useState } from "react";
import CompetitionLoading from "./competitionLoading";
import { Competition } from "@/types";
import { CompetitionCard } from "@/components/CompetitionCard";
import { CompetitionsHeader } from "@/components/Competitions/CompetitionsHeader";

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
      <div className="mx-auto max-w-[1280px] pt-4">
        <CompetitionsHeader />

        <div className="mt-0 grid grid-cols-1 gap-3 px-3 md:mt-5 md:pb-20">
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
