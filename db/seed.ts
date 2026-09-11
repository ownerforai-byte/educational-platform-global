import "dotenv/config";
import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import { exams, lessons, topics, type ExamQuestion } from "./schema";

interface SeedLesson {
  slug: string;
  title: string;
  contentMd: string;
  estMinutes: number;
}

interface SeedTopic {
  slug: string;
  title: string;
  subject: string;
  description: string;
  lessons: SeedLesson[];
}

interface SeedQuestionBankEntry {
  prompt: string;
  options: [string, string, string, string];
  correctIndex: number;
  explanation: string;
}

const TOPIC_SEED: SeedTopic[] = [
  {
    slug: "biomolecules-and-cell-biology",
    title: "Biomolecules and Cell Biology",
    subject: "biology",
    description:
      "Chemical basis of life: carbohydrates, proteins, lipids and nucleic acids, followed by the structure and function of the cell and its organelles.",
    lessons: [
      {
        slug: "introduction-to-biomolecules",
        title: "Introduction to Biomolecules",
        contentMd:
          "All living matter is built from a small set of carbon-based molecules called biomolecules. The four major classes are carbohydrates, proteins, lipids and nucleic acids. Each class performs a distinct role: carbohydrates supply energy, proteins catalyse reactions and provide structure, lipids store energy and form membranes, and nucleic acids store genetic information.\n\nBiomolecules are polymers assembled from monomers. Glucose monomers form starch and glycogen; amino acid monomers form proteins. Water is released each time two monomers join in a condensation reaction, and water is consumed when polymers are broken apart by hydrolysis.\n\nThe elements C, H, O and N dominate living tissue, which is why the study of biomolecules sits at the boundary of biology and chemistry.",
        estMinutes: 25,
      },
      {
        slug: "carbohydrates",
        title: "Carbohydrates",
        contentMd:
          "Carbohydrates are hydrates of carbon with the general formula (CH2O)n. Monosaccharides such as glucose and fructose are the simplest sugars; two monosaccharides join to form disaccharides like sucrose and lactose, while long chains form polysaccharides.\n\n| Class | Example | Role |\n| --- | --- | --- |\n| Monosaccharide | Glucose | Immediate energy |\n| Disaccharide | Sucrose | Transport in plants |\n| Polysaccharide | Starch | Energy storage in plants |\n| Polysaccharide | Cellulose | Structural wall material |\n\nGlucose is a six-carbon aldose and the universal fuel of respiration. Plants store surplus glucose as starch, whereas animals store it as glycogen in liver and muscle. Cellulose cannot be digested by humans but provides dietary fibre.",
        estMinutes: 30,
      },
      {
        slug: "proteins-and-amino-acids",
        title: "Proteins and Amino Acids",
        contentMd:
          "Proteins are polymers of amino acids joined by peptide bonds formed between the carboxyl group of one amino acid and the amino group of the next. Twenty different amino acids occur in nature, differing only in their side chains, which determine each protein's shape and function.\n\nProtein structure is described at four levels. The primary structure is the linear sequence of amino acids, the secondary structure forms alpha helices and beta sheets through hydrogen bonding, the tertiary structure folds the whole chain into a compact 3-D shape, and the quaternary structure joins several polypeptide chains together.\n\nDenaturation by heat or pH change destroys higher-level structure without breaking peptide bonds, which is why boiled egg white solidifies permanently.",
        estMinutes: 35,
      },
      {
        slug: "cell-organelles",
        title: "Cell Organelles",
        contentMd:
          "The eukaryotic cell is divided into membrane-bound compartments called organelles, each specialising in one job. The nucleus stores DNA and directs protein synthesis, mitochondria release energy as ATP during aerobic respiration, and ribosomes assemble amino acids into proteins.\n\nThe endoplasmic reticulum transports materials: rough ER studded with ribosomes makes secretory proteins, while smooth ER synthesises lipids. Golgi bodies package these products into vesicles, and lysosomes digest worn-out organelles using hydrolytic enzymes.\n\nChloroplasts, found only in plant cells, carry out photosynthesis. Prokaryotic cells lack all membrane-bound organelles, keeping their single circular chromosome free in the cytoplasm.",
        estMinutes: 30,
      },
    ],
  },
  {
    slug: "stoichiometry",
    title: "Stoichiometry",
    subject: "chemistry",
    description:
      "Quantitative chemistry: the mole concept, molar mass, percentage composition, limiting reagents and calculations based on balanced chemical equations.",
    lessons: [
      {
        slug: "mole-concept",
        title: "The Mole Concept",
        contentMd:
          "A mole is the amount of substance containing as many particles as there are atoms in exactly 12 g of carbon-12. This number, Avogadro's constant, equals 6.022 x 10^23 particles per mole and links the invisible world of atoms to masses measurable on a balance.\n\nNumber of moles = given mass / molar mass = number of particles / 6.022 x 10^23. For gases at STP (0 °C, 1 atm), one mole occupies 22.4 L, giving moles = volume / 22.4 for any ideal gas.\n\nMastering these three conversions — mass, particles and gas volume to moles — is the key skill for every stoichiometric calculation that follows.",
        estMinutes: 30,
      },
      {
        slug: "molar-mass-calculations",
        title: "Molar Mass Calculations",
        contentMd:
          "Molar mass is the mass of one mole of a substance expressed in grams per mole. It is found by summing the atomic masses of every atom in the formula, using values from the periodic table.\n\n| Compound | Formula | Molar mass |\n| --- | --- | --- |\n| Water | H2O | 18 g/mol |\n| Carbon dioxide | CO2 | 44 g/mol |\n| Sulfuric acid | H2SO4 | 98 g/mol |\n| Calcium carbonate | CaCO3 | 100 g/mol |\n\nFor example, H2SO4 contains 2 H (2 x 1), 1 S (32) and 4 O (4 x 16), totalling 98 g/mol. Accurate molar masses feed directly into mole-mass and mole-volume conversions in numerical problems.",
        estMinutes: 25,
      },
      {
        slug: "percentage-composition",
        title: "Percentage Composition",
        contentMd:
          "Percentage composition states the mass contributed by each element in a compound as a percentage of the compound's total molar mass. It answers the question: what fraction of this compound's mass is each element?\n\nPercentage of element = (mass of element in one mole / molar mass of compound) x 100. For ammonia, NH3, nitrogen contributes 14 out of 17 g/mol, so %N = (14/17) x 100 = 82.35%.\n\nExperimental percentage data can also be reversed: dividing each element's percentage by its atomic mass gives mole ratios, which reduce to the empirical formula — the simplest whole-number ratio of atoms in the compound.",
        estMinutes: 25,
      },
      {
        slug: "limiting-reactants",
        title: "Limiting Reactants and Yield",
        contentMd:
          "Reactants rarely combine in exact stoichiometric ratios. The reactant consumed completely first is the limiting reactant; it alone determines the maximum amount of product formed. The leftover excess reactant remains unreacted after the reaction stops.\n\nTo identify the limiter, convert each reactant's mass to moles, divide by its coefficient in the balanced equation, and pick the smaller result. Then base all product calculations on that reactant's quantity.\n\nReal reactions seldom achieve the calculated maximum. Percent yield = (actual yield / theoretical yield) x 100 measures efficiency, and losses arise from incomplete reactions, side reactions and product lost during purification.",
        estMinutes: 30,
      },
    ],
  },
  {
    slug: "vectors",
    title: "Vectors",
    subject: "physics",
    description:
      "Scalar and vector quantities, vector addition and resolution, unit vectors, and the scalar (dot) and vector (cross) products used throughout mechanics.",
    lessons: [
      {
        slug: "scalars-and-vectors",
        title: "Scalars and Vectors",
        contentMd:
          "Physical quantities split into two families. Scalars, such as mass, speed, time, temperature and energy, are fully specified by a magnitude with a unit. Vectors, such as displacement, velocity, acceleration and force, require both magnitude and direction.\n\nA vector is drawn as an arrow whose length shows magnitude and whose head shows direction. Two vectors are equal only if they have equal magnitudes AND identical directions. Multiplying a vector A by -1 reverses its direction, producing -A.\n\nVectors obey commutative addition (A + B = B + A) and associative grouping, which is what makes graphical methods like the triangle law legitimate tools for solving physics problems.",
        estMinutes: 25,
      },
      {
        slug: "vector-addition",
        title: "Vector Addition",
        contentMd:
          "Two vectors add graphically by the triangle law: place the tail of B at the head of A, then draw the resultant from the tail of A to the head of B. For many vectors, extend this to the polygon law.\n\nAnalytically, resolve each vector into perpendicular components: Ax = A cos(theta) along x and Ay = A sin(theta) along y. Sum the components separately, Rx = sum Ax and Ry = sum Ay, then reconstruct the resultant R = sqrt(Rx^2 + Ry^2) with direction theta = tan^-1(Ry/Rx).\n\nSpecial case: two equal forces F separated by angle theta give a resultant 2F cos(theta/2); at theta = 90 degrees the resultant is F sqrt(2), and at 120 degrees three equal forces cancel to zero.",
        estMinutes: 35,
      },
      {
        slug: "resolution-of-vectors",
        title: "Resolution of Vectors",
        contentMd:
          "Any vector can be replaced by two mutually perpendicular component vectors acting along chosen axes — usually horizontal and vertical. If A makes an angle theta with the x-axis, its components are A cos(theta) and A sin(theta). Because cos shrinks faster than sin near 90 degrees, components swap roles depending on the reference axis.\n\nResolution simplifies projectile motion: gravity acts only on the vertical component while the horizontal component stays constant, producing parabolic paths. It equally reduces inclined-plane problems by choosing axes parallel and perpendicular to the slope.\n\nUnit vectors i-hat and j-hat express components algebraically: A = Ax i-hat + Ay j-hat, so adding vectors becomes ordinary arithmetic on coefficients.",
        estMinutes: 30,
      },
      {
        slug: "dot-and-cross-products",
        title: "Dot and Cross Products",
        contentMd:
          "The dot (scalar) product A . B = AB cos(theta) yields a number. Work done by a force is W = F . d, since force and displacement need not align. Dot products commute and A . A = A^2; crucially, A . B = 0 signals perpendicular vectors because cos(90) = 0.\n\nThe cross (vector) product A x B = AB sin(theta) n-hat yields a vector perpendicular to both inputs, directed by the right-hand rule. Torque (tau = r x F) and magnetic force follow this rule. Cross products anticommute: A x B = -(B x A).\n\n| Product | Result | Zero when | Example |\n| --- | --- | --- | --- |\n| Dot | Scalar | Vectors perpendicular | Work W = F.d |\n| Cross | Vector | Vectors parallel | Torque r x F |\n\nMagnitude of cross product equals twice the area of the triangle formed by the two vectors, a handy geometric interpretation.",
        estMinutes: 35,
      },
    ],
  },
  {
    slug: "algebra",
    title: "Algebra",
    subject: "mathematics",
    description:
      "Sets, real numbers, exponents and logarithms, quadratic equations and sequences and series — the core algebra units of Grade 11 basic mathematics.",
    lessons: [
      {
        slug: "sets-and-set-operations",
        title: "Sets and Set Operations",
        contentMd:
          "A set is a well-defined collection of distinct objects. Sets may be written in roster form, listing members inside braces, or set-builder form describing membership by a rule. The number of subsets of a set with n elements is 2^n, including the empty set and the set itself.\n\nUnion (A u B) collects elements in either set, intersection (A n B) keeps only common elements, and complement A' takes everything outside A within the universal set U. Difference A - B holds elements of A absent from B.\n\nDe Morgan's laws link these operations: (A u B)' = A' n B' and (A n B)' = A' u B'. Venn diagrams verify them instantly and solve survey-style counting problems via n(A u B) = n(A) + n(B) - n(A n B).",
        estMinutes: 30,
      },
      {
        slug: "exponents-and-logarithms",
        title: "Exponents and Logarithms",
        contentMd:
          "Exponent laws compress repeated multiplication: a^m x a^n = a^(m+n), a^m / a^n = a^(m-n), (a^m)^n = a^(mn), and a^0 = 1 for any nonzero base. Negative exponents flip fractions: a^-n = 1/a^n.\n\nA logarithm is the inverse question of exponentiation: log_a(x) = y means a^y = x. Logs convert products into sums and powers into factors, which historically powered slide rules and still powers pH, decibel and Richter scales.\n\nKey rules: log(mn) = log m + log n, log(m/n) = log m - log n, log(m^n) = n log m, with log_a(a) = 1 and log_a(1) = 0. Base 10 gives common logs; base e (~2.718) gives natural logs, written ln.",
        estMinutes: 30,
      },
      {
        slug: "quadratic-equations",
        title: "Quadratic Equations",
        contentMd:
          "A quadratic equation ax^2 + bx + c = 0 with a != 0 has at most two real roots, given by the quadratic formula x = (-b +- sqrt(b^2 - 4ac)) / 2a. The expression D = b^2 - 4ac is the discriminant and predicts root behaviour without solving.\n\nIf D > 0 the roots are real and distinct; if D = 0 they are real and equal; if D < 0 no real roots exist (they are complex conjugates). Completing the square derives the formula and also converts quadratics to vertex form for graphing parabolas.\n\nSum of roots = -b/a and product of roots = c/a let you reconstruct equations: x^2 - (sum)x + (product) = 0. These identities shortcut many exam problems asking about symmetric functions of roots.",
        estMinutes: 35,
      },
      {
        slug: "sequences-and-series",
        title: "Sequences and Series",
        contentMd:
          "A sequence is an ordered list following a rule; adding its terms produces a series. In an arithmetic progression (AP) consecutive terms differ by a fixed d, so the nth term is a_n = a + (n-1)d and the first-n sum is S_n = n/2 [2a + (n-1)d].\n\nIn a geometric progression (GP) each term multiplies the previous by ratio r, giving a_n = a r^(n-1) and S_n = a(r^n - 1)/(r - 1) for r != 1. When |r| < 1 the infinite series converges to a/(1 - r).\n\nThe geometric mean G = sqrt(ab) sits between two positives a and b, satisfying G^2 = ab, while the arithmetic mean is (a+b)/2 and always satisfies AM >= GM. Mixed exam questions often test spotting AP vs GP from partial data.",
        estMinutes: 30,
      },
    ],
  },
  {
    slug: "quantity-of-heat",
    title: "Quantity of Heat",
    subject: "physics",
    description:
      "Heat versus temperature, specific heat capacity, calorimetry, thermal expansion and latent heat in phase changes, following the NEB Grade 11 physics syllabus.",
    lessons: [
      {
        slug: "heat-and-temperature",
        title: "Heat and Temperature",
        contentMd:
          "Heat is energy transferred between bodies because of a temperature difference; it flows spontaneously from hotter to colder regions. Temperature measures the average kinetic energy of molecules and determines the direction of heat flow, not the quantity of energy involved.\n\nA sparkler spark (~2000 °C) passing through skin deposits little energy, whereas 100 °C water causes severe burns — proof that temperature alone does not measure heat content. Heat is measured in joules; the calorie persists in older texts, where 1 cal = 4.186 J.\n\nAbsolute zero, 0 K or -273.15 °C, is the theoretical point of minimum molecular motion. The triple point of water, 273.16 K at standard pressure, anchors the Kelvin scale definition.",
        estMinutes: 25,
      },
      {
        slug: "specific-heat-capacity",
        title: "Specific Heat Capacity",
        contentMd:
          "Specific heat capacity c is the heat required to raise the temperature of 1 kg of a substance by 1 K. The governing relation is Q = mc delta-theta, where Q is heat in joules, m mass in kg, and delta-theta the temperature change in kelvin or Celsius degrees (equal intervals).\n\nWater has an exceptionally high specific heat, 4200 J kg^-1 K^-1, moderating coastal climates and making water an effective coolant. Metals typically have small specific heats, around 400 J kg^-1 K^-1 for iron, so they heat quickly.\n\nHeat capacity of a body = mc (J/K), while thermal capacity per unit mass defines c itself. Keep units straight: confusing heat capacity with specific heat capacity is the most common source of error in numericals.",
        estMinutes: 30,
      },
      {
        slug: "thermal-expansion",
        title: "Thermal Expansion",
        contentMd:
          "Most substances expand when heated because increased molecular vibration increases average separation. Solids expand in length (linear expansion), area (superficial expansion) and volume (cubical expansion).\n\nLinear growth follows l = l0(1 + alpha delta-theta), where alpha is the coefficient of linear expansion in K^-1. Area uses beta = 2 alpha and volume uses gamma = 3 alpha, valid for isotropic solids. Railway gaps, bridge expansion joints and bimetallic thermostat strips all exploit controlled expansion.\n\nAnomalously, water contracts from 0 °C to 4 °C, reaching maximum density at 4 °C before expanding again on freezing. This anomaly lets ice float and keeps lake bottoms liquid through winter, preserving aquatic life.",
        estMinutes: 30,
      },
      {
        slug: "latent-heat",
        title: "Latent Heat and Phase Change",
        contentMd:
          "During a phase change temperature stays constant even though heat continues to be absorbed or released. This hidden energy, latent heat, breaks or forms intermolecular bonds rather than raising molecular kinetic energy.\n\nLatent heat of fusion of ice is 334 J/g (80 cal/g): melting 1 g of ice at 0 °C needs 334 J. Latent heat of vaporisation of water is 2260 J/g (540 cal/g), far larger because vapourisation must fully separate molecules. Steam burns are therefore worse than boiling-water burns at the same temperature.\n\nCalorimetry problems combine sensible heat (mc delta-theta) and latent heat (mL) segments sequentially. The principle of calorimetry — heat lost = heat gained in an insulated mixture — balances the two sides to find unknown masses, temperatures or specific heats.",
        estMinutes: 35,
      },
    ],
  },
];

const QUESTION_BANK: SeedQuestionBankEntry[] = [
  { prompt: "SI unit of force?", options: ["Newton", "Joule", "Watt", "Pascal"], correctIndex: 0, explanation: "Force = ma, so kg.m/s^2 is named the newton." },
  { prompt: "Dimensional formula of pressure?", options: ["ML^-1T^-2", "MLT^-2", "ML^2T^-2", "ML^-2T^-1"], correctIndex: 0, explanation: "Pressure = Force/Area = MLT^-2 / L^2." },
  { prompt: "Resultant of two equal forces F at 90 degrees?", options: ["F", "F sqrt2", "2F", "F/2"], correctIndex: 1, explanation: "R = 2F cos(45) = F sqrt2." },
  { prompt: "Dot product of two perpendicular vectors is?", options: ["Maximum", "Zero", "Negative", "Unity"], correctIndex: 1, explanation: "cos 90 = 0, so A.B = 0." },
  { prompt: "Magnitude of a unit vector?", options: ["Zero", "Infinity", "One", "Depends on direction"], correctIndex: 2, explanation: "By definition a unit vector has magnitude 1." },
  { prompt: "1 calorie equals?", options: ["4.186 J", "1 J", "42 J", "1000 J"], correctIndex: 0, explanation: "Mechanical equivalent of heat: 1 cal = 4.186 J." },
  { prompt: "SI unit of specific heat capacity?", options: ["J/kg", "J kg^-1 K^-1", "J K^-1", "kg J K^-1"], correctIndex: 1, explanation: "Q = mc dtheta rearranged gives c in J per kg per K." },
  { prompt: "Unit of coefficient of linear expansion?", options: ["K", "J/K", "K^-1", "Dimensionless"], correctIndex: 2, explanation: "alpha = dl/(l dtheta), so units cancel to per kelvin." },
  { prompt: "Latent heat of fusion of ice?", options: ["80 J/g", "334 J/g", "540 J/g", "2260 J/g"], correctIndex: 1, explanation: "Ice melts at 0 C absorbing about 334 J per gram." },
  { prompt: "Principle of calorimetry states?", options: ["Heat gained = work done", "Heat lost = heat gained", "Temperature stays constant", "Energy is created"], correctIndex: 1, explanation: "In an isolated mixture, losses balance gains." },
  { prompt: "Horizontal range of a projectile is maximum at launch angle?", options: ["30 deg", "45 deg", "60 deg", "90 deg"], correctIndex: 1, explanation: "Range = u^2 sin(2x)/g peaks when 2x = 90." },
  { prompt: "Speed differs from velocity because speed is?", options: ["A vector", "Always negative", "A scalar", "Measured in N"], correctIndex: 2, explanation: "Speed has magnitude only; velocity adds direction." },
  { prompt: "If A.B = 0 for nonzero vectors, they are?", options: ["Parallel", "Antiparallel", "Equal", "Perpendicular"], correctIndex: 3, explanation: "Dot product vanishes only at 90 degrees." },
  { prompt: "Triple point temperature of water?", options: ["273.16 K", "373 K", "0 K", "298 K"], correctIndex: 0, explanation: "Ice, liquid and vapour coexist at 273.16 K." },
  { prompt: "Absolute zero on the Celsius scale is?", options: ["0 C", "-100 C", "-273.15 C", "-459 C"], correctIndex: 2, explanation: "Kelvin zero corresponds to -273.15 C." },
  { prompt: "Moles in 22 g of CO2 (M = 44)?", options: ["0.5", "1", "2", "0.25"], correctIndex: 0, explanation: "n = 22/44 = 0.5 mol." },
  { prompt: "Value of Avogadro's number?", options: ["6.022 x 10^23", "3.011 x 10^23", "9.8 x 10^23", "6.022 x 10^22"], correctIndex: 0, explanation: "Particles per mole of substance." },
  { prompt: "Molar mass of H2SO4?", options: ["96 g/mol", "98 g/mol", "94 g/mol", "100 g/mol"], correctIndex: 1, explanation: "2(1) + 32 + 4(16) = 98." },
  { prompt: "Oxidation number of S in H2SO4?", options: ["+2", "+4", "+6", "-2"], correctIndex: 2, explanation: "2(+1) + S + 4(-2) = 0 gives S = +6." },
  { prompt: "Empirical formula of glucose (C6H12O6)?", options: ["CH2O", "C2H4O", "CHO", "C3H6O3"], correctIndex: 0, explanation: "Simplest whole-number atom ratio is 1:2:1." },
  { prompt: "Possible range of mole fraction is?", options: ["-1 to 1", "0 to 1", "0 to 100", "1 to infinity"], correctIndex: 1, explanation: "A part of a whole lies between 0 and 1." },
  { prompt: "Volume of 1 mol ideal gas at STP?", options: ["24 L", "22.4 L", "11.2 L", "5.6 L"], correctIndex: 1, explanation: "Molar volume at STP is 22.4 litres." },
  { prompt: "The limiting reagent is the reactant that?", options: ["Is left over", "Finishes first", "Is cheapest", "Has least mass"], correctIndex: 1, explanation: "It is consumed completely and caps the yield." },
  { prompt: "Mass of 0.25 mol CaCO3 (M = 100)?", options: ["40 g", "50 g", "25 g", "75 g"], correctIndex: 2, explanation: "0.25 x 100 = 25 g." },
  { prompt: "Molecules in 2 g of H2?", options: ["6.022 x 10^23", "3.011 x 10^23", "12.044 x 10^23", "1.505 x 10^23"], correctIndex: 0, explanation: "2 g H2 is 1 mol = Avogadro's number." },
  { prompt: "Percent of nitrogen in NH3 (N=14, H=1)?", options: ["17.6%", "82.4%", "46.7%", "50%"], correctIndex: 1, explanation: "(14/17) x 100 = 82.4%." },
  { prompt: "Which is NOT a subatomic particle?", options: ["Electron", "Photon", "Proton", "Neutron"], correctIndex: 1, explanation: "Photons are quanta of radiation, not matter particles." },
  { prompt: "Significant figures in 0.00520?", options: ["2", "3", "4", "5"], correctIndex: 1, explanation: "Leading zeros are not significant; 5, 2 and trailing 0 count." },
  { prompt: "Law of multiple proportions compares?", options: ["One element", "Two compounds of same elements", "Mixtures", "Solutions only"], correctIndex: 1, explanation: "Mass ratios combine in simple whole numbers across compounds." },
  { prompt: "Molality is expressed in?", options: ["mol/L", "mol/kg", "g/L", "L/mol"], correctIndex: 1, explanation: "Molality = moles of solute per kg solvent." },
  { prompt: "Powerhouse of the cell?", options: ["Ribosome", "Mitochondrion", "Golgi body", "Lysosome"], correctIndex: 1, explanation: "Mitochondria generate ATP by aerobic respiration." },
  { prompt: "Basic structural unit of life?", options: ["Atom", "Cell", "Tissue", "Organ"], correctIndex: 1, explanation: "The cell is the smallest unit capable of independent life." },
  { prompt: "Monomer of proteins?", options: ["Glucose", "Nucleotide", "Amino acid", "Fatty acid"], correctIndex: 2, explanation: "Amino acids polymerise into polypeptide chains." },
  { prompt: "Bond linking adjacent amino acids?", options: ["Peptide bond", "Glycosidic bond", "Ester bond", "Ionic bond"], correctIndex: 0, explanation: "Condensation between -NH2 and -COOH forms a peptide bond." },
  { prompt: "Sugar present in DNA?", options: ["Ribose", "Deoxyribose", "Glucose", "Fructose"], correctIndex: 1, explanation: "DNA backbone uses deoxyribose lacking one oxygen." },
  { prompt: "Almost all enzymes are chemically?", options: ["Lipids", "Proteins", "Carbohydrates", "Steroids"], correctIndex: 1, explanation: "Enzymes are globular proteins (ribozymes are rare exceptions)." },
  { prompt: "Organelle that synthesises protein?", options: ["Ribosome", "Lysosome", "Vacuole", "Centrosome"], correctIndex: 0, explanation: "Ribosomes translate mRNA into polypeptides." },
  { prompt: "Plant cell walls are chiefly made of?", options: ["Chitin", "Cellulose", "Starch", "Peptidoglycan"], correctIndex: 1, explanation: "Cellulose microfibrils give plant walls strength." },
  { prompt: "Building blocks of fats?", options: ["Amino acids", "Glycerol and fatty acids", "Monosaccharides", "Nucleotides"], correctIndex: 1, explanation: "One glycerol esterifies with up to three fatty acids." },
  { prompt: "Cell theory was proposed by?", options: ["Darwin and Wallace", "Schleiden and Schwann", "Pasteur and Koch", "Mendel and Morgan"], correctIndex: 1, explanation: "Schleiden (1838) and Schwann (1839) formulated cell theory." },
  { prompt: "ATP stands for?", options: ["Adenine tetraphosphate", "Adenosine triphosphate", "Amino triphosphate", "Adenosine thymine phosphate"], correctIndex: 1, explanation: "ATP is adenosine triphosphate, the energy currency." },
  { prompt: "Nitrogenous base found ONLY in RNA?", options: ["Adenine", "Uracil", "Guanine", "Thymine"], correctIndex: 1, explanation: "RNA replaces DNA's thymine with uracil." },
  { prompt: "Which is a prokaryote?", options: ["Amoeba", "Yeast", "Bacterium", "Spirogyra"], correctIndex: 2, explanation: "Bacteria lack a membrane-bound nucleus." },
  { prompt: "General carbohydrate formula?", options: ["CnH2n+2", "(CH2O)n", "CH4", "CnH2nO"], correctIndex: 1, explanation: "Hydrates of carbon follow (CH2O)n." },
  { prompt: "Site of photosynthesis in plant cells?", options: ["Chloroplast", "Nucleus", "Mitochondrion", "Vacuole"], correctIndex: 0, explanation: "Chlorophyll within chloroplasts traps light energy." },
  { prompt: "Value of i squared?", options: ["1", "-1", "i", "0"], correctIndex: 1, explanation: "The imaginary unit satisfies i^2 = -1." },
  { prompt: "Sum of roots of ax^2 + bx + c = 0?", options: ["c/a", "-b/a", "-c/a", "b/a"], correctIndex: 1, explanation: "Vieta: x1 + x2 = -b/a." },
  { prompt: "|3 - 4i| equals?", options: ["5", "7", "1", "sqrt7"], correctIndex: 0, explanation: "sqrt(3^2 + (-4)^2) = 5." },
  { prompt: "log10(100) equals?", options: ["10", "2", "100", "1"], correctIndex: 1, explanation: "10^2 = 100, so the common log is 2." },
  { prompt: "Number of subsets of a set with n elements?", options: ["n^2", "2n", "2^n", "n!"], correctIndex: 2, explanation: "Each element is included or excluded: 2^n choices." },
  { prompt: "Domain of f(x) = sqrt(x)?", options: ["All reals", "x >= 0", "x > 1", "x <= 0"], correctIndex: 1, explanation: "Square roots of negative numbers leave the real domain." },
  { prompt: "nth term of an arithmetic progression?", options: ["a + nd", "a + (n-1)d", "a*r^(n-1)", "nd"], correctIndex: 1, explanation: "First term plus (n-1) common differences." },
  { prompt: "Geometric mean of 4 and 16?", options: ["8", "10", "64", "6"], correctIndex: 0, explanation: "G = sqrt(4 x 16) = 8." },
  { prompt: "Solution of 2^x = 16?", options: ["2", "4", "8", "16"], correctIndex: 1, explanation: "2^4 = 16, so x = 4." },
  { prompt: "Degree of polynomial 4x^3 - 2x + 7?", options: ["1", "2", "3", "7"], correctIndex: 2, explanation: "Highest power of x is 3." },
  { prompt: "Expand (a+b)^2?", options: ["a^2 + b^2", "a^2 - b^2", "a^2 + 2ab + b^2", "a^2 + ab + b^2"], correctIndex: 2, explanation: "Standard binomial square identity." },
  { prompt: "If A = {1,2,3}, how many elements in P(A)?", options: ["3", "6", "8", "9"], correctIndex: 2, explanation: "Power set size is 2^3 = 8." },
  { prompt: "Sum of first n natural numbers?", options: ["n(n+1)/2", "n(n-1)/2", "n^2", "n(n+1)"], correctIndex: 0, explanation: "Classic Gauss pairing result." },
  { prompt: "Discriminant of ax^2 + bx + c = 0?", options: ["b^2 + 4ac", "b^2 - 4ac", "4ac - b^2", "2b - 4ac"], correctIndex: 1, explanation: "D = b^2 - 4ac decides the nature of roots." },
  { prompt: "Value of 0! (zero factorial)?", options: ["0", "1", "Undefined", "Infinity"], correctIndex: 1, explanation: "Empty-product convention sets 0! = 1." },
];

function buildExamQuestions(offset: number): ExamQuestion[] {
  return QUESTION_BANK.slice(offset, offset + 20).map((entry, index) => ({
    id: index + 1,
    prompt: entry.prompt,
    options: entry.options,
    correctIndex: entry.correctIndex,
    explanation: entry.explanation,
  }));
}

function buildExams(): Array<{
  slug: string;
  title: string;
  durationMin: number;
  questions: ExamQuestion[];
}> {
  return [0, 1, 2].map((n) => ({
    slug: `exam-0${n + 1}`,
    title: `NEB Class 11 Mock Exam 0${n + 1}`,
    durationMin: 60,
    questions: buildExamQuestions(n * 20),
  }));
}

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set");
}

if (typeof WebSocket !== "undefined") {
  neonConfig.webSocketConstructor = WebSocket;
}

async function main(): Promise<void> {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const db = drizzle(pool);

  await db.transaction(async (tx) => {
    await tx.delete(lessons);
    await tx.delete(exams);
    await tx.delete(topics);

    let lessonCount = 0;

    for (const topic of TOPIC_SEED) {
      const [inserted] = await tx
        .insert(topics)
        .values({
          slug: topic.slug,
          title: topic.title,
          subject: topic.subject,
          description: topic.description,
        })
        .returning();

      await tx.insert(lessons).values(
        topic.lessons.map((lesson) => ({
          topicId: inserted.id,
          slug: lesson.slug,
          title: lesson.title,
          contentMd: lesson.contentMd,
          estMinutes: lesson.estMinutes,
        })),
      );
      lessonCount += topic.lessons.length;
    }

    await tx.insert(exams).values(buildExams());

    console.log(
      `Seeded ${TOPIC_SEED.length} topics, ${lessonCount} lessons, ${QUESTION_BANK.length} questions in ${buildExams().length} exams`,
    );
  });

  await pool.end();
}

try {
  await main();
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
