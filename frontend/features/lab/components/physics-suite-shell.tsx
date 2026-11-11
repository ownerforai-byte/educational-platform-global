"use client";
/* Header + accordion shell (expand/contract units, hide/reveal scenes). */
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
export type UnitMeta = { id: string; title: string; cls: string; hours?: number; summary: string };
export function SuiteHeader({ openCount, total, query, setQuery, expandAll, contractAll, unhide }: {
  openCount: number; total: number; query: string; setQuery: (q: string) => void;
  expandAll: () => void; contractAll: () => void; unhide: () => void;
}) {
  return (
    <Card className="border-border/60">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">⚛️ Physics 3D Syllabus Suite</CardTitle>
        <CardDescription>
          Every NEB Physics XI + XII unit in official syllabus order. Expand a unit to mount its
          interactive 3D scene (CSS2D chips + arrow-free SVG leader lines). Each scene has its own
          reveal bar: ◉ Reveal → Next +1 → Show all / Hide all. Expand-all opens the first 4 matches
          to protect WebGL contexts.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap items-center gap-2">
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Filter units — e.g. lens, capacitor, thermo…"
            className="min-w-[200px] flex-1 rounded-md border border-border bg-background px-3 py-1.5 text-xs outline-none placeholder:text-muted-foreground focus:border-primary" aria-label="Filter units" />
          <span className="text-[11px] text-muted-foreground">{openCount} expanded · {total} units</span>
          <button type="button" onClick={expandAll} className="rounded-md border border-border bg-background px-2.5 py-1.5 text-[11px] font-semibold hover:border-primary">Expand all</button>
          <button type="button" onClick={contractAll} className="rounded-md border border-border bg-background px-2.5 py-1.5 text-[11px] font-semibold hover:border-primary">Contract all</button>
          <button type="button" onClick={unhide} className="rounded-md border border-border bg-background px-2.5 py-1.5 text-[11px] font-semibold hover:border-primary">Unhide all</button>
        </div>
      </CardContent>
    </Card>
  );
}
export function useAccordion(total: number, defaultOpen = 0) {
  const [open, setOpen] = useState<number[]>([defaultOpen]);
  const [hidden, setHidden] = useState<string[]>([]);
  const toggle = (i: number) => setOpen((p) => (p.includes(i) ? p.filter((x) => x !== i) : [...p, i].slice(-4)));
  const toggleHidden = (id: string) => setHidden((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  void total;
  return { open, setOpen, hidden, setHidden, toggle, toggleHidden };
}
