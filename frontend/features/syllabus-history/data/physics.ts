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
      meaning?: string;
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
            { slug: "precision-significant-figures", title: "Precision and significant figures", hours: 2, meaning: "How to measure accurately and report the reliability of experimental data — essential for every physics lab and real-world measurement."},
            { slug: "dimensions-dimensional-analysis", title: "Dimensions and uses of dimensional analysis", hours: 1, meaning: "A tool to check equations and convert units by analysing physical quantities — a quick way to catch errors in calculations."},
          ],
        },
        {
          id: "vectors",
          title: "Vectors",
          hours: 4,
          topics: [
            { slug: "laws-of-vectors", title: "Triangle, parallelogram and polygon laws of vectors", hours: 1, meaning: "Methods to add and subtract vectors graphically — fundamental for resolving forces and understanding motion in two dimensions."},
            { slug: "resolution-unit-vectors", title: "Resolution of vectors; unit vectors", hours: 2, meaning: "Breaking vectors into components using unit vectors — the backbone of all 2D and 3D physics calculations."},
            { slug: "scalar-vector-products", title: "Scalar and vector products", hours: 1, meaning: "Dot and cross products help calculate work, torque, and angular quantities — key tools throughout mechanics and electromagnetism."},
          ],
        },
        {
          id: "kinematics",
          title: "Kinematics",
          hours: 5,
          topics: [
            { slug: "instantaneous-velocity-acceleration", title: "Instantaneous velocity and acceleration", hours: 1, meaning: "How fast and in what direction an object moves at any instant — the foundation for all motion analysis."},
            { slug: "relative-velocity", title: "Relative velocity", hours: 1, meaning: "Understanding motion from different reference frames — critical for navigation, traffic analysis, and orbital mechanics."},
            { slug: "equation-of-motion-graphical", title: "Equation of motion (graphical treatment)", hours: 1, meaning: "Deriving motion equations from velocity-time graphs — a visual way to understand uniformly accelerated motion."},
            { slug: "freely-falling-body", title: "Motion of a freely falling body", hours: 1, meaning: "How objects fall under gravity alone — basic to understanding projectile motion and planetary science."},
            { slug: "projectile-motion", title: "Projectile motion and its applications", hours: 1, meaning: "How objects move when thrown at an angle — crucial for sports, artillery, and understanding any trajectory in daily life."},
          ],
        },
        {
          id: "dynamics",
          title: "Dynamics",
          hours: 6,
          topics: [
            { slug: "linear-momentum-impulse", title: "Linear momentum, impulse", hours: 1, meaning: "How force applied over time changes motion — explains collisions, rocket propulsion, and safety design like airbags."},
            { slug: "conservation-linear-momentum", title: "Conservation of linear momentum", hours: 1, meaning: "In a closed system, total momentum never changes — the key principle behind collisions and explosions."},
            { slug: "newtons-laws-applications", title: "Application of Newton's laws", hours: 1, meaning: "Real-world use of F=ma to solve problems with pulleys, inclined planes, and connected bodies."},
            { slug: "torque-equilibrium", title: "Moment, torque and equilibrium", hours: 1, meaning: "How forces cause rotation and when objects stay balanced — essential for structural engineering and machine design."},
            { slug: "solid-friction", title: "Solid friction: laws of solid friction and their verifications", hours: 2, meaning: "Why objects resist sliding and how to calculate frictional forces — vital for vehicle braking, walking, and machinery."},
          ],
        },
        {
          id: "work-energy-and-power",
          title: "Work, Energy and Power",
          hours: 6,
          topics: [
            { slug: "work-constant-variable-force", title: "Work done by a constant force and a variable force", hours: 1, meaning: "How energy is transferred by forces — the bridge between forces and energy concepts in physics."},
            { slug: "power", title: "Power", hours: 1, meaning: "The rate of doing work — used to rate engines, appliances, and human effort in everyday terms."},
            { slug: "work-energy-theorem", title: "Work-energy theorem; kinetic and potential energy", hours: 1, meaning: "The link between work and energy change — a powerful shortcut for solving motion problems without dealing with forces directly."},
            { slug: "conservation-of-energy", title: "Conservation of energy", hours: 1, meaning: "Energy can neither be created nor destroyed — the most fundamental principle in all of physics."},
            { slug: "conservative-nonconservative-forces", title: "Conservative and non-conservative forces", hours: 1, meaning: "Understanding which forces conserve mechanical energy — crucial for analysing real systems with friction and air resistance."},
            { slug: "elastic-inelastic-collisions", title: "Elastic and inelastic collisions", hours: 1, meaning: "How objects bounce or stick together — explains car crashes, particle physics, and why crumple zones save lives."},
          ],
        },
        {
          id: "circular-motion",
          title: "Circular Motion",
          hours: 6,
          topics: [
            { slug: "angular-displacement-velocity-acceleration", title: "Angular displacement, velocity and acceleration", hours: 1, meaning: "Describing rotation using angle, angular speed, and angular acceleration — the language of spinning objects."},
            { slug: "angular-linear-relation", title: "Relation between angular and linear velocity and acceleration", hours: 1, meaning: "Connecting rotational and linear motion — how fast a point on a spinning wheel moves depends on its distance from the centre."},
            { slug: "centripetal-acceleration-force", title: "Centripetal acceleration and centripetal force", hours: 1, meaning: "The inward force needed to keep an object moving in a circle — explains orbits, banked roads, and spinning rides."},
            { slug: "conical-pendulum", title: "Conical pendulum", hours: 1, meaning: "A rotating pendulum tracing a cone — a classic example of circular motion with tension providing centripetal force."},
            { slug: "vertical-circle-motion", title: "Motion in a vertical circle", hours: 1, meaning: "How speed and tension vary as an object loops vertically — relevant to roller coasters and bucket-swirling demos."},
            { slug: "banking-applications", title: "Applications of banking", hours: 1, meaning: "Why roads and tracks are tilted on curves — banked turns let vehicles navigate corners safely without relying on friction alone."},
          ],
        },
        {
          id: "gravitation",
          title: "Gravitation",
          hours: 10,
          topics: [
            { slug: "newtons-law-gravitation", title: "Newton's law of gravitation", hours: 1, meaning: "Every mass attracts every other mass — the universal force that holds planets in orbit and keeps us on the ground."},
            { slug: "gravitational-field-strength", title: "Gravitational field strength", hours: 1, meaning: "The force per unit mass at a point in a gravitational field — tells you how strong gravity is anywhere near Earth or other bodies."},
            { slug: "gravitational-potential-energy", title: "Gravitational potential; gravitational potential energy", hours: 1, meaning: "Energy stored due to position in a gravitational field — essential for satellite missions and understanding energy conservation at large scales."},
            { slug: "variation-g-altitude-depth", title: "Variation in value of 'g' due to altitude and depth", hours: 1, meaning: "Gravity changes with height above and depth below Earth's surface — important for geophysics and precision measurements."},
            { slug: "centre-mass-gravity", title: "Centre of mass and centre of gravity", hours: 1, meaning: "The point where an object's entire weight can be considered to act — key to stability, balance, and orbital calculations."},
            { slug: "satellite-orbital-velocity", title: "Motion of a satellite: orbital velocity and time period of the satellite", hours: 2, meaning: "How fast a satellite must travel to stay in orbit — the principle behind GPS, weather satellites, and space stations."},
            { slug: "escape-velocity", title: "Escape velocity", hours: 1, meaning: "The minimum speed needed to break free from a planet's gravity — critical for space launches and interplanetary missions."},
            { slug: "satellite-energy", title: "Potential and kinetic energy of the satellite", hours: 1, meaning: "The energy balance of orbiting satellites — shows why lower orbits are faster and higher orbits require more total energy."},
            { slug: "geostationary-satellite", title: "Geostationary satellite", hours: 1, meaning: "A satellite that appears fixed above one point on Earth — the basis of television broadcasting and weather monitoring."},
            { slug: "gps", title: "GPS", hours: 1, meaning: "How satellite-based navigation works using precise timing and orbital mechanics — a daily technology used in phones, cars, and surveys."},
          ],
        },
        {
          id: "elasticity",
          title: "Elasticity",
          hours: 5,
          topics: [
            { slug: "hookes-law-force-constant", title: "Hooke's law: force constant", hours: 1, meaning: "Springs stretch proportionally to the force applied — the simplest model of elastic behaviour, used in everything from scales to shock absorbers."},
            { slug: "stress-strain-elasticity-plasticity", title: "Stress; strain; elasticity and plasticity", hours: 1, meaning: "How materials deform under load and whether they return to shape — fundamental for civil engineering and material selection."},
            { slug: "elastic-moduli", title: "Elastic modulus: Young modulus, bulk modulus, shear modulus", hours: 1, meaning: "Quantitative measures of material stiffness — essential for designing bridges, buildings, and any load-bearing structure."},
            { slug: "poissons-ratio", title: "Poisson's ratio", hours: 1, meaning: "How a material thins when stretched — important in engineering to predict how structures deform in multiple directions."},
            { slug: "elastic-potential-energy", title: "Elastic potential energy", hours: 1, meaning: "Energy stored in stretched or compressed materials — the principle behind spring mechanisms and energy absorption systems."},
          ],
        },
        {
          id: "heat-and-temperature",
          title: "Heat and Temperature",
          hours: 3,
          topics: [
            { slug: "thermal-energy-heat-temperature", title: "Molecular concept of thermal energy, heat and temperature; cause and direction of heat flow", hours: 1, meaning: "Heat is energy in transit due to temperature difference — the molecular view connects everyday warmth to atomic motion."},
            { slug: "thermal-equilibrium-zeroth-law", title: "Meaning of thermal equilibrium and Zeroth law of thermodynamics", hours: 1, meaning: "When two objects stop exchanging heat, they share the same temperature — the Zeroth law is the foundation of all temperature measurement."},
            { slug: "mercury-thermometer-principle", title: "Thermal equilibrium as a working principle of a mercury thermometer", hours: 1, meaning: "Thermometers work because they reach equilibrium with the object being measured — the same principle behind digital temp sensors."},
          ],
        },
        {
          id: "thermal-expansion",
          title: "Thermal Expansion",
          hours: 4,
          topics: [
            { slug: "linear-expansion", title: "Linear expansion and its measurement", hours: 1, meaning: "Materials expand when heated — engineers must account for this in bridges, railways, and building construction."},
            { slug: "cubical-superficial-expansion", title: "Cubical expansion, superficial expansion and their relation with linear expansion", hours: 1, meaning: "Expansion happens in all dimensions — understanding the relationships helps predict how objects change size with temperature."},
            { slug: "liquid-expansion", title: "Liquid expansion: absolute and apparent", hours: 1, meaning: "Liquids expand more than their containers — the distinction between absolute and apparent expansion is key to accurate thermometer calibration."},
            { slug: "dulong-petit-method", title: "Dulong and Petit method of determining expansivity of liquid", hours: 1, meaning: "A classical experiment to measure how much a liquid expands — demonstrates the practical measurement of thermal properties."},
          ],
        },
        {
          id: "quantity-of-heat",
          title: "Quantity of Heat",
          hours: 6,
          topics: [
            { slug: "newtons-law-cooling", title: "Newton's law of cooling", hours: 1 },
            { slug: "specific-heat-capacity", title: "Measurement of specific heat capacity of solids and liquids", hours: 1, meaning: "How much energy is needed to heat a material — explains why water heats slowly and metals heat quickly, relevant to cooking and climate."},
            { slug: "change-of-phases-latent-heat", title: "Change of phases: latent heat", hours: 1, meaning: "Energy absorbed or released during phase changes without temperature change — the reason sweating cools you and ice melts slowly."},
            { slug: "specific-latent-heat-fusion-vaporization", title: "Specific latent heat of fusion and vaporization", hours: 1, meaning: "The hidden energy behind melting and boiling — critical for refrigeration, steam engines, and weather systems."},
            { slug: "measurement-latent-heat", title: "Measurement of specific latent heat of fusion and vaporization", hours: 1, meaning: "Experimental determination of phase-change energies — a classic calorimetry experiment that connects theory to practice."},
            { slug: "triple-point", title: "Triple point", hours: 1, meaning: "The unique condition where solid, liquid, and gas coexist — water's triple point is used to define the Kelvin temperature scale."},
          ],
        },
        {
          id: "rate-of-heat-flow",
          title: "Rate of Heat Flow",
          hours: 5,
          topics: [
            { slug: "conduction-thermal-conductivity", title: "Conduction: thermal conductivity and measurement", hours: 2, meaning: "Heat transfers through solids by molecular collision — thermal conductivity determines insulation materials and heat sink design."},
            { slug: "convection", title: "Convection", hours: 1, meaning: "Heat moves through fluids by bulk motion — explains sea breezes, home heating, and why boiling water circulates."},
            { slug: "radiation-ideal-radiator", title: "Radiation: ideal radiator", hours: 1, meaning: "Heat can travel through vacuum as electromagnetic waves — ideal radiators (black bodies) set the standard for thermal emission."},
            { slug: "black-body-radiation", title: "Black-body radiation", hours: 1, meaning: "How perfect emitters radiate energy across wavelengths — this topic launched quantum mechanics and explains star temperatures."},
          ],
        },
        {
          id: "ideal-gas",
          title: "Ideal Gas",
          hours: 8,
          topics: [
            { slug: "ideal-gas-equation", title: "Ideal gas equation", hours: 1, meaning: "PV = nRT relates pressure, volume, and temperature of a gas — the foundational equation for understanding gases in engines, balloons, and the atmosphere."},
            { slug: "molecular-properties-matter", title: "Molecular properties of matter", hours: 1, meaning: "Understanding atoms and molecules helps explain gas behaviour, phase changes, and material properties at the microscopic level."},
            { slug: "kinetic-molecular-model", title: "Kinetic-molecular model of an ideal gas", hours: 1, meaning: "Gas pressure comes from molecular collisions — this model connects microscopic motion to macroscopic observables like pressure and temperature."},
            { slug: "derivation-pressure-gas", title: "Derivation of pressure exerted by gas", hours: 1, meaning: "Pressure can be derived from molecular collisions with container walls — a beautiful link between particle physics and thermodynamics."},
            { slug: "average-translational-kinetic-energy", title: "Average translational kinetic energy of gas molecule", hours: 1, meaning: "Temperature is a measure of average molecular kinetic energy — the deeper meaning behind what temperature actually is."},
            { slug: "boltzmann-constant-rms-speed", title: "Boltzmann constant, root mean square speed", hours: 1, meaning: "The RMS speed tells you how fast gas molecules move on average — explains diffusion, effusion, and why hydrogen escapes Earth's atmosphere."},
            { slug: "heat-capacities-gases-solids", title: "Heat capacities of gases and solids", hours: 2, meaning: "How much energy materials store when heated — Cp and Cv differences reveal molecular degrees of freedom and underpin engine efficiency."},
          ],
        },
        {
          id: "reflection-at-curved-mirror",
          title: "Reflection at Curved Mirror",
          hours: 2,
          topics: [
            { slug: "real-virtual-images", title: "Real and virtual images", hours: 1, meaning: "Real images can be projected on a screen; virtual images cannot — this distinction is key for cameras, mirrors, and eye vision."},
            { slug: "mirror-formula", title: "Mirror formula", hours: 1, meaning: "Relating object distance, image distance, and focal length — used to design telescopes, headlights, and shaving mirrors."},
          ],
        },
        {
          id: "refraction-at-plane-surfaces",
          title: "Refraction at Plane Surfaces",
          hours: 4,
          topics: [
            { slug: "laws-of-refraction", title: "Laws of refraction: refractive index", hours: 1, meaning: "Light bends when entering a new medium — refraction explains why straws look bent in water and how lenses work."},
            { slug: "relation-refractive-indices", title: "Relation between refractive indices", hours: 1, meaning: "Refractive indices relate to each other across media — essential for designing compound lenses and optical instruments."},
            { slug: "lateral-shift", title: "Lateral shift", hours: 1, meaning: "Light emerging from a glass slab is parallel but displaced — a simple demonstration of refraction with practical implications for thick lenses."},
            { slug: "total-internal-reflection", title: "Total internal reflection", hours: 1, meaning: "When light hits a boundary at a steep angle it reflects entirely back — the principle behind fibre optics and sparkling diamonds."},
          ],
        },
        {
          id: "refraction-through-prisms",
          title: "Refraction through Prisms",
          hours: 4,
          topics: [
            { slug: "minimum-deviation-condition", title: "Minimum deviation condition", hours: 1, meaning: "At a specific angle, a prism deviates light the least — this condition is used to accurately measure a material's refractive index."},
            { slug: "prism-minimum-deviation-refractive-index", title: "Relation between the angle of prism, minimum deviation and refractive index", hours: 2, meaning: "This formula links prism geometry to refractive index — a standard lab method for identifying materials by how they bend light."},
            { slug: "small-angle-prism-deviation", title: "Deviation in small-angle prism", hours: 1, meaning: "For thin prisms, deviation is approximately constant — a useful simplification in optical instrument design."},
          ],
        },
        {
          id: "lenses",
          title: "Lenses",
          hours: 3,
          topics: [
            { slug: "spherical-lenses-magnification", title: "Spherical lenses, angular magnification", hours: 1, meaning: "Lenses bend light to form images — magnification tells you how much larger or smaller the image appears compared to the object."},
            { slug: "lens-makers-formula", title: "Lens maker's formula", hours: 1, meaning: "This formula calculates focal length from lens material and curvature — the designer's tool for creating eyeglasses and camera lenses."},
            { slug: "power-of-lens", title: "Power of a lens", hours: 1, meaning: "Lens power in dioptres tells how strongly a lens converges or diverges light — the unit used by optometrists for prescription glasses."},
          ],
        },
        {
          id: "dispersion",
          title: "Dispersion",
          hours: 3,
          topics: [
            { slug: "pure-spectrum-dispersive-power", title: "Pure spectrum and dispersive power", hours: 1, meaning: "Prisms split white light into colours — dispersive power quantifies how well a material separates wavelengths, important for spectroscopy."},
            { slug: "chromatic-spherical-aberration", title: "Chromatic and spherical aberration", hours: 1, meaning: "Imperfections in lenses cause colour fringes and blurred edges — understanding these flaws is essential for designing sharp optical systems."},
            { slug: "achromatism-applications", title: "Achromatism and its applications", hours: 1, meaning: "Combining lenses to cancel colour dispersion — achromatic doublets are used in cameras, telescopes, and quality eyepieces."},
          ],
        },
        {
          id: "electric-charges",
          title: "Electric Charges",
          hours: 3,
          topics: [
            { slug: "electric-charges", title: "Electric charges", hours: 1, meaning: "Charge is a fundamental property of matter — understanding positive and negative charges explains static electricity and atomic structure."},
            { slug: "charging-by-induction", title: "Charging by induction", hours: 1, meaning: "Charging without direct contact — induction is how electrophorus generators and many sensors work in practice."},
            { slug: "coulombs-law", title: "Coulomb's law: force between two point charges", hours: 1, meaning: "The electric force between charges follows an inverse-square law — the electrical counterpart to Newton's gravitation, fundamental to all of electromagnetism."},
          ],
        },
        {
          id: "electric-field",
          title: "Electric Field",
          hours: 3,
          topics: [
            { slug: "electric-field-point-charges", title: "Electric field due to point charges; field lines", hours: 1, meaning: "Electric fields show the force a charge would feel at any point — field lines give a visual map of how charges interact."},
            { slug: "gauss-law", title: "Gauss law: electric flux", hours: 1, meaning: "Gauss's law relates electric flux through a surface to enclosed charge — a powerful tool for finding fields of symmetric charge distributions."},
            { slug: "gauss-law-applications", title: "Application of Gauss law: field of a charge sphere, line charge, charged plane conductor", hours: 1, meaning: "Using Gauss's law to find electric fields of spheres, wires, and sheets — demonstrates the power of symmetry in electrostatics."},
          ],
        },
        {
          id: "potential-potential-difference-and-potential-energy",
          title: "Potential, Potential Difference and Potential Energy",
          hours: 4,
          topics: [
            { slug: "potential-difference-point-charge", title: "Potential difference, potential due to a point charge, potential energy, electron volt", hours: 2, meaning: "Electric potential tells you the energy per unit charge at a point — the electron volt is the natural energy unit in atomic and nuclear physics."},
            { slug: "equipotential-lines-surfaces", title: "Equipotential lines and surfaces", hours: 1, meaning: "Points at the same electric potential form equipotential surfaces — no work is done moving along them, and they are always perpendicular to field lines."},
            { slug: "potential-gradient", title: "Potential gradient", hours: 1, meaning: "The rate of change of potential with distance gives the electric field strength — a direct link between potential and field concepts."},
          ],
        },
        {
          id: "capacitor",
          title: "Capacitor",
          hours: 5,
          topics: [
            { slug: "capacitance-capacitor", title: "Capacitance and capacitor", hours: 1, meaning: "Capacitors store charge and energy — they are everywhere in electronics, from phone circuits to power supplies."},
            { slug: "parallel-plate-capacitor", title: "Parallel plate capacitor", hours: 1, meaning: "The simplest capacitor design — two plates separated by a gap, forming the basis for understanding all capacitor geometries."},
            { slug: "combination-of-capacitors", title: "Combination of capacitors", hours: 1, meaning: "Capacitors in series and parallel combine like resistors but with inverted rules — essential for designing custom capacitance values in circuits."},
            { slug: "energy-charged-capacitor", title: "Energy of charged capacitor", hours: 1, meaning: "A charged capacitor stores energy in its electric field — this principle powers camera flashes, defibrillators, and backup power systems."},
            { slug: "dielectric-polarization", title: "Effect of a dielectric: polarization and displacement", hours: 1, meaning: "Inserting an insulating material between plates increases capacitance — dielectrics are key to miniaturising electronic components."},
          ],
        },
        {
          id: "dc-circuits",
          title: "DC Circuits",
          hours: 10,
          topics: [
            { slug: "electric-currents-drift-velocity", title: "Electric currents; drift velocity and its relation with current", hours: 1, meaning: "Electric current is the flow of charges — drift velocity shows how slowly individual electrons move, yet current flows almost instantly."},
            { slug: "ohms-law-resistance", title: "Ohm's law; electrical resistance; resistivity; conductivity", hours: 2, meaning: "V=IR is the cornerstone of circuit analysis — resistance and resistivity determine how materials conduct or resist electric current."},
            { slug: "current-voltage-relations", title: "Current-voltage relations; ohmic and non-ohmic resistance", hours: 1, meaning: "Not all materials obey Ohm's law — diodes and filaments are non-ohmic, and understanding this distinction is vital for circuit design."},
            { slug: "resistances-series-parallel", title: "Resistances in series and parallel", hours: 1, meaning: "Combining resistors in series and parallel is the first step in analysing any complex circuit — a skill used in every electronics project."},
            { slug: "potential-divider", title: "Potential divider", hours: 1, meaning: "A simple circuit that produces a fraction of the input voltage — used everywhere from sensor interfaces to biasing transistors."},
            { slug: "emf-internal-resistance", title: "Electromotive force of a source, internal resistance", hours: 2, meaning: "Real batteries have internal resistance that reduces terminal voltage — this explains why devices dim under heavy load and how cells combine."},
            { slug: "work-power-electrical-circuits", title: "Work and power in electrical circuits", hours: 2, meaning: "Electrical power (P=VI) determines energy costs and component ratings — essential for designing safe and efficient electrical systems."},
          ],
        },
        {
          id: "nuclear-physics",
          title: "Nuclear Physics",
          hours: 4,
          topics: [
            { slug: "nucleus-discovery", title: "Nucleus: discovery of nucleus", hours: 1, meaning: "Rutherford's gold foil experiment revealed the atom's tiny dense core — one of the most important discoveries in physics history."},
            { slug: "nuclear-density-mass-number", title: "Nuclear density; mass number; atomic number", hours: 1, meaning: "Nuclear density is extraordinarily high — all the mass of an atom is packed into a nucleus a hundred-thousandth the size of the atom."},
            { slug: "atomic-mass-isotopes", title: "Atomic mass; isotopes", hours: 1, meaning: "Isotopes are atoms of the same element with different neutron counts — they have identical chemistry but different nuclear properties, used in medicine and dating."},
            { slug: "einstein-mass-energy", title: "Einstein's mass-energy relation", hours: 1, meaning: "E=mc² shows mass and energy are interchangeable — this equation explains the enormous energy released in nuclear reactions."},
            { slug: "mass-defect-binding-energy", title: "Mass defect, packing fraction, binding energy per nucleon", hours: 1, meaning: "The mass defect reveals how tightly nuclei are bound — binding energy per nucleon explains why fusion and fission both release energy."},
            { slug: "creation-annihilation", title: "Creation and annihilation", hours: 1, meaning: "Matter and antimatter can be created from energy and annihilate back — pair production and annihilation demonstrate E=mc² in action."},
            { slug: "nuclear-fission-fusion", title: "Nuclear fission and fusion", hours: 1, meaning: "Fission splits heavy nuclei; fusion combines light ones — both release vast energy, powering nuclear reactors and stars respectively."},
          ],
        },
        {
          id: "solids",
          title: "Solids",
          hours: 3,
          topics: [
            { slug: "energy-bands-solid", title: "Energy bands in solids (qualitative ideas)", hours: 1, meaning: "Electrons in solids occupy energy bands — this quantum concept explains why some materials conduct electricity and others do not."},
            { slug: "metals-insulators-semiconductors", title: "Difference between metals, insulators and semiconductors using band theory", hours: 1, meaning: "Band theory classifies materials by their band gaps — this is the foundation of all modern electronics and solar cells."},
            { slug: "intrinsic-extrinsic-semiconductors", title: "Intrinsic and extrinsic semiconductors", hours: 1, meaning: "Pure semiconductors can be doped to create n-type or p-type materials — doping is how all transistors and integrated circuits are made."},
          ],
        },
        {
          id: "recent-trends-in-physics",
          title: "Recent Trends in Physics",
          hours: 6,
          topics: [
            { slug: "particle-physics", title: "Particle physics: particles and antiparticles, quarks (baryons and mesons) and leptons (neutrinos)", hours: 2, meaning: "The Standard Model classifies all known fundamental particles — understanding quarks and leptons reveals the building blocks of all matter."},
            { slug: "universe-big-bang", title: "Universe: Big Bang and Hubble law — expansion of the Universe", hours: 2, meaning: "The Universe is expanding from a hot dense beginning — Hubble's law provides the evidence and a timeline for cosmic evolution."},
            { slug: "dark-matter-black-holes-gravitational-waves", title: "Dark matter, black hole and gravitational wave", hours: 2, meaning: "These frontier topics reveal the unseen Universe — dark matter shapes galaxies, black holes warp spacetime, and gravitational waves let us hear cosmic events."},
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
            { slug: "precision-significant-figures", title: "Precision and significant figures", hours: 2, meaning: "How to measure accurately and report the reliability of experimental data — essential for every physics lab and real-world measurement."},
            { slug: "dimensions-dimensional-analysis", title: "Dimensions and uses of dimensional analysis", hours: 1, meaning: "A tool to check equations and convert units by analysing physical quantities — a quick way to catch errors in calculations."},
          ],
        },
        {
          id: "vectors",
          title: "Vectors",
          hours: 4,
          topics: [
            { slug: "laws-of-vectors", title: "Triangle, parallelogram and polygon laws of vectors", hours: 1, meaning: "Methods to add and subtract vectors graphically — fundamental for resolving forces and understanding motion in two dimensions."},
            { slug: "resolution-unit-vectors", title: "Resolution of vectors; unit vectors", hours: 2, meaning: "Breaking vectors into components using unit vectors — the backbone of all 2D and 3D physics calculations."},
            { slug: "scalar-vector-products", title: "Scalar and vector products", hours: 1, meaning: "Dot and cross products help calculate work, torque, and angular quantities — key tools throughout mechanics and electromagnetism."},
          ],
        },
        {
          id: "kinematics",
          title: "Kinematics",
          hours: 5,
          topics: [
            { slug: "instantaneous-velocity-acceleration", title: "Instantaneous velocity and acceleration", hours: 1, meaning: "How fast and in what direction an object moves at any instant — the foundation for all motion analysis."},
            { slug: "relative-velocity", title: "Relative velocity", hours: 1, meaning: "Understanding motion from different reference frames — critical for navigation, traffic analysis, and orbital mechanics."},
            { slug: "equation-of-motion-graphical", title: "Equation of motion (graphical treatment)", hours: 1, meaning: "Deriving motion equations from velocity-time graphs — a visual way to understand uniformly accelerated motion."},
            { slug: "freely-falling-body", title: "Motion of a freely falling body", hours: 1, meaning: "How objects fall under gravity alone — basic to understanding projectile motion and planetary science."},
            { slug: "projectile-motion", title: "Projectile motion and its applications", hours: 1, meaning: "How objects move when thrown at an angle — crucial for sports, artillery, and understanding any trajectory in daily life."},
          ],
        },
        {
          id: "dynamics",
          title: "Dynamics",
          hours: 6,
          topics: [
            { slug: "linear-momentum-impulse", title: "Linear momentum, impulse", hours: 1, meaning: "How force applied over time changes motion — explains collisions, rocket propulsion, and safety design like airbags."},
            { slug: "conservation-linear-momentum", title: "Conservation of linear momentum", hours: 1, meaning: "In a closed system, total momentum never changes — the key principle behind collisions and explosions."},
            { slug: "newtons-laws-applications", title: "Application of Newton's laws", hours: 1, meaning: "Real-world use of F=ma to solve problems with pulleys, inclined planes, and connected bodies."},
            { slug: "torque-equilibrium", title: "Moment, torque and equilibrium", hours: 1, meaning: "How forces cause rotation and when objects stay balanced — essential for structural engineering and machine design."},
            { slug: "solid-friction", title: "Solid friction: laws of solid friction and their verifications", hours: 2, meaning: "Why objects resist sliding and how to calculate frictional forces — vital for vehicle braking, walking, and machinery."},
          ],
        },
        {
          id: "work-energy-and-power",
          title: "Work, Energy and Power",
          hours: 6,
          topics: [
            { slug: "work-constant-variable-force", title: "Work done by a constant force and a variable force", hours: 1, meaning: "How energy is transferred by forces — the bridge between forces and energy concepts in physics."},
            { slug: "power", title: "Power", hours: 1, meaning: "The rate of doing work — used to rate engines, appliances, and human effort in everyday terms."},
            { slug: "work-energy-theorem", title: "Work-energy theorem; kinetic and potential energy", hours: 1, meaning: "The link between work and energy change — a powerful shortcut for solving motion problems without dealing with forces directly."},
            { slug: "conservation-of-energy", title: "Conservation of energy", hours: 1, meaning: "Energy can neither be created nor destroyed — the most fundamental principle in all of physics."},
            { slug: "conservative-nonconservative-forces", title: "Conservative and non-conservative forces", hours: 1, meaning: "Understanding which forces conserve mechanical energy — crucial for analysing real systems with friction and air resistance."},
            { slug: "elastic-inelastic-collisions", title: "Elastic and inelastic collisions", hours: 1, meaning: "How objects bounce or stick together — explains car crashes, particle physics, and why crumple zones save lives."},
          ],
        },
        {
          id: "circular-motion",
          title: "Circular Motion",
          hours: 6,
          topics: [
            { slug: "angular-displacement-velocity-acceleration", title: "Angular displacement, velocity and acceleration", hours: 1, meaning: "Describing rotation using angle, angular speed, and angular acceleration — the language of spinning objects."},
            { slug: "angular-linear-relation", title: "Relation between angular and linear velocity and acceleration", hours: 1, meaning: "Connecting rotational and linear motion — how fast a point on a spinning wheel moves depends on its distance from the centre."},
            { slug: "centripetal-acceleration-force", title: "Centripetal acceleration and centripetal force", hours: 1, meaning: "The inward force needed to keep an object moving in a circle — explains orbits, banked roads, and spinning rides."},
            { slug: "conical-pendulum", title: "Conical pendulum", hours: 1, meaning: "A rotating pendulum tracing a cone — a classic example of circular motion with tension providing centripetal force."},
            { slug: "vertical-circle-motion", title: "Motion in a vertical circle", hours: 1, meaning: "How speed and tension vary as an object loops vertically — relevant to roller coasters and bucket-swirling demos."},
            { slug: "banking-applications", title: "Applications of banking", hours: 1, meaning: "Why roads and tracks are tilted on curves — banked turns let vehicles navigate corners safely without relying on friction alone."},
          ],
        },
        {
          id: "gravitation",
          title: "Gravitation",
          hours: 10,
          topics: [
            { slug: "newtons-law-gravitation", title: "Newton's law of gravitation", hours: 1, meaning: "Every mass attracts every other mass — the universal force that holds planets in orbit and keeps us on the ground."},
            { slug: "gravitational-field-strength", title: "Gravitational field strength", hours: 1, meaning: "The force per unit mass at a point in a gravitational field — tells you how strong gravity is anywhere near Earth or other bodies."},
            { slug: "gravitational-potential-energy", title: "Gravitational potential; gravitational potential energy", hours: 1, meaning: "Energy stored due to position in a gravitational field — essential for satellite missions and understanding energy conservation at large scales."},
            { slug: "variation-g-altitude-depth", title: "Variation in value of 'g' due to altitude and depth", hours: 1, meaning: "Gravity changes with height above and depth below Earth's surface — important for geophysics and precision measurements."},
            { slug: "centre-mass-gravity", title: "Centre of mass and centre of gravity", hours: 1, meaning: "The point where an object's entire weight can be considered to act — key to stability, balance, and orbital calculations."},
            { slug: "satellite-orbital-velocity", title: "Motion of a satellite: orbital velocity and time period of the satellite", hours: 2, meaning: "How fast a satellite must travel to stay in orbit — the principle behind GPS, weather satellites, and space stations."},
            { slug: "escape-velocity", title: "Escape velocity", hours: 1, meaning: "The minimum speed needed to break free from a planet's gravity — critical for space launches and interplanetary missions."},
            { slug: "satellite-energy", title: "Potential and kinetic energy of the satellite", hours: 1, meaning: "The energy balance of orbiting satellites — shows why lower orbits are faster and higher orbits require more total energy."},
            { slug: "geostationary-satellite", title: "Geostationary satellite", hours: 1, meaning: "A satellite that appears fixed above one point on Earth — the basis of television broadcasting and weather monitoring."},
            { slug: "gps", title: "GPS", hours: 1, meaning: "How satellite-based navigation works using precise timing and orbital mechanics — a daily technology used in phones, cars, and surveys."},
          ],
        },
        {
          id: "elasticity",
          title: "Elasticity",
          hours: 5,
          topics: [
            { slug: "hookes-law-force-constant", title: "Hooke's law: force constant", hours: 1, meaning: "Springs stretch proportionally to the force applied — the simplest model of elastic behaviour, used in everything from scales to shock absorbers."},
            { slug: "stress-strain-elasticity-plasticity", title: "Stress; strain; elasticity and plasticity", hours: 1, meaning: "How materials deform under load and whether they return to shape — fundamental for civil engineering and material selection."},
            { slug: "elastic-moduli", title: "Elastic modulus: Young modulus, bulk modulus, shear modulus", hours: 1, meaning: "Quantitative measures of material stiffness — essential for designing bridges, buildings, and any load-bearing structure."},
            { slug: "poissons-ratio", title: "Poisson's ratio", hours: 1, meaning: "How a material thins when stretched — important in engineering to predict how structures deform in multiple directions."},
            { slug: "elastic-potential-energy", title: "Elastic potential energy", hours: 1, meaning: "Energy stored in stretched or compressed materials — the principle behind spring mechanisms and energy absorption systems."},
          ],
        },
        {
          id: "heat-and-temperature",
          title: "Heat and Temperature",
          hours: 3,
          topics: [
            { slug: "thermal-energy-heat-temperature", title: "Molecular concept of thermal energy, heat and temperature; cause and direction of heat flow", hours: 1, meaning: "Heat is energy in transit due to temperature difference — the molecular view connects everyday warmth to atomic motion."},
            { slug: "thermal-equilibrium-zeroth-law", title: "Meaning of thermal equilibrium and Zeroth law of thermodynamics", hours: 1, meaning: "When two objects stop exchanging heat, they share the same temperature — the Zeroth law is the foundation of all temperature measurement."},
            { slug: "mercury-thermometer-principle", title: "Thermal equilibrium as a working principle of a mercury thermometer", hours: 1, meaning: "Thermometers work because they reach equilibrium with the object being measured — the same principle behind digital temp sensors."},
          ],
        },
        {
          id: "thermal-expansion",
          title: "Thermal Expansion",
          hours: 4,
          topics: [
            { slug: "linear-expansion", title: "Linear expansion and its measurement", hours: 1, meaning: "Materials expand when heated — engineers must account for this in bridges, railways, and building construction."},
            { slug: "cubical-superficial-expansion", title: "Cubical expansion, superficial expansion and their relation with linear expansion", hours: 1, meaning: "Expansion happens in all dimensions — understanding the relationships helps predict how objects change size with temperature."},
            { slug: "liquid-expansion", title: "Liquid expansion: absolute and apparent", hours: 1, meaning: "Liquids expand more than their containers — the distinction between absolute and apparent expansion is key to accurate thermometer calibration."},
            { slug: "dulong-petit-method", title: "Dulong and Petit method of determining expansivity of liquid", hours: 1, meaning: "A classical experiment to measure how much a liquid expands — demonstrates the practical measurement of thermal properties."},
          ],
        },
        {
          id: "quantity-of-heat",
          title: "Quantity of Heat",
          hours: 6,
          topics: [
            { slug: "newtons-law-cooling", title: "Newton's law of cooling", hours: 1 },
            { slug: "specific-heat-capacity", title: "Measurement of specific heat capacity of solids and liquids", hours: 1, meaning: "How much energy is needed to heat a material — explains why water heats slowly and metals heat quickly, relevant to cooking and climate."},
            { slug: "change-of-phases-latent-heat", title: "Change of phases: latent heat", hours: 1, meaning: "Energy absorbed or released during phase changes without temperature change — the reason sweating cools you and ice melts slowly."},
            { slug: "specific-latent-heat-fusion-vaporization", title: "Specific latent heat of fusion and vaporization", hours: 1, meaning: "The hidden energy behind melting and boiling — critical for refrigeration, steam engines, and weather systems."},
            { slug: "measurement-latent-heat", title: "Measurement of specific latent heat of fusion and vaporization", hours: 1, meaning: "Experimental determination of phase-change energies — a classic calorimetry experiment that connects theory to practice."},
            { slug: "triple-point", title: "Triple point", hours: 1, meaning: "The unique condition where solid, liquid, and gas coexist — water's triple point is used to define the Kelvin temperature scale."},
          ],
        },
        {
          id: "rate-of-heat-flow",
          title: "Rate of Heat Flow",
          hours: 5,
          topics: [
            { slug: "conduction-thermal-conductivity", title: "Conduction: thermal conductivity and measurement", hours: 2, meaning: "Heat transfers through solids by molecular collision — thermal conductivity determines insulation materials and heat sink design."},
            { slug: "convection", title: "Convection", hours: 1, meaning: "Heat moves through fluids by bulk motion — explains sea breezes, home heating, and why boiling water circulates."},
            { slug: "radiation-ideal-radiator", title: "Radiation: ideal radiator", hours: 1, meaning: "Heat can travel through vacuum as electromagnetic waves — ideal radiators (black bodies) set the standard for thermal emission."},
            { slug: "black-body-radiation", title: "Black-body radiation", hours: 1, meaning: "How perfect emitters radiate energy across wavelengths — this topic launched quantum mechanics and explains star temperatures."},
          ],
        },
        {
          id: "ideal-gas",
          title: "Ideal Gas",
          hours: 8,
          topics: [
            { slug: "ideal-gas-equation", title: "Ideal gas equation", hours: 1, meaning: "PV = nRT relates pressure, volume, and temperature of a gas — the foundational equation for understanding gases in engines, balloons, and the atmosphere."},
            { slug: "molecular-properties-matter", title: "Molecular properties of matter", hours: 1, meaning: "Understanding atoms and molecules helps explain gas behaviour, phase changes, and material properties at the microscopic level."},
            { slug: "kinetic-molecular-model", title: "Kinetic-molecular model of an ideal gas", hours: 1, meaning: "Gas pressure comes from molecular collisions — this model connects microscopic motion to macroscopic observables like pressure and temperature."},
            { slug: "derivation-pressure-gas", title: "Derivation of pressure exerted by gas", hours: 1, meaning: "Pressure can be derived from molecular collisions with container walls — a beautiful link between particle physics and thermodynamics."},
            { slug: "average-translational-kinetic-energy", title: "Average translational kinetic energy of gas molecule", hours: 1, meaning: "Temperature is a measure of average molecular kinetic energy — the deeper meaning behind what temperature actually is."},
            { slug: "boltzmann-constant-rms-speed", title: "Boltzmann constant, root mean square speed", hours: 1, meaning: "The RMS speed tells you how fast gas molecules move on average — explains diffusion, effusion, and why hydrogen escapes Earth's atmosphere."},
            { slug: "heat-capacities-gases-solids", title: "Heat capacities of gases and solids", hours: 2, meaning: "How much energy materials store when heated — Cp and Cv differences reveal molecular degrees of freedom and underpin engine efficiency."},
          ],
        },
        {
          id: "reflection-at-curved-mirror",
          title: "Reflection at Curved Mirror",
          hours: 2,
          topics: [
            { slug: "real-virtual-images", title: "Real and virtual images", hours: 1, meaning: "Real images can be projected on a screen; virtual images cannot — this distinction is key for cameras, mirrors, and eye vision."},
            { slug: "mirror-formula", title: "Mirror formula", hours: 1, meaning: "Relating object distance, image distance, and focal length — used to design telescopes, headlights, and shaving mirrors."},
          ],
        },
        {
          id: "refraction-at-plane-surfaces",
          title: "Refraction at Plane Surfaces",
          hours: 4,
          topics: [
            { slug: "laws-of-refraction", title: "Laws of refraction: refractive index", hours: 1, meaning: "Light bends when entering a new medium — refraction explains why straws look bent in water and how lenses work."},
            { slug: "relation-refractive-indices", title: "Relation between refractive indices", hours: 1, meaning: "Refractive indices relate to each other across media — essential for designing compound lenses and optical instruments."},
            { slug: "lateral-shift", title: "Lateral shift", hours: 1, meaning: "Light emerging from a glass slab is parallel but displaced — a simple demonstration of refraction with practical implications for thick lenses."},
            { slug: "total-internal-reflection", title: "Total internal reflection", hours: 1, meaning: "When light hits a boundary at a steep angle it reflects entirely back — the principle behind fibre optics and sparkling diamonds."},
          ],
        },
        {
          id: "refraction-through-prisms",
          title: "Refraction through Prisms",
          hours: 3,
          topics: [
            { slug: "minimum-deviation-condition", title: "Minimum deviation condition", hours: 1, meaning: "At a specific angle, a prism deviates light the least — this condition is used to accurately measure a material's refractive index."},
            { slug: "prism-minimum-deviation-refractive-index", title: "Relation between the angle of prism, minimum deviation and refractive index", hours: 1, meaning: "This formula links prism geometry to refractive index — a standard lab method for identifying materials by how they bend light."},
            { slug: "small-angle-prism-deviation", title: "Deviation in small-angle prism", hours: 1, meaning: "For thin prisms, deviation is approximately constant — a useful simplification in optical instrument design."},
          ],
        },
        {
          id: "lenses",
          title: "Lenses",
          hours: 3,
          topics: [
            { slug: "spherical-lenses-magnification", title: "Spherical lenses, angular magnification", hours: 1, meaning: "Lenses bend light to form images — magnification tells you how much larger or smaller the image appears compared to the object."},
            { slug: "lens-makers-formula", title: "Lens maker's formula", hours: 1, meaning: "This formula calculates focal length from lens material and curvature — the designer's tool for creating eyeglasses and camera lenses."},
            { slug: "power-of-lens", title: "Power of a lens", hours: 1, meaning: "Lens power in dioptres tells how strongly a lens converges or diverges light — the unit used by optometrists for prescription glasses."},
          ],
        },
        {
          id: "dispersion",
          title: "Dispersion",
          hours: 3,
          topics: [
            { slug: "pure-spectrum-dispersive-power", title: "Pure spectrum and dispersive power", hours: 1, meaning: "Prisms split white light into colours — dispersive power quantifies how well a material separates wavelengths, important for spectroscopy."},
            { slug: "chromatic-spherical-aberration", title: "Chromatic and spherical aberration", hours: 1, meaning: "Imperfections in lenses cause colour fringes and blurred edges — understanding these flaws is essential for designing sharp optical systems."},
            { slug: "achromatism-applications", title: "Achromatism and its applications", hours: 1, meaning: "Combining lenses to cancel colour dispersion — achromatic doublets are used in cameras, telescopes, and quality eyepieces."},
          ],
        },
        {
          id: "electric-charges",
          title: "Electric Charges",
          hours: 3,
          topics: [
            { slug: "electric-charges", title: "Electric charges", hours: 1, meaning: "Charge is a fundamental property of matter — understanding positive and negative charges explains static electricity and atomic structure."},
            { slug: "charging-by-induction", title: "Charging by induction", hours: 1, meaning: "Charging without direct contact — induction is how electrophorus generators and many sensors work in practice."},
            { slug: "coulombs-law", title: "Coulomb's law: force between two point charges", hours: 1, meaning: "The electric force between charges follows an inverse-square law — the electrical counterpart to Newton's gravitation, fundamental to all of electromagnetism."},
          ],
        },
        {
          id: "electric-field",
          title: "Electric Field",
          hours: 3,
          topics: [
            { slug: "electric-field-point-charges", title: "Electric field due to point charges; field lines", hours: 1, meaning: "Electric fields show the force a charge would feel at any point — field lines give a visual map of how charges interact."},
            { slug: "gauss-law", title: "Gauss law: electric flux", hours: 1, meaning: "Gauss's law relates electric flux through a surface to enclosed charge — a powerful tool for finding fields of symmetric charge distributions."},
            { slug: "gauss-law-applications", title: "Application of Gauss law: field of a charge sphere, line charge, charged plane conductor", hours: 1, meaning: "Using Gauss's law to find electric fields of spheres, wires, and sheets — demonstrates the power of symmetry in electrostatics."},
          ],
        },
        {
          id: "potential-potential-difference-and-potential-energy",
          title: "Potential, Potential Difference and Potential Energy",
          hours: 4,
          topics: [
            { slug: "potential-difference-point-charge", title: "Potential difference, potential due to a point charge, potential energy, electron volt", hours: 2, meaning: "Electric potential tells you the energy per unit charge at a point — the electron volt is the natural energy unit in atomic and nuclear physics."},
            { slug: "equipotential-lines-surfaces", title: "Equipotential lines and surfaces", hours: 1, meaning: "Points at the same electric potential form equipotential surfaces — no work is done moving along them, and they are always perpendicular to field lines."},
            { slug: "potential-gradient", title: "Potential gradient", hours: 1, meaning: "The rate of change of potential with distance gives the electric field strength — a direct link between potential and field concepts."},
          ],
        },
        {
          id: "capacitor",
          title: "Capacitor",
          hours: 7,
          topics: [
            { slug: "capacitance-capacitor", title: "Capacitance and capacitor", hours: 1, meaning: "Capacitors store charge and energy — they are everywhere in electronics, from phone circuits to power supplies."},
            { slug: "parallel-plate-capacitor", title: "Parallel plate capacitor", hours: 2, meaning: "The simplest capacitor design — two plates separated by a gap, forming the basis for understanding all capacitor geometries."},
            { slug: "combination-of-capacitors", title: "Combination of capacitors", hours: 1, meaning: "Capacitors in series and parallel combine like resistors but with inverted rules — essential for designing custom capacitance values in circuits."},
            { slug: "energy-charged-capacitor", title: "Energy of charged capacitor", hours: 1, meaning: "A charged capacitor stores energy in its electric field — this principle powers camera flashes, defibrillators, and backup power systems."},
            { slug: "dielectric-polarization", title: "Effect of a dielectric: polarization and displacement", hours: 2, meaning: "Inserting an insulating material between plates increases capacitance — dielectrics are key to miniaturising electronic components."},
          ],
        },
        {
          id: "dc-circuits",
          title: "DC Circuits",
          hours: 10,
          topics: [
            { slug: "electric-currents-drift-velocity", title: "Electric currents; drift velocity and its relation with current", hours: 1, meaning: "Electric current is the flow of charges — drift velocity shows how slowly individual electrons move, yet current flows almost instantly."},
            { slug: "ohms-law-resistance", title: "Ohm's law; electrical resistance; resistivity; conductivity", hours: 2, meaning: "V=IR is the cornerstone of circuit analysis — resistance and resistivity determine how materials conduct or resist electric current."},
            { slug: "current-voltage-relations", title: "Current-voltage relations; ohmic and non-ohmic resistance", hours: 1, meaning: "Not all materials obey Ohm's law — diodes and filaments are non-ohmic, and understanding this distinction is vital for circuit design."},
            { slug: "resistances-series-parallel", title: "Resistances in series and parallel", hours: 1, meaning: "Combining resistors in series and parallel is the first step in analysing any complex circuit — a skill used in every electronics project."},
            { slug: "potential-divider", title: "Potential divider", hours: 1, meaning: "A simple circuit that produces a fraction of the input voltage — used everywhere from sensor interfaces to biasing transistors."},
            { slug: "emf-internal-resistance", title: "Electromotive force of a source, internal resistance", hours: 2, meaning: "Real batteries have internal resistance that reduces terminal voltage — this explains why devices dim under heavy load and how cells combine."},
            { slug: "work-power-electrical-circuits", title: "Work and power in electrical circuits", hours: 2, meaning: "Electrical power (P=VI) determines energy costs and component ratings — essential for designing safe and efficient electrical systems."},
          ],
        },
        {
          id: "nuclear-physics",
          title: "Nuclear Physics",
          hours: 6,
          topics: [
            { slug: "nucleus-discovery", title: "Nucleus: discovery, nuclear density, mass number, atomic number", hours: 1, meaning: "Rutherford's gold foil experiment revealed the atom's tiny dense core — one of the most important discoveries in physics history."},
            { slug: "atomic-mass-isotopes", title: "Atomic mass and isotopes", hours: 1, meaning: "Isotopes are atoms of the same element with different neutron counts — they have identical chemistry but different nuclear properties, used in medicine and dating."},
            { slug: "einstein-mass-energy", title: "Einstein's mass-energy relation", hours: 1, meaning: "E=mc² shows mass and energy are interchangeable — this equation explains the enormous energy released in nuclear reactions."},
            { slug: "mass-defect-binding-energy", title: "Mass defect, packing fraction, BE per nucleon", hours: 1, meaning: "The mass defect reveals how tightly nuclei are bound — binding energy per nucleon explains why fusion and fission both release energy."},
            { slug: "creation-annihilation", title: "Creation and annihilation", hours: 1, meaning: "Matter and antimatter can be created from energy and annihilate back — pair production and annihilation demonstrate E=mc² in action."},
            { slug: "nuclear-fission-fusion", title: "Nuclear fission and fusion; energy released", hours: 2, meaning: "Fission splits heavy nuclei; fusion combines light ones — both release vast energy, powering nuclear reactors and stars respectively."},
          ],
        },
        {
          id: "solids",
          title: "Solids",
          hours: 3,
          topics: [
            { slug: "energy-bands-solid", title: "Energy bands in solids (qualitative ideas)", hours: 1, meaning: "Electrons in solids occupy energy bands — this quantum concept explains why some materials conduct electricity and others do not."},
            { slug: "metals-insulators-semiconductors", title: "Difference between metals, insulators and semiconductors using band theory", hours: 1, meaning: "Band theory classifies materials by their band gaps — this is the foundation of all modern electronics and solar cells."},
            { slug: "intrinsic-extrinsic-semiconductors", title: "Intrinsic and extrinsic semiconductors", hours: 1, meaning: "Pure semiconductors can be doped to create n-type or p-type materials — doping is how all transistors and integrated circuits are made."},
          ],
        },
        {
          id: "recent-trends-in-physics",
          title: "Recent Trends in Physics",
          hours: 6,
          topics: [
            { slug: "particle-physics", title: "Particle physics: particles & antiparticles, quarks (baryons & mesons), leptons (neutrinos)", hours: 2, meaning: "The Standard Model classifies all known fundamental particles — understanding quarks and leptons reveals the building blocks of all matter."},
            { slug: "universe-big-bang", title: "Universe: Big Bang and Hubble's law — expansion of the Universe", hours: 2, meaning: "The Universe is expanding from a hot dense beginning — Hubble's law provides the evidence and a timeline for cosmic evolution."},
            { slug: "dark-matter-black-holes-gravitational-waves", title: "Dark matter, black hole and gravitational waves", hours: 2, meaning: "These frontier topics reveal the unseen Universe — dark matter shapes galaxies, black holes warp spacetime, and gravitational waves let us hear cosmic events."},
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
            { slug: "coulombs-law-applications", title: "Coulomb's law and its applications", hours: 2, meaning: "The electric force between charges follows an inverse-square law — its applications range from atomic structure to lightning and electrostatic precipitators."},
            { slug: "electric-field-intensity", title: "Electric field and electric field intensity due to point charges, line charges, and charged sheets", hours: 3, meaning: "Electric field intensity tells you the force per unit charge at a point — essential for designing capacitors, particle accelerators, and insulating systems."},
            { slug: "electric-potential", title: "Electric potential and potential difference", hours: 2, meaning: "Electric potential tells you the energy per unit charge at a point — a scalar quantity that simplifies analysing complex charge distributions."},
            { slug: "capacitance-capacitors", title: "Capacitance and capacitors — parallel plate, series and parallel combination", hours: 2, meaning: "Capacitors store charge and energy — parallel plate, series, and parallel combinations are foundational for all electronic circuits."},
            { slug: "dielectric-constant", title: "Dielectric and dielectric constant", hours: 1, meaning: "Dielectrics increase capacitance and reduce electric fields — the dielectric constant quantifies this effect and is crucial for capacitor design."},
          ],
        },
        {
          id: "current-electricity",
          title: "Current Electricity",
          hours: 10,
          topics: [
            { slug: "electric-current-drift-velocity", title: "Electric current, drift velocity, and relaxation time", hours: 2, meaning: "Electric current is the flow of charges — drift velocity shows how slowly individual electrons move, yet current flows almost instantly."},
            { slug: "ohms-law-limitations", title: "Ohm's law and its limitations", hours: 1, meaning: "Ohm's law works for ohmic conductors but fails for semiconductors and diodes — knowing its limits prevents misapplication in circuit analysis."},
            { slug: "resistance-resistivity", title: "Resistance and resistivity — temperature dependence", hours: 1, meaning: "Resistance and resistivity determine how materials oppose current — temperature dependence explains why wires heat up and resistors are used as sensors."},
            { slug: "series-parallel-resistors", title: "Series and parallel combination of resistors", hours: 1, meaning: "Combining resistors in series and parallel is the first step in analysing any complex circuit — a skill used in every electronics project."},
            { slug: "kirchhoffs-laws", title: "Kirchhoff's laws and their applications", hours: 2, meaning: "Kirchhoff's laws conserve charge and energy in circuits — they are the systematic tool for analysing any network of resistors and sources."},
            { slug: "emf-internal-resistance", title: "Electromotive force (emf), internal resistance, and cells in combination", hours: 1, meaning: "Real batteries have internal resistance that reduces terminal voltage — this explains why devices dim under heavy load and how cells combine."},
            { slug: "wheatstone-meter-bridge", title: "Wheatstone bridge and meter bridge", hours: 2, meaning: "Bridge circuits measure unknown resistance precisely — the Wheatstone and meter bridge are classic lab tools for resistance determination."},
            { slug: "potentiometer", title: "Potentiometer and its applications", hours: 2, meaning: "A potentiometer measures emf and internal resistance without drawing current — it is more accurate than a voltmeter for comparing cells."},
          ],
        },
        {
          id: "magnetism-and-magnetic-effect",
          title: "Magnetism and Magnetic Effect of Current",
          hours: 12,
          topics: [
            { slug: "magnetic-field-force-moving-charges", title: "Magnetic field and magnetic force on moving charges", hours: 2, meaning: "Moving charges experience magnetic force — this principle powers motors, CRT displays, and particle detectors."},
            { slug: "lorentz-force", title: "Lorentz force and motion of charged particles in magnetic fields", hours: 2, meaning: "The Lorentz force combines electric and magnetic forces on a charge — it explains cyclotron motion and the deflection of charged particles."},
            { slug: "biot-savart-law", title: "Biot-Savart law and its applications (straight wire, circular loop, solenoid)", hours: 2, meaning: "Biot-Savart law calculates magnetic fields from current elements — it is the magnetic equivalent of Coulomb's law for electric fields."},
            { slug: "amperes-circuital-law", title: "Ampere's circuital law and its applications", hours: 2, meaning: "Ampere's law relates magnetic field around a loop to the current it encloses — a powerful symmetry-based tool for finding fields of wires and solenoids."},
            { slug: "force-parallel-conductors", title: "Force between two parallel current-carrying conductors", hours: 2, meaning: "Parallel current-carrying wires attract or repel — this force defines the ampere and explains why high-current busbars need mechanical support."},
            { slug: "moving-coil-galvanometer", title: "Moving coil galvanometer, ammeter, and voltmeter", hours: 2, meaning: "A galvanometer detects small currents using magnetic torque — converting it to an ammeter or voltmeter is the basis of all analog measurement instruments."},
          ],
        },
        {
          id: "electromagnetic-induction",
          title: "Electromagnetic Induction",
          hours: 8,
          topics: [
            { slug: "faradays-laws", title: "Faraday's laws of electromagnetic induction", hours: 2, meaning: "Faraday's laws state that changing magnetic flux induces EMF — this is the principle behind generators, transformers, and induction cooktops."},
            { slug: "lenzs-law", title: "Lenz's law and conservation of energy", hours: 1, meaning: "Lenz's law says induced current opposes the change that created it — it is a statement of energy conservation in electromagnetic induction."},
            { slug: "self-induction", title: "Self-induction and self-inductance", hours: 2, meaning: "Self-induction is the property of a coil to oppose changes in its own current — inductors store energy in magnetic fields and are essential in filters and power supplies."},
            { slug: "mutual-induction", title: "Mutual induction and mutual inductance", hours: 2, meaning: "Mutual induction is the induction of EMF in one coil by another — it is the operating principle of transformers and wireless charging."},
            { slug: "lr-circuits", title: "Growing and decaying current in LR circuits", hours: 1, meaning: "LR circuits show exponential growth and decay of current — they model how inductors respond to switching and are used in time-delay and filtering applications."},
          ],
        },
        {
          id: "alternating-current",
          title: "Alternating Current",
          hours: 8,
          topics: [
            { slug: "ac-voltage-resistor-inductor-capacitor", title: "AC voltage applied to resistor, inductor, and capacitor", hours: 2, meaning: "AC through R, L, and C components reveals phase differences — resistors, inductors, and capacitors each respond differently to alternating current."},
            { slug: "lc-oscillations-resonance", title: "LC oscillations and resonance", hours: 2, meaning: "LC circuits oscillate at a natural frequency — resonance in LC circuits is the basis of radio tuning and signal filtering."},
            { slug: "lcr-series-circuit", title: "LCR series circuit and power factor", hours: 2, meaning: "Series LCR circuits exhibit resonance and power factor effects — understanding them is essential for power transmission and AC circuit design."},
            { slug: "transformer", title: "Transformer — principle, types, and losses", hours: 2, meaning: "Transformers change AC voltage levels using mutual induction — they make long-distance power transmission efficient and safe for household use."},
          ],
        },
        {
          id: "ray-optics",
          title: "Ray Optics",
          hours: 10,
          topics: [
            { slug: "reflection-plane-curved", title: "Reflection at plane and curved surfaces — mirrors", hours: 2, meaning: "Mirrors form images by reflecting light — plane mirrors give virtual images while curved mirrors can produce real or virtual images depending on object position."},
            { slug: "refraction-plane-surfaces", title: "Refraction at plane surfaces — total internal reflection", hours: 2, meaning: "Light bends at interfaces between media — total internal reflection at plane surfaces enables fibre optics and explains mirages."},
            { slug: "refraction-prisms", title: "Refraction through prisms — angle of deviation and minimum deviation", hours: 2, meaning: "Prisms bend and disperse light — the angle of deviation and minimum deviation help identify materials and design optical instruments."},
            { slug: "thin-lenses", title: "Thin lenses — lens maker's formula and power of lens", hours: 2, meaning: "Thin lenses focus or diverge light — the lens maker's formula and power of lens are essential for designing eyeglasses, cameras, and microscopes."},
            { slug: "combination-lenses-mirrors", title: "Combination of lenses and mirrors", hours: 1, meaning: "Combining lenses and mirrors creates complex optical systems — this is the principle behind telescopes, binoculars, and camera lenses."},
            { slug: "optical-instruments", title: "Optical instruments — microscope and telescope", hours: 1, meaning: "Microscopes and telescopes use lens combinations to magnify distant or tiny objects — they are among the most important instruments in science and medicine."},
          ],
        },
        {
          id: "wave-optics",
          title: "Wave Optics",
          hours: 8,
          topics: [
            { slug: "wavefront-huygens", title: "Wavefront and Huygens' principle", hours: 2, meaning: "Huygens' principle treats every point on a wavefront as a source of secondary wavelets — it provides a geometric way to derive reflection and refraction laws."},
            { slug: "interference-light", title: "Interference of light — Young's double slit experiment", hours: 2, meaning: "Interference of light produces bright and dark fringes — Young's double slit experiment demonstrates the wave nature of light and is used in precision measurements."},
            { slug: "diffraction-light", title: "Diffraction of light — single slit diffraction", hours: 2, meaning: "Diffraction spreads light when it passes through narrow openings — single slit diffraction reveals the wave nature of light and limits the resolution of optical instruments."},
            { slug: "polarization", title: "Polarization — Brewster's law and polaroids", hours: 2, meaning: "Polarization shows light is a transverse wave — Brewster's law and polaroids are used in sunglasses, photography, and LCD screens."},
          ],
        },
        {
          id: "modern-physics",
          title: "Modern Physics",
          hours: 12,
          topics: [
            { slug: "photoelectric-effect", title: "Photoelectric effect and Einstein's photoelectric equation", hours: 2, meaning: "Light ejects electrons from metals — Einstein's equation explained this particle nature of light and earned him the Nobel Prize."},
            { slug: "de-broglie-wavelength", title: "De Broglie wavelength and matter waves", hours: 2, meaning: "Matter has wave-like properties — de Broglie's hypothesis unified particle and wave behaviour and led to quantum mechanics."},
            { slug: "bohr-model-hydrogen", title: "Atom — Bohr's model and hydrogen spectrum", hours: 2, meaning: "Bohr's model explains hydrogen spectrum using quantised orbits — it was the bridge between classical physics and quantum mechanics."},
            { slug: "nucleus-binding-energy", title: "Nucleus — binding energy, nuclear fission and fusion", hours: 2, meaning: "Nuclear binding energy explains why nuclei stay together — fission and fusion release energy by moving toward more tightly bound configurations."},
            { slug: "semiconductors", title: "Semiconductors — intrinsic and extrinsic, p-n junction, diode, transistor", hours: 2, meaning: "Semiconductors control current flow — p-n junctions, diodes, and transistors form the building blocks of all modern electronics."},
            { slug: "logic-gates", title: "Logic gates — AND, OR, NOT, NAND, NOR", hours: 2, meaning: "Logic gates implement Boolean operations with electronic circuits — AND, OR, NOT, NAND, and NOR gates are the foundation of all digital computing."},
          ],
        },
        {
          id: "communication-systems",
          title: "Communication Systems",
          hours: 4,
          topics: [
            { slug: "elements-communication-system", title: "Elements of a communication system", hours: 1, meaning: "A communication system transmits information from source to receiver — understanding its elements is the first step towards modern telecommunications."},
            { slug: "modulation", title: "Modulation — amplitude modulation and frequency modulation", hours: 2, meaning: "Modulation encodes information onto carrier waves — AM and FM are used in radio broadcasting, while digital modulation powers mobile phones and WiFi."},
            { slug: "bandwidth-propagation", title: "Bandwidth and propagation of electromagnetic waves", hours: 1, meaning: "Bandwidth determines how much information can be transmitted — propagation modes (ground, sky, space) explain how signals reach different distances."},
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
            { slug: "coulombs-law-applications", title: "Coulomb's law and its applications", hours: 2, meaning: "The electric force between charges follows an inverse-square law — its applications range from atomic structure to lightning and electrostatic precipitators."},
            { slug: "electric-field-intensity", title: "Electric field and electric field intensity due to point charges, line charges, and charged sheets", hours: 3, meaning: "Electric field intensity tells you the force per unit charge at a point — essential for designing capacitors, particle accelerators, and insulating systems."},
            { slug: "electric-potential", title: "Electric potential and potential difference", hours: 2, meaning: "Electric potential tells you the energy per unit charge at a point — a scalar quantity that simplifies analysing complex charge distributions."},
            { slug: "capacitance-capacitors", title: "Capacitance and capacitors — parallel plate, series and parallel combination", hours: 2, meaning: "Capacitors store charge and energy — parallel plate, series, and parallel combinations are foundational for all electronic circuits."},
            { slug: "dielectric-constant", title: "Dielectric and dielectric constant", hours: 1, meaning: "Dielectrics increase capacitance and reduce electric fields — the dielectric constant quantifies this effect and is crucial for capacitor design."},
          ],
        },
        {
          id: "current-electricity",
          title: "Current Electricity",
          hours: 10,
          topics: [
            { slug: "electric-current-drift-velocity", title: "Electric current, drift velocity, and relaxation time", hours: 2, meaning: "Electric current is the flow of charges — drift velocity shows how slowly individual electrons move, yet current flows almost instantly."},
            { slug: "ohms-law-limitations", title: "Ohm's law and its limitations", hours: 1, meaning: "Ohm's law works for ohmic conductors but fails for semiconductors and diodes — knowing its limits prevents misapplication in circuit analysis."},
            { slug: "resistance-resistivity", title: "Resistance and resistivity — temperature dependence", hours: 1, meaning: "Resistance and resistivity determine how materials oppose current — temperature dependence explains why wires heat up and resistors are used as sensors."},
            { slug: "series-parallel-resistors", title: "Series and parallel combination of resistors", hours: 1, meaning: "Combining resistors in series and parallel is the first step in analysing any complex circuit — a skill used in every electronics project."},
            { slug: "kirchhoffs-laws", title: "Kirchhoff's laws and their applications", hours: 2, meaning: "Kirchhoff's laws conserve charge and energy in circuits — they are the systematic tool for analysing any network of resistors and sources."},
            { slug: "emf-internal-resistance", title: "Electromotive force (emf), internal resistance, and cells in combination", hours: 1, meaning: "Real batteries have internal resistance that reduces terminal voltage — this explains why devices dim under heavy load and how cells combine."},
            { slug: "wheatstone-meter-bridge", title: "Wheatstone bridge and meter bridge", hours: 2, meaning: "Bridge circuits measure unknown resistance precisely — the Wheatstone and meter bridge are classic lab tools for resistance determination."},
            { slug: "potentiometer", title: "Potentiometer and its applications", hours: 2, meaning: "A potentiometer measures emf and internal resistance without drawing current — it is more accurate than a voltmeter for comparing cells."},
          ],
        },
        {
          id: "magnetism-and-magnetic-effect",
          title: "Magnetism and Magnetic Effect of Current",
          hours: 12,
          topics: [
            { slug: "magnetic-field-force-moving-charges", title: "Magnetic field and magnetic force on moving charges", hours: 2, meaning: "Moving charges experience magnetic force — this principle powers motors, CRT displays, and particle detectors."},
            { slug: "lorentz-force", title: "Lorentz force and motion of charged particles in magnetic fields", hours: 2, meaning: "The Lorentz force combines electric and magnetic forces on a charge — it explains cyclotron motion and the deflection of charged particles."},
            { slug: "biot-savart-law", title: "Biot-Savart law and its applications (straight wire, circular loop, solenoid)", hours: 2, meaning: "Biot-Savart law calculates magnetic fields from current elements — it is the magnetic equivalent of Coulomb's law for electric fields."},
            { slug: "amperes-circuital-law", title: "Ampere's circuital law and its applications", hours: 2, meaning: "Ampere's law relates magnetic field around a loop to the current it encloses — a powerful symmetry-based tool for finding fields of wires and solenoids."},
            { slug: "force-parallel-conductors", title: "Force between two parallel current-carrying conductors", hours: 2, meaning: "Parallel current-carrying wires attract or repel — this force defines the ampere and explains why high-current busbars need mechanical support."},
            { slug: "moving-coil-galvanometer", title: "Moving coil galvanometer, ammeter, and voltmeter", hours: 2, meaning: "A galvanometer detects small currents using magnetic torque — converting it to an ammeter or voltmeter is the basis of all analog measurement instruments."},
          ],
        },
        {
          id: "electromagnetic-induction",
          title: "Electromagnetic Induction",
          hours: 8,
          topics: [
            { slug: "faradays-laws", title: "Faraday's laws of electromagnetic induction", hours: 2, meaning: "Faraday's laws state that changing magnetic flux induces EMF — this is the principle behind generators, transformers, and induction cooktops."},
            { slug: "lenzs-law", title: "Lenz's law and conservation of energy", hours: 1, meaning: "Lenz's law says induced current opposes the change that created it — it is a statement of energy conservation in electromagnetic induction."},
            { slug: "self-induction", title: "Self-induction and self-inductance", hours: 2, meaning: "Self-induction is the property of a coil to oppose changes in its own current — inductors store energy in magnetic fields and are essential in filters and power supplies."},
            { slug: "mutual-induction", title: "Mutual induction and mutual inductance", hours: 2, meaning: "Mutual induction is the induction of EMF in one coil by another — it is the operating principle of transformers and wireless charging."},
            { slug: "lr-circuits", title: "Growing and decaying current in LR circuits", hours: 1, meaning: "LR circuits show exponential growth and decay of current — they model how inductors respond to switching and are used in time-delay and filtering applications."},
          ],
        },
        {
          id: "alternating-current",
          title: "Alternating Current",
          hours: 8,
          topics: [
            { slug: "ac-voltage-resistor-inductor-capacitor", title: "AC voltage applied to resistor, inductor, and capacitor", hours: 2, meaning: "AC through R, L, and C components reveals phase differences — resistors, inductors, and capacitors each respond differently to alternating current."},
            { slug: "lc-oscillations-resonance", title: "LC oscillations and resonance", hours: 2, meaning: "LC circuits oscillate at a natural frequency — resonance in LC circuits is the basis of radio tuning and signal filtering."},
            { slug: "lcr-series-circuit", title: "LCR series circuit and power factor", hours: 2, meaning: "Series LCR circuits exhibit resonance and power factor effects — understanding them is essential for power transmission and AC circuit design."},
            { slug: "transformer", title: "Transformer — principle, types, and losses", hours: 2, meaning: "Transformers change AC voltage levels using mutual induction — they make long-distance power transmission efficient and safe for household use."},
          ],
        },
        {
          id: "ray-optics",
          title: "Ray Optics",
          hours: 10,
          topics: [
            { slug: "reflection-plane-curved", title: "Reflection at plane and curved surfaces — mirrors", hours: 2, meaning: "Mirrors form images by reflecting light — plane mirrors give virtual images while curved mirrors can produce real or virtual images depending on object position."},
            { slug: "refraction-plane-surfaces", title: "Refraction at plane surfaces — total internal reflection", hours: 2, meaning: "Light bends at interfaces between media — total internal reflection at plane surfaces enables fibre optics and explains mirages."},
            { slug: "refraction-prisms", title: "Refraction through prisms — angle of deviation and minimum deviation", hours: 2, meaning: "Prisms bend and disperse light — the angle of deviation and minimum deviation help identify materials and design optical instruments."},
            { slug: "thin-lenses", title: "Thin lenses — lens maker's formula and power of lens", hours: 2, meaning: "Thin lenses focus or diverge light — the lens maker's formula and power of lens are essential for designing eyeglasses, cameras, and microscopes."},
            { slug: "combination-lenses-mirrors", title: "Combination of lenses and mirrors", hours: 1, meaning: "Combining lenses and mirrors creates complex optical systems — this is the principle behind telescopes, binoculars, and camera lenses."},
            { slug: "optical-instruments", title: "Optical instruments — microscope and telescope", hours: 1, meaning: "Microscopes and telescopes use lens combinations to magnify distant or tiny objects — they are among the most important instruments in science and medicine."},
          ],
        },
        {
          id: "wave-optics",
          title: "Wave Optics",
          hours: 8,
          topics: [
            { slug: "wavefront-huygens", title: "Wavefront and Huygens' principle", hours: 2, meaning: "Huygens' principle treats every point on a wavefront as a source of secondary wavelets — it provides a geometric way to derive reflection and refraction laws."},
            { slug: "interference-light", title: "Interference of light — Young's double slit experiment", hours: 2, meaning: "Interference of light produces bright and dark fringes — Young's double slit experiment demonstrates the wave nature of light and is used in precision measurements."},
            { slug: "diffraction-light", title: "Diffraction of light — single slit diffraction", hours: 2, meaning: "Diffraction spreads light when it passes through narrow openings — single slit diffraction reveals the wave nature of light and limits the resolution of optical instruments."},
            { slug: "polarization", title: "Polarization — Brewster's law and polaroids", hours: 2, meaning: "Polarization shows light is a transverse wave — Brewster's law and polaroids are used in sunglasses, photography, and LCD screens."},
          ],
        },
        {
          id: "modern-physics",
          title: "Modern Physics",
          hours: 12,
          topics: [
            { slug: "photoelectric-effect", title: "Photoelectric effect and Einstein's photoelectric equation", hours: 2, meaning: "Light ejects electrons from metals — Einstein's equation explained this particle nature of light and earned him the Nobel Prize."},
            { slug: "de-broglie-wavelength", title: "De Broglie wavelength and matter waves", hours: 2, meaning: "Matter has wave-like properties — de Broglie's hypothesis unified particle and wave behaviour and led to quantum mechanics."},
            { slug: "bohr-model-hydrogen", title: "Atom — Bohr's model and hydrogen spectrum", hours: 2, meaning: "Bohr's model explains hydrogen spectrum using quantised orbits — it was the bridge between classical physics and quantum mechanics."},
            { slug: "nucleus-binding-energy", title: "Nucleus — binding energy, nuclear fission and fusion", hours: 2, meaning: "Nuclear binding energy explains why nuclei stay together — fission and fusion release energy by moving toward more tightly bound configurations."},
            { slug: "semiconductors", title: "Semiconductors — intrinsic and extrinsic, p-n junction, diode, transistor", hours: 2, meaning: "Semiconductors control current flow — p-n junctions, diodes, and transistors form the building blocks of all modern electronics."},
            { slug: "logic-gates", title: "Logic gates — AND, OR, NOT, NAND, NOR", hours: 2, meaning: "Logic gates implement Boolean operations with electronic circuits — AND, OR, NOT, NAND, and NOR gates are the foundation of all digital computing."},
          ],
        },
        {
          id: "communication-systems",
          title: "Communication Systems",
          hours: 4,
          topics: [
            { slug: "elements-communication-system", title: "Elements of a communication system", hours: 1, meaning: "A communication system transmits information from source to receiver — understanding its elements is the first step towards modern telecommunications."},
            { slug: "modulation", title: "Modulation — amplitude modulation and frequency modulation", hours: 2, meaning: "Modulation encodes information onto carrier waves — AM and FM are used in radio broadcasting, while digital modulation powers mobile phones and WiFi."},
            { slug: "bandwidth-propagation", title: "Bandwidth and propagation of electromagnetic waves", hours: 1, meaning: "Bandwidth determines how much information can be transmitted — propagation modes (ground, sky, space) explain how signals reach different distances."},
          ],
        },
        {
          id: "rotational-dynamics",
          title: "Rotational Dynamics",
          hours: 8,
          topics: [
            { slug: "angular-motion-equations", title: "Equation of angular motion; relation between linear and angular kinematics", hours: 2, meaning: "Rotational kinematics uses angular equivalents of linear motion equations — they describe spinning objects from flywheels to planetary rotation."},
            { slug: "rotational-kinetic-energy", title: "Kinetic energy of rotation of rigid body", hours: 1, meaning: "Rotating bodies possess kinetic energy based on their moment of inertia — this energy is stored in flywheels and must be accounted for in rotating machinery."},
            { slug: "moment-inertia-radius-gyration", title: "Moment of inertia; radius of gyration", hours: 2, meaning: "Moment of inertia measures resistance to rotational acceleration — it depends on mass distribution, not just total mass."},
            { slug: "moment-inertia-rod", title: "Moment of inertia of a uniform rod", hours: 1, meaning: "The moment of inertia of a uniform rod depends on the axis of rotation — calculating it for standard shapes is a fundamental skill in rotational dynamics."},
            { slug: "torque-angular-acceleration", title: "Torque and angular acceleration for a rigid body", hours: 1, meaning: "Torque causes angular acceleration just as force causes linear acceleration — Newton's second law for rotation is τ = Iα."},
            { slug: "angular-momentum-conservation", title: "Angular momentum and conservation of angular momentum", hours: 1, meaning: "Angular momentum is conserved in the absence of external torque — this explains ice skater spins, planetary orbits, and gyroscope stability."},
          ],
        },
        {
          id: "periodic-motion",
          title: "Periodic Motion",
          hours: 7,
          topics: [
            { slug: "shm-equation", title: "Equation of simple harmonic motion (SHM)", hours: 2, meaning: "Simple harmonic motion describes oscillations where restoring force is proportional to displacement — it models springs, pendulums, and molecular vibrations."},
            { slug: "energy-shm", title: "Energy in SHM", hours: 1, meaning: "Energy in SHM constantly converts between kinetic and potential — the total energy remains constant and is proportional to the square of amplitude."},
            { slug: "shm-applications", title: "Application of SHM: vertical oscillation of mass on spring", hours: 1, meaning: "Vertical spring-mass oscillators are a practical example of SHM — they illustrate how period depends on mass and spring constant, not amplitude."},
            { slug: "angular-shm-pendulum", title: "Angular SHM and simple pendulum", hours: 1, meaning: "A pendulum executes angular SHM for small angles — its period depends only on length and gravity, making it useful for timekeeping and measuring g."},
            { slug: "damped-forced-resonance", title: "Damped oscillation, forced oscillation and resonance", hours: 2, meaning: "Damping reduces oscillation amplitude while forcing can drive resonance — understanding these effects is critical for avoiding structural failures and designing vibrations isolators."},
          ],
        },
        {
          id: "fluid-statics",
          title: "Fluid Statics",
          hours: 8,
          topics: [
            { slug: "fluid-statics-pressure-buoyancy", title: "Fluid statics: pressure in a fluid and buoyancy", hours: 2, meaning: "Fluid pressure increases with depth and buoyancy explains why objects float — these principles govern ship design, hydraulics, and atmospheric pressure."},
            { slug: "surface-tension", title: "Surface tension: theory, surface energy, angle of contact, capillarity", hours: 2, meaning: "Surface tension makes liquid surfaces behave like stretched membranes — it explains capillary action, droplet formation, and why insects walk on water."},
            { slug: "viscosity-poiseuilles-stokes", title: "Newton's formula for viscosity; coefficient of viscosity; Poiseuille's formula and Stokes law and their applications", hours: 2, meaning: "Viscosity resists fluid flow — Poiseuille's and Stokes' laws quantify flow through tubes and drag on spheres, relevant to blood flow and lubrication."},
            { slug: "continuity-bernoulli", title: "Equation of continuity and its applications; Bernoulli's equation and its applications", hours: 2, meaning: "Continuity and Bernoulli's equations describe fluid flow — they explain airplane lift, venturi meters, and why fast-moving fluids have lower pressure."},
          ],
        },
        {
          id: "first-law-thermodynamics",
          title: "First Law of Thermodynamics",
          hours: 7,
          topics: [
            { slug: "thermodynamic-systems-work", title: "Thermodynamic systems; work done during volume change", hours: 2, meaning: "Thermodynamic systems exchange energy as heat and work — understanding work during volume change is the foundation of heat engine analysis."},
            { slug: "first-law-formulation", title: "Heat, work, internal energy and First law of thermodynamics", hours: 2, meaning: "The First law is energy conservation for thermal systems — it relates heat, work, and internal energy change, governing all thermal processes."},
            { slug: "thermodynamic-processes", title: "Thermodynamic processes: adiabatic, isochoric, isothermal, isobaric", hours: 2, meaning: "Isothermal, adiabatic, isochoric, and isobaric processes describe how gases change state — each process has distinct heat and work characteristics."},
            { slug: "heat-capacities-gas", title: "Heat capacities of ideal gas at constant pressure and volume; isothermal and adiabatic processes for an ideal gas", hours: 1, meaning: "Cp and Cv differ because gases do work when expanding at constant pressure — their ratio reveals molecular degrees of freedom and is key to engine cycle analysis."},
          ],
        },
        {
          id: "second-law-thermodynamics",
          title: "Second Law of Thermodynamics",
          hours: 6,
          topics: [
            { slug: "direction-thermodynamic-processes", title: "Thermodynamic systems and direction of thermodynamic processes", hours: 1, meaning: "Heat naturally flows from hot to cold — the First law allows reverse flow but the Second law forbids it without external work, defining the arrow of time."},
            { slug: "second-law-statement", title: "Second law of thermodynamics", hours: 1, meaning: "The Second law has multiple equivalent statements — Kelvin-Planck and Clausius formulations both express the impossibility of perfect heat-to-work conversion."},
            { slug: "heat-engines-cycles", title: "Heat engines; internal combustion engines: Otto cycle, Diesel cycle, Carnot cycle", hours: 2, meaning: "Heat engines convert thermal energy to work — Otto, Diesel, and Carnot cycles model real engines and set the theoretical efficiency limit."},
            { slug: "refrigerator-entropy", title: "Refrigerator; entropy and disorder (introduction)", hours: 2, meaning: "Refrigerators move heat from cold to hot using work — entropy quantifies disorder and the Second law's constraint on all energy conversions."},
          ],
        },
        {
          id: "wave-motion",
          title: "Wave Motion",
          hours: 5,
          topics: [
            { slug: "progressive-waves", title: "Progressive waves", hours: 2, meaning: "Progressive waves transport energy through a medium without transporting matter — understanding wave propagation is essential for acoustics, seismology, and communications."},
            { slug: "mathematical-description-wave", title: "Mathematical description of a wave", hours: 2, meaning: "The wave equation y = A sin(kx - ωt) describes progressive waves mathematically — its parameters encode amplitude, wavelength, frequency, and speed."},
            { slug: "stationary-waves", title: "Stationary waves", hours: 1, meaning: "Stationary waves form from interfering waves travelling in opposite directions — they explain musical instrument tones and resonant cavities."},
          ],
        },
        {
          id: "mechanical-waves",
          title: "Mechanical Waves",
          hours: 5,
          topics: [
            { slug: "speed-wave-motion", title: "Speed of wave motion; velocity of sound in solid and liquid", hours: 2, meaning: "Sound speed depends on the medium's properties — it is fastest in solids, slower in liquids, and slowest in gases, with implications for sonar and materials testing."},
            { slug: "velocity-sound-gas-laplace", title: "Velocity of sound in gas; Laplace's correction", hours: 1, meaning: "Laplace corrected Newton's formula by accounting for adiabatic compression — the corrected formula matches experimental sound speed in gases."},
            { slug: "factors-sound-velocity", title: "Effect of temperature, pressure and humidity on velocity of sound", hours: 2, meaning: "Temperature, pressure, and humidity affect sound speed — these dependencies matter for acoustics, meteorology, and ultrasonic measurements."},
          ],
        },
        {
          id: "wave-pipes-strings",
          title: "Wave in Pipes and Strings",
          hours: 5,
          topics: [
            { slug: "stationary-waves-pipes", title: "Stationary waves in closed and open pipes", hours: 2, meaning: "Organ pipes support stationary sound waves at specific frequencies — open and closed pipes produce different harmonic series used in musical instruments."},
            { slug: "harmonics-overtones", title: "Harmonics and overtones in closed and open organ pipes; end correction in pipes", hours: 2, meaning: "Harmonics and overtones define the timbre of musical instruments — end correction accounts for the fact that antinodes form slightly outside the pipe opening."},
            { slug: "vibration-strings", title: "Velocity of transverse waves along a stretched string; vibration of string and overtones; laws of vibration of fixed string", hours: 1, meaning: "Stretched strings produce stationary waves at specific frequencies — the laws of vibration explain guitar tuning, piano string design, and bridge engineering."},
          ],
        },
        {
          id: "acoustic-phenomena",
          title: "Acoustic Phenomena",
          hours: 4,
          topics: [
            { slug: "sound-waves-pressure-amplitude", title: "Sound waves: pressure amplitude", hours: 1, meaning: "Sound waves are longitudinal pressure variations — pressure amplitude relates to loudness and is the measurable quantity in acoustic instrumentation."},
            { slug: "characteristics-sound", title: "Characteristics of sound: intensity, loudness, quality and pitch", hours: 2, meaning: "Intensity, loudness, quality, and pitch characterise sound — these properties determine how we perceive and distinguish different musical notes and voices."},
            { slug: "doppler-effect", title: "Doppler's effect", hours: 1, meaning: "The Doppler effect shifts frequency when source or observer moves — it explains ambulance siren pitch changes and is used in radar speed guns and astronomical redshift."},
          ],
        },
        {
          id: "nature-propagation-light",
          title: "Nature and Propagation of Light",
          hours: 4,
          topics: [
            { slug: "huygens-principle", title: "Huygens' principle", hours: 2, meaning: "Huygens' principle treats every wavefront point as a source of secondary wavelets — it provides a geometric derivation of reflection and refraction."},
            { slug: "reflection-refraction-wave-theory", title: "Reflection and refraction according to wave theory", hours: 2, meaning: "Wave theory explains reflection and refraction without ray approximations — it shows how wavefronts change direction at boundaries consistently with Snell's law."},
          ],
        },
        {
          id: "interference",
          title: "Interference",
          hours: 5,
          topics: [
            { slug: "interference-coherent-sources", title: "Phenomenon of interference: coherent sources", hours: 2, meaning: "Coherent sources produce stable interference patterns — coherence is essential for applications from holography to interferometric gravitational wave detection."},
            { slug: "youngs-double-slit", title: "Young's double slit experiment", hours: 3, meaning: "Young's double slit experiment is the definitive proof of light's wave nature — the fringe pattern reveals wavelength and is used in precision metrology."},
          ],
        },
        {
          id: "diffraction",
          title: "Diffraction",
          hours: 5,
          topics: [
            { slug: "diffraction-single-slit", title: "Diffraction from a single slit", hours: 2, meaning: "Single slit diffraction produces a central bright fringe with weaker side fringes — the pattern width reveals the wavelength and slit width relationship."},
            { slug: "diffraction-pattern-image", title: "Diffraction pattern of image; diffraction grating", hours: 2, meaning: "Diffraction gratings separate light into spectra — they are used in spectrometers for chemical analysis and in defining the metre via wavelength standards."},
            { slug: "resolving-power", title: "Resolving power of optical instruments", hours: 1, meaning: "Resolving power determines the detail an optical instrument can reveal — diffraction limits the resolution of microscopes and telescopes."},
          ],
        },
        {
          id: "polarization",
          title: "Polarization",
          hours: 4,
          topics: [
            { slug: "polarization-phenomenon", title: "Phenomenon of polarization", hours: 1, meaning: "Polarization occurs only for transverse waves — the phenomenon confirms light is transverse and enables technologies from 3D movies to stress analysis."},
            { slug: "brewsters-law", title: "Brewster's law; transverse nature of light", hours: 2, meaning: "Brewster's law gives the angle at which reflected light is completely polarized — it is used in polarizing filters and anti-glare coatings."},
            { slug: "polaroid", title: "Polaroid", hours: 1, meaning: "Polaroid sheets transmit only one polarization direction — they are used in sunglasses, LCD displays, and photographic filters to reduce glare."},
          ],
        },
        {
          id: "electrical-circuits",
          title: "Electrical Circuits",
          hours: 8,
          topics: [
            { slug: "kirchhoffs-law-detailed", title: "Kirchhoff's law", hours: 1, meaning: "Kirchhoff's laws are systematic tools for analysing complex circuits — they enforce conservation of charge and energy at every junction and loop."},
            { slug: "wheatstone-bridge-meter-bridge-12", title: "Wheatstone bridge circuit and meter bridge", hours: 2, meaning: "Bridge circuits measure unknown resistance with high precision — the meter bridge is a simple laboratory version using a uniform wire."},
            { slug: "potentiometer-12", title: "Potentiometer: comparison of emf, measurement of internal resistance", hours: 2, meaning: "Potentiometers compare EMFs and measure internal resistance without drawing current — they are more accurate than voltmeters for cell characterization."},
            { slug: "superconductors", title: "Superconductors and perfect conductors", hours: 1, meaning: "Superconductors exhibit zero electrical resistance below a critical temperature — they enable powerful electromagnets for MRI machines and particle accelerators."},
            { slug: "galvanometer-conversions", title: "Conversion of galvanometer into voltmeter, ammeter; ohmmeter", hours: 1, meaning: "Converting a galvanometer to an ammeter or voltmeter requires adding shunt or multiplier resistances — this is how analog measuring instruments are built."},
            { slug: "joules-law", title: "Joule's law", hours: 1, meaning: "Joule's law quantifies heat produced by current in a resistor — it explains why heaters work and why power transmission losses occur as I²R heating."},
          ],
        },
        {
          id: "thermoelectric-effects",
          title: "Thermoelectric Effects",
          hours: 4,
          topics: [
            { slug: "seebeck-effect", title: "Seebeck effect and thermocouples", hours: 2, meaning: "The Seebeck effect generates voltage from a temperature difference — thermocouples use this for temperature measurement in industrial and scientific applications."},
            { slug: "peltier-effect", title: "Peltier effect; variation of thermoelectric emf with temperature; thermopile", hours: 2, meaning: "The Peltier effect causes heating or cooling at a junction of two metals — it is used in solid-state refrigerators and CPU cooling devices."},
          ],
        },
        {
          id: "magnetic-field",
          title: "Magnetic Field",
          hours: 10,
          topics: [
            { slug: "magnetic-field-lines-flux", title: "Magnetic field lines and magnetic flux; Oersted's experiment", hours: 1, meaning: "Magnetic field lines visualise the direction and strength of magnetic fields — magnetic flux quantifies how much field passes through a surface, key to induction."},
            { slug: "force-moving-charge-conductor", title: "Force on moving charge; force on a conductor", hours: 2, meaning: "Moving charges and current-carrying conductors experience magnetic forces — these forces are the operating principle of electric motors and loudspeakers."},
            { slug: "force-torque-coil", title: "Force and torque on rectangular coil; moving coil galvanometer", hours: 2, meaning: "A current-carrying coil in a magnetic field experiences torque — this is the working principle of the moving coil galvanometer and electric motors."},
            { slug: "hall-effect", title: "Hall effect; magnetic field of a moving charge", hours: 1, meaning: "The Hall effect produces a voltage across a conductor in a magnetic field — it is used to measure magnetic fields and determine whether a semiconductor is n-type or p-type."},
            { slug: "biot-savart-law-12", title: "Biot and Savart law (circular coil, straight conductor, solenoid)", hours: 2, meaning: "Biot-Savart law calculates magnetic fields from arbitrary current distributions — its applications to coils, wires, and solenoids are standard tools in electromagnetism."},
            { slug: "amperes-law-applications-12", title: "Ampere's law and its applications", hours: 1, meaning: "Ampere's law with symmetric current distributions quickly gives magnetic fields — it is the magnetic analogue of Gauss's law and essential for solenoid and toroid analysis."},
            { slug: "force-parallel-conductors-12", title: "Force between two parallel current-carrying conductors; definition of ampere", hours: 1, meaning: "Parallel current-carrying conductors exert forces on each other — this defines the ampere and is critical for designing power transmission lines and busbars."},
          ],
        },
        {
          id: "magnetic-properties-materials",
          title: "Magnetic Properties of Materials",
          hours: 4,
          topics: [
            { slug: "flux-density-permeability-susceptibility", title: "Flux density in magnetic material; relative permeability; susceptibility", hours: 2, meaning: "Magnetic flux density, permeability, and susceptibility describe how materials respond to magnetic fields — these quantities classify materials and guide transformer core design."},
            { slug: "hysteresis", title: "Hysteresis", hours: 1, meaning: "Hysteresis means a material's magnetisation lags behind the applied field — hysteresis loss in transformer cores wastes energy as heat and determines magnetic material selection."},
            { slug: "dia-para-ferro-magnetic", title: "Dia-, para- and ferro-magnetic materials", hours: 1, meaning: "Diamagnetic, paramagnetic, and ferromagnetic materials respond differently to magnetic fields — understanding these behaviours is essential for magnetic storage and medical imaging."},
          ],
        },
        {
          id: "electromagnetic-induction-12",
          title: "Electromagnetic Induction",
          hours: 8,
          topics: [
            { slug: "faradays-laws-detailed", title: "Faraday's laws; induced electric fields", hours: 2, meaning: "Faraday's detailed laws quantify induced EMF from changing flux — they govern the design of every generator, transformer, and induction sensor."},
            { slug: "lenzs-law-detailed", title: "Lenz's law; motional electromotive force", hours: 2, meaning: "Lenz's law with motional EMF explains induced currents in moving conductors — it ensures energy conservation in all electromagnetic induction phenomena."},
            { slug: "ac-generators-eddy-currents", title: "A.C. generators and eddy currents", hours: 1, meaning: "AC generators convert mechanical energy to electrical energy using electromagnetic induction — eddy currents are unwanted circulating currents that cause energy loss in cores."},
            { slug: "self-mutual-inductance", title: "Self-inductance and mutual inductance", hours: 2, meaning: "Self and mutual inductance quantify how coils oppose current change and couple energy — they are the basis of transformers, inductors, and wireless power transfer."},
            { slug: "energy-inductor-transformer", title: "Energy stored in an inductor; transformer", hours: 1, meaning: "Inductors store energy in magnetic fields and transformers transfer energy between circuits — understanding both is essential for power electronics and communications."},
          ],
        },
        {
          id: "alternating-currents",
          title: "Alternating Currents",
          hours: 8,
          topics: [
            { slug: "peak-rms-values", title: "Peak and rms value of AC current and voltage", hours: 2, meaning: "Peak and RMS values relate the maximum and effective values of AC quantities — RMS values allow AC circuits to be analysed using the same power formulas as DC."},
            { slug: "ac-resistor-capacitor-inductor", title: "AC through a resistor, a capacitor and an inductor", hours: 2, meaning: "In AC circuits, resistors, capacitors, and inductors each impose different phase shifts — these phase relationships determine impedance and power factor."},
            { slug: "phasor-diagram", title: "Phasor diagram", hours: 1, meaning: "Phasor diagrams represent AC quantities as rotating vectors — they simplify the analysis of phase relationships in AC circuits with multiple components."},
            { slug: "series-lcr-resonance", title: "Series circuits with resistance, capacitance and inductance; series resonance and quality factor", hours: 2, meaning: "Series LCR resonance occurs when inductive and capacitive reactances cancel — at resonance, current is maximum and power factor is unity, a principle used in tuning circuits."},
            { slug: "power-ac-circuits", title: "Power in AC circuits and power factor", hours: 1, meaning: "Power in AC circuits depends on the power factor cos φ — reactive components store and release energy without dissipation, reducing useful power transfer."},
          ],
        },
        {
          id: "electrons",
          title: "Electrons",
          hours: 5,
          topics: [
            { slug: "millikan-oil-drop", title: "Millikan's oil drop experiment", hours: 2, meaning: "Millikan's oil drop experiment measured the elementary charge — it proved charge is quantised and determined the value of e with remarkable precision."},
            { slug: "electron-beam-fields", title: "Motion of electron beam in electric and magnetic fields", hours: 2, meaning: "Electron beams are deflected by electric and magnetic fields — this principle powers cathode ray tubes, electron microscopes, and mass spectrometers."},
            { slug: "thomson-experiment", title: "Thomson's experiment to determine specific charge of electrons", hours: 1, meaning: "Thomson's e/m experiment determined the charge-to-mass ratio of the electron — it was the first measurement proving electrons are fundamental subatomic particles."},
          ],
        },
        {
          id: "photons",
          title: "Photons",
          hours: 5,
          topics: [
            { slug: "quantum-nature-radiation", title: "Quantum nature of radiation", hours: 2, meaning: "Radiation exhibits both wave and particle properties — the quantum nature of light explains phenomena like the photoelectric effect that classical wave theory cannot."},
            { slug: "photoelectric-equation-stopping-potential", title: "Einstein's photoelectric equation; stopping potential", hours: 2, meaning: "Einstein's photoelectric equation relates photon energy to electron kinetic energy — stopping potential directly measures the maximum electron energy and confirms quantisation."},
            { slug: "plancks-constant-measurement", title: "Measurement of Planck's constant", hours: 1, meaning: "Planck's constant can be measured using the photoelectric effect — this fundamental constant bridges classical and quantum physics and appears in every quantum formula."},
          ],
        },
        {
          id: "semiconductor-devices",
          title: "Semiconductor Devices",
          hours: 6,
          topics: [
            { slug: "pn-junction", title: "P-N junction", hours: 2, meaning: "A p-n junction allows current to flow in one direction only — this rectifying behaviour is the foundation of diodes, solar cells, and all semiconductor devices."},
            { slug: "semiconductor-diode-characteristics", title: "Semiconductor diode: characteristics in forward and reverse bias", hours: 2, meaning: "Diode I-V characteristics show exponential forward conduction and breakdown in reverse bias — these curves are used to design rectifiers, clippers, and voltage regulators."},
            { slug: "full-wave-rectification", title: "Full wave rectification", hours: 1, meaning: "Full wave rectifiers convert both half-cycles of AC to pulsating DC — they are more efficient than half-wave rectifiers and are used in all power supplies."},
            { slug: "logic-gates-12", title: "Logic gates: NOT, OR, AND, NAND and NOR", hours: 1, meaning: "Logic gates are the building blocks of digital circuits — NAND and NOR gates are universal, meaning any Boolean function can be built from them alone."},
          ],
        },
        {
          id: "quantization-of-energy",
          title: "Quantization of Energy",
          hours: 7,
          topics: [
            { slug: "bohr-theory-hydrogen", title: "Bohr's theory of hydrogen atom", hours: 2, meaning: "Bohr's theory quantises electron orbits in hydrogen — it successfully predicts the Rydberg formula and spectral series, marking the birth of quantum theory."},
            { slug: "spectral-series", title: "Spectral series; excitation and ionization potentials", hours: 2, meaning: "Hydrogen spectral series (Lyman, Balmer, Paschen) arise from electron transitions between quantised levels — each series corresponds to transitions ending at a specific energy level."},
            { slug: "de-broglie-duality", title: "De Broglie theory and wave-particle duality; uncertainty principle", hours: 2, meaning: "De Broglie's wave-particle duality and Heisenberg's uncertainty principle are cornerstones of quantum mechanics — they define the limits of classical intuition at atomic scales."},
            { slug: "x-rays", title: "X-rays: nature, production, uses and diffraction; Bragg's law", hours: 1, meaning: "X-rays are high-energy electromagnetic waves produced by electron deceleration or inner-shell transitions — Bragg's law enables X-ray crystallography, revealing atomic structures."},
          ],
        },
        {
          id: "radioactivity-nuclear-reaction",
          title: "Radioactivity and Nuclear Reaction",
          hours: 6,
          topics: [
            { slug: "alpha-beta-gamma-rays", title: "Alpha-particles, beta-particles and gamma rays", hours: 2, meaning: "Alpha, beta, and gamma rays are three types of nuclear radiation with different penetrating powers — understanding their properties is essential for radiation safety and medical applications."},
            { slug: "radioactive-disintegration-laws", title: "Laws of radioactive disintegration; half-life, mean-life and decay constant", hours: 2, meaning: "Radioactive decay follows exponential laws governed by half-life and mean-life — these laws enable radiometric dating, medical tracers, and nuclear power."},
            { slug: "geiger-muller-tube", title: "Geiger-Muller tube", hours: 1, meaning: "A Geiger-Muller tube detects ionising radiation by producing pulses from gas ionisation — it is the standard instrument for measuring radioactivity in labs and industry."},
            { slug: "carbon-dating", title: "Carbon dating", hours: 1, meaning: "Carbon-14 dating measures the age of organic materials by comparing remaining ¹⁴C to ¹²C — it is used in archaeology, geology, and forensics to date objects up to 50,000 years old."},
            { slug: "medical-nuclear-radiation", title: "Medical use of nuclear radiation and possible health hazards", hours: 1, meaning: "Nuclear radiation is used in medicine for diagnosis (PET scans, tracers) and treatment (radiotherapy) — understanding risks and benefits is essential for medical physics."},
          ],
        },
        {
          id: "recent-trends-in-physics-12",
          title: "Recent Trends in Physics",
          hours: 6,
          topics: [
            { slug: "surface-waves-rayleigh-love", title: "Surface waves: Rayleigh and Love waves", hours: 1, meaning: "Rayleigh and Love waves are surface seismic waves that cause the most destruction during earthquakes — studying them helps engineers design earthquake-resistant structures."},
            { slug: "internal-waves-sp-waves", title: "Internal waves: S and P-waves", hours: 1, meaning: "P-waves (primary) travel fastest and arrive first; S-waves (secondary) are slower and cannot travel through liquids — their arrival time difference locates earthquake epicentres."},
            { slug: "gorkha-earthquake-2015", title: "Wave patterns of Gorkha Earthquake 2015", hours: 2, meaning: "The 2015 Gorkha earthquake demonstrated complex fault rupture and wave propagation — studying its seismic waves improves Nepal's earthquake preparedness and building codes."},
            { slug: "gravitational-wave", title: "Gravitational wave", hours: 1, meaning: "Gravitational waves are ripples in spacetime caused by accelerating masses — their detection opened a new window for observing black hole mergers and neutron star collisions."},
            { slug: "nanotechnology", title: "Nanotechnology", hours: 1, meaning: "Nanotechnology manipulates matter at the atomic and molecular scale — it enables stronger materials, targeted drug delivery, and ultra-small electronic devices."},
            { slug: "higgs-boson", title: "Higgs Boson", hours: 1, meaning: "The Higgs boson confirms the existence of the Higgs field, which gives particles mass — its 2012 discovery at CERN completed the Standard Model of particle physics."},
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
