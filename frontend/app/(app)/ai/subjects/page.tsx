import Link from "next/link";
import { SUBJECT_CLASSROOMS } from "@/lib/ai/subject-classrooms";

/**
 * /ai/subjects — the six dedicated subject classrooms in one place (owner
 * 2026-10-25: "one interface per subject with their own history — no mix up,
 * for clarity"). Each classroom owns a private conversation history.
 */

export const metadata = {
  title: "Subject Classrooms — one AI classroom per subject",
  description:
    "Six dedicated AI teaching classrooms — Physics, Chemistry, Biology, Mathematics, Nepali and English — each with its own private chat history.",
};

export default function SubjectClassroomsPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10">
      <p className="text-[11px] font-bold uppercase tracking-widest text-primary">
        AI teaching interfaces
      </p>
      <h1 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">
        One classroom per subject — histories never mix
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        Each subject gets its own dedicated teaching interface with its own
        private conversation history. What you discuss in Physics stays in the
        Physics classroom — and the main Veer chat keeps its own history too.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SUBJECT_CLASSROOMS.map((classroom) => {
          const Icon = classroom.icon;
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
              <p className={`mt-4 text-xs font-semibold ${classroom.accent}`}>
                Open classroom →
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
