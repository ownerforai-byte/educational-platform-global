/**
 * Unit ordering for the 3D lab hub — derived from the official NEB curriculum
 * in `lib/syllabus.ts` (the single source of truth for curriculum ordering).
 *
 * `lib/lab-registry.tsx` stores each lab's unit as a short display label
 * ("Unit: Kinematics", "Unit: Optics", …). These labels are mapped to the
 * syllabus unit ids they belong to, so the /lab/3d hub groups every lab under
 * its official unit, in official NEB Class 11 → Class 12 order.
 *
 * A label maps to exactly one syllabus unit; labs whose unit label is missing
 * here fall back to the "General" bucket of their subject.
 */
export const LAB_UNIT_ORDER: Record<string, Record<string, string>> = {
  // ── Physics ──────────────────────────────────────────────────────────────
  physics: {
    // Class 11 (official order)
    Measurement: "physical-quantities",
    Vectors: "vectors",
    Kinematics: "kinematics",
    Dynamics: "dynamics",
    "Work Energy": "work-energy-and-power",
    Oscillations: "circular-motion",
    Gravitation: "gravitation",
    Elasticity: "elasticity",
    "Elasticity & Gas": "elasticity",
    Heat: "quantity-of-heat",
    Thermo: "ideal-gas",
    Optics: "lenses",
    Waves: "wave-optics",
    Electrostatics: "electric-field",
    Electricity: "dc-circuits",
    "Current Electricity": "dc-circuits",
    Magnetism: "magnetism-and-magnetic-effect",
    "Magnetism & EMI": "electromagnetic-induction",
    "EM Waves": "communication-systems",
    Modern: "modern-physics",
    "Modern Physics": "modern-physics",
    Quantum: "modern-physics",
    Mechanics: "kinematics",
    // Class 12-only units keep their syllabus ids directly:
    "Ray Optics": "ray-optics",
    "Wave Optics": "wave-optics",
    // Cross-cutting / utility
    Symbols: "physical-quantities",
    Classic: "kinematics",
    Advanced: "recent-trends-in-physics",
    Periodicity: "recent-trends-in-physics",
  },

  // ── Chemistry ────────────────────────────────────────────────────────────
  chemistry: {
    Stoichiometry: "stoichiometry",
    Atomic: "atomic-structure",
    Microscopy: "atomic-structure",
    Periodicity: "classification-of-elements-and-periodic-table",
    Bonding: "chemical-bonding-and-shapes-of-molecules",
    Redox: "oxidation-and-reduction",
    "Gas Laws": "states-of-matter",
    Equilibrium: "chemical-equilibrium",
    Thermo: "chemical-equilibrium",
    Kinetics: "chemical-kinetics",
    "Acid-Base": "chemistry-of-non-metals",
    Titration: "chemistry-of-non-metals",
    Organic: "basic-concept-of-organic-chemistry",
    Advanced: "fundamental-principles-of-organic-chemistry",
    Chemistry: "foundation-and-fundamentals",
    "Cell Biology": "bio-inorganic-chemistry",
  },

  // ── Biology ──────────────────────────────────────────────────────────────
  biology: {
    "Cell Biology": "biomolecules-and-cell-biology",
    Genetics: "heredity-and-evolution",
    "Human Physiology": "human-health-and-diseases",
    "Plant Biology": "strategies-for-food-production",
    Ecology: "ecology",
    Evolution: "evolutionary-biology",
    Diversity: "faunal-diversity",
    Advanced: "introduction-to-biology",
    Biology: "introduction-to-biology",
  },

  // ── Mathematics ──────────────────────────────────────────────────────────
  mathematics: {
    Algebra: "algebra",
    Trig: "trigonometry",
    Geometry: "analytic-geometry",
    "3D Geometry": "three-dimensional-geometry",
    "Straight Line & Coordinates in Space": "three-dimensional-geometry",
    Vectors: "vector-algebra",
    "Vector Calculus": "vector-algebra",
    Stats: "statistics-and-probability",
    Calculus: "limits-and-continuity",
    Sequences: "algebra",
    Fourier: "calculus",
    Exponential: "industrial-statistics",
    Symbols: "algebra",
    Math: "algebra",
    // legacy labels
    "Class 11 Physics": "computational-methods-or-mechanics",
  },

  // ── Class 11 combined-track labs ─────────────────────────────────────────
  class11: {
    "Class 11 Physics": "class11-physics",
    "Class 11 Chemistry": "class11-chemistry",
    "Class 11 Math": "class11-math",
    "Class 11 Biology": "class11-biology",
  },
};

/** Subject display metadata used by the hub and subject pages. */
export const LAB_SUBJECTS = [
  { key: "physics", label: "Physics", color: "#3b82f6", emoji: "⚛️" },
  { key: "chemistry", label: "Chemistry", color: "#10b981", emoji: "🧪" },
  { key: "biology", label: "Biology", color: "#22c55e", emoji: "🧬" },
  { key: "mathematics", label: "Mathematics", color: "#8b5cf6", emoji: "🔢" },
  { key: "class11", label: "Class 11 Plus", color: "#f43f5e", emoji: "🎒" },
] as const;

export type LabSubjectKey = (typeof LAB_SUBJECTS)[number]["key"];
