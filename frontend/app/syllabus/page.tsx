import { SYLLABUS } from "@/lib/syllabus";
import Link from "next/link";

const SUBJECT_EMOJI: Record<string, string> = {
  Biology: "🌿",
  Chemistry: "🧪",
  English: "📖",
  Mathematics: "🔢",
  Nepali: "🇳🇵",
  Physics: "⚡",
};

const SUBJECT_COLORS: Record<string, string> = {
  Biology: "from-emerald-500 to-teal-500",
  Chemistry: "from-amber-500 to-orange-500",
  English: "from-blue-500 to-cyan-500",
  Mathematics: "from-violet-500 to-purple-500",
  Nepali: "from-red-500 to-rose-500",
  Physics: "from-sky-500 to-blue-500",
};

type SubjectInfo = {
  slug: string;
  name: string;
  description: string;
  totalUnits: number;
  notesUrl?: string;
};

export default function SyllabusLandingPage() {
  // Collect all unique subjects across tracks
  const subjectMap = new Map<string, SubjectInfo>();

  for (const cls of SYLLABUS) {
    for (const subject of cls.subjects) {
      const existing = subjectMap.get(subject.slug);
      if (existing) {
        existing.totalUnits += subject.units.length;
      } else {
        subjectMap.set(subject.slug, {
          slug: subject.slug,
          name: subject.name,
          description: subject.description,
          totalUnits: subject.units.length,
          notesUrl: subject.notesUrl,
        });
      }
    }
  }

  const subjects = Array.from(subjectMap.values());

  return (
    <div className="mx-auto max-w-6xl space-y-8 py-8 md:py-14 px-4">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 sm:p-8">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent-cyan/5 pointer-events-none" />
        <div className="relative">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            📚 Syllabus
          </h1>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl">
            Official NEB (+2) curriculum for all six subjects across every class track. 
            Click any subject to view the complete syllabus breakdown.
          </p>
        </div>
      </div>

      {/* Subject cards */}
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4">
          Subjects
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {subjects.map((subject) => {
            const emoji = SUBJECT_EMOJI[subject.name] ?? "📘";
            const colorClass = SUBJECT_COLORS[subject.name] ?? "from-primary to-primary/70";
            return (
              <Link
                key={subject.slug}
                href={`/syllabus/${subject.slug}`}
                className="group rounded-2xl border border-border/60 bg-card p-5 transition-all hover:border-primary/30 hover:shadow-lg card-shimmer"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${colorClass} text-xl shadow-md`}>
                    {emoji}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="font-semibold text-foreground text-base truncate">
                      {subject.name}
                    </h2>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed line-clamp-2">
                      {subject.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/40">
                  <span className="text-xs text-muted-foreground">
                    {subject.totalUnits} units across 6 tracks
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary group-hover:underline">
                    View Syllabus <span aria-hidden="true">→</span>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Class tracks overview */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          Class Tracks
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SYLLABUS.map((cls) => (
            <div
              key={cls.slug}
              className="rounded-xl border border-border/60 bg-card p-4"
            >
              <h3 className="font-semibold text-foreground text-sm">{cls.name}</h3>
              <p className="text-xs text-muted-foreground mt-1">
                {cls.subjects.length} subjects · {cls.subjects.reduce((acc, s) => acc + s.units.length, 0)} units
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
