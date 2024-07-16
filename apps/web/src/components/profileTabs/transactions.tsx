import { useTransactionLogByStatus } from "@/db/react-query-hooks";
import {
  formatTimestampToReadableAge,
  formatTimestampToReadableDate,
} from "@/lib/helpers";
import { DropdownMenu, Table } from "@radix-ui/themes";
import Image from "next/image";
import { useState } from "react";
import { TransactionLoading } from "./GameSkeletons";
import * as Tooltip from "@radix-ui/react-tooltip";
import Link from "next/link";
import { CopyIcon } from "@radix-ui/react-icons";
import toast from "react-hot-toast";

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

const copyToClipBoard = async (toCopyContent: string, copiedType: string) => {
  try {
    await navigator.clipboard.writeText(toCopyContent);
    toast(<>{copiedType} copied to clipboard!</>, {
      duration: 2000,
    });
  } catch (err) {
    toast(<>Error copying {copiedType}! Please Try Again</>, {
      duration: 2000,
    });
  }
};

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
          <p>Filter By Status</p>
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
              <Table.ColumnHeaderCell>Type</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>
                Transaction Status
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Age</Table.ColumnHeaderCell>
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
                        <Table.Cell>
                          <div className="flex items-center gap-1">
                            <Link
                              target="_blank"
                              href={`https://minascan.io/mainnet/tx/${transaction.txn_hash}`}
                              className="font-medium text-primary hover:text-primary/80"
                            >
                              {transaction.txn_hash}
                            </Link>

                            <button
                              onClick={() => {
                                copyToClipBoard(
                                  `${transaction.txn_hash}`,
                                  "Transaction Hash"
                                );
                              }}
                              className="text-primary"
                            >
                              <CopyIcon />
                            </button>
                          </div>
                        </Table.Cell>
                        <Table.Cell>{transaction.network}</Table.Cell>
                        <Table.RowHeaderCell>
                          {transaction.txn_status}
                        </Table.RowHeaderCell>
                        <Table.Cell>
                          <Tooltip.Provider delayDuration={300}>
                            <Tooltip.Root>
                              <Tooltip.Trigger asChild>
                                <span className="text-gray-800">
                                  {formatTimestampToReadableAge(
                                    transaction.created_at
                                  )}
                                </span>
                              </Tooltip.Trigger>
                              <Tooltip.Portal>
                                <Tooltip.Content
                                  className="whitespace-nowrap rounded-xl bg-primary/10 px-4 py-1 shadow-sm backdrop-blur-xl"
                                  sideOffset={5}
                                >
                                  {formatTimestampToReadableDate(
                                    transaction.created_at
                                  )}
                                  <Tooltip.Arrow className="TooltipArrow border-primary/30 backdrop-blur-xl" />
                                </Tooltip.Content>
                              </Tooltip.Portal>
                            </Tooltip.Root>
                          </Tooltip.Provider>
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
