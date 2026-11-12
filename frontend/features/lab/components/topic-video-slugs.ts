/**
 * Explicit topic-slug → animation map for the topic Video registry. No fuzzy
 * substring matching (the repo's own rule for registries): each slug below is
 * the exact `slugifySyllabusTopic` output of a real syllabus topic, verified by
 * tests/features/topic-video.test.ts.
 */
export const VIDEO_TOPICS: Record<string, string> = {
  "capacitance-and-capacitor": "capacitor",
  "newton-s-law-of-gravitation": "gravitation",
  "projectile-motion-and-its-applications": "kinematics",
  "wavefront-and-huygens-principle": "wave",
  "electric-field-due-to-point-charges-field-lines": "electric-field",
  "conical-pendulum": "pendulum",
  "postulates-of-bohr-s-atomic-model-and-its-application": "atomic-structure",
  "inverse-circular-functions": "trigonometry",
  "covalent-bond-and-coordinate-covalent-bond-properties-of-covalent-compounds": "chemistry-bonding",
  "geometric-interpretation-of-derivative-monotonicity-of-a-function-interval-of-monotonicity-extre": "calculus",
  "triangle-parallelogram-and-polygon-laws-of-vectors": "vectors",
  "detail-structure-of-eukaryotic-cells-cell-wall-cell-membrane-mitochondria-plastids-endoplasmic-r": "cell-structure",
  "mendel-s-laws-of-inheritance-monohybrid-and-dihybrid-cross": "genetics",
  "ecosystem-ecology-concept-of-ecology-biotic-and-abiotic-factors-species-interactions": "ecology",
};
