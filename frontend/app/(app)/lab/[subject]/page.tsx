import { notFound } from "next/navigation";
import { getLab } from "@/lib/lab-catalog";
import { LabPageBody } from "@/components/lab/lab-page-body";

// Dynamic hub page: /lab/physics and /lab/chemistry
// (Biology & Heat-Determination hubs use their static page.tsx files, which win over this route.)
export function generateStaticParams() {
  return ["physics", "chemistry"].map((subject) => ({ subject }));
}

export function generateMetadata({ params }: { params: { subject: string } }) {
  const entry = getLab(params.subject);
  if (!entry) return {};
  return {
    title: `${entry.title} — NEB (+2) ${entry.subject}`,
    description: entry.tagline,
  };
}

export default function LabSubjectPage({ params }: { params: { subject: string } }) {
  const entry = getLab(params.subject);
  if (!entry) notFound();
  return <LabPageBody entry={entry} />;
}
