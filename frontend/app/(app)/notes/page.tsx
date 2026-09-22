import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { loadData } from "@/lib/data-loader";
import { SubjectSearch } from "@/components/layout/subject-search";
import { getImportedNotesBySubject } from "@/lib/imported-notes";
import { noteRoute } from "@/lib/note-routes";
import { FlaskConical, ArrowRight, Sparkles, Zap, BookOpen } from "lucide-react";

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
  data: { title?: string; unitSlug?: string };
  dupType?: number;
};

const baseName = (p: string) => p.split(/[\\/]/).pop()?.replace(/\.json$/, "") ?? p;

export default async function NotesPage() {
  const [rManifest, rkManifest, importedMap] = await Promise.all([
    loadData<RExportManifestItem[]>("r-export/manifest.json"),
    loadData<RavikishanManifestItem[]>("ravikishan/manifest.json"),
    getImportedNotesBySubject(),
  ]);

  const searchSubjects = Object.keys(importedMap).map((slug) => ({
    slug,
    name: slug.charAt(0).toUpperCase() + slug.slice(1),
  }));

  const initialGroups = Object.entries(importedMap).map(([subject, notes]) => ({
    subject,
    notes,
  }));

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

  const rkBySubject: Record<string, Array<{ path: string; title: string; unit?: string; dupType: number }>> = {};
  for (const item of rkManifest) {
    const [section, subject] = item.path.split("/");
    const key = `${section}/${subject}`;
    if (!rkBySubject[key]) rkBySubject[key] = [];
    rkBySubject[key].push({
      path: item.path,
      title: item.data.title ?? baseName(item.path),
      unit: item.data.unitSlug,
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
            <Link href="/practical/physics" className="px-2.5 py-1 rounded-lg bg-sky-500/15 text-sky-600 dark:text-sky-400 hover:bg-sky-500/25 transition-colors">
              ⚡ Physics Practical
            </Link>
            <Link href="/practical/chemistry" className="px-2.5 py-1 rounded-lg bg-amber-500/15 text-amber-600 dark:text-amber-400 hover:bg-amber-500/25 transition-colors">
              🧪 Chemistry Practical
            </Link>
            <Link href="/practical/biology" className="px-2.5 py-1 rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/25 transition-colors">
              🌿 Biology Practical
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
          <span>🔍 Quick Search & Filter Notes</span>
        </h2>
        <SubjectSearch subjects={searchSubjects} initialGroups={initialGroups} />
      </section>

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
                      // Legacy /r-notes/{subject}/{chapter} was removed; send
                      // readers to the subject hub that renders these notes.
                      href={noteRoute({
                        title: chapter.title,
                        path: `${subject}/${chapter.chapter}/${chapter.id}`,
                        subject,
                        target: "class-11-notes",
                        source: "r-export",
                      })}
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
                    // Legacy /ravikishan-notes/{path} was removed; route to the
                    // matching curriculum chapter (or subject hub).
                    const [section, subject] = item.path.split("/");
                    const href = noteRoute({
                      title: item.title,
                      path: item.path,
                      subject,
                      unit: item.unit,
                      target: section === "class-12" || section === "class-12-notes" ? "class-12-notes" : "class-11-notes",
                      source: "ravikishan",
                    });
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
