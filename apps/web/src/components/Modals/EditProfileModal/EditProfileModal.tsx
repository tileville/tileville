import { CameraIcon, InfoCircledIcon } from "@radix-ui/react-icons";
import { Modal } from "@/components/common/Modal";
import Image from "next/image";
import {
  FieldError,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
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
  userNameErrorMsg: string | undefined;
  onSubmit: SubmitHandler<IFormInput>;
  handleSubmit: UseFormHandleSubmit<IFormInput, undefined>;
  handleToggle: () => void;
  avatarUrl: string;
  isLoading: boolean;
};

const INPUT_PRIMARY_CLASSES =
  "border-primary min-h-10 h-[60px] w-full rounded-md border-2 bg-transparent px-2 font-medium outline-none placeholder:text-primary/30";

export const EditProfileModal = ({
  closeModal,
  modalOpen,
  setModalOpen,
  isProfileIncomplete,
  register,
  firstNameError,
  userNameError,
  userNameErrorMsg,
  onSubmit,
  handleSubmit,
  handleToggle,
  avatarUrl,
  isLoading,
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
      <div className="relative mx-auto max-h-full w-full max-w-[1052px] rounded-[5px] bg-[#99B579] font-roboto  shadow-md">
        <div className="relative mx-auto max-w-[856px] p-4 md:p-5">
          <h3 className="mb-5 text-center text-4xl font-normal text-black">
            <span>Edit your Profile </span>

            <WhyToolTip />
          </h3>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="left-left text-2xl text-black"
          >
            <div className="">
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
            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
              <div className="col-span-2">
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

              <div className="col-span-2">
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
                    type="text"
                    className={INPUT_PRIMARY_CLASSES}
                    id="email"
                    placeholder="Email"
                  />
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-2xl font-bold">Social Media Links</h3>
              <p className="text-xl text-[#FF5151]">
                at least provide us with one social link.
              </p>

              <div className="mt-6 flex flex-col gap-4 text-2xl">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-1">
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
                  <div className="flex flex-1 items-center gap-3">
                    <div className="w-full">
                      <input
                        type="text"
                        className={`${INPUT_PRIMARY_CLASSES} w-full`}
                      />
                    </div>
                    <div>
                      <ToggleSwitch />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-1">
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
                  <div className="flex flex-1 items-center gap-3">
                    <div className="w-full">
                      <input
                        type="text"
                        className={`${INPUT_PRIMARY_CLASSES} w-full`}
                      />
                    </div>
                    <div>
                      <ToggleSwitch />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-1">
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
                  <div className="flex flex-1 items-center gap-3">
                    <div className="w-full">
                      <input
                        type="text"
                        className={`${INPUT_PRIMARY_CLASSES} w-full`}
                      />
                    </div>
                    <div>
                      <ToggleSwitch />
                    </div>
                  </div>
                </div>
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
                disabled={isLoading}
              >
                Submit
                {isLoading && <Spinner className="ms-5 align-middle" />}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};
