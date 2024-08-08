import { Dialog } from "@radix-ui/themes";
import { CountdownTimer } from "@/components/common/CountdownTimer";
import { globalConfigAtom } from "@/contexts/atoms";
import { useSendEmail } from "@/db/react-query-hooks";
import { getTime } from "date-fns";
import { useAtomValue } from "jotai";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { Cross1Icon } from "@radix-ui/react-icons";

interface IFormInput {
  name: string;
  email: string;
}
export const MintRegisterModal = () => {
  const globalConfig = useAtomValue(globalConfigAtom);
  const emailSentMutation = useSendEmail({
    onSuccess: () => {
      console.log("Email Send to database");
    },
    onMutate: () => {
      console.log("Sending Email");
    },
    onError: (error) => {
      console.error("Error sending Email", error);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    return emailSentMutation.mutate({
      name: data.name,
      email: data.email,
    });
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <button className="cursor-pointer text-xs font-semibold text-primary underline hover:no-underline">
          Register for the event
        </button>
      </Dialog.Trigger>

      <Dialog.Content className="relative !m-0 !max-w-[480px] !rounded-md !p-0">
        <div className="bg-secondary/80 p-6 text-black backdrop-blur-xl">
          <Dialog.Description className="mb-4 text-5xl font-semibold tracking-wider">
            Minting Starts In
          </Dialog.Description>
          <div className="pb-8 pt-3">
            <CountdownTimer
              initialTime={getTime(globalConfig.nft_mint_start_date)}
            />
          </div>

          <div className="">
            <div className="mb-4">
              <h2 className=" text-xl font-semibold leading-none">
                Subscribe for MINT Event
              </h2>
              <p className="text-xs font-medium text-gray-400">
                We will notify you before 12 hours of event being started.
              </p>
              <p className="mt-2 text-xs font-medium text-gray-600">
                Learn more about TileVille NFTs{" "}
                <Link
                  href="/faq#tileville-builder-nfts"
                  className="text-primary underline hover:no-underline"
                >
                  here
                </Link>{" "}
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-2 gap-x-3 gap-y-3">
                <div className="col-span-2">
                  <label htmlFor="email" className="block">
                    Name
                    <span className="text-sm text-red-500">*</span>
                  </label>

                  <div>
                    <input
                      type="text"
                      className="border-primary-30 min-h-10 h-10 w-full rounded-md border bg-transparent px-2 font-medium outline-none placeholder:text-primary/30"
                      id="text"
                      placeholder="Enter Your name Here..."
                      {...register("name", {
                        required: true,
                      })}
                    />
                    <span
                      className={`${
                        errors.email ? "opacity-100" : ""
                      } mt-1 block text-xs text-red-500 opacity-0 transition-opacity`}
                    >
                      Name is required..
                    </span>
                  </div>
                </div>

                <div className="col-span-2">
                  <label htmlFor="email" className="block">
                    Email
                    <span className="text-sm text-red-500">*</span>
                  </label>

                  <div>
                    <input
                      type="email"
                      className="border-primary-30 min-h-10 h-10 w-full rounded-md border bg-transparent px-2 font-medium outline-none placeholder:text-primary/30"
                      id="email"
                      placeholder="Enter Your Email Here..."
                      {...register("email", {
                        required: true,
                      })}
                    />
                    <span
                      className={`${
                        errors.email ? "opacity-100" : ""
                      } mt-1 block text-xs text-red-500 opacity-0 transition-opacity`}
                    >
                      Email is required..
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 text-right">
                <Dialog.Close>
                  <button className="rounded-md border-primary bg-primary/30 px-[15px] py-2 text-xs font-medium hover:bg-primary/50 focus-visible:outline-none">
                    Cancel
                  </button>
                </Dialog.Close>

                <button className="rounded-md border-2 border-primary bg-primary bg-opacity-30 px-[15px] py-2 text-center text-xs font-medium leading-none text-white hover:shadow-[0_0_8px_hsl(var(--primary))]">
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>

        <Dialog.Close>
          <button className="absolute right-4 top-4">
            <Cross1Icon />
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Root>
  );
};
