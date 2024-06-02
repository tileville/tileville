"use client";
import { useLeaderboardData } from "@/db/react-query-hooks";
import { Skeleton, Table } from "@radix-ui/themes";

export default function Leaderboard() {
  const { data, isLoading, isError, error } = useLeaderboardData();
  const initialArray = Array(20).fill(0);
  if (isError) {
    return <div>Error: {(error as { message: string }).message}</div>;
  }

  return (
    <div className="p-4 pt-40">
      <div className="mx-auto max-w-[1280px]">
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
