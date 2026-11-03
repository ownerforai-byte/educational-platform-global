import type { Metadata } from "next";
import { DashboardView } from "@/components/study/dashboard-view";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "Your study day in one place: streak, exam countdown, today's plan and what to open next.",
};

export default function Page() {
  return <DashboardView />;
}
