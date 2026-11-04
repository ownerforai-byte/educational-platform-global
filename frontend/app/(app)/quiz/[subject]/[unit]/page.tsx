import type { Metadata } from "next";
import { UnderDevelopment } from "@/components/ui/under-development";

export const metadata: Metadata = { title: "Unit Quiz", description: "Practice quiz for this unit." };

export default async function UnitQuizPage({ params }: { params: Promise<{ subject: string; unit: string }> }) {
  const { subject, unit } = await params;
  return (
    <UnderDevelopment
      title={`${unit.replace(/-/g, " ")} — Quiz`}
      description="Timed quiz for this unit with worked answers."
      backHref={`/quiz/${subject}`}
      backLabel="Back to Subject Quiz"
    />
  );
}
