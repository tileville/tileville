import Image from "next/image";
import { motion } from "framer-motion";

export default function NetworkPickerCard({
  text,
  image,
  toggle,
  expanded,
  onClick,
}: {
  text: string;
  image: any;
  toggle?: boolean;
  expanded?: boolean;
  onClick?: () => void;
}) {
  return (
    <div
      className={
        "bg-left-accent text-header-menu text-bg-dark hover:bg-bg-dark hover:text-left-accent group relative z-10 flex cursor-pointer items-center justify-center gap-1 md:gap-[10px] rounded px-2 py-1"
      }
      onClick={() => onClick?.()}
    >
      <Image
        src={image}
        alt=""
        width={26}
        height={26}
        className={"h-4 w-4  rounded-[5px] md:h-6 md:w-6"}
      />
      {text}
      {toggle && (
        <motion.svg
          width="16"
          height="10"
          viewBox="0 0 16 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          variants={{
            open: { rotate: 180 },
            closed: { rotate: 0 },
          }}
          transition={{ type: "spring", duration: 0.4, bounce: 0 }}
          animate={expanded ? "open" : "closed"}
          className="flex-shrink-0 w-3 h-3 md:w-4 md:h-4"
        >
          <path
            d="M15 1.5L8 8.5L1 1.5"
            stroke="#252525"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={"stroke-bg-dark group-hover:stroke-left-accent"}
          />
        </motion.svg>
      )}
    </div>
  );
}
