"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Table, DropdownMenu, Skeleton } from "@radix-ui/themes";
import {
  useCompetitionsName,
  useLeaderboardEntries,
} from "@/db/react-query-hooks";
import { getCompetitionStatus, organizeCompetitions } from "@/lib/helpers";
import { LEADERBOARD_COLUMNS } from "@/constants";
import TableSkeleton from "./TableSkeleton";
import { DropdownTriggerContent } from "./DropdownTriggerContent";
import { CompetitionMenuItem } from "./CompetitionMenuItem";

// Type definitions
export type SelectedCompetition = {
  id: number;
  name: string;
  competition_key: string;
  start_date: string;
  end_date: string;
};

type LeaderboardResult = {
  competition_key: string;
  created_at: string;
  game_id: number;
  username: string;
  id: number;
  score: number;
  wallet_address: string;
};

type CompetitionStatusProps = {
  status: "ONGOING" | "UPCOMING" | "ENDED";
};

// Constants
const SKELETON_ITEM_COUNT = 10;
const skeletonItems = Array.from(
  { length: SKELETON_ITEM_COUNT },
  (_, index) => ({
    id: `skeleton-${index}`,
  })
);

// Helper components
const CompetitionStatusTag = ({ status }: CompetitionStatusProps) => {
  const getTagStyles = () => {
    switch (status) {
      case "ONGOING":
        return "bg-primary/20 text-primary";
      case "UPCOMING":
        return "bg-blue-500/20 text-blue-700";
      case "ENDED":
        return "bg-gray-500/20 text-gray-700";
    }
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-sm font-medium ${getTagStyles()}`}
    >
      {status}
    </span>
  );
};

export default function LeaderboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const competitionParam = searchParams.get("competition");

  // State
  const [selectedCompetition, setSelectedCompetition] =
    useState<SelectedCompetition | null>(null);

  // Data fetching
  const {
    data: competitionData,
    isError: isCompetitionError,
    error: competitionError,
    isLoading: competitionNameLoading,
  } = useCompetitionsName();

  const { data: leaderboardData = [], isLoading } = useLeaderboardEntries(
    selectedCompetition?.competition_key || ""
  );

  // Helper functions
  const createSelectedCompetition = (
    competition: any
  ): SelectedCompetition => ({
    id: competition.id,
    name: competition.name,
    competition_key: competition.unique_keyname,
    start_date: competition.start_date,
    end_date: competition.end_date,
  });

  const findCompetitionByKey = (key: string) => {
    if (!competitionData) return null;
    return competitionData.find((comp) => comp.unique_keyname === key);
  };

  // Effects
  useEffect(() => {
    if (!competitionData || competitionData.length === 0) return;

    if (competitionParam) {
      const matchedCompetition = findCompetitionByKey(competitionParam);
      if (matchedCompetition) {
        setSelectedCompetition(createSelectedCompetition(matchedCompetition));
      }
    } else {
      setSelectedCompetition(createSelectedCompetition(competitionData[0]));
    }
  }, [competitionData, competitionParam]);

  // Event handlers
  const handleCompetitionChange = (competition: SelectedCompetition) => {
    setSelectedCompetition(competition);
    const newSearchParams = new URLSearchParams(
      Array.from(searchParams.entries())
    );
    newSearchParams.set("competition", competition.competition_key);
    router.push(`/leaderboard?${newSearchParams.toString()}`, {
      scroll: false,
    });
  };

  // Render helpers
  const renderCompetitionSection = (competitions: any[], title: string) => {
    if (competitions.length === 0) return null;

    return (
      <>
        <div className="border-b border-primary/20 px-4 py-2 text-sm font-semibold text-primary">
          {title}
        </div>
        {competitions.map((competition) => (
          <CompetitionMenuItem
            key={competition.unique_keyname}
            competition={competition}
            isSelected={
              selectedCompetition?.competition_key ===
              competition.unique_keyname
            }
            onSelect={handleCompetitionChange}
          />
        ))}
      </>
    );
  };

  const renderCompetitionDropdown = () => {
    if (competitionNameLoading) {
      return skeletonItems.map((item) => (
        <DropdownMenu.Item
          key={item.id}
          className="!md:h-8 !h-auto py-2 hover:bg-primary"
        >
          <Skeleton className="h-5 w-full" />
        </DropdownMenu.Item>
      ));
    }

    const { ongoing, upcoming, past } = organizeCompetitions(competitionData);

    return (
      <>
        {renderCompetitionSection(ongoing, "Ongoing Competitions")}
        {renderCompetitionSection(upcoming, "Upcoming Competitions")}
        {renderCompetitionSection(past, "Past Competitions")}
      </>
    );
  };

  const renderLeaderboardContent = () => {
    if (isLoading) {
      return <TableSkeleton />;
    }

    if (leaderboardData.length === 0) {
      return (
        <Table.Row>
          <Table.Cell colSpan={5}>
            <h2 className="text-center text-2xl font-semibold">
              No games are played yet :(
            </h2>
          </Table.Cell>
        </Table.Row>
      );
    }

    return leaderboardData.map((entry: LeaderboardResult, index: number) => (
      <Table.Row key={entry.id}>
        <Table.Cell>{index + 1}</Table.Cell>
        <Table.Cell>
          {entry.username ? (
            <Link
              href={`u/${entry.username}`}
              className="underline hover:no-underline"
              target="_blank"
            >
              {entry.username}
            </Link>
          ) : (
            <span className="ps-4">-</span>
          )}
        </Table.Cell>
        <Table.RowHeaderCell>{entry.wallet_address}</Table.RowHeaderCell>
        <Table.Cell>{entry.game_id}</Table.Cell>
        <Table.Cell>{entry.score}</Table.Cell>
      </Table.Row>
    ));
  };

  // Error handling
  if (isCompetitionError) {
    return (
      <div className="p-30">
        Error: {(competitionError as { message: string }).message}
      </div>
    );
  }

  // Main render
  return (
    <div className="p-4 pb-8 pt-16 md:py-40">
      <div className="mx-auto max-w-[1280px]">
        {/* Competition selector */}
        <div className="mb-3 flex items-center justify-between gap-3">
          <div className="grid grid-cols-2 items-center gap-2 md:flex md:gap-3">
            <p className="col-auto whitespace-nowrap text-sm md:text-base">
              Select Competitions:
            </p>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <button>
                  <DropdownTriggerContent
                    isLoading={isLoading}
                    selectedCompetition={selectedCompetition}
                  />
                </button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content className="min-w-[200px] max-w-[350px] !bg-transparent backdrop-blur-2xl md:min-w-[320px] md:max-w-none">
                {renderCompetitionDropdown()}
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </div>

          {selectedCompetition && (
            <CompetitionStatusTag
              status={getCompetitionStatus(
                selectedCompetition.start_date,
                selectedCompetition.end_date
              )}
            />
          )}
        </div>

        {/* Leaderboard table */}
        <Table.Root>
          <Table.Header>
            <Table.Row className="whitespace-nowrap">
              {LEADERBOARD_COLUMNS.map((column) => (
                <Table.ColumnHeaderCell key={column}>
                  {column}
                </Table.ColumnHeaderCell>
              ))}
            </Table.Row>
          </Table.Header>

          <Table.Body>{renderLeaderboardContent()}</Table.Body>
        </Table.Root>
      </div>
    </div>
  );
}
