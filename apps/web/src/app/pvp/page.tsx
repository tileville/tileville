import dynamic from "next/dynamic";

const PVPContent = dynamic(() => import("./PVPContent"), {
  ssr: false,
});

export default function PVPPage() {
  return <PVPContent />;
}
