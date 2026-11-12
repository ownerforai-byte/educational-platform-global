"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { helpItems } from "@/lib/platform-content";

export function HelpSearch() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const categories = ["All", ...new Set(helpItems.map(item => item.category))];
  const results = useMemo(() => helpItems.filter(item =>
    (category === "All" || item.category === category) &&
    `${item.question} ${item.answer} ${item.category}`.toLowerCase().includes(query.trim().toLowerCase())
  ), [query, category]);
  return <section aria-labelledby="help-search-title" className="space-y-5">
    <h2 id="help-search-title" className="text-2xl font-bold">Find your answer</h2>
    <label htmlFor="help-query" className="block text-sm font-medium">Search accounts, access, sparks, or study tools</label>
    <input id="help-query" type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="For example: plans or content sparks" className="min-h-12 w-full rounded-xl border border-border bg-background px-4 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
    <div className="flex flex-wrap gap-2" aria-label="Filter help topics">
      {categories.map(value => <button type="button" key={value} aria-pressed={value === category} onClick={() => setCategory(value)} className={`min-h-11 rounded-full border px-4 text-sm focus-visible:ring-2 focus-visible:ring-ring ${value === category ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:bg-muted"}`}>{value}</button>)}
    </div>
    <p role="status" aria-live="polite" className="text-sm text-muted-foreground">{results.length} {results.length === 1 ? "answer" : "answers"} found</p>
    <div className="space-y-3">
      {results.map(item => <details key={item.question} className="group rounded-xl border border-border bg-card p-5">
        <summary className="cursor-pointer rounded-md text-base font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">{item.question}</summary>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">{item.answer}</p>
      </details>)}
      {results.length === 0 && <div className="rounded-xl border border-dashed border-border p-6"><p>No matching answers. Try a shorter phrase or another topic.</p><button type="button" onClick={() => { setQuery(""); setCategory("All"); }} className="mt-3 min-h-11 rounded-md font-semibold text-primary focus-visible:ring-2 focus-visible:ring-ring">Clear filters</button></div>}
    </div>
    <p className="text-sm text-muted-foreground">Still need help? <Link href="/contact" className="font-semibold text-primary underline underline-offset-4">Prepare a support request</Link>.</p>
  </section>;
}
