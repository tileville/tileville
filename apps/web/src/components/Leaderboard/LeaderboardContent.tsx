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

const SKELETON_ITEM_COUNT = 10;

const skeletonItems = Array.from(
  { length: SKELETON_ITEM_COUNT },
  (_, index) => ({
    id: `skeleton-${index}`,
  })
);

const CompetitionStatusTag = ({
  status,
}: {
  status: "ONGOING" | "UPCOMING" | "ENDED";
}) => {
  const statusStyles = {
    ONGOING: "bg-primary/20 text-primary",
    UPCOMING: "bg-blue-500/20 text-blue-700",
    ENDED: "bg-gray-500/20 text-gray-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-sm font-medium ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
};

export default function LeaderboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const competitionParam = searchParams.get("competition");

  const {
    data: competitionData,
    isError: isCompetitionError,
    error: competitionError,
    isLoading: competitionNameLoading,
  } = useCompetitionsName();

  const [selectedCompetition, setSelectedCompetition] =
    useState<SelectedCompetition | null>(null);

  // Set the selected competition based on URL param or first available competition
  useEffect(() => {
    if (!competitionData?.length) return;

    const targetCompetition = competitionParam
      ? competitionData.find((comp) => comp.unique_keyname === competitionParam)
      : competitionData[0];

    if (targetCompetition) {
      setSelectedCompetition({
        id: targetCompetition.id,
        name: targetCompetition.name,
        competition_key: targetCompetition.unique_keyname,
        start_date: targetCompetition.start_date,
        end_date: targetCompetition.end_date,
      });
    }
  }, [competitionData, competitionParam]);

  const { data: leaderboardData = [], isLoading } = useLeaderboardEntries(
    selectedCompetition?.competition_key || ""
  );

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

  if (isCompetitionError) {
    return (
      <div className="p-30">
        Error: {(competitionError as { message: string }).message}
      </div>
    );
  }

  const renderCompetitionGroups = () => {
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
        {renderCompetitionGroup(ongoing, "Ongoing Competitions")}
        {renderCompetitionGroup(upcoming, "Upcoming Competitions")}
        {renderCompetitionGroup(past, "Past Competitions")}
      </>
    );
  };

  const renderCompetitionGroup = (competitions: any[], title: string) => {
    if (!competitions.length) return null;

    return (
      <>
        <div className="border-b border-primary/20 px-4 py-2 text-sm font-semibold text-primary">
          {title}
        </div>
        {competitions.map((competition: any) => (
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

  const renderLeaderboardTable = () => {
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

  return (
    <div className="p-4 pb-8 pt-16 md:py-40">
      <div className="mx-auto max-w-[1280px]">
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
                {renderCompetitionGroups()}
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

          <Table.Body>{renderLeaderboardTable()}</Table.Body>
        </Table.Root>
      </div>
    </div>
  );
}
