import type { Metadata } from "next";
import { CommunityActionSuccessView } from "@/features/community/community-action-success";

export const metadata: Metadata = {
  title: "Success — Community",
};

export default async function CommunityDonePage({
  searchParams,
}: {
  searchParams: Promise<{ action?: string; postId?: string }>;
}) {
  const params = await searchParams;
  return <CommunityActionSuccessView action={params.action} postId={params.postId} />;
}