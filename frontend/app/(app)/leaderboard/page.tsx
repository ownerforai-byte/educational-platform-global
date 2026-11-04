import type { Metadata } from "next";
import { UnderDevelopment } from "@/components/ui/under-development";

export const metadata: Metadata = { title: "Leaderboard", description: "Weekly top scorers by subject." };

export default function LeaderboardPage() {
  return (
    <UnderDevelopment
      title="Leaderboard"
      description="Weekly top scorers by subject from quiz and SRS activity."
      backHref="/practice"
      backLabel="Back to Practice Hub"
    />
  );
}
