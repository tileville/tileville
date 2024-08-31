"use client";
import dynamic from "next/dynamic";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider as JotaiProvider } from "jotai";
import { DesktopNavBar } from "@/components/navbar/DesktopNavBar";
import { MobileNavBar } from "@/components/navbar/MobileNavBar";

const queryClient = new QueryClient();
const StoreProtokitUpdater = dynamic(
  () => import("@/components/StoreProtokitUpdater"),
  {
    ssr: false,
  }
);

export const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <JotaiProvider>
        <StoreProtokitUpdater />
        <QueryClientProvider client={queryClient}>
          <div className="hidden md:block">
            <DesktopNavBar autoConnect={true} />
          </div>

          <div className="md:hidden">
            <MobileNavBar />
          </div>
          <div className="mx-auto max-h-[calc(100vh-200px)]"></div>
          {children}
        </QueryClientProvider>
      </JotaiProvider>
    </>
  );
};
