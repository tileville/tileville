import TableSkeleton from "@/app/leaderboard/tableSkeleton";
import { useTransactionLogByStatus } from "@/db/react-query-hooks";
import { formatTimestampToReadableDate } from "@/lib/helpers";
import { DropdownMenu, Table } from "@radix-ui/themes";
import Image from "next/image";
import { useState } from "react";
import TransactionLoading from "./transactionLoading";

type TransactionsProps = {
  walletAddress: string;
};

const filterOptions = [
  { label: "ALL", value: "ALL", key: "all" },
  {
    label: "CONFIRMED",
    value: "CONFIRMED",
    key: "confirmed",
  },
  {
    label: "PENDING",
    value: "PENDING",
    key: "pending",
  },
  { label: "FAILED", value: "FAILED", key: "failed" },
];

export default function Transactions({ walletAddress }: TransactionsProps) {
  const [selectedFilter, setSelectedFilter] = useState(filterOptions[0].value);
  const { data: transactions, isLoading } = useTransactionLogByStatus(
    walletAddress,
    selectedFilter
  );

  console.log("transactions", transactions);

  return (
    <div className="">
      <div className="flex">
        <div className="mb-3 ms-auto flex items-center gap-3">
          <p>Filter</p>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <button className="border-primary-30 flex h-10 min-w-[160px] items-center justify-between rounded-md border bg-transparent px-3 font-semibold text-primary outline-none">
                <span>{selectedFilter}</span>
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
              {filterOptions.map((option) => (
                <DropdownMenu.Item
                  onClick={() => {
                    setSelectedFilter(option.value);
                  }}
                  key={option.key}
                  className="hover:bg-primary"
                >
                  {option.value}
                </DropdownMenu.Item>
              ))}
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </div>
      </div>

      <>
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Transaction Hash</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Network</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>
                Transaction Status
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Transaction Time</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {isLoading ? (
              <TransactionLoading />
            ) : (
              <>
                {transactions && transactions.length > 0 ? (
                  <>
                    {transactions.map((transaction) => (
                      <Table.Row key={transaction.id}>
                        <Table.Cell>{transaction.txn_hash}</Table.Cell>
                        <Table.Cell>{transaction.network}</Table.Cell>
                        <Table.RowHeaderCell>
                          {transaction.txn_status}
                        </Table.RowHeaderCell>
                        <Table.Cell>
                          {formatTimestampToReadableDate(
                            transaction.created_at
                          )}
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </>
                ) : (
                  <h2>No Transactions Found</h2>
                )}
              </>
            )}
          </Table.Body>
        </Table.Root>
      </>
    </div>
  );
}
