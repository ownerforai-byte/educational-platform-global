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
      <div className="mx-auto max-w-7xl px-3 py-6 sm:px-4 md:px-6">

        {/* Brand line — full width so the five nav columns below get the whole row */}
        <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
          <Link href="/home" className="shrink-0 text-sm font-semibold hover:text-primary">
            Ravikisan&apos;s Platform
          </Link>
          <p className="text-xs leading-relaxed text-muted-foreground sm:text-right">
            Study resources for NEB Class 11 and 12, organised around the CDC curriculum.
            <span className="hidden lg:inline"> An approved account is required for the study library; access depends on your plan.</span>
          </p>
        </div>

        {/* All five groups share ONE row, on phones too — no stacked directory. */}
        <div className="mt-5 grid grid-cols-5 gap-x-2 sm:gap-x-4">
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
              <nav key={sectionId} aria-label={`Footer ${heading}`} className="min-w-0">
                <h2 className="text-[11px] font-semibold leading-tight sm:text-sm">{heading}</h2>
                <ul className="mt-2 space-y-0.5 sm:mt-3">
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
                            className="inline-flex min-h-8 cursor-not-allowed items-center text-xs leading-tight text-muted-foreground/50 opacity-60 grayscale sm:text-sm"
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
                          className="inline-flex min-h-8 items-center text-xs leading-tight break-words text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:text-sm"
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
        <div className="mt-5 flex flex-col gap-3 border-t border-border pt-4 text-xs text-muted-foreground lg:flex-row lg:items-center lg:justify-between">
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
                className="inline-flex min-h-8 items-center hover:text-primary focus-visible:ring-2 focus-visible:ring-ring"
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
