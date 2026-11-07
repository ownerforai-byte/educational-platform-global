import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BookOpen, FileQuestion, FlaskConical, ChevronRight, Search } from "lucide-react";
import { SYLLABUS } from "@/lib/syllabus";

export const revalidate = 86_400;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ topicSlug: string }>;
}): Promise<Metadata> {
  const { topicSlug } = await params;
  const title = topicSlug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
  return { title, description: `All notes, formulas, PYQs and labs for ${title}.` };
}

export default async function TopicLandingPage({
  params,
}: {
  params: Promise<{ topicSlug: string }>;
}) {
  const { topicSlug } = await params;
  const title = topicSlug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  // Search for this topic across the syllabus
  const matches = SYLLABUS.flatMap((cls) =>
    cls.subjects.flatMap((subj) =>
      subj.units.flatMap((unit) =>
        unit.topics
          .filter(
            (t) =>
              t.toLowerCase().includes(topicSlug.toLowerCase()) ||
              topicSlug.toLowerCase().includes(t.toLowerCase()),
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
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <p className="mt-2 text-muted-foreground">
          Canonical topic page: notes, formulas, PYQs and related labs for{" "}
          {title}.
        </p>
      </div>

      {matches.length > 0 ? (
        <>
          <div>
            <h2 className="mb-3 text-sm font-semibold text-muted-foreground">
              Found in {matches.length} location{matches.length > 1 ? "s" : ""}
            </h2>
            <div className="space-y-2">
              {matches.map((m, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-border bg-card p-4 shadow-sm"
                >
                  <p className="font-medium text-foreground">{m.topic}</p>
                  <p className="text-sm text-muted-foreground">
                    {m.subject} — {m.className} • Unit: {m.unit}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Link
                      href={m.href}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                    >
                      <BookOpen className="h-3.5 w-3.5" />
                      Notes
                    </Link>
                    <Link
                      href={`/quiz/${m.subjectSlug}/${m.unitId}`}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                    >
                      <FileQuestion className="h-3.5 w-3.5" />
                      Quiz
                    </Link>
                    <Link
                      href={`/class-${m.classSlug.includes("11") ? "11" : "12"}-notes/${m.subjectSlug}/pyqs`}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                    >
                      <ChevronRight className="h-3.5 w-3.5" />
                      PYQs
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Related labs */}
          <div>
            <h2 className="mb-3 text-sm font-semibold text-muted-foreground">
              Related labs
            </h2>
            <Link
              href="/lab/3d"
              className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-sm transition-colors hover:bg-muted/50"
            >
              <FlaskConical className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-foreground">
                Browse 3D labs and simulations
              </span>
              <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground" />
            </Link>
          </div>
        </>
      ) : (
        <div className="rounded-2xl border border-border bg-muted/40 p-6 text-center">
          <Search className="mx-auto h-6 w-6 text-muted-foreground" />
          <p className="mt-2 text-sm text-muted-foreground">
            No direct match found for &quot;{title}&quot;. Try searching the
            platform for related content.
          </p>
          <Link
            href="/search"
            className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            Search →
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
