import { CheckIcon, Cross2Icon } from "@radix-ui/react-icons";
import { Spinner } from "./common/Spinner"; // Assuming you have a Spinner component

export const StepProgressBar = ({
  currentStep,
  message,
  error,
}: {
  currentStep: number;
  message: string;
  error: string | null;
}) => {
  const steps = [
    { step: 1, label: "Start" },
    { step: 2, label: "Upload Image" },
    { step: 3, label: "Load Environment" },
    { step: 4, label: "Reserve Name" },
    { step: 5, label: "Send Transaction" },
    { step: 6, label: "Mint NFT" },
  ];

  return (
    <div className="w-full">
      <div className="flex justify-between">
        {steps.map(({ step, label }) => (
          <div key={step} className="flex flex-col items-center">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                step < currentStep + 1
                  ? "border-primary bg-primary text-white"
                  : step === currentStep + 1
                  ? "border-primary bg-primary text-white"
                  : "border-gray-300 bg-white"
              }`}
            >
              {step < currentStep + 1 && <CheckIcon className="h-5 w-5" />}
              {step === currentStep + 1 && !error && (
                <Spinner className="h-5 w-5 text-primary" />
              )}
              {step === currentStep + 1 && error && (
                <Cross2Icon className="h-5 w-5 text-red-500" />
              )}
              {step > currentStep + 1 && (
                <span className="text-sm font-medium">{step}</span>
              )}
            </div>
            <span className="mt-2 text-xs">{label}</span>
          </div>
        ))}
      </div>
      <div
        className={`mt-4 text-center text-sm font-medium ${
          error ? "text-red-500" : "text-black"
        }`}
      >
        {message}
      </div>
    </div>
  );
};
