/**
 * footer.tsx — The site footer.
 *
 * BEGINNER GUIDE
 * ──────────────
 * The footer shows the same links as the sidebar — but grouped differently
 * for a "directory" layout instead of a vertical menu.
 *
 * Instead of copying the links twice (once in navigation.ts and once here),
 * the footer reads its links DIRECTLY from NAV_SECTIONS in navigation.ts.
 * That means:
 *   - Adding a page to navigation.ts automatically adds it to the footer too.
 *   - The footer can never show a link that the sidebar doesn't know about.
 *
 * Each link is tier-aware: if the viewer's plan doesn't reach a link,
 * it shows as muted/disabled text instead of a clickable link.
 * Plans are shown only in the footer (not scattered around the app).
 */

import Link from "next/link";
import { DEPLOY_VERSION } from "@/lib/deploy-version";
import { hasLevel, ACCESS_LABELS, type AccessLevel } from "@/lib/access-level";
import { NAV_SECTIONS } from "@/lib/navigation";
import type { AiSparkUserLike } from "@/lib/ai/ai-spark-tiers";

// ─── Which nav sections appear in the footer, and what heading to use ────────
//
// We don't show every nav section in the footer — just the ones that make
// sense as a site directory. Each entry picks the section by its stable `id`
// and optionally renames the heading for the footer context.
//
// To add a new footer column: add an entry here pointing to an existing
// NAV_SECTIONS id. The links come from there automatically.
//
const FOOTER_SECTIONS: Array<{
  /** The section id from NAV_SECTIONS to pull links from. */
  sectionId: string;
  /** Heading text shown in the footer (can differ from the sidebar label). */
  heading: string;
  /**
   * Optional: limit to these hrefs only. If empty/undefined, all items in
   * the section are shown (respecting tier filtering).
   */
  onlyHrefs?: string[];
}> = [
  // Study — the core curriculum pages
  {
    sectionId: "curriculum",
    heading: "Study",
    onlyHrefs: [
      "/class-11-notes",
      "/class-12-notes",
      "/syllabus",
      "/pyqs",
      "/exams",
      "/search",
    ],
  },

  // AI & Practice — Veer chat and quiz tools
  {
    sectionId: "tools",
    heading: "AI & Practice",
    onlyHrefs: [
      "/chat",
      "/ai",
      "/ai-quiz",
      "/quiz",
      "/practice",
    ],
  },

  // Labs & Resources — labs, formulas, knowledge
  {
    sectionId: "stem",
    heading: "Labs & Resources",
    onlyHrefs: [
      "/lab",
      "/formulas",
      "/mindmap",
      "/periodic-table",
    ],
  },

  // About & Info — public pages, always unlocked
  {
    sectionId: "public",
    heading: "Platform",
    onlyHrefs: [
      "/about",
      "/blog",
      "/neb-updates",
      "/how-it-works",
      "/contact",
      "/help",
      "/plans",   // Plans is ONLY in the footer (owner rule 2026-10-25)
    ],
  },

  // Account — personal pages
  {
    sectionId: "account",
    heading: "Account",
    onlyHrefs: [
      "/profile",
      "/credits",
      "/billing",
      "/settings",
      "/notice",
    ],
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export function Footer({ user }: { user?: AiSparkUserLike | null }) {
  return (
    <footer className="mt-auto border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">

        {/* Top row: brand blurb + nav columns */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr_1fr_1fr]">

          {/* Brand column */}
          <div>
            <Link href="/home" className="text-sm font-semibold hover:text-primary">
              Ravikisan&apos;s Platform
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Study resources for NEB Class 11 and 12, organised around the CDC curriculum.
            </p>
            <p className="mt-2 max-w-xs text-xs leading-relaxed text-muted-foreground">
              An approved account is required for the study library. Access depends on your plan.
            </p>
          </div>

          {/* One nav column per footer section */}
          {FOOTER_SECTIONS.map(({ sectionId, heading, onlyHrefs }) => {
            // Look up the full item list from NAV_SECTIONS
            const section = NAV_SECTIONS.find((s) => s.id === sectionId);
            if (!section) return null;

            // Filter to only the hrefs we want in the footer (if specified)
            const items = onlyHrefs
              ? section.items.filter((item) => onlyHrefs.includes(item.href))
              // Keep the original order from onlyHrefs so the footer order is predictable
              .sort((a, b) => onlyHrefs.indexOf(a.href) - onlyHrefs.indexOf(b.href))
              : section.items;

            return (
              <nav key={sectionId} aria-label={`Footer ${heading}`}>
                <h2 className="text-sm font-semibold">{heading}</h2>
                <ul className="mt-3 space-y-1">
                  {items.map((item) => {
                    // Determine the minimum tier needed for this link
                    const minTier: AccessLevel = item.minLevel ?? section.minLevel ?? "member";
                    // Check if the current viewer can reach it
                    const unlocked = hasLevel(user, minTier);

                    if (!unlocked) {
                      // Locked: show as muted disabled text (no button, no lock icon)
                      return (
                        <li key={item.href}>
                          <span
                            aria-disabled="true"
                            title={`${item.label} opens at ${ACCESS_LABELS[minTier]}`}
                            className="inline-flex min-h-9 cursor-not-allowed items-center text-sm text-muted-foreground/50 opacity-60 grayscale"
                          >
                            {item.label}
                          </span>
                        </li>
                      );
                    }

                    // Unlocked: show as a normal link
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="inline-flex min-h-9 items-center text-sm text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            );
          })}
        </div>

        {/* Bottom bar: copyright, legal links, version */}
        <div className="mt-8 flex flex-col gap-4 border-t border-border pt-5 text-xs text-muted-foreground lg:flex-row lg:items-center lg:justify-between">
          <p>&copy; {new Date().getFullYear()} Ravikisan&apos;s Platform.</p>

          {/* Legal pages — always visible to everyone */}
          <nav aria-label="Legal" className="flex flex-wrap gap-x-4 gap-y-3">
            {([
              ["Privacy",        "/legal/privacy"       ],
              ["Terms",          "/legal/terms"         ],
              ["Cookies",        "/legal/cookies"       ],
              ["Purchases",      "/legal/purchases"     ],
              ["Data safety",    "/legal/data-safety"   ],
              ["Content rating", "/legal/content-rating"],
            ] as [string, string][]).map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="hover:text-primary focus-visible:ring-2 focus-visible:ring-ring"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Platform version — helpful for debugging which deploy is live */}
          <span className="text-[11px]" title="Platform version">
            v{DEPLOY_VERSION}
          </span>
        </div>

      </div>
    </footer>
  );
}
