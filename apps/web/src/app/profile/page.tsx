"use client";

import { Modal } from "@/components/common/Modal";
import { useState } from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import { Button, Table } from "@radix-ui/themes";
import Image from "next/image";
import { CameraIcon } from "@radix-ui/react-icons";
import ProfileSideBar from "@/components/ProfileSideBar";
import RightSideBar from "@/components/RightSideBar";
import { useProfile } from "@/db/react-query-hooks";
import { useForm, SubmitHandler } from "react-hook-form";

export default function Profile() {
  const [modalOpen, setModalOpen] = useState(false);
  const [rightSlider, setRightSlider] = useState(false);
  const [currentImg, setCurrentImg] = useState("/img/avatars/defaultImg.webp");
  interface IFormInput {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) =>
    // console.log(data);
    profileMutation.mutate({
      wallet_address: `${new Date().valueOf()}`,
      username: data.username,
      fullname: `${data.firstName} ${data.lastName}`,
      email: data.email,
      avatar_url: currentImg,
    });

  const profileMutation = useProfile({
    onSuccess: () => {
      console.log("Leaderboard data saved successfully");
    },
    onMutate: () => {
      console.log("Saving leaderboard data...");
    },
    onError: (error) => {
      console.error("Error saving leaderboard data:", error);
    },
  });

  function selectImage(imgUrl: string) {
    setCurrentImg(imgUrl);
  }
  const closeModal = () => {
    setModalOpen(false);
  };

  function handleToggle() {
    setRightSlider(!rightSlider);
  }

  function submitProfileForm(formData: any) {
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const username = formData.get("username");
    const email = formData.get("email");

    profileMutation.mutate({
      wallet_address: `${new Date().valueOf()}`,
      username: username,
      fullname: `${firstName} ${lastName}`,
      email: email,
      avatar_url: currentImg,
    });
  }

  const pastGames = [
    {
      id: "1",
      score: 244,
      rank: 133,
    },
    {
      id: "2",
      score: 244,
      rank: 133,
    },
    {
      id: "3",
      score: 244,
      rank: 133,
    },
    {
      id: "4",
      score: 244,
      rank: 133,
    },
    {
      id: "5",
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
          isOpen={modalOpen}
          setIsOpen={setModalOpen}
          onClose={closeModal}
          trigger={
            <Button variant="classic" className="mx-4 !cursor-pointer">
              Trigger Element
            </Button>
          }
        >
          <div className="relative max-h-full w-full max-w-md">
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
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
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

              <div className="text-left">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-4">
                    <div
                      className="group relative mx-auto h-20 w-20 rounded-full"
                      onClick={handleToggle}
                    >
                      <Image
                        src={currentImg}
                        width={80}
                        height={80}
                        alt="profile"
                        className="h-full w-full rounded-full object-cover"
                      />

                      <div className="pointer-events-none absolute inset-0 h-full w-full rounded-full transition-colors group-hover:bg-black/30"></div>
                      <span className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 bg-black/10 text-white opacity-0 transition-opacity group-hover:opacity-100">
                        <CameraIcon />
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-x-3 gap-y-1">
                    <div>
                      <label htmlFor="firstName" className="block">
                        First Name
                        <span className="text-sm text-red-500">*</span>
                      </label>

                      <div>
                        <input
                          type="text"
                          className="border-primary-30 min-h-10 h-10 w-full rounded-md border bg-transparent px-2 font-medium outline-none placeholder:text-primary/30"
                          id="firstName"
                          placeholder="First Name"
                          {...register("firstName", {
                            required: true,
                          })}
                        />
                      </div>

                      <span
                        className={`${
                          errors.firstName ? "opacity-100" : ""
                        } mt-1 block text-xs text-red-500 opacity-0 transition-opacity`}
                      >
                        First Name is required..
                      </span>
                    </div>

                    <div>
                      <label htmlFor="lastName" className="block">
                        Last Name
                      </label>

                      <div>
                        <input
                          type="text"
                          className="border-primary-30 min-h-10 h-10 w-full rounded-md border bg-transparent px-2 font-medium outline-none placeholder:text-primary/30"
                          id="lastName"
                          placeholder="Last Name"
                          {...register("lastName")}
                        />
                      </div>
                    </div>
                    <div className="col-span-2">
                      <label htmlFor="email" className="block">
                        Email
                        <span className="text-sm text-red-500">*</span>
                      </label>

                      <div>
                        <input
                          type="text"
                          className="border-primary-30 min-h-10 h-10 w-full rounded-md border bg-transparent px-2 font-medium outline-none placeholder:text-primary/30"
                          id="email"
                          placeholder="Email"
                          {...register("email", {
                            pattern:
                              /^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/,
                            required: true,
                          })}
                        />
                      </div>

                      <span
                        className={`${
                          errors.email ? "opacity-100" : ""
                        } mt-1 block text-xs text-red-500 opacity-0 transition-opacity`}
                      >
                        Please put a valid Email..
                      </span>
                    </div>

                    <div className="col-span-2">
                      <label htmlFor="username" className="block">
                        Username
                        <span className="text-sm text-red-500">*</span>
                      </label>

                      <div>
                        <input
                          type="text"
                          className="border-primary-30 min-h-10 h-10 w-full rounded-md border bg-transparent px-2 font-medium outline-none placeholder:text-primary/30"
                          id="username"
                          placeholder="Username"
                          {...register("username", {
                            required: true,
                          })}
                        />
                      </div>

                      <span
                        className={`${
                          errors.username ? "opacity-100" : ""
                        } mt-1 block text-xs text-red-500 opacity-0 transition-opacity`}
                      >
                        username is required..
                      </span>
                    </div>
                  </div>

                  <div className="ms-auto grid max-w-[200px] grid-cols-2 gap-3 pt-8">
                    <Button
                      className="pointer"
                      onClick={closeModal}
                      type="button"
                      variant="outline"
                    >
                      No, cancel
                    </Button>

                    <Button
                      className="pointer"
                      // onClick={closeModal}
                      type="submit"
                    >
                      Submit
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Modal>
      </div>

      <RightSideBar handleToggle={handleToggle} rightSlider={rightSlider}>
        <ProfileSideBar handleToggle={handleToggle} selectImage={selectImage} />
      </RightSideBar>
    </div>
  );
}
