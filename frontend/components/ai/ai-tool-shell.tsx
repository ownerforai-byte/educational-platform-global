import Link from "next/link";
import { ArrowLeft, ChevronRight, Info, type LucideIcon } from "lucide-react";
import { AI_TOOLS } from "./ai-tools-registry";

/**
 * The console frame every Veer tool shares.
 *
 * What changed from `AiSurfaceHeader`: the marketing feature trio no longer
 * sits above the tool (it used to push the actual console below the fold). The
 * console comes first, the explanation sits under it in a disclosure, and the
 * tool rail runs alongside so you can switch tools without going back to the
 * hub. One width, one header, one breadcrumb — for every tool.
 *
 * Server component: no hooks, so each page keeps its own client consoles
 * inside `children`.
 */
export interface AiToolShellProps {
  /** Tool identity. */
  icon: LucideIcon;
  title: string;
  description: string;
  /** Accent chip classes, e.g. `border-blue-500/25 bg-blue-500/10 text-blue-500`. */
  accent: string;
  /** Canonical href of the page being rendered (marks the rail). */
  current: string;
  /** Optional status/meter slot in the header (plan strip, credits, …). */
  meter?: React.ReactNode;
  /** "What this tool does" — shown below the console, not above it. */
  features?: Array<{ icon: LucideIcon; title: string; text: string }>;
  children: React.ReactNode;
}

export function AiToolShell({
  icon: Icon,
  title,
  description,
  accent,
  current,
  meter,
  features,
  children,
}: AiToolShellProps) {
  return (
    <div className="mx-auto w-full max-w-7xl px-3 py-5 sm:px-4 sm:py-7">
      <nav aria-label="Breadcrumb" className="mb-3">
        <ol className="flex items-center gap-2 text-xs text-muted-foreground">
          <li>
            <Link
              href="/ai"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              AI Studio
            </Link>
          </li>
          <li aria-hidden="true" className="text-muted-foreground/40">
            /
          </li>
          <li className="font-semibold text-foreground">{title}</li>
        </ol>
      </nav>

      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border/70 pb-4">
        <div className="flex min-w-0 items-start gap-3">
          <span
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${accent}`}
          >
            <Icon className="h-5 w-5" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <h1 className="text-xl font-black tracking-tight sm:text-2xl">{title}</h1>
            <p className="mt-0.5 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
          </div>
        </div>
        {meter && <div className="shrink-0">{meter}</div>}
      </header>

      <div className="mt-4 grid gap-4 lg:grid-cols-[232px_minmax(0,1fr)]">
        {/* Mobile: a scrollable chip rail. Desktop: the sticky console rail. */}
        <nav aria-label="Veer tools" className="-mx-1 lg:mx-0">
          <ul className="flex gap-1.5 overflow-x-auto px-1 pb-1 lg:hidden">
            {AI_TOOLS.map((tool) => {
              const active = tool.href === current;
              return (
                <li key={tool.href} className="shrink-0">
                  <Link
                    href={tool.href}
                    aria-current={active ? "page" : undefined}
                    className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[11px] font-semibold transition-colors ${
                      active
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-card text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <tool.icon className="h-3.5 w-3.5" aria-hidden="true" />
                    {tool.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="sticky top-20 hidden lg:block">
            <p className="mb-2 px-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              Veer tools
            </p>
            <ul className="space-y-0.5">
              {AI_TOOLS.map((tool) => {
                const active = tool.href === current;
                return (
                  <li key={tool.href}>
                    <Link
                      href={tool.href}
                      aria-current={active ? "page" : undefined}
                      className={`group flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                        active
                          ? "bg-primary/10 font-bold text-primary"
                          : "font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      <tool.icon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      <span className="min-w-0 flex-1 truncate">{tool.label}</span>
                      {active && <ChevronRight className="h-3 w-3 shrink-0" aria-hidden="true" />}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <Link
              href="/ai"
              className="mt-2 flex items-center gap-2 rounded-lg border border-dashed border-border px-2 py-1.5 text-[11px] font-semibold text-muted-foreground transition-colors hover:text-foreground"
            >
              All tools & classrooms
            </Link>
          </div>
        </nav>

        <main className="min-w-0">
          {children}

          {features && features.length > 0 && (
            <details className="group mt-4 rounded-2xl border border-border bg-card">
              <summary className="flex cursor-pointer list-none items-center gap-2 px-4 py-3 text-xs font-bold text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <Info className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
                What this tool does
                <ChevronRight
                  className="ml-auto h-3.5 w-3.5 text-muted-foreground transition-transform group-open:rotate-90"
                  aria-hidden="true"
                />
              </summary>
              <ul className="grid gap-3 border-t border-border/70 px-4 py-3 sm:grid-cols-3">
                {features.map((feature) => (
                  <li key={feature.title}>
                    <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                      <feature.icon className="h-3 w-3" aria-hidden="true" />
                      {feature.title}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      {feature.text}
                    </p>
                  </li>
                ))}
              </ul>
            </details>
          )}
        </main>
      </div>
    </div>
  );
}
