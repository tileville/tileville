// "use client";

import "@radix-ui/themes/styles.css";
import "../../public/font/font.css";
import "./globals.css";
import "reflect-metadata";
import { fjallaOne, monteserrat } from "../styles/fonts";
import { Theme } from "@radix-ui/themes";
import { Footer } from "@/components/Footer";
import { NavBar } from "@/components/NavBar";
import { ClientLayout } from "./ClientLayout";

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
      <body>
        <Theme
          accentColor="amber"
          grayColor="olive"
          panelBackground="solid"
          scaling="100%"
          radius="large"
        >
          <div className="gradient-bg min-h-screen">
            <ClientLayout>
              <NavBar />
              <div className="pt-20">{children}</div>
            </ClientLayout>
          </div>
        </Theme>
        <Footer />
      </body>
    </html>
  );
}
