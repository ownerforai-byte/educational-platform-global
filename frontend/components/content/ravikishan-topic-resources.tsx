"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, BookOpen } from "lucide-react";
import { loadData } from "@/lib/data-loader";
import { selectCanonicalNoteEntry } from "@/lib/note-routes";
import { Card, CardContent } from "@/components/ui/card";

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

export function RavikishanTopicResources({
  classSlug,
  subjectSlug,
  unitId,
  topicSlug,
}: Props) {
  const [entry, setEntry] = useState<ManifestEntry>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    loadData<ManifestEntry[]>(`syllabus-notes/${subjectSlug}/_manifest.json`)
      .then((manifest) => {
        if (cancelled) return;
        const matches = manifest.filter(
          (item) =>
            item.unitSlug === unitId &&
            (item.topicSlug === topicSlug || item.filename.includes(topicSlug)),
        );
        setEntry(selectCanonicalNoteEntry(matches));
      })
      .catch(() => {
        if (!cancelled) setEntry(undefined);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [subjectSlug, unitId, topicSlug]);

  if (loading) {
    return (
      <div role="status" aria-live="polite" className="rounded-xl border border-border/60 p-4">
        <p className="text-sm text-muted-foreground">Locating the canonical topic notes…</p>
      </div>
    );
  }

  if (!entry) return null;

  const href = `/${classSlug}/${subjectSlug}/chapters/${unitId}/topics/${topicSlug}#topic-notes`;
  const source = entry.source === "ravikishan" ? "Ravikishan" : "R-Export";

  return (
    <Card data-testid="canonical-topic-source" className="border-primary/20">
      <CardContent className="flex flex-wrap items-center justify-between gap-4 p-5">
        <div className="flex min-w-0 items-start gap-3">
          <BookOpen className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <div>
            <p className="text-sm font-semibold">Canonical notes · {entry.title}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {source} · {entry.noteCount} notes, presented once on this topic.
            </p>
          </div>
        </div>
        <Link
          href={href}
          className="inline-flex min-h-10 items-center gap-1.5 rounded-xl border border-border/70 px-4 text-xs font-semibold text-primary transition-colors hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Open canonical notes
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </CardContent>
    </Card>
  );
}
