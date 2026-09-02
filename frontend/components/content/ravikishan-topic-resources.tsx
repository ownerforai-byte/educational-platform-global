"use client";

import { useEffect, useState } from "react";
import { loadData } from "@/lib/data-loader";
import { MathMarkdown } from "@/components/content/math-markdown";
import { EmptyState } from "./empty-state";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type TopicData = {
  title: string;
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

function ConfusionSection({ items }: { items: string[] }) {
  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50/50 dark:bg-amber-950/20 p-4">
      <p className="text-sm font-semibold text-amber-700 dark:text-amber-400 mb-2">
        Common Confusions
      </p>
      <ul className="space-y-1 text-sm text-muted-foreground">
        {items.map((c, i) => (
          <li key={i} className="flex gap-2">
            <span className="text-amber-500 shrink-0">⚠</span>
            <span>{c}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PracticeSection({ items }: { items: string[] }) {
  return (
    <div className="rounded-xl border border-blue-200 bg-blue-50/50 dark:bg-blue-950/20 p-4">
      <p className="text-sm font-semibold text-blue-700 dark:text-blue-400 mb-2">
        Practice
      </p>
      <ul className="space-y-1 text-sm text-muted-foreground">
        {items.map((p, i) => (
          <li key={i} className="flex gap-2">
            <span className="text-blue-500 shrink-0">→</span>
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function UniversalFactsSection({ items }: { items: string[] }) {
  return (
    <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 dark:bg-emerald-950/20 p-4">
      <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400 mb-2">
        Key Facts
      </p>
      <ul className="space-y-1 text-sm text-muted-foreground">
        {items.map((f, i) => (
          <li key={i} className="flex gap-2">
            <span className="text-emerald-500 shrink-0">★</span>
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function RavikishanTopicResources({
  classSlug,
  subjectSlug,
  unitId,
  topicSlug,
}: Props) {
  const [data, setData] = useState<TopicData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    // Load manifest to resolve the correct filename for this topicSlug
    const relPath = `syllabus-notes/biology/_manifest.json`;
    loadData<ManifestEntry[]>(relPath)
      .then((manifest) => {
        if (cancelled) return;
        const entry = manifest.find(
          (m) => m.unitSlug === unitId && m.topicSlug === topicSlug
        );
        if (!entry) {
          setError("Topic not found in manifest");
          setLoading(false);
          return;
        }
        // Load the actual topic data using the filename from manifest
        const dataPath = `syllabus-notes/biology/${unitId}/${entry.filename}`;
        return loadData<TopicData>(dataPath).then((result) => {
          if (!cancelled) {
            setData(result);
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

    return () => {
      cancelled = true;
    };
  }, [unitId, topicSlug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-sm text-muted-foreground">Loading notes…</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <EmptyState
        title="No Notes Available"
        description="There are no ravikishan-sourced notes for this topic yet."
      />
    );
  }

  if (data.notes.length === 0) {
    return (
      <EmptyState
        title="No Notes Available"
        description="This topic has no note content from ravikishan."
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
        <h2 className="text-xl font-bold tracking-tight">Ravikishan Notes</h2>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      <Card className="border-primary/20 bg-background/80 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base leading-snug">{data.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.notes.map((note, idx) => (
            <NoteCard key={idx} content={note} />
          ))}

          {data.confusion && data.confusion.length > 0 && (
            <ConfusionSection items={data.confusion} />
          )}

          {data.practice && data.practice.length > 0 && (
            <PracticeSection items={data.practice} />
          )}

          {data.universalFacts && data.universalFacts.length > 0 && (
            <UniversalFactsSection items={data.universalFacts} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
