import { notFound } from "next/navigation";
import { getLab, subjectConceptPairs } from "@/lib/lab-catalog";
import { LabPageBody } from "@/components/lab/lab-page-body";

// Dynamic concept pages: /lab/[subject]/[unit]/[concept]
// Serves all 17 physics + 20 chemistry concept (experiment) pages.
export function generateStaticParams() {
  const params: { subject: string; unit: string; concept: string }[] = [];
  for (const subject of ["physics", "chemistry"]) {
    for (const { unit, concept } of subjectConceptPairs(subject)) {
      params.push({ subject, unit, concept });
    }
  }
  return params;
}

export function generateMetadata({ params }: { params: { subject: string; unit: string; concept: string } }) {
  const entry = getLab(params.concept);
  if (!entry) return {};
  return {
    title: `${entry.title} — ${entry.subject} Practical`,
    description: entry.tagline,
  };
}

export default function LabConceptPage({ params }: { params: { subject: string; unit: string; concept: string } }) {
  const entry = getLab(params.concept);
  if (!entry) notFound();
  return <LabPageBody entry={entry} />;
}
