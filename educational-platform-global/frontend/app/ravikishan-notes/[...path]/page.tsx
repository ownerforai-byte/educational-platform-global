import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BackButton } from "@/components/navigation/back-button";
import { notFound } from "next/navigation";
import { loadData } from "@/lib/data-loader";
import { UnderDevelopment } from "@/components/content/under-development";

type RavikishanIndexEntry = {
  title?: string;
  notes?: string[] | string;
  type?: string;
  dupType?: number;
  graph?: unknown;
};

function renderNotes(notes: string[]) {
  return notes.map((note, idx) => {
    const lines = note.split("\n");
    return (
      <div key={idx} className="prose prose-invert max-w-none">
        {lines.map((line, i) => {
          if (line.startsWith("**") && line.endsWith("**")) {
            return <p key={i} className="font-semibold">{line.replace(/\*\*/g, "")}</p>;
          }
          if (line.startsWith("- ")) {
            return <li key={i}>{line.replace(/^- /, "")}</li>;
          }
          if (line.startsWith("### ")) {
            return <h3 key={i} className="text-lg font-semibold mt-4">{line.replace(/^### /, "")}</h3>;
          }
          if (line.startsWith("> ")) {
            return <blockquote key={i} className="border-l-2 border-aqua-400/60 bg-white/5 rounded-r-lg pl-4">{line.replace(/^> /, "")}</blockquote>;
          }
          if (line.startsWith("$") && line.endsWith("$")) {
            return <div key={i} className="rounded-xl border-aqua-400/30 bg-aqua-400/10 px-4 py-2 text-center my-2">{line}</div>;
          }
          if (line.trim().length === 0) {
            return <br key={i} />;
          }
          return <p key={i}>{line}</p>;
        })}
      </div>
    );
  });
}

export default async function RavikishanNotePage({ params }: { params: Promise<{ path: string[] }> }) {
  const { path: pathSegments } = await params;
  const relPath = pathSegments.join("/");
  const key = pathSegments.join("/");
  const index = await loadData<Record<string, RavikishanIndexEntry>>("ravikishan/_index.json");
  const data = index[key];

  if (!data) {
    notFound();
  }

  const title = data.title ?? key.split("/").pop()?.replace(/\.json$/, "") ?? key;
  const notes = Array.isArray(data.notes) ? data.notes : [];

  return (
    <div className="mx-auto max-w-5xl space-y-6 py-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          <p className="text-xs text-muted-foreground mt-1">
            {relPath} • Type: {data.type ?? "note"} • DupType: {data.dupType ?? 1}
          </p>
        </div>
        <BackButton />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Notes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {notes.length === 0 ? (
            <UnderDevelopment />
          ) : (
            renderNotes(notes)
          )}
        </CardContent>
      </Card>

      {data.graph ? (
        <Card>
          <CardHeader>
            <CardTitle>Graph</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="text-xs bg-muted/50 p-4 rounded-lg overflow-auto">
              {JSON.stringify(data.graph, null, 2)}
            </pre>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}


