"use client";

import { useEffect, useMemo, useState } from "react";
import { loadData } from "@/lib/data-loader";
import { MathMarkdown } from "@/components/content/math-markdown";
import { EmptyState } from "./empty-state";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * Loads the generated concept for a topic from ravikishan/manifest.json and
 * renders the Formulas / Numericals / Bounds panels. Used by the topic page's
 * previously-empty "Formulas" and "Numericals" tabs.
 */

type ConceptData = {
  title?: string;
  unitSlug?: string;
  topicSlug?: string;
  formulas?: string[];
  numericals?: string[];
  bounds?: string[];
  confusion?: string[];
};

type ManifestEntry = {
  path: string;
  data: ConceptData & { notes?: string[] };
};

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
        // Match the generated concept: <class>/<subject>/<unit>/concepts/<NN>-<slug>.json
        const match = manifest.find((m) => {
          const parts = m.path.split("/");
          if (parts.length < 5) return false;
          const [cls, subj, unit] = [parts[0], parts[1], parts[2]];
          if (cls !== props.classSlug || subj !== props.subjectSlug) return false;
          if (unit !== props.unitId) return false;
          if (parts[3] !== "concepts") return false;
          // Prefer an exact topicSlug hit; fall back to any concept in this unit.
          return m.data?.topicSlug === props.topicSlug;
        });
        // If no exact topic match, fall back to any concept entry in the unit.
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

function BulletList({ items, mark, tone }: { items: string[]; mark: string; tone: string }) {
  return (
    <ul className="space-y-2">
      {items.map((it, i) => (
        <li key={i} className={`flex gap-2 text-sm ${tone}`}>
          <span className="shrink-0 font-semibold">{mark}</span>
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

export function FormulaPanel(props: Props) {
  const { data, loading } = useTopicConcept(props);
  const formulas = useMemo(() => data?.formulas ?? [], [data]);

  if (loading) return <p className="text-sm text-muted-foreground">Loading formulas…</p>;
  if (!formulas.length)
    return (
      <EmptyState
        title="No formula sheet yet"
        description={`Formula sheets for ${props.topicTitle ?? props.topicSlug} will appear here once the topic is seeded.`}
      />
    );

  return (
    <div className="space-y-4">
      <Card className="border-primary/20 bg-background/80">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Formula Sheet</CardTitle>
          <p className="text-xs text-muted-foreground mt-0.5">
            {formulas.length} formula{formulas.length > 1 ? "s" : ""} · state each with its unit and limit
          </p>
        </CardHeader>
        <CardContent>
          <ol className="space-y-2">
            {formulas.map((f, i) => (
              <li key={i} className="rounded-lg border border-border bg-muted/20 p-3 text-sm">
                <MathMarkdown content={`${i + 1}. ${f}`} />
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>
      {data?.bounds?.length ? (
        <div className="rounded-xl border border-violet-200 bg-violet-50/50 dark:bg-violet-950/20 p-4">
          <p className="text-sm font-semibold text-violet-700 dark:text-violet-300 mb-2">
            Boundary &amp; Limit
          </p>
          <BulletList items={data.bounds} mark="⌖" tone="text-muted-foreground" />
        </div>
      ) : null}
    </div>
  );
}

export function NumericalPanel(props: Props) {
  const { data, loading } = useTopicConcept(props);
  const numericals = useMemo(() => data?.numericals ?? [], [data]);

  if (loading) return <p className="text-sm text-muted-foreground">Loading problems…</p>;
  if (!numericals.length)
    return (
      <EmptyState
        title="No practice problems yet"
        description={`Numericals for ${props.topicTitle ?? props.topicSlug} will appear here once the topic is seeded.`}
      />
    );

  return (
    <div className="space-y-4">
      <Card className="border-primary/20 bg-background/80">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Numericals / Practice</CardTitle>
          <p className="text-xs text-muted-foreground mt-0.5">
            {numericals.length} drill problem{numericals.length > 1 ? "s" : ""}
          </p>
        </CardHeader>
        <CardContent>
          <ol className="space-y-3 list-none">
            {numericals.map((n, i) => (
              <li key={i} className="rounded-lg border border-border bg-muted/20 p-3 text-sm">
                <span className="mr-2 font-semibold text-primary">{i + 1}.</span>
                <MathMarkdown content={n} />
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>
      {data?.confusion?.length ? (
        <div className="rounded-xl border border-amber-200 bg-amber-50/50 dark:bg-amber-950/20 p-4">
          <p className="text-sm font-semibold text-amber-700 dark:text-amber-400 mb-2">
            One-line fixes (❌ → ✅)
          </p>
          <ul className="space-y-2">
            {data.confusion.map((c, i) => (
              <li key={i} className="text-sm text-muted-foreground">
                {c}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
