"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Table, DropdownMenu, Skeleton } from "@radix-ui/themes";
import {
  useCompetitionsName,
  useLeaderboardEntries,
} from "@/db/react-query-hooks";
import { LEADERBOARD_COLUMNS } from "@/constants";
import { useRouter, useSearchParams } from "next/navigation";
import TableSkeleton from "./TableSkeleton";

type SelectedCompetition = {
  id: number;
  name: string;
  competition_key: string;
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
    useState<SelectedCompetition>({
      id: 3,
      name: "Hero's Tileville League",
      competition_key: "heros_tileville",
    } as SelectedCompetition);

  const { data: leaderboardData = [], isLoading } = useLeaderboardEntries(
    selectedCompetition.competition_key
  );

  useEffect(() => {
    if (competitionData && competitionParam) {
      const matchedCompetition = competitionData.find(
        (comp) => comp.unique_keyname === competitionParam
      );
      if (matchedCompetition) {
        setSelectedCompetition({
          id: matchedCompetition.id,
          name: matchedCompetition.name,
          competition_key: matchedCompetition.unique_keyname,
        });
      }
    }
  }, [competitionData, competitionParam]);

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

  return (
    <div className="mt-4 p-4 pb-8 pt-12 md:py-40">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div className="grid grid-cols-2 items-center gap-2 md:flex md:gap-3">
            <p className="col-auto whitespace-nowrap text-sm md:text-base">
              Select Competitions:
            </p>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <button className="border-primary-30  flex h-10 items-center justify-between truncate rounded-md border bg-transparent px-2 text-sm font-semibold text-primary outline-none md:min-w-[224px] md:px-3 md:text-base">
                  {isLoading ? (
                    <Skeleton className="h-5 w-full" />
                  ) : (
                    <span className="truncate">{selectedCompetition.name}</span>
                  )}

                  <span>
                    <Image
                      src="icons/topBottomArrows.svg"
                      width={24}
                      height={24}
                      alt="arrows"
                    />
                  </span>
                </button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content className="min-w-[200px] max-w-[350px] !bg-transparent backdrop-blur-2xl md:min-w-[320px] md:max-w-none">
                {competitionNameLoading ? (
                  <>
                    {skeletonItems.map((item) => (
                      <DropdownMenu.Item
                        key={item.id}
                        className="!md:h-8 !h-auto py-2 hover:bg-primary"
                      >
                        <Skeleton className="h-5 w-full" />
                      </DropdownMenu.Item>
                    ))}
                  </>
                ) : (
                  competitionData?.map((competition) => (
                    <DropdownMenu.Item
                      key={competition.id}
                      onClick={() =>
                        handleCompetitionChange({
                          id: competition.id,
                          competition_key: competition.unique_keyname,
                          name: competition.name,
                        })
                      }
                      className="!md:h-8 !h-auto py-2 hover:bg-primary"
                    >
                      {competitionNameLoading ? (
                        <Skeleton className="h-3 w-full" />
                      ) : (
                        competition.name
                      )}
                    </DropdownMenu.Item>
                  ))
                )}
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </div>
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

          <Table.Body>
            {isLoading ? (
              <TableSkeleton />
            ) : (
              <>
                {leaderboardData.length > 0 ? (
                  leaderboardData.map(
                    (entry: LeaderboardResult, index: number) => (
                      <Table.Row key={entry.id}>
                        <Table.Cell>{index + 1}</Table.Cell>
                        <Table.Cell>
                          {entry.username ? (
                            entry.username
                          ) : (
                            <span className="ps-4">-</span>
                          )}
                        </Table.Cell>
                        <Table.RowHeaderCell>
                          {entry.wallet_address}
                        </Table.RowHeaderCell>
                        <Table.Cell>{entry.game_id}</Table.Cell>
                        <Table.Cell>{entry.score}</Table.Cell>
                      </Table.Row>
                    )
                  )
                ) : (
                  <Table.Row>
                    <Table.Cell colSpan={5}>
                      <h2 className="text-center text-2xl font-semibold">
                        No games are played yet :(
                      </h2>
                    </Table.Cell>
                  </Table.Row>
                )}
              </>
            )}
          </Table.Body>
        </Table.Root>
      </div>
    </div>
  );
}
