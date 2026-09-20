"use client";

import { useEffect, useMemo, useState } from "react";
import { loadData } from "@/lib/data-loader";
import { MathMarkdown } from "@/components/content/math-markdown";
import { EmptyState } from "./empty-state";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calculator,
  CheckCircle2,
  AlertTriangle,
  Zap,
  AlertCircle,
  Pencil,
  Globe2,
  Link2,
  StickyNote,
  Lightbulb,
  ScrollText,
  ListChecks,
  Target,
  FileQuestion,
  BookMarked,
  ClipboardList,
  Brain,
  PanelTop,
} from "lucide-react";

type McqItem = {
  question: string;
  options: string[];
  answer: string;
};

type ConceptData = {
  title?: string;
  unitSlug?: string;
  topicSlug?: string;
  formulas?: string[];
  numericals?: string[];
  bounds?: string[];
  confusion?: string[];
  examShortTricks?: string[];
  specialNotes?: string[];
  practice?: string[];
  universalFacts?: string[];
  related?: string[];
  keyPoints?: string[];
  importantNotes?: string[];
  importantConcepts?: string[];
  importantStatements?: string[];
  importantTasks?: string[];
  summary?: string;
  examNotes?: string[];
  practiceQuestions?: string[];
  examples?: string[];
  mcs?: McqItem[];
};

type ManifestEntry = {
  path: string;
  data: ConceptData & { notes?: string[] };
};

/**
 * Public alias of the 2D panel's concept shape, so showcase pages (Tasks 4–7)
 * can pass the manifest entry straight into `ConceptKnowledgeGrid`.
 */
export type RavikishanConceptData = ConceptData;

/** Public alias of a single manifest row. */
export type RavikishanManifestEntry = ManifestEntry;

type Props = {
  classSlug: string;
  subjectSlug: string;
  unitId: string;
  topicSlug: string;
  topicTitle?: string;
};

function useTopicConcept(props: Props): {
  data: ConceptData | null;
  loading: boolean;
} {
  const [state, setState] = useState<{ data: ConceptData | null; loading: boolean }>({
    data: null,
    loading: true,
  });

  useEffect(() => {
    let cancelled = false;
    setState({ data: null, loading: true });

    loadData<ManifestEntry[]>("ravikishan/manifest.json")
      .then((manifest) => {
        if (cancelled) return;
        const match = manifest.find((m) => {
          const parts = m.path.split("/");
          if (parts.length < 5) return false;
          const [cls, subj, unit] = [parts[0], parts[1], parts[2]];
          if (cls !== props.classSlug || subj !== props.subjectSlug) return false;
          if (unit !== props.unitId) return false;
          if (parts[3] !== "concepts") return false;
          return m.data?.topicSlug === props.topicSlug;
        });
        const entry =
          match ??
          manifest.find((m) => {
            const parts = m.path.split("/");
            return (
              parts[0] === props.classSlug &&
              parts[1] === props.subjectSlug &&
              parts[2] === props.unitId &&
              parts[3] === "concepts"
            );
          });
        if (cancelled) return;
        setState({ data: entry ? entry.data : null, loading: false });
      })
      .catch(() => {
        if (!cancelled) setState({ data: null, loading: false });
      });

    return () => {
      cancelled = true;
    };
  }, [props.classSlug, props.subjectSlug, props.unitId, props.topicSlug]);

  return state;
}

type FieldDef = {
  key: keyof ConceptData;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  tone: string;
  headerTone: string;
};

const KNOWLEDGE_FIELDS: FieldDef[] = [
  {
    key: "formulas",
    label: "Formulas",
    icon: Calculator,
    tone: "border-blue-200 dark:border-blue-800 bg-blue-50/40 dark:bg-blue-950/20",
    headerTone: "text-blue-700 dark:text-blue-400",
  },
  {
    key: "keyPoints",
    label: "Key Points",
    icon: CheckCircle2,
    tone: "border-green-200 dark:border-green-800 bg-green-50/40 dark:bg-green-950/20",
    headerTone: "text-green-700 dark:text-green-400",
  },
  {
    key: "confusion",
    label: "Confusions (❌→✅)",
    icon: AlertTriangle,
    tone: "border-amber-200 dark:border-amber-800 bg-amber-50/40 dark:bg-amber-950/20",
    headerTone: "text-amber-700 dark:text-amber-400",
  },
  {
    key: "examShortTricks",
    label: "Exam Short Tricks",
    icon: Zap,
    tone: "border-purple-200 dark:border-purple-800 bg-purple-50/40 dark:bg-purple-950/20",
    headerTone: "text-purple-700 dark:text-purple-400",
  },
  {
    key: "specialNotes",
    label: "Special Notes",
    icon: AlertCircle,
    tone: "border-red-200 dark:border-red-800 bg-red-50/40 dark:bg-red-950/20",
    headerTone: "text-red-700 dark:text-red-400",
  },
  {
    key: "numericals",
    label: "Numericals (Drill)",
    icon: Pencil,
    tone: "border-teal-200 dark:border-teal-800 bg-teal-50/40 dark:bg-teal-950/20",
    headerTone: "text-teal-700 dark:text-teal-400",
  },
  {
    key: "universalFacts",
    label: "Universal Facts",
    icon: Globe2,
    tone: "border-indigo-200 dark:border-indigo-800 bg-indigo-50/40 dark:bg-indigo-950/20",
    headerTone: "text-indigo-700 dark:text-indigo-400",
  },
  {
    key: "related",
    label: "Related Topics",
    icon: Link2,
    tone: "border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-950/20",
    headerTone: "text-slate-700 dark:text-slate-400",
  },
  {
    key: "importantNotes",
    label: "Important Notes",
    icon: StickyNote,
    tone: "border-orange-200 dark:border-orange-800 bg-orange-50/40 dark:bg-orange-950/20",
    headerTone: "text-orange-700 dark:text-orange-400",
  },
  {
    key: "importantConcepts",
    label: "Important Concepts",
    icon: Brain,
    tone: "border-cyan-200 dark:border-cyan-800 bg-cyan-50/40 dark:bg-cyan-950/20",
    headerTone: "text-cyan-700 dark:text-cyan-400",
  },
  {
    key: "importantStatements",
    label: "Important Statements",
    icon: ScrollText,
    tone: "border-emerald-200 dark:border-emerald-800 bg-emerald-50/40 dark:bg-emerald-950/20",
    headerTone: "text-emerald-700 dark:text-emerald-400",
  },
  {
    key: "importantTasks",
    label: "Important Tasks",
    icon: ListChecks,
    tone: "border-fuchsia-200 dark:border-fuchsia-800 bg-fuchsia-50/40 dark:bg-fuchsia-950/20",
    headerTone: "text-fuchsia-700 dark:text-fuchsia-400",
  },
  {
    key: "bounds",
    label: "Bounds & Limits",
    icon: Target,
    tone: "border-violet-200 dark:border-violet-800 bg-violet-50/40 dark:bg-violet-950/20",
    headerTone: "text-violet-700 dark:text-violet-400",
  },
  {
    key: "practiceQuestions",
    label: "Practice Qs",
    icon: FileQuestion,
    tone: "border-sky-200 dark:border-sky-800 bg-sky-50/40 dark:bg-sky-950/20",
    headerTone: "text-sky-700 dark:text-sky-400",
  },
  {
    key: "practice",
    label: "Practice (Solved)",
    icon: ClipboardList,
    tone: "border-lime-200 dark:border-lime-800 bg-lime-50/40 dark:bg-lime-950/20",
    headerTone: "text-lime-700 dark:text-lime-400",
  },
  {
    key: "examples",
    label: "Worked Examples",
    icon: Lightbulb,
    tone: "border-yellow-200 dark:border-yellow-800 bg-yellow-50/40 dark:bg-yellow-950/20",
    headerTone: "text-yellow-700 dark:text-yellow-400",
  },
  {
    key: "examNotes",
    label: "Exam Tips",
    icon: BookMarked,
    tone: "border-rose-200 dark:border-rose-800 bg-rose-50/40 dark:bg-rose-950/20",
    headerTone: "text-rose-700 dark:text-rose-400",
  },
  {
    key: "mcs",
    label: "MCQs",
    icon: PanelTop,
    tone: "border-stone-200 dark:border-stone-800 bg-stone-50/40 dark:bg-stone-950/20",
    headerTone: "text-stone-700 dark:text-stone-400",
  },
];

const FIELD_ORDER: (keyof ConceptData)[] = KNOWLEDGE_FIELDS.map((f) => f.key);

function FieldCard({
  def,
  items,
  emptyHint,
}: {
  def: FieldDef;
  items: string[] | McqItem[] | string | undefined;
  emptyHint?: boolean;
}) {
  const Icon = def.icon;
  const isEmpty =
    items === undefined ||
    items === null ||
    (Array.isArray(items) && items.length === 0) ||
    (typeof items === "string" && items.trim().length === 0);

  return (
    <Card className={`${def.tone} border overflow-hidden`}>
      <div className="px-3 py-2 flex items-center gap-2 border-b border-black/5 dark:border-white/5">
        <Icon className={`h-3.5 w-3.5 ${def.headerTone}`} />
        <span className={`text-xs font-bold ${def.headerTone}`}>{def.label}</span>
        {Array.isArray(items) && items.length > 0 && (
          <Badge
            variant="secondary"
            className="ml-auto text-[10px] h-4 px-1.5 bg-background/50 text-muted-foreground"
          >
            {items.length}
          </Badge>
        )}
      </div>
      <div className="p-2.5">
        {isEmpty ? (
          <div className="text-[11px] text-muted-foreground/70 italic flex items-start gap-1.5 border border-dashed border-muted-foreground/20 rounded-md p-2 bg-background/30">
            <AlertCircle className="h-3 w-3 shrink-0 mt-0.5 text-muted-foreground/50" />
            <span>
              Empty — populate <code className="font-mono text-[10px] bg-muted px-1 rounded">{def.key}</code> when adding content
            </span>
          </div>
        ) : typeof items === "string" ? (
          <div className="text-xs leading-relaxed">
            <MathMarkdown content={items} />
          </div>
        ) : def.key === "mcs" ? (
          <ol className="space-y-2">
            {(items as McqItem[]).map((mc, i) => (
              <li key={i} className="text-xs space-y-1 rounded border border-border/40 p-2 bg-background/40">
                <p className="font-medium">
                  {i + 1}. {mc.question}
                </p>
                <ol className="pl-4 space-y-0.5 text-[11px] text-muted-foreground">
                  {mc.options.map((opt, j) => (
                    <li key={j}>
                      {String.fromCharCode(65 + j)}. {opt}
                    </li>
                  ))}
                </ol>
                <p className="text-[11px] font-semibold text-green-700 dark:text-green-400">
                  Ans: {mc.answer}
                </p>
              </li>
            ))}
          </ol>
        ) : (
          <ul className="space-y-1">
            {(items as string[]).map((it, i) => (
              <li key={i} className="flex gap-1.5 text-xs leading-relaxed">
                <span
                  className={`shrink-0 font-bold mt-[2px] w-4 text-right text-[10px] ${def.headerTone}`}
                >
                  {i + 1}.
                </span>
                <span>
                  <MathMarkdown content={it} />
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Card>
  );
}

export function ConceptKnowledgeGrid({ data }: { data: ConceptData }) {
  const populatedCount = useMemo(() => {
    return KNOWLEDGE_FIELDS.filter((f) => {
      const v = data[f.key];
      return (
        v !== undefined &&
        v !== null &&
        !(Array.isArray(v) && v.length === 0) &&
        !(typeof v === "string" && v.trim().length === 0)
      );
    }).length;
  }, [data]);

  const sortedFields = useMemo(() => {
    return [...KNOWLEDGE_FIELDS].sort((a, b) => {
      const aEmpty =
        data[a.key] === undefined ||
        data[a.key] === null ||
        (Array.isArray(data[a.key]) && (data[a.key] as unknown[]).length === 0) ||
        (typeof data[a.key] === "string" && (data[a.key] as string).trim().length === 0);
      const bEmpty =
        data[b.key] === undefined ||
        data[b.key] === null ||
        (Array.isArray(data[b.key]) && (data[b.key] as unknown[]).length === 0) ||
        (typeof data[b.key] === "string" && (data[b.key] as string).trim().length === 0);
      if (aEmpty !== bEmpty) return aEmpty ? 1 : -1;
      return FIELD_ORDER.indexOf(a.key) - FIELD_ORDER.indexOf(b.key);
    });
  }, [data]);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Brain className="h-4 w-4 text-primary" />
          <p className="text-xs font-semibold text-foreground">
            Knowledge Field Coverage
          </p>
        </div>
        <Badge
          variant="outline"
          className={`text-[11px] ${
            populatedCount >= 15
              ? "border-green-300 text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-950/30"
              : populatedCount >= 10
              ? "border-amber-300 text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30"
              : "border-red-300 text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-950/30"
          }`}
        >
          {populatedCount} / {KNOWLEDGE_FIELDS.length} fields populated
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2.5">
        {sortedFields.map((def) => (
          <FieldCard
            key={def.key}
            def={def}
            items={
              def.key === "summary"
                ? (data.summary as string)
                : (data[def.key] as string[] | McqItem[] | undefined)
            }
          />
        ))}
      </div>

      {data.summary && (
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 via-background to-background">
          <div className="px-3 py-2 flex items-center gap-2 border-b border-border/50">
            <BookMarked className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-bold text-primary">Topic Summary</span>
          </div>
          <div className="p-3 text-xs leading-relaxed">
            <MathMarkdown content={data.summary} />
          </div>
        </Card>
      )}
    </div>
  );
}

export function FormulaPanel(props: Props) {
  const { data, loading } = useTopicConcept(props);
  const formulas = useMemo(() => data?.formulas ?? [], [data]);

  if (loading)
    return <p className="text-sm text-muted-foreground">Loading formula sheet…</p>;
  if (!data)
    return (
      <EmptyState
        title="No concept data yet"
        description={`Knowledge panels for ${
          props.topicTitle ?? props.topicSlug
        } will appear here once the concept JSON is seeded with all 18 fields.`}
      />
    );

  const hasAnyFormulas = formulas.length > 0 || (data.bounds?.length ?? 0) > 0;

  return (
    <div className="space-y-5">
      {hasAnyFormulas && (
        <Card className="border-primary/30 bg-background/80">
          <div className="px-4 py-2.5 flex items-center gap-2 border-b border-border/60">
            <Calculator className="h-4 w-4 text-primary" />
            <span className="text-sm font-bold text-primary">
              Formula Sheet
            </span>
            <Badge variant="secondary" className="ml-auto text-[11px]">
              {formulas.length} formula{formulas.length !== 1 ? "s" : ""} · state each with unit and limit
            </Badge>
          </div>
          <div className="p-3.5">
            <ol className="space-y-2">
              {formulas.length === 0 && (
                <li className="text-xs text-muted-foreground italic border border-dashed border-muted-foreground/20 rounded-md p-2">
                  ⚠ No formulas yet — populate <code className="font-mono bg-muted px-1 rounded text-[10px]">formulas</code> when adding content
                </li>
              )}
              {formulas.map((f, i) => (
                <li
                  key={i}
                  className="rounded-lg border border-border/60 bg-muted/20 p-2.5 text-sm"
                >
                  <span className="mr-2 font-bold text-primary">{i + 1}.</span>
                  <MathMarkdown content={f} />
                </li>
              ))}
            </ol>
          </div>
        </Card>
      )}

      <ConceptKnowledgeGrid data={data} />
    </div>
  );
}

export function NumericalPanel(props: Props) {
  const { data, loading } = useTopicConcept(props);
  const numericals = useMemo(() => data?.numericals ?? [], [data]);

  if (loading)
    return <p className="text-sm text-muted-foreground">Loading problems…</p>;
  if (!data)
    return (
      <EmptyState
        title="No concept data yet"
        description={`Drill problems and practice panels for ${
          props.topicTitle ?? props.topicSlug
        } will appear here once the concept JSON is seeded.`}
      />
    );

  const hasAnyNumericals = numericals.length > 0 || (data.practice?.length ?? 0) > 0 || (data.practiceQuestions?.length ?? 0) > 0;

  return (
    <div className="space-y-5">
      {hasAnyNumericals && (
        <Card className="border-primary/30 bg-background/80">
          <div className="px-4 py-2.5 flex items-center gap-2 border-b border-border/60">
            <Pencil className="h-4 w-4 text-primary" />
            <span className="text-sm font-bold text-primary">
              Numericals / Drill Problems
            </span>
            <Badge variant="secondary" className="ml-auto text-[11px]">
              {numericals.length} drill problem{numericals.length !== 1 ? "s" : ""}
            </Badge>
          </div>
          <div className="p-3.5">
            <ol className="space-y-2.5 list-none">
              {numericals.length === 0 && (
                <li className="text-xs text-muted-foreground italic border border-dashed border-muted-foreground/20 rounded-md p-2">
                  ⚠ No numericals yet — populate <code className="font-mono bg-muted px-1 rounded text-[10px]">numericals</code> when adding content
                </li>
              )}
              {numericals.map((n, i) => (
                <li
                  key={i}
                  className="rounded-lg border border-border/60 bg-muted/20 p-2.5 text-sm"
                >
                  <span className="mr-2 font-bold text-primary">{i + 1}.</span>
                  <MathMarkdown content={n} />
                </li>
              ))}
            </ol>
          </div>
        </Card>
      )}

      <ConceptKnowledgeGrid data={data} />
    </div>
  );
}
