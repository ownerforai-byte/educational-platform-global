/**
 * High-Yield Topic Facts, Speed Formulas & CEE/IOE Entrance Traps Engine
 * Provides authentic, rich scientific terms, governing equations, unit dimensions,
 * physical constants, and board/entrance traps across Physics, Chemistry, Biology, and Math.
 */

export interface HighYieldTopicData {
  topicKeywords: string[];
  subject: "physics" | "chemistry" | "biology" | "mathematics" | "general";
  title: string;
  category: string;
  governingLaws: Array<{ name: string; statement: string; formula: string; conditions: string }>;
  speedFormulas: Array<{ name: string; formula: string; description: string; unit: string; dimensions?: string }>;
  constantsAndValues: Array<{ symbol: string; name: string; value: string; unit: string }>;
  entranceTraps: Array<{ trap: string; truth: string; examRef: string }>;
  workedNumericals: Array<{
    problem: string;
    given: string;
    steps: string[];
    answer: string;
  }>;
  keyTermsAndDefinitions: Array<{ term: string; definition: string; significance: string }>;
}

export const HIGH_YIELD_TOPIC_BANK: HighYieldTopicData[] = [
  // ─────────────────────────────────────────────────────────────
  // 1. PHYSICS: VECTORS & RESOLUTION
  // ─────────────────────────────────────────────────────────────
  {
    topicKeywords: ["vector", "scalar", "resolution", "addition", "cross-product", "dot-product"],
    subject: "physics",
    title: "Vectors & Directional Field Mechanics",
    category: "Mechanics & Mathematical Physics",
    governingLaws: [
      {
        name: "Law of Parallelogram of Vectors",
        statement: "If two vectors acting at a point are represented in magnitude and direction by two adjacent sides of a parallelogram drawn from a point, their resultant is represented completely by the diagonal passing through that point.",
        formula: "R = \\sqrt{P^2 + Q^2 + 2PQ\\cos\\theta}, \\quad \\tan\\alpha = \\frac{Q\\sin\\theta}{P + Q\\cos\\theta}",
        conditions: "Applicable to co-planar, concurrent vectors acting at a single point.",
      },
      {
        name: "Polygon Law of Vector Addition",
        statement: "If a number of vectors are represented in magnitude and direction by the sides of an open polygon taken in order, their resultant is represented by the closing side taken in the opposite order.",
        formula: "\\vec{R} = \\vec{A} + \\vec{B} + \\vec{C} + \\dots + \\vec{N}",
        conditions: "If the polygon is closed taken in order, the resultant is identically the null vector \\vec{0}.",
      },
    ],
    speedFormulas: [
      {
        name: "Resultant Magnitude (General)",
        formula: "R = \\sqrt{A^2 + B^2 + 2AB\\cos\\theta}",
        description: "Special cases: \\theta=0^\\circ \\implies R_{max} = A+B; \\; \\theta=90^\\circ \\implies R = \\sqrt{A^2+B^2}; \\; \\theta=180^\\circ \\implies R_{min} = |A-B|",
        unit: "\\text{Same as vector quantity}",
        dimensions: "[A]",
      },
      {
        name: "Equal Vector Shortcut",
        formula: "R = 2A\\cos(\\theta/2) \\quad (\\text{when } |\\vec{A}| = |\\vec{B}|)",
        description: "For \\theta=60^\\circ, R=A\\sqrt{3}; for \\theta=90^\\circ, R=A\\sqrt{2}; for \\theta=120^\\circ, R=A",
        unit: "\\text{Vector unit}",
        dimensions: "[A]",
      },
      {
        name: "Scalar (Dot) Product",
        formula: "\\vec{A} \\cdot \\vec{B} = |\\vec{A}||\\vec{B}|\\cos\\theta = A_x B_x + A_y B_y + A_z B_z",
        description: "Orthogonal condition: \\vec{A} \\cdot \\vec{B} = 0 \\iff \\vec{A} \\perp \\vec{B}",
        unit: "\\text{Product of units}",
      },
      {
        name: "Vector (Cross) Product",
        formula: "\\vec{A} \\times \\vec{B} = |\\vec{A}||\\vec{B}|\\sin\\theta \\, \\hat{n} = \\begin{vmatrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ A_x & A_y & A_z \\\\ B_x & B_y & B_z \\end{vmatrix}",
        description: "Collinear condition: \\vec{A} \\times \\vec{B} = \\vec{0} \\iff \\vec{A} \\parallel \\vec{B}. Area of parallelogram = |\\vec{A} \\times \\vec{B}|",
        unit: "\\text{Product of units}",
      },
      {
        name: "Unit Vector",
        formula: "\\hat{A} = \\frac{\\vec{A}}{|\\vec{A}|} = \\frac{A_x\\hat{i} + A_y\\hat{j} + A_z\\hat{k}}{\\sqrt{A_x^2 + A_y^2 + A_z^2}}",
        description: "Specifies pure direction without magnitude. Dimensionless.",
        unit: "\\text{Dimensionless}",
        dimensions: "M^0 L^0 T^0",
      },
    ],
    constantsAndValues: [
      { symbol: "\\hat{i} \\cdot \\hat{i}", name: "Orthogonal Unit Dot Product", value: "1", unit: "Scalar" },
      { symbol: "\\hat{i} \\cdot \\hat{j}", name: "Perpendicular Unit Dot Product", value: "0", unit: "Scalar" },
      { symbol: "\\hat{i} \\times \\hat{j}", name: "Cyclic Unit Cross Product", value: "\\hat{k}", unit: "Vector" },
      { symbol: "\\hat{j} \\times \\hat{i}", name: "Anti-cyclic Cross Product", value: "-\\hat{k}", unit: "Vector" },
    ],
    entranceTraps: [
      {
        trap: "Electric current has direction, so it must be a vector quantity.",
        truth: "Electric current is a SCALAR quantity because it does not obey vector addition (triangle/parallelogram law); it adds algebraically via Kirchhoff's Junction Rule (I_in = I_out).",
        examRef: "CEE 2021 / IOE 2078",
      },
      {
        trap: "Pressure has a direction (acts perpendicular to surface), so it is a vector.",
        truth: "Pressure is a SCALAR (or rank-0 isotropic tensor) because the hydrostatic force is isotropic and acts equally in all directions at a point.",
        examRef: "CEE 2023",
      },
      {
        trap: "If |A + B| = |A - B|, then A must equal B.",
        truth: "No! Squaring both sides: A^2 + B^2 + 2AB\\cos\\theta = A^2 + B^2 - 2AB\\cos\\theta \\implies 4AB\\cos\\theta = 0 \\implies \\theta = 90^\\circ. Vectors A and B must be perpendicular to each other!",
        examRef: "IOE Entrance Repeated",
      },
      {
        trap: "The minimum number of non-coplanar vectors having zero resultant is 3.",
        truth: "The minimum number of non-coplanar vectors required for zero resultant is 4 (3 non-coplanar vectors can only span a 3D volume, never cancel each other out).",
        examRef: "CEE / NEB High Yield",
      },
    ],
    workedNumericals: [
      {
        problem: "Two forces of magnitude 5 N and 12 N act at a point. If their resultant is 13 N, find the angle between them.",
        given: "P = 5\\text{ N}, \\; Q = 12\\text{ N}, \\; R = 13\\text{ N}",
        steps: [
          "Apply resultant formula: R^2 = P^2 + Q^2 + 2PQ\\cos\\theta",
          "Substitute knowns: 13^2 = 5^2 + 12^2 + 2(5)(12)\\cos\\theta",
          "169 = 25 + 144 + 120\\cos\\theta \\implies 169 = 169 + 120\\cos\\theta",
          "120\\cos\\theta = 0 \\implies \\cos\\theta = 0 \\implies \\theta = 90^\\circ",
        ],
        answer: "\\theta = 90^\\circ \\; (\\text{forces are orthogonal})",
      },
      {
        problem: "Find the unit vector perpendicular to both \\vec{A} = 2\\hat{i} + 3\\hat{j} - \\hat{k} and \\vec{B} = \\hat{i} - 2\\hat{j} + 4\\hat{k}.",
        given: "\\vec{A} = 2\\hat{i} + 3\\hat{j} - \\hat{k}, \\quad \\vec{B} = \\hat{i} - 2\\hat{j} + 4\\hat{k}",
        steps: [
          "Compute cross product: \\vec{A} \\times \\vec{B} = \\begin{vmatrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ 2 & 3 & -1 \\\\ 1 & -2 & 4 \\end{vmatrix}",
          "\\hat{i}(12 - 2) - \\hat{j}(8 - (-1)) + \\hat{k}(-4 - 3) = 10\\hat{i} - 9\\hat{j} - 7\\hat{k}",
          "Compute magnitude: |\\vec{A} \\times \\vec{B}| = \\sqrt{10^2 + (-9)^2 + (-7)^2} = \\sqrt{100 + 81 + 49} = \\sqrt{230}",
          "Unit normal vector: \\hat{n} = \\pm \\frac{10\\hat{i} - 9\\hat{j} - 7\\hat{k}}{\\sqrt{230}}",
        ],
        answer: "\\hat{n} = \\pm \\frac{1}{\\sqrt{230}}(10\\hat{i} - 9\\hat{j} - 7\\hat{k})",
      },
    ],
    keyTermsAndDefinitions: [
      {
        term: "Collinear Vectors",
        definition: "Vectors that act along the same line or along parallel straight lines, regardless of their magnitudes or whether they point in the same or opposite directions.",
        significance: "Cross product of any two collinear vectors is identically zero (\\vec{A} \\times \\vec{B} = \\vec{0}).",
      },
      {
        term: "Coplanar Vectors",
        definition: "Vectors whose line of action lies entirely within the same geometric plane or parallel planes.",
        significance: "Condition for three vectors \\vec{A}, \\vec{B}, \\vec{C} to be coplanar is their scalar triple product: [\\vec{A} \\; \\vec{B} \\; \\vec{C}] = \\vec{A} \\cdot (\\vec{B} \\times \\vec{C}) = 0.",
      },
      {
        term: "Polar vs Axial Vectors",
        definition: "Polar vectors have a point of application and change sign under space inversion (e.g., displacement, velocity, force). Axial vectors (pseudovectors) describe rotational motion and do not invert (e.g., angular velocity, torque, angular momentum).",
        significance: "Axial vectors obey the right-hand screw rule.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // 2. PHYSICS: KINEMATICS & PROJECTILE MOTION
  // ─────────────────────────────────────────────────────────────
  {
    topicKeywords: ["kinematics", "projectile", "motion", "velocity", "acceleration", "trajectory"],
    subject: "physics",
    title: "Kinematics & Two-Dimensional Projectile Motion",
    category: "Mechanics",
    governingLaws: [
      {
        name: "Principle of Independence of Motion",
        statement: "The horizontal and vertical components of a projectile's motion are completely independent of each other. The horizontal motion has zero acceleration, while vertical motion is subjected to constant downward gravitational acceleration g.",
        formula: "a_x = 0, \\quad a_y = -g",
        conditions: "Assumes air resistance is negligible and acceleration due to gravity g is constant.",
      },
    ],
    speedFormulas: [
      {
        name: "Time of Flight (T)",
        formula: "T = \\frac{2u\\sin\\theta}{g}",
        description: "Total time the projectile remains in air before striking the horizontal ground level.",
        unit: "\\text{s}",
        dimensions: "T",
      },
      {
        name: "Maximum Height (H)",
        formula: "H = \\frac{u^2\\sin^2\\theta}{2g}",
        description: "Vertical distance where vertical velocity v_y = 0. Notice it depends on \\sin^2\\theta.",
        unit: "\\text{m}",
        dimensions: "L",
      },
      {
        name: "Horizontal Range (R)",
        formula: "R = \\frac{u^2\\sin(2\\theta)}{g} = \\frac{2 u_x u_y}{g}",
        description: "Maximum range occurs at \\theta = 45^\\circ: R_{max} = u^2/g. Equal range for complementary angles \\theta and 90^\\circ - \\theta.",
        unit: "\\text{m}",
        dimensions: "L",
      },
      {
        name: "Range-Height Master Relation",
        formula: "R = 4H\\cot\\theta \\iff \\tan\\theta = \\frac{4H}{R}",
        description: "When R = H, \\tan\\theta = 4 \\implies \\theta = \\tan^{-1}(4) \\approx 76^\\circ. When R = 4H, \\theta = 45^\\circ.",
        unit: "\\text{Pure Ratio}",
      },
      {
        name: "Trajectory Equation",
        formula: "y = x\\tan\\theta - \\frac{gx^2}{2u^2\\cos^2\\theta} = x\\tan\\theta\\left(1 - \\frac{x}{R}\\right)",
        description: "Confirms parabolic path because it is quadratic in x and linear in y.",
        unit: "\\text{m}",
      },
    ],
    constantsAndValues: [
      { symbol: "g", name: "Standard Acceleration of Gravity", value: "9.80665", unit: "\\text{m/s}^2" },
      { symbol: "R_{max}", name: "Maximum Range (\\theta=45^\\circ)", value: "u^2 / g", unit: "\\text{m}" },
      { symbol: "H_{at\\,R_{max}}", name: "Height at Maximum Range", value: "R_{max} / 4", unit: "\\text{m}" },
    ],
    entranceTraps: [
      {
        trap: "At the highest point of a projectile's path, its velocity and acceleration are both zero.",
        truth: "At the summit, vertical velocity v_y = 0, but horizontal velocity is NON-ZERO: v_x = u\\cos\\theta! Acceleration is ALWAYS g downward (9.8 m/s²). Velocity and acceleration are strictly perpendicular (90°) at the summit.",
        examRef: "NEB Class 11 / CEE 2022",
      },
      {
        trap: "Two projectiles launched at 30° and 60° with the same initial speed have different horizontal ranges.",
        truth: "Horizontal ranges are IDENTICAL because \\sin(2 \\times 30^\\circ) = \\sin 60^\\circ and \\sin(2 \\times 60^\\circ) = \\sin 120^\\circ = \\sin 60^\\circ! However, times of flight and maximum heights are different.",
        examRef: "CEE High-Yield Question",
      },
      {
        trap: "If a bomb is dropped from a horizontally flying airplane, it falls straight down relative to ground.",
        truth: "Relative to ground, the bomb moves along a PARABOLIC trajectory because it possesses the initial horizontal velocity of the aircraft. Relative to the pilot, it falls in a straight vertical line directly beneath.",
        examRef: "IOE Entrance Trap",
      },
    ],
    workedNumericals: [
      {
        problem: "A ball is thrown with a velocity of 20 m/s at an angle of 30° with the horizontal. Taking g = 10 m/s², calculate: (a) Time of flight, (b) Maximum height, (c) Horizontal range.",
        given: "u = 20\\text{ m/s}, \\; \\theta = 30^\\circ, \\; g = 10\\text{ m/s}^2",
        steps: [
          "u_x = 20\\cos 30^\\circ = 20(\\sqrt{3}/2) = 10\\sqrt{3} \\approx 17.32\\text{ m/s}",
          "u_y = 20\\sin 30^\\circ = 20(1/2) = 10\\text{ m/s}",
          "Time of flight: T = \\frac{2u_y}{g} = \\frac{2(10)}{10} = 2.0\\text{ s}",
          "Maximum height: H = \\frac{u_y^2}{2g} = \\frac{10^2}{2(10)} = \\frac{100}{20} = 5.0\\text{ m}",
          "Horizontal range: R = u_x \\cdot T = (10\\sqrt{3})(2) = 20\\sqrt{3} \\approx 34.64\\text{ m}",
        ],
        answer: "T = 2.0\\text{ s}, \\quad H = 5.0\\text{ m}, \\quad R = 34.64\\text{ m}",
      },
    ],
    keyTermsAndDefinitions: [
      {
        term: "Trajectory",
        definition: "The path traced out by a moving projectile in a gravitational field, which in the absence of air resistance is a symmetrical parabola.",
        significance: "Determined by eliminating time t between horizontal and vertical parametric equations of motion.",
      },
      {
        term: "Angle of Projection",
        definition: "The initial angle \\theta that the velocity vector of the projectile makes with the horizontal ground.",
        significance: "\\theta = 45^\\circ optimizes range on a flat horizontal plane.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // 3. CHEMISTRY: PERIODIC TABLE & CHEMICAL BONDING
  // ─────────────────────────────────────────────────────────────
  {
    topicKeywords: ["periodic", "element", "hybridization", "bonding", "vsepr", "atomic-structure", "classification"],
    subject: "chemistry",
    title: "Periodic Trends, Electronic Configuration & Chemical Bonding",
    category: "Inorganic & Physical Chemistry",
    governingLaws: [
      {
        name: "Modern Periodic Law (Moseley, 1913)",
        statement: "The physical and chemical properties of the elements are periodic functions of their atomic numbers (Z), not their atomic masses.",
        formula: "\\sqrt{\\nu} = a(Z - b)",
        conditions: "Proved using X-ray characteristic emission spectra (K_\\alpha lines).",
      },
      {
        name: "Valence Shell Electron Pair Repulsion (VSEPR)",
        statement: "Electron pairs in the valence shell repel each other and arrange themselves in three-dimensional space to minimize repulsive potential energy and maximize distance.",
        formula: "\\text{Repulsion Order: Lone Pair - Lone Pair} > \\text{Lone Pair - Bond Pair} > \\text{Bond Pair - Bond Pair}",
        conditions: "Determines molecular geometries: linear, trigonal planar, tetrahedral, trigonal bipyramidal, octahedral.",
      },
    ],
    speedFormulas: [
      {
        name: "Steric Number (Hybridization Index)",
        formula: "\\text{Steric No.} = \\frac{1}{2}\\left[V + M - C + A\\right]",
        description: "V = valence e⁻ of central atom; M = monovalent atoms attached (H, F, Cl, Br, I); C = cationic charge; A = anionic charge. SN=2: sp; SN=3: sp²; SN=4: sp³; SN=5: sp³d; SN=6: sp³d²",
        unit: "\\text{Integer Index}",
      },
      {
        name: "Bond Order (Molecular Orbital Theory)",
        formula: "\\text{Bond Order} = \\frac{N_b - N_a}{2}",
        description: "N_b = electrons in bonding orbitals; N_a = electrons in antibonding orbitals. Paramagnetic if unpaired e⁻ present; Diamagnetic if all paired.",
        unit: "\\text{Dimensionless}",
      },
      {
        name: "Dipole Moment (\\mu)",
        formula: "\\mu = q \\times d",
        description: "Vector quantity directed from positive center toward electronegative center. 1 Debye = 3.33564 × 10⁻³⁰ C·m",
        unit: "\\text{Debye (D) or C}\\cdot\\text{m}",
        dimensions: "[q][d] = I T L",
      },
      {
        name: "Effective Nuclear Charge (Z_eff)",
        formula: "Z_{\\text{eff}} = Z - \\sigma \\quad (\\sigma = \\text{Slater's Screening Constant})",
        description: "Increases left to right across a period; remains nearly constant down a group.",
        unit: "\\text{Effective Charge}",
      },
    ],
    constantsAndValues: [
      { symbol: "1 \\text{ Debye}", name: "Debye Unit of Dipole Moment", value: "3.336 \\times 10^{-30}", unit: "\\text{C}\\cdot\\text{m}" },
      { symbol: "R_H", name: "Rydberg Constant", value: "1.097373 \\times 10^7", unit: "\\text{m}^{-1}" },
      { symbol: "a_0", name: "Bohr Radius of Hydrogen (n=1)", value: "0.529", unit: "\\text{\\AA} = 0.0529\\text{ nm}" },
      { symbol: "E_1", name: "Hydrogen Ground State Energy", value: "-13.6", unit: "\\text{eV}" },
    ],
    entranceTraps: [
      {
        trap: "Oxygen has higher first ionization energy than Nitrogen because oxygen is further to the right in Period 2.",
        truth: "FALSE! Nitrogen (1s² 2s² 2p³) has a HIGHER first ionization energy than Oxygen (1s² 2s² 2p⁴) because Nitrogen has an exceptionally stable HALF-FILLED 2p³ subshell!",
        examRef: "CEE / NEB Repeated Trap",
      },
      {
        trap: "Fluorine has higher electron affinity (electron gain enthalpy) than Chlorine because Fluorine is the most electronegative element.",
        truth: "FALSE! Chlorine has HIGHER electron affinity than Fluorine (-349 kJ/mol vs -328 kJ/mol) because the compact 2p subshell of Fluorine suffers severe inter-electronic repulsions.",
        examRef: "CEE / IOE Past Exam Goldmine",
      },
      {
        trap: "In XeF₄, there are 4 fluorine atoms so its geometry must be tetrahedral.",
        truth: "Xe in XeF₄ has 8 valence e⁻ + 4 monovalent atoms = Steric No. 6 \\implies sp³d² hybridization with 2 lone pairs! The geometry is SQUARE PLANAR, with 90° bond angles.",
        examRef: "NEB Class 11 / CEE 2023",
      },
      {
        trap: "CO₂ and SO₂ have similar chemical formulas, so both have zero dipole moment.",
        truth: "CO₂ is linear (sp, 180°) so bond dipoles cancel (\\mu = 0). SO₂ is bent (sp², ~119.5°) with 1 lone pair, so it has a PERMANENT non-zero dipole moment (\\mu = 1.63 D)!",
        examRef: "CEE Chemistry Trap",
      },
    ],
    workedNumericals: [
      {
        problem: "Determine the hybridization, steric number, and molecular geometry of: (a) SF₄, (b) PCl₅, (c) NH₃.",
        given: "Valence electrons: S=6, P=5, N=5. Monovalent ligands: F=1, Cl=1, H=1.",
        steps: [
          "For SF₄: SN = 1/2 [6 + 4 - 0 + 0] = 5 \\implies sp³d. Bond pairs = 4, Lone pairs = 1. Molecular Shape = Seesaw.",
          "For PCl₅: SN = 1/2 [5 + 5 - 0 + 0] = 5 \\implies sp³d. Bond pairs = 5, Lone pairs = 0. Molecular Shape = Trigonal Bipyramidal.",
          "For NH₃: SN = 1/2 [5 + 3 - 0 + 0] = 4 \\implies sp³. Bond pairs = 3, Lone pairs = 1. Molecular Shape = Trigonal Pyramidal (Bond angle = 107°).",
        ],
        answer: "SF₄: Seesaw (sp³d); \\quad PCl₅: Trigonal Bipyramidal (sp³d); \\quad NH₃: Pyramidal (sp³)",
      },
    ],
    keyTermsAndDefinitions: [
      {
        term: "Aufbau Principle",
        definition: "In the ground state of an atom, electrons fill atomic orbitals of the lowest available energy levels before occupying higher levels, following the (n + l) rule.",
        significance: "Explains why 4s (n+l = 4+0 = 4) fills before 3d (n+l = 3+2 = 5).",
      },
      {
        term: "Inert Pair Effect",
        definition: "The reluctance of the valence s-electrons of heavier p-block elements (Period 6: Tl, Pb, Bi) to participate in chemical bonding due to poor shielding by inner d and f orbitals.",
        significance: "Explains why Pb²⁺ is more stable than Pb⁴⁺, and Tl⁺ is more stable than Tl³⁺.",
      },
      {
        term: "Diagonal Relationship",
        definition: "The similarity in chemical behavior between adjacent elements of the second and third periods that are situated diagonally (e.g., Li-Mg, Be-Al, B-Si) due to similar charge-to-radius ratio.",
        significance: "Both Li and Mg form normal oxides and decompose nitrates to give NO₂ and O₂.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // 4. BIOLOGY: CELL BIOLOGY & HUMAN PHYSIOLOGY
  // ─────────────────────────────────────────────────────────────
  {
    topicKeywords: ["cell", "organelle", "nephron", "mitochondria", "dna", "circulatory", "cardiac", "kidney"],
    subject: "biology",
    title: "Cellular Ultrastructure, Genetics & Organ Physiology",
    category: "Cell Biology & Physiology",
    governingLaws: [
      {
        name: "Cell Theory (Schleiden, Schwann & Virchow)",
        statement: "All living organisms are composed of one or more cells. The cell is the basic structural and functional unit of life. All cells arise strictly from pre-existing cells (Omnis cellula-e cellula, 1855).",
        formula: "\\text{Omnis cellula-e cellula (Rudolf Virchow)}",
        conditions: "Viruses and mature mammalian erythrocytes (RBCs) are notable exceptions to classical cell theory.",
      },
      {
        name: "Chargaff's Rules of DNA Base Equivalence",
        statement: "In any double-stranded DNA molecule, the number of purines equals the number of pyrimidines: Adenine equals Thymine, and Guanine equals Cytosine. The ratio (A+T)/(G+C) is species-specific.",
        formula: "[A] = [T], \\quad [G] = [C] \\implies \\frac{[A] + [G]}{[T] + [C]} = 1.0",
        conditions: "Strictly holds for double-stranded DNA (dsDNA); invalid for single-stranded DNA (ssDNA) or RNA.",
      },
    ],
    speedFormulas: [
      {
        name: "Net Filtration Pressure (NFP in Glomerulus)",
        formula: "\\text{NFP} = \\text{GHP} - (\\text{BCOP} + \\text{CHP})",
        description: "Glomerular Hydrostatic Pressure (GHP ≈ 60 mmHg), Blood Colloid Osmotic Pressure (BCOP ≈ 32 mmHg), Capsular Hydrostatic Pressure (CHP ≈ 18 mmHg). NFP = 60 - (32 + 18) = +10 mmHg.",
        unit: "\\text{mmHg}",
      },
      {
        name: "Glomerular Filtration Rate (GFR)",
        formula: "\\text{GFR} \\approx 125\\text{ mL/min} = 180\\text{ Liters/day}",
        description: "About 99% of filtrate is reabsorbed along the nephron; only ~1.5 Liters is excreted as urine daily.",
        unit: "\\text{mL/min or L/day}",
      },
      {
        name: "Cardiac Output (Q)",
        formula: "\\text{Cardiac Output} = \\text{Stroke Volume} \\times \\text{Heart Rate}",
        description: "Resting SV ≈ 70 mL, HR ≈ 72 bpm \\implies Cardiac Output = 70 × 72 ≈ 5040 mL/min ≈ 5.0 L/min.",
        unit: "\\text{L/min}",
      },
      {
        name: "B-DNA Dimensions",
        formula: "\\text{Pitch} = 3.4\\text{ nm} (34\\text{ \\AA}), \\quad \\text{Base pairs/turn} = 10, \\quad \\text{Distance between bp} = 0.34\\text{ nm}",
        description: "Right-handed double helix, diameter = 2.0 nm (20 Å). 2 H-bonds between A=T, 3 H-bonds between G≡C.",
        unit: "\\text{nm or \\AA}",
      },
    ],
    constantsAndValues: [
      { symbol: "\\text{Normal BP}", name: "Standard Arterial Blood Pressure", value: "120 / 80", unit: "\\text{mmHg}" },
      { symbol: "\\text{RBC Lifespan}", name: "Human Erythrocyte Viability", value: "120", unit: "\\text{days}" },
      { symbol: "\\text{Normal Blood pH}", name: "Physiological Arterial pH", value: "7.35 - 7.45", unit: "\\text{pH scale}" },
      { symbol: "\\text{B-DNA Diameter}", name: "Watson-Crick Double Helix Width", value: "2.0", unit: "\\text{nm}" },
    ],
    entranceTraps: [
      {
        trap: "All blood vessels entering the heart carry deoxygenated blood.",
        truth: "FALSE! Pulmonary veins (4 in humans) carry OXYGENATED blood from the lungs into the left atrium!",
        examRef: "CEE Biology Repeated",
      },
      {
        trap: "Glucose is reabsorbed in the Loop of Henle.",
        truth: "FALSE! 100% of filtered glucose and amino acids are actively reabsorbed in the PROXIMAL CONVOLUTED TUBULE (PCT) via Na⁺-glucose cotransporters (SGLT2). Loop of Henle is for water and NaCl countercurrent multiplication!",
        examRef: "CEE Entrance Goldmine",
      },
      {
        trap: "Mitochondria can synthesize all their own proteins independently of the nucleus.",
        truth: "Mitochondria are SEMI-AUTONOMOUS organelles. They have their own circular DNA and 70S ribosomes, but encode only ~13 proteins; the vast majority are encoded by nuclear genes and imported!",
        examRef: "NEB Class 11 / CEE 2021",
      },
      {
        trap: "In meiosis, crossing-over occurs during Metaphase I.",
        truth: "Crossing-over occurs strictly in PACHYTENE stage of Prophase I of meiosis. Chiasmata become visible in Diplotene.",
        examRef: "CEE High-Yield Trap",
      },
    ],
    workedNumericals: [
      {
        problem: "A double-stranded DNA sample has 28% Adenine. Calculate the percentages of: (a) Thymine, (b) Guanine, (c) Cytosine.",
        given: "[A] = 28\\%",
        steps: [
          "Apply Chargaff's rule: [T] = [A] = 28%",
          "Total [A + T] = 28% + 28% = 56%",
          "Total [G + C] = 100% - 56% = 44%",
          "Since [G] = [C], [G] = 44% / 2 = 22%, and [C] = 22%",
        ],
        answer: "[T] = 28\\%, \\quad [G] = 22\\%, \\quad [C] = 22\\%",
      },
    ],
    keyTermsAndDefinitions: [
      {
        term: "Countercurrent Multiplier",
        definition: "The mechanism in the Loop of Henle where opposing flows in descending limb (permeable to water, impermeable to solutes) and ascending limb (actively pumps NaCl out, impermeable to water) build a hyperosmotic medullary gradient up to 1200 mOsm/L.",
        significance: "Enables terrestrial humans to concentrate urine and conserve water.",
      },
      {
        term: "Sinoatrial (SA) Node",
        definition: "A specialized mass of cardiac pacemaker tissue located in the right atrium that spontaneously generates action potentials (~72 bpm) through hyperpolarization-activated funny currents (I_f).",
        significance: "Paces the rhythm of the entire cardiac cycle.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // 5. MATHEMATICS: CALCULUS & ANALYTIC GEOMETRY
  // ─────────────────────────────────────────────────────────────
  {
    topicKeywords: ["calculus", "derivative", "integral", "tangent", "parabola", "ellipse", "analytic-geometry"],
    subject: "mathematics",
    title: "Calculus, Tangent Geometry & Conic Sections",
    category: "Higher Mathematics",
    governingLaws: [
      {
        name: "Fundamental Theorem of Calculus",
        statement: "If f is continuous on [a, b] and F is any antiderivative of f such that F'(x) = f(x), then the definite integral evaluates the exact accumulated change.",
        formula: "\\int_a^b f(x)\\,dx = F(b) - F(a)",
        conditions: "Integrand f(x) must be continuous on the closed interval [a, b].",
      },
      {
        name: "Lagrange's Mean Value Theorem (LMVT)",
        statement: "If a function f is continuous on [a, b] and differentiable on (a, b), there exists at least one number c in (a, b) such that the instantaneous rate of change equals the average rate of change.",
        formula: "f'(c) = \\frac{f(b) - f(a)}{b - a}",
        conditions: "f(x) must be continuous on [a, b] and differentiable on (a, b).",
      },
    ],
    speedFormulas: [
      {
        name: "Equation of Tangent to Curve y = f(x)",
        formula: "y - y_0 = f'(x_0)(x - x_0)",
        description: "Slope of tangent m = f'(x_0). Slope of normal m_N = -1 / f'(x_0).",
        unit: "\\text{Linear Equation}",
      },
      {
        name: "Standard Parabola (y² = 4ax)",
        formula: "\\text{Focus: } (a, 0), \\; \\text{Directrix: } x = -a, \\; \\text{Latus Rectum: } 4a, \\; \\text{Eccentricity: } e = 1",
        description: "Tangent at point (x_1, y_1): y y_1 = 2a(x + x_1). Parametric form: (at^2, 2at).",
        unit: "\\text{Coordinate Form}",
      },
      {
        name: "Standard Ellipse (x²/a² + y²/b² = 1, a > b)",
        formula: "\\text{Eccentricity: } e = \\sqrt{1 - \\frac{b^2}{a^2}} < 1, \\quad \\text{Foci: } (\\pm ae, 0), \\quad \\text{Directrices: } x = \\pm \\frac{a}{e}",
        description: "Latus rectum = 2b²/a. Sum of focal distances SP + S'P = 2a (constant).",
        unit: "\\text{Coordinate Form}",
      },
      {
        name: "Integration by Parts Shortcut",
        formula: "\\int u \\, v \\, dx = u \\int v\\,dx - \\int \\left(u' \\int v\\,dx\\right)dx",
        description: "Follow LIATE rule for choosing u: Logarithmic, Inverse trig, Algebraic, Trigonometric, Exponential.",
        unit: "\\text{Integral}",
      },
    ],
    constantsAndValues: [
      { symbol: "e", name: "Euler's Number", value: "2.7182818", unit: "\\text{Transcendental Constant}" },
      { symbol: "\\pi", name: "Archimedes' Constant", value: "3.14159265", unit: "\\text{Ratio}" },
      { symbol: "e_{\\text{parabola}}", name: "Eccentricity of Parabola", value: "1.0", unit: "Ratio" },
      { symbol: "e_{\\text{circle}}", name: "Eccentricity of Circle", value: "0.0", unit: "Ratio" },
    ],
    entranceTraps: [
      {
        trap: "If f'(c) = 0, then x = c is always a local maximum or local minimum.",
        truth: "FALSE! f'(c) = 0 is a necessary condition for an interior extremum of a differentiable function, but NOT sufficient. x = c can be a point of inflection (e.g., f(x) = x³ at x = 0 has f'(0) = 0, but no maximum or minimum)!",
        examRef: "IOE / NEB Class 11-12 Trap",
      },
      {
        trap: "The area between y = x³ and the x-axis from x = -1 to 1 is obtained by directly integrating \\int_{-1}^1 x^3 dx.",
        truth: "Integrating directly yields \\left[\\frac{x^4}{4}\\right]_{-1}^1 = \\frac{1}{4} - \\frac{1}{4} = 0! Geometric area must be computed using absolute value: \\int_{-1}^0 (-x^3)dx + \\int_0^1 x^3 dx = \\frac{1}{4} + \\frac{1}{4} = \\frac{1}{2} \\text{ sq. units}!",
        examRef: "NEB Board Exam Repeated Mistake",
      },
      {
        trap: "A continuous function is always differentiable.",
        truth: "FALSE! Weierstrass function is continuous everywhere and differentiable nowhere. Simple counterexample: f(x) = |x| is continuous at x = 0, but NOT differentiable because left derivative (-1) ≠ right derivative (+1).",
        examRef: "IOE Entrance Concept Check",
      },
    ],
    workedNumericals: [
      {
        problem: "Find the equation of the tangent and normal to the parabola y² = 8x at the point (2, 4).",
        given: "y^2 = 8x \\implies 4a = 8 \\implies a = 2. \\; \\text{Point } (x_1, y_1) = (2, 4).",
        steps: [
          "Differentiate with respect to x: 2y\\frac{dy}{dx} = 8 \\implies \\frac{dy}{dx} = \\frac{4}{y}",
          "Slope of tangent at (2, 4): m = \\frac{4}{4} = 1",
          "Equation of tangent: y - 4 = 1(x - 2) \\implies x - y + 2 = 0",
          "Slope of normal: m_N = -\\frac{1}{m} = -1",
          "Equation of normal: y - 4 = -1(x - 2) \\implies x + y - 6 = 0",
        ],
        answer: "\\text{Tangent: } x - y + 2 = 0, \\quad \\text{Normal: } x + y - 6 = 0",
      },
    ],
    keyTermsAndDefinitions: [
      {
        term: "Derivative",
        definition: "The instantaneous rate of change of a function with respect to its variable, formally defined as the limit of the difference quotient as \\Delta x \\to 0: f'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}.",
        significance: "Geometrically represents the slope of the tangent line to the curve at that point.",
      },
      {
        term: "Latus Rectum",
        definition: "The focal chord of a conic section drawn perpendicular to the major axis (or axis of symmetry).",
        significance: "For parabola y²=4ax, length is 4a; for ellipse x²/a²+y²/b²=1, length is 2b²/a.",
      },
    ],
  },
];

/**
 * Helper to retrieve high-yield data for a given subject and topic slug/title
 */
export function getHighYieldTopicData(
  subjectSlug: string,
  topicSlug: string,
  topicTitle: string
): HighYieldTopicData {
  const normSubject = subjectSlug.toLowerCase();
  const searchStr = `${topicSlug} ${topicTitle}`.toLowerCase();

  // Try to find direct keyword match
  const match = HIGH_YIELD_TOPIC_BANK.find((item) => {
    const subjectMatches =
      normSubject.includes(item.subject) || (item.subject === "general");
    const keywordMatches = item.topicKeywords.some((kw) =>
      searchStr.includes(kw)
    );
    return subjectMatches && keywordMatches;
  });

  if (match) return match;

  // Fallback by subject
  const subjectFallback = HIGH_YIELD_TOPIC_BANK.find((item) =>
    normSubject.includes(item.subject)
  );

  return subjectFallback || HIGH_YIELD_TOPIC_BANK[0];
}
