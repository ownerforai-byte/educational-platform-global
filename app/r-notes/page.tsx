import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { loadData } from "@/lib/data-loader";

export const runtime = "edge";

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
    <div className="mx-auto max-w-6xl space-y-8 py-10">
      <div className="rounded-2xl border border-border bg-gradient-to-br from-primary/10 via-background to-background p-8 shadow-lg">
        <h1 className="text-4xl font-bold tracking-tight">R Notes</h1>
        <p className="mt-2 text-muted-foreground">
          Imported R export notes organized by subject and chapter.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {Object.entries(bySubject).map(([subject, chapters]) => (
          <Card key={subject}>
            <CardHeader>
              <CardTitle className="text-base capitalize">{subject}</CardTitle>
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
    </div>
  );
}
