import type { Metadata } from "next";
import { UnderDevelopment } from "@/components/ui/under-development";

export const metadata: Metadata = { title: "Subject Progress", description: "Your progress for this subject." };

export default async function SubjectProgressPage({ params }: { params: Promise<{ subject: string }> }) {
  const { subject } = await params;
  return (
    <UnderDevelopment
      title={`${subject.charAt(0).toUpperCase() + subject.slice(1)} — Progress`}
      description="Units completed, topics attempted, accuracy trend and next recommended topic."
      backHref="/progress"
      backLabel="Back to Progress"
    />
  );
}
