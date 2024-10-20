import { useState, useEffect } from "react";
import { Dialog, Flex } from "@radix-ui/themes";
import { isMobile } from "react-device-detect";
import Link from "next/link";
import { AURO_WALLET_DEEP_LINK } from "@/constants";
import { useSessionStorage } from "react-use";

const MobileBanner = () => {
  const [hasSeenBanner, setHasSeenBanner] = useSessionStorage(
    "hasSeenBanner",
    false
  );
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!hasSeenBanner && isMobile) {
      setIsOpen(true);
    }
  }, [hasSeenBanner]);

  const handleClose = () => {
    setIsOpen(false);
    setHasSeenBanner(true);
  };

  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Content className="fixed inset-x-0 bottom-0 max-w-[500px] rounded-md bg-white p-4 shadow-lg dark:bg-gray-800">
        <Dialog.Title className="text-center">
          Auro Browser Required
        </Dialog.Title>
        <Dialog.Description className="text-sm md:text-base" my="2">
          This game is designed to work exclusively with the Auro Browser. To
          play, you&apos;ll need to open the game in Auro Browser.
        </Dialog.Description>
        <Flex gap="3" mt="4" justify="between">
          <Link
            href={AURO_WALLET_DEEP_LINK}
            className="h-10 rounded-full border-primary bg-primary px-5 py-2 text-sm font-medium text-white hover:bg-primary/80"
          >
            Open in Auro Browser
          </Link>
          <Dialog.Close>
            <button
              className="h-10 rounded-full border-primary bg-primary/30 px-5 py-2 text-sm font-medium hover:bg-primary/50"
              onClick={handleClose}
            >
              No, thanks
            </button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default MobileBanner;
