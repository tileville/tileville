import Image from "next/image";
import { CustomTooltip } from "../common/CustomTooltip";
import { TimerIcon } from "@radix-ui/react-icons";

export const SpeedVersionContent = ({
  speedDuration,
}: {
  speedDuration: number;
}) => {
  return (
    <div className="col-span-4">
      <div className="mb-2 flex items-center justify-center gap-2 text-xl md:justify-start">
        <span>
          <Image src="/icons/speed.svg" alt="speed" width="30" height="30" />
        </span>
        <p className="text-medium text-sm md:text-base">Speedy Version</p>

        <CustomTooltip
          tooltipContent="In the speedy version of the game, the player will need
                                to finish the game in specific amount of time."
        />
      </div>

      <div className="flex items-center justify-center gap-2 text-xl md:justify-start">
        <span>
          <TimerIcon width={24} height={24} />
        </span>
        <p className="text-medium text-sm md:text-base">Game Time:-</p>
        <p className="text-medium text-sm md:text-base">{speedDuration} Secs</p>
      </div>
    </div>
  );
};
