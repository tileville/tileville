import { Dialog, Flex } from "@radix-ui/themes";
import Link from "next/link";
import { useAtomValue } from "jotai";
import { isMobile, isTablet } from "react-device-detect";

import LottieAnimation from "./common/LottieAnimation";
import {
  ACTIVE_GAMES_URL,
  BUG_REPORT_URL,
  GAMEPLAY_NOT_ALLOWED_MESSAGES,
} from "@/constants";
import { gameplayDisallowTypeAtom } from "@/contexts/atoms";

interface GameInfoModalProps {
  open: boolean;
  handleClose: () => void;
  txnHash: string | undefined;
}

// Component for transaction-specific info items
const TransactionInfoList = ({ txnHash }: { txnHash: string | undefined }) => (
  <ul className="flex flex-col gap-y-2 divide-y divide-primary/30 text-sm md:gap-y-4 md:text-base">
    <li className="pt-3">Transaction on mina on an avg take 2 to 3 mins</li>

    <li className="pt-3">
      You can check your transaction status{" "}
      <Link
        target="_blank"
        href={`https://minascan.io/mainnet/tx/${txnHash}`}
        className="font-medium text-primary underline hover:text-primary/80"
      >
        Here
      </Link>
    </li>

    <li className="pt-3">
      Meanwhile you can go through the{" "}
      <Link href={"/guide"} className="underline">
        Game Tour
      </Link>
    </li>

    <li className="pt-3">
      You can play this game later as well from{" "}
      <Link href={ACTIVE_GAMES_URL} className="underline">
        profile section
      </Link>
    </li>

    <li className="pt-3">
      If your transaction gets succeeded and you still see this message please{" "}
      <Link target="_blank" className="underline" href={BUG_REPORT_URL}>
        report a bug
      </Link>
    </li>
  </ul>
);

export const GameInfoModal = ({
  open,
  handleClose,
  txnHash,
}: GameInfoModalProps) => {
  const gameplayDisallowType = useAtomValue(gameplayDisallowTypeAtom);
  const content = GAMEPLAY_NOT_ALLOWED_MESSAGES[gameplayDisallowType];

  // Determine animation container size based on device
  const animationSizeClass =
    isMobile || isTablet ? "max-w-[150px]" : "max-w-[300px]";

  return (
    <Dialog.Root open={open}>
      <Dialog.Content style={{ maxWidth: 500 }} className="rounded-md">
        {/* Modal Title */}
        <Dialog.Title className="text-center">{content.title}</Dialog.Title>

        {/* Animation */}
        <div className={`mx-auto ${animationSizeClass}`}>
          <LottieAnimation animationData={content.animation} />
        </div>

        {/* Description */}
        <Dialog.Description className="text-sm md:text-base" my="2">
          {content.description}
        </Dialog.Description>

        {/* Conditional Transaction Info */}
        {gameplayDisallowType === "TRANSACTION_PENDING" && (
          <TransactionInfoList txnHash={txnHash} />
        )}

        {/* Actions */}
        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <button
              className="h-10 rounded-full border-primary bg-primary/30 px-5 py-2 text-sm font-medium hover:bg-primary/50"
              onClick={handleClose}
            >
              Cancel
            </button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};
