import dynamic from "next/dynamic";

const MarketplaceLanding = dynamic(
  () => import("@/components/Marketplace/MarketplaceLanding"),
  {
    ssr: false,
  }
);

export default function Marketplace() {
  return <MarketplaceLanding />;
}
