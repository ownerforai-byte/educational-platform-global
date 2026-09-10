/**
 * Practical (lab) syllabus for NEB (+2) — Biology, Physics, Chemistry.
 * Each subject lists practical units, experiments, and a solution note.
 * This is intentionally separate from `syllabus.ts` (theory syllabus).
 */

export type PracticalExperiment = {
  title: string;
  objective: string;
  materials: string[];
  procedure: string[];
  result: string;
  solution: string;
  /** href to an interactive lab route if available. */
  labHref?: string;
};

export type PracticalUnit = {
  id: string;
  title: string;
  experiments: PracticalExperiment[];
};

export type SubjectPracticalSyllabus = {
  slug: string;
  name: string;
  description: string;
  emoji: string;
  colorClass: string;
  units: PracticalUnit[];
};

export const PRACTICAL_SYLLABUS: SubjectPracticalSyllabus[] = [
  // ─────────────────────────────────────────────────────────────────────────
  //  BIOLOGY
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "biology",
    name: "Biology Practical",
    description:
      "NEB Class 11 & 12 Biology practical syllabus — microscopy, dissection, genetics, ecology and human physiology labs with step-by-step solutions.",
    emoji: "🧫",
    colorClass: "from-emerald-500 to-teal-500",
    units: [
      {
        id: "microscopy",
        title: "Microscopy & Cell Biology Practical",
        experiments: [
          {
            title: "Preparation of a Temporary Mount of Onion Epidermis",
            objective: "Observe the structure of a plant cell under a light microscope.",
            materials: ["Onion bulb", "Glass slide", "Cover slip", "Iodine solution", "Forceps", "Light microscope"],
            procedure: [
              "Peel a thin layer of inner epidermis from an onion bulb with forceps.",
              "Place the peel on a clean slide and add a drop of iodine solution.",
              "Cover with a cover slip and avoid air bubbles.",
              "Observe under 10× and then 40× magnification.",
              "Draw and label the observed cells.",
            ],
            result: "Rectangular plant cells with visible cell wall, nucleus and cytoplasm are observed.",
            solution:
              "Iodine stains the nucleus and starch grains blue-black, making the nucleus clearly visible. The cell wall is the outermost boundary; a distinct nucleus appears as a dark oval inside the cytoplasm. Avoid over-staining — one drop is enough.",
            labHref: "/lab/biology/bio-th-cell",
          },
          {
            title: "Observation of Human Cheek Cells (Animal Cell)",
            objective: "Compare animal and plant cell structure.",
            materials: ["Sterile toothpick", "Normal saline (0.9 % NaCl)", "Methylene blue", "Slide & cover slip", "Light microscope"],
            procedure: [
              "Scrape the inner cheek with a sterile toothpick.",
              "Smear on a slide and add one drop of normal saline.",
              "Add a drop of methylene blue and mount with a cover slip.",
              "Observe under 10× and 40× magnification.",
              "Draw and label the cells.",
            ],
            result: "Irregularly shaped animal cells with a clearly stained nucleus, no cell wall, and no chloroplasts.",
            solution:
              "Animal cells have no cell wall, so use normal saline (isotonic) to prevent the cells from bursting. Methylene blue stains the nucleus blue. Note the absence of chloroplasts and cell wall compared to onion cells.",
            labHref: "/lab/biology/bio-th-cell",
          },
        ],
      },
      {
        id: "genetics-lab",
        title: "Genetics Practical",
        experiments: [
          {
            title: "Punnett Square for a Monohybrid Cross",
            objective: "Predict the genotypic and phenotypic ratios of a monohybrid cross.",
            materials: ["Graph paper", "Coin or cards for simulation", "Observation notebook"],
            procedure: [
              "Set up parents: Tt × Tt (seed colour in pea plants).",
              "Draw a 2 × 2 Punnett square and place alleles on top and left.",
              "Fill the four boxes to get offspring genotypes.",
              "Count genotypic and phenotypic ratios.",
            ],
            result: "Genotypic ratio 1 TT : 2 Tt : 1 tt; phenotypic ratio 3 dominant : 1 recessive.",
            solution:
              "Each parent contributes one allele randomly, so the four boxes are TT, Tt, Tt, tt. Phenotypically TT and Tt look the same (dominant), giving 3:1. This illustrates Mendel's Law of Segregation.",
            labHref: "/lab/biology/bio-calc-punnett",
          },
        ],
      },
      {
        id: "ecology-lab",
        title: "Ecology & Field Practical",
        experiments: [
          {
            title: "Study of a Simple Ecosystem (Pond / Aquatic System)",
            objective: "Identify producers, consumers and decomposers in a pond ecosystem.",
            materials: ["Sample pond water", "Aquatic plants", "Terrestrial plants", "Magnifying lens", "Observation notebook"],
            procedure: [
              "Collect a water sample from a pond.",
              "Observe algae (producers) under a magnifying lens.",
              "Note aquatic insects, protozoa and other consumers.",
              "Identify decomposers (bacteria, fungi).",
              "Sketch the food web.",
            ],
            result: "A food web is drawn showing energy flow from producers to top consumers and recyclers.",
            solution:
              "Algae are the producers (photosynthesis). Small organisms like protozoa and zooplankton are primary consumers; small fish are secondary. Bacteria and fungi act as decomposers returning nutrients. Label each level clearly.",
            labHref: "/lab/biology/bio-th-ecology",
          },
        ],
      },
      {
        id: "human-physiology-lab",
        title: "Human Physiology Practical",
        experiments: [
          {
            title: "Dissection of a Dried Human Heart Model",
            objective: "Identify the four chambers, major vessels and valves of the heart.",
            materials: ["Preserved heart model", "Dissection set", "Labels", "Reference diagram"],
            procedure: [
              "Examine the outer surface and locate the major blood vessels.",
              "Cut open the heart longitudinally.",
              "Identify the right atrium, right ventricle, left atrium and left ventricle.",
              "Locate the tricuspid, pulmonary, aortic and bicuspid (mitral) valves.",
              "Note the thicker wall of the left ventricle.",
            ],
            result: "All four chambers, valves and major vessels are identified and labelled.",
            solution:
              "The right side pumps deoxygenated blood to the lungs; the left side pumps oxygenated blood to the body. The left ventricle wall is thicker because it must pump blood over a larger distance. The aorta is the largest artery; the vena cava is the largest vein.",
            labHref: "/lab/biology/bio-th-human",
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  //  PHYSICS
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "physics",
    name: "Physics Practical",
    description:
      "NEB Class 11 & 12 Physics practical syllabus — mechanics, heat determinations, electricity and waves experiments with graph analysis and solutions.",
    emoji: "⚗️",
    colorClass: "from-sky-500 to-blue-500",
    units: [
      {
        id: "mechanics-practical",
        title: "Mechanics Practical",
        experiments: [
          {
            title: "Determination of Acceleration Due to Gravity (g) Using a Simple Pendulum",
            objective: "Find g from the period of a simple pendulum of known length.",
            materials: ["Simple pendulum", "Stopwatch", "Meter scale", "Graph paper"],
            procedure: [
              "Suspend a small bob with a thread of about 1 m length.",
              "Displace the bob with a small amplitude and release.",
              "Measure the time for 20 oscillations using a stopwatch.",
              "Change the length and repeat for 5 different lengths.",
              "Plot L (length) on y-axis and T² on x-axis.",
              "Find the slope and compute g = 4π²/slope.",
            ],
            result: "The slope of the L vs T² graph gives g ≈ 9.8 m/s².",
            solution:
              "For a simple pendulum T = 2π√(L/g), so T² = (4π²/g)·L. A straight line through the origin is expected. Taking slope = L/T², then g = 4π² × (T²/L). Use at least 5 data points and average to reduce stopwatch error.",
            labHref: "/lab/physics/ph-calc-projectile",
          },
        ],
      },
      {
        id: "heat-determination-practical",
        title: "Heat Determinations",
        experiments: [
          {
            title: "Determining the Coefficient of Linear Expansion of a Metal Rod (Searle's Method)",
            objective: "Measure the coefficient of linear expansion α of a metal rod.",
            materials: ["Searle's apparatus", "Metal rod", "Spirit lamp", "Thermometer", "Vernier callipers"],
            procedure: [
              "Measure the initial length L₀ of the rod with a vernier calliper.",
              "Place the rod in the Searle apparatus and pass steam through the tube.",
              "Record the change in micrometer reading as the rod heats up.",
              "Record the temperature rise ΔT.",
              "Calculate α = ΔL / (L₀ · ΔT).",
            ],
            result: "α for the metal rod is approximately 1.2 × 10⁻⁵ /°C (typical for brass).",
            solution:
              "The micrometer measures the increase ΔL directly. The formula is α = (change in length) / (original length × temperature rise). Ensure the apparatus is free from external vibrations and use steam (not boiling water) for a uniform temperature.",
            labHref: "/lab/physics/heat-determinations",
          },
        ],
      },
      {
        id: "electricity-practical",
        title: "Electricity Practical",
        experiments: [
          {
            title: "Verification of Ohm's Law",
            objective: "Verify V = IR by plotting a V-I graph for a fixed resistor.",
            materials: ["Battery (cell)", "Fixed resistor", "Ammeter", "Voltmeter", "Rheostat", "Connecting wires", "Key"],
            procedure: [
              "Set up a series circuit: battery, key, rheostat, ammeter and resistor in series; voltmeter in parallel with the resistor.",
              "Close the key and adjust the rheostat to get a reading on the ammeter.",
              "Record the voltage (V) and current (I) at 5–6 settings.",
              "Plot V on y-axis and I on x-axis.",
              "The slope of the straight line gives the resistance R.",
            ],
            result: "A straight line through the origin with slope R confirms Ohm's law.",
            solution:
              "Ohm's law states V = IR. The V-I graph is linear with slope equal to R. If the line curves (bending at high currents), the resistor is heating and its resistance is changing. Use a rheostat to start from zero current and build up gradually to avoid initial errors.",
            labHref: "/lab/physics/advanced-circuit",
          },
        ],
      },
      {
        id: "waves-practical",
        title: "Waves & Optics Practical",
        experiments: [
          {
            title: "Determining the Focal Length of a Convex Lens",
            objective: "Find the focal length of a thin convex lens using the no-parallax (u = v) method.",
            materials: ["Convex lens", "Candle (or lamp)", "Screen", "Meter scale"],
            procedure: [
              "Place the candle and the screen on opposite sides of the lens on a metre scale.",
              "Adjust the lens position until a sharp image of the candle appears on the screen.",
              "Move the lens further to get another sharp image at a different lens position.",
              "Measure the distance between the two lens positions D.",
              "Calculate f = D/4 (no-parallax method).",
            ],
            result: "f = D/4 gives the focal length of the lens.",
            solution:
              "When the object distance u equals the image distance v (i.e. u = v = 2f), the lens is at the midpoint between object and screen. The total distance D = u + v = 4f, so f = D/4. This is the most accurate graphical method because no individual readings are needed.",
            labHref: "/lab/physics/ph-3d-optics",
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  //  CHEMISTRY
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "chemistry",
    name: "Chemistry Practical",
    description:
      "NEB Class 11 & 12 Chemistry practical syllabus — titration, pH, redox and stoichiometry labs with balanced equations and solutions.",
    emoji: "⚗️",
    colorClass: "from-amber-500 to-orange-500",
    units: [
      {
        id: "titration-practical",
        title: "Titration Practical",
        experiments: [
          {
            title: "Titration of NaOH with HCl (Acid–Base Titration)",
            objective: "Determine the molarity of an unknown NaOH solution by titrating against standard HCl.",
            materials: ["Standard HCl solution", "Unknown NaOH solution", "Burette", "Pipette", "Conical flask", "Phenolphthalein indicator"],
            procedure: [
              "Fill the burette with standard HCl and note the initial reading.",
              "Pipette 25 mL of NaOH into a conical flask and add 2–3 drops of phenolphthalein.",
              "Slowly add HCl from the burette while swirling.",
              "Stop when the pink colour just disappears (endpoint).",
              "Record the final burette reading. Repeat 2 more times.",
              "Calculate the molarity of NaOH: M₁V₁ = M₂V₂.",
            ],
            result: "The average titre volume is used to compute the molarity of NaOH.",
            solution:
              "Molarity of NaOH = M(HCl) × V(HCl) / V(NaOH). Phenolphthalein turns pink in NaOH and colourless in HCl, so the endpoint is when the pink just vanishes. Use a white tile under the flask for a clearer endpoint. Average at least 3 concordant titres.",
            labHref: "/lab/chemistry/ch-calc-titration",
          },
        ],
      },
      {
        id: "ph-practical",
        title: "pH & Acid–Base Practical",
        experiments: [
          {
            title: "pH Determination of Common Household Substances",
            objective: "Estimate the pH of selected substances using pH paper / universal indicator.",
            materials: ["pH paper or universal indicator", "Citric acid", "Vinegar", "Sodium bicarbonate solution", "Soap solution", "Water"],
            procedure: [
              "Test each substance using a spot plate and pH paper.",
              "Record the colour change and read the pH from the chart.",
              "Arrange the substances in order of increasing pH (most acidic → most basic).",
            ],
            result: "A ranked list of pH values for the tested substances.",
            solution:
              "Acids give pH < 7 (citric acid ≈ 2, vinegar ≈ 3); neutral substances (water) ≈ 7; bases > 7 (soap ≈ 9, NaHCO₃ ≈ 8.3). Arrange from low to high pH. Use a fresh section of pH paper for each sample to avoid contamination.",
            labHref: "/lab/chemistry/ch-calc-ph",
          },
        ],
      },
      {
        id: "redox-practical",
        title: "Redox Practical",
        experiments: [
          {
            title: "Electrochemical Cell: Constructing a Daniell Cell and Measuring its EMF",
            objective: "Construct a Daniell cell and measure its EMF.",
            materials: ["Zinc strip", "Copper strip", "ZnSO₄ solution", "CuSO₄ solution", "Salt bridge (U-tube with KCl)", "Voltmeter", "Beakers"],
            procedure: [
              "Place Zn strip in ZnSO₄ beaker and Cu strip in CuSO₄ beaker.",
              "Connect the two half-cells with a salt bridge.",
              "Connect the strips to a voltmeter.",
              "Record the EMF of the cell.",
              "Identify the anode (oxidation: Zn) and cathode (reduction: Cu).",
            ],
            result: "The voltmeter reads approximately 1.10 V for a Daniell cell.",
            solution:
              "Zn is the anode (Zn → Zn²⁺ + 2e⁻) and Cu is the cathode (Cu²⁺ + 2e⁻ → Cu). E°cell = E°cathode − E°anode = 0.34 − (−0.76) = 1.10 V. The salt bridge completes the circuit and prevents charge build-up without mixing the solutions.",
            labHref: "/lab/chemistry/ch-th-redox",
          },
        ],
      },
      {
        id: "stoichiometry-practical",
        title: "Stoichiometry Practical",
        experiments: [
          {
            title: "Determining the Molar Mass of an Unknown Organic Acid",
            objective: "Find the molar mass of a diprotic organic acid by neutralisation against standard NaOH.",
            materials: ["Standard NaOH solution", "Diprotic organic acid (approx. 5 g/L)", "Burette", "Pipette", "Methyl orange / phenolphthalein"],
            procedure: [
              "Pipette 25 mL of the organic acid into a conical flask.",
              "Add 2–3 drops of phenolphthalein.",
              "Titrate with standard NaOH to the pale-pink endpoint.",
              "Repeat to obtain 3 concordant titres.",
              "Use the equation: 2 × M(acid) × V(acid) = M(NaOH) × V(NaOH).",
            ],
            result: "The molar mass of the diprotic acid is calculated from the average titre.",
            solution:
              "For a diprotic acid H₂A, 2 moles of NaOH neutralise 1 mole of H₂A. So M(acid) = M(NaOH) × V(NaOH) / (2 × V(acid)). If the acid is diprotic, the 2:1 stoichiometric ratio must be applied correctly — a common source of error is forgetting the factor of 2.",
            labHref: "/lab/chemistry/ch-calc-stoich",
          },
        ],
      },
    ],
  },
];

/** Get all practical subjects. */
export function getPracticalSubjects() {
  return PRACTICAL_SYLLABUS;
}

/** Find a single subject practical syllabus by slug. */
export function getPracticalBySlug(slug: string): SubjectPracticalSyllabus | undefined {
  return PRACTICAL_SYLLABUS.find((s) => s.slug === slug);
}
