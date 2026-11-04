import type { Metadata } from "next";
import { UnderDevelopment } from "@/components/ui/under-development";

export const metadata: Metadata = { title: "Study Goals", description: "View and update your study goals." };

export default function GoalsPage() {
  return (
    <UnderDevelopment
      title="Study Goals"
      description="Your subjects, exam date, daily study target and goal history — all in one place."
      backHref="/onboarding"
      backLabel="Set Goals"
    />
  );
}
