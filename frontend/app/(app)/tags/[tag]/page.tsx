import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Tag, FileText, ChevronRight } from "lucide-react";
import { SYLLABUS } from "@/lib/syllabus";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag } = await params;
  return {
    title: `#${tag}`,
    description: `All content tagged with ${tag}.`,
  };
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const tagLabel = tag.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  // Find topics across the syllabus that match the tag
  const matches = SYLLABUS.flatMap((cls) =>
    cls.subjects.flatMap((subj) =>
      subj.units.flatMap((unit) =>
        unit.topics
          .filter((t) =>
            t.toLowerCase().includes(tag.toLowerCase()),
          )
          .map((t) => ({
            topic: t,
            subject: subj.name,
            subjectSlug: subj.slug,
            classSlug: cls.slug,
            className: cls.name,
            unit: unit.title,
            unitId: unit.id,
            href: `/${cls.slug}/${subj.slug}`,
          })),
      ),
    ),
  );

  return (
    <div className="mx-auto max-w-3xl space-y-8 py-10 px-4">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Tag className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">#{tag}</h1>
          <p className="mt-1 text-muted-foreground">
            All notes, questions and resources tagged with &quot;{tagLabel}&quot;.
          </p>
        </div>
      </div>

      {matches.length > 0 ? (
        <div>
          <h2 className="mb-3 text-sm font-semibold text-muted-foreground">
            {matches.length} result{matches.length > 1 ? "s" : ""} found
          </h2>
          <div className="space-y-2">
            {matches.map((m, i) => (
              <Link
                key={i}
                href={m.href}
                className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 shadow-sm transition-colors hover:bg-muted/50"
              >
                <FileText className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">
                    {m.topic}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {m.subject} — {m.className} • Unit: {m.unit}
                  </p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-border bg-muted/40 p-6 text-center">
          <p className="text-sm text-muted-foreground">
            No content found tagged with &quot;{tagLabel}&quot;. Try searching
            instead.
          </p>
          <Link
            href="/search"
            className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            Search the platform →
          </Link>
        </div>
      )}

      <Link
        href="/search"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Search
      </Link>
    </div>
  );
}
