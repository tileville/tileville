"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { CopyIcon } from "@radix-ui/react-icons";
import ProfileSideBar from "@/components/ProfileSideBar";
import RightSideBar from "@/components/RightSideBar";
import { useProfile, useProfileLazyQuery } from "@/db/react-query-hooks";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNetworkStore } from "@/lib/stores/network";
import {
  useObserveMinaBalance,
  useMinaBalancesStore,
} from "@/lib/stores/minaBalances";
import { useAuthSignature } from "@/hooks/useAuthSignature";
import { copyToClipBoard } from "@/lib/helpers";
import { ProfileTabs } from "@/components/profileTabs/ProfileTabs";
import { EditProfileModal } from "@/components/Modals/EditProfileModal/EditProfileModal";

export interface IFormInput {
  firstName: string;
  lastName: string;
  username: string;
  avatar_url: string;
  twitter_username: {
    username: string;
    isPublic: boolean;
  };
  telegram_username: {
    username: string;
    isPublic: boolean;
  };
  discord_username: {
    username: string;
    isPublic: boolean;
  };
  email_address: {
    email: string;
    isPublic: boolean;
  };
}

export default function Profile({ initialTab }: { initialTab: string }) {
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
      twitter_username: {
        username: "",
        isPublic: false,
      },
      telegram_username: {
        username: "",
        isPublic: false,
      },
      discord_username: {
        username: "",
        isPublic: false,
      },
      email_address: {
        email: "",
        isPublic: false,
      },
    },
  });

  const { validateOrSetSignature, accountAuthSignature } = useAuthSignature();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (profileData) {
      const {
        fullname,
        username,
        avatar_url,
        twitter_username,
        telegram_username,
        discord_username,
        email_address,
      } = profileData;
      setValue("firstName", (fullname ?? "").split(" ")[0]);
      setValue("lastName", (fullname ?? "").split(" ")[1]);
      setValue("avatar_url", avatar_url ?? "/img/avatars/defaultImg.webp");
      setValue("username", username ?? "");

      if (twitter_username) {
        setValue("twitter_username", twitter_username);
      }
      if (telegram_username) {
        setValue("telegram_username", telegram_username);
      }
      if (discord_username) {
        setValue("discord_username", discord_username);
      }
      if (email_address) {
        setValue("email_address", email_address);
      }
    }
  }, [profileData, setValue]);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setIsLoading(true);
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

    setIsLoading(false);
    return (
      profileMutation.mutate({
        wallet_address: `${networkStore?.address}`,
        username: data.username,
        fullname: `${data.firstName} ${data.lastName}`,
        avatar_url: data.avatar_url,
        twitter_username: data.twitter_username,
        telegram_username: data.telegram_username,
        discord_username: data.discord_username,
        email_address: data.email_address,
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

  // Check if any profile field is missing
  const isProfileIncomplete =
    !profileData?.fullname ||
    !profileData?.username ||
    !profileData?.avatar_url;

  if (!networkStore.address) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center p-8">
        <button
          className="primary-btn"
          onClick={() => {
            networkStore.connectWallet(false);
          }}
        >
          Connect your wallet first
        </button>
      </div>
    );
  }

  return (
    <div className="fade-slide-in p-4 pb-24 pt-12 md:pt-40">
      <div className="mx-auto max-w-[1280px]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="items-ceter flex flex-[0.5] gap-3">
            <div>
              {!accountAuthSignature ? (
                <button
                  onClick={async () => {
                    await validateOrSetSignature();
                  }}
                >
                  Please sign by wallet
                </button>
              ) : (
                <>
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
                    <EditProfileModal
                      closeModal={closeModal}
                      modalOpen={modalOpen}
                      setModalOpen={setModalOpen}
                      isProfileIncomplete={isProfileIncomplete}
                      register={register}
                      firstNameError={errors.firstName}
                      userNameError={errors.username}
                      userNameErrorMsg={errors.username?.message}
                      emailError={errors.email_address?.email}
                      emailErrorMsg={errors.email_address?.email?.message}
                      onSubmit={onSubmit}
                      handleSubmit={handleSubmit}
                      handleToggle={handleToggle}
                      avatarUrl={avatarUrl}
                      isLoading={isLoading}
                      watch={watch}
                      setValue={setValue}
                      isUserHasProfile={true}
                    />
                  </div>
                </>
              )}
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
                        copyToClipBoard({
                          toCopyContent: profileData.username,
                          copiedType: "username",
                        });
                      }}
                    >
                      <CopyIcon />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="hidden h-full min-h-[100px] w-[1px] bg-black/10 md:block"></div>

          <div>
            <h3 className="text-xl font-semibold">Wallet Address</h3>
            <div className="flex items-center gap-2">
              <p className="break-all">{networkStore?.address}</p>

              <button
                onClick={() => {
                  copyToClipBoard({
                    toCopyContent: networkStore.address
                      ? networkStore.address
                      : "",
                    copiedType: "Wallet Address",
                  });
                }}
              >
                <CopyIcon />
              </button>
            </div>
          </div>

          <div className="hidden h-full min-h-[100px] w-[1px] bg-black/10 md:block"></div>

          <div className="mb-4 flex items-center justify-end gap-4">
            <div>Balance :</div>
            <div className="text-2xl font-semibold">
              {(
                Number(minaBalancesStore.balances[networkStore.address] ?? 0n) /
                10 ** 9
              ).toFixed(2)}
              MINA
            </div>
          </div>
        </div>
        <ProfileTabs
          walletAddress={networkStore.address}
          initialTab={initialTab}
        />
      </div>

      <RightSideBar handleToggle={handleToggle} rightSlider={rightSlider}>
        <ProfileSideBar handleToggle={handleToggle} selectImage={selectImage} />
      </RightSideBar>
    </div>
  );
}
