import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PublicPage } from "@/components/platform/public-page";
import { JsonLd } from "@/components/platform/json-ld";
import { guides } from "@/lib/platform-content";
import { CANONICAL_SITE_URL } from "@/lib/site-url";
type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return guides.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = guides.find(item => item.slug === slug);
  if (!guide) return { title: "Guide not found", robots: { index: false } };
  return {
    title: `${guide.title} | Ravikisan's Platform`,
    description: guide.description,
    keywords: guide.tags,
    alternates: { canonical: `/blog/${guide.slug}` },
    openGraph: {
      type: "article",
      title: guide.title,
      description: guide.description,
      url: `/blog/${guide.slug}`,
      siteName: "Ravikisan's Platform",
      publishedTime: guide.updated,
      modifiedTime: guide.updated,
    },
  };
}
export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = guides.find(item => item.slug === slug);
  if (!guide) notFound();
  const base = CANONICAL_SITE_URL.replace(/\/+$/, "");
  const url = `${base}/blog/${guide.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline: guide.title,
        description: guide.description,
        inLanguage: "en",
        isAccessibleForFree: true,
        datePublished: guide.updated,
        dateModified: guide.updated,
        keywords: guide.tags.join(", "),
        author: { "@type": "Organization", name: "Ravikisan's Platform", url: base },
        publisher: { "@type": "Organization", name: "Ravikisan's Platform", url: base },
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        about: guide.tags.map((tag) => ({ "@type": "Thing", name: tag })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${base}/` },
          { "@type": "ListItem", position: 2, name: "Study Journal", item: `${base}/blog` },
          { "@type": "ListItem", position: 3, name: guide.title, item: url },
        ],
      },
    ],
  };
  return <PublicPage current="/blog" eyebrow={guide.category} title={guide.title} intro={guide.summary}>
    <JsonLd data={jsonLd} />
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
      <span>Reviewed {guide.updated}</span>
      <span aria-hidden="true">·</span>
      <span>Independent study guide — not official NEB material</span>
      <span className="flex flex-wrap gap-2">{guide.tags.map((tag) => <span key={tag} className="rounded-full bg-muted px-2 py-0.5">{tag}</span>)}</span>
    </div>
    <p className="rounded-xl border border-border bg-muted/20 p-5 text-sm leading-7 text-muted-foreground">{guide.description}</p>
    <div className="grid items-start gap-8 lg:grid-cols-[14rem_1fr]">
      <nav aria-label="In this guide" className="rounded-2xl border border-border bg-card p-5"><h2 className="font-bold">In this guide</h2><ol className="mt-4 space-y-3 text-sm leading-6">{guide.sections.map((section, i) => <li key={section.title}><a href={`#part-${i + 1}`} className="rounded text-muted-foreground hover:text-primary focus-visible:ring-2 focus-visible:ring-ring">{section.title}</a></li>)}</ol></nav>
      <article className="max-w-3xl space-y-10">{guide.sections.map((section, i) => <section key={section.title} id={`part-${i + 1}`} className="scroll-mt-8"><h2 className="text-2xl font-bold leading-9">{section.title}</h2>{section.paragraphs.map(text => <p key={text} className="mt-4 text-base leading-8 text-muted-foreground">{text}</p>)}</section>)}<div className="rounded-xl border border-border bg-muted/20 p-5 text-sm leading-7 text-muted-foreground"><p className="font-semibold text-foreground">Cite this page</p><p>{guide.title}. Ravikisan's Platform. {base}/blog/{guide.slug}. Independent study aid; not official NEB material.</p></div><Link href="/blog" className="inline-flex min-h-11 items-center rounded-lg font-semibold text-primary focus-visible:ring-2 focus-visible:ring-ring">← All study guides</Link></article>
    </div>
  </PublicPage>;
}