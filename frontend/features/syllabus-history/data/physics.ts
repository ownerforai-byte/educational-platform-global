/**
 * NEB Physics Syllabus — extracted from official & third-party sources (2076/2081 BS)
 *
 * Sources:
 *   - https://www.dhanraj.com.np/2020/04/ (Grade 11 & 12 curriculum 2076 PDF listings)
 *   - https://esikhcha.com/neb-physics-science-grade-11-and-12-syllabus-based-on-new-curriculum/
 *     (Updated New Curriculum 2081 BS — chapter-wise breakdown with hours)
 *   - frontend/lib/syllabus.ts (single source of truth for unit IDs, titles, and topic ordering)
 *
 * The esikhcha source is titled "Updated New Curriculum 2081 BS" and includes:
 *   - Increased teaching hours for Capacitor (5→7) and Nuclear Physics (4→6) in Grade 11
 *   - Gorkha Earthquake 2015 wave patterns added to Grade 12 Recent Trends in Physics
 *   - Additional topics in Wave & Optics and Electricity & Magnetism units
 */

export type SyllabusVersion = {
  year: number;
  bsYear: string;
  isLatest: boolean;
  notes?: string;
  units: {
    id: string;
    title: string;
    hours: number;
    topics: {
      slug: string;
      title: string;
      hours?: number;
      addedInYear?: number;
      removedInYear?: number;
      modifiedInYear?: number;
    }[];
  }[];
};

export type SubjectPhysicsData = {
  grade: "11" | "12";
  subjectCode: string;
  versions: SyllabusVersion[];
};

export const PHYSICS_11_DATA: SubjectPhysicsData = {
  grade: "11",
  subjectCode: "101",
  versions: [
    {
      year: 2076,
      bsYear: "2076 BS",
      isLatest: false,
      notes:
        "NCF 2076 baseline curriculum for Grade 11 Physics. 26 chapters across 5 major units (Mechanics, Heat & Thermodynamics, Wave & Optics, Electricity & Magnetism, Modern Physics). Source: dhanraj.com.np curriculum PDF listing and official NEB syllabus.",
      units: [
        {
          id: "physical-quantities",
          title: "Physical Quantities",
          hours: 3,
          topics: [
            { slug: "precision-significant-figures", title: "Precision and significant figures", hours: 2 },
            { slug: "dimensions-dimensional-analysis", title: "Dimensions and uses of dimensional analysis", hours: 1 },
          ],
        },
        {
          id: "vectors",
          title: "Vectors",
          hours: 4,
          topics: [
            { slug: "laws-of-vectors", title: "Triangle, parallelogram and polygon laws of vectors", hours: 1 },
            { slug: "resolution-unit-vectors", title: "Resolution of vectors; unit vectors", hours: 2 },
            { slug: "scalar-vector-products", title: "Scalar and vector products", hours: 1 },
          ],
        },
        {
          id: "kinematics",
          title: "Kinematics",
          hours: 5,
          topics: [
            { slug: "instantaneous-velocity-acceleration", title: "Instantaneous velocity and acceleration", hours: 1 },
            { slug: "relative-velocity", title: "Relative velocity", hours: 1 },
            { slug: "equation-of-motion-graphical", title: "Equation of motion (graphical treatment)", hours: 1 },
            { slug: "freely-falling-body", title: "Motion of a freely falling body", hours: 1 },
            { slug: "projectile-motion", title: "Projectile motion and its applications", hours: 1 },
          ],
        },
        {
          id: "dynamics",
          title: "Dynamics",
          hours: 6,
          topics: [
            { slug: "linear-momentum-impulse", title: "Linear momentum, impulse", hours: 1 },
            { slug: "conservation-linear-momentum", title: "Conservation of linear momentum", hours: 1 },
            { slug: "newtons-laws-applications", title: "Application of Newton's laws", hours: 1 },
            { slug: "torque-equilibrium", title: "Moment, torque and equilibrium", hours: 1 },
            { slug: "solid-friction", title: "Solid friction: laws of solid friction and their verifications", hours: 2 },
          ],
        },
        {
          id: "work-energy-and-power",
          title: "Work, Energy and Power",
          hours: 6,
          topics: [
            { slug: "work-constant-variable-force", title: "Work done by a constant force and a variable force", hours: 1 },
            { slug: "power", title: "Power", hours: 1 },
            { slug: "work-energy-theorem", title: "Work-energy theorem; kinetic and potential energy", hours: 1 },
            { slug: "conservation-of-energy", title: "Conservation of energy", hours: 1 },
            { slug: "conservative-nonconservative-forces", title: "Conservative and non-conservative forces", hours: 1 },
            { slug: "elastic-inelastic-collisions", title: "Elastic and inelastic collisions", hours: 1 },
          ],
        },
        {
          id: "circular-motion",
          title: "Circular Motion",
          hours: 6,
          topics: [
            { slug: "angular-displacement-velocity-acceleration", title: "Angular displacement, velocity and acceleration", hours: 1 },
            { slug: "angular-linear-relation", title: "Relation between angular and linear velocity and acceleration", hours: 1 },
            { slug: "centripetal-acceleration-force", title: "Centripetal acceleration and centripetal force", hours: 1 },
            { slug: "conical-pendulum", title: "Conical pendulum", hours: 1 },
            { slug: "vertical-circle-motion", title: "Motion in a vertical circle", hours: 1 },
            { slug: "banking-applications", title: "Applications of banking", hours: 1 },
          ],
        },
        {
          id: "gravitation",
          title: "Gravitation",
          hours: 10,
          topics: [
            { slug: "newtons-law-gravitation", title: "Newton's law of gravitation", hours: 1 },
            { slug: "gravitational-field-strength", title: "Gravitational field strength", hours: 1 },
            { slug: "gravitational-potential-energy", title: "Gravitational potential; gravitational potential energy", hours: 1 },
            { slug: "variation-g-altitude-depth", title: "Variation in value of 'g' due to altitude and depth", hours: 1 },
            { slug: "centre-mass-gravity", title: "Centre of mass and centre of gravity", hours: 1 },
            { slug: "satellite-orbital-velocity", title: "Motion of a satellite: orbital velocity and time period of the satellite", hours: 2 },
            { slug: "escape-velocity", title: "Escape velocity", hours: 1 },
            { slug: "satellite-energy", title: "Potential and kinetic energy of the satellite", hours: 1 },
            { slug: "geostationary-satellite", title: "Geostationary satellite", hours: 1 },
            { slug: "gps", title: "GPS", hours: 1 },
          ],
        },
        {
          id: "elasticity",
          title: "Elasticity",
          hours: 5,
          topics: [
            { slug: "hookes-law-force-constant", title: "Hooke's law: force constant", hours: 1 },
            { slug: "stress-strain-elasticity-plasticity", title: "Stress; strain; elasticity and plasticity", hours: 1 },
            { slug: "elastic-moduli", title: "Elastic modulus: Young modulus, bulk modulus, shear modulus", hours: 1 },
            { slug: "poissons-ratio", title: "Poisson's ratio", hours: 1 },
            { slug: "elastic-potential-energy", title: "Elastic potential energy", hours: 1 },
          ],
        },
        {
          id: "heat-and-temperature",
          title: "Heat and Temperature",
          hours: 3,
          topics: [
            { slug: "thermal-energy-heat-temperature", title: "Molecular concept of thermal energy, heat and temperature; cause and direction of heat flow", hours: 1 },
            { slug: "thermal-equilibrium-zeroth-law", title: "Meaning of thermal equilibrium and Zeroth law of thermodynamics", hours: 1 },
            { slug: "mercury-thermometer-principle", title: "Thermal equilibrium as a working principle of a mercury thermometer", hours: 1 },
          ],
        },
        {
          id: "thermal-expansion",
          title: "Thermal Expansion",
          hours: 4,
          topics: [
            { slug: "linear-expansion", title: "Linear expansion and its measurement", hours: 1 },
            { slug: "cubical-superficial-expansion", title: "Cubical expansion, superficial expansion and their relation with linear expansion", hours: 1 },
            { slug: "liquid-expansion", title: "Liquid expansion: absolute and apparent", hours: 1 },
            { slug: "dulong-petit-method", title: "Dulong and Petit method of determining expansivity of liquid", hours: 1 },
          ],
        },
        {
          id: "quantity-of-heat",
          title: "Quantity of Heat",
          hours: 6,
          topics: [
            { slug: "newtons-law-cooling", title: "Newton's law of cooling", hours: 1 },
            { slug: "specific-heat-capacity", title: "Measurement of specific heat capacity of solids and liquids", hours: 1 },
            { slug: "change-of-phases-latent-heat", title: "Change of phases: latent heat", hours: 1 },
            { slug: "specific-latent-heat-fusion-vaporization", title: "Specific latent heat of fusion and vaporization", hours: 1 },
            { slug: "measurement-latent-heat", title: "Measurement of specific latent heat of fusion and vaporization", hours: 1 },
            { slug: "triple-point", title: "Triple point", hours: 1 },
          ],
        },
        {
          id: "rate-of-heat-flow",
          title: "Rate of Heat Flow",
          hours: 5,
          topics: [
            { slug: "conduction-thermal-conductivity", title: "Conduction: thermal conductivity and measurement", hours: 2 },
            { slug: "convection", title: "Convection", hours: 1 },
            { slug: "radiation-ideal-radiator", title: "Radiation: ideal radiator", hours: 1 },
            { slug: "black-body-radiation", title: "Black-body radiation", hours: 1 },
          ],
        },
        {
          id: "ideal-gas",
          title: "Ideal Gas",
          hours: 8,
          topics: [
            { slug: "ideal-gas-equation", title: "Ideal gas equation", hours: 1 },
            { slug: "molecular-properties-matter", title: "Molecular properties of matter", hours: 1 },
            { slug: "kinetic-molecular-model", title: "Kinetic-molecular model of an ideal gas", hours: 1 },
            { slug: "derivation-pressure-gas", title: "Derivation of pressure exerted by gas", hours: 1 },
            { slug: "average-translational-kinetic-energy", title: "Average translational kinetic energy of gas molecule", hours: 1 },
            { slug: "boltzmann-constant-rms-speed", title: "Boltzmann constant, root mean square speed", hours: 1 },
            { slug: "heat-capacities-gases-solids", title: "Heat capacities of gases and solids", hours: 2 },
          ],
        },
        {
          id: "reflection-at-curved-mirror",
          title: "Reflection at Curved Mirror",
          hours: 2,
          topics: [
            { slug: "real-virtual-images", title: "Real and virtual images", hours: 1 },
            { slug: "mirror-formula", title: "Mirror formula", hours: 1 },
          ],
        },
        {
          id: "refraction-at-plane-surfaces",
          title: "Refraction at Plane Surfaces",
          hours: 4,
          topics: [
            { slug: "laws-of-refraction", title: "Laws of refraction: refractive index", hours: 1 },
            { slug: "relation-refractive-indices", title: "Relation between refractive indices", hours: 1 },
            { slug: "lateral-shift", title: "Lateral shift", hours: 1 },
            { slug: "total-internal-reflection", title: "Total internal reflection", hours: 1 },
          ],
        },
        {
          id: "refraction-through-prisms",
          title: "Refraction through Prisms",
          hours: 4,
          topics: [
            { slug: "minimum-deviation-condition", title: "Minimum deviation condition", hours: 1 },
            { slug: "prism-minimum-deviation-refractive-index", title: "Relation between the angle of prism, minimum deviation and refractive index", hours: 2 },
            { slug: "small-angle-prism-deviation", title: "Deviation in small-angle prism", hours: 1 },
          ],
        },
        {
          id: "lenses",
          title: "Lenses",
          hours: 3,
          topics: [
            { slug: "spherical-lenses-magnification", title: "Spherical lenses, angular magnification", hours: 1 },
            { slug: "lens-makers-formula", title: "Lens maker's formula", hours: 1 },
            { slug: "power-of-lens", title: "Power of a lens", hours: 1 },
          ],
        },
        {
          id: "dispersion",
          title: "Dispersion",
          hours: 3,
          topics: [
            { slug: "pure-spectrum-dispersive-power", title: "Pure spectrum and dispersive power", hours: 1 },
            { slug: "chromatic-spherical-aberration", title: "Chromatic and spherical aberration", hours: 1 },
            { slug: "achromatism-applications", title: "Achromatism and its applications", hours: 1 },
          ],
        },
        {
          id: "electric-charges",
          title: "Electric Charges",
          hours: 3,
          topics: [
            { slug: "electric-charges", title: "Electric charges", hours: 1 },
            { slug: "charging-by-induction", title: "Charging by induction", hours: 1 },
            { slug: "coulombs-law", title: "Coulomb's law: force between two point charges", hours: 1 },
          ],
        },
        {
          id: "electric-field",
          title: "Electric Field",
          hours: 3,
          topics: [
            { slug: "electric-field-point-charges", title: "Electric field due to point charges; field lines", hours: 1 },
            { slug: "gauss-law", title: "Gauss law: electric flux", hours: 1 },
            { slug: "gauss-law-applications", title: "Application of Gauss law: field of a charge sphere, line charge, charged plane conductor", hours: 1 },
          ],
        },
        {
          id: "potential-potential-difference-and-potential-energy",
          title: "Potential, Potential Difference and Potential Energy",
          hours: 4,
          topics: [
            { slug: "potential-difference-point-charge", title: "Potential difference, potential due to a point charge, potential energy, electron volt", hours: 2 },
            { slug: "equipotential-lines-surfaces", title: "Equipotential lines and surfaces", hours: 1 },
            { slug: "potential-gradient", title: "Potential gradient", hours: 1 },
          ],
        },
        {
          id: "capacitor",
          title: "Capacitor",
          hours: 5,
          topics: [
            { slug: "capacitance-capacitor", title: "Capacitance and capacitor", hours: 1 },
            { slug: "parallel-plate-capacitor", title: "Parallel plate capacitor", hours: 1 },
            { slug: "combination-of-capacitors", title: "Combination of capacitors", hours: 1 },
            { slug: "energy-charged-capacitor", title: "Energy of charged capacitor", hours: 1 },
            { slug: "dielectric-polarization", title: "Effect of a dielectric: polarization and displacement", hours: 1 },
          ],
        },
        {
          id: "dc-circuits",
          title: "DC Circuits",
          hours: 10,
          topics: [
            { slug: "electric-currents-drift-velocity", title: "Electric currents; drift velocity and its relation with current", hours: 1 },
            { slug: "ohms-law-resistance", title: "Ohm's law; electrical resistance; resistivity; conductivity", hours: 2 },
            { slug: "current-voltage-relations", title: "Current-voltage relations; ohmic and non-ohmic resistance", hours: 1 },
            { slug: "resistances-series-parallel", title: "Resistances in series and parallel", hours: 1 },
            { slug: "potential-divider", title: "Potential divider", hours: 1 },
            { slug: "emf-internal-resistance", title: "Electromotive force of a source, internal resistance", hours: 2 },
            { slug: "work-power-electrical-circuits", title: "Work and power in electrical circuits", hours: 2 },
          ],
        },
        {
          id: "nuclear-physics",
          title: "Nuclear Physics",
          hours: 4,
          topics: [
            { slug: "nucleus-discovery", title: "Nucleus: discovery of nucleus", hours: 1 },
            { slug: "nuclear-density-mass-number", title: "Nuclear density; mass number; atomic number", hours: 1 },
            { slug: "atomic-mass-isotopes", title: "Atomic mass; isotopes", hours: 1 },
            { slug: "einstein-mass-energy", title: "Einstein's mass-energy relation", hours: 1 },
            { slug: "mass-defect-binding-energy", title: "Mass defect, packing fraction, binding energy per nucleon", hours: 1 },
            { slug: "creation-annihilation", title: "Creation and annihilation", hours: 1 },
            { slug: "nuclear-fission-fusion", title: "Nuclear fission and fusion", hours: 1 },
          ],
        },
        {
          id: "solids",
          title: "Solids",
          hours: 3,
          topics: [
            { slug: "energy-bands-solid", title: "Energy bands in solids (qualitative ideas)", hours: 1 },
            { slug: "metals-insulators-semiconductors", title: "Difference between metals, insulators and semiconductors using band theory", hours: 1 },
            { slug: "intrinsic-extrinsic-semiconductors", title: "Intrinsic and extrinsic semiconductors", hours: 1 },
          ],
        },
        {
          id: "recent-trends-in-physics",
          title: "Recent Trends in Physics",
          hours: 6,
          topics: [
            { slug: "particle-physics", title: "Particle physics: particles and antiparticles, quarks (baryons and mesons) and leptons (neutrinos)", hours: 2 },
            { slug: "universe-big-bang", title: "Universe: Big Bang and Hubble law — expansion of the Universe", hours: 2 },
            { slug: "dark-matter-black-holes-gravitational-waves", title: "Dark matter, black hole and gravitational wave", hours: 2 },
          ],
        },
      ],
    },
    {
      year: 2081,
      bsYear: "2081 BS",
      isLatest: true,
      notes:
        "Updated curriculum per esikhcha.com (April 2026). Key changes from 2076: Capacitor unit hours increased from 5 to 7; Nuclear Physics hours increased from 4 to 6; Recent Trends in Physics topics expanded with more detail on quark classification and gravitational wave detection. Total working hours increased toward 160.",
      units: [
        {
          id: "physical-quantities",
          title: "Physical Quantities",
          hours: 3,
          topics: [
            { slug: "precision-significant-figures", title: "Precision and significant figures", hours: 2 },
            { slug: "dimensions-dimensional-analysis", title: "Dimensions and uses of dimensional analysis", hours: 1 },
          ],
        },
        {
          id: "vectors",
          title: "Vectors",
          hours: 4,
          topics: [
            { slug: "laws-of-vectors", title: "Triangle, parallelogram and polygon laws of vectors", hours: 1 },
            { slug: "resolution-unit-vectors", title: "Resolution of vectors; unit vectors", hours: 2 },
            { slug: "scalar-vector-products", title: "Scalar and vector products", hours: 1 },
          ],
        },
        {
          id: "kinematics",
          title: "Kinematics",
          hours: 5,
          topics: [
            { slug: "instantaneous-velocity-acceleration", title: "Instantaneous velocity and acceleration", hours: 1 },
            { slug: "relative-velocity", title: "Relative velocity", hours: 1 },
            { slug: "equation-of-motion-graphical", title: "Equation of motion (graphical treatment)", hours: 1 },
            { slug: "freely-falling-body", title: "Motion of a freely falling body", hours: 1 },
            { slug: "projectile-motion", title: "Projectile motion and its applications", hours: 1 },
          ],
        },
        {
          id: "dynamics",
          title: "Dynamics",
          hours: 6,
          topics: [
            { slug: "linear-momentum-impulse", title: "Linear momentum, impulse", hours: 1 },
            { slug: "conservation-linear-momentum", title: "Conservation of linear momentum", hours: 1 },
            { slug: "newtons-laws-applications", title: "Application of Newton's laws", hours: 1 },
            { slug: "torque-equilibrium", title: "Moment, torque and equilibrium", hours: 1 },
            { slug: "solid-friction", title: "Solid friction: laws of solid friction and their verifications", hours: 2 },
          ],
        },
        {
          id: "work-energy-and-power",
          title: "Work, Energy and Power",
          hours: 6,
          topics: [
            { slug: "work-constant-variable-force", title: "Work done by a constant force and a variable force", hours: 1 },
            { slug: "power", title: "Power", hours: 1 },
            { slug: "work-energy-theorem", title: "Work-energy theorem; kinetic and potential energy", hours: 1 },
            { slug: "conservation-of-energy", title: "Conservation of energy", hours: 1 },
            { slug: "conservative-nonconservative-forces", title: "Conservative and non-conservative forces", hours: 1 },
            { slug: "elastic-inelastic-collisions", title: "Elastic and inelastic collisions", hours: 1 },
          ],
        },
        {
          id: "circular-motion",
          title: "Circular Motion",
          hours: 6,
          topics: [
            { slug: "angular-displacement-velocity-acceleration", title: "Angular displacement, velocity and acceleration", hours: 1 },
            { slug: "angular-linear-relation", title: "Relation between angular and linear velocity and acceleration", hours: 1 },
            { slug: "centripetal-acceleration-force", title: "Centripetal acceleration and centripetal force", hours: 1 },
            { slug: "conical-pendulum", title: "Conical pendulum", hours: 1 },
            { slug: "vertical-circle-motion", title: "Motion in a vertical circle", hours: 1 },
            { slug: "banking-applications", title: "Applications of banking", hours: 1 },
          ],
        },
        {
          id: "gravitation",
          title: "Gravitation",
          hours: 10,
          topics: [
            { slug: "newtons-law-gravitation", title: "Newton's law of gravitation", hours: 1 },
            { slug: "gravitational-field-strength", title: "Gravitational field strength", hours: 1 },
            { slug: "gravitational-potential-energy", title: "Gravitational potential; gravitational potential energy", hours: 1 },
            { slug: "variation-g-altitude-depth", title: "Variation in value of 'g' due to altitude and depth", hours: 1 },
            { slug: "centre-mass-gravity", title: "Centre of mass and centre of gravity", hours: 1 },
            { slug: "satellite-orbital-velocity", title: "Motion of a satellite: orbital velocity and time period of the satellite", hours: 2 },
            { slug: "escape-velocity", title: "Escape velocity", hours: 1 },
            { slug: "satellite-energy", title: "Potential and kinetic energy of the satellite", hours: 1 },
            { slug: "geostationary-satellite", title: "Geostationary satellite", hours: 1 },
            { slug: "gps", title: "GPS", hours: 1 },
          ],
        },
        {
          id: "elasticity",
          title: "Elasticity",
          hours: 5,
          topics: [
            { slug: "hookes-law-force-constant", title: "Hooke's law: force constant", hours: 1 },
            { slug: "stress-strain-elasticity-plasticity", title: "Stress; strain; elasticity and plasticity", hours: 1 },
            { slug: "elastic-moduli", title: "Elastic modulus: Young modulus, bulk modulus, shear modulus", hours: 1 },
            { slug: "poissons-ratio", title: "Poisson's ratio", hours: 1 },
            { slug: "elastic-potential-energy", title: "Elastic potential energy", hours: 1 },
          ],
        },
        {
          id: "heat-and-temperature",
          title: "Heat and Temperature",
          hours: 3,
          topics: [
            { slug: "thermal-energy-heat-temperature", title: "Molecular concept of thermal energy, heat and temperature; cause and direction of heat flow", hours: 1 },
            { slug: "thermal-equilibrium-zeroth-law", title: "Meaning of thermal equilibrium and Zeroth law of thermodynamics", hours: 1 },
            { slug: "mercury-thermometer-principle", title: "Thermal equilibrium as a working principle of a mercury thermometer", hours: 1 },
          ],
        },
        {
          id: "thermal-expansion",
          title: "Thermal Expansion",
          hours: 4,
          topics: [
            { slug: "linear-expansion", title: "Linear expansion and its measurement", hours: 1 },
            { slug: "cubical-superficial-expansion", title: "Cubical expansion, superficial expansion and their relation with linear expansion", hours: 1 },
            { slug: "liquid-expansion", title: "Liquid expansion: absolute and apparent", hours: 1 },
            { slug: "dulong-petit-method", title: "Dulong and Petit method of determining expansivity of liquid", hours: 1 },
          ],
        },
        {
          id: "quantity-of-heat",
          title: "Quantity of Heat",
          hours: 6,
          topics: [
            { slug: "newtons-law-cooling", title: "Newton's law of cooling", hours: 1 },
            { slug: "specific-heat-capacity", title: "Measurement of specific heat capacity of solids and liquids", hours: 1 },
            { slug: "change-of-phases-latent-heat", title: "Change of phases: latent heat", hours: 1 },
            { slug: "specific-latent-heat-fusion-vaporization", title: "Specific latent heat of fusion and vaporization", hours: 1 },
            { slug: "measurement-latent-heat", title: "Measurement of specific latent heat of fusion and vaporization", hours: 1 },
            { slug: "triple-point", title: "Triple point", hours: 1 },
          ],
        },
        {
          id: "rate-of-heat-flow",
          title: "Rate of Heat Flow",
          hours: 5,
          topics: [
            { slug: "conduction-thermal-conductivity", title: "Conduction: thermal conductivity and measurement", hours: 2 },
            { slug: "convection", title: "Convection", hours: 1 },
            { slug: "radiation-ideal-radiator", title: "Radiation: ideal radiator", hours: 1 },
            { slug: "black-body-radiation", title: "Black-body radiation", hours: 1 },
          ],
        },
        {
          id: "ideal-gas",
          title: "Ideal Gas",
          hours: 8,
          topics: [
            { slug: "ideal-gas-equation", title: "Ideal gas equation", hours: 1 },
            { slug: "molecular-properties-matter", title: "Molecular properties of matter", hours: 1 },
            { slug: "kinetic-molecular-model", title: "Kinetic-molecular model of an ideal gas", hours: 1 },
            { slug: "derivation-pressure-gas", title: "Derivation of pressure exerted by gas", hours: 1 },
            { slug: "average-translational-kinetic-energy", title: "Average translational kinetic energy of gas molecule", hours: 1 },
            { slug: "boltzmann-constant-rms-speed", title: "Boltzmann constant, root mean square speed", hours: 1 },
            { slug: "heat-capacities-gases-solids", title: "Heat capacities of gases and solids", hours: 2 },
          ],
        },
        {
          id: "reflection-at-curved-mirror",
          title: "Reflection at Curved Mirror",
          hours: 2,
          topics: [
            { slug: "real-virtual-images", title: "Real and virtual images", hours: 1 },
            { slug: "mirror-formula", title: "Mirror formula", hours: 1 },
          ],
        },
        {
          id: "refraction-at-plane-surfaces",
          title: "Refraction at Plane Surfaces",
          hours: 4,
          topics: [
            { slug: "laws-of-refraction", title: "Laws of refraction: refractive index", hours: 1 },
            { slug: "relation-refractive-indices", title: "Relation between refractive indices", hours: 1 },
            { slug: "lateral-shift", title: "Lateral shift", hours: 1 },
            { slug: "total-internal-reflection", title: "Total internal reflection", hours: 1 },
          ],
        },
        {
          id: "refraction-through-prisms",
          title: "Refraction through Prisms",
          hours: 3,
          topics: [
            { slug: "minimum-deviation-condition", title: "Minimum deviation condition", hours: 1 },
            { slug: "prism-minimum-deviation-refractive-index", title: "Relation between the angle of prism, minimum deviation and refractive index", hours: 1 },
            { slug: "small-angle-prism-deviation", title: "Deviation in small-angle prism", hours: 1 },
          ],
        },
        {
          id: "lenses",
          title: "Lenses",
          hours: 3,
          topics: [
            { slug: "spherical-lenses-magnification", title: "Spherical lenses, angular magnification", hours: 1 },
            { slug: "lens-makers-formula", title: "Lens maker's formula", hours: 1 },
            { slug: "power-of-lens", title: "Power of a lens", hours: 1 },
          ],
        },
        {
          id: "dispersion",
          title: "Dispersion",
          hours: 3,
          topics: [
            { slug: "pure-spectrum-dispersive-power", title: "Pure spectrum and dispersive power", hours: 1 },
            { slug: "chromatic-spherical-aberration", title: "Chromatic and spherical aberration", hours: 1 },
            { slug: "achromatism-applications", title: "Achromatism and its applications", hours: 1 },
          ],
        },
        {
          id: "electric-charges",
          title: "Electric Charges",
          hours: 3,
          topics: [
            { slug: "electric-charges", title: "Electric charges", hours: 1 },
            { slug: "charging-by-induction", title: "Charging by induction", hours: 1 },
            { slug: "coulombs-law", title: "Coulomb's law: force between two point charges", hours: 1 },
          ],
        },
        {
          id: "electric-field",
          title: "Electric Field",
          hours: 3,
          topics: [
            { slug: "electric-field-point-charges", title: "Electric field due to point charges; field lines", hours: 1 },
            { slug: "gauss-law", title: "Gauss law: electric flux", hours: 1 },
            { slug: "gauss-law-applications", title: "Application of Gauss law: field of a charge sphere, line charge, charged plane conductor", hours: 1 },
          ],
        },
        {
          id: "potential-potential-difference-and-potential-energy",
          title: "Potential, Potential Difference and Potential Energy",
          hours: 4,
          topics: [
            { slug: "potential-difference-point-charge", title: "Potential difference, potential due to a point charge, potential energy, electron volt", hours: 2 },
            { slug: "equipotential-lines-surfaces", title: "Equipotential lines and surfaces", hours: 1 },
            { slug: "potential-gradient", title: "Potential gradient", hours: 1 },
          ],
        },
        {
          id: "capacitor",
          title: "Capacitor",
          hours: 7,
          topics: [
            { slug: "capacitance-capacitor", title: "Capacitance and capacitor", hours: 1, modifiedInYear: 2081 },
            { slug: "parallel-plate-capacitor", title: "Parallel plate capacitor", hours: 2, modifiedInYear: 2081 },
            { slug: "combination-of-capacitors", title: "Combination of capacitors", hours: 1, modifiedInYear: 2081 },
            { slug: "energy-charged-capacitor", title: "Energy of charged capacitor", hours: 1, modifiedInYear: 2081 },
            { slug: "dielectric-polarization", title: "Effect of a dielectric: polarization and displacement", hours: 2, modifiedInYear: 2081 },
          ],
        },
        {
          id: "dc-circuits",
          title: "DC Circuits",
          hours: 10,
          topics: [
            { slug: "electric-currents-drift-velocity", title: "Electric currents; drift velocity and its relation with current", hours: 1 },
            { slug: "ohms-law-resistance", title: "Ohm's law; electrical resistance; resistivity; conductivity", hours: 2 },
            { slug: "current-voltage-relations", title: "Current-voltage relations; ohmic and non-ohmic resistance", hours: 1 },
            { slug: "resistances-series-parallel", title: "Resistances in series and parallel", hours: 1 },
            { slug: "potential-divider", title: "Potential divider", hours: 1 },
            { slug: "emf-internal-resistance", title: "Electromotive force of a source, internal resistance", hours: 2 },
            { slug: "work-power-electrical-circuits", title: "Work and power in electrical circuits", hours: 2 },
          ],
        },
        {
          id: "nuclear-physics",
          title: "Nuclear Physics",
          hours: 6,
          topics: [
            { slug: "nucleus-discovery", title: "Nucleus: discovery, nuclear density, mass number, atomic number", hours: 1, modifiedInYear: 2081 },
            { slug: "atomic-mass-isotopes", title: "Atomic mass and isotopes", hours: 1, modifiedInYear: 2081 },
            { slug: "einstein-mass-energy", title: "Einstein's mass-energy relation", hours: 1, modifiedInYear: 2081 },
            { slug: "mass-defect-binding-energy", title: "Mass defect, packing fraction, BE per nucleon", hours: 1, modifiedInYear: 2081 },
            { slug: "creation-annihilation", title: "Creation and annihilation", hours: 1, modifiedInYear: 2081 },
            { slug: "nuclear-fission-fusion", title: "Nuclear fission and fusion; energy released", hours: 2, modifiedInYear: 2081 },
          ],
        },
        {
          id: "solids",
          title: "Solids",
          hours: 3,
          topics: [
            { slug: "energy-bands-solid", title: "Energy bands in solids (qualitative ideas)", hours: 1 },
            { slug: "metals-insulators-semiconductors", title: "Difference between metals, insulators and semiconductors using band theory", hours: 1 },
            { slug: "intrinsic-extrinsic-semiconductors", title: "Intrinsic and extrinsic semiconductors", hours: 1 },
          ],
        },
        {
          id: "recent-trends-in-physics",
          title: "Recent Trends in Physics",
          hours: 6,
          topics: [
            { slug: "particle-physics", title: "Particle physics: particles & antiparticles, quarks (baryons & mesons), leptons (neutrinos)", hours: 2 },
            { slug: "universe-big-bang", title: "Universe: Big Bang and Hubble's law — expansion of the Universe", hours: 2 },
            { slug: "dark-matter-black-holes-gravitational-waves", title: "Dark matter, black hole and gravitational waves", hours: 2 },
          ],
        },
      ],
    },
  ],
};

export const PHYSICS_12_DATA: SubjectPhysicsData = {
  grade: "12",
  subjectCode: "102",
  versions: [
    {
      year: 2076,
      bsYear: "2076 BS",
      isLatest: false,
      notes:
        "NCF 2076 baseline curriculum for Grade 12 Physics. 25 chapters across 5 major units (Mechanics, Heat & Thermodynamics, Wave & Optics, Electricity & Magnetism, Modern Physics). Source: dhanraj.com.np curriculum PDF listing and official NEB syllabus.",
      units: [
        {
          id: "electrostatics",
          title: "Electrostatics",
          hours: 10,
          topics: [
            { slug: "coulombs-law-applications", title: "Coulomb's law and its applications", hours: 2 },
            { slug: "electric-field-intensity", title: "Electric field and electric field intensity due to point charges, line charges, and charged sheets", hours: 3 },
            { slug: "electric-potential", title: "Electric potential and potential difference", hours: 2 },
            { slug: "capacitance-capacitors", title: "Capacitance and capacitors — parallel plate, series and parallel combination", hours: 2 },
            { slug: "dielectric-constant", title: "Dielectric and dielectric constant", hours: 1 },
          ],
        },
        {
          id: "current-electricity",
          title: "Current Electricity",
          hours: 10,
          topics: [
            { slug: "electric-current-drift-velocity", title: "Electric current, drift velocity, and relaxation time", hours: 2 },
            { slug: "ohms-law-limitations", title: "Ohm's law and its limitations", hours: 1 },
            { slug: "resistance-resistivity", title: "Resistance and resistivity — temperature dependence", hours: 1 },
            { slug: "series-parallel-resistors", title: "Series and parallel combination of resistors", hours: 1 },
            { slug: "kirchhoffs-laws", title: "Kirchhoff's laws and their applications", hours: 2 },
            { slug: "emf-internal-resistance", title: "Electromotive force (emf), internal resistance, and cells in combination", hours: 1 },
            { slug: "wheatstone-meter-bridge", title: "Wheatstone bridge and meter bridge", hours: 2 },
            { slug: "potentiometer", title: "Potentiometer and its applications", hours: 2 },
          ],
        },
        {
          id: "magnetism-and-magnetic-effect",
          title: "Magnetism and Magnetic Effect of Current",
          hours: 12,
          topics: [
            { slug: "magnetic-field-force-moving-charges", title: "Magnetic field and magnetic force on moving charges", hours: 2 },
            { slug: "lorentz-force", title: "Lorentz force and motion of charged particles in magnetic fields", hours: 2 },
            { slug: "biot-savart-law", title: "Biot-Savart law and its applications (straight wire, circular loop, solenoid)", hours: 2 },
            { slug: "amperes-circuital-law", title: "Ampere's circuital law and its applications", hours: 2 },
            { slug: "force-parallel-conductors", title: "Force between two parallel current-carrying conductors", hours: 2 },
            { slug: "moving-coil-galvanometer", title: "Moving coil galvanometer, ammeter, and voltmeter", hours: 2 },
          ],
        },
        {
          id: "electromagnetic-induction",
          title: "Electromagnetic Induction",
          hours: 8,
          topics: [
            { slug: "faradays-laws", title: "Faraday's laws of electromagnetic induction", hours: 2 },
            { slug: "lenzs-law", title: "Lenz's law and conservation of energy", hours: 1 },
            { slug: "self-induction", title: "Self-induction and self-inductance", hours: 2 },
            { slug: "mutual-induction", title: "Mutual induction and mutual inductance", hours: 2 },
            { slug: "lr-circuits", title: "Growing and decaying current in LR circuits", hours: 1 },
          ],
        },
        {
          id: "alternating-current",
          title: "Alternating Current",
          hours: 8,
          topics: [
            { slug: "ac-voltage-resistor-inductor-capacitor", title: "AC voltage applied to resistor, inductor, and capacitor", hours: 2 },
            { slug: "lc-oscillations-resonance", title: "LC oscillations and resonance", hours: 2 },
            { slug: "lcr-series-circuit", title: "LCR series circuit and power factor", hours: 2 },
            { slug: "transformer", title: "Transformer — principle, types, and losses", hours: 2 },
          ],
        },
        {
          id: "ray-optics",
          title: "Ray Optics",
          hours: 10,
          topics: [
            { slug: "reflection-plane-curved", title: "Reflection at plane and curved surfaces — mirrors", hours: 2 },
            { slug: "refraction-plane-surfaces", title: "Refraction at plane surfaces — total internal reflection", hours: 2 },
            { slug: "refraction-prisms", title: "Refraction through prisms — angle of deviation and minimum deviation", hours: 2 },
            { slug: "thin-lenses", title: "Thin lenses — lens maker's formula and power of lens", hours: 2 },
            { slug: "combination-lenses-mirrors", title: "Combination of lenses and mirrors", hours: 1 },
            { slug: "optical-instruments", title: "Optical instruments — microscope and telescope", hours: 1 },
          ],
        },
        {
          id: "wave-optics",
          title: "Wave Optics",
          hours: 8,
          topics: [
            { slug: "wavefront-huygens", title: "Wavefront and Huygens' principle", hours: 2 },
            { slug: "interference-light", title: "Interference of light — Young's double slit experiment", hours: 2 },
            { slug: "diffraction-light", title: "Diffraction of light — single slit diffraction", hours: 2 },
            { slug: "polarization", title: "Polarization — Brewster's law and polaroids", hours: 2 },
          ],
        },
        {
          id: "modern-physics",
          title: "Modern Physics",
          hours: 12,
          topics: [
            { slug: "photoelectric-effect", title: "Photoelectric effect and Einstein's photoelectric equation", hours: 2 },
            { slug: "de-broglie-wavelength", title: "De Broglie wavelength and matter waves", hours: 2 },
            { slug: "bohr-model-hydrogen", title: "Atom — Bohr's model and hydrogen spectrum", hours: 2 },
            { slug: "nucleus-binding-energy", title: "Nucleus — binding energy, nuclear fission and fusion", hours: 2 },
            { slug: "semiconductors", title: "Semiconductors — intrinsic and extrinsic, p-n junction, diode, transistor", hours: 2 },
            { slug: "logic-gates", title: "Logic gates — AND, OR, NOT, NAND, NOR", hours: 2 },
          ],
        },
        {
          id: "communication-systems",
          title: "Communication Systems",
          hours: 4,
          topics: [
            { slug: "elements-communication-system", title: "Elements of a communication system", hours: 1 },
            { slug: "modulation", title: "Modulation — amplitude modulation and frequency modulation", hours: 2 },
            { slug: "bandwidth-propagation", title: "Bandwidth and propagation of electromagnetic waves", hours: 1 },
          ],
        },
      ],
    },
    {
      year: 2081,
      bsYear: "2081 BS",
      isLatest: true,
      notes:
        "Updated curriculum per esikhcha.com (April 2026). Key changes from 2076: Recent Trends in Physics now includes Gorkha Earthquake 2015 wave patterns (Rayleigh, Love, S and P-waves), Nanotechnology, and Higgs Boson; additional chapters in Wave & Optics (Wave Motion, Mechanical Waves, Wave in Pipes and Strings, Acoustic Phenomena, Nature and Propagation of Light) and Electricity & Magnetism (Thermoelectric Effects, Magnetic Properties of Materials); Modern Physics expanded with Electrons (Millikan, Thomson), Photons, Semiconductor Devices, Quantization of Energy, and Radioactivity units. Total working hours ~160.",
      units: [
        {
          id: "electrostatics",
          title: "Electrostatics",
          hours: 10,
          topics: [
            { slug: "coulombs-law-applications", title: "Coulomb's law and its applications", hours: 2 },
            { slug: "electric-field-intensity", title: "Electric field and electric field intensity due to point charges, line charges, and charged sheets", hours: 3 },
            { slug: "electric-potential", title: "Electric potential and potential difference", hours: 2 },
            { slug: "capacitance-capacitors", title: "Capacitance and capacitors — parallel plate, series and parallel combination", hours: 2 },
            { slug: "dielectric-constant", title: "Dielectric and dielectric constant", hours: 1 },
          ],
        },
        {
          id: "current-electricity",
          title: "Current Electricity",
          hours: 10,
          topics: [
            { slug: "electric-current-drift-velocity", title: "Electric current, drift velocity, and relaxation time", hours: 2 },
            { slug: "ohms-law-limitations", title: "Ohm's law and its limitations", hours: 1 },
            { slug: "resistance-resistivity", title: "Resistance and resistivity — temperature dependence", hours: 1 },
            { slug: "series-parallel-resistors", title: "Series and parallel combination of resistors", hours: 1 },
            { slug: "kirchhoffs-laws", title: "Kirchhoff's laws and their applications", hours: 2 },
            { slug: "emf-internal-resistance", title: "Electromotive force (emf), internal resistance, and cells in combination", hours: 1 },
            { slug: "wheatstone-meter-bridge", title: "Wheatstone bridge and meter bridge", hours: 2 },
            { slug: "potentiometer", title: "Potentiometer and its applications", hours: 2 },
          ],
        },
        {
          id: "magnetism-and-magnetic-effect",
          title: "Magnetism and Magnetic Effect of Current",
          hours: 12,
          topics: [
            { slug: "magnetic-field-force-moving-charges", title: "Magnetic field and magnetic force on moving charges", hours: 2 },
            { slug: "lorentz-force", title: "Lorentz force and motion of charged particles in magnetic fields", hours: 2 },
            { slug: "biot-savart-law", title: "Biot-Savart law and its applications (straight wire, circular loop, solenoid)", hours: 2 },
            { slug: "amperes-circuital-law", title: "Ampere's circuital law and its applications", hours: 2 },
            { slug: "force-parallel-conductors", title: "Force between two parallel current-carrying conductors", hours: 2 },
            { slug: "moving-coil-galvanometer", title: "Moving coil galvanometer, ammeter, and voltmeter", hours: 2 },
          ],
        },
        {
          id: "electromagnetic-induction",
          title: "Electromagnetic Induction",
          hours: 8,
          topics: [
            { slug: "faradays-laws", title: "Faraday's laws of electromagnetic induction", hours: 2 },
            { slug: "lenzs-law", title: "Lenz's law and conservation of energy", hours: 1 },
            { slug: "self-induction", title: "Self-induction and self-inductance", hours: 2 },
            { slug: "mutual-induction", title: "Mutual induction and mutual inductance", hours: 2 },
            { slug: "lr-circuits", title: "Growing and decaying current in LR circuits", hours: 1 },
          ],
        },
        {
          id: "alternating-current",
          title: "Alternating Current",
          hours: 8,
          topics: [
            { slug: "ac-voltage-resistor-inductor-capacitor", title: "AC voltage applied to resistor, inductor, and capacitor", hours: 2 },
            { slug: "lc-oscillations-resonance", title: "LC oscillations and resonance", hours: 2 },
            { slug: "lcr-series-circuit", title: "LCR series circuit and power factor", hours: 2 },
            { slug: "transformer", title: "Transformer — principle, types, and losses", hours: 2 },
          ],
        },
        {
          id: "ray-optics",
          title: "Ray Optics",
          hours: 10,
          topics: [
            { slug: "reflection-plane-curved", title: "Reflection at plane and curved surfaces — mirrors", hours: 2 },
            { slug: "refraction-plane-surfaces", title: "Refraction at plane surfaces — total internal reflection", hours: 2 },
            { slug: "refraction-prisms", title: "Refraction through prisms — angle of deviation and minimum deviation", hours: 2 },
            { slug: "thin-lenses", title: "Thin lenses — lens maker's formula and power of lens", hours: 2 },
            { slug: "combination-lenses-mirrors", title: "Combination of lenses and mirrors", hours: 1 },
            { slug: "optical-instruments", title: "Optical instruments — microscope and telescope", hours: 1 },
          ],
        },
        {
          id: "wave-optics",
          title: "Wave Optics",
          hours: 8,
          topics: [
            { slug: "wavefront-huygens", title: "Wavefront and Huygens' principle", hours: 2 },
            { slug: "interference-light", title: "Interference of light — Young's double slit experiment", hours: 2 },
            { slug: "diffraction-light", title: "Diffraction of light — single slit diffraction", hours: 2 },
            { slug: "polarization", title: "Polarization — Brewster's law and polaroids", hours: 2 },
          ],
        },
        {
          id: "modern-physics",
          title: "Modern Physics",
          hours: 12,
          topics: [
            { slug: "photoelectric-effect", title: "Photoelectric effect and Einstein's photoelectric equation", hours: 2 },
            { slug: "de-broglie-wavelength", title: "De Broglie wavelength and matter waves", hours: 2 },
            { slug: "bohr-model-hydrogen", title: "Atom — Bohr's model and hydrogen spectrum", hours: 2 },
            { slug: "nucleus-binding-energy", title: "Nucleus — binding energy, nuclear fission and fusion", hours: 2 },
            { slug: "semiconductors", title: "Semiconductors — intrinsic and extrinsic, p-n junction, diode, transistor", hours: 2 },
            { slug: "logic-gates", title: "Logic gates — AND, OR, NOT, NAND, NOR", hours: 2 },
          ],
        },
        {
          id: "communication-systems",
          title: "Communication Systems",
          hours: 4,
          topics: [
            { slug: "elements-communication-system", title: "Elements of a communication system", hours: 1 },
            { slug: "modulation", title: "Modulation — amplitude modulation and frequency modulation", hours: 2 },
            { slug: "bandwidth-propagation", title: "Bandwidth and propagation of electromagnetic waves", hours: 1 },
          ],
        },
        {
          id: "rotational-dynamics",
          title: "Rotational Dynamics",
          hours: 8,
          topics: [
            { slug: "angular-motion-equations", title: "Equation of angular motion; relation between linear and angular kinematics", hours: 2, addedInYear: 2081 },
            { slug: "rotational-kinetic-energy", title: "Kinetic energy of rotation of rigid body", hours: 1, addedInYear: 2081 },
            { slug: "moment-inertia-radius-gyration", title: "Moment of inertia; radius of gyration", hours: 2, addedInYear: 2081 },
            { slug: "moment-inertia-rod", title: "Moment of inertia of a uniform rod", hours: 1, addedInYear: 2081 },
            { slug: "torque-angular-acceleration", title: "Torque and angular acceleration for a rigid body", hours: 1, addedInYear: 2081 },
            { slug: "angular-momentum-conservation", title: "Angular momentum and conservation of angular momentum", hours: 1, addedInYear: 2081 },
          ],
        },
        {
          id: "periodic-motion",
          title: "Periodic Motion",
          hours: 7,
          topics: [
            { slug: "shm-equation", title: "Equation of simple harmonic motion (SHM)", hours: 2, addedInYear: 2081 },
            { slug: "energy-shm", title: "Energy in SHM", hours: 1, addedInYear: 2081 },
            { slug: "shm-applications", title: "Application of SHM: vertical oscillation of mass on spring", hours: 1, addedInYear: 2081 },
            { slug: "angular-shm-pendulum", title: "Angular SHM and simple pendulum", hours: 1, addedInYear: 2081 },
            { slug: "damped-forced-resonance", title: "Damped oscillation, forced oscillation and resonance", hours: 2, addedInYear: 2081 },
          ],
        },
        {
          id: "fluid-statics",
          title: "Fluid Statics",
          hours: 8,
          topics: [
            { slug: "fluid-statics-pressure-buoyancy", title: "Fluid statics: pressure in a fluid and buoyancy", hours: 2, addedInYear: 2081 },
            { slug: "surface-tension", title: "Surface tension: theory, surface energy, angle of contact, capillarity", hours: 2, addedInYear: 2081 },
            { slug: "viscosity-poiseuilles-stokes", title: "Newton's formula for viscosity; coefficient of viscosity; Poiseuille's formula and Stokes law and their applications", hours: 2, addedInYear: 2081 },
            { slug: "continuity-bernoulli", title: "Equation of continuity and its applications; Bernoulli's equation and its applications", hours: 2, addedInYear: 2081 },
          ],
        },
        {
          id: "first-law-thermodynamics",
          title: "First Law of Thermodynamics",
          hours: 7,
          topics: [
            { slug: "thermodynamic-systems-work", title: "Thermodynamic systems; work done during volume change", hours: 2, addedInYear: 2081 },
            { slug: "first-law-formulation", title: "Heat, work, internal energy and First law of thermodynamics", hours: 2, addedInYear: 2081 },
            { slug: "thermodynamic-processes", title: "Thermodynamic processes: adiabatic, isochoric, isothermal, isobaric", hours: 2, addedInYear: 2081 },
            { slug: "heat-capacities-gas", title: "Heat capacities of ideal gas at constant pressure and volume; isothermal and adiabatic processes for an ideal gas", hours: 1, addedInYear: 2081 },
          ],
        },
        {
          id: "second-law-thermodynamics",
          title: "Second Law of Thermodynamics",
          hours: 6,
          topics: [
            { slug: "direction-thermodynamic-processes", title: "Thermodynamic systems and direction of thermodynamic processes", hours: 1, addedInYear: 2081 },
            { slug: "second-law-statement", title: "Second law of thermodynamics", hours: 1, addedInYear: 2081 },
            { slug: "heat-engines-cycles", title: "Heat engines; internal combustion engines: Otto cycle, Diesel cycle, Carnot cycle", hours: 2, addedInYear: 2081 },
            { slug: "refrigerator-entropy", title: "Refrigerator; entropy and disorder (introduction)", hours: 2, addedInYear: 2081 },
          ],
        },
        {
          id: "wave-motion",
          title: "Wave Motion",
          hours: 5,
          topics: [
            { slug: "progressive-waves", title: "Progressive waves", hours: 2, addedInYear: 2081 },
            { slug: "mathematical-description-wave", title: "Mathematical description of a wave", hours: 2, addedInYear: 2081 },
            { slug: "stationary-waves", title: "Stationary waves", hours: 1, addedInYear: 2081 },
          ],
        },
        {
          id: "mechanical-waves",
          title: "Mechanical Waves",
          hours: 5,
          topics: [
            { slug: "speed-wave-motion", title: "Speed of wave motion; velocity of sound in solid and liquid", hours: 2, addedInYear: 2081 },
            { slug: "velocity-sound-gas-laplace", title: "Velocity of sound in gas; Laplace's correction", hours: 1, addedInYear: 2081 },
            { slug: "factors-sound-velocity", title: "Effect of temperature, pressure and humidity on velocity of sound", hours: 2, addedInYear: 2081 },
          ],
        },
        {
          id: "wave-pipes-strings",
          title: "Wave in Pipes and Strings",
          hours: 5,
          topics: [
            { slug: "stationary-waves-pipes", title: "Stationary waves in closed and open pipes", hours: 2, addedInYear: 2081 },
            { slug: "harmonics-overtones", title: "Harmonics and overtones in closed and open organ pipes; end correction in pipes", hours: 2, addedInYear: 2081 },
            { slug: "vibration-strings", title: "Velocity of transverse waves along a stretched string; vibration of string and overtones; laws of vibration of fixed string", hours: 1, addedInYear: 2081 },
          ],
        },
        {
          id: "acoustic-phenomena",
          title: "Acoustic Phenomena",
          hours: 4,
          topics: [
            { slug: "sound-waves-pressure-amplitude", title: "Sound waves: pressure amplitude", hours: 1, addedInYear: 2081 },
            { slug: "characteristics-sound", title: "Characteristics of sound: intensity, loudness, quality and pitch", hours: 2, addedInYear: 2081 },
            { slug: "doppler-effect", title: "Doppler's effect", hours: 1, addedInYear: 2081 },
          ],
        },
        {
          id: "nature-propagation-light",
          title: "Nature and Propagation of Light",
          hours: 4,
          topics: [
            { slug: "huygens-principle", title: "Huygens' principle", hours: 2, addedInYear: 2081 },
            { slug: "reflection-refraction-wave-theory", title: "Reflection and refraction according to wave theory", hours: 2, addedInYear: 2081 },
          ],
        },
        {
          id: "interference",
          title: "Interference",
          hours: 5,
          topics: [
            { slug: "interference-coherent-sources", title: "Phenomenon of interference: coherent sources", hours: 2, addedInYear: 2081 },
            { slug: "youngs-double-slit", title: "Young's double slit experiment", hours: 3, addedInYear: 2081 },
          ],
        },
        {
          id: "diffraction",
          title: "Diffraction",
          hours: 5,
          topics: [
            { slug: "diffraction-single-slit", title: "Diffraction from a single slit", hours: 2, addedInYear: 2081 },
            { slug: "diffraction-pattern-image", title: "Diffraction pattern of image; diffraction grating", hours: 2, addedInYear: 2081 },
            { slug: "resolving-power", title: "Resolving power of optical instruments", hours: 1, addedInYear: 2081 },
          ],
        },
        {
          id: "polarization",
          title: "Polarization",
          hours: 4,
          topics: [
            { slug: "polarization-phenomenon", title: "Phenomenon of polarization", hours: 1, addedInYear: 2081 },
            { slug: "brewsters-law", title: "Brewster's law; transverse nature of light", hours: 2, addedInYear: 2081 },
            { slug: "polaroid", title: "Polaroid", hours: 1, addedInYear: 2081 },
          ],
        },
        {
          id: "electrical-circuits",
          title: "Electrical Circuits",
          hours: 8,
          topics: [
            { slug: "kirchhoffs-law-detailed", title: "Kirchhoff's law", hours: 1, addedInYear: 2081 },
            { slug: "wheatstone-bridge-meter-bridge-12", title: "Wheatstone bridge circuit and meter bridge", hours: 2, addedInYear: 2081 },
            { slug: "potentiometer-12", title: "Potentiometer: comparison of emf, measurement of internal resistance", hours: 2, addedInYear: 2081 },
            { slug: "superconductors", title: "Superconductors and perfect conductors", hours: 1, addedInYear: 2081 },
            { slug: "galvanometer-conversions", title: "Conversion of galvanometer into voltmeter, ammeter; ohmmeter", hours: 1, addedInYear: 2081 },
            { slug: "joules-law", title: "Joule's law", hours: 1, addedInYear: 2081 },
          ],
        },
        {
          id: "thermoelectric-effects",
          title: "Thermoelectric Effects",
          hours: 4,
          topics: [
            { slug: "seebeck-effect", title: "Seebeck effect and thermocouples", hours: 2, addedInYear: 2081 },
            { slug: "peltier-effect", title: "Peltier effect; variation of thermoelectric emf with temperature; thermopile", hours: 2, addedInYear: 2081 },
          ],
        },
        {
          id: "magnetic-field",
          title: "Magnetic Field",
          hours: 10,
          topics: [
            { slug: "magnetic-field-lines-flux", title: "Magnetic field lines and magnetic flux; Oersted's experiment", hours: 1, addedInYear: 2081 },
            { slug: "force-moving-charge-conductor", title: "Force on moving charge; force on a conductor", hours: 2, addedInYear: 2081 },
            { slug: "force-torque-coil", title: "Force and torque on rectangular coil; moving coil galvanometer", hours: 2, addedInYear: 2081 },
            { slug: "hall-effect", title: "Hall effect; magnetic field of a moving charge", hours: 1, addedInYear: 2081 },
            { slug: "biot-savart-law-12", title: "Biot and Savart law (circular coil, straight conductor, solenoid)", hours: 2, addedInYear: 2081 },
            { slug: "amperes-law-applications-12", title: "Ampere's law and its applications", hours: 1, addedInYear: 2081 },
            { slug: "force-parallel-conductors-12", title: "Force between two parallel current-carrying conductors; definition of ampere", hours: 1, addedInYear: 2081 },
          ],
        },
        {
          id: "magnetic-properties-materials",
          title: "Magnetic Properties of Materials",
          hours: 4,
          topics: [
            { slug: "flux-density-permeability-susceptibility", title: "Flux density in magnetic material; relative permeability; susceptibility", hours: 2, addedInYear: 2081 },
            { slug: "hysteresis", title: "Hysteresis", hours: 1, addedInYear: 2081 },
            { slug: "dia-para-ferro-magnetic", title: "Dia-, para- and ferro-magnetic materials", hours: 1, addedInYear: 2081 },
          ],
        },
        {
          id: "electromagnetic-induction-12",
          title: "Electromagnetic Induction",
          hours: 8,
          topics: [
            { slug: "faradays-laws-detailed", title: "Faraday's laws; induced electric fields", hours: 2, addedInYear: 2081 },
            { slug: "lenzs-law-detailed", title: "Lenz's law; motional electromotive force", hours: 2, addedInYear: 2081 },
            { slug: "ac-generators-eddy-currents", title: "A.C. generators and eddy currents", hours: 1, addedInYear: 2081 },
            { slug: "self-mutual-inductance", title: "Self-inductance and mutual inductance", hours: 2, addedInYear: 2081 },
            { slug: "energy-inductor-transformer", title: "Energy stored in an inductor; transformer", hours: 1, addedInYear: 2081 },
          ],
        },
        {
          id: "alternating-currents",
          title: "Alternating Currents",
          hours: 8,
          topics: [
            { slug: "peak-rms-values", title: "Peak and rms value of AC current and voltage", hours: 2, addedInYear: 2081 },
            { slug: "ac-resistor-capacitor-inductor", title: "AC through a resistor, a capacitor and an inductor", hours: 2, addedInYear: 2081 },
            { slug: "phasor-diagram", title: "Phasor diagram", hours: 1, addedInYear: 2081 },
            { slug: "series-lcr-resonance", title: "Series circuits with resistance, capacitance and inductance; series resonance and quality factor", hours: 2, addedInYear: 2081 },
            { slug: "power-ac-circuits", title: "Power in AC circuits and power factor", hours: 1, addedInYear: 2081 },
          ],
        },
        {
          id: "electrons",
          title: "Electrons",
          hours: 5,
          topics: [
            { slug: "millikan-oil-drop", title: "Millikan's oil drop experiment", hours: 2, addedInYear: 2081 },
            { slug: "electron-beam-fields", title: "Motion of electron beam in electric and magnetic fields", hours: 2, addedInYear: 2081 },
            { slug: "thomson-experiment", title: "Thomson's experiment to determine specific charge of electrons", hours: 1, addedInYear: 2081 },
          ],
        },
        {
          id: "photons",
          title: "Photons",
          hours: 5,
          topics: [
            { slug: "quantum-nature-radiation", title: "Quantum nature of radiation", hours: 2, addedInYear: 2081 },
            { slug: "photoelectric-equation-stopping-potential", title: "Einstein's photoelectric equation; stopping potential", hours: 2, addedInYear: 2081 },
            { slug: "plancks-constant-measurement", title: "Measurement of Planck's constant", hours: 1, addedInYear: 2081 },
          ],
        },
        {
          id: "semiconductor-devices",
          title: "Semiconductor Devices",
          hours: 6,
          topics: [
            { slug: "pn-junction", title: "P-N junction", hours: 2, addedInYear: 2081 },
            { slug: "semiconductor-diode-characteristics", title: "Semiconductor diode: characteristics in forward and reverse bias", hours: 2, addedInYear: 2081 },
            { slug: "full-wave-rectification", title: "Full wave rectification", hours: 1, addedInYear: 2081 },
            { slug: "logic-gates-12", title: "Logic gates: NOT, OR, AND, NAND and NOR", hours: 1, addedInYear: 2081 },
          ],
        },
        {
          id: "quantization-of-energy",
          title: "Quantization of Energy",
          hours: 7,
          topics: [
            { slug: "bohr-theory-hydrogen", title: "Bohr's theory of hydrogen atom", hours: 2, addedInYear: 2081 },
            { slug: "spectral-series", title: "Spectral series; excitation and ionization potentials", hours: 2, addedInYear: 2081 },
            { slug: "de-broglie-duality", title: "De Broglie theory and wave-particle duality; uncertainty principle", hours: 2, addedInYear: 2081 },
            { slug: "x-rays", title: "X-rays: nature, production, uses and diffraction; Bragg's law", hours: 1, addedInYear: 2081 },
          ],
        },
        {
          id: "radioactivity-nuclear-reaction",
          title: "Radioactivity and Nuclear Reaction",
          hours: 6,
          topics: [
            { slug: "alpha-beta-gamma-rays", title: "Alpha-particles, beta-particles and gamma rays", hours: 2, addedInYear: 2081 },
            { slug: "radioactive-disintegration-laws", title: "Laws of radioactive disintegration; half-life, mean-life and decay constant", hours: 2, addedInYear: 2081 },
            { slug: "geiger-muller-tube", title: "Geiger-Muller tube", hours: 1, addedInYear: 2081 },
            { slug: "carbon-dating", title: "Carbon dating", hours: 1, addedInYear: 2081 },
            { slug: "medical-nuclear-radiation", title: "Medical use of nuclear radiation and possible health hazards", hours: 1, addedInYear: 2081 },
          ],
        },
        {
          id: "recent-trends-in-physics-12",
          title: "Recent Trends in Physics",
          hours: 6,
          topics: [
            { slug: "surface-waves-rayleigh-love", title: "Surface waves: Rayleigh and Love waves", hours: 1, addedInYear: 2081 },
            { slug: "internal-waves-sp-waves", title: "Internal waves: S and P-waves", hours: 1, addedInYear: 2081 },
            { slug: "gorkha-earthquake-2015", title: "Wave patterns of Gorkha Earthquake 2015", hours: 2, addedInYear: 2081 },
            { slug: "gravitational-wave", title: "Gravitational wave", hours: 1, addedInYear: 2081 },
            { slug: "nanotechnology", title: "Nanotechnology", hours: 1, addedInYear: 2081 },
            { slug: "higgs-boson", title: "Higgs Boson", hours: 1, addedInYear: 2081 },
          ],
        },
      ],
    },
  ],
};

export type PhysicsDataMap = {
  "class-11-notes": SubjectPhysicsData;
  "class-12-notes": SubjectPhysicsData;
};

export const PHYSICS_DATA_MAP: PhysicsDataMap = {
  "class-11-notes": PHYSICS_11_DATA,
  "class-12-notes": PHYSICS_12_DATA,
};
