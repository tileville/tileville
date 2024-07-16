import { Dialog, Flex } from "@radix-ui/themes";
import Link from "next/link";
import LottieAnimation from "./common/LottieAnimation";
import Failed from "../../public/lotties/failed.json";

import { BUG_REPORT_URL, GAMEPLAY_NOT_ALLOWED_MESSAGES } from "@/constants";
import { useAtomValue } from "jotai";
import { gameplayDisallowTypeAtom } from "@/contexts/atoms";

export const GameInfoModal = ({
  open,
  handleClose,
  txnHash,
  txnStatus,
}: {
  open: boolean;
  handleClose: () => void;
  txnHash: string | undefined;
  txnStatus: string | undefined;
}) => {
  console.log("txnHash", txnHash);
  console.log("txnStatus", txnStatus);
  const gameplayDisallowType = useAtomValue(gameplayDisallowTypeAtom);
  console.log("gameplay disallow type", gameplayDisallowType);
  const content = GAMEPLAY_NOT_ALLOWED_MESSAGES[gameplayDisallowType];
  return (
    <Dialog.Root open={open}>
      <Dialog.Content style={{ maxWidth: 500 }} className="rounded-md">
        {false ? (
          <>
            <Dialog.Title className="text-center">
              Transaction Failed
            </Dialog.Title>

            <Dialog.Description size="2" mb="4">
              <div className="mx-auto max-w-[300px]">
                <LottieAnimation animationData={Failed} />
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-2xl font-semibold">Transaction Failed</h3>
                <p>Please Try Again</p>
              </div>
            </Dialog.Description>
          </>
        ) : (
          <>
            <Dialog.Title className="text-center">{content.title}</Dialog.Title>

            <Dialog.Description size="2" mb="4">
              <div className="mx-auto max-w-[300px]">
                <LottieAnimation animationData={content.animation} />
              </div>
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
                    <Link href="/profile" className="underline">
                      profile section
                    </Link>
                  </li>

                  <li className="pt-3">
                    If your transaction gets succeeded and you still see this
                    message please{" "}
                    <Link
                      target="_blank"
                      className="underline"
                      href={BUG_REPORT_URL}
                    >
                      report a bug
                    </Link>
                  </li>
                </ul>
              )}

              {gameplayDisallowType === "GAME_ALREADY_PLAYED" && (
                <p>{content.description}</p>
              )}
            </Dialog.Description>
          </>
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
