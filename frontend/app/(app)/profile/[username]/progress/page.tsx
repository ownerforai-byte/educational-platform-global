import type { Metadata } from "next";
import { PublicProfileShell } from "@/features/profile/public-profile-shell";

export const metadata: Metadata = {
  title: "Progress · Profile",
};

export default async function ProfileProgressPage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  return <PublicProfileShell username={decodeURIComponent(username)} initialTab="progress" />;
}
