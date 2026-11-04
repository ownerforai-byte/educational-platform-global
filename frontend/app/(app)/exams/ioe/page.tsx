import type { Metadata } from "next";
import { UnderDevelopment } from "@/components/ui/under-development";

export const metadata: Metadata = {
  title: "IOE Engineering Entrance",
  description: "IOE Engineering entrance preparation: numerical practice, patterns, past paper sets.",
};

export default function IoePage() {
  return (
    <UnderDevelopment
      title="IOE Engineering Entrance"
      description="Numerical practice sets, paper patterns, past questions and unit weightage — coming soon."
      backHref="/exams"
      backLabel="Back to Exam Hub"
    />
  );
}
