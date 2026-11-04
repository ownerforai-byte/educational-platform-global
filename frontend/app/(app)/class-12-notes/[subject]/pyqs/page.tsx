import type { Metadata } from "next";
import { UnderDevelopment } from "@/components/ui/under-development";

export const metadata: Metadata = {
  title: "Past Year Questions",
  description: "Browse all past year questions for this subject by unit and year.",
};

export default async function SubjectPyqsPage({
  params,
}: {
  params: Promise<{ subject: string }>;
}) {
  const { subject } = await params;
  return (
    <UnderDevelopment
      title={`${subject.charAt(0).toUpperCase() + subject.slice(1)} — Past Year Questions`}
      description="Subject-level PYQ browser: all past-year questions filterable by unit and year."
      backHref={`/class-12-notes/${subject}`}
      backLabel={`Back to ${subject.charAt(0).toUpperCase() + subject.slice(1)}`}
    />
  );
}
