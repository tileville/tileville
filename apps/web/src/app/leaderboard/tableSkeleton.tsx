import { Skeleton, Table } from "@radix-ui/themes";

export default function TableSkeleton() {
  const initialArray = Array(10).fill(0);

  return (
    <>
      {initialArray?.map((entry, index) => (
        <Table.Row key={index}>
          <Table.RowHeaderCell>
            <Skeleton>0</Skeleton>
          </Table.RowHeaderCell>
          <Table.Cell>
            <Skeleton>171732534</Skeleton>
          </Table.Cell>
          <Table.Cell>
            <Skeleton>
              1717325346195sdfsad1717325346195sdfsad1717325346195sdfsadsdfsdf
            </Skeleton>
          </Table.Cell>
          <Table.Cell>
            <Skeleton>7asdfasdfs0</Skeleton>
          </Table.Cell>

          <Table.Cell>
            <Skeleton>70</Skeleton>
          </Table.Cell>
        </Table.Row>
      ))}
    </>
  );
}
