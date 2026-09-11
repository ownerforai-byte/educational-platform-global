import Link from "next/link";
import { EmptyState } from "@/components/content/empty-state";
import { getSubjectNav } from "../queries";
import { OfficialSyllabusPanel } from "./official-syllabus-panel";
import { SubjectSectionNav } from "./subject-section-nav";

export function SubjectSyllabusView({
  classSlug,
  subjectSlug,
  backHref,
}: {
  classSlug: string;
  subjectSlug: string;
  backHref?: string;
}) {
  const { subject, units } = getSubjectNav(classSlug, subjectSlug);
  const basePath = `/${classSlug}/${subjectSlug}`;

  if (!subject) {
    return (
      <EmptyState
        title="No syllabus found"
        description="Official syllabus has not been added for this subject yet."
      />
    );
  }

  return (
    <div className="space-y-6">
      <SubjectSectionNav basePath={basePath} active="syllabus" />

      <p className="text-muted-foreground">{subject.description}</p>

      <OfficialSyllabusPanel
        heading="Syllabus"
        description="Full official syllabus. Open a unit to see its syllabus first, then topic notes."
        units={units}
        basePath={basePath}
      />

      {subject.notesUrl ? (
        <a
          href={subject.notesUrl}
          className="inline-block text-sm font-medium text-primary hover:underline"
        >
          Open official notes for {subject.name}
        </a>
      ) : null}

      {backHref ? (
        <Link
          href={backHref}
          className="inline-block text-sm text-muted-foreground hover:text-foreground hover:underline"
        >
          Back to subject
        </Link>
      ) : null}
    </div>
  );
}
