"use client";
import dynamic from "next/dynamic";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DesktopNavBar } from "@/components/DesktopNavBar";
import { Provider as JotaiProvider } from "jotai";

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
          <DesktopNavBar autoConnect={true} />
          {children}
        </QueryClientProvider>
      </JotaiProvider>
    </>
  );
};
