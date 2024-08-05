"use client";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import { Box, Button, Tabs } from "@radix-ui/themes";
import Image from "next/image";
import { CameraIcon, CopyIcon } from "@radix-ui/react-icons";
import { Modal } from "@/components/common/Modal";
import ProfileSideBar from "@/components/ProfileSideBar";
import RightSideBar from "@/components/RightSideBar";
import { useProfile, useProfileLazyQuery } from "@/db/react-query-hooks";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNetworkStore } from "@/lib/stores/network";
import {
  useObserveMinaBalance,
  useMinaBalancesStore,
} from "@/lib/stores/minaBalances";
import ActiveGames from "@/components/profileTabs/activeGames";
import PastGames from "@/components/profileTabs/pastGames";
import Transactions from "@/components/profileTabs/transactions";
import DigitalCollection from "@/components/profileTabs/digitalCollection";
import Preferences from "@/components/profileTabs/preferences";

interface IFormInput {
  firstName: string;
  lastName: string;
  username: string;
  avatar_url: string;
}

export default function Profile() {
  const [modalOpen, setModalOpen] = useState(false);
  const [rightSlider, setRightSlider] = useState(false);
  const minaBalancesStore = useMinaBalancesStore();
  useObserveMinaBalance();
  const networkStore = useNetworkStore();
  const { data: profileData, refetch } = useProfileLazyQuery(
    networkStore?.address || ""
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    setError,
  } = useForm<IFormInput>({
    defaultValues: {
      firstName: (profileData?.fullname ?? "").split(" ")[0],
      lastName: (profileData?.fullname ?? "").split(" ")[1],
      username: profileData?.username || "",
      avatar_url: profileData?.avatar_url || "/img/avatars/defaultImg.webp",
    },
  });

  useEffect(() => {
    if (profileData) {
      const { fullname, username, avatar_url } = profileData;
      setValue("firstName", (fullname ?? "").split(" ")[0]);
      setValue("lastName", (fullname ?? "").split(" ")[1]);
      setValue("avatar_url", avatar_url ?? "/img/avatars/defaultImg.webp");
      setValue("username", username ?? "");
    }
  }, [profileData, setValue]);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const isExistApiResponse = await fetch(
      `/api/player_profile/is_username_exist?username=${data.username}&userId=${
        profileData?.id || ""
      }`
    );

    const isExist = await isExistApiResponse.json();

    if (isExist.status) {
      setError("username", {
        type: "custom",
        message: "Username already exist",
      });
      return;
    }

    return (
      profileMutation.mutate({
        wallet_address: `${networkStore?.address}`,
        username: data.username,
        fullname: `${data.firstName} ${data.lastName}`,
        avatar_url: data.avatar_url,
      }),
      closeModal()
    );
  };

  const profileMutation = useProfile({
    onSuccess: () => {
      // console.log("Profile data saved successfully");
      refetch();
    },
    onMutate: () => {
      console.log("Saving leaderboard data...");
    },
    onError: (error) => {
      console.error("Error saving leaderboard data:", error);
    },
  });

  function selectImage(imgUrl: string) {
    setValue("avatar_url", imgUrl);
  }
  const closeModal = () => {
    setModalOpen(false);
  };

  function handleToggle() {
    setRightSlider(!rightSlider);
  }

  const avatarUrl = watch("avatar_url");

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

  // Check if any profile field is missing
  const isProfileIncomplete =
    !profileData?.fullname ||
    !profileData?.username ||
    !profileData?.avatar_url;

  if (!networkStore.address) {
    return (
      <div className="flex  min-h-screen w-full items-center justify-center">
        <Button
          variant="classic"
          className="mx-4 !cursor-pointer"
          onClick={() => {
            networkStore.connectWallet(false);
          }}
        >
          Connect your wallet first
        </Button>
      </div>
    );
  }

  return (
    <div className="fade-slide-in p-4 pt-40">
      <div className="mx-auto max-w-[1280px]">
        <div>
          <div className="flex items-center justify-between gap-3">
            <div className="items-ceter flex gap-3">
              <div>
                {!!profileData?.avatar_url && (
                  <div className="relative h-20 w-20 rounded-full">
                    <Image
                      src={profileData.avatar_url}
                      width={80}
                      height={80}
                      alt="profile"
                      className="h-full w-full rounded-full object-cover"
                    />
                  </div>
                )}

                <div>
                  <Modal
                    isOpen={modalOpen}
                    setIsOpen={setModalOpen}
                    onClose={closeModal}
                    trigger={
                      <button className="text-sm text-black/60 underline">
                        {isProfileIncomplete
                          ? "Complete Profile"
                          : "Edit Profile"}
                      </button>
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
                                <span className="cursor-pointer text-gray-800">
                                  Why?
                                </span>
                              </Tooltip.Trigger>
                              <Tooltip.Portal>
                                <Tooltip.Content
                                  className="max-w-[250px] rounded-xl bg-white p-4 shadow-sm"
                                  sideOffset={5}
                                >
                                  We Want to show your score in the leaderboard
                                  that is why we want your name.
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
                                  src={avatarUrl}
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
                                  <span className="text-sm text-red-500">
                                    *
                                  </span>
                                </label>

                                <div>
                                  <input
                                    type="text"
                                    className="border-primary-30 min-h-10 h-10 w-full rounded-md border bg-transparent px-2 font-medium outline-none placeholder:text-primary/30"
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
                                <label htmlFor="username" className="block">
                                  Username
                                  <span className="text-sm text-red-500">
                                    *
                                  </span>
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
                                  {errors.username?.message}
                                </span>
                              </div>
                            </div>

                            <div className="ms-auto grid grid-cols-2 gap-3 pt-8">
                              <button
                                className="h-10 rounded-full border-primary bg-primary/30 px-5 py-2 text-sm font-medium hover:bg-primary/50"
                                onClick={closeModal}
                                type="button"
                              >
                                No, cancel
                              </button>

                              <button
                                className="rounded-full bg-primary px-3 text-sm font-medium text-white hover:bg-primary/90"
                                type="submit"
                              >
                                Submit
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </Modal>
                </div>
              </div>
              <div>
                {!!profileData?.fullname && (
                  <h3>
                    <span className="text-xl font-semibold">
                      {profileData.fullname}
                    </span>{" "}
                  </h3>
                )}
                <div className="tet-sm text-gray-500">
                  {!!profileData?.username && (
                    <div className="flex items-center gap-2">
                      <h3>{profileData.username}</h3>
                      <button
                        onClick={() => {
                          copyToClipBoard(
                            `${profileData.username}`,
                            "username"
                          );
                        }}
                      >
                        <CopyIcon />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="h-full min-h-[100px] w-[1px] bg-black/10"></div>

            <div>
              <h3 className="text-xl font-semibold">Wallet Address</h3>
              <div className="flex items-center gap-2">
                <p>{networkStore?.address}</p>

                <button
                  onClick={() => {
                    copyToClipBoard(
                      `${networkStore.address}`,
                      "Wallet Address"
                    );
                  }}
                >
                  <CopyIcon />
                </button>
              </div>
            </div>

            <div className="h-full min-h-[100px] w-[1px] bg-black/10"></div>

            <div className="mb-4 flex items-center justify-end gap-4">
              <div>Balance :</div>
              <div className="text-2xl font-semibold">
                {(
                  Number(
                    minaBalancesStore.balances[networkStore.address] ?? 0n
                  ) /
                  10 ** 9
                ).toFixed(2)}{" "}
                MINA
              </div>
            </div>
          </div>
        </div>

        <Tabs.Root defaultValue="active-games">
          <Tabs.List className="mt-4">
            <Tabs.Trigger value="active-games">Active Games</Tabs.Trigger>
            <Tabs.Trigger value="past-games">Past Games</Tabs.Trigger>
            <Tabs.Trigger value="transactions">Transactions</Tabs.Trigger>
            <Tabs.Trigger value="collection">Digital Collection</Tabs.Trigger>
            <Tabs.Trigger value="preferences">Preferences</Tabs.Trigger>
          </Tabs.List>

          <Box pt="3">
            <Tabs.Content value="active-games">
              <ActiveGames walletAddress={networkStore?.address} />
            </Tabs.Content>
            <Tabs.Content value="past-games">
              <PastGames walletAddress={networkStore?.address} />
            </Tabs.Content>
            <Tabs.Content value="transactions">
              <Transactions walletAddress={networkStore?.address} />
            </Tabs.Content>
            <Tabs.Content value="collection">
              <DigitalCollection />
            </Tabs.Content>
            <Tabs.Content value="preferences">
              <Preferences />
            </Tabs.Content>
          </Box>
        </Tabs.Root>
      </div>

      <RightSideBar handleToggle={handleToggle} rightSlider={rightSlider}>
        <ProfileSideBar handleToggle={handleToggle} selectImage={selectImage} />
      </RightSideBar>
    </div>
  );
}
