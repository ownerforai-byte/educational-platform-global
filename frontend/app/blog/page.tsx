import type { Metadata } from "next";
import Link from "next/link";
import { PublicPage } from "@/components/platform/public-page";
import { guides } from "@/lib/platform-content";
export const metadata: Metadata = { title: "Study Journal & Guides | Ravikisan's Platform", description: "Practical guides to NEB study routines, past-paper practice, and responsible learning with Veer." };
export default function BlogPage() {
  return <PublicPage current="/blog" eyebrow="The study journal" title="Better habits. More deliberate practice." intro="Practical reading for the work between lessons: planning your week, learning from mistakes, and using AI without handing over the thinking.">
    <section aria-labelledby="guides-title"><h2 id="guides-title" className="mb-5 text-2xl font-bold">Start with these guides</h2><div className="grid gap-5 md:grid-cols-3">{guides.map((guide, i) => <article key={guide.slug} className="flex flex-col rounded-2xl border border-border bg-card p-6"><p className="text-xs font-semibold uppercase tracking-widest text-primary">0{i + 1} / {guide.category}</p><h3 className="mt-5 text-xl font-bold leading-8"><Link href={`/blog/${guide.slug}`} className="rounded focus-visible:ring-2 focus-visible:ring-ring hover:text-primary">{guide.title}</Link></h3><p className="mb-6 mt-4 flex-1 text-sm leading-7 text-muted-foreground">{guide.summary}</p><Link href={`/blog/${guide.slug}`} className="inline-flex min-h-11 items-center rounded font-semibold text-primary focus-visible:ring-2 focus-visible:ring-ring" aria-label={`Read: ${guide.title}`}>Read the full guide →</Link></article>)}</div></section>
    <p className="rounded-xl border border-border bg-muted/20 p-5 text-sm leading-7 text-muted-foreground">These are platform study guides, not official examination notices. No publication cadence or new examination announcement is implied. For exam information, use the <Link href="/neb-updates" className="text-primary underline">NEB Updates verification guide</Link>.</p>
  </PublicPage>;
}
