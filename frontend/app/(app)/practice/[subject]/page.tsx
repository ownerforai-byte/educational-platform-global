import type { Metadata } from "next";
import { UnderDevelopment } from "@/components/ui/under-development";

export const metadata: Metadata = { title: "Subject Practice", description: "Subject-level practice dashboard." };

export default async function SubjectPracticePage({ params }: { params: Promise<{ subject: string }> }) {
  const { subject } = await params;
  return (
    <UnderDevelopment
      title={`${subject.charAt(0).toUpperCase() + subject.slice(1)} — Practice`}
      description="Topic selector and timed quiz mode for this subject."
      backHref="/practice"
      backLabel="Back to Practice Hub"
    />
  );
}
