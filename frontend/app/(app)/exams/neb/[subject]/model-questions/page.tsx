import type { Metadata } from "next";
import { UnderDevelopment } from "@/components/ui/under-development";

export const metadata: Metadata = {
  title: "Model Questions",
  description: "Important model questions for this subject.",
};

export default async function ModelQuestionsPage({
  params,
}: {
  params: Promise<{ subject: string }>;
}) {
  const { subject } = await params;
  return (
    <UnderDevelopment
      title={`${subject.charAt(0).toUpperCase() + subject.slice(1)} — Model Questions`}
      description="High-importance questions collection for board exam preparation."
      backHref="/exams/neb"
      backLabel="Back to NEB Hub"
    />
  );
}
