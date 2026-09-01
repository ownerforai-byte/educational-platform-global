import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BackButton } from "@/components/navigation/back-button";
import { notFound } from "next/navigation";
import { loadData } from "@/lib/data-loader";
import { UnderDevelopment } from "@/components/content/under-development";
import { Lightbulb, AlertTriangle, PenTool, Sparkles, ExternalLink } from "lucide-react";
import Link from "next/link";
import { MotionGraphics } from "@/components/lab/motion-graphics";

type RavikishanIndexEntry = {
  title?: string;
  notes?: string[] | string;
  type?: string;
  dupType?: number;
  graph?: unknown;
  confusion?: string[];
  practice?: string[];
  universalFacts?: string[];
  animation3D?: string;
  motionGraphics?: string;
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

function renderBlock(title: string, items: string[] | undefined, Icon: React.ComponentType<{ className?: string }>, colorClass: string) {
  if (!items || items.length === 0) return null;
  return (
    <Card className="border-border/60 bg-background/50">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Icon className={`h-5 w-5 ${colorClass}`} />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm">
              <span className={`mt-1.5 h-1.5 w-1.5 rounded-full ${colorClass.replace("text-", "bg-")}`} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
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

      <div className="grid gap-4 md:grid-cols-2">
        {renderBlock("Common Confusion", data.confusion, AlertTriangle, "text-red-400")}
        {renderBlock("Practice", data.practice, PenTool, "text-emerald-400")}
      </div>

      {renderBlock("Universal Facts", data.universalFacts, Sparkles, "text-amber-400")}

      {data.motionGraphics && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-emerald-400" />
              Motion Graphics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <MotionGraphics topic={data.motionGraphics} />
          </CardContent>
        </Card>
      )}

      {(data.animation3D || data.motionGraphics) && (
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-aqua-400" />
              Interactive Visual
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex flex-wrap gap-2">
              {data.animation3D && (
                <Link href={`/lab?topic=${encodeURIComponent(data.animation3D)}`} className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary hover:bg-primary/20 transition-colors">
                  <span>3D Animation</span>
                  <ExternalLink className="h-3 w-3" />
                </Link>
              )}
              {data.motionGraphics && (
                <Link href={`/lab?motion=${encodeURIComponent(data.motionGraphics)}`} className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400 hover:bg-emerald-500/20 transition-colors">
                  <span>Motion Graphics</span>
                  <ExternalLink className="h-3 w-3" />
                </Link>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Click above to open the interactive visualization in the Lab.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}


