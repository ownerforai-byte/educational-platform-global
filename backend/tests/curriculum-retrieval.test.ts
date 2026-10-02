import { beforeAll, describe, expect, test } from "vitest";

import {
  classLevelFromDeclared,
  detectClassLevel,
  humanizeKey,
  getCorpus,
  getCorpusStats,
  resetCorpusCache,
  type CorpusEntry,
} from "../src/ai/curriculum-corpus";
import {
  buildCurriculumContext,
  formatRecord,
  hasCurriculumCoverage,
  retrieveCurriculum,
} from "../src/ai/curriculum-retrieval";
import { classifyScope, CLASS_SCOPE_RULES, DIRECTIVES } from "../src/ai/class-scope";
import { DEEP_ANSWER_RULES } from "../src/ai/deep-answer";
import { SOURCE_REGISTRY, SOURCE_REGISTRY_RULES } from "../src/ai/source-registry";
import { MASTER_ACADEMIC_PROMPT } from "../src/ai/prompts";

/**
 * Contract suite for the CURRICULUM GROUNDING layer — the owner requirement
 * (2026-09-30) that chat replies stop being shallow: scan the concept first,
 * attach the whole record, stay strictly Class 11/12, and supply a rule for
 * everything that is not Class 11/12.
 *
 * Pins:
 *   1. shape-tolerant source reading (any string/string[] key becomes a section);
 *   2. retrieval — relevant records first, empty result for nothing;
 *   3. WHOLE-RECORD injection — nothing summarised, nothing truncated;
 *   4. the Class 11/12 scope lock and all four "the rest" zones;
 *   5. the deep-answer contract and source hierarchy reaching every prompt.
 */

/**
 * Warm the corpus ONCE for this file. Reading ~1.3k real files is genuine I/O,
 * so it happens in a beforeAll (not per test) and every corpus-touching test
 * declares a generous timeout. Resetting the cache per test would re-read the
 * whole repo on each assertion — that was the original timeout cause.
 */
const CORPUS_TIMEOUT = 30_000;

beforeAll(() => {
  resetCorpusCache();
  getCorpus(); // warm: first read pays the disk cost here
}, CORPUS_TIMEOUT);

describe("corpus reading (shape tolerance)", () => {
  test("humanizeKey turns any key into a readable section label", () => {
    expect(humanizeKey("examShortTricks")).toBe("Exam short tricks");
    expect(humanizeKey("important_concepts")).toBe("Important concepts");
    expect(humanizeKey("keyPoints")).toBe("Key points");
    expect(humanizeKey("notes")).toBe("Notes");
  });

  test("detectClassLevel reads the class out of paths and prose", () => {
    expect(detectClassLevel("class-12/physics/semiconductors")).toBe("class-12");
    expect(detectClassLevel("Class 12 electromagnetism")).toBe("class-12");
    expect(detectClassLevel("class-11-notes/biology/cell")).toBe("class-11");
    expect(detectClassLevel("Grade 11 mechanics")).toBe("class-11");
    expect(detectClassLevel("totally unrelated")).toBe("unknown");
  });

  test("a drop-in record's own class field sets its scope, bare number included", () => {
    expect(classLevelFromDeclared("12")).toBe("class-12");
    expect(classLevelFromDeclared(12)).toBe("class-12");
    expect(classLevelFromDeclared("Class 11")).toBe("class-11");
    expect(classLevelFromDeclared("xii")).toBe("class-12");
    expect(classLevelFromDeclared("grade 11")).toBe("class-11");
    // Out of range / nonsense never invents a level.
    expect(classLevelFromDeclared("13")).toBe("unknown");
    expect(classLevelFromDeclared("12 volts")).toBe("unknown");
    expect(classLevelFromDeclared(undefined)).toBe("unknown");
    expect(classLevelFromDeclared("")).toBe("unknown");
  });

  test("the real repo corpus loads and teaches something", () => {
    const { entries, stats } = getCorpus();
    expect(entries.length).toBeGreaterThan(0);
    expect(stats.roots.length).toBeGreaterThan(0);
    // Every loaded entry must carry at least one labelled section.
    for (const entry of entries.slice(0, 50)) {
      expect(entry.sections.length).toBeGreaterThan(0);
      expect(entry.title.length).toBeGreaterThan(0);
      expect(entry.haystack.length).toBeGreaterThan(0);
    }
  }, CORPUS_TIMEOUT);
});

describe("retrieval (scan the concept first)", () => {
  test("a real syllabus question retrieves a relevant record", () => {
    const hits = retrieveCurriculum("explain the structure and function of a capacitor");
    expect(hits.length).toBeGreaterThan(0);
    const best = hits[0];
    expect(
      best.entry.title.toLowerCase().includes("capacitor") ||
        best.entry.unit.toLowerCase().includes("capacitor") ||
        best.matched.length > 0,
    ).toBe(true);
  }, CORPUS_TIMEOUT);

  test("scores are descending and hits clear the coverage threshold", () => {
    const hits = retrieveCurriculum("what is photosynthesis", 3);
    expect(hits.length).toBeGreaterThan(0);
    // Ranked records never rise. An owner drop-in is promoted to the FRONT on
    // purpose (`selectHits`), because the character ceiling cuts whatever is
    // attached last — so the invariant is asserted over the ranked records,
    // not over the owner's deliberately front-placed material.
    const ranked = hits.filter((h) => !h.entry.dropIn);
    for (let i = 1; i < ranked.length; i++) {
      expect(ranked[i].score).toBeLessThanOrEqual(ranked[i - 1].score);
    }
    expect(hasCurriculumCoverage("what is photosynthesis")).toBe(true);
  }, CORPUS_TIMEOUT);

  test("nonsense retrieves nothing rather than forcing a match", () => {
    expect(retrieveCurriculum("zzzqqqxyzzy plugh")).toEqual([]);
    expect(hasCurriculumCoverage("zzzqqqxyzzy plugh")).toBe(false);
  }, CORPUS_TIMEOUT);

  test("an empty or too-short question never throws", () => {
    expect(retrieveCurriculum("")).toEqual([]);
    expect(retrieveCurriculum("  a  ")).toEqual([]);
    expect(buildCurriculumContext("")).toBe("");
  }, CORPUS_TIMEOUT);
});

describe("whole-record injection (the anti-shallow guarantee)", () => {
  test("every section line of a matched record reaches the prompt verbatim", () => {
    const question = "explain the structure and function of a capacitor";
    const hits = retrieveCurriculum(question, 3);
    expect(hits.length).toBeGreaterThan(0);
    const context = buildCurriculumContext(question, 3);
    expect(context.length).toBeGreaterThan(0);
    expect(context).toContain("[CURRICULUM SOURCE");

    // The whole point: the top record is attached COMPLETE — its title, its
    // source, and every line of every section. Nothing summarised, nothing cut.
    const top = hits[0].entry;
    expect(context).toContain(top.title);
    expect(context).toContain(top.source);
    for (const section of top.sections) {
      for (const line of section.lines) {
        expect(context).toContain(line);
      }
    }
  }, CORPUS_TIMEOUT);

  test("formatRecord labels each section and never drops a line", () => {
    const entry: CorpusEntry = {
      id: "kb/test.json",
      classLevel: "class-12",
      subject: "physics",
      unit: "capacitor",
      title: "Capacitor in a DC circuit",
      topicSlug: "capacitor",
      relevance: 100,
      sections: [
        { label: "Notes", lines: ["Charging follows q = CV(1 - e^{-t/RC})."] },
        { label: "Exam traps", lines: ["Time constant is RC, not R/C."] },
      ],
      haystack: "capacitor charging",
      source: "kb/test.json",
      dropIn: true,
    };

    const out = formatRecord(entry);
    expect(out).toContain("Class 12");
    expect(out).toContain("physics");
    expect(out).toContain("▸ Notes:");
    expect(out).toContain("▸ Exam traps:");
    expect(out).toContain("q = CV(1 - e^{-t/RC}).");
    expect(out).toContain("Time constant is RC, not R/C.");
  });

  test("the context announces what the platform indexed", () => {
    const context = buildCurriculumContext("explain the structure and function of a capacitor");
    expect(context).toContain("Indexed sources:");
    expect(context).toContain("nothing was summarised or cut");
    // The index itself must agree with what was announced.
    const stats = getCorpusStats();
    expect(stats.entries).toBeGreaterThan(0);
    expect(context).toContain(`Indexed sources: ${stats.entries} records`);
  }, CORPUS_TIMEOUT);
});

describe("class scope — strictly Class 11/12, and the rule for the rest", () => {
  test("an in-scope question names its class", () => {
    expect(classifyScope("explain Gauss law class 12").zone).toBe("class-12");
    expect(classifyScope("what is dimensional analysis class 11").zone).toBe("class-11");
  });

  test("an unnamed level defaults to the platform frame", () => {
    const scope = classifyScope("what is a chemical bond");
    expect(scope.zone).toBe("class-11");
    expect(scope.directive).toContain("CLASS SCOPE");
  });

  test("a missing prerequisite reaches down, then returns to Class 11/12", () => {
    const scope = classifyScope("I forgot fractions — explain this from scratch");
    expect(scope.zone).toBe("prerequisite");
    expect(scope.directive).toContain("REACHING DOWN");
    expect(scope.directive).toContain("RETURN");
  });

  test("material above Class 12 is labelled, not refused", () => {
    const scope = classifyScope("explain the Lagrangian formulation");
    expect(scope.zone).toBe("beyond-12");
    expect(scope.directive).toContain("BEYOND CLASS 12");
    expect(scope.directive).toContain("LABEL");
    expect(scope.directive).toContain("do not water it down or refuse");
  });

  test("another board is answered then mapped back to NEB", () => {
    const scope = classifyScope("How does CBSE teach photosynthesis?");
    expect(scope.zone).toBe("outside-boards");
    expect(scope.directive).toContain("OTHER BOARD");
    expect(scope.directive).toContain("NEB Class 11/12");
  });

  test("a human question is never clamped to the syllabus", () => {
    const scope = classifyScope("I am feeling very anxious before my exams");
    expect(scope.zone).toBe("non-academic");
    expect(scope.directive).toContain("does NOT apply");
  });

  test("every zone ships a directive, and the general rule is present", () => {
    for (const key of [
      "class-11",
      "class-12",
      "prerequisite",
      "beyond-12",
      "outside-boards",
      "non-academic",
    ] as const) {
      expect(DIRECTIVES[key].length).toBeGreaterThan(50);
      expect(DIRECTIVES[key]).toContain("CLASS SCOPE");
    }
    expect(CLASS_SCOPE_RULES).toContain("STRICTLY NEB +2 SCIENCE");
    expect(CLASS_SCOPE_RULES).toContain("NEVER refuse a student");
  });
});

describe("deep-answer contract + source hierarchy reach every chat request", () => {
  test("the deep-answer contract demands scan-first, keywords beneath, output over code", () => {
    expect(DEEP_ANSWER_RULES).toContain("DEEP ANSWER CONTRACT");
    expect(DEEP_ANSWER_RULES).toContain("NO SHALLOW, HOLLOW REPLIES");
    expect(DEEP_ANSWER_RULES).toContain("BEFORE WRITING: scan the concept");
    expect(DEEP_ANSWER_RULES).toContain("Key words");
    expect(DEEP_ANSWER_RULES).toContain("BENEATH EACH IDEA, NOT AT THE END");
    expect(DEEP_ANSWER_RULES).toContain("OUTPUT THE LEARNER SEES, NOT RAW CODE");
    expect(DEEP_ANSWER_RULES).toContain("EASY GRAMMAR FIRST");
  });

  test("the source registry is ordered by trust and names a drop-in path", () => {
    expect(SOURCE_REGISTRY.length).toBeGreaterThan(4);
    const tiers = SOURCE_REGISTRY.map((s) => s.tier);
    // Trust order is non-decreasing: the registry reads as the trust ladder.
    for (let i = 1; i < tiers.length; i++) {
      expect(tiers[i]).toBeGreaterThanOrEqual(tiers[i - 1]);
    }
    expect(SOURCE_REGISTRY[0].kind).toBe("drop-in");
    expect(SOURCE_REGISTRY[0].path).toContain("backend/kb");
    expect(SOURCE_REGISTRY.every((s) => s.scope.length > 0 && s.howToSupply.length > 0)).toBe(true);
    expect(SOURCE_REGISTRY_RULES).toContain("SOURCE HIERARCHY");
    expect(SOURCE_REGISTRY_RULES).toContain("CITE BY NAME, NEVER BY URL");
    expect(SOURCE_REGISTRY_RULES).toContain("STRICT OFFICIAL ALLOWLIST");
    expect(SOURCE_REGISTRY_RULES).toContain("neb.gov.np");
    expect(SOURCE_REGISTRY_RULES).toContain("FORBIDDEN");
  });

  test("all five layers are stacked into the master prompt, in order, artefact-free", () => {
    const layers = [
      "VEER — CORE RULES",
      "[MASTER ACADEMIC INTELLIGENCE SYSTEM]",
      "[DEEP ANSWER CONTRACT",
      "[CLASS SCOPE — STRICTLY NEB",
      "[SOURCE HIERARCHY",
    ];
    let cursor = -1;
    for (const layer of layers) {
      const at = MASTER_ACADEMIC_PROMPT.indexOf(layer);
      expect(at, `layer missing: ${layer}`).toBeGreaterThan(-1);
      expect(at, `layer out of order: ${layer}`).toBeGreaterThan(cursor);
      cursor = at;
    }
    // No template artefacts may leak into a prompt that is shipped as a string.
    expect(MASTER_ACADEMIC_PROMPT).not.toContain("`");
    expect(MASTER_ACADEMIC_PROMPT).not.toContain("${");
  });
});


