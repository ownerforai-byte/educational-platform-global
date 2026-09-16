import { describe, expect, it } from "vitest";
import {
  ANIMAL_ONLY_ORGANELLES,
  CELL_HOTSPOTS,
  CELL_TOPIC_REF,
  CELL_UNIT_ALIASES,
  PLANT_ONLY_ORGANELLES,
  isOrganelleVisible,
  resolveCellTopicRef,
  resolveCellUnitId,
  visibleAnimalStructures,
  visiblePlantStructures,
} from "@/components/lab/3d-rig/biology-cell-hotspots";
import {
  CONCEPT_FIELD_KEYS,
  countPopulatedFields,
  findConceptEntry,
  isConceptEntryForUnit,
  parseManifest,
  toConceptData,
  type ConceptManifestEntry,
} from "@/components/lab/3d-rig/concept-lookup";

/**
 * Task 4 — Showcase 1 (Biology Cell 3D) contract tests.
 *
 * These cover the parts of the showcase that are pure logic, so both rule TRs
 * stay enforced without a WebGL surface:
 *   T4-TR1  ≥ 6 hotspots render, clickable  → hotspot inventory + labels
 *   T4-TR2  plant/animal toggle adds/removes → organelle visibility rules
 * plus the AC-07 wiring: hotspots must map onto real concept-JSON field keys
 * resolved from the manifest (never demo strings).
 */

const MANIFEST: ConceptManifestEntry[] = [
  {
    path: "class-11-notes/biology/biomolecules-and-cell-biology/concepts/02-cell-introduction.json",
    data: { topicSlug: "cell-introduction", formulas: ["F = ma"] },
  },
  {
    path: "class-11-notes/biology/biomolecules-and-cell-biology/concepts/03-detail-structure-of-eukaryotic-cells.json",
    data: {
      topicSlug: "detail-structure-of-eukaryotic-cells",
      formulas: ["$F = m \\cdot a$"],
      confusion: ["one", "two", "three"],
      notes: ["organelle notes"],
      summary: "Eukaryotic Cell Organelles",
      mcqs: [{ question: "q", options: ["a", "b"], answer: "a" }],
    },
  },
  {
    path: "class-11-notes/biology/ecology/concepts/01-ecology.json",
    data: { topicSlug: "ecology-intro" },
  },
];

describe("CELL_HOTSPOTS (T4-TR1, AC-06)", () => {
  it("exposes at least 6 clickable knowledge hotspots", () => {
    expect(CELL_HOTSPOTS.length).toBeGreaterThanOrEqual(6);
  });

  it("uses unique ids so every marker opens its own panel", () => {
    const ids = CELL_HOTSPOTS.map((hotspot) => hotspot.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("places every hotspot at a finite world position", () => {
    for (const hotspot of CELL_HOTSPOTS) {
      expect(hotspot.position).toHaveLength(3);
      for (const axis of hotspot.position) {
        expect(Number.isFinite(axis)).toBe(true);
      }
    }
  });

  it("labels each hotspot and carries an a11y sentence", () => {
    for (const hotspot of CELL_HOTSPOTS) {
      expect(hotspot.label.trim().length).toBeGreaterThan(0);
      expect(hotspot.summaryA11ySentence?.trim().length ?? 0).toBeGreaterThan(0);
    }
  });

  it("only references concept fields from the shared taxonomy (AC-07)", () => {
    const taxonomy = new Set<string>(CONCEPT_FIELD_KEYS);
    for (const hotspot of CELL_HOTSPOTS) {
      expect(hotspot.fieldKeys.length).toBeGreaterThan(0);
      for (const key of hotspot.fieldKeys) {
        expect(taxonomy.has(key)).toBe(true);
      }
    }
  });

  it("implements the Task 4 scope #3 hotspot to field mapping", () => {
    const fieldKeys = (id: string) =>
      CELL_HOTSPOTS.find((hotspot) => hotspot.id === id)?.fieldKeys ?? [];

    expect(fieldKeys("nucleus")).toEqual(["importantConcepts", "keyPoints", "importantNotes"]);
    expect(fieldKeys("mitochondrion")).toEqual(["formulas", "universalFacts", "examShortTricks"]);
    expect(fieldKeys("chloroplast")).toEqual(["keyPoints", "confusion", "specialNotes"]);
    expect(fieldKeys("rer")).toEqual(["keyPoints", "importantNotes"]);
    expect(fieldKeys("golgi")).toEqual(["importantConcepts", "importantNotes"]);
    expect(fieldKeys("membrane")).toEqual(["importantStatements", "confusion", "keyPoints"]);
  });
});

describe("plant / animal visibility rules (T4-TR2)", () => {
  it("shows plant-only structures only in plant mode", () => {
    for (const organelle of PLANT_ONLY_ORGANELLES) {
      expect(isOrganelleVisible(organelle, "plant")).toBe(true);
      expect(isOrganelleVisible(organelle, "animal")).toBe(false);
    }
  });

  it("shows animal-only structures only in animal mode", () => {
    for (const organelle of ANIMAL_ONLY_ORGANELLES) {
      expect(isOrganelleVisible(organelle, "animal")).toBe(true);
      expect(isOrganelleVisible(organelle, "plant")).toBe(false);
    }
  });

  it("keeps the shared organelles in both modes", () => {
    for (const organelle of ["nucleus", "mitochondria", "golgi", "rer", "membrane"]) {
      expect(isOrganelleVisible(organelle, "plant")).toBe(true);
      expect(isOrganelleVisible(organelle, "animal")).toBe(true);
    }
  });

  it("reports the toggled structure sets", () => {
    expect(visiblePlantStructures("plant")).toEqual([...PLANT_ONLY_ORGANELLES]);
    expect(visiblePlantStructures("animal")).toEqual([]);
    expect(visibleAnimalStructures("animal")).toEqual([...ANIMAL_ONLY_ORGANELLES]);
    expect(visibleAnimalStructures("plant")).toEqual([]);
  });
});

describe("concept routing (Task 4 scope #4)", () => {
  it("defaults to the published cell-ultrastructure topic", () => {
    expect(resolveCellTopicRef()).toEqual(CELL_TOPIC_REF);
    expect(resolveCellTopicRef({ unitId: "  " })).toEqual(CELL_TOPIC_REF);
  });

  it("maps the spec's cell-biology unit id onto the published directory", () => {
    expect(resolveCellUnitId("cell-biology")).toBe("biomolecules-and-cell-biology");
    expect(resolveCellUnitId("CELL-BIOLOGY")).toBe("biomolecules-and-cell-biology");
    expect(Object.keys(CELL_UNIT_ALIASES).length).toBeGreaterThan(0);
  });

  it("passes unknown unit ids through untouched", () => {
    expect(resolveCellUnitId("introductory-microbiology")).toBe("introductory-microbiology");
  });

  it("applies query-param overrides and trims them", () => {
    expect(
      resolveCellTopicRef({
        classSlug: " class-11-notes ",
        subjectSlug: "biology",
        unitId: "cell-biology",
        topicSlug: " detail-structure-of-eukaryotic-cells ",
      }),
    ).toEqual({
      classSlug: "class-11-notes",
      subjectSlug: "biology",
      unitId: "biomolecules-and-cell-biology",
      topicSlug: "detail-structure-of-eukaryotic-cells",
    });
  });
});

describe("manifest resolution (AC-07)", () => {
  it("prefers the exact topic match inside the requested unit", () => {
    const entry = findConceptEntry(MANIFEST, CELL_TOPIC_REF);
    expect(entry?.path).toContain("03-detail-structure-of-eukaryotic-cells.json");
  });

  it("falls back to the first concept of the unit when the topic is unpublished", () => {
    const entry = findConceptEntry(MANIFEST, { ...CELL_TOPIC_REF, topicSlug: "not-published" });
    expect(entry?.path).toContain("02-cell-introduction.json");
  });

  it("returns null when the unit is missing, so the scene still renders", () => {
    expect(findConceptEntry(MANIFEST, { ...CELL_TOPIC_REF, unitId: "nope" })).toBeNull();
  });

  it("matches only <class>/<subject>/<unit>/concepts/ paths", () => {
    expect(isConceptEntryForUnit(MANIFEST[1], CELL_TOPIC_REF)).toBe(true);
    expect(
      isConceptEntryForUnit(
        { path: "class-11-notes/biology/x/short.json", data: {} },
        CELL_TOPIC_REF,
      ),
    ).toBe(false);
  });

  it("drops malformed manifest rows instead of throwing", () => {
    const parsed = parseManifest([
      null,
      { path: "a/b/c/concepts/d.json" },
      { data: {} },
      { path: "a/b/c/concepts/d.json", data: { formulas: ["x"] } },
      "nope",
    ]);
    expect(parsed).toHaveLength(1);
    expect(parseManifest({}).length).toBe(0);
  });
});

describe("toConceptData projection", () => {
  it("keeps string arrays and unwraps scalar strings", () => {
    const projected = toConceptData({
      formulas: ["$F = m \\cdot a$"],
      confusion: ["a", "b"],
      summary: "Eukaryotic Cell Organelles",
    });
    expect(projected?.formulas).toEqual(["$F = m \\cdot a$"]);
    expect(projected?.confusion).toEqual(["a", "b"]);
    expect(projected?.summary).toEqual(["Eukaryotic Cell Organelles"]);
  });

  it("drops keys the 3D panel cannot render (mcq objects, notes, blank values)", () => {
    const projected = toConceptData({
      formulas: ["x"],
      mcs: [{ question: "q", options: ["a"], answer: "a" }],
      notes: ["organelle notes"],
      keyPoints: [],
      examShortTricks: "   ",
    });
    expect(projected).toEqual({ formulas: ["x"] });
  });

  it("returns null for empty or non-object input", () => {
    expect(toConceptData(null)).toBeNull();
    expect(toConceptData("string")).toBeNull();
    expect(toConceptData({ unknown: ["x"] })).toBeNull();
  });

  it("counts populated fields for the slot-map readout", () => {
    expect(countPopulatedFields(toConceptData({ formulas: ["a"], summary: "s" }))).toBe(2);
    expect(countPopulatedFields(null)).toBe(0);
  });

  it("resolves the real corpus entry shape end to end", () => {
    const entry = findConceptEntry(MANIFEST, CELL_TOPIC_REF);
    const projected = toConceptData(entry?.data);
    expect(projected?.formulas).toHaveLength(1);
    expect(projected?.confusion).toHaveLength(3);
  });
});