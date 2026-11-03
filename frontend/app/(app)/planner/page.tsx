import type { Metadata } from "next";
import { PlannerView } from "@/components/study/planner-view";

export const metadata: Metadata = {
  title: "Weekly Planner",
  description:
    "A weekly study plan built from your goals, exam date and the topics you have not finished.",
};

export default function Page() {
  return <PlannerView />;
}
