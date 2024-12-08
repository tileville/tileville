import { Dialog } from "@radix-ui/themes";
import { Cross1Icon } from "@radix-ui/react-icons";
import Image from "next/image";
import { copyToClipBoard } from "@/lib/helpers";

type ChallengeCreatedModalProps = {
  open: boolean;
  onClose: () => void;
  inviteLink: string;
};

export const ChallengeCreatedModal = ({
  open,
  onClose,
  inviteLink,
}: ChallengeCreatedModalProps) => {
  const handleShare = (platform: string) => {
    let shareUrl = "";
    const text = "Join my TileVille challenge!";

    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          text
        )}&url=${encodeURIComponent(inviteLink)}`;
        break;
      case "telegram":
        shareUrl = `https://t.me/share/url?url=${encodeURIComponent(
          inviteLink
        )}&text=${encodeURIComponent(text)}`;
        break;
      case "discord":
        shareUrl = "https://discord.com/";
        break;
    }

    window.open(shareUrl, "_blank");
  };

  return (
    <Dialog.Root open={open}>
      <Dialog.Content className="relative !m-0 !max-w-[500px] !rounded-md !bg-[#C6D4A8] !p-8">
        <div className="flex flex-col items-center gap-6 text-center">
          {/* <Image
            src="/icons/party-popper.svg"
            alt="Success"
            width={64}
            height={64}
          /> */}

          <div>
            <h2 className="mb-2 text-2xl font-bold">
              Challenge successfully created!
            </h2>
            <p className="text-gray-700">
              Share your challenge and let the competition begin!
            </p>
          </div>

          <div className="w-full">
            <h3 className="mb-2 text-lg font-semibold">Share Invite Link</h3>
            <div className="flex items-center gap-2 rounded-lg bg-white/20 p-2">
              <input
                type="text"
                value={inviteLink}
                readOnly
                className="flex-1 bg-transparent px-2"
              />
              <button
                onClick={() =>
                  copyToClipBoard({
                    toCopyContent: inviteLink,
                    copiedType: "Invite Link",
                  })
                }
                className="rounded-md bg-[#38830A] px-4 py-2 text-white hover:bg-[#38830A]/90"
              >
                Copy
              </button>
            </div>
          </div>

          <div className="w-full">
            <h3 className="mb-4 text-lg font-semibold">
              Share Invite Link on Socials
            </h3>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => handleShare("twitter")}
                className="rounded-full bg-black p-3 hover:opacity-90"
              >
                <Image src="/icons/x.svg" width={24} height={24} alt="X" />
              </button>
              <button
                onClick={() => handleShare("telegram")}
                className="rounded-full bg-[#229ED9] p-3 hover:opacity-90"
              >
                <Image
                  src="/icons/telegram.svg"
                  width={24}
                  height={24}
                  alt="Telegram"
                />
              </button>
              <button
                onClick={() => handleShare("discord")}
                className="rounded-full bg-[#5865F2] p-3 hover:opacity-90"
              >
                <Image
                  src="/icons/discord.svg"
                  width={24}
                  height={24}
                  alt="Discord"
                />
              </button>
            </div>
          </div>

          <p className="text-sm text-gray-600">
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
