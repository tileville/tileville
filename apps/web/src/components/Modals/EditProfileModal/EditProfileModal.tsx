import { CameraIcon, Cross1Icon } from "@radix-ui/react-icons";
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
};

const INPUT_PRIMARY_CLASSES =
  "border-primary min-h-10 h-[54px] w-full rounded-md border-2 bg-transparent px-2 font-medium outline-none placeholder:text-primary/30";

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
}: EditProfileModalType) => {
  return (
    <Modal
      isOpen={modalOpen}
      setIsOpen={setModalOpen}
      onClose={closeModal}
      trigger={
        <button className="text-sm text-black/60 underline">
          {isProfileIncomplete ? "Complete Profile" : "Edit Profile"}
        </button>
      }
    >
      <div className="relative mx-auto max-h-full w-full max-w-[819px] rounded-[5px] bg-[#99B579] font-roboto  shadow-md">
        <div className="relative mx-auto max-w-[717px] p-4 md:p-5">
          <h3 className="mb-5 text-center text-2xl font-bold text-black">
            <span>Edit your Profile </span>

            <WhyToolTip />
          </h3>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="left-left text-2xl text-black"
          >
            <div className="">
              <div
                className="group relative mx-auto h-[140px] w-[140px] rounded-full"
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
            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
              <div>
                <label htmlFor="firstName" className="mb-2 block">
                  First Name
                  <span className="text-2xl text-red-500">*</span>
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
                    First Name is required..
                  </span>
                )}
              </div>

              <div>
                <label htmlFor="lastName" className="mb-2 block">
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
              <div className="">
                <label htmlFor="username" className="mb-2 block">
                  Username
                  <span className="text-2xl text-red-500">*</span>
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

              <div className="">
                <label htmlFor="username" className="mb-2 block">
                  Email
                  <span className="text-2xl text-red-500">*</span>
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

            <div className="mt-8">
              <h3 className="text-2xl font-bold">Social Media Links</h3>
              <p className="text-base text-[#C60000]">
                at least provide us with one social link.
              </p>

              <div className="mt-6 flex flex-col gap-4 text-2xl">
                {/* // TODO: For the next three div put content in the Array and render them
                    // TODO: with map */}
                <div className="grid grid-cols-12 items-center gap-6">
                  <div className="col-span-3 flex items-center gap-1">
                    <div>
                      <Image
                        src="/icons/x.svg"
                        width={60}
                        height={60}
                        alt="x"
                      />
                    </div>
                    <p>Twitter</p>
                  </div>
                  <div className="col-span-9 flex flex-1 items-center gap-3">
                    <div className="w-full">
                      <input
                        type="text"
                        placeholder="username"
                        className={`${INPUT_PRIMARY_CLASSES} w-full`}
                        {...register("twitter_username.username")}
                      />
                    </div>
                    <div>
                      <ToggleSwitch
                        isPublic={watch("twitter_username.isPublic")}
                        onChange={(value) =>
                          setValue("twitter_username.isPublic", value)
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-12 items-center gap-6">
                  <div className="col-span-3 flex items-center gap-1">
                    <div>
                      <Image
                        src="/icons/telegram.svg"
                        width={60}
                        height={60}
                        alt="x"
                      />
                    </div>
                    <p>Telegram</p>
                  </div>
                  <div className="col-span-9 flex flex-1 items-center gap-3">
                    <div className="w-full">
                      <input
                        type="text"
                        placeholder="username"
                        className={`${INPUT_PRIMARY_CLASSES} w-full`}
                        {...register("telegram_username.username")}
                      />
                    </div>
                    <div>
                      <ToggleSwitch
                        isPublic={watch("telegram_username.isPublic")}
                        onChange={(value) =>
                          setValue("telegram_username.isPublic", value)
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-12 items-center gap-6">
                  <div className="col-span-3 flex items-center gap-1">
                    <div>
                      <Image
                        src="/icons/discord.svg"
                        width={60}
                        height={60}
                        alt="x"
                      />
                    </div>
                    <p>Discord</p>
                  </div>
                  <div className="col-span-9 flex flex-1 items-center gap-3">
                    <div className="w-full">
                      <input
                        type="text"
                        placeholder="username"
                        className={`${INPUT_PRIMARY_CLASSES} w-full`}
                        {...register("discord_username.username")}
                      />
                    </div>
                    <div>
                      <ToggleSwitch
                        isPublic={watch("discord_username.isPublic")}
                        onChange={(value) =>
                          setValue("discord_username.isPublic", value)
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="ms-auto grid grid-cols-2 gap-3 pt-8">
              <button
                className="h-[65px] rounded-lg border border-primary bg-primary/30 px-5 py-2 text-2xl font-medium text-white hover:bg-primary/50"
                onClick={closeModal}
                type="button"
              >
                cancel
              </button>

              <button
                className="h-[65px] rounded-lg bg-primary px-3 text-2xl font-medium text-white hover:bg-primary/90"
                type="submit"
                disabled={isLoading}
              >
                Save Changes
                {isLoading && <Spinner className="ms-5 align-middle" />}
              </button>
            </div>
          </form>
        </div>

        <button className="absolute right-6 top-6" onClick={closeModal}>
          <Cross1Icon width={24} height={24} />
        </button>
      </div>
    </Modal>
  );
};
