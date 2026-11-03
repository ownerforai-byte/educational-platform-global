import type { Metadata } from "next";
import { MockExamsView } from "@/components/study/mock-exams-view";

export const metadata: Metadata = {
  title: "Mock Exams",
  description:
    "Timed mock papers with an OMR sheet, automatic scoring, answer key and written past questions.",
};

export default function Page() {
  return <MockExamsView />;
}
