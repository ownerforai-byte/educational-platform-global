import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, BookOpen } from "lucide-react";
import { Footer } from "@/components/layout/footer";
import { CANONICAL_SITE_URL } from "@/lib/site-url";
import { JsonLd } from "./json-ld";

const PUBLIC_SITE = CANONICAL_SITE_URL.replace(/\/+$/, "");

export const platformLinks = [
  ["About", "/about"], ["What it has", "/what-it-has"], ["Blog", "/blog"], ["NEB Updates", "/neb-updates"],
  ["Official sources", "/official-sources"],
  ["How It Works", "/how-it-works"], ["Contact", "/contact"], ["Help", "/help"],
  ["Parents", "/parents"], ["Site Map", "/sitemap-page"],
] as const;

export function Action({ href, children, secondary = false }: {
  href: string; children: ReactNode; secondary?: boolean;
}) {
  return <Link href={href} className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${secondary ? "border border-border bg-background hover:bg-muted" : "bg-primary text-primary-foreground hover:opacity-90"}`}>
    {children}<ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" />
  </Link>;
}

export function Panel({ title, children, eyebrow }: {
  title: string; children: ReactNode; eyebrow?: string;
}) {
  return <section className="rounded-2xl border border-border bg-card p-6 sm:p-8">
    {eyebrow && <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">{eyebrow}</p>}
    <h2 className="text-xl font-bold tracking-tight">{title}</h2>
    <div className="mt-4 space-y-4 text-sm leading-7 text-muted-foreground">{children}</div>
  </section>;
}

export function PublicPage({ current, eyebrow, title, intro, children }: {
  current: string; eyebrow: string; title: string; intro: string; children: ReactNode;
}) {
  const currentLabel = platformLinks.find(([, href]) => href === current)?.[0] ?? "Information";
  const pageUrl = `${PUBLIC_SITE}${current}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${PUBLIC_SITE}/#organization`,
        name: "Ravikisan's Platform",
        url: PUBLIC_SITE,
        description: "An independent, syllabus-first study companion for NEB (+2) Class 11 and 12 students in Nepal.",
      },
      {
        "@type": "WebSite",
        "@id": `${PUBLIC_SITE}/#website`,
        url: PUBLIC_SITE,
        name: "Ravikisan's Platform",
        inLanguage: "en",
        publisher: { "@id": `${PUBLIC_SITE}/#organization` },
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: title,
        description: intro,
        isPartOf: { "@id": `${PUBLIC_SITE}/#website` },
        breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${PUBLIC_SITE}/` },
          { "@type": "ListItem", position: 2, name: currentLabel, item: pageUrl },
        ],
      },
    ],
  };
  return <div className="relative flex min-h-screen flex-col bg-background text-foreground">
    <JsonLd data={structuredData} />
    <a href="#platform-content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-primary focus:p-3 focus:text-primary-foreground">Skip to content</a>
    <header className="border-b border-border bg-background">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-5 sm:px-6">
        <Link href="/home" className="flex items-center gap-3 rounded-lg font-bold focus-visible:ring-2 focus-visible:ring-ring">
          <BookOpen aria-hidden="true" className="h-6 w-6 text-primary" />
          <span>Ravikisan&apos;s Platform<span className="block text-xs font-normal text-muted-foreground">NEB Class 11 &amp; 12 · Nepal</span></span>
        </Link>
        <Link href="/signup" className="rounded-xl border border-border px-4 py-3 text-sm font-semibold hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring">Request an account</Link>
      </div>
      <nav aria-label="Platform information" className="mx-auto flex max-w-6xl flex-wrap gap-x-5 gap-y-1 px-4 pb-3 sm:px-6">
        {platformLinks.map(([label, href]) => <Link key={href} href={href} aria-current={current === href ? "page" : undefined} className={`inline-flex min-h-11 items-center rounded-md text-sm focus-visible:ring-2 focus-visible:ring-ring ${current === href ? "font-semibold text-primary underline underline-offset-8" : "text-muted-foreground hover:text-foreground"}`}>{label}</Link>)}
      </nav>
    </header>
    <main id="platform-content" className="mx-auto w-full max-w-6xl flex-1 px-4 pb-16 pt-8 sm:px-6 sm:pt-12">
      <div className="mb-10 overflow-hidden rounded-3xl border border-border bg-card">
        <div className="p-6 sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{eyebrow}</p>
          <h1 className="mt-4 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl">{title}</h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground">{intro}</p>
        </div>
      </div>
      <div className="space-y-8">{children}</div>
    </main>
    <Footer />
  </div>;
}
