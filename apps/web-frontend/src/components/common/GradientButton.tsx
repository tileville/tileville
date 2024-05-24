import Link from "next/link";
import { motion } from "framer-motion";
import { ReactNode } from "react";
import { clsx } from "clsx";

export const GradientButton = ({
  title,
  icon,
  onClick,
  asLink,
  href,
  className,
}: {
  title: string;
  icon: ReactNode;
  onClick?: () => void;
  asLink?: boolean;
  href?: string;
  className?: string;
}) => {
  return (
    <motion.div
      className={clsx(
        "border-left-accent group relative flex flex-row justify-between rounded-[5px] border",
        className
      )}
      whileHover={"visible"}
    >
      {asLink ? (
        <Link
          className={
            "text-left-accent group-hover:text-dark-buttons-text m-auto mt-1 w-full p-4 uppercase lg:pt-5 xl:mt-0.5"
          }
          href={href ? href : "#"}
          onClick={onClick ? onClick : undefined}
        >
          {title}
        </Link>
      ) : (
        <button
          className={
            "text-left-accent group-hover:text-dark-buttons-text m-auto mt-2 w-full p-4 uppercase lg:pt-5 xl:mt-0.5"
          }
          onClick={onClick ? onClick : undefined}
        >
          {title}
        </button>
      )}
      <div
        className={
          "bg-left-accent group-hover:bg-bg-dark flex flex-col items-center justify-center rounded-[5px] p-4"
        }
      >
        {icon}
      </div>
      <motion.div
        className={"absolute left-0 -z-10 h-full"}
        variants={{
          visible: {
            backgroundColor: "#D2FF00",
            width: "100%",
          },
        }}
        transition={{ duration: 0.75 }}
      />
    </motion.div>
  );
};
