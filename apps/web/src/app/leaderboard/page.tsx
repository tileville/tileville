"use client";
import {
  useCompetitionsName,
  useLeaderboardData,
} from "@/db/react-query-hooks";
import { Skeleton, Table } from "@radix-ui/themes";
import { DropdownMenu } from "@radix-ui/themes";
import Image from "next/image";
import { useState } from "react";

export default function Leaderboard() {
  const { data, isLoading, isError, error } = useLeaderboardData();
  const {
    data: competitionData,
    isLoading: competitionLoading,
    isError: IsCompetitionError,
    error: competitionError,
  } = useCompetitionsName();
  // let competitionData = [
  //   {
  //     text: "Hero's Tileville League",
  //     id: "heros_tileville",
  //   },

  //   {
  //     text: "Default Competition",
  //     id: "default_comp",
  //   },
  // ];

  console.log(competitionData);

  const [selectedItem, setSelectedItem] = useState<any>(
    competitionData[0].name
  );

  if (IsCompetitionError) {
    return <div>Error: {(error as { message: string }).message}</div>;
  }

  const initialArray = Array(20).fill(0);
  if (isError) {
    return <div>Error: {(error as { message: string }).message}</div>;
  }

  return (
    <div className="p-4 pt-40">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-3 flex items-center gap-3">
          <p>Select Competitions</p>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <button className="border-primary-30 flex h-10 min-w-[224px] items-center justify-between rounded-md border bg-transparent px-3 font-semibold text-primary outline-none">
                <span>{selectedItem}</span>
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
              {competitionData.map((competition) => {
                return (
                  <DropdownMenu.Item
                    key={competition.id}
                    onClick={() => {
                      setSelectedItem(competition.id);
                    }}
                    className="hover:bg-primary"
                  >
                    {competition.name}
                  </DropdownMenu.Item>
                );
              })}
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
            {isLoading ? (
              <>
                {initialArray?.map((entry) => {
                  return (
                    <Table.Row key={entry.id}>
                      <Table.RowHeaderCell>
                        <Skeleton>0x1</Skeleton>
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
                  );
                })}
              </>
            ) : (
              <>
                {data?.map((entry) => {
                  return (
                    <Table.Row key={entry.id}>
                      <Table.RowHeaderCell>
                        {entry.wallet_address}
                      </Table.RowHeaderCell>
                      <Table.Cell>{entry.competition_id}</Table.Cell>
                      <Table.Cell>{entry.game_id}</Table.Cell>
                      <Table.Cell>{entry.score}</Table.Cell>
                    </Table.Row>
                  );
                })}
              </>
            )}
          </Table.Body>
        </Table.Root>
      </div>
    </div>
  );
}
