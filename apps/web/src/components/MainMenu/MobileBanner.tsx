import { useState, useEffect } from "react";
import { Flex } from "@radix-ui/themes";
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
    isOpen && (
      <div className="fixed inset-x-0 bottom-0 !rounded-none bg-white !px-2 !py-1 shadow-lg dark:bg-gray-800">
        <Flex gap="6" justify="center">
          <Link
            href={AURO_WALLET_DEEP_LINK}
            className="rounded-full border-primary bg-primary px-3 py-1 text-xs font-medium text-white hover:bg-primary/80"
          >
            Open in Auro Browser
          </Link>
          <button
            className="rounded-full border-primary bg-primary/30 px-3 py-1 text-xs font-medium hover:bg-primary/50"
            onClick={handleClose}
          >
            No, thanks
          </button>
        </Flex>
      </div>
    )
  );
};

export default MobileBanner;
