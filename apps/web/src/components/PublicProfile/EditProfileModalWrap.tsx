"use client";

import { useEffect, useState } from "react";
import ProfileSideBar from "@/components/ProfileSideBar";
import RightSideBar from "@/components/RightSideBar";
import { useProfile, useProfileLazyQuery } from "@/db/react-query-hooks";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNetworkStore } from "@/lib/stores/network";
import { useObserveMinaBalance } from "@/lib/stores/minaBalances";
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

type EditProfileModalWrapType = {
  isUserHasProfile: boolean;
};

export default function EditProfileModalWrap({
  isUserHasProfile,
}: EditProfileModalWrapType) {
  const [modalOpen, setModalOpen] = useState(false);
  const [rightSlider, setRightSlider] = useState(false);
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
    <>
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
        isUserHasProfile={isUserHasProfile}
      />
      <RightSideBar handleToggle={handleToggle} rightSlider={rightSlider}>
        <ProfileSideBar handleToggle={handleToggle} selectImage={selectImage} />
      </RightSideBar>
    </>
  );
}
