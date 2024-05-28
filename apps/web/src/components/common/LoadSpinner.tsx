import { motion } from "framer-motion";
import { clsx } from "clsx";

export const LoadSpinner = ({
  width,
  height,
  color = "primary",
  backgroundColor = "semidark",
}: {
  width: number;
  height: number;
  color?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "foreground"
    | "dark"
    | "semidark";
  backgroundColor?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "foreground"
    | "dark"
    | "semidark";
}) => {
  return (
    <div className={"relative"} style={{ width: width, height: height }}>
      <motion.span
        className={clsx(
          "absolute left-0 top-0 box-border block rounded-[50%] border-[7px] border-solid",
          {
            "border-t-left-accent": color === "primary",
            "border-t-middle-accent": color === "secondary",
            "border-t-right-accent": color === "tertiary",
            "border-t-foreground": color === "foreground",
            "border-t-bg-dark": color === "dark",
            "border-t-[#252525]": color === "semidark",
            "border-left-accent": backgroundColor === "primary",
            "border-middle-accent": backgroundColor === "secondary",
            "border-right-accent": backgroundColor === "tertiary",
            "border-foreground": backgroundColor === "foreground",
            "border-bg-dark": backgroundColor === "dark",
            "border-[#252525]": backgroundColor === "semidark",
          }
        )}
        style={{ width: width, height: height }}
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          ease: "easeInOut",
          duration: 1,
        }}
      />
    </div>
  );
};
