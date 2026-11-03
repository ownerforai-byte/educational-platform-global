import type { Metadata } from "next";
import { AnalyticsView } from "@/components/study/analytics-view";

export const metadata: Metadata = {
  title: "Analytics",
  description:
    "Accuracy by subject and topic, unit progress and weekly trends from your quizzes and progress.",
};

export default function Page() {
  return <AnalyticsView />;
}
