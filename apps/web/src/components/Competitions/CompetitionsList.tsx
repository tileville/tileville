import React from "react";
import { SimpleCompetitionCard } from "./SimpleCompetitionCard";
import { Spinner2 } from "../common/Spinner";

interface Competition {
  id: number;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  participation_fee: number;
  funds: number;
  poster_url: string;
  unique_keyname: string;
}

interface CompetitionsListProps {
  competitions: Competition[];
  isLoading: boolean;
}

export const CompetitionsList: React.FC<CompetitionsListProps> = ({
  competitions,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <div className="flex h-60 w-full items-center justify-center">
        <Spinner2 />
      </div>
    );
  }

  if (competitions.length === 0) {
    return (
      <div className="flex h-60 w-full flex-col items-center justify-center">
        <h3 className="text-xl font-semibold">No competitions found</h3>
        <p className="mt-2 text-sm text-gray-500">
          Check back soon for new competitions
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {competitions.map((competition) => (
        <SimpleCompetitionCard
          key={competition.id}
          id={competition.id}
          name={competition.name}
          description={competition.description}
          startDate={competition.start_date}
          endDate={competition.end_date}
          entryFee={competition.participation_fee}
          prizeMoney={competition.funds}
          posterUrl={competition.poster_url}
          uniqueKeyname={competition.unique_keyname}
        />
      ))}
    </div>
  );
};
