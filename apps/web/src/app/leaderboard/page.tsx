import { Suspense } from "react";
import dynamic from "next/dynamic";

const LeaderboardContent = dynamic(
  () => import("../../components/Leaderboard/LeaderboardContent"),
  { ssr: false }
);

export default function Leaderboard() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LeaderboardContent />
    </Suspense>
  );
}
