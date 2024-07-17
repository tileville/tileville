import { CountdownTimer } from "@/components/common/CountdownTimer";
import { useSendEmail } from "@/db/react-query-hooks";
import { getTime } from "date-fns";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface IFormInput {
  name: string;
  email: string;
}

export const MarketplaceOverlay = () => {
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
    <div className="absolute inset-0 flex flex-col items-center justify-start backdrop-blur-sm">
      <div className="fade-slide-in mt-40 rounded-md bg-secondary/80 p-6 text-black backdrop-blur-xl">
        <h2 className="mb-4 text-5xl font-semibold tracking-wider">
          Minting Starts In
        </h2>
        <div className="pb-8 pt-3">
          <CountdownTimer initialTime={getTime("2024-07-23")} />
        </div>

        <div className="">
          <div className="mb-4">
            <h2 className=" text-xl font-semibold leading-none">
              Subscribe for MINT Event
            </h2>
            <p className="text-xs font-medium text-gray-400">
              We will notify you before 12 hours of event being started.
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

            <div className="pt-4 text-right">
              <button className="rounded-md border-2 border-primary bg-primary bg-opacity-30 px-[15px] py-2 text-center leading-none text-white hover:shadow-[0_0_8px_hsl(var(--primary))]">
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
