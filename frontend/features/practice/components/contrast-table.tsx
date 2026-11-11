"use client";

import { ArrowLeftRight } from "lucide-react";
import type { ContrastPair } from "@/lib/practice/types";

/**
 * The confusion-clearing table shown after a writing submission.
 *
 * One row per pair: what A is, what B is, and a single sentence stating the
 * difference. It is a real `<table>` so screen readers announce the column
 * headers, and it wraps to stacked cards on narrow screens where a three-column
 * table would be unreadable.
 */
export function ContrastTable({ pairs }: { pairs: ContrastPair[] }) {
  if (pairs.length === 0) return null;

  return (
    <section
      aria-labelledby="contrast-heading"
      className="rounded-2xl border border-border bg-card"
    >
      <header className="flex items-center gap-2.5 border-b border-border/70 px-4 py-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
          <ArrowLeftRight className="h-4 w-4" aria-hidden="true" />
        </span>
        <div>
          <h3 id="contrast-heading" className="text-sm font-bold text-foreground">
            Do not mix these up
          </h3>
          <p className="text-xs text-muted-foreground">
            The pairs that decide most of the marks on this question.
          </p>
        </div>
      </header>

      <div className="hidden sm:block">
        <table className="w-full table-fixed border-collapse text-left text-sm">
          <caption className="sr-only">
            Contrasting concepts and the difference between them
          </caption>
          <thead>
            <tr className="border-b border-border/60 text-[11px] uppercase tracking-wider text-muted-foreground">
              <th scope="col" className="w-1/4 px-4 py-2 font-semibold">
                Concept
              </th>
              <th scope="col" className="w-[37%] px-4 py-2 font-semibold">
                What it actually is
              </th>
              <th scope="col" className="w-[37%] px-4 py-2 font-semibold">
                The difference, plainly
              </th>
            </tr>
          </thead>
          <tbody>
            {pairs.map((pair) => (
              <tr key={pair.id} className="border-b border-border/40 last:border-0 align-top">
                <th scope="row" className="px-4 py-3 font-semibold text-foreground">
                  <span className="block">{pair.a}</span>
                  <span className="mt-1 block text-xs font-medium text-muted-foreground">
                    vs {pair.b}
                  </span>
                </th>
                <td className="px-4 py-3 text-muted-foreground">
                  <p>
                    <span className="font-semibold text-foreground">{pair.a}:</span> {pair.aIs}
                  </p>
                  <p className="mt-2">
                    <span className="font-semibold text-foreground">{pair.b}:</span> {pair.bIs}
                  </p>
                </td>
                <td className="px-4 py-3 leading-relaxed text-foreground/90">
                  {pair.difference}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="divide-y divide-border/40 sm:hidden">
        {pairs.map((pair) => (
          <li key={pair.id} className="space-y-2 px-4 py-3 text-sm">
            <p className="font-semibold text-foreground">
              {pair.a} <span className="font-normal text-muted-foreground">vs</span> {pair.b}
            </p>
            <p className="text-muted-foreground">
              <span className="font-semibold text-foreground">{pair.a}:</span> {pair.aIs}
            </p>
            <p className="text-muted-foreground">
              <span className="font-semibold text-foreground">{pair.b}:</span> {pair.bIs}
            </p>
            <p className="rounded-lg bg-amber-500/10 px-3 py-2 text-foreground/90">
              {pair.difference}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
