"use client";

import { use } from "react";
import { PublicProfileShell } from "@/features/profile/public-profile-shell";

/**
 * Keeps the profile shell mounted across tab routes so tab switches do not
 * refetch identity or replay the full-page skeleton.
 */
export default function PublicProfileLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ username: string }>;
}) {
  const { username } = use(params);
  return (
    <>
      <PublicProfileShell username={decodeURIComponent(username)} />
      {children}
    </>
  );
}