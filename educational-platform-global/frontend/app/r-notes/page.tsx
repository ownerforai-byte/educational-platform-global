import Link from "next/link";
import { loadData } from "@/lib/data-loader";

const SUBJECT_EMOJI: Record<string, string> = {
  Biology: "🌿",
  Chemistry: "🧪",
  English: "📖",
  Mathematics: "🔢",
  Nepali: "🇳🇵",
  Physics: "⚡",
  "General Knowledge": "💡",
  Geography: "🌍",
  History: "📜",
  Environment: "🌲",
};

type ManifestItem = {
  subject: string;
  chapter: string;
  id: string;
  title: string;
  notes?: string[];
};

export default async function RNotesPage() {
  const manifest = await loadData<ManifestItem[]>("r-export/manifest.json");

  const bySubject: Record<string, Array<{ chapter: string; id: string; title: string; noteCount: number }>> = {};

  for (const item of manifest) {
    if (!bySubject[item.subject]) bySubject[item.subject] = [];
    bySubject[item.subject].push({
      chapter: item.chapter,
      id: item.id,
      title: item.title,
      noteCount: item.notes?.length ?? 0,
    });
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8 py-8 md:py-14 px-4">
      <div className="rounded-2xl border border-border/60 bg-gradient-to-br from-primary/8 via-background to-background p-8 md:p-10 shadow-lg">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">📒 R Notes</h1>
        <p className="mt-2 text-muted-foreground">
          Imported R export notes organized by subject and chapter.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {Object.entries(bySubject).map(([subject, chapters]) => (
          <div key={subject} className="rounded-2xl border border-border/60 bg-card overflow-hidden">
            <div className="px-5 py-4 border-b border-border/60 bg-muted/30">
              <h2 className="font-semibold text-base capitalize">{SUBJECT_EMOJI[subject] ?? "📘"} {subject}</h2>
            </div>
            <div className="p-4 space-y-2">
              {chapters.map((chapter) => (
                <Link
                  key={chapter.id}
                  href={`/r-notes/${encodeURIComponent(subject)}/${encodeURIComponent(chapter.chapter)}`}
                  className="block rounded-lg border border-border/60 px-3 py-2 text-sm hover:border-primary transition-colors"
                >
                  <span className="font-medium">{chapter.title}</span>
                  <span className="ml-2 text-xs text-muted-foreground">({chapter.noteCount} notes)</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
