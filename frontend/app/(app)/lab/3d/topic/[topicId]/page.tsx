"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Cuboid, Tags } from "lucide-react";
import Topic3DScene from "@/components/lab/topics/[topicId]/topics-3d";
import { getTopicVisualKeyword, TOPIC_VISUALS } from "@/components/lab/topic-visual-mapping";
import { getVisualSchema } from "@/components/lab/visual-schema";

function titleFromSlug(slug: string): string {
  return slug
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function matchSubject(slug: string, title: string): { subject: string; keyword: string } | null {
  for (const subject of Object.keys(TOPIC_VISUALS)) {
    const keyword = getTopicVisualKeyword(slug, title, subject);
    if (keyword) return { subject, keyword };
  }
  return null;
}

export default function Topic3DGalleryPage() {
  const params = useParams();
  const topicId = String(params?.topicId ?? "");
  const title = titleFromSlug(topicId);
  const schema = getVisualSchema(topicId, title);
  const match = matchSubject(topicId, title);

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-8 md:py-12">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight flex items-center gap-3">
            <span className="inline-flex h-10 w-10 rounded-2xl bg-blue-500/10 items-center justify-center">
              <Cuboid className="h-5 w-5 text-blue-500" />
            </span>
            {title} — Topic Gallery
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground max-w-2xl">
            An interactive 3D gallery scene for this topic — drag with the mouse to rotate the
            camera, scroll to zoom.
          </p>
        </div>
        <Link
          href="/lab/3d"
          className="rounded-xl border border-border bg-card px-4 py-2 text-sm font-medium hover:border-primary/40 transition-colors inline-flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          All 3D Labs
        </Link>
      </div>

      <Topic3DScene />

      <section className="elev-2 rounded-2xl border border-border bg-card p-5">
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <Tags className="h-4 w-4 text-primary" />
          Visual mapping
        </h2>
        {schema ? (
          <div className="mt-3 space-y-2">
            <p className="text-sm font-medium">{schema.title}</p>
            <p className="text-sm text-muted-foreground">{schema.subtitle}</p>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                {schema.diagramType}
              </span>
              {match && (
                <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  {match.subject} · {match.keyword}
                </span>
              )}
            </div>
          </div>
        ) : (
          <p className="mt-3 text-sm text-muted-foreground">
            No schematic mapping for this slug yet — the gallery scene still renders above.
          </p>
        )}
      </section>
    </div>
  );
}
