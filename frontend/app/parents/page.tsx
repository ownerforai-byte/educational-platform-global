import type { Metadata } from "next";
import { UnderDevelopment } from "@/components/ui/under-development";

export const metadata: Metadata = {
  title: "Parent Portal",
  description: "Monitor your child's study progress, set study time and get weekly reports.",
};

export default function ParentsPage() {
  return (
    <UnderDevelopment
      title="Parent Portal"
      description="Monitor study progress, set daily time limits and receive weekly report summaries — coming soon."
      backHref="/"
      backLabel="Back to Home"
    />
  );
}
