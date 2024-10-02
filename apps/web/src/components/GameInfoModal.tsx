import { Dialog, Flex } from "@radix-ui/themes";
import Link from "next/link";
import LottieAnimation from "./common/LottieAnimation";

import {
  ACTIVE_GAMES_URL,
  BUG_REPORT_URL,
  GAMEPLAY_NOT_ALLOWED_MESSAGES,
} from "@/constants";
import { useAtomValue } from "jotai";
import { gameplayDisallowTypeAtom } from "@/contexts/atoms";
// import DoneLottie from "../../public/lotties/doneLottie.json";

export const GameInfoModal = ({
  open,
  handleClose,
  txnHash,
}: {
  open: boolean;
  handleClose: () => void;
  txnHash: string | undefined;
}) => {
  const gameplayDisallowType = useAtomValue(gameplayDisallowTypeAtom);
  const content = GAMEPLAY_NOT_ALLOWED_MESSAGES[gameplayDisallowType];

  return (
    <Dialog.Root open={open}>
      <Dialog.Content style={{ maxWidth: 500 }} className="rounded-md">
        <Dialog.Title className="text-center">{content.title}</Dialog.Title>
        <div className="mx-auto max-w-[300px]">
          <LottieAnimation animationData={content.animation} />
        </div>
        <Dialog.Description my="2">{content.description}</Dialog.Description>
        {gameplayDisallowType === "TRANSACTION_PENDING" && (
          <ul className="flex flex-col gap-y-4 divide-y divide-primary/30">
            <li className="pt-3">
              Transaction on mina on an avg take 2 to 3 mins
            </li>

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
              If your transaction gets succeeded and you still see this message
              please{" "}
              <Link target="_blank" className="underline" href={BUG_REPORT_URL}>
                report a bug
              </Link>
            </li>
          </ul>
        )}
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
