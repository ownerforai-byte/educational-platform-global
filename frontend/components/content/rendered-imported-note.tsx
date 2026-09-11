import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MathMarkdown } from "@/components/content/math-markdown";
import { StatusBadge } from "@/components/content/status-badge";
import { NOTE_STATUS, getNoteStatus } from "@/lib/content/note-status";
import { loadData } from "@/lib/data-loader";

type RavikishanIndexEntry = {
  title?: string;
  notes?: string[] | string;
};

type RExportManifestItem = {
  subject: string;
  chapter: string;
  id: string;
  title: string;
  notes: string[];
};

function baseName(p: string) {
  return p.split(/[\\/]/).pop()?.replace(/\.json$/, "") ?? p;
}

async function getRavikishanNote(sourcePath: string) {
  const safe = sourcePath.replace(/\\/g, "/").replace(/^\/+/, "").replace(/^(\.\.\/)+/, "");
  const index = await loadData<Record<string, RavikishanIndexEntry>>("ravikishan/_index.json");
  const data = index[safe];
  if (!data) return null;
  const title = data.title ?? baseName(sourcePath);
  const notes = Array.isArray(data.notes) ? data.notes : typeof data.notes === "string" ? [data.notes] : [];
  return { title, notes, source: "ravikishan" as const };
}

async function getRExportEntry(subject: string, chapterPath: string) {
  // chapterPath is `${subject}/${chapter}/${id}` (see buildImportedNotes)
  const [, chapter, id] = chapterPath.split("/");
  const manifest = await loadData<RExportManifestItem[]>("r-export/manifest.json");
  const entry = manifest.find(
    (item) => item.subject === subject && item.chapter === chapter && item.id === id,
  );
  if (!entry) return null;
  return { ...entry, source: "r-export" as const };
}

function renderInlineNotes(notes: string[]) {
  return notes.map((note, idx) => (
    <div key={idx} className="rounded-xl border border-border bg-muted/20 p-5 backdrop-blur-sm">
      <MathMarkdown content={note} className="space-y-3" />
    </div>
  ));
}

type LoadedNote = {
  title: string;
  notes: string[];
  source: "ravikishan" | "r-export";
};

export async function RenderedImportedNote({ note }: { note: { title: string; path: string; subject: string; unit?: string; target: string; source: "ravikishan" | "r-export" } }) {
  let data: LoadedNote | null;

  try {
    data = note.source === "ravikishan"
      ? await getRavikishanNote(note.path)
      : await getRExportEntry(note.subject, note.path);
  } catch (error) {
    console.error(`RenderedImportedNote: failed to load "${note.path}"`, error);
    return <BrokenNoteCard title={note.title} />;
  }

  if (!data) {
    // Listed in the manifest but missing from the runtime index — out-of-sync
    // build artifacts, which is a broken state, not a missing page.
    console.error(`RenderedImportedNote: "${note.path}" not found in index — run npm run content:build`);
    return <BrokenNoteCard title={note.title} />;
  }
  const status = getNoteStatus(data);

  if (status === NOTE_STATUS.EMPTY) {
    return (
      <Card className="card border-primary/20 bg-background/80 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between gap-4">
            <CardTitle className="text-base leading-snug">{data.title}</CardTitle>
            <StatusBadge status={status} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-dashed border-border bg-muted/30 px-6 py-6 text-center text-sm text-muted-foreground">
            This note has no content yet.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="card card-hover border-primary/20 bg-background/80 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-4">
          <CardTitle className="text-base leading-snug">{data.title}</CardTitle>
          <span className="shrink-0 rounded-full border border-border bg-muted/50 px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
            {data.source === "ravikishan" ? "Ravikishan" : "R Export"}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {renderInlineNotes(data.notes)}
      </CardContent>
    </Card>
  );
}

function BrokenNoteCard({ title }: { title: string }) {
  return (
    <Card className="border-red-500/40 bg-background/80 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-4">
          <CardTitle className="text-base leading-snug">{title}</CardTitle>
          <StatusBadge status={NOTE_STATUS.BROKEN} />
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          This note exists but could not be loaded or rendered. Verify its JSON
          parses and re-run <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-xs">npm run content:build</code>.
        </p>
      </CardContent>
    </Card>
  );
}
