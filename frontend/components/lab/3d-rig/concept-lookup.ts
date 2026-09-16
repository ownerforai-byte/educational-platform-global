"use client";

import { useEffect, useState } from "react";
import { loadData } from "@/lib/data-loader";
import type { ConceptData, ConceptFieldKey } from "./types";

/**
 * Concept JSON access for the 3D showcase scenes.
 *
 * This mirrors the resolution order of the pre-existing 2D `useTopicConcept`
 * hook in `components/content/ravikishan-concept-panels.tsx` (which is module
 * private, so the pattern is reproduced here for Tasks 4–7 to share):
 *   1. exact `<class>/<subject>/<unit>/concepts/*` whose `data.topicSlug` matches
 *   2. first `<class>/<subject>/<unit>/concepts/*` entry (topic not published yet)
 *   3. `null` — scenes must still render, hotspots fall back to slot placeholders.
 *
 * No knowledge strings are ever hardcoded here; the manifest is the single
 * source of truth (spec §Dependencies).
 */
export const CONCEPT_MANIFEST_PATH = "ravikishan/manifest.json";

export type ConceptManifestEntry = {
  path: string;
  data: Record<string, unknown>;
};

export type TopicRef = {
  classSlug: string;
  subjectSlug: string;
  unitId: string;
  topicSlug: string;
};

/** The knowledge slots shared with the 2D `ConceptKnowledgeGrid`. */
export const CONCEPT_FIELD_KEYS: ConceptFieldKey[] = [
  "formulas",
  "keyPoints",
  "confusion",
  "examShortTricks",
  "specialNotes",
  "numericals",
  "universalFacts",
  "related",
  "importantNotes",
  "importantConcepts",
  "importantStatements",
  "importantTasks",
  "bounds",
  "practiceQuestions",
  "practice",
  "examples",
  "examNotes",
  "mcs",
  "summary",
];

/** Defensive parse — a malformed manifest must never break a scene render. */
export function parseManifest(raw: unknown): ConceptManifestEntry[] {
  if (!Array.isArray(raw)) return [];
  return raw.filter((entry): entry is ConceptManifestEntry => {
    if (!entry || typeof entry !== "object") return false;
    const candidate = entry as { path?: unknown; data?: unknown };
    return (
      typeof candidate.path === "string" &&
      !!candidate.data &&
      typeof candidate.data === "object"
    );
  });
}

/** True when an entry belongs to `<class>/<subject>/<unit>/concepts/`. */
export function isConceptEntryForUnit(entry: ConceptManifestEntry, ref: TopicRef): boolean {
  const parts = entry.path.split("/");
  if (parts.length < 5) return false;
  return (
    parts[0] === ref.classSlug &&
    parts[1] === ref.subjectSlug &&
    parts[2] === ref.unitId &&
    parts[3] === "concepts"
  );
}

/**
 * Resolves the concept entry for a topic, with the same graceful degradation as
 * the 2D panels: exact topic match → first concept in the unit → `null`.
 */
export function findConceptEntry(
  manifest: ConceptManifestEntry[],
  ref: TopicRef,
): ConceptManifestEntry | null {
  const inUnit = manifest.filter((entry) => isConceptEntryForUnit(entry, ref));
  const exact = inUnit.find((entry) => entry.data.topicSlug === ref.topicSlug);
  return exact ?? inUnit[0] ?? null;
}

/**
 * Projects a raw concept entry into the 3D rig's string-array-only shape so it
 * can be handed to `Shared3DScene` -> `KnowledgeSpotPanelContent`.
 * Non-string[] values (e.g. `mcs` MCQ objects) are dropped; scalar strings such
 * as `summary` are wrapped into a single-item array.
 */
export function toConceptData(raw: unknown): ConceptData | null {
  if (!raw || typeof raw !== "object") return null;
  const source = raw as Record<string, unknown>;
  const projected: ConceptData = {};

  for (const key of CONCEPT_FIELD_KEYS) {
    const value = source[key];
    if (Array.isArray(value)) {
      const strings = value.filter((item): item is string => typeof item === "string");
      if (strings.length > 0) projected[key] = strings;
    } else if (typeof value === "string" && value.trim().length > 0) {
      projected[key] = [value];
    }
  }

  return Object.keys(projected).length > 0 ? projected : null;
}

/** How many of the tracked slots are actually populated in this entry. */
export function countPopulatedFields(data: ConceptData | null): number {
  if (!data) return 0;
  return CONCEPT_FIELD_KEYS.filter((key) => (data[key]?.length ?? 0) > 0).length;
}

/**
 * Loads + resolves the concept entry for a topic ref. Never rejects: a missing
 * or malformed manifest resolves to `null` so the 3D scene keeps rendering.
 */
export function useTopicConceptData(ref: TopicRef): {
  data: ConceptData | null;
  entry: ConceptManifestEntry | null;
  loading: boolean;
} {
  const { classSlug, subjectSlug, unitId, topicSlug } = ref;
  const [state, setState] = useState<{
    data: ConceptData | null;
    entry: ConceptManifestEntry | null;
    loading: boolean;
  }>({ data: null, entry: null, loading: true });

  useEffect(() => {
    let cancelled = false;
    setState({ data: null, entry: null, loading: true });

    loadData<unknown>(CONCEPT_MANIFEST_PATH)
      .then((raw) => {
        if (cancelled) return;
        const entry = findConceptEntry(parseManifest(raw), {
          classSlug,
          subjectSlug,
          unitId,
          topicSlug,
        });
        setState({ data: toConceptData(entry?.data), entry, loading: false });
      })
      .catch(() => {
        if (!cancelled) setState({ data: null, entry: null, loading: false });
      });

    return () => {
      cancelled = true;
    };
  }, [classSlug, subjectSlug, unitId, topicSlug]);

  return state;
}
