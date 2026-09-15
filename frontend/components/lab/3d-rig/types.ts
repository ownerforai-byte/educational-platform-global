export type SceneTier = "low" | "medium" | "high";

export type SubjectName =
  | "physics"
  | "chemistry"
  | "biology"
  | "mathematics"
  | "english"
  | "nepali"
  | "default";

export type SubjectAccentTokens = {
  key: string;
  fill: string;
  rim: string;
  ambient: string;
  hemisphereSky: string;
  hemisphereGround: string;
};

export type ConceptFieldKey =
  | "formulas"
  | "keyPoints"
  | "confusion"
  | "examShortTricks"
  | "specialNotes"
  | "numericals"
  | "universalFacts"
  | "related"
  | "importantNotes"
  | "importantConcepts"
  | "importantStatements"
  | "importantTasks"
  | "bounds"
  | "practiceQuestions"
  | "practice"
  | "examples"
  | "examNotes"
  | "mcs"
  | "summary";

export interface KnowledgeHotspotDef {
  id: string;
  position: [number, number, number];
  label: string;
  iconColor?: string;
  fieldKeys: ConceptFieldKey[];
  description?: string;
  summaryA11ySentence?: string;
}

export interface KnowledgeHotspotProps {
  def: KnowledgeHotspotDef;
  onOpen: (id: string) => void;
  isActive: boolean;
  /** When true, disables the pulse/breathe useFrame animation (prefers-reduced-motion). */
  reducedMotion?: boolean;
}

export interface SceneTierState {
  tier: SceneTier;
  clampedDpr: number;
  accent: SubjectAccentTokens;
  reducedMotion: boolean;
  isMobile: boolean;
}

export type ConceptFieldValue = string[] | undefined;

export type ConceptData = Partial<Record<ConceptFieldKey, string[]>>;
