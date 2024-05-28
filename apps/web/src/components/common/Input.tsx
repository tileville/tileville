import { clsx } from "clsx";
import { HTMLInputTypeAttribute, ReactNode, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export const Input = ({
  value,
  setValue,
  placeholder,
  startContent,
  endContent,
  isClearable = true,
  type = "text",
  inputMode = "text",
  isBordered = true,
  isReadonly = false,
  isInvalid = false,
  invalidMessage = "Error",
  isRequired,
  title,
  titleColor = "left-accent",
  emptyFieldCheck = true,
  onInvalid,
}: {
  value: any;
  setValue?: (value: any) => void;
  placeholder?: string;
  startContent?: ReactNode;
  endContent?: ReactNode;
  isClearable?: boolean;
  type?: HTMLInputTypeAttribute;
  inputMode?:
    | "email"
    | "search"
    | "tel"
    | "text"
    | "url"
    | "none"
    | "numeric"
    | "decimal"
    | undefined;
  isBordered?: boolean;
  isReadonly?: boolean;
  isInvalid?: boolean;
  invalidMessage?: string;
  isRequired?: boolean;
  title?: string;
  titleColor?: "left-accent" | "foreground";
  emptyFieldCheck?: boolean;
  onInvalid?: () => void;
}) => {
  const [isTouched, setIsTouched] = useState<boolean>(false);

  if (emptyFieldCheck && !isInvalid)
    if (isRequired && isTouched)
      if (!value) {
        isInvalid = true;
        invalidMessage = "Please fill out this field";
      }

  return (
    <div className={"flex flex-col gap-2"}>
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
          "bg-bg-dark group flex flex-row gap-2 rounded-[5px] p-2",
          {
            border: isBordered,
            "hover:border-left-accent": isBordered && !isReadonly && !isInvalid,
            "border-[#FF0000] hover:border-[#FF00009C]": isInvalid,
          }
        )}
      >
        {startContent}
        <input
          type={type}
          inputMode={inputMode}
          placeholder={placeholder}
          className={clsx(
            "bg-bg-dark placeholder:font-plexsans placeholder:text-main w-full appearance-none placeholder:opacity-50 focus:border-none focus:outline-none",
            {
              "group-hover:focus:text-left-accent group-hover:focus:placeholder:text-left-accent/80":
                !isReadonly,
              "cursor-default": isReadonly,
            }
          )}
          value={value}
          onChange={(event) => {
            setValue?.(
              type === "number"
                ? parseInt(event.target.value)
                  ? parseInt(event.target.value)
                  : 0
                : event.target.value
            );
          }}
          readOnly={isReadonly}
          required={isRequired}
          aria-invalid={isInvalid}
          onClick={isTouched ? undefined : () => setIsTouched(true)}
          onInvalid={onInvalid}
        />
        {isClearable && !isReadonly && (
          <div
            className={clsx("flex items-center justify-center", {
              "visible cursor-pointer opacity-60 transition-opacity ease-in-out hover:opacity-100":
                value && value.length !== 0,
              invisible: !value || value.length === 0,
            })}
            onClick={() => setValue && setValue(type === "number" ? 0 : "")}
          >
            <svg
              aria-hidden="true"
              focusable="false"
              role="presentation"
              viewBox="0 0 24 24"
              width={24}
              height={24}
            >
              <path
                d="M12 2a10 10 0 1010 10A10.016 10.016 0 0012 2zm3.36 12.3a.754.754 0 010 1.06.748.748 0 01-1.06 0l-2.3-2.3-2.3 2.3a.748.748 0 01-1.06 0 .754.754 0 010-1.06l2.3-2.3-2.3-2.3A.75.75 0 019.7 8.64l2.3 2.3 2.3-2.3a.75.75 0 011.06 1.06l-2.3 2.3z"
                fill="#F9F8F4"
                className={clsx({ "group-hover:fill-left-accent": !isInvalid })}
              ></path>
            </svg>
          </div>
        )}
        {endContent}
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
