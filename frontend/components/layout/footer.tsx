import Link from "next/link";
import { DEPLOY_VERSION } from "@/lib/deploy-version";

const groups = [
  { title: "Study", links: [["Class 11", "/class-11-notes"], ["Class 12", "/class-12-notes"], ["Syllabus", "/syllabus"], ["Past papers", "/pyqs"]] },
  { title: "Resources", links: [["All resources", "/site-index"], ["Interactive labs", "/lab"], ["Formula sheets", "/formulas"], ["Veer assistant", "/chat"]] },
  { title: "Support & account", links: [["Notice board", "/notice"], ["My account", "/profile"], ["Credits & plan", "/credits"], ["Pro plan", "/pro-plan"]] },
];

/** A compact directory; pricing and usage allowances belong on their own pages. */
export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Link href="/home" className="text-sm font-semibold hover:text-primary">Ravikisan&apos;s Platform</Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">Study resources for NEB Class 11 and 12, organized around the CDC curriculum.</p>
            <p className="mt-2 max-w-xs text-xs leading-relaxed text-muted-foreground">An approved account is required for the study library. Access depends on your plan.</p>
          </div>
          {groups.map((group) => (
            <nav key={group.title} aria-label={`Footer ${group.title}`}>
              <h2 className="text-sm font-semibold">{group.title}</h2>
              <ul className="mt-3 space-y-1">
                {group.links.map(([label, href]) => (
                  <li key={href}><Link href={href} className="inline-flex min-h-9 items-center rounded text-sm text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">{label}</Link></li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="mt-8 flex flex-col gap-4 border-t border-border pt-5 text-xs text-muted-foreground lg:flex-row lg:items-center lg:justify-between">
          <p>&copy; {new Date().getFullYear()} Ravikisan&apos;s Platform.</p>
          <nav aria-label="Legal" className="flex flex-wrap gap-x-4 gap-y-3">
            {[["Privacy", "/legal/privacy"], ["Terms", "/legal/terms"], ["Cookies", "/legal/cookies"], ["Purchases", "/legal/purchases"], ["Data safety", "/legal/data-safety"], ["Content rating", "/legal/content-rating"]].map(([label, href]) => (
              <Link key={href} href={href} className="hover:text-primary focus-visible:ring-2 focus-visible:ring-ring">{label}</Link>
            ))}
          </nav>
          <span className="text-[11px]" title="Platform version">v{DEPLOY_VERSION}</span>
        </div>
      </div>
    </footer>
  );
}
