/**
 * Class 11 (NEB) Lab Learning Packs — the same standard structure rendered
 * below every class11 lab animation once merged into the main registry.
 */

export type LabLearningPack = {
  proof: {
    title: string;
    case: string;
    steps: { text: string; math?: string }[];
    takeaway: string;
  };
  theory: { heading: string; body: string }[];
  confusions: { wrong: string; right: string; why: string }[];
  questions: { q: string; a: string; hint?: string }[];
};

/** Class 11 packs, keyed by lab id (see lib/lab-registry.tsx). */
export const CLASS11_LEARNING: Record<string, LabLearningPack> = {
  "class11-physics": {
    proof: {
      title: "Proof on a specific case — not the general form",
      case: "Projectile launched at 30 m/s at 60° above horizontal, g = 10 m/s²",
      steps: [
        { text: "Resolve velocity into components:", math: "ux = 30·cos60° = 15 m/s,  uy = 30·sin60° = 25.98 m/s" },
        { text: "Time of flight (up and back down, symmetric):", math: "T = 2·uy/g = 2·25.98/10 = 5.196 s ≈ 5.2 s" },
        { text: "Maximum height — vertical KE exhausted at top:", math: "H = uy²/(2g) = 674.96/20 = 33.75 m" },
        { text: "Horizontal range:", math: "R = ux·T = 15·5.196 = 77.94 m ≈ 77.9 m" },
        { text: "Check with the standard formula:", math: "R = u²·sin(2θ)/g = 900·sin120°/10 = 900·0.866/10 = 77.94 ✓" },
      ],
      takeaway: "Range formula, flight time and max height are all the same two components (ux, uy) wearing different clothes — one resolved launch vector gives every projectile quantity.",
    },
    theory: [
      { heading: "Projectile motion = two independent motions", body: "Horizontal motion is uniform (a = 0, speed stays ux); vertical motion is free-fall under gravity (a = −g). They share the same clock t but never mix — that is why you can solve them separately and combine at the end." },
      { heading: "Symmetry saves the arithmetic", body: "In uniform gravity the ascent time equals the descent time, and the landing speed equals the launch speed. That symmetry is how T = 2uy/g and H = uy²/2g come out so clean." },
    ],
    confusions: [
      { wrong: "A projectile stays in the air longer when launched harder horizontally.", right: "Air time depends only on the VERTICAL component uy (T = 2uy/g). A faster horizontal kick makes it fly farther, not longer.", why: "Students picture the total speed as one blob; only the vertical share controls the clock." },
      { wrong: "At the top of the arc the projectile's speed is zero.", right: "vy = 0 at the top but vx = ux = 15 m/s still — speed is never zero mid-flight.", why: "'Turns around = stops' intuition forgets the horizontal motion keeps racing on." },
      { wrong: "Heavier projectiles always travel farther.", right: "R = u²sin2θ/g has no mass in it — a shot and a pebble with the same u, θ follow the same arc (in vacuum).", why: "Everyday throwing mixes strength (u) with mass; the same arm speed on a heavier ball means less range only because you launch it slower." },
    ],
    questions: [
      { q: "A ball is kicked at 20 m/s, 30° up. How long until it lands? (g = 10)", a: "uy = 20·sin30° = 10 m/s → T = 2·10/10 = 2 s.", hint: "Only the vertical component decides air time." },
      { q: "Two identical launches at θ and 90°−θ have the same range. For θ = 30°, what is the companion angle?", a: "90° − 30° = 60°. Both give R = u²sin(2θ)/g = u²sin60°/g ≈ 0.866·u²/g ✓", hint: "sin(2θ) is symmetric about 45°." },
      { q: "What is the projectile's speed at the top if u = 30 m/s at 60°?", a: "v = vx = 15 m/s (vy = 0). Speed 15 m/s, straight horizontal.", hint: "Horizontal component never changes." },
    ],
  },
  "class11-chemistry": {
    proof: {
      title: "Proof on a specific case — not the general form",
      case: "How many moles, molecules and atoms in 44 g of CO₂?",
      steps: [
        { text: "Molar mass of CO₂:", math: "M = 12 + 2·16 = 44 g/mol" },
        { text: "Moles from mass:", math: "n = m/M = 44/44 = 1 mol" },
        { text: "Molecules via Avogadro:", math: "N = n·NA = 1·6.022·10²³ = 6.022·10²³ molecules" },
        { text: "Atoms — 3 per molecule (1 C + 2 O):", math: "atoms = 3 · 6.022·10²³ = 1.807·10²⁴" },
        { text: "Cross-check: 44 g of CO₂ gas ≈ 22.4 L at STP ✓" },
      ],
      takeaway: "The mole is the bridge from grams (weighable) to particle counts (real): n = m/M turns a measured mass into a number of entities.",
    },
    theory: [
      { heading: "The mole and Avogadro's number", body: "One mole contains NA = 6.022×10²³ particles — chosen so that 1 mole of any substance has a mass in grams equal to its formula mass. That single identity lets chemists count invisibly small particles with a laboratory balance." },
      { heading: "Empirical vs molecular formula", body: "The empirical formula is the smallest whole-number ratio of atoms; the molecular formula is the actual count. Glucose C₆H₁₂O₆ has empirical formula CH₂O. Finding the molecular formula needs the molar mass, not just the ratio." },
    ],
    confusions: [
      { wrong: "Molecules and atoms are the same thing when counting a gas.", right: "A molecule of CO₂ = 3 atoms (1 C + 2 O). 'How many molecules' vs 'how many atoms' differ by the atom count per molecule.", why: "Particles are invisible, so students grab whichever unit sounds familiar." },
      { wrong: "1 mole of any substance has the same mass.", right: "1 mole always has NA particles, but the mass equals the formula mass — 1 mol H₂ = 2 g, 1 mol CO₂ = 44 g.", why: "Moles count particles; grams scale with individual particle mass." },
      { wrong: "Empirical formula is a smaller version of the molecular formula for every compound.", right: "It matches only when the ratio is already simplest (e.g. H₂O). For glucose the empirical CH₂O is NOT the real molecule.", why: "The ratio is confused with the literal molecule." },
    ],
    questions: [
      { q: "How many moles in 18 g of water (H = 1, O = 16)?", a: "M = 18 g/mol → n = 18/18 = 1 mol → 6.022×10²³ molecules.", hint: "Mass ÷ molar mass." },
      { q: "A compound is 40% C, 6.67% H, 53.3% O by mass. Empirical formula?", a: "C: 40/12 = 3.33, H: 6.67/1 = 6.67, O: 53.3/16 = 3.33 → ratio 1:2:1 → CH₂O.", hint: "Divide each % by its atomic mass, then ratio." },
      { q: "If its molar mass is 180, what is the molecular formula of the compound above?", a: "Empirical mass CH₂O = 30; 180/30 = 6× → C₆H₁₂O₆.", hint: "Whole-number multiple of the empirical formula." },
    ],
  },
  "class11-math": {
    proof: {
      title: "Proof on a specific case - not the general form",
      case: "sin(theta)/theta near theta = 0, tan 60, and d/dx(sin x) at x = pi/2",
      steps: [
        { text: "Squeeze theorem intuition: sin(theta) < theta < tan(theta) for small theta, so", math: "cos(theta) < sin(theta)/theta < 1 → limit = 1" },
        { text: "Sanity check with theta = 0.05 rad:", math: "sin(0.05)/0.05 = 0.04998/0.05 = 0.9996 ✓" },
        { text: "Exact trig value:", math: "tan 60 = sin60/cos60 = (sqrt(3)/2)/(1/2) = sqrt(3) ≈ 1.732" },
        { text: "Derivative of sin x from first principles:", math: "d/dx sin x = cos x → at x = pi/2: cos(pi/2) = 0" },
        { text: "Numerical check - slope of sin near pi/2 is flat:", math: "sin(1.56)-sin(1.58) ≈ 0.00006/0.02 ≈ 0.003 ≈ cos(pi/2) = 0 ✓" },
      ],
      takeaway: "The three magic facts - sin(theta)/theta→1, exact tan60, and d/dx sin = cos - are the same local unit-circle geometry inspected from different distances.",
    },
    theory: [
      { heading: "Why sin(theta)/theta → 1 matters", body: "This limit is the hinge of all calculus with trig: every derivative of sine and cosine inherits it. It says for tiny angles sin(theta) ≈ theta - the arch and chord become indistinguishable on the unit circle." },
      { heading: "Radian measure is the natural unit", body: "In radians arclength = r*theta, so a full circle is 2*pi. All trig-derivative formulas are clean exactly because radians make sin(theta)/theta tend to 1; in degrees it becomes pi/180 and every formula gains an ugly factor." },
    ],
    confusions: [
      { wrong: "sin(theta)/theta → 1 means sin(theta) gets bigger than theta for small theta.", right: "It equals 1 as a LIMIT, with sin(theta) always slightly smaller. The ratio asymptotically hugs 1 from below.", why: "'Arrow 1' is read as 'equals and exceeds' instead of 'approaches 1 from below'." },
      { wrong: "tan 60 is a big number because tangent grows fast.", right: "tan 60 = sqrt(3) ≈ 1.732 exactly - tangent is just slope, an ordinary ratio.", why: "The memory of tan blowing up at 90 leaks into 60." },
      { wrong: "The derivative of sin x is 0 at pi/2 because the value (1) is maximum.", right: "The DERIVATIVE (slope) is 0 at the max; the derivative equals cos x, evaluated to cos(pi/2) = 0.", why: "Mixing function value with rate of change - the classic maximum vs slope confusion." },
    ],
    questions: [
      { q: "Estimate sin(0.01 rad) with no calculator.", a: "sin(theta) ≈ theta → 0.01 (actual 0.0099998..., error < 3e-6).", hint: "Use sin(theta)/theta → 1." },
      { q: "What is tan 45? Use the sin/cos definition.", a: "sin45/cos45 = (sqrt(2)/2)/(sqrt(2)/2) = 1.", hint: "Same values cancel." },
      { q: "Where does y = sin x have its steepest slope?", a: "Slope = cos x, max |cos| = 1 at x = 0, pi, 2pi... (crossings of zero).", hint: "Steepest where derivative magnitude peaks." },
    ],
  },
  "class11-biology": {
    proof: {
      title: "Proof on a specific case - not the general form",
      case: "Human cell with 2n = 46: mitosis vs meiosis output",
      steps: [
        { text: "Human somatic cells are diploid:", math: "2n = 46 chromosomes (23 pairs)" },
        { text: "Mitosis - identical copy:", math: "1 parent → 2 daughters, each 2n = 46, genetically identical" },
        { text: "Meiosis - reduction + shuffling:", math: "1 parent → 4 gametes, each n = 23 chromosomes" },
        { text: "Crossing over in prophase I creates new allele combinations:", math: "2^23 possible gamete chromosome arrangements each" },
        { text: "Fertilization restores diploidy:", math: "n + n = 2n → 23 + 23 = 46 ✓" },
      ],
      takeaway: "Mitosis preserves chromosome number (growth/repair), meiosis halves it (gametes) so sexual reproduction keeps the species 2n constant across generations.",
    },
    theory: [
      { heading: "Chromosome number constancy", body: "If gametes were diploid, chromosome numbers would double every generation. Meiosis reduction to n is what keeps 2n stable: the number is restored exactly at fertilization." },
      { heading: "Independent assortment and crossing over", body: "Independent assortment (homologues line up randomly in metaphase I) gives 2^n gamete combos; crossing over recombines alleles within chromosomes. Both are why meiosis produces 4 genetically UNIQUE haploids, not 4 copies." },
    ],
    confusions: [
      { wrong: "Meiosis produces 4 identical cells like mitosis does.", right: "Mitosis → identical diploids; meiosis → 4 unique haploids (n = 23 each, shuffled by crossing over + assortment).", why: "Both divide cells, so students treat outputs as the same." },
      { wrong: "A 2n = 46 species gametes still have 46 chromosomes inside them.", right: "Gametes have 23 - the 46 is restored only when two gametes fuse.", why: "Sperm/egg carry the full species plan conflates genetic info with chromosome count." },
      { wrong: "Crossing over happens in mitosis.", right: "Crossing over is a hallmark of MEIOSIS (prophase I) - in mitosis homologues dont pair up to exchange segments.", why: "Both divide; the pairing step that enables crossing over is meiosis-only." },
    ],
    questions: [
      { q: "How many chromosomes in a human sperm cell?", a: "n = 23 - half of 46.", hint: "Gametes are haploid." },
      { q: "If a horse cell is 2n = 64, what is n in its egg?", a: "n = 32.", hint: "Halve the diploid number." },
      { q: "Why must meiosis halve the count before fertilization?", a: "So n + n = 2n is restored; otherwise chromosome number doubles each generation.", hint: "Add the two gametic contributions." },
    ],
  },
};
