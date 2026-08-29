import Link from "next/link";
import { CLASS_TRACKS, CORE_SUBJECTS } from "@/features/knowledge/data";

const SUBJECT_EMOJI: Record<string, string> = {
  Biology: "🌿",
  Chemistry: "🧪",
  English: "📖",
  Mathematics: "🔢",
  Nepali: "🇳🇵",
  Physics: "⚡",
};

export default function SubjectsPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-8 py-8 md:py-14 px-4">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">📚 Subjects</h1>
        <p className="text-muted-foreground">
          All six NEB subjects. Open a subject in any class track — each page starts with the official syllabus.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CORE_SUBJECTS.map((subject) => (
          <div key={subject.slug} className="rounded-2xl border border-border/60 bg-card p-5 transition-all hover:border-primary/30 hover:shadow-lg card-shimmer">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-xl">
                {SUBJECT_EMOJI[subject.name] ?? "📘"}
              </div>
              <h2 className="font-semibold text-foreground text-base">{subject.name}</h2>
            </div>
            <div className="space-y-1.5">
              {CLASS_TRACKS.map((track) => (
                <Link
                  key={track.slug}
                  href={`/${track.slug}/${subject.slug}`}
                  className="block rounded-lg border border-border/60 px-3 py-2 text-sm text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                >
                  {track.name}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
