import type { Metadata } from "next";

export function LegalDoc({
  title,
  updated,
  intro,
  doc,
  children,
}: {
  title: string;
  updated: string;
  intro: string;
  doc: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-6">
      <header>
        <span className="inline-block rounded-full bg-blue-100 text-[11px] font-bold uppercase tracking-wide text-blue-700 dark:bg-blue-500/15 dark:text-blue-300">
          Legal · {doc}
        </span>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">{title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Last updated: {updated}
        </p>
        <p className="mt-4 rounded-xl border border-amber-300/50 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:bg-amber-500/10 dark:text-amber-200">
          {intro}
        </p>
      </header>

      <div className="space-y-6 text-[15px] leading-relaxed text-foreground/90">
        {children}
      </div>
    </div>
  );
}

export type { Metadata };
