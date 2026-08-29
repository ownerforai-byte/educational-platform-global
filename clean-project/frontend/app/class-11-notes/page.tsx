import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getImportedNotesForSubject, type ImportedNote } from "@/lib/imported-notes";
import { SubjectSearch } from "./_components/subject-search";

const SUBJECT_EMOJI: Record<string, string> = {
  Biology: "🌿",
  Chemistry: "🧪",
  English: "📖",
  Mathematics: "🔢",
  Nepali: "🇳🇵",
  Physics: "⚡",
};

const SUBJECTS = [
  { slug: "biology", name: "Biology" },
  { slug: "chemistry", name: "Chemistry" },
  { slug: "english", name: "English" },
  { slug: "mathematics", name: "Mathematics" },
  { slug: "nepali", name: "Nepali" },
  { slug: "physics", name: "Physics" },
];

type NoteGroup = {
  subject: string;
  notes: ImportedNote[];
};

async function loadNoteGroups(): Promise<NoteGroup[]> {
  const results: NoteGroup[] = [];
  for (const subject of SUBJECTS) {
    const notes = await getImportedNotesForSubject(subject.slug, "class-11-notes");
    if (notes.length > 0) {
      results.push({ subject: subject.slug, notes });
    }
  }
  return results;
}

export default async function Class11NotesPage() {
  const groups = await loadNoteGroups();

  return (
    <div className="mx-auto max-w-5xl space-y-8 py-10">
      <div className="rounded-2xl border border-border bg-gradient-to-br from-primary/10 via-background to-background p-8 shadow-lg">
        <h1 className="text-4xl font-bold tracking-tight">📝 Class 11 Notes</h1>
        <p className="mt-2 text-muted-foreground">
          NEB Class 11 subjects — imported notes organized by syllabus unit.
        </p>
      </div>

      <SubjectSearch subjects={SUBJECTS} initialGroups={groups} />

      <div className="space-y-10">
        {groups.map((group) => (
          <section key={group.subject} id={`subject-${group.subject}`}>
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-xl font-semibold tracking-tight">
                {SUBJECT_EMOJI[group.notes[0].subject] ?? "📘"}{" "}
                {group.notes[0].subject.charAt(0).toUpperCase() + group.notes[0].subject.slice(1)}
              </h2>
              <span className="rounded-full border border-border bg-muted/50 px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                {group.notes.length} note{group.notes.length !== 1 ? "s" : ""}
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
              <Link
                href={`/class-11-notes/${group.subject}`}
                className="text-xs text-primary hover:underline shrink-0"
              >
                View subject →
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {group.notes.map((note) => {
                const href =
                  note.source === "r-export"
                    ? `/r-notes/${encodeURIComponent(note.subject)}/${encodeURIComponent(note.path.split("/")[1] ?? "")}`
                    : `/ravikishan-notes/${encodeURIComponent(note.path)}`;
                return (
                  <Link
                    key={note.path}
                    href={href}
                    className="block rounded-xl border border-border bg-card/80 p-4 transition-all hover:border-primary/40 hover:shadow-md"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <CardTitle className="text-sm font-medium leading-snug">
                        {note.title}
                      </CardTitle>
                      {note.unit && (
                        <span className="shrink-0 rounded-full border border-primary/20 bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
                          {note.unit}
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground font-mono">
                      {note.source === "r-export"
                        ? note.path.split("/").slice(0, 3).join("/")
                        : note.path.split("\\").slice(0, 3).join("/")}
                    </p>
                    <span className="mt-1.5 inline-block rounded-full border border-accent-cyan/20 bg-accent-cyan/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent-cyan">
                      {note.source === "r-export" ? "R Export" : "Ravikishan"}
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}

        {groups.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-lg font-medium">No notes found</p>
              <p className="mt-1 text-sm text-muted-foreground">
                No imported notes are available for Class 11 yet.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
