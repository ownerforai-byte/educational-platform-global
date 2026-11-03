import type { Metadata } from "next";
import { CommunityView } from "@/components/study/community-view";

export const metadata: Metadata = {
  title: "Community",
  description: "Subject study spaces for NEB Class 11 and 12, with a link to the Ask board.",
};

export default function Page() {
  return <CommunityView />;
}
