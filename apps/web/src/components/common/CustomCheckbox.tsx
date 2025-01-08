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
      className="relative flex h-6 w-10 cursor-pointer items-center justify-center rounded-[5px] border-2 border-black bg-black/20 transition-all"
    >
      {/* Check Icon */}
      {checked && <CheckIcon width={28} height={28} color="white" />}
    </label>
  );
};

export default CustomCheckbox;
