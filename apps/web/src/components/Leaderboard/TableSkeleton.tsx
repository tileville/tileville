import { TABLE_SKELETON_CONTENT } from "@/constants";
import { Skeleton, Table } from "@radix-ui/themes";

const INITIAL_ARRAY = Array(10).fill(0);

export default function TableSkeleton() {
  return (
    <>
      {INITIAL_ARRAY?.map((entry, index) => (
        <Table.Row key={index}>
          <Table.RowHeaderCell>
            <Skeleton>0</Skeleton>
          </Table.RowHeaderCell>

          {TABLE_SKELETON_CONTENT.map((content) => {
            return (
              <Table.Cell key={content}>
                <Skeleton>{content}</Skeleton>
              </Table.Cell>
            );
          })}
        </Table.Row>
      ))}
    </>
  );
}
