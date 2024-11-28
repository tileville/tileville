import dynamic from "next/dynamic";

const MarketplaceContent = dynamic(
  () => import("@/components/Marketplace/MarketplaceContent"),
  {
    ssr: false,
  }
);

export default function Marketplace() {
  return <MarketplaceContent />;
}
