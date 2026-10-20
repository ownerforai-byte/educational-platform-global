import { describe, it, expect } from "vitest";
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import {
  PHYSICS_XI_ACADEMIC,
  PHYSICS_XI_ACADEMIC_UNITS,
  PHYSICS_XI_SYLLABUS_TOPIC_COUNT,
  getPhysicsXiUnitById,
  getPhysicsXiUnitByNumber,
  isCompletePhysicsXiUnit,
  physicsXiDocUrl,
  physicsXiUnitHref,
} from "@/lib/physics-xi-academic";
import { getSubjectSyllabus, slugifySyllabusTopic } from "@/lib/syllabus";
import { collectRoutes, isResolvable, routeExists } from "../helpers/route-tree";

/**
 * The Physics XI Academic Companion is published in two places: the dataset
 * that the reading surface renders, and a generated HTML/Word document pair
 * per unit. These tests keep the two from drifting apart, and keep every
 * unit honest — a brief missing a section, a dead reading link or a document
 * that no longer matches its unit is a silent quality loss.
 */

const FRONTEND_ROOT = path.resolve(".");
const REPO_ROOT = path.resolve("..");
const DOC_DIR = path.join(FRONTEND_ROOT, "public", "resources", "physics-xi");

/** Every lab id in the registry, read from its source. */
function readLabIds(): Set<string> {
  const source = readFileSync(
    path.join(FRONTEND_ROOT, "lib", "lab-registry.tsx"),
    "utf8",
  );
  return new Set(
    [...source.matchAll(/^\s{4}id: "([^"]+)",$/gm)].map((match) => match[1]),
  );
}

/**
 * The generator escapes these characters when it writes the documents, so the
 * assertions below have to compare against the escaped text — otherwise a unit
 * whose name contains "&" (Unit 21, "Potential & Potential Energy") fails
 * against its own correctly-escaped document.
 */
function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

describe("Physics XI academic dataset", () => {
  it("covers the whole Class 11 physics syllabus in order", () => {
    expect(PHYSICS_XI_ACADEMIC_UNITS).toHaveLength(26);
    expect(PHYSICS_XI_ACADEMIC_UNITS.map((unit) => unit.unitNo)).toEqual(
      Array.from({ length: 26 }, (_, index) => index + 1),
    );
    expect(PHYSICS_XI_ACADEMIC.title).toBeTruthy();
    expect(PHYSICS_XI_ACADEMIC.subtitle).toBeTruthy();
    expect(PHYSICS_XI_ACADEMIC.course).toBeTruthy();
  });

  it("gives every unit a unique id and slug", () => {
    const ids = PHYSICS_XI_ACADEMIC_UNITS.map((unit) => unit.unitId);
    const slugs = PHYSICS_XI_ACADEMIC_UNITS.map((unit) => unit.slug);
    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const unit of PHYSICS_XI_ACADEMIC_UNITS) {
      expect(unit.slug).toBe(
        `unit-${String(unit.unitNo).padStart(2, "0")}-${unit.unitId}`,
      );
    }
  });

  it("gives every unit every section of a brief", () => {
    for (const unit of PHYSICS_XI_ACADEMIC_UNITS) {
      expect(isCompletePhysicsXiUnit(unit), `incomplete brief: ${unit.unitId}`).toBe(
        true,
      );
      expect(unit.summary.length).toBeGreaterThan(80);
      // The floors are the enriched depth the briefs actually ship: a unit that
      // loses a section must fail here rather than quietly look thinner.
      expect(unit.facts.length).toBeGreaterThanOrEqual(7);
      expect(unit.conditions.length).toBeGreaterThanOrEqual(5);
      expect(unit.mysteries.length).toBeGreaterThanOrEqual(2);
      expect(unit.prompts.length).toBeGreaterThanOrEqual(3);
      expect(unit.keyNumbers.length).toBeGreaterThanOrEqual(3);
      expect(unit.sources.length).toBeGreaterThanOrEqual(3);
      for (const mystery of unit.mysteries) {
        expect(mystery.status).toBeTruthy();
        expect(mystery.note.length).toBeGreaterThan(20);
      }
    }
  });

  it("gives every unit unique key-number labels and https reading links", () => {
    for (const unit of PHYSICS_XI_ACADEMIC_UNITS) {
      const labels = unit.keyNumbers.map((item) => item.label);
      expect(new Set(labels).size, `duplicate label in ${unit.unitId}`).toBe(
        labels.length,
      );
      for (const source of unit.sources) {
        expect(source.url, `insecure reading link in ${unit.unitId}`).toMatch(
          /^https:\/\//,
        );
      }
    }
  });

  it("looks units up by id and by number", () => {
    const first = PHYSICS_XI_ACADEMIC_UNITS[0];
    expect(getPhysicsXiUnitById(first.unitId)?.unitNo).toBe(first.unitNo);
    expect(getPhysicsXiUnitByNumber(first.unitNo)?.unitId).toBe(first.unitId);
    expect(getPhysicsXiUnitById("not-a-unit")).toBeUndefined();
    expect(getPhysicsXiUnitByNumber(99)).toBeUndefined();
  });

  it("routes every brief to its own page and document pair", () => {
    const routes = collectRoutes();
    for (const unit of PHYSICS_XI_ACADEMIC_UNITS) {
      expect(routeExists(physicsXiUnitHref(unit), routes)).toBe(true);
      expect(physicsXiDocUrl(unit, "html")).toBe(
        `/resources/physics-xi/${unit.slug}.html`,
      );
      expect(physicsXiDocUrl(unit, "doc")).toBe(
        `/resources/physics-xi/${unit.slug}.doc`,
      );
    }
    expect(routeExists("/resources/physics-xi", routes)).toBe(true);
  });
});

describe("Physics XI exam-anchored layer", () => {
  const syllabus = getSubjectSyllabus("class-11-notes", "physics");

  it("covers every NEB syllabus topic of every unit", () => {
    expect(syllabus, "no class-11 physics syllabus").toBeDefined();
    let total = 0;

    for (const unit of PHYSICS_XI_ACADEMIC_UNITS) {
      const syllabusUnit = syllabus!.units.find(
        (candidate) => candidate.id === unit.unitId,
      );
      expect(syllabusUnit, `no syllabus unit for ${unit.unitId}`).toBeDefined();

      // The topics are the syllabus' own titles, in the syllabus' own order.
      expect(
        unit.syllabusTopics,
        `syllabus topics drifted in ${unit.unitId}`,
      ).toEqual(syllabusUnit!.topics);

      // And on the normalised key, so a renamed topic can never silently
      // go missing from a brief.
      const keys = new Set(unit.syllabusTopics.map(slugifySyllabusTopic));
      for (const topic of syllabusUnit!.topics) {
        expect(
          keys.has(slugifySyllabusTopic(topic)),
          `${unit.unitId} is missing the topic "${topic}"`,
        ).toBe(true);
      }
      total += unit.syllabusTopics.length;
    }

    expect(total).toBe(117);
    expect(PHYSICS_XI_SYLLABUS_TOPIC_COUNT).toBe(117);
  });

  it("gives every unit three misconceptions and a three-part workbook", () => {
    for (const unit of PHYSICS_XI_ACADEMIC_UNITS) {
      expect(unit.misconceptions, `misconceptions in ${unit.unitId}`).toHaveLength(
        3,
      );
      for (const misconception of unit.misconceptions) {
        expect(misconception.claim.length).toBeGreaterThan(20);
        expect(misconception.why.length).toBeGreaterThan(40);
        expect(misconception.correction.length).toBeGreaterThan(40);
      }

      expect(unit.workbook, `workbook in ${unit.unitId}`).toHaveLength(3);
      expect(unit.workbook.map((item) => item.kind).sort()).toEqual([
        "derivation",
        "numerical",
        "reasoning",
      ]);
      for (const item of unit.workbook) {
        expect(item.question.length).toBeGreaterThan(20);
        expect(item.answer.length).toBeGreaterThan(60);
      }
    }
  });

  it("resolves every next step to a page that exists", () => {
    const routes = collectRoutes();
    const syllabusUnitIds = new Set(
      (syllabus?.units ?? []).map((unit) => unit.id),
    );
    const labIds = readLabIds();

    for (const unit of PHYSICS_XI_ACADEMIC_UNITS) {
      expect(unit.nextSteps.length, `next steps in ${unit.unitId}`).toBeGreaterThan(
        0,
      );
      for (const step of unit.nextSteps) {
        expect(step.label).toBeTruthy();
        expect(
          isResolvable(step.href, routes),
          `dead next step: ${step.href}`,
        ).toBe(true);

        const chapter = /^\/class-11-notes\/physics\/chapters\/(.+)$/.exec(
          step.href,
        );
        if (chapter) {
          expect(
            syllabusUnitIds.has(chapter[1]),
            `unknown chapter unit: ${step.href}`,
          ).toBe(true);
          continue;
        }

        const lab = /^\/lab\/(.+)$/.exec(step.href);
        expect(lab, `unrecognised next step shape: ${step.href}`).not.toBeNull();
        expect(
          labIds.has(lab![1]),
          `unknown lab id: ${step.href}`,
        ).toBe(true);
      }
    }
  });
});

describe("Physics XI published documents", () => {
  it("ships an HTML and a Word copy of every unit", () => {
    for (const unit of PHYSICS_XI_ACADEMIC_UNITS) {
      const html = path.join(DOC_DIR, `${unit.slug}.html`);
      const doc = path.join(DOC_DIR, `${unit.slug}.doc`);
      expect(existsSync(html), `missing ${html}`).toBe(true);
      expect(existsSync(doc), `missing ${doc}`).toBe(true);

      const htmlSource = readFileSync(html, "utf8");
      expect(htmlSource).toContain(
        `Unit ${unit.unitNo}: ${escapeHtml(unit.unitName)}`,
      );
      expect(htmlSource).toContain(escapeHtml(unit.summary));

      // The downloadable documents carry the same exam-anchored layer as the
      // site, so a student who takes the file away loses nothing.
      for (const topic of unit.syllabusTopics) {
        expect(htmlSource, `topic "${topic}" missing from ${html}`).toContain(
          escapeHtml(topic),
        );
      }
      expect(htmlSource).toContain(escapeHtml(unit.misconceptions[0].claim));
      expect(htmlSource).toContain(escapeHtml(unit.workbook[0].question));
      expect(htmlSource).toContain(escapeHtml(unit.nextSteps[0].label));

      // The .doc assets are HTML with the Word namespaces, the convention the
      // other published resources in public/resources already use.
      const docSource = readFileSync(doc, "utf8");
      expect(docSource).toContain("urn:schemas-microsoft-com:office:word");
      expect(docSource).toContain(escapeHtml(unit.summary));
      expect(docSource).toContain(escapeHtml(unit.misconceptions[0].claim));
      expect(docSource).toContain(escapeHtml(unit.workbook[0].question));
    }
  });

  it("keeps the documents in step with the dataset", () => {
    // The generator is the only thing allowed to write these files, so a
    // clean --check proves the published documents match the dataset.
    expect(() =>
      execFileSync(
        process.execPath,
        [path.join(REPO_ROOT, "scripts", "generate-physics-academic-docs.mjs"), "--check"],
        { cwd: REPO_ROOT, encoding: "utf8" },
      ),
    ).not.toThrow();
  });
});
