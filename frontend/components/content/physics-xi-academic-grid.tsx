"use client";

/**
 * Physics XI Academic Companion — reading surface.
 *
 * Renders the 26 unit briefs from the canonical dataset: what the model
 * asserts, the conditions under which it holds, key numbers, the questions
 * that are still open, inquiry prompts and further reading — with a
 * downloadable HTML and Word-compatible .doc copy of every unit.
 */
import { useMemo, useState } from "react";
import Link from "next/link";
import { BookOpen, ChevronDown, ChevronUp, Download, FlaskConical, Search, X } from "lucide-react";
import { PhysicsXiUnitBrief } from "@/components/content/physics-xi-unit-brief";
import type { PhysicsXiUnit } from "@/lib/physics-xi-academic";
import { physicsXiDocUrl, physicsXiUnitHref } from "@/lib/physics-xi-academic";

interface PhysicsXiAcademicGridProps {
  units: PhysicsXiUnit[];
  contentAreas: string[];
}

export function PhysicsXiAcademicGrid({
  units,
  contentAreas,
}: PhysicsXiAcademicGridProps) {
  const [area, setArea] = useState<string>("All");
  const [query, setQuery] = useState<string>("");
  const [openUnitId, setOpenUnitId] = useState<string | null>(null);

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return units.filter((unit) => {
      if (area !== "All" && unit.contentArea !== area) return false;
      if (!needle) return true;
      return [
        unit.unitName,
        unit.contentArea,
        unit.summary,
        ...unit.facts,
        ...unit.mysteries.map((mystery) => mystery.question),
      ]
        .join(" ")
        .toLowerCase()
        .includes(needle);
    });
  }, [units, area, query]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {["All", ...contentAreas].map((name) => (
            <button
              key={name}
              type="button"
              onClick={() => setArea(name)}
              aria-pressed={area === name}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                area === name
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border/60 text-muted-foreground hover:border-primary/30 hover:text-foreground"
              }`}
            >
              {name}
            </button>
          ))}
        </div>
        <div className="relative sm:w-72">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search units, facts, open questions"
            aria-label="Search Physics XI academic units"
            className="w-full rounded-lg border border-border/60 bg-background py-2 pl-9 pr-3 text-sm outline-none focus:border-primary/60"
          />
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        {visible.length} of {units.length} unit briefs
      </p>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {visible.map((unit) => {
          const isOpen = openUnitId === unit.unitId;
          return (
            <article
              key={unit.unitId}
              className="flex flex-col rounded-2xl border border-border/60 bg-card p-5 shadow-sm"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <FlaskConical className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-muted-foreground">
                    Unit {unit.unitNo} · {unit.contentArea}
                  </p>
                  <h3 className="font-semibold text-foreground">{unit.unitName}</h3>
                </div>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {unit.summary}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-3 pt-1">
                <Link
                  href={physicsXiUnitHref(unit)}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                >
                  <BookOpen className="h-4 w-4" />
                  Full brief
                </Link>
                <button
                  type="button"
                  onClick={() => setOpenUnitId(isOpen ? null : unit.unitId)}
                  aria-expanded={isOpen}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:underline"
                >
                  {isOpen ? (
                    <>
                      <ChevronUp className="h-4 w-4" />
                      Hide quick look
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-4 w-4" />
                      Quick look
                    </>
                  )}
                </button>
                <a
                  href={physicsXiDocUrl(unit, "html")}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:underline"
                >
                  <Download className="h-4 w-4" />
                  HTML
                </a>
                <a
                  href={physicsXiDocUrl(unit, "doc")}
                  download
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:underline"
                >
                  <Download className="h-4 w-4" />
                  Word
                </a>
              </div>

              {isOpen ? (
                <div className="mt-4 border-t border-border/60 pt-4 text-sm">
                  <PhysicsXiUnitBrief unit={unit} dense />
                </div>
              ) : null}
            </article>
          );
        })}
      </div>

      {visible.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border/60 p-10 text-center">
          <X className="h-6 w-6 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            No unit matches “{query}” in {area}. Try a broader term.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setArea("All");
            }}
            className="text-sm font-medium text-primary hover:underline"
          >
            Reset filters
          </button>
        </div>
      ) : null}
    </div>
  );
}
