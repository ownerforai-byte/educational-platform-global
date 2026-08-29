import Link from "next/link";
import { EmptyState } from "@/components/content/empty-state";
import { ImportedNotesSection } from "@/components/content/imported-notes-section";
import { BackButton } from "@/components/navigation/back-button";
import type { NotesTrack } from "@/lib/imported-notes";
import { getSubjectNav } from "../queries";
import { OfficialSyllabusPanel } from "./official-syllabus-panel";
import { SubjectSectionNav } from "./subject-section-nav";

function isNotesTrack(value: string): value is NotesTrack {
  return (
    value === "class-11e" ||
    value === "class-12-notes" ||
    value === "class-12e" ||
    value === "class-12-more"
  );
}

export async function SubjectHubView({
  classSlug,
  subjectSlug,
}: {
  classSlug: string;
  subjectSlug: string;
}) {
  const SUBJECT_EMOJI: Record<string, string> = {
    Biology: "🌿", Chemistry: "🧪", English: "📖",
    Mathematics: "🔢", Nepali: "🇳🇵", Physics: "⚡",
  };
  const { subject, units } = getSubjectNav(classSlug, subjectSlug);
  const basePath = `/${classSlug}/${subjectSlug}`;

  if (!subject) {
    return (
      <div className="mx-auto max-w-6xl py-10">
        <EmptyState
          title="Subject not found"
          description="This subject is not in the official syllabus for this class track."
        />
      </div>
    );
  }

  const emoji = SUBJECT_EMOJI[subject.name] ?? "📘";

  return (
    <div className="mx-auto max-w-6xl space-y-6 py-8 md:py-14 px-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{emoji} {subject.name}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{subject.description}</p>
        </div>
        <BackButton />
      </div>

      <SubjectSectionNav basePath={basePath} active="hub" />

      <OfficialSyllabusPanel
        heading="Syllabus"
        description="Official curriculum for this subject. Notes, tests, PYQs, and extras are attached only to these units and topics."
        units={units}
        basePath={basePath}
      />

      <div className="space-y-3">
        <h2 className="text-xl font-semibold tracking-tight">Notes by syllabus unit</h2>
        {isNotesTrack(classSlug) ? (
          <ImportedNotesSection subject={subjectSlug} target={classSlug} />
        ) : (
          <EmptyState
            title="No notes yet"
            description="Imported notes are not available for this class track yet."
          />
        )}
      </div>

      <p className="text-sm text-muted-foreground">
        Open a unit to see its syllabus first, then topic notes.{" "}
        <Link href={`${basePath}/chapters`} className="text-primary hover:underline">
          Browse chapters
        </Link>
      </p>
    </div>
  );
}
