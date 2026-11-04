import type { Metadata } from "next";
import { UnderDevelopment } from "@/components/ui/under-development";

export const metadata: Metadata = { title: "Unit Progress", description: "Your progress for this unit." };

export default async function UnitProgressPage({ params }: { params: Promise<{ subject: string; unit: string }> }) {
  const { subject, unit } = await params;
  return (
    <UnderDevelopment
      title={`${unit.replace(/-/g, " ")} — Progress`}
      description="Topic completion list and score history for this unit."
      backHref={`/progress/${subject}`}
      backLabel="Back to Subject Progress"
    />
  );
}
