import type { Metadata } from "next";
import { UnderDevelopment } from "@/components/ui/under-development";

export const metadata: Metadata = { title: "Subject Quiz", description: "Practice quiz for this subject." };

export default async function SubjectQuizPage({ params }: { params: Promise<{ subject: string }> }) {
  const { subject } = await params;
  return (
    <UnderDevelopment
      title={`${subject.charAt(0).toUpperCase() + subject.slice(1)} Quiz`}
      description="Unit-by-unit quiz sets for this subject — coming soon."
      backHref="/quiz"
      backLabel="Back to Quiz Bank"
    />
  );
}
