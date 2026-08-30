import { SYLLABUS, type ClassSyllabus, type SubjectSyllabus } from "@/lib/syllabus";
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

const CLASS_TRACK_ORDER = [
  "class-11-notes",
  "class-11e",
  "class-11-more",
  "class-12-notes",
  "class-12e",
  "class-12-more",
] as const;

function getSubjectAcrossTracks(subjectSlug: string): {
  classTrack: ClassSyllabus;
  subject: SubjectSyllabus;
}[] {
  const results: { classTrack: ClassSyllabus; subject: SubjectSyllabus }[] = [];
  for (const cls of SYLLABUS) {
    const subject = cls.subjects.find((s) => s.slug === subjectSlug);
    if (subject) {
      results.push({ classTrack: cls, subject });
    }
  }
  return results;
}

export default async function SubjectSyllabusPage({
  params,
}: {
  params: Promise<{ subjectSlug: string }>;
}) {
  const { subjectSlug } = await params;

  const subjectAcrossTracks = getSubjectAcrossTracks(subjectSlug);

  if (subjectAcrossTracks.length === 0) {
    return (
      <div className="mx-auto max-w-6xl py-10 px-4">
        <div className="rounded-2xl border border-border bg-card p-8 text-center">
          <h1 className="text-xl font-semibold text-foreground">Subject not found</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            No syllabus found for <code className="bg-muted px-1.5 py-0.5 rounded text-xs">{subjectSlug}</code>
          </p>
          <Link href="/syllabus" className="mt-4 inline-flex text-sm text-primary hover:underline">
            ← Back to Syllabus
          </Link>
        </div>
      </div>
    );
  }

  const firstSubject = subjectAcrossTracks[0].subject;
  const emoji = SUBJECT_EMOJI[firstSubject.name] ?? "📘";
  const colorClass = SUBJECT_COLORS[firstSubject.name] ?? "from-primary to-primary/70";

  // Total hours across all tracks that have this subject
  const totalHours = subjectAcrossTracks.reduce((acc, { subject }) => {
    return acc + subject.units.reduce((sum, u) => sum + (u.hours ?? 0), 0);
  }, 0);

  return (
    <div className="mx-auto max-w-6xl space-y-8 py-8 md:py-14 px-4">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 sm:p-8">
        <div className={`absolute inset-0 bg-gradient-to-br ${colorClass}/5 pointer-events-none`} />
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${colorClass} text-2xl shadow-lg`}>
            {emoji}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              {firstSubject.name}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
              {firstSubject.description}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1 bg-primary/10 text-primary px-2.5 py-1 rounded-full font-semibold">
                {subjectAcrossTracks.length} tracks
              </span>
              {totalHours > 0 && (
                <span className="inline-flex items-center gap-1 bg-muted px-2.5 py-1 rounded-full">
                  {totalHours}+ total teaching hours
                </span>
              )}
            </div>
          </div>
          <Link
            href="/syllabus"
            className="shrink-0 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            ← Back to Syllabus
          </Link>
        </div>
      </div>

      {/* Class track sections */}
      <div className="space-y-6">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          Syllabus by Class Track
        </h2>

        {subjectAcrossTracks.map(({ classTrack, subject }) => {
          const trackOrder = CLASS_TRACK_ORDER.indexOf(classTrack.slug as typeof CLASS_TRACK_ORDER[number]);
          const trackLabel = classTrack.name;

          return (
            <div
              key={classTrack.slug}
              className="rounded-2xl border border-border/60 bg-card overflow-hidden"
            >
              {/* Track header */}
              <div className={`px-5 py-3 border-b border-border/60 bg-gradient-to-r ${colorClass}/5`}>
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center justify-center h-6 w-6 rounded-md bg-gradient-to-br ${colorClass} text-xs font-bold text-white`}>
                      {trackOrder + 1}
                    </span>
                    <h3 className="font-semibold text-foreground">{trackLabel}</h3>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{subject.units.length} units</span>
                    {subject.notesUrl && (
                      <span className="text-muted-foreground/60">·</span>
                    )}
                    {subject.notesUrl && (
                      <Link
                        href={subject.notesUrl}
                        className="text-primary hover:underline font-medium"
                      >
                        Notes →
                      </Link>
                    )}
                  </div>
                </div>
              </div>

              {/* Units */}
              <div className="divide-y divide-border/40">
                {subject.units.map((unit, unitIndex) => (
                  <div key={unit.id} className="px-5 py-4">
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
                          {unitIndex + 1}
                        </span>
                        <h4 className="font-semibold text-foreground text-sm truncate">
                          {unit.title}
                        </h4>
                      </div>
                      {unit.hours !== undefined && (
                        <span className="shrink-0 text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                          {unit.hours} hrs
                        </span>
                      )}
                    </div>
                    {unit.topics.length > 0 && (
                      <ul className="mt-2 ml-8 space-y-1">
                        {unit.topics.map((topic, topicIndex) => (
                          <li
                            key={topicIndex}
                            className="text-xs text-muted-foreground leading-relaxed flex items-start gap-2"
                          >
                            <span className="shrink-0 mt-0.5 h-1 w-1 rounded-full bg-primary/40" />
                            <span className="line-clamp-2">{topic}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>

              {/* Track footer */}
              <div className="px-5 py-2.5 border-t border-border/40 bg-muted/30 flex items-center justify-between text-xs text-muted-foreground">
                <span>
                  {subject.units.reduce((sum, u) => sum + (u.hours ?? 0), 0)} total teaching hours
                </span>
                <span className="font-mono text-[10px] text-muted-foreground/60">
                  {subject.units.length} units
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
