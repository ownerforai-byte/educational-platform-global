import { PhysicsLab } from "@/components/lab/physics-lab";
import { ChemistryLab } from "@/components/lab/chemistry-lab";
import { MathGeometry3D } from "@/components/lab/math-geometry-3d";
import { MathModern3D } from "@/components/lab/math-modern-3d";
import { BiologyAdvanced3D } from "@/components/lab/biology-3d";

type LabComponentMap = Record<string, () => React.ReactNode>;

export const TOPIC_3D_MAP: LabComponentMap = {
  // Physics
  "capacitance-and-capacitor": PhysicsLab,
  "parallel-plate-capacitor": PhysicsLab,
  "combination-of-capacitors": PhysicsLab,
  "energy-of-a-charged-capacitor": PhysicsLab,
  "effect-of-a-dielectric-polarization-and-displacement": PhysicsLab,
  "newton-s-law-of-gravitation": PhysicsLab,
  "acceleration-due-to-gravity": PhysicsLab,
  "satellite-motion": PhysicsLab,
  "kepler-s-laws": PhysicsLab,
  "elasticity-introduction": PhysicsLab,
  "hooke-s-law-and-elastic-modulus": PhysicsLab,
  "stress-and-strain": PhysicsLab,
  "thermal-expansion": PhysicsLab,
  "quantity-of-heat": PhysicsLab,
  "ideal-gas-law": PhysicsLab,
  "reflection-at-curved-mirror": PhysicsLab,
  "concave-mirror": PhysicsLab,
  "convex-mirror": PhysicsLab,
  "refraction-at-plane-surfaces": PhysicsLab,
  "refraction-through-prisms": PhysicsLab,
  "lenses": PhysicsLab,
  "dispersion": PhysicsLab,
  "electric-charges": PhysicsLab,
  "electric-field": PhysicsLab,
  "potential-potential-difference-and-potential-energy": PhysicsLab,
  "dc-circuits": PhysicsLab,
  "nuclear-physics": PhysicsLab,
  "solids": PhysicsLab,
  "kinematics": PhysicsLab,
  "dynamics": PhysicsLab,
  "work-energy-and-power": PhysicsLab,
  "circular-motion": PhysicsLab,

  // Chemistry
  "atomic-structure": ChemistryLab,
  "chemical-bonding": ChemistryLab,
  "chemical-equilibrium": ChemistryLab,
  "thermochemistry": ChemistryLab,
  "chemical-kinetics": ChemistryLab,
  "acid-base": ChemistryLab,
  "redox-reactions": ChemistryLab,
  "organic-chemistry": ChemistryLab,
  "stoichiometry": ChemistryLab,
  "states-of-matter": ChemistryLab,

  // Mathematics
  "coordinate-geometry": MathGeometry3D,
  "3d-geometry": MathGeometry3D,
  "vectors": MathGeometry3D,
  "calculus": MathModern3D,
  "derivatives": MathModern3D,
  "integrals": MathModern3D,
  "trigonometry": MathGeometry3D,
  "algebra": MathGeometry3D,
  "statistics": MathModern3D,
  "complex-numbers": MathGeometry3D,
  "sequences-and-series": MathModern3D,
  "matrices-and-determinants": MathGeometry3D,

  // Biology
  "cell-structure": BiologyAdvanced3D,
  "cell-division": BiologyAdvanced3D,
  "biomolecules": BiologyAdvanced3D,
  "genetics": BiologyAdvanced3D,
  "ecology": BiologyAdvanced3D,
  "evolution": BiologyAdvanced3D,
  "human-physiology": BiologyAdvanced3D,
  "plant-physiology": BiologyAdvanced3D,
};

export function get3DComponentForTopic(topicSlug: string) {
  const normalized = topicSlug.toLowerCase().replace(/[^a-z0-9-]/g, "-");
  return TOPIC_3D_MAP[normalized] || null;
}
