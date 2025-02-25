import {
  CameraIcon,
  Cross1Icon,
  Pencil1Icon,
  PlusIcon,
} from "@radix-ui/react-icons";
import Image from "next/image";
import { Modal } from "@/components/common/Modal";
import { Spinner } from "@/components/common/Spinner";
import ToggleSwitch from "@/components/common/ToggleSwitch";
import { WhyToolTip } from "./whyToolTip";
import {
  FieldError,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { IFormInput } from "@/app/profile/ProfileContent";

const INPUT_CLASSES =
  "border-primary min-h-10 h-[40px] w-full rounded-md border-2 bg-transparent px-2 font-medium outline-none placeholder:text-primary/30 text-base";

const SOCIAL_LINKS = [
  { name: "Twitter", icon: "/icons/x.svg", field: "twitter_username" },
  { name: "Telegram", icon: "/icons/telegram.svg", field: "telegram_username" },
  { name: "Discord", icon: "/icons/discord.svg", field: "discord_username" },
];

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
}: {
  closeModal: () => void;
  modalOpen: boolean;
  setModalOpen: (isOpen: boolean) => void;
  isProfileIncomplete: boolean;
  register: UseFormRegister<IFormInput>;
  firstNameError?: FieldError;
  userNameError?: FieldError;
  emailError?: FieldError;
  emailErrorMsg?: string;
  userNameErrorMsg?: string;
  onSubmit: SubmitHandler<IFormInput>;
  handleSubmit: UseFormHandleSubmit<IFormInput>;
  handleToggle: () => void;
  avatarUrl: string;
  isLoading: boolean;
  watch: UseFormWatch<IFormInput>;
  setValue: UseFormSetValue<IFormInput>;
  isUserHasProfile: boolean;
}) => (
  <Modal isOpen={modalOpen} setIsOpen={setModalOpen} onClose={closeModal}>
    <div className="relative mx-auto max-w-[600px] rounded-md bg-[#99B579] p-6 font-roboto shadow-md">
      <div className="text-center">
        <h3 className="mb-5 text-2xl font-bold text-black">
          Edit your Profile <WhyToolTip />
        </h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="text-black">
        <div className="mb-4 flex justify-center">
          <div
            className="group relative h-[85px] w-[85px] rounded-full"
            onClick={handleToggle}
          >
            <Image
              src={avatarUrl}
              width={80}
              height={80}
              alt="profile"
              className="h-full w-full rounded-full object-cover"
            />
            <div className="absolute inset-0 rounded-full bg-black/30 transition-opacity group-hover:opacity-100"></div>
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-white opacity-0 group-hover:opacity-100">
              <CameraIcon />
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[
            {
              label: "First Name",
              name: "firstName",
              required: true,
              error: firstNameError,
            },
            { label: "Last Name", name: "lastName", required: false },
            {
              label: "Username",
              name: "username",
              required: true,
              error: userNameError,
              errorMsg: userNameErrorMsg,
            },
            {
              label: "Email-id",
              name: "email_address.email",
              required: true,
              error: emailError,
              errorMsg: emailErrorMsg,
              type: "email",
            },
          ].map(({ label, name, required, error, errorMsg, type = "text" }) => (
            <div key={name}>
              <label className="mb-1 block">
                {label}
                {required && <span className="text-red-500">*</span>}
              </label>
              <input
                type={type}
                className={INPUT_CLASSES}
                placeholder={label}
                {...register(name, { required })}
              />
              {error && (
                <span className="text-sm text-red-500">
                  {errorMsg || `${label} is required.`}
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-bold">Social Media Links</h3>
          <p className="text-sm text-[#C60000]">
            At least provide one social link.
          </p>
          <div className="mt-4 flex flex-col gap-4">
            {SOCIAL_LINKS.map(({ name, icon, field }) => (
              <div key={field} className="grid grid-cols-12 items-center gap-3">
                <div className="col-span-4 flex items-center gap-2">
                  <Image
                    src={icon}
                    width={40}
                    height={40}
                    alt={name}
                    className="h-10 w-10"
                  />
                  <p>{name}</p>
                </div>
                <div className="col-span-8 flex items-center gap-3">
                  <input
                    type="text"
                    placeholder="Username"
                    className={INPUT_CLASSES}
                    {...register(`${field}.username`)}
                  />
                  <ToggleSwitch
                    isPublic={watch(`${field}.isPublic`)}
                    onChange={(value) => setValue(`${field}.isPublic`, value)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            className="h-10 rounded-lg bg-primary/30 px-5 text-lg text-white hover:bg-primary/50"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="h-10 rounded-lg bg-primary px-3 text-lg text-white hover:bg-primary/90"
            disabled={isLoading}
          >
            Save Changes {isLoading && <Spinner className="ml-2" />}
          </button>
        </div>
      </form>

      <button
        className="absolute right-2 top-2 md:right-6 md:top-6"
        onClick={closeModal}
      >
        <Cross1Icon width={24} height={24} />
      </button>
    </div>
  </Modal>
);
