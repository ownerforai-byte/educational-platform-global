import type { KnowledgeHotspotDef } from "./types";
import type { TopicRef } from "./concept-lookup";

/**
 * Showcase 1 — Biology Cell Ultrastructure (Task 4).
 *
 * Pure data + visibility rules for the 3D cell scene. Kept free of React/three
 * imports so the plant/animal rules and hotspot↔field mapping are unit testable
 * (T4-TR1 / T4-TR2 / AC-06).
 */

/** Default concept-JSON coordinates for NEB XI Biology — cell ultrastructure. */
export const CELL_TOPIC_REF: TopicRef = {
  classSlug: "class-11-notes",
  subjectSlug: "biology",
  unitId: "biomolecules-and-cell-biology",
  topicSlug: "detail-structure-of-eukaryotic-cells",
};

/**
 * The Task 4 spec documents the showcase deep link as `?unitId=cell-biology`,
 * but the published manifest directory is `biomolecules-and-cell-biology`.
 * Accept both (plus a couple of friendly aliases) so the documented URL keeps
 * resolving real concept JSON instead of silently emptying every panel.
 */
export const CELL_UNIT_ALIASES: Record<string, string> = {
  "cell-biology": "biomolecules-and-cell-biology",
  "cell-ultrastructure": "biomolecules-and-cell-biology",
  "cell-biology-unit-1": "biomolecules-and-cell-biology",
  "unit-1": "biomolecules-and-cell-biology",
  unit1: "biomolecules-and-cell-biology",
};

export function resolveCellUnitId(unitId?: string | null): string {
  const value = unitId?.trim();
  if (!value) return CELL_TOPIC_REF.unitId;
  return CELL_UNIT_ALIASES[value.toLowerCase()] ?? value;
}

export type CellTopicQuery = {
  classSlug?: string | null;
  subjectSlug?: string | null;
  unitId?: string | null;
  topicSlug?: string | null;
};

/** Normalises URL/query-param values into a manifest-resolvable topic ref. */
export function resolveCellTopicRef(query: CellTopicQuery = {}): TopicRef {
  return {
    classSlug: query.classSlug?.trim() || CELL_TOPIC_REF.classSlug,
    subjectSlug: query.subjectSlug?.trim() || CELL_TOPIC_REF.subjectSlug,
    unitId: resolveCellUnitId(query.unitId),
    topicSlug: query.topicSlug?.trim() || CELL_TOPIC_REF.topicSlug,
  };
}

export type CellMode = "plant" | "animal";

/** Structures that only exist in a plant cell (animated out in animal mode). */
export const PLANT_ONLY_ORGANELLES = ["cellWall", "centralVacuole", "chloroplast"] as const;

/** Structures that only exist in an animal cell (animated out in plant mode). */
export const ANIMAL_ONLY_ORGANELLES = ["lysosome", "centriole"] as const;

export type PlantOnlyOrganelle = (typeof PLANT_ONLY_ORGANELLES)[number];
export type AnimalOnlyOrganelle = (typeof ANIMAL_ONLY_ORGANELLES)[number];

export type OrganelleId =
  | PlantOnlyOrganelle
  | AnimalOnlyOrganelle
  | "membrane"
  | "cytoplasm"
  | "nucleus"
  | "nucleolus"
  | "rer"
  | "ser"
  | "golgi"
  | "mitochondria"
  | "ribosomes";

/**
 * T4-TR2: the plant/animal toggle must add/remove the mode-specific organelles.
 * Shared organelles are always visible; plant-only shows in plant mode etc.
 */
export function isOrganelleVisible(organelleId: OrganelleId | string, mode: CellMode): boolean {
  if ((PLANT_ONLY_ORGANELLES as readonly string[]).includes(organelleId)) {
    return mode === "plant";
  }
  if ((ANIMAL_ONLY_ORGANELLES as readonly string[]).includes(organelleId)) {
    return mode === "animal";
  }
  return true;
}

/** Convenience for tests/telemetry: the plant-only ids visible in a mode. */
export function visiblePlantStructures(mode: CellMode): PlantOnlyOrganelle[] {
  return PLANT_ONLY_ORGANELLES.filter((id) => isOrganelleVisible(id, mode));
}

/** Convenience for tests/telemetry: the animal-only ids visible in a mode. */
export function visibleAnimalStructures(mode: CellMode): AnimalOnlyOrganelle[] {
  return ANIMAL_ONLY_ORGANELLES.filter((id) => isOrganelleVisible(id, mode));
}

/**
 * 7 knowledge hotspots (T4-TR1 requires ≥ 6). `fieldKeys` is the Task 4 scope #3
 * mapping onto the shared concept-field taxonomy — `KnowledgeSpotPanelContent`
 * renders the four core fields for every hotspot and these extra slots beside
 * them. Positions are world-space, hugging the organelle they describe.
 */
export const CELL_HOTSPOTS: KnowledgeHotspotDef[] = [
  {
    id: "nucleus",
    label: "Nucleus",
    position: [0.95, 0.5, 0.15],
    iconColor: "#8b5cf6",
    fieldKeys: ["importantConcepts", "keyPoints", "importantNotes"],
    summaryA11ySentence: "Nucleus hotspot — opens 3 knowledge fields",
  },
  {
    id: "mitochondrion",
    label: "Mitochondrion",
    position: [-1.35, -0.4, 0.7],
    iconColor: "#ef4444",
    fieldKeys: ["formulas", "universalFacts", "examShortTricks"],
    summaryA11ySentence: "Mitochondrion hotspot — opens 3 knowledge fields",
  },
  {
    id: "chloroplast",
    label: "Chloroplast",
    position: [-1.05, 0.8, -0.85],
    iconColor: "#10b981",
    fieldKeys: ["keyPoints", "confusion", "specialNotes"],
    summaryA11ySentence: "Chloroplast hotspot — opens 3 knowledge fields",
  },
  {
    id: "rer",
    label: "Rough ER",
    position: [0.55, 1.0, 0.5],
    iconColor: "#f59e0b",
    fieldKeys: ["keyPoints", "importantNotes"],
    summaryA11ySentence: "Rough endoplasmic reticulum hotspot — opens 2 knowledge fields",
  },
  {
    id: "golgi",
    label: "Golgi Body",
    position: [-0.45, -1.0, 0.35],
    iconColor: "#ec4899",
    fieldKeys: ["importantConcepts", "importantNotes"],
    summaryA11ySentence: "Golgi body hotspot — opens 2 knowledge fields",
  },
  {
    id: "membrane",
    label: "Cell Membrane",
    position: [0, 0.2, 2.12],
    iconColor: "#3b82f6",
    fieldKeys: ["importantStatements", "confusion", "keyPoints"],
    summaryA11ySentence: "Cell membrane hotspot — opens 3 knowledge fields",
  },
  {
    id: "lysosome",
    label: "Lysosome",
    position: [1.3, -0.72, -0.75],
    iconColor: "#f97316",
    fieldKeys: ["importantStatements", "importantTasks"],
    summaryA11ySentence: "Lysosome hotspot — opens 2 knowledge fields",
  },
];
