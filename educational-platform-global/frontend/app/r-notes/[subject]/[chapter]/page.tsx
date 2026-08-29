import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BackButton } from "@/components/navigation/back-button";
import { loadData } from "@/lib/data-loader";

type ManifestItem = {
  subject: string;
  chapter: string;
  id: string;
  title: string;
  notes: string[];
};

function decodeParam(v: string) {
  return decodeURIComponent(v);
}




export default async function RNoteChapterPage({ params }: { params: Promise<{ subject: string; chapter: string }> }) {
  const { subject, chapter } = await params;
  const _decodedSubject = decodeParam(subject);
  const _decodedChapter = decodeParam(chapter);

  const manifest = await loadData<ManifestItem[]>("r-export/manifest.json");
  const entries = manifest.filter((item) => item.subject === subject && item.chapter === chapter);

  if (entries.length === 0) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6 py-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight capitalize">{subject} — {chapter}</h1>
          <p className="text-xs text-muted-foreground mt-1">
            {entries.length} entries
          </p>
        </div>
        <BackButton />
      </div>

      {entries.map((entry) => (
        <Card key={entry.id}>
          <CardHeader>
            <CardTitle>{entry.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {entry.notes.map((note, idx) => (
                <div
                  key={idx}
                  className="prose prose-invert max-w-none rounded-xl border border-border bg-muted/20 p-4"
                  dangerouslySetInnerHTML={{ __html: note }}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}


