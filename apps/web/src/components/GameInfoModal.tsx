import { Dialog, Flex } from "@radix-ui/themes";
import LottieAnimation from "./common/LottieAnimation";
import PersonWaiting from "../../public/lotties/personWaiting.json";
import Link from "next/link";
import { useFetchTransactions } from "@/db/react-query-hooks";
import { useNetworkStore } from "@/lib/stores/network";

export const GameInfoModal = ({
  open,
  handleClose,
  message,
  title,
}: {
  open: boolean;
  handleClose: () => void;
  message: string;
  title: string;
}) => {
  const networkStore = useNetworkStore();
  console.log("pending txnasdfsdfs", networkStore.pendingL2Transactions);
  return (
    <Dialog.Root open={open}>
      <Dialog.Content style={{ maxWidth: 800 }} className=" backdrop-blur-2xl">
        <Dialog.Title className="text-center">{title}</Dialog.Title>
        <div className="mx-auto max-w-[200px]">
          <LottieAnimation animationData={PersonWaiting} />
        </div>
        <Dialog.Description size="2" mb="4">
          {message}

          <p className="font-medium">
            Generally it takes almost 2 to 3 mins please wait, <br />
            Till Then you can take a tour to game{" "}
            <Link href={"/guide"} className="underline">
              Here
            </Link>
            <br />
            <br />
          </p>
          <div>
            <p className="text-lg font-semibold leading-snug">
              You can also Check your current Transaction{" "}
              <Link href={"/guide"} target="_blank" className="underline">
                here
              </Link>
            </p>
            <p className="text-sm">
              Don&apos;t Worry! If you don&apos;t Play Now! you can play the
              game from the{" "}
              <Link href="/profile" className="underline">
                Active Games
              </Link>{" "}
              in the{" "}
              <Link href="/profile" className="underline">
                profile
              </Link>
            </p>
          </div>

          <p className="mt-3">
            NOTE:- If your transaction gets succeed from your Wallet but still
            you are not able to play the game. You can reach out to us{" "}
            <Link
              target="_blank"
              className="underline"
              href={"https://t.me/tilevilleBugs"}
            >
              Here
            </Link>
          </p>
        </Dialog.Description>
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
