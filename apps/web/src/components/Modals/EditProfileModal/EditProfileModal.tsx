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

// Constants
const INPUT_PRIMARY_CLASSES =
  "border-primary min-h-10 h-[40px] w-full rounded-md border-2 bg-transparent px-2 font-medium outline-none placeholder:text-primary/30 text-base";

// Types
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

type SocialMediaFieldProps = {
  iconSrc: string;
  platform: string;
  register: UseFormRegister<IFormInput>;
  fieldName: string;
  watch: UseFormWatch<IFormInput>;
  setValue: UseFormSetValue<IFormInput>;
};

type FormFieldProps = {
  label: string;
  id: string;
  placeholder: string;
  register: UseFormRegister<IFormInput>;
  registerOptions?: object;
  error?: FieldError | undefined;
  errorMessage?: string;
  type?: string;
  required?: boolean;
};

// Component Functions
const SocialMediaField = ({
  iconSrc,
  platform,
  register,
  fieldName,
  watch,
  setValue,
}: SocialMediaFieldProps) => (
  <div className="relative grid grid-cols-12 items-center">
    <div className="col-span-12 mb-2 flex items-center gap-1 md:col-span-4 md:mb-0">
      <div>
        <Image
          className="h-[30px] w-[30px] md:h-10 md:w-10"
          src={iconSrc}
          width={40}
          height={40}
          alt={platform.toLowerCase()}
        />
      </div>
      <p>{platform}</p>
    </div>
    <div className="col-span-12 flex flex-1 items-center gap-1 md:col-span-8 md:gap-3">
      <div className="w-full">
        <input
          type="text"
          placeholder="username"
          className={INPUT_PRIMARY_CLASSES}
          {...register(`${fieldName}.username`)}
        />
      </div>
      <div className="absolute right-0 top-0 md:static">
        <ToggleSwitch
          isPublic={watch(`${fieldName}.isPublic`)}
          onChange={(value) => setValue(`${fieldName}.isPublic`, value)}
        />
      </div>
    </div>
  </div>
);

const FormField = ({
  label,
  id,
  placeholder,
  register,
  registerOptions = {},
  error,
  errorMessage,
  type = "text",
  required = false,
}: FormFieldProps) => (
  <div>
    <label htmlFor={id} className="mb-1 block">
      {label}
      {required && <span className="text-red-500">*</span>}
    </label>

    <div>
      <input
        type={type}
        className={INPUT_PRIMARY_CLASSES}
        id={id}
        placeholder={placeholder}
        {...register(id, registerOptions)}
      />
    </div>

    {error && (
      <span
        className={`${
          error ? "opacity-100" : ""
        } mt-1 block text-xs text-red-500 opacity-0 transition-opacity`}
      >
        {errorMessage || `${label} is required..`}
      </span>
    )}
  </div>
);

// Main Component
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

  const renderAvatar = () => (
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
  );

  const renderFormButtons = () => (
    <div className="ms-auto grid grid-cols-2 gap-3 pt-8">
      <button
        className="h-[40px] rounded-lg border border-primary bg-primary/30 px-5 py-1 text-lg text-white hover:bg-primary/50 md:text-xl"
        onClick={closeModal}
        type="button"
      >
        cancel
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
  );

  const renderSocialMediaFields = () => (
    <div className="mt-4 md:mt-8">
      <h3 className="text-xl font-bold">Social Media Links</h3>
      <p className="text-sm text-[#C60000]">
        at least provide us with one social link.
      </p>

      <div className="mt-6 flex flex-col gap-4 text-base md:text-xl">
        {socialMediaPlatforms.map((platform) => (
          <SocialMediaField
            key={platform.name}
            iconSrc={platform.iconSrc}
            platform={platform.name}
            register={register}
            fieldName={platform.fieldName}
            watch={watch}
            setValue={setValue}
          />
        ))}
      </div>
    </div>
  );

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
              {renderAvatar()}

              <div className="grid grid-cols-2 gap-x-3 gap-y-2 md:gap-x-8 md:gap-y-4">
                <FormField
                  label="First Name"
                  id="firstName"
                  placeholder="First Name"
                  register={register}
                  registerOptions={{ required: true }}
                  error={firstNameError}
                  required={true}
                />

                <FormField
                  label="Last Name"
                  id="lastName"
                  placeholder="Last Name"
                  register={register}
                />

                <FormField
                  label="Username"
                  id="username"
                  placeholder="Username"
                  register={register}
                  registerOptions={{ required: true }}
                  error={userNameError}
                  errorMessage={userNameErrorMsg}
                  required={true}
                />

                <FormField
                  label="Email-id"
                  id="email_address.email"
                  placeholder="Email"
                  register={register}
                  registerOptions={{
                    required: true,
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  }}
                  error={emailError}
                  errorMessage={emailErrorMsg}
                  type="email"
                  required={true}
                />
              </div>

              {renderSocialMediaFields()}
              {renderFormButtons()}
            </form>
          </div>
        </div>

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
