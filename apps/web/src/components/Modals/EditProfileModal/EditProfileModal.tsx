import {
  CameraIcon,
  Cross1Icon,
  Pencil1Icon,
  PlusIcon,
} from "@radix-ui/react-icons";
import { Modal } from "@/components/common/Modal";
import Image from "next/image";
import {
  FieldError,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { IFormInput } from "@/app/profile/ProfileContent";
import { Spinner } from "../../common/Spinner";
import { WhyToolTip } from "./whyToolTip";
import ToggleSwitch from "@/components/common/ToggleSwitch";

type EditProfileModalType = {
  closeModal: () => void;
  modalOpen: boolean;
  setModalOpen: (isOpen: boolean) => void;
  isProfileIncomplete: boolean;
  register: UseFormRegister<IFormInput>;
  firstNameError: FieldError | undefined;
  userNameError: FieldError | undefined;
  emailError: FieldError | undefined;
  emailErrorMsg: string | undefined;
  userNameErrorMsg: string | undefined;
  onSubmit: SubmitHandler<IFormInput>;
  handleSubmit: UseFormHandleSubmit<IFormInput, undefined>;
  handleToggle: () => void;
  avatarUrl: string;
  isLoading: boolean;
  watch: UseFormWatch<IFormInput>;
  setValue: UseFormSetValue<IFormInput>;
  isUserHasProfile: boolean;
};

type SocialMediaLinkProps = {
  iconSrc: string;
  name: string;
  register: UseFormRegister<IFormInput>;
  fieldName: string;
  isPublic: boolean;
  setValue: UseFormSetValue<IFormInput>;
};

const INPUT_PRIMARY_CLASSES =
  "border-primary min-h-10 h-[40px] w-full rounded-md border-2 bg-transparent px-2 font-medium outline-none placeholder:text-primary/30 text-base";

const SocialMediaLink = ({
  iconSrc,
  name,
  register,
  fieldName,
  isPublic,
  setValue,
}: SocialMediaLinkProps) => (
  <div className="relative grid grid-cols-12 items-center">
    <div className="col-span-12 mb-2 flex items-center gap-1 md:col-span-4 md:mb-0">
      <div>
        <Image
          className="h-[30px] w-[30px] md:h-10 md:w-10"
          src={iconSrc}
          width={40}
          height={40}
          alt={name.toLowerCase()}
        />
      </div>
      <p>{name}</p>
    </div>
    <div className="col-span-12 flex flex-1 items-center gap-1 md:col-span-8 md:gap-3">
      <div className="w-full">
        <input
          type="text"
          placeholder="username"
          className={`${INPUT_PRIMARY_CLASSES} w-full`}
          {...register(`${fieldName}.username`)}
        />
      </div>
      <div className="absolute right-0 top-0 md:static">
        <ToggleSwitch
          isPublic={isPublic}
          onChange={(value) => setValue(`${fieldName}.isPublic`, value)}
        />
      </div>
    </div>
  </div>
);

export const EditProfileModal = ({
  closeModal,
  modalOpen,
  setModalOpen,
  isProfileIncomplete,
  register,
  firstNameError,
  userNameError,
  emailError,
  emailErrorMsg,
  userNameErrorMsg,
  onSubmit,
  handleSubmit,
  handleToggle,
  avatarUrl,
  isLoading,
  watch,
  setValue,
  isUserHasProfile,
}: EditProfileModalType) => {
  const socialMediaPlatforms = [
    {
      name: "Twitter",
      iconSrc: "/icons/x.svg",
      fieldName: "twitter_username",
    },
    {
      name: "Telegram",
      iconSrc: "/icons/telegram.svg",
      fieldName: "telegram_username",
    },
    {
      name: "Discord",
      iconSrc: "/icons/discord.svg",
      fieldName: "discord_username",
    },
  ];

  const renderTriggerButton = () => {
    if (isUserHasProfile) {
      return (
        <button className="badge-base-classes absolute right-3 top-3 z-10">
          <span>
            {isProfileIncomplete ? "Complete Profile" : "Edit Profile"}
          </span>
          <span className="text-white">
            <Pencil1Icon />
          </span>
        </button>
      );
    }

    return (
      <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-white hover:bg-primary/90">
        <PlusIcon />
        Create Profile
      </button>
    );
  };

  return (
    <Modal
      isOpen={modalOpen}
      setIsOpen={setModalOpen}
      onClose={closeModal}
      trigger={renderTriggerButton()}
    >
      <div className="relative mx-auto max-h-full w-full max-w-[600px] rounded-[5px] bg-[#99B579] font-roboto shadow-md">
        <div className="relative max-h-[calc(100vh-20px)] overflow-auto px-4 py-6 md:px-12 md:py-8">
          <div className="mx-auto max-w-[524px]">
            <h3 className="mb-5 text-center text-2xl font-bold text-black">
              <span>Edit your Profile </span>
              <WhyToolTip />
            </h3>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="left-left text-base text-black"
            >
              {/* Profile Picture */}
              <div className="">
                <div
                  className="group relative mx-auto h-[85px] w-[85px] rounded-full"
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

              {/* Personal Information */}
              <div className="grid grid-cols-2 gap-x-3 gap-y-2 md:gap-x-8 md:gap-y-4">
                {/* First Name */}
                <div>
                  <label htmlFor="firstName" className="mb-1 block">
                    First Name
                    <span className="text-red-500">*</span>
                  </label>

                  <div>
                    <input
                      type="text"
                      className={INPUT_PRIMARY_CLASSES}
                      placeholder="First Name"
                      {...register("firstName", {
                        required: true,
                      })}
                    />
                  </div>

                  {firstNameError && (
                    <span className="mt-1 block text-sm text-red-500">
                      First Name is required.
                    </span>
                  )}
                </div>

                {/* Last Name */}
                <div>
                  <label htmlFor="lastName" className="mb-1 block">
                    Last Name
                  </label>

                  <div>
                    <input
                      type="text"
                      className={INPUT_PRIMARY_CLASSES}
                      id="lastName"
                      placeholder="Last Name"
                      {...register("lastName")}
                    />
                  </div>
                </div>

                {/* Username */}
                <div className="">
                  <label htmlFor="username" className="mb-1 block">
                    Username
                    <span className="text-red-500">*</span>
                  </label>

                  <div>
                    <input
                      type="text"
                      className={INPUT_PRIMARY_CLASSES}
                      id="username"
                      placeholder="Username"
                      {...register("username", {
                        required: true,
                      })}
                    />
                  </div>

                  <span
                    className={`${
                      userNameError ? "opacity-100" : ""
                    } mt-1 block text-xs text-red-500 opacity-0 transition-opacity`}
                  >
                    {userNameErrorMsg}
                  </span>
                </div>

                {/* Email */}
                <div className="">
                  <label htmlFor="email" className="mb-1 block">
                    Email-id
                    <span className="text-red-500">*</span>
                  </label>

                  <div>
                    <input
                      type="email"
                      className={INPUT_PRIMARY_CLASSES}
                      id="email"
                      placeholder="Email"
                      {...register("email_address.email", {
                        required: true,
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                    />
                  </div>

                  <span
                    className={`${
                      emailError ? "opacity-100" : ""
                    } mt-1 block text-xs text-red-500 opacity-0 transition-opacity`}
                  >
                    {emailErrorMsg}
                  </span>
                </div>
              </div>

              {/* Social Media Section */}
              <div className="mt-4 md:mt-8">
                <h3 className="text-xl font-bold">Social Media Links</h3>
                <p className="text-sm text-[#C60000]">
                  at least provide us with one social link.
                </p>

                <div className="mt-6 flex flex-col gap-4 text-base md:text-xl">
                  {socialMediaPlatforms.map((platform) => (
                    <SocialMediaLink
                      key={platform.fieldName}
                      iconSrc={platform.iconSrc}
                      name={platform.name}
                      register={register}
                      fieldName={platform.fieldName}
                      isPublic={watch(`${platform.fieldName}.isPublic`)}
                      setValue={setValue}
                    />
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="ms-auto grid grid-cols-2 gap-3 pt-8">
                <button
                  className="h-[40px] rounded-lg border border-primary bg-primary/30 px-5 py-1 text-lg text-white hover:bg-primary/50 md:text-xl"
                  onClick={closeModal}
                  type="button"
                >
                  Cancel
                </button>

                <button
                  className="h-[40px] rounded-lg bg-primary px-3 text-lg text-white hover:bg-primary/90 md:text-xl"
                  type="submit"
                  disabled={isLoading}
                >
                  Save Changes
                  {isLoading && <Spinner className="ms-5 align-middle" />}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Close Button */}
        <button
          className="absolute right-2 top-2 md:right-6 md:top-6"
          onClick={closeModal}
        >
          <Cross1Icon width={24} height={24} />
        </button>
      </div>
    </Modal>
  );
};
