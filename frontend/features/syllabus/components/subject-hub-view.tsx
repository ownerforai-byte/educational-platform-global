import Link from "next/link";
import { EmptyState } from "@/components/content/empty-state";
import { ImportedNotesSection } from "@/components/content/imported-notes-section";
import { BackButton } from "@/components/navigation/back-button";
import type { NotesTrack } from "@/lib/imported-notes";
import { getSubjectNav } from "../queries";
import { OfficialSyllabusPanel } from "./official-syllabus-panel";
import { SubjectSectionNav } from "./subject-section-nav";
import {
  Clock,
  ArrowRight,
  GraduationCap,
  Layers,
} from "lucide-react";

function isNotesTrack(value: string): value is NotesTrack {
  return value === "class-11-notes" || value === "class-12-notes";
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
  const totalHours = units.reduce((acc, u) => acc + (u.hours || 0), 0);

  return (
    <div className="mx-auto max-w-6xl space-y-8 py-8 md:py-14 px-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
            <GraduationCap className="h-4 w-4" />
            <span>NEB Curriculum Subject Hub</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight mt-1 text-foreground">
            {emoji} {subject.name}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground max-w-2xl">{subject.description}</p>
        </div>
        <BackButton />
      </div>

      <SubjectSectionNav basePath={basePath} active="hub" />

      {/* 1. COMPLETE SYLLABUS ABOVE */}
      <OfficialSyllabusPanel
        heading="Complete Official Subject Syllabus"
        description="Official Curriculum Development Centre (CDC) syllabus guidelines. All notes, 3D labs, and formulas are mapped strictly according to these units and topics."
        units={units}
        basePath={basePath}
      />

      {/* 2. SUBJECT OPENS ON UNITS */}
      <section className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <Layers className="h-5 w-5 text-primary" />
              <span>Syllabus Units ({units.length})</span>
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Select any unit to open its chapters, topics, and complete study notes.
            </p>
          </div>
          {totalHours > 0 && (
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {totalHours} Total Hours
            </span>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {units.map((unit, index) => (
            <Link
              key={unit.id}
              href={`${basePath}/chapters/${unit.id}`}
              className="group flex flex-col justify-between rounded-3xl border border-border/70 bg-card p-5 shadow-sm transition-all hover:border-primary/50 hover:shadow-md hover:-translate-y-0.5"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-primary/10 text-primary">
                    Unit {index + 1}
                  </span>
                  {unit.hours && (
                    <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {unit.hours} hrs
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-foreground mt-3 group-hover:text-primary transition-colors">
                  {unit.title}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {unit.topicEntries.length} Topic{unit.topicEntries.length !== 1 ? "s" : ""}
                </p>

                {/* Topics Preview */}
                <div className="mt-3 pt-3 border-t border-border/50 flex flex-wrap gap-1">
                  {unit.topicEntries.slice(0, 3).map((t) => (
                    <span key={t.slug} className="text-[10px] px-2 py-0.5 rounded-md bg-muted/60 text-foreground/80 truncate max-w-[200px]">
                      {t.title}
                    </span>
                  ))}
                  {unit.topicEntries.length > 3 && (
                    <span className="text-[10px] text-muted-foreground px-1 py-0.5">
                      +{unit.topicEntries.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-border/50 flex items-center justify-between text-xs font-semibold text-primary">
                <span>Open Unit Chapters &amp; Topics</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. IMPORTED NOTES SECTION */}
      <div className="space-y-4 pt-4 border-t border-border/60">
        <h2 className="text-lg font-bold tracking-tight text-foreground">Complete Notes Index</h2>
        {isNotesTrack(classSlug) ? (
          <ImportedNotesSection subject={subjectSlug} target={classSlug} />
        ) : (
          <EmptyState
            title="No notes yet"
            description="Imported notes are not available for this class track yet."
          />
        )}
      </div>
    </div>
  );
}
