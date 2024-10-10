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
      <div className="relative max-h-full w-full max-w-md">
        <div className="relative p-4 md:p-5">
          <InfoCircledIcon
            width={48}
            height={48}
            color="#9ca3af"
            className="mx-auto mb-4"
          />
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400 text-center">
            Please Complete Your Profile.
            <WhyToolTip />
          </h3>

          <form onSubmit={handleSubmit(onSubmit)} className="left-left">
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
                    placeholder="First Name"
                    {...register("firstName", {
                      required: true,
                    })}
                  />
                </div>

                <span
                  className={`${firstNameError ? "opacity-100" : ""
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
                  className={`${userNameError ? "opacity-100" : ""
                    } mt-1 block text-xs text-red-500 opacity-0 transition-opacity`}
                >
                  {userNameErrorMsg}
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
                disabled={isLoading}
              >
                Submit
                {isLoading && <Spinner className="align-middle ms-5" />}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};
