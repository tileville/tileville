import React, { useState } from "react";
import { CheckIcon } from "@radix-ui/react-icons";

const CustomCheckbox = () => {
  const [checked, setChecked] = useState(false);

  return (
    <label
      className={`relative flex h-10 w-10 items-center justify-center rounded-md border-2 ${
        checked ? "border-black bg-green-600" : "border-gray-400 bg-green-200"
      } cursor-pointer transition-all`}
    >
      {/* Hidden Checkbox Input */}
      <input
        type="checkbox"
        checked={checked}
        onChange={() => setChecked(!checked)}
        className="hidden"
      />
      {/* Check Icon */}
      {checked && <CheckIcon className="h-6 w-6 text-white" />}
    </label>
  );
};

export default CustomCheckbox;
