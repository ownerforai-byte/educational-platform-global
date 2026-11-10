import Link from "next/link";
import { Atom, BookOpen, Dna, FlaskConical, Languages, Sigma } from "lucide-react";
import { SUBJECT_CLASSROOMS, type SubjectIconName } from "@/lib/ai/subject-classrooms";
import { AiToolShell } from "@/components/ai/ai-tool-shell";

/**
 * /ai/subjects — the six dedicated subject classrooms in one place (owner
 * 2026-10-25: "one interface per subject with their own history — no mix up,
 * for clarity"). Each classroom owns a private conversation history.
 */

const SUBJECT_ICONS = {
  atom: Atom,
  book: BookOpen,
  dna: Dna,
  flask: FlaskConical,
  languages: Languages,
  sigma: Sigma,
} satisfies Record<SubjectIconName, typeof Atom>;

export const metadata = {
  title: "Subject Classrooms — one AI classroom per subject",
  description:
    "Six dedicated AI teaching classrooms — Physics, Chemistry, Biology, Mathematics, Nepali and English — each with its own private chat history.",
};

export default function SubjectClassroomsPage() {
  return (
    <AiToolShell
      icon={BookOpen}
      title="Subject classrooms"
      description="Six dedicated AI teaching classrooms — Physics, Chemistry, Biology, Mathematics, Nepali and English — each with its own private chat history."
      accent="border-emerald-500/25 bg-emerald-500/10 text-emerald-500"
      current="/ai/subjects"
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {SUBJECT_CLASSROOMS.map((classroom) => {
          const Icon = SUBJECT_ICONS[classroom.icon];
          return (
            <Link
              key={classroom.slug}
              href={`/ai/subjects/${classroom.slug}`}
              className={`flex flex-col rounded-2xl border ${classroom.accentBorder} ${classroom.accentBg} p-5 transition hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-xl border ${classroom.accentBorder} bg-background`}
                >
                  <Icon className={`h-5 w-5 ${classroom.accent}`} aria-hidden="true" />
                </span>
                <h2 className="text-base font-bold">{classroom.title}</h2>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                {classroom.tagline}
              </p>
            </Link>
          );
        })}
      </div>

      <p className="mt-4 rounded-2xl border border-border/60 bg-muted/20 px-4 py-3 text-xs leading-relaxed text-muted-foreground">
        What you discuss in Physics stays in the Physics classroom — and the main Veer
        chat keeps its own history too.
      </p>
    </AiToolShell>
  );
}
