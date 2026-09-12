import { notFound } from "next/navigation";
import { getLab, subjectUnits } from "@/lib/lab-catalog";
import { LabPageBody } from "@/components/lab/lab-page-body";

// Dynamic unit pages: /lab/[subject]/[unit]
// Serves the 6 physics units + 8 chemistry units.
export function generateStaticParams() {
  const params: { subject: string; unit: string }[] = [];
  for (const subject of ["physics", "chemistry"]) {
    for (const unit of subjectUnits(subject)) {
      params.push({ subject, unit });
    }
  }
  return params;
}

export function generateMetadata({ params }: { params: { subject: string; unit: string } }) {
  const entry = getLab(params.unit);
  if (!entry) return {};
  return {
    title: `${entry.title} — ${entry.subject} Practical`,
    description: entry.tagline,
  };
}

export default function LabUnitPage({ params }: { params: { subject: string; unit: string } }) {
  const entry = getLab(params.unit);
  if (!entry) notFound();
  return <LabPageBody entry={entry} />;
}
