import * as Popover from "@radix-ui/react-popover";
import { BellIcon } from "@radix-ui/react-icons";

export const NotificationsPopover = () => {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button
          className={`relative rounded-md p-2 transition-colors hover:bg-primary/40`}
          aria-label="Show notifications"
        >
          <BellIcon className="h-5 w-5" />
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
            2
          </span>
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          className="z-50 w-[360px] rounded-lg border border-primary bg-[#99B579] p-4 shadow-lg"
          sideOffset={5}
          align="end"
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-black">Notifications</h3>
            <button className="text-sm text-primary hover:underline">
              Mark all as read
            </button>
          </div>

          <div className="max-h-[400px] space-y-2 overflow-y-auto">
            <div className="rounded-md bg-white/50 p-3 transition-colors hover:bg-white/70">
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-primary/20"></div>
                <div>
                  <p className="text-sm font-medium text-black">
                    New Competition Available
                  </p>
                  <p className="text-xs text-gray-600">
                    Competiton started now
                  </p>
                  <span className="mt-1 text-xs text-gray-500">
                    2 minutes ago
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-md bg-white/50 p-3 transition-colors hover:bg-white/70">
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-primary/20"></div>
                <div>
                  <p className="text-sm font-medium text-black">Score Update</p>
                  <p className="text-xs text-gray-600">
                    You achieved a new high score in Zknoid Challenge
                  </p>
                  <span className="mt-1 text-xs text-gray-500">1 hour ago</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 text-center">
            <button className="text-sm text-primary hover:underline">
              View all notifications
            </button>
          </div>

          <Popover.Arrow className="fill-[#99B579]" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};
