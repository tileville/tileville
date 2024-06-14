"use client";
import { useCompetitionsName } from "@/db/react-query-hooks";
import { getFilteredLeaderboardEntries } from "@/db/supabase-queries";
import { Skeleton, Table } from "@radix-ui/themes";
import { DropdownMenu } from "@radix-ui/themes";
import Image from "next/image";
import { useState, useEffect } from "react";

type SelectedCompetition = { id: number; name: string };
type LeaderboardResult = {
  competition_id: number;
  created_at: string;
  game_id: number;
  id: number;
  score: number;
  wallet_address: string;
};

export default function Leaderboard() {
  const {
    data: competitionData,
    isLoading: competitionLoading,
    isError: IsCompetitionError,
    error: competitionError,
  } = useCompetitionsName();

  const [selectedCompetition, setSelectedCompetition] =
    useState<SelectedCompetition>({
      id: 2,
      name: "Default Competition",
    } as SelectedCompetition);

  const [leaderboardData, setLeaderboardData] = useState<LeaderboardResult[]>(
    []
  );
  useEffect(() => {
    if (selectedCompetition.id) {
      getFilteredLeaderboardEntries(selectedCompetition.id)
        .then((leaderboardEntries) => {
          setLeaderboardData(leaderboardEntries);
        })
        .catch((error) => {
          console.warn("Failed to fetch leaderboard data", error);
        });
    }
  }, [selectedCompetition.id]);

  if (IsCompetitionError) {
    return (
      <div>Error: {(competitionError as { message: string }).message}</div>
    );
  }

  if (IsCompetitionError) {
    return (
      <div>Error: {(competitionError as { message: string }).message}</div>
    );
  }

  const initialArray = Array(20).fill(0);

  return (
    <div className="p-4 pt-40">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-3 flex items-center justify-end gap-3">
          <p>Select Competitions:</p>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <button className="border-primary-30 flex h-10 min-w-[224px] items-center justify-between rounded-md border bg-transparent px-3 font-semibold text-primary outline-none">
                <span>{selectedCompetition.name}</span>
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
            <DropdownMenu.Content className="min-w-[224px] !bg-transparent backdrop-blur-2xl">
              {competitionData?.map((competition) => (
                <DropdownMenu.Item
                  key={competition.id}
                  onClick={() => {
                    setSelectedCompetition({
                      id: competition.id,
                      name: competition.name,
                    });
                  }}
                  className="hover:bg-primary"
                >
                  {competition.name}
                </DropdownMenu.Item>
              ))}
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </div>
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Wallet Address</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Competition ID</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Game Id</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Score</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {competitionLoading ? (
              <>
                {initialArray?.map((entry, index) => (
                  <Table.Row key={index}>
                    <Table.RowHeaderCell>
                      <Skeleton>0x123452345235345345</Skeleton>
                    </Table.RowHeaderCell>
                    <Table.Cell>
                      <Skeleton>1717325346195</Skeleton>
                    </Table.Cell>
                    <Table.Cell>
                      <Skeleton>1717325346195</Skeleton>
                    </Table.Cell>
                    <Table.Cell>
                      <Skeleton>70</Skeleton>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </>
            ) : (
              <>
                {leaderboardData
                  ? leaderboardData?.map((entry: any) => (
                      <Table.Row key={entry.id}>
                        <Table.RowHeaderCell>
                          {entry.wallet_address}
                        </Table.RowHeaderCell>
                        <Table.Cell>{entry.competition_id}</Table.Cell>
                        <Table.Cell>{entry.game_id}</Table.Cell>
                        <Table.Cell>{entry.score}</Table.Cell>
                      </Table.Row>
                    ))
                  : ""}
              </>
            )}
          </Table.Body>
        </Table.Root>
      </div>
    </div>
  );
}
