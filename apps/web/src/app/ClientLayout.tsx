"use client";
import dynamic from "next/dynamic";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
const StoreProtokitUpdater = dynamic(
  () => import("@/components/StoreProtokitUpdater"),
  {
    ssr: false,
  }
);
// This layout component can be used with React state, context and more as it is a client component.

export const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <StoreProtokitUpdater />
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      <Toaster />
    </>
  );
};
