interface ToggleSwitchProps {
  isPublic: boolean;
  onChange: (isPublic: boolean) => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ isPublic, onChange }) => {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <button
        type="button"
        onClick={() => onChange(!isPublic)}
        className="relative h-9 w-[84px] rounded-[5px] bg-[#748A5B] transition-colors duration-200 ease-in-out"
        aria-pressed={isPublic}
      >
        <div
          className={`absolute top-[2px] h-8 w-9 rounded-[5px] bg-[#4B4B4B] shadow-[0px_4px_4px_0px_#00000040] transition-all duration-200 ease-in-out  ${
            isPublic ? "left-[45px] bg-[#89CA60]" : "left-1"
          }`}
        />
      </button>
      <div className="min-w-[106px] whitespace-nowrap text-sm text-[#474444]">
        Visibility : {isPublic ? "Public" : "Private"}
      </div>
    </div>
  );
};

export default ToggleSwitch;
