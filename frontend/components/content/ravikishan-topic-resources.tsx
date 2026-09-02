"use client";

import { useEffect, useState } from "react";
import { loadData } from "@/lib/data-loader";
import { MathMarkdown } from "@/components/content/math-markdown";
import { EmptyState } from "./empty-state";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

/* ============================================================
   RavikishanTopicResources — loads notes from syllabus-notes
   and shows duplicate sources as tabs (Type 1 / Type 2 / Type 3).
   ============================================================ */

type SourceEntry = {
  notes: string[];
  confusion?: string[];
  practice?: string[];
  universalFacts?: string[];
};

type ManifestEntry = {
  unitSlug: string;
  topicSlug: string;
  title: string;
  noteCount: number;
  source: "ravikishan" | "r-export";
  duplicateType?: number;
  filename: string;
};

type Props = {
  classSlug: string;
  subjectSlug: string;
  unitId: string;
  topicSlug: string;
};

function NoteCard({ content }: { content: string }) {
  return (
    <div className="rounded-xl border border-border bg-muted/20 p-5">
      <MathMarkdown content={content} className="space-y-3" />
    </div>
  );
}

function SectionBadges({ entry }: { entry: ManifestEntry }) {
  const typeLabel = (entry.duplicateType ?? 1) === 1
    ? "Original"
    : `Duplicate #${(entry.duplicateType ?? 1) - 1}`;
  const typeColor = (entry.duplicateType ?? 1) === 1
    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
    : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
  const sourceBadge = entry.source === "ravikishan"
    ? "Ravikishan"
    : "R-Export";
  return (
    <div className="flex flex-wrap gap-2 mb-3">
      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${typeColor}`}>
        Type {entry.duplicateType ?? 1} ({typeLabel})
      </span>
      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-muted text-muted-foreground">
        {sourceBadge}
      </span>
      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-muted text-muted-foreground">
        {entry.noteCount} notes
      </span>
    </div>
  );
}

function renderContent(entry: ManifestEntry, data: SourceEntry) {
  return (
    <Card key={`${entry.source}-${entry.duplicateType}`.replace("undefined","")} className="border-primary/20 bg-background/80 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-base leading-snug">{entry.title}</CardTitle>
        <SectionBadges entry={entry} />
      </CardHeader>
      <CardContent className="space-y-4">
        {data.notes.map((note, idx) => (
          <NoteCard key={idx} content={note} />
        ))}
        {data.confusion && data.confusion.length > 0 && (
          <div className="rounded-xl border border-amber-200 bg-amber-50/50 dark:bg-amber-950/20 p-4">
            <p className="text-sm font-semibold text-amber-700 dark:text-amber-400 mb-2">
              Common Confusions
            </p>
            <ul className="space-y-1 text-sm text-muted-foreground">
              {data.confusion.map((c, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-amber-500 shrink-0">⚠</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        {data.practice && data.practice.length > 0 && (
          <div className="rounded-xl border border-blue-200 bg-blue-50/50 dark:bg-blue-950/20 p-4">
            <p className="text-sm font-semibold text-blue-700 dark:text-blue-400 mb-2">
              Practice
            </p>
            <ul className="space-y-1 text-sm text-muted-foreground">
              {data.practice.map((p, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-blue-500 shrink-0">→</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        {data.universalFacts && data.universalFacts.length > 0 && (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 dark:bg-emerald-950/20 p-4">
            <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400 mb-2">
              Key Facts
            </p>
            <ul className="space-y-1 text-sm text-muted-foreground">
              {data.universalFacts.map((f, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-emerald-500 shrink-0">★</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function RavikishanTopicResources({
  classSlug,
  subjectSlug,
  unitId,
  topicSlug,
}: Props) {
  const [entries, setEntries] = useState<ManifestEntry[]>([]);
  const [dataMap, setDataMap] = useState<Map<string, SourceEntry>>(new Map());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    // Load manifest for this subject
    const manifestPath = `syllabus-notes/${subjectSlug}/_manifest.json`;
    loadData<Array<{ unitSlug: string; topicSlug: string; title: string; noteCount: number; source: "ravikishan" | "r-export"; duplicateType?: number; filename: string }>>(manifestPath)
      .then((manifest) => {
        if (cancelled) return;
        // Filter to matching unit + topic
        const relevant = manifest.filter(
          (m) => m.unitSlug === unitId && m.topicSlug === topicSlug
        );
        if (relevant.length === 0) {
          setError("No notes found for this topic");
          setLoading(false);
          return;
        }
        setEntries(relevant);

        // Load each source file
        const loaded = new Map<string, SourceEntry>();
        const promises = relevant.map(async (entry) => {
          try {
            const data = await loadData<SourceEntry>(
              `syllabus-notes/${subjectSlug}/${unitId}/${entry.filename}`
            );
            if (!cancelled) loaded.set(`${entry.source}-${entry.duplicateType ?? 1}`, data);
          } catch {
            // skip missing files
          }
        });
        return Promise.all(promises).then(() => {
          if (!cancelled) {
            setDataMap(loaded);
            setLoading(false);
          }
        });
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : String(err));
          setLoading(false);
        }
      });

    return () => { cancelled = true; };
  }, [subjectSlug, unitId, topicSlug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-sm text-muted-foreground">Loading notes…</p>
      </div>
    );
  }

  if (error || entries.length === 0) {
    return (
      <EmptyState
        title="No Notes Available"
        description="There are no ravikishan-sourced notes for this topic yet."
      />
    );
  }

  // Sort by duplicateType (1 first, then 2, 3…)
  const sorted = [...entries].sort((a, b) => (a.duplicateType ?? 1) - (b.duplicateType ?? 1));

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
        <h2 className="text-xl font-bold tracking-tight">
          Notes
          {sorted.length > 1 && (
            <span className="ml-2 text-sm font-normal text-muted-foreground">
              ({sorted.length} source{sorted.length > 1 ? "s" : ""})
            </span>
          )}
        </h2>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      {sorted.length === 1 ? (
        // Single source — render directly
        renderContent(sorted[0], dataMap.get(`${sorted[0].source}-${sorted[0].duplicateType ?? 1}`) ?? { notes: [] })
      ) : (
        // Multiple sources — show tabs
        <Tabs defaultValue={`${sorted[0].source}-${sorted[0].duplicateType ?? 1}`} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            {sorted.map((entry, i) => {
              const typeNum = entry.duplicateType ?? 1;
              const label = typeNum === 1 ? "Type 1 (Original)" : `Type ${typeNum} (Duplicated)`;
              return (
                <TabsTrigger key={`${entry.source}-${typeNum}`} value={`${entry.source}-${typeNum}`} className="text-xs">
                  {label}
                </TabsTrigger>
              );
            })}
          </TabsList>
          {sorted.map((entry) => {
            const typeNum = entry.duplicateType ?? 1;
            const data = dataMap.get(`${entry.source}-${typeNum}`);
            return (
              <TabsContent key={`${entry.source}-${typeNum}`} value={`${entry.source}-${typeNum}`}>
                {data ? renderContent(entry, data) : (
                  <EmptyState title="Content loading failed" description="Could not load this source's notes." />
                )}
              </TabsContent>
            );
          })}
        </Tabs>
      )}
    </div>
  );
}
