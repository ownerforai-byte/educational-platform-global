import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";

/**
 * PERIODIC TABLE CEE UNDER THE SPARK GATE
 * (owner request 2026-10-16: "lock the periodic table cee under the gate also").
 *
 * The 118-element table itself stays free (route policy in
 * features/credits/constants.ts), but every CEE question-bank surface inside
 * it — the dossier's CEE Past MCQs tab, the CEE high-yield summary, and both
 * CEE high-frequency fact panels — renders behind CeeSparkGate: owner and Pro
 * members read directly, everyone else meets the Spark lock (members unlock
 * for coins, guests get the sign-in notice).
 *
 * The gate is client-side (the session resolves in the browser), so — same
 * style as tests/features/home-subject-rails-owner-gate.test.ts — we pin the
 * wiring at source level instead of rendering a session in jsdom.
 */
const read = (p: string) => readFileSync(path.resolve(p), "utf8");

/** Slice of the view between two anchors (inclusive of `from`). */
const between = (src: string, from: string, to: string) => {
  const start = src.indexOf(from);
  const end = src.indexOf(to, start + 1);
  expect(start).toBeGreaterThan(-1);
  expect(end).toBeGreaterThan(start);
  return src.slice(start, end);
};

describe("Periodic table CEE Spark gate", () => {
  it("gates the CEE dossier tab (default tab — past MCQs, traps, speed formulas)", () => {
    const view = read("components/periodic-table/periodic-table-view.tsx");
    expect(view).toContain(
      'import { CeeSparkGate } from "@/components/periodic-table/cee-spark-gate"',
    );
    const pyqsTab = between(
      view,
      '{activeDossierTab === "pyqs" && (',
      "{/* ── TAB 2: HALLMARK CHEMICAL REACTIONS",
    );
    expect(pyqsTab).toContain("<CeeSparkGate>");
    expect(pyqsTab).toContain("</CeeSparkGate>");
  });

  it("gates the CEE high-yield summary inside the ores/facts tab", () => {
    const view = read("components/periodic-table/periodic-table-view.tsx");
    const highYield = between(
      view,
      "{/* CEE High-Yield Summary",
      "{/* Key Ores & Minerals */}",
    );
    expect(highYield).toContain("<CeeSparkGate compact>");
    expect(highYield).toContain("</CeeSparkGate>");
  });

  it("gates both CEE high-frequency fact panels (hover + block dossier)", () => {
    const view = read("components/periodic-table/periodic-table-view.tsx");

    // Hover panel: the gate wraps the CEE column of the trends/CEE grid.
    const hover = between(
      view,
      "grid gap-2 sm:grid-cols-2 pt-1.5 border-t border-border/40",
      "{/* ── 3. LIVE ELEMENT INSPECTION DECK",
    );
    const hoverGate = hover.indexOf("<CeeSparkGate compact>");
    expect(hoverGate).toBeGreaterThan(-1);
    expect(hoverGate).toBeLessThan(hover.indexOf("CEE high-frequency facts"));
    expect(hover.match(/<\/CeeSparkGate>/g) ?? []).toHaveLength(1);

    // Block dossier: the gate wraps the CEE facts card next to trend facts.
    const block = between(
      view,
      "{/* Trend facts + CEE facts */}",
      "{/* Modal Footer */}",
    );
    const blockGate = block.indexOf("<CeeSparkGate compact>");
    expect(blockGate).toBeGreaterThan(-1);
    expect(blockGate).toBeLessThan(block.indexOf("CEE High-Frequency Facts"));
    expect(block.match(/<\/CeeSparkGate>/g) ?? []).toHaveLength(1);
  });

  it("keeps the base table, reactions, ores and constants tabs free", () => {
    // Exactly four gated surfaces — the CEE ones — and nothing else.
    const view = read("components/periodic-table/periodic-table-view.tsx");
    const opens = view.match(/<CeeSparkGate( compact)?>/g) ?? [];
    const closes = view.match(/<\/CeeSparkGate>/g) ?? [];
    expect(opens).toHaveLength(4);
    expect(closes).toHaveLength(4);

    const reactions = between(
      view,
      '{activeDossierTab === "reactions" && (',
      "{/* ── TAB 3: ORES, MINERALS & FACTS",
    );
    expect(reactions).not.toContain("CeeSparkGate");
  });

  it("route policy still leaves /periodic-table itself free", () => {
    // The CEE bank is locked in-component; the route-level gate must NOT
    // also lock the whole page (double lock would blur the free table).
    expect(read("features/credits/constants.ts")).toContain(
      "/^\\/(lab|sim|periodic-table|graphs|mindmap|legend|visual)(\\/|$)/",
    );
  });
});

describe("CeeSparkGate component", () => {
  const gate = read("components/periodic-table/cee-spark-gate.tsx");

  it("is a client component with the owner + Pro passthrough rule", () => {
    expect(gate).toContain('"use client"');
    expect(gate).toContain('tier === "owner" || tier === "pro"');
    // No lock flash while the session resolves.
    expect(gate).toContain("if (isLoading) return null;");
  });

  it("locks everyone else behind the reference Spark cost", () => {
    expect(gate).toContain('moduleKey="/periodic-table"');
    expect(gate).toContain('category="reference"');
  });

  it("reads the shared tier helper and allowlist — no emails in the gate", () => {
    expect(gate).toContain('from "@/lib/ai/ai-spark-tiers"');
    expect(gate).not.toContain("@gmail.com");
  });
});

describe("Spark library directory entry", () => {
  it("advertises the periodic table CEE bank at the paid reference tier", () => {
    const card = read("features/credits/directory-card.tsx");
    expect(card).toContain(
      '{ label: "Periodic Table & CEE", href: "/periodic-table", category: "reference" }',
    );
  });
});
