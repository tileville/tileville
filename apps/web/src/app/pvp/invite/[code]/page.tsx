import dynamic from "next/dynamic";

const InviteContent = dynamic(() => import("./InviteContent"), {
  ssr: false,
});

export default function InvitePage({
  params = { code: "" },
}: {
  params: { code: string };
}) {
  return (
    <div className="min-h-screen p-4 pb-24 pt-12 md:pt-40">
      <div className="mx-auto max-w-[1280px]">
        <InviteContent code={params.code} />
      </div>
    </div>
  );
}
