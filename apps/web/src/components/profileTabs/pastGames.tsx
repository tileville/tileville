import { usePastGames } from "@/db/react-query-hooks";
import { Table } from "@radix-ui/themes";
import { PastGamesLoading } from "./GameSkeletons";
import { formatTimestampToReadableDate } from "@/lib/helpers";

type PastGamesProps = {
  walletAddress: string;
};

export default function PastGames({ walletAddress }: PastGamesProps) {
  const { data: pastGames, isLoading } = usePastGames(walletAddress);
  return (
    <div className="">
      <Table.Root>
        <Table.Header>
          <Table.Row className="whitespace-nowrap">
            <Table.ColumnHeaderCell>Game Id</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Competition Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Score</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Played on</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Leaderboard Rank</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {isLoading ? (
            <PastGamesLoading />
          ) : (
            <>
              {pastGames && pastGames.length > 0 ? (
                <>
                  {pastGames.map((game) => (
                    <Table.Row key={game.id}>
                      <Table.Cell>{game.id}</Table.Cell>
                      <Table.Cell>{game.competition_key}</Table.Cell>
                      <Table.Cell>{game.score}</Table.Cell>
                      <Table.Cell>
                        {formatTimestampToReadableDate(game.created_at)}
                      </Table.Cell>
                      <Table.Cell>Coming Soon 🚀</Table.Cell>
                    </Table.Row>
                  ))}
                </>
              ) : (
                <h2>No Past Games Found</h2>
              )}
            </>
          )}
        </Table.Body>
      </Table.Root>
    </div>
  );
}
