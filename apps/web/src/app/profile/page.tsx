"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";

const ProfileContent = dynamic(() => import("./ProfileContent"), {
  ssr: false,
});

export default function Profile() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProfileWrapper />
    </Suspense>
  );
}

function ProfileWrapper() {
  const searchParams = useSearchParams();
  const paramsValue = searchParams.get("tab");

  return <ProfileContent initialTab={paramsValue || "collection"} />;
}
