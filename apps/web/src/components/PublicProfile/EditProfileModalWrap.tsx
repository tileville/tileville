"use client";

import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

// Components
import ProfileSideBar from "@/components/ProfileSideBar";
import RightSideBar from "@/components/RightSideBar";
import { EditProfileModal } from "@/components/Modals/EditProfileModal/EditProfileModal";

// Hooks
import { useProfile, useProfileLazyQuery } from "@/db/react-query-hooks";
import { useNetworkStore } from "@/lib/stores/network";
import { useObserveMinaBalance } from "@/lib/stores/minaBalances";

// Types
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

interface EditProfileModalWrapProps {
  isUserHasProfile: boolean;
}

export default function EditProfileModalWrap({
  isUserHasProfile,
}: EditProfileModalWrapProps) {
  // Local state
  const [modalOpen, setModalOpen] = useState(false);
  const [rightSlider, setRightSlider] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Hooks
  useObserveMinaBalance();
  const networkStore = useNetworkStore();
  const { data: profileData, refetch } = useProfileLazyQuery(
    networkStore?.address || ""
  );

  // Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    setError,
  } = useForm<IFormInput>({
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      avatar_url: "/img/avatars/defaultImg.webp",
      twitter_username: { username: "", isPublic: false },
      telegram_username: { username: "", isPublic: false },
      discord_username: { username: "", isPublic: false },
      email_address: { email: "", isPublic: false },
    },
  });

  // Watch avatar URL for updates
  const avatarUrl = watch("avatar_url");

  // Check if any profile field is missing
  const isProfileIncomplete =
    !profileData?.fullname ||
    !profileData?.username ||
    !profileData?.avatar_url;

  // Update form values when profile data changes
  useEffect(() => {
    if (!profileData) return;

    const {
      fullname,
      username,
      avatar_url,
      twitter_username,
      telegram_username,
      discord_username,
      email_address,
    } = profileData;

    // Set basic profile fields
    setValue("firstName", (fullname ?? "").split(" ")[0]);
    setValue("lastName", (fullname ?? "").split(" ")[1] || "");
    setValue("avatar_url", avatar_url ?? "/img/avatars/defaultImg.webp");
    setValue("username", username ?? "");

    // Set social media accounts if they exist
    if (twitter_username) setValue("twitter_username", twitter_username);
    if (telegram_username) setValue("telegram_username", telegram_username);
    if (discord_username) setValue("discord_username", discord_username);
    if (email_address) setValue("email_address", email_address);
  }, [profileData, setValue]);

  // Profile mutation setup
  const profileMutation = useProfile({
    onSuccess: () => refetch(),
    onMutate: () => console.log("Saving profile data..."),
    onError: (error) => console.error("Error saving profile data:", error),
  });

  // Form submission handler
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setIsLoading(true);

    try {
      // Check if username already exists
      const isExistApiResponse = await fetch(
        `/api/player_profile/is_username_exist?username=${
          data.username
        }&userId=${profileData?.id || ""}`
      );

      const isExist = await isExistApiResponse.json();

      if (isExist.status) {
        setError("username", {
          type: "custom",
          message: "Username already exists",
        });
        return;
      }

      // Submit profile data
      profileMutation.mutate({
        wallet_address: networkStore?.address || "",
        username: data.username,
        fullname: `${data.firstName} ${data.lastName}`.trim(),
        avatar_url: data.avatar_url,
        twitter_username: data.twitter_username,
        telegram_username: data.telegram_username,
        discord_username: data.discord_username,
        email_address: data.email_address,
      });

      closeModal();
    } finally {
      setIsLoading(false);
    }
  };

  // UI event handlers
  const selectImage = (imgUrl: string) => setValue("avatar_url", imgUrl);
  const closeModal = () => setModalOpen(false);
  const handleToggle = () => setRightSlider(!rightSlider);

  // If not connected to wallet, show connect button
  if (!networkStore.address) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center p-8">
        <button
          className="primary-btn"
          onClick={() => networkStore.connectWallet(false)}
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
