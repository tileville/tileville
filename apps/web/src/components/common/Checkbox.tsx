import { clsx } from "clsx";
import { motion } from "framer-motion";

export const Checkbox = ({
  isSelected,
  setIsSelected,
  isInvalid,
  isReadonly,
}: {
  isSelected: boolean;
  setIsSelected?: (selected: boolean) => void;
  isInvalid?: boolean;
  isReadonly?: boolean;
}) => {
  return (
    <motion.div
      className={clsx("rounded-[5px] border p-1", {
        "hover:border-[#FF00009C]": isInvalid && !isSelected,
        "border-[#FF0000]": isInvalid,
        "cursor-pointer hover:opacity-80": !isReadonly,
      })}
      onClick={
        !isReadonly && setIsSelected
          ? () => setIsSelected(!isSelected)
          : undefined
      }
      animate={
        isSelected
          ? { borderColor: "#D2FF00", backgroundColor: "#D2FF00" }
          : { borderColor: "#F9F8F4", backgroundColor: "#212121" }
      }
      transition={{ type: "spring", duration: 0.4, bounce: 0 }}
    >
      <motion.svg
        aria-hidden="true"
        role="presentation"
        viewBox="0 0 17 18"
        className={"h-3.5 w-3.5"}
      >
        <motion.polyline
          fill="none"
          points="1 9 7 14 15 4"
          stroke="#252525"
          strokeDasharray="22"
          strokeDashoffset="44"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          animate={isSelected ? { pathLength: 1 } : { pathLength: 0 }}
        ></motion.polyline>
      </motion.svg>
    </motion.div>
  );
};
