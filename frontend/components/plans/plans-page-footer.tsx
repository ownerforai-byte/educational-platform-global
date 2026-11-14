import Link from "next/link";
import { LEGAL_LINKS } from "@/components/layout/footer";
import { platformLinks } from "@/components/platform/public-page";
import { IndependenceDisclaimer } from "@/components/platform/independence-disclaimer";
import { DEPLOY_VERSION } from "@/lib/deploy-version";

/** Guest-visible info destinations — same set as public platform pages. */
const PLANS_INFO_LINKS: ReadonlyArray<readonly [string, string]> = [
  ...platformLinks,
  ["Features", "/features"],
  ["For Schools", "/school"],
  ["For Teachers", "/teachers"],
];

/**
 * Public legal & info footer for /plans — every link is guest-accessible
 * (no tier gating). Legal URLs stay in sync with LEGAL_LINKS in footer.tsx.
 */
export function PlansPageFooter() {
  return (
    <footer
      className="mt-4 space-y-6 border-t border-border/70 pt-8"
      aria-labelledby="plans-footer-heading"
    >
      <h2 id="plans-footer-heading" className="sr-only">
        Policies and platform information
      </h2>

      <IndependenceDisclaimer variant="compact" className="border-amber-500/40" />

      <div className="grid gap-6 rounded-2xl border border-border/70 bg-muted/20 p-5 sm:grid-cols-2">
        <nav aria-label="Legal and policies">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-primary">
            Legal &amp; policies
          </h3>
          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
            {LEGAL_LINKS.map(([label, href]) => (
              <li key={href}>
                <Link
                  href={href}
                  className="inline-flex min-h-8 items-center text-xs text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Platform information">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-primary">
            Platform information
          </h3>
          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
            {PLANS_INFO_LINKS.map(([label, href]) => (
              <li key={href}>
                <Link
                  href={href}
                  className="inline-flex min-h-8 items-center text-xs text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="space-y-2 text-center text-[11px] leading-relaxed text-muted-foreground">
        <p>
          After signing, the account is approved by the system verification and administrative
          approval.
        </p>
        <p suppressHydrationWarning>
          &copy; {new Date().getFullYear()} Ravikisan&apos;s Platform · v{DEPLOY_VERSION}
        </p>
      </div>
    </footer>
  );
}
