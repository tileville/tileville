import { InfoCircledIcon } from "@radix-ui/react-icons";
import * as Tooltip from "@radix-ui/react-tooltip";

type TraitsInfoTooltipType = {
  description: string;
  value: string;
};

export const TraitsInfoTooltip = ({
  description,
  value,
}: TraitsInfoTooltipType) => {
  return (
    <Tooltip.Provider delayDuration={100}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <span className="absolute right-2 top-2">
            <InfoCircledIcon />
          </span>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="gradient-bg max-w-[350px] rounded-xl px-3 py-2 shadow-sm"
            sideOffset={5}
          >
            <ul>
              <li className="text-xs text-black/80">{description}</li>
              <li className="text-xs">{value}</li>
            </ul>

            <Tooltip.Arrow className="TooltipArrow" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};
