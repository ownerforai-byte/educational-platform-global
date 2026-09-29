/**
 * Topic-derived visual engine — the guarantees behind "every branch and
 * schematic is about its own topic".
 *
 * These pin the three defects the audit found in the wild:
 *   1. a unit's tree being built from ANOTHER unit's fact-bank entry
 *      (`vectors`/`mathematics` pulling the physics entry, and the five units
 *      that used to show 0% of their own vocabulary),
 *   2. a topic falling back to the shared subject tree / the inclined-plane
 *      sheet for 599 topics that are not about inclined planes,
 *   3. a generated tree containing content with no source in its own unit.
 */

import { describe, expect, it } from "vitest";

import { SYLLABUS } from "@/lib/syllabus";
import {
  ALL_HIGH_YIELD_TOPICS,
  getHighYieldEntriesForUnit,
} from "@/lib/high-yield-topic-facts";
import { buildUnitMindmapBranches } from "@/lib/unit-mindmap-branches";
import {
  buildTopicBranches,
  buildTopicKnowledge,
  buildTopicSchematic,
  classifyDiagramKind,
  isAuthoredSpecialTopic,
  isInclinedPlaneTopic,
  resolveUnitScope,
  resolveVisualBranches,
  words,
} from "@/lib/topic-visuals";

const NORMALIZE = (s: string) => (s || "").replace(/\s+/g, " ").trim().toLowerCase();

function allUnits() {
  const out: {
    classSlug: string;
    subjectSlug: string;
    unitId: string;
    unitTitle: string;
    topics: string[];
  }[] = [];
  for (const cls of SYLLABUS) {
    for (const subject of cls.subjects) {
      for (const unit of subject.units) {
        out.push({
          classSlug: cls.slug,
          subjectSlug: subject.slug,
          unitId: unit.id,
          unitTitle: unit.title,
          topics: [...(unit.topics ?? [])],
        });
      }
    }
  }
  return out;
}

const UNITS = allUnits();

function textOf(tree: ReturnType<typeof resolveVisualBranches>["branches"]) {
  const parts: string[] = [];
  for (const b of tree) {
    parts.push(b.category);
    for (const sb of b.subBranches) {
      parts.push(sb.title);
      for (const n of sb.nodes) parts.push(n.title, n.description ?? "");
    }
  }
  return parts.join(" ");
}

describe("unit scope resolution", () => {
  it("resolves every syllabus unit id to its own title and topics", () => {
    for (const u of UNITS) {
      const scope = resolveUnitScope(u.unitId, u.classSlug, u.subjectSlug);
      expect(scope, `${u.unitId} has no resolved scope`).toBeDefined();
      expect(scope!.unitTitle).toBe(u.unitTitle);
      expect(scope!.topics).toEqual(u.topics);
    }
  });

  it("keeps a shared unit id on its own track", () => {
    // language-development exists in both tracks with different titles and
    // different topic counts; a class-11 reader must not see class-12's list.
    // `shared` includes class-11 `vectors` twice (physics and mathematics both
    // define it), so class + subject together — not the id alone — select it.
    const shared = UNITS.filter((u) =>
      UNITS.some((o) => o !== u && o.unitId === u.unitId),
    );
    expect(shared.length).toBeGreaterThan(0);
    for (const u of shared) {
      const scope = resolveUnitScope(u.unitId, u.classSlug, u.subjectSlug)!;
      expect(scope.unitTitle).toBe(u.unitTitle);
      expect(scope.topics).toEqual(u.topics);
    }
  });

  it("merges topics across tracks when the caller does not know its track", () => {
    const merged = resolveUnitScope("language-development")!;
    const tracks = UNITS.filter((u) => u.unitId === "language-development");
    expect(tracks.length).toBeGreaterThan(1);
    expect(merged.topics.length).toBeGreaterThanOrEqual(Math.max(...tracks.map((t) => t.topics.length)));
  });
});

describe("fact-bank unit lookup (the wrong-unit regression)", () => {
  it("never hands a physics entry to a mathematics unit of the same id", () => {
    const maths = getHighYieldEntriesForUnit("vectors", "mathematics");
    expect(maths.every((e) => e.subject !== "physics")).toBe(true);
  });

  it("keeps chemistry entries on their own subject", () => {
    const chem = getHighYieldEntriesForUnit("hydrocarbons", "chemistry");
    expect(chem.length).toBeGreaterThan(0);
    expect(chem.every((e) => e.subject === "chemistry" || e.subject === "general")).toBe(true);
  });

  it("returns nothing for a unit no entry claims — no keyword guessing", () => {
    expect(getHighYieldEntriesForUnit("alcohols-phenols-ethers", "chemistry")).toEqual([]);
    expect(buildUnitMindmapBranches("alcohols-phenols-ethers", "chemistry")).toBeUndefined();
  });

  it("still reaches the entries whose unit slug was written literally", () => {
    const exact = getHighYieldEntriesForUnit("fundamentals-of-applied-chemistry", "chemistry");
    expect(exact.length).toBeGreaterThan(0);
    expect(exact[0].title.toLowerCase()).toContain("applied chemistry");
    // Every entry that exists must claim at least one real syllabus unit id.
    const realIds = new Set(UNITS.map((u) => u.unitId));
    for (const e of ALL_HIGH_YIELD_TOPICS) {
      expect(e.unitSlugs?.length ?? 0).toBeGreaterThan(0);
      expect(e.unitSlugs!.some((s) => realIds.has(s))).toBe(true);
    }
  });
});

describe("diagram kind classification (what drawing a topic needs)", () => {
  const classify = (topicTitle: string, unitTitle = "", subject = "physics") =>
    classifyDiagramKind({
      subject,
      topicTitle,
      unitTitle,
      scope: [topicTitle],
      focus: [topicTitle],
      blob: topicTitle,
    });

  it("reads cyclic processes as cycles", () => {
    expect(classify("Biogeochemical Cycles — Carbon and Nitrogen")).toBe("cycle");
  });

  it("reads classification as classification", () => {
    expect(classify("Five Kingdom Classification System", "Introduction to Biology", "biology")).toBe(
      "classification",
    );
  });

  it("reads anatomy as structure", () => {
    expect(classify("Heart Structure and Cardiac Cycle", "Circulation", "biology")).toBe("structure");
  });

  it("reads graph questions as graphs", () => {
    expect(classify("Variation of velocity with time")).toBe("graph");
  });

  it("reads comparison prompts as comparisons", () => {
    expect(classify("Differentiate between mitosis and meiosis", "", "biology")).toBe("comparison");
  });

  it("defaults to a relation map for quantitative topics", () => {
    expect(classify("Ohm's law")).toBe("formula-map");
  });
});

describe("topic-derived branch trees", () => {
  it("builds a tree from the unit's own scope for a unit with no curated entry", () => {
    const unit = UNITS.find((u) => u.unitId === "alcohols-phenols-ethers")!;
    const knowledge = buildTopicKnowledge({
      subjectSlug: unit.subjectSlug,
      classSlug: unit.classSlug,
      unitId: unit.unitId,
      topicSlug: "alcohols-phenols-ethers",
      topicTitle: unit.topics[0] ?? "",
    });
    const tree = buildTopicBranches(knowledge);

    expect(tree.length).toBeGreaterThan(0);
    const blob = textOf(tree);
    const scopeWords = words(unit.unitTitle).concat(words(unit.topics.join(" ")));
    const own = scopeWords.filter((w) => blob.includes(w));
    expect(own.length / scopeWords.length).toBeGreaterThan(0.3);
  });

  it("gives two different units two different trees", () => {
    const blobOf = (id: string) => {
      const unit = UNITS.find((u) => u.unitId === id)!;
      const resolved = resolveVisualBranches({
        subjectSlug: unit.subjectSlug,
        classSlug: unit.classSlug,
        unitId: unit.unitId,
        topicSlug: unit.unitId,
        topicTitle: unit.unitTitle,
      });
      return textOf(resolved.branches);
    };
    expect(blobOf("thermal-expansion")).not.toBe(blobOf("wave-optics"));
    expect(blobOf("stoichiometry")).not.toBe(blobOf("amines"));
    // Each tree must actually carry its own unit's scope sentences (the tree
    // shows the first five; every statement stays in the resolved scope).
    const stoichUnit = UNITS.find((u) => u.unitId === "stoichiometry")!;
    const stoich = blobOf("stoichiometry");
    const inTree = stoichUnit.topics.filter((t) => stoich.includes(t.slice(0, 40)));
    expect(inTree.length).toBeGreaterThanOrEqual(4);
    expect(
      resolveUnitScope("stoichiometry", stoichUnit.classSlug, stoichUnit.subjectSlug)!.topics,
    ).toEqual(stoichUnit.topics);
  });

  it("only ever emits leaves whose text traces back to its own sources", () => {
    // Provenance: every generated leaf is one of the unit's bank terms, its own
    // syllabus statements, or the note items handed in.
    for (const unit of UNITS.slice(0, 24)) {
      const knowledge = buildTopicKnowledge({
        subjectSlug: unit.subjectSlug,
        classSlug: unit.classSlug,
        unitId: unit.unitId,
        topicSlug: unit.unitId,
        topicTitle: unit.unitTitle,
      });
      const allowed = new Set<string>();
      for (const e of getHighYieldEntriesForUnit(unit.unitId, unit.subjectSlug)) {
        for (const l of e.governingLaws) allowed.add(NORMALIZE(l.name).slice(0, 44));
        for (const f of e.speedFormulas) allowed.add(NORMALIZE(f.name).slice(0, 44));
        for (const t of e.keyTermsAndDefinitions) allowed.add(NORMALIZE(t.term).slice(0, 44));
        for (const t of e.entranceTraps) allowed.add(NORMALIZE(t.trap).slice(0, 44));
        for (const n of e.workedNumericals) allowed.add(NORMALIZE(n.problem).slice(0, 44));
        for (const c of e.constantsAndValues)
          allowed.add(NORMALIZE(`${c.symbol} — ${c.name}`).slice(0, 44));
      }
      for (const item of knowledge.items) allowed.add(NORMALIZE(item.name).slice(0, 44));
      for (const s of knowledge.scope) allowed.add(NORMALIZE(s).slice(0, 44));
      // Template-authored leaves: their headline is composed from the unit's
      // own title, so the title itself is the source.
      allowed.add(NORMALIZE(unit.unitTitle).slice(0, 44));
      allowed.add("answer structure for");

      const tree = buildTopicBranches(knowledge);
      const leaves: string[] = [];
      for (const b of tree) {
        for (const sb of b.subBranches) for (const n of sb.nodes) leaves.push(n.title);
      }
      expect(leaves.length, `${unit.unitId} produced no leaves`).toBeGreaterThan(0);
      for (const leaf of leaves) {
        const key = NORMALIZE(leaf).slice(0, 44);
        const ok = [...allowed].some((a) => a === key || a.startsWith(key) || key.startsWith(a));
        expect(ok, `${unit.unitId}: unsourced leaf "${leaf}"`).toBe(true);
      }
    }
  });
});

describe("topic-derived schematics (the inclined-plane regression)", () => {
  it("gives every syllabus topic a drawing with at least two labelled parts", () => {
    for (const unit of UNITS) {
      for (let i = 0; i < unit.topics.length; i += 1) {
        const knowledge = buildTopicKnowledge({
          subjectSlug: unit.subjectSlug,
          classSlug: unit.classSlug,
          unitId: unit.unitId,
          topicSlug: "topic",
          topicTitle: unit.topics[i],
        });
        if (isInclinedPlaneTopic("topic", unit.topics[i], unit.unitId)) continue;
        const schematic = buildTopicSchematic(knowledge);
        expect(schematic.annotations.length).toBeGreaterThanOrEqual(2);
        expect(schematic.renderSvg).toBeTypeOf("function");
        expect(() => schematic.renderSvg()).not.toThrow();
      }
    }
  }, 30_000);

  it("places every annotation label inside the 900x520 sheet", () => {
    for (const unit of UNITS.slice(0, 40)) {
      const schematic = buildTopicSchematic(
        buildTopicKnowledge({
          subjectSlug: unit.subjectSlug,
          classSlug: unit.classSlug,
          unitId: unit.unitId,
          topicSlug: unit.unitId,
          topicTitle: unit.unitTitle,
        }),
      );
      for (const a of schematic.annotations) {
        expect(a.labelX).toBeGreaterThanOrEqual(0);
        expect(a.labelX).toBeLessThanOrEqual(900);
        expect(a.labelY).toBeGreaterThanOrEqual(0);
        expect(a.labelY).toBeLessThanOrEqual(520);
        expect(a.examNote.length).toBeGreaterThan(10);
      }
    }
  });

  it("keeps the inclined plane only for topics that really are about a plane", () => {
    expect(isInclinedPlaneTopic("friction-on-an-inclined-plane", "", "")).toBe(true);
    expect(isInclinedPlaneTopic("thermal-expansion", "", "")).toBe(false);
    expect(isInclinedPlaneTopic("grammar-and-usage", "", "")).toBe(false);
  });

  it("recognises the hand-authored specials so they keep winning", () => {
    expect(isAuthoredSpecialTopic("biology", "nephron-structure", "")).toBe(true);
    expect(isAuthoredSpecialTopic("physics", "projectile-motion", "")).toBe(true);
    expect(isAuthoredSpecialTopic("english", "grammar-and-usage", "")).toBe(false);
  });
});

describe("the five units that used to show another unit's tree", () => {
  const previouslyWrong = [
    "introduction-to-biology",
    "fundamentals-of-applied-chemistry",
    "thermal-expansion",
    "alcohols-phenols-ethers",
    "amines",
  ];

  it.each(previouslyWrong)("%s now resolves a tree of its own", (unitId) => {
    const unit = UNITS.find((u) => u.unitId === unitId);
    expect(unit, `${unitId} is not a syllabus unit`).toBeDefined();
    const resolved = resolveVisualBranches({
      subjectSlug: unit!.subjectSlug,
      classSlug: unit!.classSlug,
      unitId,
      topicSlug: unitId,
      topicTitle: unit!.unitTitle,
    });
    expect(resolved.source).not.toBe("none");
    expect(resolved.branches.length).toBeGreaterThan(0);

    const blob = textOf(resolved.branches);
    const ownWords = words(unit!.unitTitle).concat(
      ...unit!.topics.map((t) => words(t)),
    );
    const hit = ownWords.filter((w) => blob.includes(w));
    expect(hit.length).toBeGreaterThan(0);
  });
});
