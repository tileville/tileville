import { Skeleton, Table } from "@radix-ui/themes";

export default function TransactionLoading() {
  const initialArray = Array(5).fill(0);

  return (
    <>
      {initialArray?.map((entry, index) => (
        <Table.Row key={index}>
          <Table.RowHeaderCell>
            <Skeleton>
              5Ju3TEV4FwZSeDRWpuyim9vdxHVbgwV7s3ztZ1kvFXSvgZVKMn97
            </Skeleton>
          </Table.RowHeaderCell>
          <Table.Cell>
            <Skeleton>mina:berkeley</Skeleton>
          </Table.Cell>

          <Table.Cell>
            <Skeleton>CONFIRMED</Skeleton>
          </Table.Cell>

          <Table.Cell>
            <Skeleton>Sunday, June 16, 2024 at 7:43:52 PM</Skeleton>
          </Table.Cell>
        </Table.Row>
      ))}
    </>
  );
}
