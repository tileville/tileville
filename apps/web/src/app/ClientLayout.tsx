"use client";
import dynamic from "next/dynamic";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider as JotaiProvider } from "jotai";
import { DesktopNavBar } from "@/components/navbar/DesktopNavBar";
import { MobileNavBar } from "@/components/navbar/MobileNavBar";
import useDeviceDetection from "@/hooks/useDeviceDetection";
import clsx from "clsx";

const queryClient = new QueryClient();
const StoreProtokitUpdater = dynamic(
  () => import("@/components/StoreProtokitUpdater"),
  {
    ssr: false,
  }
);

export const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const { isMobile, isTablet, isDesktop } = useDeviceDetection();
  return (
    <>
      <JotaiProvider>
        <StoreProtokitUpdater />
        <QueryClientProvider client={queryClient}>
          <div
            className={clsx({
              hidden: isMobile,
              block: isDesktop,
            })}
          >
            <DesktopNavBar autoConnect={true} />
          </div>

          <div
            className={clsx({
              hidden: isDesktop,
            })}
          >
            <MobileNavBar />
          </div>
          <div className="mx-auto max-h-[calc(100vh-200px)]"></div>
          {children}
        </QueryClientProvider>
      </JotaiProvider>
    </>
  );
};
