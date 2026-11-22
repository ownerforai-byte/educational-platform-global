/**
 * Physics XI — Exercise Solutions & Conceptual Bank registry.
 *
 * The published documents live as self-contained HTML files in
 * `frontend/public/resources/physics-xi/` and are served straight from the
 * `public/` root (no build step). This module is the single source of truth
 * for the solutions layer of `/resources/physics-xi`.
 *
 * Content rule: every unit of the official NEB Physics XI (Phy. 101) syllabus
 * has exactly one document, in curriculum order, named
 * `unit-NN-<syllabus-id>-solutions.html`. The counts below are the published
 * totals per document (exercises solved, conceptual 2-mark items and
 * long-answer 4–6 mark items) and are kept in sync with the files by
 * `frontend/tests/lib/physics-xi-solutions.test.ts`.
 */

export interface PhysicsXiSolutionUnit {
  /** Syllabus unit id — matches `frontend/lib/core/syllabus.ts`. */
  unitId: string;
  /** Unit number in curriculum order. */
  unitNo: number;
  /** Official NEB unit title. */
  unitName: string;
  /** Teaching hours allocated by the curriculum. */
  hours: number;
  /** File name inside `public/resources/physics-xi/`. */
  file: string;
  /** One-sentence statement of what the document covers. */
  summary: string;
  /** Exercise groups worked in the document, in order. */
  sections: string[];
  /** Solved exercise items. */
  exerciseCount: number;
  /** Conceptual 2-mark questions with model answers. */
  conceptualCount: number;
  /** Fully worked 4–6 mark long answers. */
  longAnswerCount: number;
}

export const PHYSICS_XI_SOLUTIONS_BASE = "/resources/physics-xi";

export const PHYSICS_XI_SOLUTIONS = {
  title: "Physics XI — Exercise Solutions & Conceptual Bank",
  course: "NEB Grade 11 · Physics (Phy. 101)",
  subtitle:
    "Every exercise worked out in NEB answer style, plus the short conceptual questions the paper actually asks — one document per syllabus unit, in curriculum order.",
} as const;

export const PHYSICS_XI_SOLUTION_UNITS: PhysicsXiSolutionUnit[] = [
  {
    unitId: "physical-quantities",
    unitNo: 1,
    unitName: "Physical Quantities",
    hours: 3,
    file: "unit-01-physical-quantities-solutions.html",
    summary:
      "SI units and dimensions of derived quantities, dimensional checking and derivation of formulae, unit conversion, precision and significant figures, error combination, and the vernier caliper and screw gauge.",
    sections: [
      "Units, dimensions of derived quantities",
      "Checking and deriving formulae by dimensions",
      "Conversion between systems of units",
      "Precision, accuracy and significant figures",
      "Errors and their combination",
      "Vernier caliper and screw gauge",
      "Order of magnitude and estimation",
    ],
    exerciseCount: 34,
    conceptualCount: 14,
    longAnswerCount: 4,
  },
  {
    unitId: "vectors",
    unitNo: 2,
    unitName: "Vectors",
    hours: 4,
    file: "unit-02-vectors-solutions.html",
    summary:
      "Triangle and parallelogram laws, resolution into components, unit-vector algebra, dot and cross products with their geometric meaning, and equilibrium of concurrent forces.",
    sections: [
      "Resultant of two vectors: triangle and parallelogram laws",
      "Resolution of vectors and resultant of many vectors",
      "Unit vectors and vector addition in components",
      "Scalar (dot) product",
      "Vector (cross) product",
      "Equilibrium and applications",
    ],
    exerciseCount: 33,
    conceptualCount: 14,
    longAnswerCount: 4,
  },
  {
    unitId: "kinematics",
    unitNo: 3,
    unitName: "Kinematics",
    hours: 5,
    file: "unit-03-kinematics-solutions.html",
    summary:
      "Kinematic quantities and their graphs, the three equations of motion with the graphical derivation, free fall, relative velocity, and projectile motion including range and maximum height.",
    sections: [
      "Distance, displacement, speed, velocity, acceleration",
      "Equations of motion and their graphical derivation",
      "Motion of a freely falling body",
      "Relative velocity",
      "Projectile motion",
      "Mixed numericals",
    ],
    exerciseCount: 33,
    conceptualCount: 14,
    longAnswerCount: 4,
  },
  {
    unitId: "dynamics",
    unitNo: 4,
    unitName: "Dynamics",
    hours: 6,
    file: "unit-04-dynamics-solutions.html",
    summary:
      "Newton's three laws with momentum and impulse, conservation of linear momentum and recoil, lift/pulley/incline applications, moments and equilibrium, and the laws of solid friction with their verification.",
    sections: [
      "Newton's laws, momentum and impulse",
      "Conservation of linear momentum",
      "Applications of Newton's laws: lift, pulley, incline",
      "Moment, torque and equilibrium",
      "Solid friction and its verification",
    ],
    exerciseCount: 34,
    conceptualCount: 14,
    longAnswerCount: 5,
  },
  {
    unitId: "work-energy-and-power",
    unitNo: 5,
    unitName: "Work, Energy and Power",
    hours: 6,
    file: "unit-05-work-energy-and-power-solutions.html",
    summary:
      "Work by constant and variable forces, the work–energy theorem, power and efficiency, conservation of mechanical energy, conservative versus non-conservative forces, and elastic and inelastic collisions.",
    sections: [
      "Work done by constant and variable forces",
      "Kinetic energy, potential energy and the work–energy theorem",
      "Power and efficiency",
      "Conservation of mechanical energy",
      "Conservative and non-conservative forces",
      "Elastic and inelastic collisions",
    ],
    exerciseCount: 36,
    conceptualCount: 14,
    longAnswerCount: 5,
  },
  {
    unitId: "circular-motion",
    unitNo: 6,
    unitName: "Circular Motion",
    hours: 6,
    file: "unit-06-circular-motion-solutions.html",
    summary:
      "Angular quantities and their link to linear motion, centripetal acceleration and force, the conical pendulum, motion in a vertical circle with the minimum speed conditions, and banking of roads.",
    sections: [
      "Angular displacement, velocity and acceleration",
      "Relation between angular and linear quantities",
      "Centripetal acceleration and centripetal force",
      "Conical pendulum",
      "Motion in a vertical circle",
      "Banking of roads",
    ],
    exerciseCount: 31,
    conceptualCount: 14,
    longAnswerCount: 4,
  },
  {
    unitId: "gravitation",
    unitNo: 7,
    unitName: "Gravitation",
    hours: 10,
    file: "unit-07-gravitation-solutions.html",
    summary:
      "Newton's law of gravitation, field strength, potential and potential energy, variation of g with altitude and depth, centre of mass, orbital and escape velocity, satellite energy, and geostationary and GPS orbits.",
    sections: [
      "Newton's law of gravitation",
      "Gravitational field strength",
      "Gravitational potential and potential energy",
      "Variation of g with altitude and depth",
      "Centre of mass and centre of gravity",
      "Satellite motion: orbital velocity and period",
      "Escape velocity",
      "Energy of a satellite",
      "Geostationary satellites and GPS",
    ],
    exerciseCount: 41,
    conceptualCount: 16,
    longAnswerCount: 5,
  },
  {
    unitId: "elasticity",
    unitNo: 8,
    unitName: "Elasticity",
    hours: 5,
    file: "unit-08-elasticity-solutions.html",
    summary:
      "Hooke's law and force constants, stress, strain and the three elastic moduli with Young-modulus numericals, Poisson's ratio, elastic potential energy, and the full stress–strain curve.",
    sections: [
      "Hooke's law and the force constant",
      "Stress, strain and the elastic moduli",
      "Young modulus numericals",
      "Bulk modulus and shear modulus",
      "Poisson's ratio",
      "Elastic potential energy",
      "The stress–strain curve",
    ],
    exerciseCount: 31,
    conceptualCount: 14,
    longAnswerCount: 4,
  },
  {
    unitId: "heat-and-temperature",
    unitNo: 9,
    unitName: "Heat and Temperature",
    hours: 3,
    file: "unit-09-heat-and-temperature-solutions.html",
    summary:
      "The molecular picture of thermal energy, heat and temperature, the cause and direction of heat flow, thermal equilibrium and the zeroth law, the mercury thermometer and temperature scales.",
    sections: [
      "Molecular concept of thermal energy, heat and temperature",
      "Cause and direction of heat flow",
      "Thermal equilibrium and the zeroth law",
      "The mercury thermometer",
      "Temperature scales and thermometric properties",
    ],
    exerciseCount: 28,
    conceptualCount: 14,
    longAnswerCount: 4,
  },
  {
    unitId: "thermal-expansion",
    unitNo: 10,
    unitName: "Thermal Expansion",
    hours: 4,
    file: "unit-10-thermal-expansion-solutions.html",
    summary:
      "Linear, superficial and cubical expansion with the 1 : 2 : 3 relation, real versus apparent expansion of liquids, Dulong and Petit's method, and the practical consequences of expansion.",
    sections: [
      "Linear expansion",
      "Superficial and cubical expansion and the 1 : 2 : 3 relation",
      "Real and apparent expansion of liquids",
      "Measurement of expansivity: Dulong and Petit's method",
      "Applications and consequences",
    ],
    exerciseCount: 28,
    conceptualCount: 14,
    longAnswerCount: 4,
  },
  {
    unitId: "quantity-of-heat",
    unitNo: 11,
    unitName: "Quantity of Heat",
    hours: 6,
    file: "unit-11-quantity-of-heat-solutions.html",
    summary:
      "Specific heat capacity and the method of mixtures, Newton's law of cooling and its verification, change of phase with latent heat, measurement of specific latent heat, and phase diagrams and cooling curves.",
    sections: [
      "Specific heat capacity and the method of mixtures",
      "Newton's law of cooling",
      "Change of phase and latent heat",
      "Measurement of specific latent heat",
      "Phase diagrams, triple point and cooling curves",
    ],
    exerciseCount: 30,
    conceptualCount: 15,
    longAnswerCount: 4,
  },
  {
    unitId: "rate-of-heat-flow",
    unitNo: 12,
    unitName: "Rate of Heat Flow",
    hours: 5,
    file: "unit-12-rate-of-heat-flow-solutions.html",
    summary:
      "Conduction and thermal conductivity with Searle's method, convection in fluids, absorptive and emissive power, the Stefan–Boltzmann law, and applications to the thermos flask, greenhouse and insulation.",
    sections: [
      "Conduction and thermal conductivity",
      "Measurement of thermal conductivity",
      "Convection",
      "Radiation, absorptive and emissive power",
      "The Stefan–Boltzmann law",
      "Applications: thermos flask, greenhouse, insulation",
    ],
    exerciseCount: 33,
    conceptualCount: 15,
    longAnswerCount: 4,
  },
  {
    unitId: "ideal-gas",
    unitNo: 13,
    unitName: "Ideal Gas",
    hours: 8,
    file: "unit-13-ideal-gas-solutions.html",
    summary:
      "The ideal gas equation with its numericals, the kinetic model and derivation of pressure, kinetic energy and temperature, Boltzmann constant and rms speed, degrees of freedom, and molar heat capacities.",
    sections: [
      "The ideal gas equation",
      "Molecular properties and the kinetic model",
      "Derivation of the pressure of a gas",
      "Average translational kinetic energy and temperature",
      "Boltzmann constant and rms speed",
      "Degrees of freedom and heat capacities",
      "Heat capacities of solids",
    ],
    exerciseCount: 33,
    conceptualCount: 15,
    longAnswerCount: 5,
  },
  {
    unitId: "reflection-at-curved-mirror",
    unitNo: 14,
    unitName: "Reflection at Curved Mirrors",
    hours: 2,
    file: "unit-14-reflection-at-curved-mirror-solutions.html",
    summary:
      "Terms and the Cartesian sign convention, ray diagrams for concave and convex mirrors, the mirror formula with magnification, and numericals on real and virtual images with their applications.",
    sections: [
      "Terms and sign convention",
      "Ray diagrams and image formation",
      "Mirror formula and magnification",
      "Concave mirror numericals",
      "Convex mirror numericals",
      "Real vs virtual images and applications",
    ],
    exerciseCount: 31,
    conceptualCount: 14,
    longAnswerCount: 4,
  },
  {
    unitId: "refraction-at-plane-surfaces",
    unitNo: 15,
    unitName: "Refraction at Plane Surfaces",
    hours: 4,
    file: "unit-15-refraction-at-plane-surfaces-solutions.html",
    summary:
      "Snell's law and refractive index, refractive index from the speed of light, real and apparent depth, the relation between refractive indices of two media, lateral shift, and total internal reflection with its applications.",
    sections: [
      "Laws of refraction and refractive index",
      "Refractive index and the speed of light",
      "Real and apparent depth",
      "Relation between refractive indices of two media",
      "Lateral shift",
      "Total internal reflection and its applications",
    ],
    exerciseCount: 32,
    conceptualCount: 15,
    longAnswerCount: 4,
  },
  {
    unitId: "refraction-through-prisms",
    unitNo: 16,
    unitName: "Refraction through Prisms",
    hours: 4,
    file: "unit-16-refraction-through-prisms-solutions.html",
    summary:
      "Prism geometry with A, i, r and D, the prism formula, minimum deviation and refractive index, the i–D curve, the small-angle prism, and grazing emergence with total internal reflection.",
    sections: [
      "Prism geometry: A, i, r and D",
      "The prism formula",
      "Minimum deviation and the refractive index",
      "The i–D curve",
      "The small-angle (thin) prism",
      "Grazing emergence and total internal reflection",
    ],
    exerciseCount: 27,
    conceptualCount: 14,
    longAnswerCount: 4,
  },
  {
    unitId: "lenses",
    unitNo: 17,
    unitName: "Lenses",
    hours: 3,
    file: "unit-17-lenses-solutions.html",
    summary:
      "Lens terms and types, the lens formula with magnification for convex and concave lenses, power of a lens, combination of thin lenses in contact, and the lens maker's formula.",
    sections: [
      "Terms and the two types of lens",
      "The lens formula and magnification",
      "Convex lens numericals",
      "Concave lens numericals",
      "Power of a lens",
      "Combination of thin lenses in contact",
      "The lens maker's formula",
    ],
    exerciseCount: 35,
    conceptualCount: 15,
    longAnswerCount: 4,
  },
  {
    unitId: "dispersion",
    unitNo: 18,
    unitName: "Dispersion",
    hours: 3,
    file: "unit-18-dispersion-solutions.html",
    summary:
      "Dispersion and the spectrum, angular dispersion and dispersive power, the pure spectrum, the rainbow, achromatic prism combinations, scattering of light, and chromatic and spherical aberration.",
    sections: [
      "Dispersion and the spectrum",
      "Angular dispersion and dispersive power",
      "Numericals on dispersive power",
      "The pure spectrum",
      "The rainbow",
      "Achromatic combination of prisms",
      "Scattering of light",
      "Chromatic and spherical aberration",
    ],
    exerciseCount: 33,
    conceptualCount: 16,
    longAnswerCount: 4,
  },
  {
    unitId: "electric-charges",
    unitNo: 19,
    unitName: "Electric Charges",
    hours: 3,
    file: "unit-19-electric-charges-solutions.html",
    summary:
      "Properties of electric charge with quantisation and conservation, charging by friction, contact and induction, Coulomb's law and its numericals in free space and in a medium, superposition, and the Faraday ice pail experiment.",
    sections: [
      "Electric charge and its properties",
      "Quantisation and conservation of charge",
      "Charging by friction, contact and induction",
      "Coulomb's law",
      "Coulomb's law numericals",
      "Force in a medium and the superposition principle",
      "The Faraday ice pail experiment",
    ],
    exerciseCount: 26,
    conceptualCount: 15,
    longAnswerCount: 4,
  },
  {
    unitId: "electric-field",
    unitNo: 20,
    unitName: "Electric Field",
    hours: 3,
    file: "unit-20-electric-field-solutions.html",
    summary:
      "Field intensity of a point charge and a charged sphere, field lines, superposition numericals, the dipole and torque in a uniform field, conductors and shielding, parallel plates, and electric flux with Gauss's law.",
    sections: [
      "Electric field intensity",
      "Field due to a point charge and a charged sphere",
      "Electric field lines",
      "Superposition and numerical field problems",
      "The electric dipole",
      "Torque on a dipole in a uniform field",
      "Conductors, shielding and parallel plates",
      "Electric flux and Gauss's law",
    ],
    exerciseCount: 30,
    conceptualCount: 15,
    longAnswerCount: 4,
  },
  {
    unitId: "potential-potential-difference-and-potential-energy",
    unitNo: 21,
    unitName: "Potential, Potential Difference and Potential Energy",
    hours: 4,
    file: "unit-21-potential-potential-difference-and-potential-energy-solutions.html",
    summary:
      "Potential and potential difference, potential due to a point charge and to several charges, the potential of a charged sphere, equipotential surfaces with E = −dV/dr, potential energy of charge systems, and the electron volt.",
    sections: [
      "Electric potential and potential difference",
      "Potential due to a point charge",
      "Potential due to several charges",
      "Potential of a charged sphere",
      "Equipotential surfaces and the relation E = −dV/dr",
      "Potential energy of a system of charges",
      "The electron volt and accelerated charges",
    ],
    exerciseCount: 27,
    conceptualCount: 16,
    longAnswerCount: 4,
  },
  {
    unitId: "capacitor",
    unitNo: 22,
    unitName: "Capacitor",
    hours: 5,
    file: "unit-22-capacitor-solutions.html",
    summary:
      "Capacitance and the parallel-plate capacitor, dielectrics and their effect, series and parallel combinations, energy stored in a capacitor, and the energy lost when charged capacitors are connected.",
    sections: [
      "Capacitance and the capacitor",
      "The parallel-plate capacitor",
      "Dielectrics",
      "Capacitors in series and parallel",
      "Energy stored in a capacitor",
      "Energy lost when capacitors are connected",
    ],
    exerciseCount: 26,
    conceptualCount: 16,
    longAnswerCount: 4,
  },
  {
    unitId: "dc-circuits",
    unitNo: 23,
    unitName: "DC Circuits",
    hours: 10,
    file: "unit-23-dc-circuits-solutions.html",
    summary:
      "Ohm's law, resistivity and conductivity, drift velocity, series and parallel resistors, EMF and internal resistance, Kirchhoff's laws, the Wheatstone and meter bridges, the potentiometer, electrical power, and I–V characteristics with the potential divider.",
    sections: [
      "Ohm's law and resistance",
      "Resistivity and conductivity",
      "Drift velocity and current",
      "Resistors in series and parallel",
      "EMF, internal resistance and terminal voltage",
      "Kirchhoff's laws",
      "The Wheatstone bridge and meter bridge",
      "The potentiometer",
      "Heating effect and electrical power",
      "Current–voltage characteristics and the potential divider",
    ],
    exerciseCount: 37,
    conceptualCount: 16,
    longAnswerCount: 4,
  },
  {
    unitId: "nuclear-physics",
    unitNo: 24,
    unitName: "Nuclear Physics",
    hours: 4,
    file: "unit-24-nuclear-physics-solutions.html",
    summary:
      "Nuclear composition, size and density, mass defect and binding energy with the B/A curve, radioactivity and the three radiations, the decay law and half-life, fission and fusion, and Rutherford scattering with packing fraction and pair creation.",
    sections: [
      "The nucleus and its composition",
      "Nuclear size and density",
      "Mass defect and binding energy",
      "The binding-energy-per-nucleon curve",
      "Radioactivity and the three radiations",
      "The decay law and half-life",
      "Nuclear fission and fusion",
      "Discovery of the nucleus, packing fraction, creation and annihilation",
    ],
    exerciseCount: 33,
    conceptualCount: 16,
    longAnswerCount: 4,
  },
  {
    unitId: "solids",
    unitNo: 25,
    unitName: "Solids",
    hours: 3,
    file: "unit-25-solids-solutions.html",
    summary:
      "Energy bands in solids and how they produce metals, insulators and semiconductors, intrinsic conduction with electron–hole pairs, extrinsic doping with donors and acceptors, and the temperature dependence of conductivity.",
    sections: [
      "Energy bands in solids",
      "Metals, insulators and semiconductors",
      "Intrinsic semiconductors",
      "Extrinsic semiconductors and doping",
      "Temperature, conductivity and applications",
    ],
    exerciseCount: 21,
    conceptualCount: 16,
    longAnswerCount: 4,
  },
  {
    unitId: "recent-trends-in-physics",
    unitNo: 26,
    unitName: "Recent Trends in Physics",
    hours: 6,
    file: "unit-26-recent-trends-in-physics-solutions.html",
    summary:
      "Particles and antiparticles, quarks with baryons and mesons, leptons and neutrinos, the four forces and the Standard Model, the Big Bang and its evidence, Hubble's law, dark matter and dark energy, black holes, and gravitational waves.",
    sections: [
      "Particles and antiparticles",
      "Quarks, baryons and mesons",
      "Leptons and neutrinos",
      "The fundamental forces and the Standard Model",
      "The Big Bang and the expanding universe",
      "Hubble's law and its consequences",
      "Dark matter and dark energy",
      "Black holes",
      "Gravitational waves",
    ],
    exerciseCount: 32,
    conceptualCount: 18,
    longAnswerCount: 4,
  },
];

/** Public URL of a unit document (served from `public/`). */
export function physicsXiSolutionUrl(
  unit: Pick<PhysicsXiSolutionUnit, "file">,
): string {
  return `${PHYSICS_XI_SOLUTIONS_BASE}/${unit.file}`;
}

/** Physical path used by tests to verify the published document exists. */
export function physicsXiSolutionPath(
  unit: Pick<PhysicsXiSolutionUnit, "file">,
): string {
  return `public/resources/physics-xi/${unit.file}`;
}

export function getPhysicsXiSolutionUnit(
  unitId: string,
): PhysicsXiSolutionUnit | undefined {
  return PHYSICS_XI_SOLUTION_UNITS.find((unit) => unit.unitId === unitId);
}

/**
 * Catalog key of a unit document, used by `lib/docs-catalog.ts` and by the
 * `DOC_LOCATIONS` table in `lib/streams/chapter-resources.ts`. Both sides are
 * derived from this registry, so a document can never be registered in one
 * place and forgotten in the other.
 */
export function physicsXiSolutionDocKey(
  unit: Pick<PhysicsXiSolutionUnit, "unitNo" | "unitId">,
): string {
  return `physics-xi-u${unit.unitNo}-${unit.unitId}-solutions`;
}

export const PHYSICS_XI_SOLUTION_TOTALS = {
  units: PHYSICS_XI_SOLUTION_UNITS.length,
  hours: PHYSICS_XI_SOLUTION_UNITS.reduce((sum, unit) => sum + unit.hours, 0),
  exercises: PHYSICS_XI_SOLUTION_UNITS.reduce(
    (sum, unit) => sum + unit.exerciseCount,
    0,
  ),
  conceptual: PHYSICS_XI_SOLUTION_UNITS.reduce(
    (sum, unit) => sum + unit.conceptualCount,
    0,
  ),
  longAnswers: PHYSICS_XI_SOLUTION_UNITS.reduce(
    (sum, unit) => sum + unit.longAnswerCount,
    0,
  ),
};
