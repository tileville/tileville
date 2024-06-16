// "use client";

import "@radix-ui/themes/styles.css";
import "../../public/font/font.css";
import "./globals.css";
import "reflect-metadata";
import { Theme } from "@radix-ui/themes";
import { Footer } from "@/components/Footer";
import { ClientLayout } from "./ClientLayout";
import { PHProvider } from "./providers";

export const metadata = {
  title: "TileVille",
  description: "On-chain city development arcade game built on MINA",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      // className={`${monteserrat.variable}, ${fjallaOne.variable}`}
    >
      <body className="gradient-bg min-h-screen">
        <Theme
          accentColor="green"
          grayColor="olive"
          panelBackground="solid"
          scaling="100%"
          radius="large"
        >
          <PHProvider>
            <div className="gradient-bg min-h-screen">
              <ClientLayout>
                <div className="">{children}</div>
              </ClientLayout>
            </div>
          </PHProvider>
        </Theme>
        <Footer />
      </body>
    </html>
  );
}
