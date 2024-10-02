import "@radix-ui/themes/styles.css";
import "../../public/font/font.css";
import "./globals.css";
import "reflect-metadata";
import { Theme } from "@radix-ui/themes";
import { Footer } from "@/components/Footer";
import { ClientLayout } from "./ClientLayout";
import { PHProvider } from "./providers";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "TileVille",
  description: "On-chain city development arcade game built on MINA",
  icons: {
    apple: [
      {
        url: "/img/favicon/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    icon: [
      {
        url: "/img/favicon/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/img/favicon/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
    ],
    shortcut: [{ url: "/img/favicon/favicon-32x32.png", type: "image/x-icon" }],
    other: [
      {
        rel: "mask-icon",
        url: "/img/favicon/safari-pinned-tab.svg",
        color: "#5bbad5",
      },
      { rel: "manifest", url: "/img/favicon/site.webmanifest" },
    ],
  },
  msapplication: {
    tileColor: "#da532c",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="gradient-bg min-h-screen">
        <Theme
          accentColor="green"
          grayColor="olive"
          panelBackground="solid"
          scaling="100%"
          radius="large"
        >
          <PHProvider>
            <div className="gradient-bg min-h-screen !bg-fixed">
              <ClientLayout>
                <div className="">{children}</div>
              </ClientLayout>
            </div>
          </PHProvider>
        </Theme>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
