import type { Metadata } from "next";
import { UnderDevelopment } from "@/components/ui/under-development";

export const metadata: Metadata = {
  title: "CEE Medical Entrance",
  description: "CEE Medical Entrance preparation: MCQ banks, subject weightage, syllabus comparison.",
};

export default function CeePage() {
  return (
    <UnderDevelopment
      title="CEE Medical Entrance"
      description="MCQ banks, high-yield topic lists, subject weightage and syllabus comparison vs NEB — coming soon."
      backHref="/exams"
      backLabel="Back to Exam Hub"
    />
  );
}
