import type { Metadata } from "next";
import { UnderDevelopment } from "@/components/ui/under-development";

export const metadata: Metadata = { title: "Study Schedule", description: "Calendar view of your planned study sessions." };

export default function SchedulePage() {
  return (
    <UnderDevelopment
      title="Study Schedule"
      description="A calendar view of your planner output — see what topics are scheduled for each day."
      backHref="/planner"
      backLabel="Back to Planner"
    />
  );
}
