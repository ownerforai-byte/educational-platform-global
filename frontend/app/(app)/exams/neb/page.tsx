import type { Metadata } from "next";
import { UnderDevelopment } from "@/components/ui/under-development";

export const metadata: Metadata = {
  title: "NEB Board Exam",
  description: "NEB board exam preparation: subject PYQs, model questions, and exam schedule.",
};

export default function NebPage() {
  return (
    <UnderDevelopment
      title="NEB Board Exam"
      description="Subject-wise PYQs, model questions, important questions, and exam schedule — coming soon."
      backHref="/exams"
      backLabel="Back to Exam Hub"
    />
  );
}
