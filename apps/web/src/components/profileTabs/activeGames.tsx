import { useActiveGames } from "@/db/react-query-hooks";
import { Table } from "@radix-ui/themes";
import { ActiveGamesLoading } from "./GameSkeletons";
import { formatTimestampToReadableDate } from "@/lib/helpers";
import Link from "next/link";
type ActiveGamesProps = {
  walletAddress: string;
};

export default function ActiveGames({ walletAddress }: ActiveGamesProps) {
  const { data: activeGames, isLoading } = useActiveGames(walletAddress);

  return (
    <div className="">
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Game Id</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Competition Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Network</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Created At</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Gameplay Link</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {isLoading ? (
            <ActiveGamesLoading />
          ) : (
            <>
              {activeGames && activeGames.length > 0 ? (
                <>
                  {activeGames.map((activeGame) => (
                    <Table.Row key={activeGame.id}>
                      <Table.Cell>{activeGame.id}</Table.Cell>
                      <Table.Cell>{activeGame.competition_key}</Table.Cell>
                      <Table.Cell>{activeGame.network}</Table.Cell>
                      <Table.Cell>
                        {formatTimestampToReadableDate(activeGame.created_at)}
                      </Table.Cell>
                      <Table.Cell>
                        <Link
                          href={`/competitions/${activeGame.competition_key}/game/${activeGame.id}`}
                          className="underline"
                        >
                          Click to play{" "}
                        </Link>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </>
              ) : (
                <Table.Row className="w-full p-4">
                  <Table.Cell
                    className="w-full text-center text-xl font-semibold"
                    colSpan={5}
                  >
                    No Active Games Found
                  </Table.Cell>
                </Table.Row>
              )}
            </>
          )}
        </Table.Body>
      </Table.Root>
    </div>
  );
}
