import { PublicProfileShell } from "@/features/profile/public-profile-shell";

export default async function ProfileFilesPage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  return <PublicProfileShell username={decodeURIComponent(username)} initialTab="files" />;
}
