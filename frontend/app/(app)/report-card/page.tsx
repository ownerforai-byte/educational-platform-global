import type { Metadata } from "next";
import { ReportCardView } from "@/components/study/report-card-view";

export const metadata: Metadata = {
  title: "Report card",
  description:
    "A printable snapshot of your study progress.",
};

export default function Page() {
  return <ReportCardView />;
}
