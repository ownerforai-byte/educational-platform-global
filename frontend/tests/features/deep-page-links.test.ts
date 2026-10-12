import { describe, it, expect } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { collectRoutes, routeExists } from "../helpers/route-tree";
import { derivationHref } from "@/components/derivations/derivations-hub-view";
import { DERIVATIONS_AND_THEOREMS } from "@/lib/derivations-data";
import {
  PRACTICAL_SYLLABUS,
  experimentSlug,
  findExperimentBySlug,
} from "@/lib/practical-syllabus";

/**
 * Deep content (derivations, proofs, practical write-ups) must present on its
 * own routed page — never inline on a shared listing page.
 *
 * These guards are intentionally small and scoped: adding a derivation or an
 * experiment only needs this file to run (see scripts/test-affected.mjs), not
 * the full suite — a dead page link or a reintroduced inline detail panel
 * fails here in seconds.
 */
describe("deep content has its own routed pages", () => {
  const routes = collectRoutes();

  it("every hub derivation/theorem links to an existing detail page", () => {
    const missing = DERIVATIONS_AND_THEOREMS.filter(
      (d) => !routeExists(derivationHref(d), routes),
    ).map((d) => d.slug);
    expect(missing).toEqual([]);
  });

  it("hub cards are real page links, not an inline detail modal", () => {
    const src = readFileSync(
      path.resolve("components/derivations/derivations-hub-view.tsx"),
      "utf8",
    );
    expect(src).not.toContain("DerivationDetailView");
    expect(src).not.toContain("setActiveDerivationId");
    expect(src).toContain("href={derivationHref(item)}");
  });

  it("every practical experiment links to an existing practical-file page", () => {
    const missing: string[] = [];
    for (const subject of PRACTICAL_SYLLABUS) {
      for (const unit of subject.units) {
        for (const experiment of unit.experiments) {
          const href = `/practical/${subject.slug}/${experimentSlug(experiment)}`;
          if (!routeExists(href, routes)) missing.push(href);
        }
      }
    }
    expect(missing).toEqual([]);
  });

  it("experiment slugs are unique within each subject", () => {
    for (const subject of PRACTICAL_SYLLABUS) {
      const slugs = subject.units.flatMap((u) =>
        u.experiments.map(experimentSlug),
      );
      expect(new Set(slugs).size, `duplicate slug in ${subject.slug}`).toBe(
        slugs.length,
      );
    }
  });

  it("findExperimentBySlug resolves every generated slug to the same experiment", () => {
    for (const subject of PRACTICAL_SYLLABUS) {
      for (const unit of subject.units) {
        for (const experiment of unit.experiments) {
          const found = findExperimentBySlug(subject, experimentSlug(experiment));
          expect(found?.experiment.title).toBe(experiment.title);
          expect(found?.unit.id).toBe(unit.id);
        }
      }
    }
  });

  it("practical write-ups open as pages, not the old inline notebook modal", () => {
    expect(
      existsSync(path.resolve("components/practical/practical-notebook-modal.tsx")),
    ).toBe(false);
    const page = readFileSync(
      path.resolve("app/(app)/practical/[subjectSlug]/page.tsx"),
      "utf8",
    );
    expect(page).toContain("notebookHref");
    expect(page).not.toContain("PracticalNotebookModal");
    expect(page).not.toContain("onOpenNotebook");
  });
});
