import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { loadData } from "@/lib/data-loader";

const SUBJECT_EMOJI: Record<string, string> = {
  "11/Biology": "🌿",
  "11/Chemistry": "🧪",
  "11/English": "📖",
  "11/Mathematics": "🔢",
  "11/Nepali": "🇳🇵",
  "11/Physics": "⚡",
  "12/Biology": "🌿",
  "12/Chemistry": "🧪",
  "12/English": "📖",
  "12/Mathematics": "🔢",
  "12/Nepali": "🇳🇵",
  "12/Physics": "⚡",
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

type RExportManifestItem = {
  subject: string;
  chapter: string;
  id: string;
  title: string;
  notes?: string[];
};

type RavikishanManifestItem = {
  path: string;
  data: { title?: string };
  dupType?: number;
};

const baseName = (p: string) => p.split(/[\\/]/).pop()?.replace(/\.json$/, "") ?? p;

export default async function NotesPage() {
  const [rManifest, rkManifest] = await Promise.all([
    loadData<RExportManifestItem[]>("r-export/manifest.json"),
    loadData<RavikishanManifestItem[]>("ravikishan/manifest.json"),
  ]);

  const rBySubject: Record<string, Array<{ chapter: string; id: string; title: string; noteCount: number }>> = {};
  for (const item of rManifest) {
    if (!rBySubject[item.subject]) rBySubject[item.subject] = [];
    rBySubject[item.subject].push({
      chapter: item.chapter,
      id: item.id,
      title: item.title,
      noteCount: item.notes?.length ?? 0,
    });
  }

  const rkBySubject: Record<string, Array<{ path: string; title: string; dupType: number }>> = {};
  for (const item of rkManifest) {
    const [section, subject] = item.path.split("/");
    const key = `${section}/${subject}`;
    if (!rkBySubject[key]) rkBySubject[key] = [];
    rkBySubject[key].push({
      path: item.path,
      title: item.data.title ?? baseName(item.path),
      dupType: item.dupType ?? 1,
    });
  }

  return (
    <div className="mx-auto max-w-6xl space-y-10 py-8 md:py-14 px-4">
      <div className="rounded-2xl border border-border bg-gradient-to-br from-primary/10 via-background to-background p-8 shadow-lg">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">📚 Notes</h1>
        <p className="mt-2 text-muted-foreground">
          Imported notes from Ravikishan&apos;s export, organized by class, subject, and chapter.
        </p>
      </div>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight">📒 R Export Notes</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {Object.entries(rBySubject).map(([subject, chapters]) => (
            <Card key={subject}>
              <CardHeader>
                <CardTitle className="text-base">{SUBJECT_EMOJI[subject] ?? "📘"} {subject}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {chapters.map((chapter) => (
                    <Link
                      key={chapter.id}
                      href={`/r-notes/${encodeURIComponent(subject)}/${encodeURIComponent(chapter.chapter)}`}
                      className="block rounded-md border border-border px-3 py-2 text-sm hover:border-primary transition-colors"
                    >
                      <span className="font-medium">{chapter.title}</span>
                      <span className="ml-2 text-xs text-muted-foreground">({chapter.noteCount} notes)</span>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight">📚 Ravikishan Notes</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {Object.entries(rkBySubject).map(([key, items]) => (
            <Card key={key}>
              <CardHeader>
                <CardTitle className="text-base">{SUBJECT_EMOJI[key] ?? "📘"} {key}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {items.map((item) => {
                    const href = `/ravikishan-notes/${encodeURIComponent(item.path)}`;
                    const dupLabel = item.dupType > 1 ? ` (Type-${item.dupType})` : "";
                    return (
                      <Link
                        key={item.path}
                        href={href}
                        className="block rounded-md border border-border px-3 py-2 text-sm hover:border-primary transition-colors"
                      >
                        <span className="font-medium">{item.title}</span>
                        {dupLabel && <span className="ml-2 text-xs text-muted-foreground">{dupLabel}</span>}
                      </Link>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
