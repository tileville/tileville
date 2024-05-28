import { clsx } from "clsx";
import { motion } from "framer-motion";
import Link from "next/link";
import { ReactNode } from "react";

export const Button = ({
  label,
  onClick,
  isFilled = true,
  isBordered = true,
  asLink,
  href = "#",
  className,
  isReadonly = false,
  startContent,
  endContent,
  color = "primary",
}: {
  label: string;
  onClick?: () => void;
  isFilled?: boolean;
  isBordered?: boolean;
  asLink?: boolean;
  href?: string;
  className?: string;
  isReadonly?: boolean;
  startContent?: ReactNode;
  endContent?: ReactNode;
  color?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "foreground"
    | "dark"
    | "semidark";
}) => {
  if (asLink)
    return (
      <motion.div
        className={clsx(
          "flex w-full flex-row items-center justify-center gap-2 rounded-[5px] py-2 text-center text-[16px]/[16px] font-medium lg:text-[20px]/[20px]",
          {
            "hover:opacity-80": !isFilled && !isReadonly,
            "cursor-default": isReadonly,
            "cursor-pointer": !isReadonly,

            "bg-left-accent text-dark-buttons-text":
              color == "primary" && isFilled,
            "hover:bg-bg-dark hover:text-left-accent":
              color == "primary" && isFilled && !isReadonly,
            "text-left-accent": color == "primary" && !isFilled,
            "border-left-accent border": color == "primary" && isBordered,

            "bg-middle-accent text-dark-buttons-text":
              color == "secondary" && isFilled,
            "hover:bg-bg-dark hover:text-middle-accent":
              color == "secondary" && isFilled && !isReadonly,
            "text-middle-accent": color == "secondary" && !isFilled,
            "border-middle-accent border": color == "secondary" && isBordered,

            "bg-right-accent text-dark-buttons-text":
              color == "tertiary" && isFilled,
            "hover:bg-bg-dark hover:text-right-accent":
              color == "tertiary" && isFilled && !isReadonly,
            "text-right-accent": color == "tertiary" && !isFilled,
            "border-right-accent border": color == "tertiary" && isBordered,

            "text-dark-buttons-text bg-foreground":
              color == "foreground" && isFilled,
            "hover:bg-bg-dark hover:text-foreground":
              (color == "foreground" ||
                color == "dark" ||
                color == "semidark") &&
              isFilled &&
              !isReadonly,
            "text-foreground-accent":
              (color == "foreground" ||
                color == "dark" ||
                color == "semidark") &&
              !isFilled,
            "border border-foreground":
              (color == "foreground" ||
                color == "dark" ||
                color == "semidark") &&
              isBordered,

            "bg-bg-dark text-foreground": color == "dark" && isFilled,

            "bg-[#252525] text-foreground": color == "semidark" && isFilled,
          },
          className
        )}
        onClick={!isReadonly ? onClick : undefined}
        whileTap={{ scale: 0.9 }}
      >
        {(startContent || endContent) && (
          <div className={"flex flex-row items-center justify-end"}>
            {startContent}
          </div>
        )}
        <Link href={!isReadonly ? href : "#"} className={"w-full min-w-[40%]"}>
          {label}
        </Link>
        {(startContent || endContent) && (
          <div className={"flex flex-row items-center justify-end"}>
            {endContent}
          </div>
        )}
      </motion.div>
    );
  else
    return (
      <motion.div
        className={clsx(
          "flex w-full flex-row items-center justify-center gap-2 rounded-[5px] py-2 text-center text-[16px]/[16px] font-medium lg:text-[20px]/[20px]",
          {
            "hover:opacity-80": !isFilled && !isReadonly,
            "cursor-default": isReadonly,
            "cursor-pointer": !isReadonly,

            "bg-left-accent text-dark-buttons-text":
              color == "primary" && isFilled,
            "hover:bg-bg-dark hover:text-left-accent":
              color == "primary" && isFilled && !isReadonly,
            "text-left-accent": color == "primary" && !isFilled,
            "border-left-accent border": color == "primary" && isBordered,

            "bg-middle-accent text-dark-buttons-text":
              color == "secondary" && isFilled,
            "hover:bg-bg-dark hover:text-middle-accent":
              color == "secondary" && isFilled && !isReadonly,
            "text-middle-accent": color == "secondary" && !isFilled,
            "border-middle-accent border": color == "secondary" && isBordered,

            "bg-right-accent text-dark-buttons-text":
              color == "tertiary" && isFilled,
            "hover:bg-bg-dark hover:text-right-accent":
              color == "tertiary" && isFilled && !isReadonly,
            "text-right-accent": color == "tertiary" && !isFilled,
            "border-right-accent border": color == "tertiary" && isBordered,

            "text-dark-buttons-text bg-foreground":
              color == "foreground" && isFilled,
            "hover:bg-bg-dark hover:text-foreground":
              (color == "foreground" ||
                color == "dark" ||
                color == "semidark") &&
              isFilled &&
              !isReadonly,
            "text-foreground-accent":
              (color == "foreground" ||
                color == "dark" ||
                color == "semidark") &&
              !isFilled,
            "border border-foreground":
              (color == "foreground" ||
                color == "dark" ||
                color == "semidark") &&
              isBordered,

            "bg-bg-dark text-foreground": color == "dark" && isFilled,

            "bg-[#252525] text-foreground": color == "semidark" && isFilled,
          },
          className
        )}
        onClick={!isReadonly ? onClick : undefined}
        whileTap={{ scale: 0.9 }}
      >
        {(startContent || endContent) && (
          <div className={"flex flex-row items-center justify-end"}>
            {startContent}
          </div>
        )}
        <button className={"min-w-[40%]"}>{label}</button>
        {(startContent || endContent) && (
          <div className={"flex flex-row items-center justify-end"}>
            {endContent}
          </div>
        )}
      </motion.div>
    );
};
