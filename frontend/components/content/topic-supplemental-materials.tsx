import { Calculator, FileQuestion, LineChart, ListChecks, NotebookPen, Lightbulb, BookOpen } from "lucide-react";
import { MathMarkdown } from "@/components/content/math-markdown";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { SupplementalEntry } from "@/lib/content/topic-supplemental";
import type { ContentKind } from "@/lib/content/paths";

/**
 * TOPIC / UNIT SUPPLEMENTAL MATERIAL
 *
 * The classified corpus holds more per-topic JSON than the canonical concept
 * note: study guides, formula sheets, practice sets, worked examples, past-year
 * questions and graph data. Each family was listed in `content/manifest.json`
 * and rendered nowhere. This surface puts those files on the page they were
 * authored for — the topic they name, or the unit page when the file names no
 * exact topic — through the same MathMarkdown pipeline as every other note
 * surface, so `$…$` math, tables and emphasis render properly instead of being
 * dumped as JSON.
 *
 * The selection runs on the server (`lib/content/topic-supplemental`), so a page
 * ships only the handful of entries that belong to it, not the whole manifest.
 */

const KIND_META: Record<
  Extract<ContentKind, "guides" | "formula" | "sets" | "examples" | "pyqs" | "graph">,
  { label: string; icon: typeof BookOpen; tint: string }
> = {
  guides: { label: "Study guide", icon: NotebookPen, tint: "text-violet-500" },
  examples: { label: "Worked example", icon: Lightbulb, tint: "text-amber-500" },
  sets: { label: "Practice set", icon: ListChecks, tint: "text-emerald-500" },
  pyqs: { label: "Past-year question", icon: FileQuestion, tint: "text-sky-500" },
  formula: { label: "Formula sheet", icon: Calculator, tint: "text-rose-500" },
  graph: { label: "Graph", icon: LineChart, tint: "text-teal-500" },
};

function list(value: unknown): string[] {
  const items = Array.isArray(value) ? value : typeof value === "string" ? [value] : [];
  return items.filter((item): item is string => typeof item === "string" && item.trim().length > 0);
}

function text(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

/** The authored graph metadata, shown as the caption the file describes. */
function GraphCaption({ graph }: { graph: unknown }) {
  if (!graph || typeof graph !== "object") return null;
  const spec = graph as Record<string, unknown>;
  const axis = (label: unknown, unit: unknown) =>
    [text(label), text(unit) && `(${text(unit)})`].filter(Boolean).join(" ");
  const rows = [
    ["X axis", axis(spec.xLabel, spec.xUnit)],
    ["Y axis", axis(spec.yLabel, spec.yUnit)],
    ["Curve", text((spec.curve as Record<string, unknown> | undefined)?.type)],
    ["Peak", text((spec.peak as Record<string, unknown> | undefined)?.label)],
  ].filter(([, value]) => value);

  if (rows.length === 0) return null;
  return (
    <dl className="grid grid-cols-[6rem_1fr] gap-x-3 gap-y-1 rounded-xl border border-border/60 bg-muted/20 px-4 py-3 text-xs">
      {rows.map(([label, value]) => (
        <div key={label} className="contents">
          <dt className="font-semibold text-muted-foreground">{label}</dt>
          <dd className="text-foreground">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Every authored field of one entry, in reading order. */
function EntryBody({ entry }: { entry: SupplementalEntry }) {
  const { data, kind } = entry;
  const summary = text(data.summary);
  const detail = text(data.detail);
  const notes = list(data.notes);
  const formulas = list(data.formulas);
  const keyPoints = list(data.keyPoints);
  const practiceQuestions = list(data.practiceQuestions);
  const confusion = list(data.confusion);

  return (
    <div className="space-y-3">
      {summary && <MathMarkdown content={summary} className="text-sm" />}
      {notes.map((note, index) => (
        <MathMarkdown key={`note-${index}`} content={note} className="text-sm leading-relaxed" />
      ))}

      {formulas.length > 0 && (
        <div className="space-y-2 rounded-xl border border-rose-500/20 bg-rose-500/[0.04] p-3">
          <p className="text-[10px] font-bold uppercase tracking-wider text-rose-500">Formulas</p>
          {formulas.map((formula, index) => (
            <MathMarkdown key={`formula-${index}`} content={formula} className="text-sm" />
          ))}
        </div>
      )}

      {keyPoints.length > 0 && (
        <div>
          <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            Key points
          </p>
          <ul className="space-y-1.5">
            {keyPoints.map((point, index) => (
              <li key={`key-${index}`} className="flex items-start gap-2 text-sm">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <MathMarkdown content={point} className="min-w-0 flex-1 text-sm [&_p]:my-0" />
              </li>
            ))}
          </ul>
        </div>
      )}

      {practiceQuestions.length > 0 && (
        <div>
          <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            Practice questions
          </p>
          <ol className="space-y-1.5">
            {practiceQuestions.map((question, index) => (
              <li key={`question-${index}`} className="flex items-start gap-2 text-sm">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
                  {index + 1}
                </span>
                <MathMarkdown content={question} className="min-w-0 flex-1 text-sm [&_p]:my-0" />
              </li>
            ))}
          </ol>
        </div>
      )}

      {confusion.length > 0 && (
        <div className="space-y-1.5 rounded-xl border border-amber-500/25 bg-amber-500/[0.05] p-3">
          <p className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            Common confusion
          </p>
          {confusion.map((item, index) => (
            <MathMarkdown key={`confusion-${index}`} content={item} className="text-sm" />
          ))}
        </div>
      )}

      {detail && <MathMarkdown content={detail} className="text-sm" />}
      {kind === "graph" && <GraphCaption graph={data.graph} />}
    </div>
  );
}

function EntryCard({ entry }: { entry: SupplementalEntry }) {
  const meta = KIND_META[entry.kind as keyof typeof KIND_META];
  if (!meta) return null;
  const Icon = meta.icon;

  return (
    <Card className="border-border/70">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Icon className={`h-4 w-4 shrink-0 ${meta.tint}`} />
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            {meta.label}
          </span>
        </div>
        <CardTitle className="text-sm leading-snug sm:text-base">{entry.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <EntryBody entry={entry} />
      </CardContent>
    </Card>
  );
}

export function TopicSupplementalMaterials({
  entries,
  scope = "topic",
}: {
  entries: SupplementalEntry[];
  scope?: "topic" | "unit";
}) {
  if (entries.length === 0) return null;

  const heading = scope === "topic" ? "More material for this topic" : "More material for this unit";
  const description =
    scope === "topic"
      ? "Authored guides, worked examples, practice sets, past-year questions, formula sheets and graphs filed under this topic."
      : "Authored guides, worked examples, practice sets, past-year questions, formula sheets and graphs filed for this unit.";

  return (
    <section aria-labelledby="supplemental-material-heading" className="space-y-4">
      <div>
        <h2 id="supplemental-material-heading" className="text-lg font-bold tracking-tight">
          {heading}
        </h2>
        <p className="mt-1 text-xs text-muted-foreground">
          {description} <span className="text-muted-foreground/70">({entries.length})</span>
        </p>
      </div>
      <div className="grid gap-4">
        {entries.map((entry) => (
          <EntryCard key={entry.path} entry={entry} />
        ))}
      </div>
    </section>
  );
}
