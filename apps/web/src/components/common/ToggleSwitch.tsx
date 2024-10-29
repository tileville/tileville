import React, { useState } from "react";

const ToggleSwitch = () => {
  const [isPublic, setIsPublic] = useState(true);

  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <button
        type="button"
        onClick={() => setIsPublic(!isPublic)}
        className="relative h-9 w-[84px] rounded-[5px] bg-[#748A5B] transition-colors duration-200 ease-in-out"
        aria-pressed={isPublic}
      >
        <div
          className={`absolute top-[2px] h-8 w-9 rounded-[5px] bg-[#4B4B4B] transition-all duration-200 ease-in-out ${
            isPublic ? "left-[45px]" : "left-1"
          }`}
        />
      </button>
      <div className="text-sm  text-[#474444] whitespace-nowrap min-w-[106px]">
        Visibility : {isPublic ? "Public" : "Private"}
      </div>
    </div>
  );
};

export default ToggleSwitch;
