import { PublicProfileContent } from "@/components/PublicProfile/PublicProfileContent";

export default function PublicProfile({
  params,
}: {
  params: { handle: string };
}) {
  return <PublicProfileContent params={params} />;
}
