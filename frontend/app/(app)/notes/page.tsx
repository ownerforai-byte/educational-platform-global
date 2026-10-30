import Link from "next/link";
import { SubjectSearch } from "@/components/layout/subject-search";
import { getImportedNotesBySubject } from "@/lib/imported-notes";
import { ArrowRight, FlaskConical } from "lucide-react";

export default async function NotesPage() {
  const importedMap = await getImportedNotesBySubject();

  const searchSubjects = Object.keys(importedMap).map((slug) => ({
    slug,
    name: slug.charAt(0).toUpperCase() + slug.slice(1),
  }));

  const initialGroups = Object.entries(importedMap).map(([subject, notes]) => ({
    subject,
    notes,
  }));

  return (
    <div className="mx-auto max-w-6xl space-y-10 py-8 md:py-14 px-4">
      <div className="rounded-2xl border border-border bg-gradient-to-br from-primary/10 via-background to-background p-8 shadow-lg">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight flex items-center gap-3">
          <span aria-hidden="true">📚</span>
          Notes
        </h1>
        <p className="mt-2 text-muted-foreground">
          One searchable archive for imported notes. Each result opens its canonical class, subject, and unit destination, with no repeated source sections below.
        </p>
      </div>

      {/* Practical Lab & Virtual Apparatus Cross-Link Banner */}
      <div className="rounded-2xl border border-emerald-500/40 bg-gradient-to-r from-emerald-500/10 via-card to-card p-6 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            <FlaskConical className="h-4 w-4" />
            <span>Hands-On Science Practicals &amp; Viva Voce</span>
          </div>
          <h2 className="text-lg sm:text-xl font-extrabold text-foreground">
            Complete NEB Practical Lab Manuals &amp; Simulators
          </h2>
          <p className="text-xs text-muted-foreground max-w-2xl">
            Looking for Physics, Chemistry, or Biology practical experiments? Access virtual apparatus simulations, observation calculation sheets, and examiner viva Q&amp;As.
          </p>
          <div className="flex flex-wrap gap-2 pt-2 text-xs font-semibold">
            <Link href="/practical/physics" className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-sky-500/15 text-sky-600 dark:text-sky-400 hover:bg-sky-500/25 transition-colors">
              <span aria-hidden="true">🌌</span>
              Physics Practical
            </Link>
            <Link href="/practical/chemistry" className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/15 text-amber-600 dark:text-amber-400 hover:bg-amber-500/25 transition-colors">
              <span aria-hidden="true">🧪</span>
              Chemistry Practical
            </Link>
            <Link href="/practical/biology" className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/25 transition-colors">
              <span aria-hidden="true">🌿</span>
              Biology Practical
            </Link>
          </div>
        </div>

        <Link
          href="/practical"
          className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow-md hover:bg-emerald-500 transition-all"
        >
          <span>Open Practical Hub</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Interactive Search & Subject Filter */}
      <section className="rounded-2xl border border-border/80 bg-card/60 p-6 backdrop-blur-sm shadow-sm space-y-4">
        <h2 className="text-lg font-semibold tracking-tight text-foreground flex items-center gap-2">
          <span aria-hidden="true">🔍</span>
          <span>Quick search &amp; filter notes</span>
        </h2>
        <SubjectSearch subjects={searchSubjects} initialGroups={initialGroups} />
      </section>

    </div>
  );
}
