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
  return <Link href={href} className={`group inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${secondary ? "border-2 border-border bg-background hover:border-primary hover:text-primary" : "bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:opacity-90"}`}>
    {children}<ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
  </Link>;
}

export function Panel({ title, children, eyebrow }: {
  title: string; children: ReactNode; eyebrow?: string;
}) {
  return <section className="rounded-2xl border border-border/80 bg-card p-6 shadow-sm transition-colors hover:border-border sm:p-8">
    {eyebrow && <p className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary">
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-primary" />
      {eyebrow}
    </p>}
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
        isAccessibleForFree: true,
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
  return <div className="relative flex min-h-screen flex-col overflow-x-clip bg-background text-foreground">
    <JsonLd data={structuredData} />
    <a href="#platform-content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-primary focus:p-3 focus:text-primary-foreground">Skip to content</a>
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/home" className="flex items-center gap-3 rounded-lg font-bold focus-visible:ring-2 focus-visible:ring-ring">
          <span aria-hidden="true" className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/20">
            <BookOpen className="h-5 w-5" />
          </span>
          <span>Ravikisan&apos;s Platform<span className="block text-xs font-normal text-muted-foreground">NEB Class 11 &amp; 12 · Nepal</span></span>
        </Link>
        <Link href="/signup" className="inline-flex min-h-11 items-center rounded-full bg-primary px-6 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 transition hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring">Request an account</Link>
      </div>
      <nav aria-label="Platform information" className="mx-auto max-w-6xl px-4 pb-3 sm:px-6">
        <ul className="flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {platformLinks.map(([label, href]) => (
            <li key={href} className="shrink-0">
              <Link
                href={href}
                aria-current={current === href ? "page" : undefined}
                className={`inline-flex min-h-9 items-center whitespace-nowrap rounded-full border px-4 text-[13px] font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-ring ${current === href ? "border-primary/30 bg-primary/10 text-primary" : "border-transparent bg-muted/40 text-muted-foreground hover:bg-muted hover:text-foreground"}`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
    <main id="platform-content" className="relative mx-auto w-full max-w-6xl flex-1 px-4 pb-16 pt-8 sm:px-6 sm:pt-12">
      {/* Soft light bloom behind the hero — the platform&apos;s entrance signature */}
      <div aria-hidden="true" className="pointer-events-none absolute -top-20 left-1/2 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-primary/10 blur-[110px]" />
      <div className="relative mb-10 overflow-hidden rounded-3xl border border-border/80 bg-gradient-to-br from-primary/[0.08] via-card to-card shadow-sm">
        <div aria-hidden="true" className="h-1 w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500" />
        <div className="p-6 sm:p-10">
          <p className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-primary" />
            {eyebrow}
          </p>
          <h1 className="mt-5 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl">{title}</h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground">{intro}</p>
        </div>
      </div>
      <div className="relative space-y-8">{children}</div>
    </main>
    <Footer />
  </div>;
}
