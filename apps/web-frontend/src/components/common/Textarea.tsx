import { ReactNode, useState } from "react";
import { clsx } from "clsx";
import { AnimatePresence, motion } from "framer-motion";

export const Textarea = ({
  value,
  setValue,
  startContent,
  placeholder,
  className,
  isInvalid = false,
  invalidMessage = "Error",
  isRequired,
  title,
  titleColor = "left-accent",
  emptyFieldCheck = true,
}: {
  value: string;
  setValue: (value: string) => void;
  startContent?: ReactNode;
  placeholder?: string;
  className?: string;
  title?: string;
  titleColor?: "left-accent" | "foreground";
  isInvalid?: boolean;
  invalidMessage?: string;
  isRequired?: boolean;
  emptyFieldCheck?: boolean;
}) => {
  const [isTouched, setIsTouched] = useState<boolean>(false);

  if (emptyFieldCheck && !isInvalid)
    if (isRequired && isTouched)
      if (!value) {
        isInvalid = true;
        invalidMessage = "Please fill out this field";
      }

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {title && (
        <span
          className={clsx("font-plexsans text-main font-medium uppercase", {
            "text-left-accent": titleColor === "left-accent",
            "text-foreground": titleColor === "foreground",
          })}
        >
          {title}
          {isRequired && "*"}
        </span>
      )}
      <div
        className={clsx(
          `bg-bg-dark group flex h-full flex-row gap-2 rounded-[5px] border p-2`,
          {
            "hover:border-left-accent": !isInvalid,
            "border-[#FF0000] hover:border-[#FF00009C]": isInvalid,
          }
        )}
      >
        {startContent}
        <textarea
          className={
            "bg-bg-dark placeholder:font-plexsans placeholder:text-main group-hover:focus:text-left-accent group-hover:focus:placeholder:text-left-accent/80 w-full appearance-none placeholder:opacity-50 focus:border-none focus:outline-none"
          }
          placeholder={placeholder}
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
          }}
          required={isRequired}
          onClick={isTouched ? undefined : () => setIsTouched(true)}
        />
      </div>
      <AnimatePresence>
        {isInvalid && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", duration: 0.8, bounce: 0 }}
            className={"flex w-full flex-row gap-2"}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="7"
                cy="7"
                r="6"
                fill="#FF0000"
                stroke="#FF0000"
                strokeWidth="0.500035"
              />
              <path
                d="M6.71858 8.69036L6.29858 5.10236V2.71436H7.71458V5.10236L7.31858 8.69036H6.71858ZM7.01858 11.2344C6.71458 11.2344 6.49058 11.1624 6.34658 11.0184C6.21058 10.8664 6.14258 10.6744 6.14258 10.4424V10.2384C6.14258 10.0064 6.21058 9.81836 6.34658 9.67436C6.49058 9.52236 6.71458 9.44636 7.01858 9.44636C7.32258 9.44636 7.54258 9.52236 7.67858 9.67436C7.82258 9.81836 7.89458 10.0064 7.89458 10.2384V10.4424C7.89458 10.6744 7.82258 10.8664 7.67858 11.0184C7.54258 11.1624 7.32258 11.2344 7.01858 11.2344Z"
                fill="#F9F8F4"
              />
            </svg>
            <span className={"font-plexsans text-[14px]/[14px] text-[#FF0000]"}>
              {invalidMessage}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
