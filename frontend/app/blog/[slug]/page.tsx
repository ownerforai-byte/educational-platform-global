import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PublicPage } from "@/components/platform/public-page";
import { guides } from "@/lib/platform-content";
type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return guides.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = guides.find(item => item.slug === slug);
  return guide ? { title: `${guide.title} | Ravikisan's Platform`, description: guide.summary } : { title: "Guide not found", robots: { index: false } };
}
export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = guides.find(item => item.slug === slug);
  if (!guide) notFound();
  return <PublicPage current="/blog" eyebrow={guide.category} title={guide.title} intro={guide.summary}>
    <div className="grid items-start gap-8 lg:grid-cols-[14rem_1fr]">
      <nav aria-label="In this guide" className="rounded-2xl border border-border bg-card p-5"><h2 className="font-bold">In this guide</h2><ol className="mt-4 space-y-3 text-sm leading-6">{guide.sections.map((section, i) => <li key={section.title}><a href={`#part-${i + 1}`} className="rounded text-muted-foreground hover:text-primary focus-visible:ring-2 focus-visible:ring-ring">{section.title}</a></li>)}</ol></nav>
      <article className="max-w-3xl space-y-10">{guide.sections.map((section, i) => <section key={section.title} id={`part-${i + 1}`} className="scroll-mt-8"><h2 className="text-2xl font-bold leading-9">{section.title}</h2>{section.paragraphs.map(text => <p key={text} className="mt-4 text-base leading-8 text-muted-foreground">{text}</p>)}</section>)}<Link href="/blog" className="inline-flex min-h-11 items-center rounded-lg font-semibold text-primary focus-visible:ring-2 focus-visible:ring-ring">← All study guides</Link></article>
    </div>
  </PublicPage>;
}
