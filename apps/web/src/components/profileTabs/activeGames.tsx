import { Table } from "@radix-ui/themes";

export default function ActiveGames() {
  return (
    <div className="">
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Game Id</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Competition Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Game</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Score</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.RowHeaderCell>1</Table.RowHeaderCell>
            <Table.Cell>Heros Tileville League</Table.Cell>
            <Table.Cell>asdjfadskl</Table.Cell>
            <Table.Cell>asdjfadskl</Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.RowHeaderCell>2</Table.RowHeaderCell>
            <Table.Cell>Heros Tileville League</Table.Cell>
            <Table.Cell>asdjfadskl</Table.Cell>
            <Table.Cell>asdjfadskl</Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.RowHeaderCell>3</Table.RowHeaderCell>
            <Table.Cell>Heros Tileville League</Table.Cell>
            <Table.Cell>asdjfadskl</Table.Cell>
            <Table.Cell>asdjfadskl</Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.RowHeaderCell>4</Table.RowHeaderCell>
            <Table.Cell>Heros Tileville League</Table.Cell>
            <Table.Cell>asdjfadskl</Table.Cell>
            <Table.Cell>asdjfadskl</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
    </div>
  );
}
