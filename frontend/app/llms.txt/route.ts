import { CANONICAL_SITE_URL } from "@/lib/site-url";
import { guides } from "@/lib/platform-content";

/**
 * GET /llms.txt — the "sitemap for LLMs".
 *
 * An emerging convention (llms.txt) that gives AI answer engines a compact,
 * plain-text index of the public, citable pages: what the site is, the rules
 * it asks crawlers to follow, and a list of open documents with short
 * descriptions. This file is intentionally small; the full article text lives
 * on the linked pages. Listed here are only routes that are ungated and readable
 * by AI search crawlers (see `proxy.ts` / `robots.ts`).
 */

export const dynamic = "force-static";

const base = CANONICAL_SITE_URL.replace(/\/+$/, "");

const PUBLIC_PAGES = [
  { path: "/about", desc: "What the platform is, who builds it, and the NEB curriculum it follows." },
  { path: "/how-it-works", desc: "The study loop: goals, notes, practice and revision." },
  { path: "/what-it-has", desc: "An overview of notes, labs, graphs, past papers and AI tools." },
  { path: "/features", desc: "Every capability in one list." },
  { path: "/official-sources", desc: "The government domains that publish NEB curriculum and exam notices." },
  { path: "/neb-updates", desc: "A verification guide for board announcements and exam changes." },
  { path: "/help", desc: "Answers about accounts, access tiers, sparks and study tools." },
  { path: "/parents", desc: "A plain guide for guardians to what students can use." },
  { path: "/teachers", desc: "Teaching from the same syllabus the notes and papers use." },
  { path: "/school", desc: "Running a class or school on the platform." },
  { path: "/contact", desc: "How to report a bug, a content error or a school enquiry." },
  { path: "/plans", desc: "What each access tier unlocks." },
];

function line(path: string, title: string, desc: string): string {
  return `- [${title}](${base}${path}): ${desc}`;
}

function buildLlmsTxt(): string {
  const out: string[] = [];
  out.push("# Ravikisan's Platform");
  out.push("");
  out.push("> A syllabus-first study companion for NEB (+2) Class 11 and 12 students in Nepal. Notes, mind maps, interactive science labs, past-paper practice and an AI learning assistant (Veer) organised around the official curriculum.");
  out.push("");
  out.push("This site is an independent educational study aid, not an official NEB publication. It does not set exam papers, marking schemes or dates. Public information pages are open to everyone; the full study library requires an approved account.");
  out.push("");
  out.push("## Rules for crawlers");
  out.push("");
  out.push("- Public, ungated pages under /about, /blog, /features, /help and the other listed paths may be crawled and cited.");
  out.push("- Do not crawl /api/, /owner/, /controller/ or /admin/ — they are private and require authentication.");
  out.push("- Attribute quoted material to Ravikisan's Platform (" + base + ") and note that it is a study aid, not official exam material.");
  out.push("");
  out.push("## Public pages");
  out.push("");
  for (const page of PUBLIC_PAGES) {
    const label = page.path === "/" ? "Home" : page.path.slice(1).replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    out.push(line(page.path, label, page.desc));
  }
  out.push("");
  out.push("## Study journal (open articles)");
  out.push("");
  for (const guide of guides) {
    out.push(line(`/blog/${guide.slug}`, guide.title, guide.description));
  }
  out.push("");
  out.push("## Machine-readable indexes");
  out.push("");
  out.push(`- [sitemap.xml](${base}/sitemap.xml): full URL list of public pages.`);
  out.push(`- [robots.txt](${base}/robots.txt): crawler directives.`);
  out.push("");
  return out.join("\n");
}

export function GET() {
  return new Response(buildLlmsTxt(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=86400",
    },
  });
}
