import { Dialog } from "@radix-ui/themes";
import { CopyIcon, Cross1Icon } from "@radix-ui/react-icons";
import Image from "next/image";
import { copyToClipBoard, handleSocialShare } from "@/lib/helpers";

type ChallengeCreatedModalProps = {
  open: boolean;
  onClose: () => void;
  inviteLink: string;
  challengeName: string;
  entryFee: number;
};

export const ChallengeCreatedModal = ({
  open,
  onClose,
  inviteLink,
  challengeName,
  entryFee,
}: ChallengeCreatedModalProps) => {
  return (
    <Dialog.Root open={open}>
      <Dialog.Content className="relative !m-0 !max-w-[610px] !rounded-md !bg-[#A6B97B] !p-8">
        <div className="flex flex-col items-center gap-6 text-center">
          <Image
            src="/icons/party-popper.png"
            alt="Success"
            width={64}
            height={64}
          />

          <div className="flex flex-col items-center justify-center">
            <h2 className="text-[28px] font-bold">
              Challenge successfully created!
            </h2>
            <p className="mb-2 text-lg font-medium">
              Challenge name: {challengeName}
            </p>
            <p className="max-w-sm text-center text-lg text-[#5D6845]">
              Share your challenge and let the competition begin!
            </p>
          </div>

          <div className="w-full">
            <h3 className="mb-2 text-2xl font-bold">Share Invite Link</h3>
            <div className="flex items-center gap-2 rounded-lg p-2">
              <input
                type="text"
                value={inviteLink}
                readOnly
                className="min-h-[42px] flex-1 rounded-[5px] border border-[#38830A] bg-transparent px-2 text-center text-base text-black outline-none"
              />

              <button
                onClick={() =>
                  copyToClipBoard({
                    toCopyContent: inviteLink,
                    copiedType: "Invite Link",
                  })
                }
                className="flex items-center gap-2 rounded-md bg-[#38830A] px-4 py-2 text-base font-bold text-white hover:bg-[#38830A]/90"
              >
                <CopyIcon />
                Copy
              </button>
            </div>
          </div>

          <div className="w-full">
            <h3 className="mb-4 text-xl font-bold">
              Share Invite Link on Socials
            </h3>
            <div className="flex justify-center gap-3">
              <button
                onClick={() =>
                  handleSocialShare({
                    platform: "twitter",
                    inviteLink,
                    challengeName,
                    entryFee,
                  })
                }
              >
                <Image src="/icons/x.svg" width={40} height={40} alt="X" />
              </button>
              <button
                onClick={() =>
                  handleSocialShare({
                    platform: "telegram",
                    inviteLink,
                    challengeName,
                    entryFee,
                  })
                }
              >
                <Image
                  src="/icons/telegram.svg"
                  width={40}
                  height={40}
                  alt="Telegram"
                />
              </button>
            </div>
          </div>

          <p className="max-w-sm text-sm text-gray-600">
            Note: The challenges you create will be listed under the
            &quot;Created Challenges&quot; section on the PvP page.
          </p>
        </div>

        <Dialog.Close>
          <button
            onClick={onClose}
            className="absolute right-4 top-4 hover:opacity-70"
          >
            <Cross1Icon />
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Root>
  );
};
