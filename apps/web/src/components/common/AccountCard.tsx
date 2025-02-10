import { cn } from "@/lib/helpers";

const AccountSVG = ({ className }: { className?: string }) => {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.0001 12.4285C12.9726 12.4285 14.5716 10.8295 14.5716 8.85707C14.5716 6.88463 12.9726 5.28564 11.0001 5.28564C9.0277 5.28564 7.42871 6.88463 7.42871 8.85707C7.42871 10.8295 9.0277 12.4285 11.0001 12.4285Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.8999 17.9999C5.53739 16.9535 6.43335 16.0886 7.50163 15.4886C8.56992 14.8884 9.7746 14.5732 10.9999 14.5732C12.2252 14.5732 13.4299 14.8884 14.4982 15.4886C15.5665 16.0886 16.4624 16.9535 17.0999 17.9999"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.0001 20.2858C16.1285 20.2858 20.2858 16.1285 20.2858 11.0001C20.2858 5.87171 16.1285 1.71436 11.0001 1.71436C5.87171 1.71436 1.71436 5.87171 1.71436 11.0001C1.71436 16.1285 5.87171 20.2858 11.0001 20.2858Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default function AccountCard({
  text,
  expanded,
  onClick,
  className,
}: {
  text: string;
  expanded?: boolean;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group flex cursor-pointer items-center justify-center gap-1 md:gap-[10px] rounded",
        "border-right-accent text-header-menu text-bg-dark p-1 px-2 transition duration-75 ease-in",
        "hover:bg-bg-dark hover:text-right-accent lg:justify-normal",
        expanded
          ? "border-right-accent bg-bg-dark text-right-accent hover:bg-right-accent/20 rounded-b-none"
          : "bg-right-accent",
        className
      )}
      onClick={() => onClick?.()}
    >
      <AccountSVG
        className={cn(
          "group-hover:stroke-right-accent h-[16px] w-[16px] stroke-black md:h-[24px] md:w-[24px]",
          expanded && "stroke-right-accent"
        )}
      />
      {text}
    </div>
  );
}
