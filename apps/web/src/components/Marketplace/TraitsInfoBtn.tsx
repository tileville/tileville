import { InfoCircledIcon } from "@radix-ui/react-icons";
import * as Tooltip from "@radix-ui/react-tooltip";
import Link from "next/link";

export const TraitsInfoBtn = () => {
  return (
    <Tooltip.Provider delayDuration={200}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <Link
            href="/traits-info"
            className="flex h-10 items-center justify-center gap-2 rounded-md border border-green-950 bg-green-950  px-3 font-semibold uppercase text-white hover:opacity-90"
          >
            <span>Traits Info</span>
            <InfoCircledIcon className="text-white" width={18} height={18} />
          </Link>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="max-w-[250px] rounded-xl bg-white p-4 shadow-sm"
            sideOffset={5}
          >
            Click to get more info about TileVille NFTs
            <Tooltip.Arrow className="TooltipArrow" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};
