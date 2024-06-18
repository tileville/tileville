import { Skeleton, Table } from "@radix-ui/themes";

export const ActiveGamesLoading = () => {
  const initialArray = Array(5).fill(0);

  return (
    <>
      {initialArray?.map((entry, index) => (
        <Table.Row key={index}>
          <Table.RowHeaderCell>
            <Skeleton>1</Skeleton>
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
          <Table.Cell>
            <Skeleton>play here</Skeleton>
          </Table.Cell>
        </Table.Row>
      ))}
    </>
  );
};

export const TransactionLoading = () => {
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
};

export const PastGamesLoading = () => {
  const initialArray = Array(5).fill(0);

  return (
    <>
      {initialArray?.map((entry, index) => (
        <Table.Row key={index}>
          <Table.RowHeaderCell>
            <Skeleton>1</Skeleton>
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
          <Table.Cell>
            <Skeleton>Coming Soon</Skeleton>
          </Table.Cell>
        </Table.Row>
      ))}
    </>
  );
};
