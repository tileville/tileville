import "@radix-ui/themes/styles.css";
import "../../public/font/font.css"
import "./globals.css";
import { fjallaOne, monteserrat } from "../styles/fonts";
import { Theme } from "@radix-ui/themes";
import { Toaster } from "react-hot-toast";
import { Footer } from "@/components/Footer";
import { NavBar } from "@/components/NavBar";

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
      className={`${monteserrat.variable}, ${fjallaOne.variable}`}
    >
      <body>
        <Theme
          accentColor="amber"
          grayColor="olive"
          panelBackground="solid"
          scaling="100%"
          radius="large"
        >
          <div className="min-h-screen bg-[#ded6b6]">
            <NavBar />
            {children}
            <Toaster />
          </div>
        </Theme>
        <Footer />
      </body>
    </html>
  );
}
