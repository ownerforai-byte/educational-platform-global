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
 * it shows as muted/disabled text instead of a clickable link. The Account
 * column's Dashboard is the one exception: it is a live link for every
 * viewer (owner request 2026-11-07), and the route's own approval gate still
 * decides what a signed-out guest sees after the click.
 * Plans are shown only in the footer (not scattered around the app).
 */

import Link from "next/link";
import { DEPLOY_VERSION } from "@/lib/deploy-version";
import { hasLevel, ACCESS_LABELS, type AccessLevel } from "@/lib/access-level";
import { NAV_SECTIONS, type NavItem, type NavSection } from "@/lib/navigation";
import type { AiSparkUserLike } from "@/lib/ai/ai-spark-tiers";
import { FooterQuote } from "@/components/layout/footer-quote";

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
   * the section are shown (respecting tier filtering). Hrefs are resolved
   * across the whole registry, so a column may include a destination that a
   * different section owns.
   */
  onlyHrefs?: string[];
  /** Hrefs that stay live links for every viewer, below their rung included. */
  alwaysUnlockedHrefs?: string[];
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
      // Owner request 2026-11-08: a plain "what the platform has" page.
      "/what-it-has",
      "/blog",
      "/neb-updates",
      "/how-it-works",
      "/contact",
      "/help",
    ],
  },

  // Billing — credits/plan and billing live together in one group.
  // Owner request 2026-11-07: "Plans & Pricing" is gone from the footer, and
  // the two account billing destinations are merged under one Billing heading.
  // `onlyHrefs` order is the displayed order: Credits first, Billing second.
  {
    sectionId: "account",
    heading: "Billing",
    onlyHrefs: [
      "/credits",
      "/billing",
    ],
  },

  // Account — personal pages
  {
    sectionId: "account",
    heading: "Account",
    onlyHrefs: [
      "/dashboard", // owned by Quick Access — the footer's way into it
      "/profile",
      "/settings",
      "/notice",
    ],
    // Owner request 2026-11-07: the dashboard link is available for all.
    alwaysUnlockedHrefs: ["/dashboard"],
  },
];

/**
 * Resolve a footer column's links from the WHOLE registry. The Account column
 * carries Dashboard even though Quick Access owns that entry; each row keeps
 * the section that owns it, so its rung is read from the same place the
 * sidebar reads it.
 */
function footerItems(
  section: NavSection,
  onlyHrefs?: string[],
): Array<{ item: NavItem; owner: NavSection }> {
  if (!onlyHrefs) return section.items.map((item) => ({ item, owner: section }));

  const resolved: Array<{ item: NavItem; owner: NavSection }> = [];
  for (const href of onlyHrefs) {
    for (const candidate of NAV_SECTIONS) {
      const item = candidate.items.find((entry) => entry.href === href);
      if (item) {
        resolved.push({ item, owner: candidate });
        break;
      }
    }
  }
  return resolved;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function Footer({ user }: { user?: AiSparkUserLike | null }) {
  return (
    <footer className="mt-auto border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-3 py-6 sm:px-4 md:px-6">

        {/* Brand line — full width so the nav columns below get the whole row */}
        <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
          <Link href="/home" className="shrink-0 text-sm font-semibold hover:text-primary">
            Ravikisan&apos;s Platform
          </Link>
          <p className="text-xs leading-relaxed text-muted-foreground sm:text-right">
            Study resources for NEB Class 11 and 12, organised around the CDC curriculum.
            <span className="hidden lg:inline"> An approved account is required for the study library; access depends on your plan.</span>
          </p>
        </div>

        {/* Six groups: two tidy rows on phones, one row from sm upwards. */}
        <div className="mt-5 grid grid-cols-3 gap-x-2 sm:grid-cols-6 sm:gap-x-4">
          {FOOTER_SECTIONS.map(({ sectionId, heading, onlyHrefs, alwaysUnlockedHrefs }) => {
            // Look up the column's own section from NAV_SECTIONS
            const section = NAV_SECTIONS.find((s) => s.id === sectionId);
            if (!section) return null;

            // onlyHrefs order wins, so the footer order is predictable.
            const items = footerItems(section, onlyHrefs);
            const alwaysUnlocked = alwaysUnlockedHrefs ?? [];

            return (
              <nav key={heading} aria-label={`Footer ${heading}`} className="min-w-0">
                <h2 className="text-[11px] font-semibold leading-tight sm:text-sm">{heading}</h2>
                <ul className="mt-2 space-y-0.5 sm:mt-3">
                  {items.map(({ item, owner }) => {
                    // Determine the minimum tier needed for this link
                    const minTier: AccessLevel = item.minLevel ?? owner.minLevel ?? "member";
                    // Check if the current viewer can reach it
                    const unlocked =
                      alwaysUnlocked.includes(item.href) || hasLevel(user, minTier);

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

        <FooterQuote />

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
              ["Attribution",    "/legal/attribution"   ],
              ["Takedown",       "/legal/takedown"      ],
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
