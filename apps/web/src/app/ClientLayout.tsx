"use client";
import dynamic from "next/dynamic";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider as JotaiProvider } from "jotai";
import { DesktopNavBar } from "@/components/navbar/DesktopNavBar";
import { MobileNavBar } from "@/components/navbar/MobileNavBar";
import { isMobile, isTablet } from "react-device-detect";
import { useEffect, useState } from "react";
import { Footer } from "@/components/Footer/Footer";
import MobileBanner from "@/components/MainMenu/MobileBanner";
import VConsole from "vconsole";
import { TelegramBanner } from "@/components/TelegramBanner/TelegramBanner";
let vConsole: any;

const queryClient = new QueryClient();
const StoreProtokitUpdater = dynamic(
  () => import("@/components/StoreProtokitUpdater"),
  {
    ssr: false,
  }
);

export const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_IS_MOCK_ENV === "true") {
      if (typeof window !== "undefined") {
        vConsole = new VConsole();
      }

      return () => {
        if (typeof window !== "undefined") vConsole?.destroy();
      };
    }
  }, []);

  const renderNavBar = () => {
    if (!isClient) return null; // Don't render anything on the server
    if (isMobile || isTablet) {
      return <MobileNavBar autoConnect={true} />;
    } else {
      return <DesktopNavBar autoConnect={true} />;
    }
  };

  const renderFooter = () => {
    if (!isClient) return null;
    if (isMobile || isTablet) {
      return <MobileBanner />;
    } else {
      return <Footer />;
    }
  };

  return (
    <JotaiProvider>
      <StoreProtokitUpdater />
      <QueryClientProvider client={queryClient}>
        {renderNavBar()}
        <div className="mx-auto max-h-[calc(100vh-200px)]"></div>
        <TelegramBanner />
        {children}
        {renderFooter()}
      </QueryClientProvider>
    </JotaiProvider>
  );
};
