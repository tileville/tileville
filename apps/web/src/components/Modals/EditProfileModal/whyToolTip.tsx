import * as Tooltip from "@radix-ui/react-tooltip";

export const WhyToolTip = () => {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <span className="cursor-pointer text-gray-800">Why?</span>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="max-w-[250px] rounded-xl bg-white p-4 shadow-sm"
            sideOffset={5}
          >
            We Want to show your score in the leaderboard that is why we
            want your name.
            <Tooltip.Arrow className="TooltipArrow" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}