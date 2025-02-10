import { InfoCircledIcon } from "@radix-ui/react-icons";
import * as Tooltip from "@radix-ui/react-tooltip";

type CustomTooltipType = {
  tooltipContent: string;
};

export const CustomTooltip = ({ tooltipContent }: CustomTooltipType) => {
  return (
    <Tooltip.Provider delayDuration={200}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <InfoCircledIcon
            width={16}
            height={16}
            className="text-black/50 hover:text-black"
          />
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="max-w-[250px] rounded-xl bg-white p-4 shadow-sm"
            sideOffset={5}
          >
            {tooltipContent}
            <Tooltip.Arrow className="TooltipArrow" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};
