interface ToggleSwitchProps {
  isPublic: boolean;
  onChange: (isPublic: boolean) => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ isPublic, onChange }) => {
  return (
    <div className="flex flex-col items-center text-center">
      <button
        type="button"
        onClick={() => onChange(!isPublic)}
        className="relative h-[18px] md:h-[27px] w-[42px] md:w-[60px] rounded-[5px] bg-[#748A5B] transition-colors duration-200 ease-in-out"
        aria-pressed={isPublic}
      >
        <div
          className={`absolute top-0 h-[18px] md:h-[27px] w-[25px] md:w-[35px] rounded-[5px] bg-[#4B4B4B] shadow-[0px_4px_4px_0px_#00000040] transition-all duration-200 ease-in-out  ${
            isPublic ? "left-[17px]  md:left-[25px] bg-[#89CA60]" : "left-0"
          }`}
        />
      </button>
      <span className="min-w-[106px] whitespace-nowrap  text-[8px] md:text-[10px] leading-normal mt-[1px] text-[#474444]">
        Visibility : {isPublic ? "Public" : "Private"}
      </span>
    </div>
  );
};

export default ToggleSwitch;
