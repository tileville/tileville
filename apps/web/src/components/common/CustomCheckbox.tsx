import React from "react";
import { CheckIcon } from "@radix-ui/react-icons";

interface CustomCheckboxProps {
  checked: boolean;
  onChange: () => void;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  checked,
  onChange,
}) => {
  return (
    <label
      onClick={onChange}
      className="relative flex h-4 w-5 cursor-pointer items-center justify-center rounded-[5px] border-2 border-black bg-black/20 transition-all md:h-6 md:w-10"
    >
      {/* Check Icon */}
      {checked && <CheckIcon width={28} height={28} color="white" />}
    </label>
  );
};

export default CustomCheckbox;
