"use client";

import { Modal } from "@/components/common/Modal";
import { useState } from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import { Button, Table } from "@radix-ui/themes";

export default function Profile() {
  const [modalOpen, setModalOpen] = useState(false);

  // Handler to open the modal
  // const openModal = () => {
  //   setModalOpen(true);
  // };

  // Handler to close the modal
  const closeModal = () => {
    setModalOpen(false);
  };

  const pastGames = [
    {
      id: "13132ulk",
      score: 244,
      rank: 133,
    },
    {
      id: "13132ulk",
      score: 244,
      rank: 133,
    },
    {
      id: "13132ulk",
      score: 244,
      rank: 133,
    },
    {
      id: "13132ulk",
      score: 244,
      rank: 133,
    },
    {
      id: "13132ulk",
      score: 244,
      rank: 133,
    },
  ];

  return (
    <div className="p-4 pt-40">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-4 flex items-center justify-end gap-4">
          <div>Your Total Mina Balance :-</div>
          <div className="text-2xl font-semibold">23.898 Minas</div>
        </div>

        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Competition Id</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Score</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Rank</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {pastGames.map((game) => {
              return (
                <Table.Row key={game.id}>
                  <Table.RowHeaderCell>{game.id}</Table.RowHeaderCell>
                  <Table.Cell>{game.score}</Table.Cell>
                  <Table.Cell>{game.rank}</Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table.Root>
        <Modal
          isOpen={modalOpen} // Pass the state variable to control modal visibility
          setIsOpen={setModalOpen} // Pass the function to update modal visibility
          onClose={closeModal} // Pass a function to handle modal close event
          trigger={
            <Button variant="classic" className="mx-4">
              Trigger Element
            </Button>
          } // Element that triggers the modal
        >
          {/* Content of the modal */}
          <div className="relative max-h-full w-full max-w-md p-4">
            <div className="relative p-4 text-center md:p-5">
              <svg
                className="mx-auto mb-4 h-12 w-12 text-gray-400 dark:text-gray-200"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Please Complete Your Profile.
                <Tooltip.Provider>
                  <Tooltip.Root>
                    <Tooltip.Trigger asChild>
                      <span className="cursor-pointer text-gray-800">Why?</span>
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                      <Tooltip.Content
                        className="max-w-[250px] rounded-xl bg-white p-4 shadow-sm"
                        sideOffset={5}
                      >
                        We Want to show your score in the leaderboard that is
                        why we want your name.
                        <Tooltip.Arrow className="TooltipArrow" />
                      </Tooltip.Content>
                    </Tooltip.Portal>
                  </Tooltip.Root>
                </Tooltip.Provider>
              </h3>
              <button
                onClick={closeModal}
                type="button"
                className="focus:ring-black-300 dark:focus:black-800 inline-flex items-center rounded-lg bg-black px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-black/90 focus:outline-none focus:ring-4"
              >
                Okay lets go!
              </button>
              <button
                onClick={closeModal}
                type="button"
                className="ms-3 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
              >
                No, cancel
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}
