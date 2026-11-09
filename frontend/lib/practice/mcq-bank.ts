import type { McqQuestion, SubjectSlug } from "./types";

/**
 * The MCQ bank — four options, four explanations, every question.
 *
 * Rules for adding a question:
 *   1. Exactly four options, one unambiguously correct answer.
 *   2. Every option carries its own explanation. A wrong option's explanation
 *      must say WHAT is wrong with it, not just "no". That single line is the
 *      reason this bank exists — an MCQ without per-option reasoning teaches
 *      nothing once the student gets it wrong.
 *   3. Explanations are plain sentences. No markdown, no "see the note above".
 *   4. `contrasts` only names pairs registered in `lib/practice/contrasts.ts`.
 *
 * The bank is intentionally small and hand-checked rather than generated: a
 * wrong "correct" answer is worse than no question at all.
 */
export const MCQ_BANK: McqQuestion[] = [
  // ── Physics ────────────────────────────────────────────────────────────────
  {
    id: "phy-kin-01",
    classLevel: "class-11",
    subject: "physics",
    unit: "Mechanics",
    topic: "Kinematics",
    difficulty: "easy",
    stem:
      "A student runs exactly one full lap of a circular track of circumference 400 m and stops at the starting point. What are the distance travelled and the displacement?",
    options: [
      { id: "A", text: "Distance 400 m, displacement 0" },
      { id: "B", text: "Distance 0, displacement 400 m" },
      { id: "C", text: "Distance 400 m, displacement 400 m" },
      { id: "D", text: "Distance 0, displacement 0" },
    ],
    correctId: "A",
    explanations: {
      A: "Correct. The runner really covered 400 m of ground, so distance is 400 m. But the start and the finish are the same point, so there is no gap between them and the displacement is zero.",
      B: "Backwards. Distance can never be zero after a full lap, because the runner physically covered the whole track. It is the displacement that collapses to zero at the finish line.",
      C: "Half right. Distance is 400 m, but displacement is not: it measures the straight gap between start and finish, and here those two points are the same place.",
      D: "Both parts are wrong. The distance is definitely not zero, and the displacement is not the only thing that matters — the runner did travel.",
    },
    conceptAnchor:
      "Distance counts the journey; displacement measures only the gap between where you started and where you stopped.",
    contrasts: ["distance-vs-displacement", "speed-vs-velocity"],
  },
  {
    id: "phy-cir-02",
    classLevel: "class-11",
    subject: "physics",
    unit: "Mechanics",
    topic: "Circular motion",
    difficulty: "intermediate",
    stem:
      "A car goes around a circular bend at a steady 40 km/h. Which statement is correct?",
    options: [
      { id: "A", text: "It is accelerating, because its direction of motion keeps changing." },
      { id: "B", text: "It is not accelerating, because its speed is constant." },
      { id: "C", text: "It accelerates only when the driver presses the accelerator." },
      { id: "D", text: "Its velocity is constant, so its acceleration is zero." },
    ],
    correctId: "A",
    explanations: {
      A: "Correct. Velocity is speed with a direction. Even at a steady speed the direction is turning all the time, so the velocity is changing — and any change in velocity is acceleration.",
      B: "This is the classic trap. Constant speed does not mean constant velocity. Only the 'how fast' part is steady; the 'which way' part is not.",
      C: "Acceleration is a physics measurement, not a pedal. Pressing the pedal is one way to accelerate; turning the wheel is another, and it is the one happening here.",
      D: "Velocity is not constant. Its size stays at 40 km/h, but its direction changes at every instant, so the velocity vector is different from moment to moment.",
    },
    conceptAnchor:
      "Acceleration means any change in velocity — speeding up, slowing down, or turning. Turning is acceleration.",
    contrasts: ["acceleration-vs-velocity", "speed-vs-velocity"],
  },
  {
    id: "phy-law-03",
    classLevel: "class-11",
    subject: "physics",
    unit: "Mechanics",
    topic: "Laws of motion",
    difficulty: "easy",
    stem:
      "A loaded truck and a small car collide head-on. Which statement about the forces during the collision is correct?",
    options: [
      { id: "A", text: "The truck pushes the car harder, because it is heavier." },
      { id: "B", text: "The car pushes the truck harder, because it is moving faster." },
      { id: "C", text: "Both exert equal forces on each other, in opposite directions." },
      { id: "D", text: "There is no force, because the two vehicles stop each other." },
    ],
    correctId: "C",
    explanations: {
      A: "Weight decides how much each vehicle's motion changes, not how big the force is. The two forces are partners in one action–reaction pair, so they match.",
      B: "Speed does not tilt the balance either. A fast car and a slow truck still push on each other with the same size of force at every instant of contact.",
      C: "Correct — Newton's third law. Every force comes in a pair: the truck on the car and the car on the truck are equal in size and opposite in direction.",
      D: "The vehicles do not 'cancel' the forces; each one feels a real force. What differs is the effect — the lighter car's motion changes far more.",
    },
    conceptAnchor:
      "Action and reaction are always equal and opposite. The lighter body changes motion more because of its smaller mass — not because the force on it is bigger.",
  },
  {
    id: "phy-work-04",
    classLevel: "class-11",
    subject: "physics",
    unit: "Mechanics",
    topic: "Work, energy and power",
    difficulty: "intermediate",
    stem:
      "A stone tied to a string moves in a horizontal circle at constant speed. What is the work done by the tension in the string over one full revolution?",
    options: [
      { id: "A", text: "Zero, because the tension is always perpendicular to the motion." },
      { id: "B", text: "Maximum, because the tension is the only force acting." },
      { id: "C", text: "Equal to the kinetic energy of the stone." },
      { id: "D", text: "Negative, because the string pulls inward." },
    ],
    correctId: "A",
    explanations: {
      A: "Correct. Work needs force and movement in the same direction. The tension pulls towards the centre while the stone moves along the curve, so the two are at right angles and no work is done.",
      B: "Being the only force does not make the work maximum. A force at 90° to the motion transfers no energy at all, however large it is.",
      C: "The kinetic energy does not change because the speed is constant, which is exactly what zero work predicts. It is not a quantity of work to be paid back.",
      D: "Tension does point inward, but the stone never moves inward — the circle keeps its radius. Pulling without moving along the pull is zero work.",
    },
    conceptAnchor:
      "Work = force × distance moved along the force. A force at right angles to the motion does zero work, which is why circular motion at constant speed needs no energy input.",
  },
  {
    id: "phy-cur-05",
    classLevel: "class-11",
    subject: "physics",
    unit: "Current electricity",
    topic: "Resistance and circuits",
    difficulty: "intermediate",
    stem:
      "Two 6 Ω resistors are connected in parallel across a 12 V battery. What is the total current drawn from the battery?",
    options: [
      { id: "A", text: "1 A" },
      { id: "B", text: "2 A" },
      { id: "C", text: "4 A" },
      { id: "D", text: "12 A" },
    ],
    correctId: "C",
    explanations: {
      A: "This is the current through one branch if you also halve the voltage by mistake. Each branch actually sees the full 12 V, so 12 ÷ 6 = 2 A flows in each.",
      B: "This is the current in a single branch. In parallel both branches work at once, so the battery supplies their sum, not one of them.",
      C: "Correct. Parallel resistors combine as 1/R = 1/6 + 1/6, giving R = 3 Ω. Then I = V/R = 12 ÷ 3 = 4 A. Equivalently, 2 A in each branch, added.",
      D: "This would need a resistance of 1 Ω. Two 6 Ω resistors in parallel must be less than 6 Ω but can never drop to 1 Ω; the equivalent resistance is 3 Ω.",
    },
    conceptAnchor:
      "Parallel resistors share the voltage and split the current. Equivalent resistance is always smaller than the smallest resistor.",
    contrasts: ["series-vs-parallel"],
  },

  // ── Chemistry ──────────────────────────────────────────────────────────────
  {
    id: "chem-redox-01",
    classLevel: "class-11",
    subject: "chemistry",
    unit: "Physical chemistry",
    topic: "Redox reactions",
    difficulty: "easy",
    stem: "In the reaction Zn + Cu²⁺ → Zn²⁺ + Cu, which species is oxidised?",
    options: [
      { id: "A", text: "Zn" },
      { id: "B", text: "Cu²⁺" },
      { id: "C", text: "Cu" },
      { id: "D", text: "Zn²⁺" },
    ],
    correctId: "A",
    explanations: {
      A: "Correct. Zinc starts neutral and ends as Zn²⁺, so it has lost two electrons. Losing electrons is oxidation.",
      B: "Copper ions gain those electrons and become neutral copper. Gaining electrons is reduction, so Cu²⁺ is reduced — the opposite of oxidised.",
      C: "Copper metal is the product of the reduction, not the thing being oxidised. It is what the electrons arrived at.",
      D: "Zn²⁺ is the oxidised form. Zinc only becomes it after the oxidation has already happened, so it cannot be the species that was oxidised.",
    },
    conceptAnchor:
      "Oxidation is losing electrons (oxidation number goes up). Reduction is gaining them, and the two always happen together.",
    contrasts: ["oxidation-vs-reduction"],
  },
  {
    id: "chem-bond-02",
    classLevel: "class-11",
    subject: "chemistry",
    unit: "Physical chemistry",
    topic: "Chemical bonding",
    difficulty: "intermediate",
    stem: "How many sigma (σ) and pi (π) bonds are there in one molecule of ethene, C₂H₄?",
    options: [
      { id: "A", text: "4 σ and 2 π" },
      { id: "B", text: "5 σ and 1 π" },
      { id: "C", text: "6 σ and 0 π" },
      { id: "D", text: "4 σ and 1 π" },
    ],
    correctId: "B",
    explanations: {
      A: "This forgets that every double bond always contains one sigma bond before the pi. The C=C is one sigma plus one pi, not two pi.",
      B: "Correct. Four C–H single bonds plus one C–C sigma bond give 5 σ. The second line of the double bond is a single π bond, so 1 π.",
      C: "This describes a molecule where every bond is single. Ethene has a double bond, and a double bond is never two sigmas.",
      D: "The pi count is right, but one sigma is missing: the C=C still has one sigma component of its own, on top of the four C–H sigmas.",
    },
    conceptAnchor:
      "A single bond is one sigma; a double bond is one sigma plus one pi. Count heads-on overlaps first, then add the sideways ones.",
    contrasts: ["sigma-vs-pi-bond"],
  },
  {
    id: "chem-mol-03",
    classLevel: "class-11",
    subject: "chemistry",
    unit: "Physical chemistry",
    topic: "Solutions",
    difficulty: "intermediate",
    stem:
      "Why does molarity change when a solution is warmed, while molality does not?",
    options: [
      { id: "A", text: "Because molarity counts moles of solute, and heating destroys some solute." },
      { id: "B", text: "Because molarity divides by the solution's volume, which expands on heating." },
      { id: "C", text: "Because molality divides by the volume of the solvent, which is fixed." },
      { id: "D", text: "Because molality uses grams instead of moles." },
    ],
    correctId: "B",
    explanations: {
      A: "Heating does not destroy solute. The number of moles stays exactly the same; it is the bottom half of the fraction that moves.",
      B: "Correct. Molarity = moles of solute ÷ litres of solution. Warm liquid expands, the litre value grows, and so the same moles give a smaller number.",
      C: "Molality divides by the mass of solvent in kilograms, not its volume. Mass does not expand with temperature, which is the whole reason it is stable.",
      D: "Molality does not use grams of solute. It is moles of solute per kilogram of solvent — moles on top, kilograms on the bottom.",
    },
    conceptAnchor:
      "Molarity counts litres of solution (temperature-dependent); molality counts kilograms of solvent (temperature-proof).",
    contrasts: ["molarity-vs-molality"],
  },
  {
    id: "chem-eq-04",
    classLevel: "class-11",
    subject: "chemistry",
    unit: "Physical chemistry",
    topic: "Chemical equilibrium",
    difficulty: "hard",
    stem:
      "For N₂(g) + 3H₂(g) ⇌ 2NH₃(g), what happens to the equilibrium when the pressure is increased at constant temperature?",
    options: [
      { id: "A", text: "It shifts forward, towards ammonia, because there are fewer gas molecules on that side." },
      { id: "B", text: "It shifts backward, because high pressure pushes the reaction apart." },
      { id: "C", text: "Nothing changes, because pressure does not affect equilibria." },
      { id: "D", text: "The reaction stops completely." },
    ],
    correctId: "A",
    explanations: {
      A: "Correct. The left side has 1 + 3 = 4 molecules of gas and the right side has 2. Higher pressure squeezes the system towards the side with fewer gas molecules, which is ammonia.",
      B: "This gets the direction backwards. Squeezing favours the compact side, and here the compact side is the product side with two molecules.",
      C: "Pressure changes nothing only when both sides have the same number of gas molecules. Here it is 4 against 2, so pressure matters a lot.",
      D: "Equilibrium is a balance of rates, not a switch. Changing conditions moves the balance; it does not turn the reaction off.",
    },
    conceptAnchor:
      "Raise the pressure and the equilibrium moves to the side with fewer gas molecules. Count the molecules, not the masses.",
  },

  // ── Biology ────────────────────────────────────────────────────────────────
  {
    id: "bio-cell-01",
    classLevel: "class-11",
    subject: "biology",
    unit: "Cell biology",
    topic: "Cell division",
    difficulty: "easy",
    stem:
      "A human skin cell divides to repair a small cut. How many cells are produced, and how do they compare with the parent cell?",
    options: [
      { id: "A", text: "Two cells, each with 46 chromosomes, identical to the parent." },
      { id: "B", text: "Four cells, each with 23 chromosomes." },
      { id: "C", text: "Two cells, each with 23 chromosomes." },
      { id: "D", text: "Four cells, each with 46 chromosomes." },
    ],
    correctId: "A",
    explanations: {
      A: "Correct. Skin repair is growth and replacement, which is mitosis: one cell makes two identical cells and the chromosome number is kept at 46.",
      B: "Four cells with 23 chromosomes is the product of meiosis, which makes gametes. Skin cells are not gametes and do not halve their chromosomes.",
      C: "The count of cells is right but the chromosome number is not. Halving happens in meiosis, not in the division that heals a cut.",
      D: "Two divisions producing four cells is meiosis again. Mitosis divides once and produces two cells.",
    },
    conceptAnchor:
      "Mitosis: one division, two identical diploid cells, for growth and repair. Meiosis: two divisions, four halved cells, for gametes.",
    contrasts: ["mitosis-vs-meiosis"],
  },
  {
    id: "bio-osm-02",
    classLevel: "class-11",
    subject: "biology",
    unit: "Cell biology",
    topic: "Transport in cells",
    difficulty: "intermediate",
    stem:
      "A plant cell with concentrated cell sap is placed in pure water. What happens?",
    options: [
      { id: "A", text: "Water leaves the cell by osmosis, and it becomes flaccid." },
      { id: "B", text: "Water enters the cell by osmosis, and it becomes turgid." },
      { id: "C", text: "No water moves, because the cell wall blocks it." },
      { id: "D", text: "Solutes move out of the cell until both sides are equal." },
    ],
    correctId: "B",
    explanations: {
      A: "That is what happens in a concentrated salt solution, where the outside has less water than the inside. Pure water is the opposite situation.",
      B: "Correct. Pure water outside has a higher water potential than the concentrated sap inside, so water crosses the membrane inwards and the cell swells up tight against its wall.",
      C: "The cell wall is fully permeable to water. It resists stretching, not entry, which is why the cell becomes firm rather than bursting.",
      D: "The membrane is the barrier, and it is the water that moves across it in osmosis. The dissolved sap stays where it is.",
    },
    conceptAnchor:
      "Osmosis moves water only, from where water is plentiful to where it is scarce — through a membrane.",
    contrasts: ["diffusion-vs-osmosis"],
  },
  {
    id: "bio-photo-03",
    classLevel: "class-11",
    subject: "biology",
    unit: "Plant physiology",
    topic: "Photosynthesis",
    difficulty: "easy",
    stem: "Which statement about photosynthesis is correct?",
    options: [
      { id: "A", text: "It takes in oxygen and gives out carbon dioxide." },
      { id: "B", text: "It stores light energy in glucose and releases oxygen, which comes from water." },
      { id: "C", text: "It happens in the mitochondria of the leaf." },
      { id: "D", text: "The oxygen released comes from carbon dioxide." },
    ],
    correctId: "B",
    explanations: {
      A: "That is respiration. Photosynthesis runs the other way: carbon dioxide goes in and oxygen comes out.",
      B: "Correct. Light energy is trapped and stored in glucose, while oxygen is released — and that oxygen is split off from water, not from carbon dioxide.",
      C: "Mitochondria release energy from glucose; they do not build it. Photosynthesis happens in the chloroplasts, which hold the chlorophyll.",
      D: "The carbon from CO₂ ends up in glucose. Experiments with labelled oxygen show the released O₂ comes from splitting water.",
    },
    conceptAnchor:
      "Photosynthesis stores energy and takes in CO₂; respiration releases energy and gives out CO₂. They are reverse processes.",
    contrasts: ["photosynthesis-vs-respiration"],
  },
  {
    id: "bio-gen-04",
    classLevel: "class-12",
    subject: "biology",
    unit: "Genetics",
    topic: "Mendelian inheritance",
    difficulty: "intermediate",
    stem:
      "Two heterozygous tall pea plants (Tt) are crossed. What fraction of the offspring are expected to show the recessive short phenotype?",
    options: [
      { id: "A", text: "1/2" },
      { id: "B", text: "3/4" },
      { id: "C", text: "1/4" },
      { id: "D", text: "0" },
    ],
    correctId: "C",
    explanations: {
      A: "Half is the chance of a heterozygous Tt offspring. Showing the short trait needs two recessive alleles, which is rarer.",
      B: "3/4 is the fraction that are TALL — the three combinations that contain at least one T. The question asks for the short ones.",
      C: "Correct. Tt × Tt gives TT, Tt, Tt and tt. Only tt is short, so one quarter of the offspring show the recessive phenotype.",
      D: "Zero would need at least one parent to carry only T alleles. Both parents here carry t, so short offspring are quite possible.",
    },
    conceptAnchor:
      "In a Tt × Tt cross: 3/4 tall, 1/4 short, and the 1:2:1 genotype ratio hides behind the 3:1 phenotype ratio.",
    contrasts: ["genotype-vs-phenotype", "mitosis-vs-meiosis"],
  },

  // ── Mathematics ────────────────────────────────────────────────────────────
  {
    id: "math-comb-01",
    classLevel: "class-11",
    subject: "mathematics",
    unit: "Algebra",
    topic: "Permutations and combinations",
    difficulty: "easy",
    stem: "In how many ways can a committee of 2 students be chosen from 5 students?",
    options: [
      { id: "A", text: "20" },
      { id: "B", text: "10" },
      { id: "C", text: "5" },
      { id: "D", text: "25" },
    ],
    correctId: "B",
    explanations: {
      A: "20 is 5 × 4, which treats the order as mattering — choosing A then B as different from B then A. A committee has no first and second place.",
      B: "Correct. Choosing 2 from 5 without order is ⁵C₂ = (5 × 4) ÷ 2 = 10. The division by 2 removes the double counting.",
      C: "5 would be choosing just one student from five, or pairing each student with a fixed partner. It ignores the second seat entirely.",
      D: "25 comes from 5 × 5, which allows the same student to be picked twice. A committee cannot contain the same person in both seats.",
    },
    conceptAnchor:
      "Order matters → permutation. Order does not matter → combination, and divide out the internal arrangements.",
    contrasts: ["permutation-vs-combination"],
  },
  {
    id: "math-fn-02",
    classLevel: "class-11",
    subject: "mathematics",
    unit: "Algebra",
    topic: "Relations and functions",
    difficulty: "intermediate",
    stem:
      "Which of these relations from A = {1, 2, 3} to B = {4, 5, 6} is NOT a function?",
    options: [
      { id: "A", text: "{(1, 4), (2, 5), (3, 6)}" },
      { id: "B", text: "{(1, 4), (2, 4), (3, 4)}" },
      { id: "C", text: "{(1, 4), (2, 5), (1, 6)}" },
      { id: "D", text: "{(1, 6), (2, 5), (3, 4)}" },
    ],
    correctId: "C",
    explanations: {
      A: "This is a function: every input 1, 2 and 3 appears once, each paired with exactly one output.",
      B: "This is still a function. Two inputs are allowed to share the same output — 4 — because each input on its own has only one answer.",
      C: "Correct, this is not a function. The input 1 is paired with both 4 and 6, so one input has two outputs, which a function forbids.",
      D: "This is a function. All three inputs appear once and each has a single output; the outputs merely run in reverse order.",
    },
    conceptAnchor:
      "A function allows many inputs to share one output, but never one input to have two outputs.",
    contrasts: ["relation-vs-function"],
  },
  {
    id: "math-stat-03",
    classLevel: "class-11",
    subject: "mathematics",
    unit: "Statistics",
    topic: "Measures of central tendency",
    difficulty: "intermediate",
    stem:
      "The marks of nine students are 40, 42, 45, 47, 48, 50, 52, 54 and 95. Which measure best describes a typical mark?",
    options: [
      { id: "A", text: "The mean, because it uses every value." },
      { id: "B", text: "The median, because the single mark of 95 pulls the mean upwards." },
      { id: "C", text: "The range, because it shows the spread." },
      { id: "D", text: "The mode, because marks repeat most often." },
    ],
    correctId: "B",
    explanations: {
      A: "The mean does use every value — and that is the problem here. The one mark of 95 drags it up to about 52.6, above eight of the nine students.",
      B: "Correct. The middle value of the sorted list is 48, and one extreme mark barely moves it. That makes it the honest description of a typical student.",
      C: "The range measures spread, not a typical value. It is the gap between 40 and 95, which describes how varied the class is.",
      D: "No mark repeats in this list, so there is no mode at all. A measure that does not exist cannot describe the class.",
    },
    conceptAnchor:
      "The mean follows extremes; the median ignores them. With an outlier in the data, report the median.",
    contrasts: ["mean-vs-median"],
  },
  {
    id: "math-calc-04",
    classLevel: "class-12",
    subject: "mathematics",
    unit: "Calculus",
    topic: "Derivatives",
    difficulty: "easy",
    stem: "If f(x) = x², what is the value of f′(3)?",
    options: [
      { id: "A", text: "3" },
      { id: "B", text: "6" },
      { id: "C", text: "9" },
      { id: "D", text: "0" },
    ],
    correctId: "B",
    explanations: {
      A: "3 is the input, not the slope. Substituting x = 3 into the derivative gives 2 × 3, which is bigger.",
      B: "Correct. The derivative of x² is 2x, so at x = 3 the slope is 2 × 3 = 6.",
      C: "9 is f(3), the value of the function itself. The derivative asks how fast it is changing, not what it equals.",
      D: "A slope of zero belongs to a flat line. x² is curving upwards at x = 3, so it is definitely changing there.",
    },
    conceptAnchor:
      "f(x) gives the height; f′(x) gives the steepness. Substitute the same x into the right one for the question asked.",
    contrasts: ["differentiation-vs-integration"],
  },

  // ── English ────────────────────────────────────────────────────────────────
  {
    id: "eng-fig-01",
    classLevel: "class-11",
    subject: "english",
    unit: "Language",
    topic: "Figures of speech",
    difficulty: "easy",
    stem: "Which sentence contains a simile?",
    options: [
      { id: "A", text: "Her voice was like gravel scraping a road." },
      { id: "B", text: "Her voice was gravel scraping a road." },
      { id: "C", text: "Her voice scraped the silence raw." },
      { id: "D", text: "Her voice, the gravel of the road, rose." },
    ],
    correctId: "A",
    explanations: {
      A: "Correct. The comparison is announced with 'like', which is the marker of a simile.",
      B: "This is a metaphor, not a simile. It says the voice IS gravel, with no 'like' or 'as' to soften the claim.",
      C: "This is personification and vivid verb choice — a voice doing the scraping. There is no explicit comparison word.",
      D: "This is an appositive metaphor: the voice is renamed as 'the gravel of the road'. Again, no 'like' or 'as'.",
    },
    conceptAnchor:
      "Simile says 'like' or 'as'. Metaphor says 'is'. Same comparison, different announcement.",
    contrasts: ["simile-vs-metaphor"],
  },
  {
    id: "eng-voice-02",
    classLevel: "class-11",
    subject: "english",
    unit: "Grammar",
    topic: "Voice",
    difficulty: "easy",
    stem: "Choose the correct passive form of: 'The teacher explains the lesson.'",
    options: [
      { id: "A", text: "The lesson is explained by the teacher." },
      { id: "B", text: "The lesson explains the teacher." },
      { id: "C", text: "The lesson was explained by the teacher." },
      { id: "D", text: "The teacher is explained by the lesson." },
    ],
    correctId: "A",
    explanations: {
      A: "Correct. The object 'the lesson' becomes the subject, the verb becomes 'is explained', and the doer moves behind 'by'.",
      B: "The roles are still active and flipped the wrong way. This says the lesson is doing the explaining.",
      C: "The passive structure is right but the tense is not: 'was' is past, while the original verb 'explains' is present.",
      D: "The object and subject are swapped backwards. In the passive, the thing acted upon comes first — the lesson, not the teacher.",
    },
    conceptAnchor:
      "Passive = object + be + past participle + by + doer. Keep the original tense in the 'be' verb.",
    contrasts: ["active-vs-passive"],
  },
  {
    id: "eng-agree-03",
    classLevel: "class-11",
    subject: "english",
    unit: "Grammar",
    topic: "Subject–verb agreement",
    difficulty: "intermediate",
    stem: "Choose the sentence with correct subject–verb agreement.",
    options: [
      { id: "A", text: "Each of the students have a copy of the book." },
      { id: "B", text: "Each of the students has a copy of the book." },
      { id: "C", text: "Each of the student have a copy of the book." },
      { id: "D", text: "Each of the students are having a copy of the book." },
    ],
    correctId: "B",
    explanations: {
      A: "The verb has agreed with 'students', but the subject is 'each'. 'Each' is singular, so it needs 'has'.",
      B: "Correct. 'Each' is singular even though it is followed by a plural noun, so the singular verb 'has' is required.",
      C: "Two errors. 'Each of the student' needs the plural 'students', and the verb still has to be singular after 'each'.",
      D: "'Each' takes a singular verb, and 'are having' is both plural and the wrong sense — possession here is a state, not an action.",
    },
    conceptAnchor:
      "The verb follows the head word, not the nearest noun. 'Each', 'every' and 'one of' stay singular.",
  },

  // ── Nepali ─────────────────────────────────────────────────────────────────
  {
    id: "nep-shabda-01",
    classLevel: "class-11",
    subject: "nepali",
    unit: "भाषा",
    topic: "शब्द भण्डार",
    difficulty: "easy",
    stem: "'आगो' शब्द कुन वर्गमा पर्छ?",
    options: [
      { id: "A", text: "तत्सम" },
      { id: "B", text: "तद्भव" },
      { id: "C", text: "आगन्तुक" },
      { id: "D", text: "संकर" },
    ],
    correctId: "B",
    explanations: {
      A: "तत्सम शब्द संस्कृतबाट रूप नबदली आउँछ, जस्तै 'अग्नि'। 'आगो' त्यो रूप होइन।",
      B: "सही। 'आगो' संस्कृतको 'अग्नि' बाट रूप बदलेर बनेको हो, त्यसैले यो तद्भव शब्द हो।",
      C: "आगन्तुक शब्द अरू भाषाबाट आउँछ, जस्तै अंग्रेजीको 'स्कुल'। 'आगो' संस्कृतबाट आएको हो।",
      D: "संकर शब्द दुई भाषाका टुक्रा जोडिएर बन्छ, जस्तै 'रेलगाडी'। 'आगो' मा त्यस्तो मिश्रण छैन।",
    },
    conceptAnchor:
      "तत्सम = संस्कृतकै रूप; तद्भव = संस्कृतबाट बदलिएको रूप। 'अग्नि' तत्सम, 'आगो' तद्भव।",
    contrasts: ["tatsam-vs-tadbhav"],
  },
  {
    id: "nep-samas-02",
    classLevel: "class-11",
    subject: "nepali",
    unit: "व्याकरण",
    topic: "समास",
    difficulty: "intermediate",
    stem: "'नीलकमल' मा कुन समास छ?",
    options: [
      { id: "A", text: "द्वन्द्व" },
      { id: "B", text: "कर्मधारय" },
      { id: "C", text: "बहुव्रीहि" },
      { id: "D", text: "द्विगु" },
    ],
    correctId: "B",
    explanations: {
      A: "द्वन्द्वमा दुई वा दुईभन्दा बढी पद समान रूपले जोडिन्छन् र 'र' लोप हुन्छ, जस्तै 'आमाबाबु'। यहाँ विशेषण र विशेष्य छन्।",
      B: "सही। 'नीलो कमल' भन्ने अर्थमा विशेषण ('नील') र विशेष्य ('कमल') जोडिएका छन्, त्यसैले यो कर्मधारय समास हो।",
      C: "बहुव्रीहिमा समस्त पदले तेस्रो अर्थ बुझाउँछ, जस्तै 'चतुर्भुज' (चार हात भएको)। यहाँ अर्थ सिधै कमलकै रहन्छ।",
      D: "द्विगुमा पहिलो पद संख्यावाचक हुन्छ, जस्तै 'त्रिभुवन'। 'नील' संख्या होइन, रङ हो।",
    },
    conceptAnchor:
      "कर्मधारय = विशेषण + विशेष्य (नीलो कमल)। पहिलो पदले दोस्रोलाई चिनाउँछ भने कर्मधारय सम्झ।",
  },
  {
    id: "nep-karak-03",
    classLevel: "class-11",
    subject: "nepali",
    unit: "व्याकरण",
    topic: "कारक र विभक्ति",
    difficulty: "easy",
    stem: "'रामले भात खायो' वाक्यमा 'रामले' कुन कारक हो?",
    options: [
      { id: "A", text: "कर्म" },
      { id: "B", text: "कर्ता" },
      { id: "C", text: "साधन" },
      { id: "D", text: "सम्प्रदान" },
    ],
    correctId: "B",
    explanations: {
      A: "कर्म क्रियाले प्रभावित हुने वस्तु हो — यहाँ त्यो 'भात' हो। 'रामले' काम गर्ने पक्ष हो।",
      B: "सही। काम गर्ने व्यक्ति कर्ता हो, र 'ले' विभक्तिले कर्ता जनाउँछ। यहाँ खाने काम रामले गरेको छ।",
      C: "साधन भनेको काम गर्न प्रयोग हुने वस्तु हो, जस्तै 'कलमले लेख्यो'। राम यहाँ साधन होइनन्।",
      D: "सम्प्रदान दिने/ग्रहण गर्ने पक्ष हो, प्रायः 'लाई' विभक्तिसँग आउँछ, जस्तै 'गरिबलाई दिए'। यहाँ दिने काम छैन।",
    },
    conceptAnchor:
      "कर्ता = काम गर्ने; कर्म = काम परेको; साधन = कामको औजार। क्रियालाई 'कसले?' सोध्दा कर्ता भेटिन्छ।",
  },
];

export function mcqQuestionsForSubject(subject: string): McqQuestion[] {
  return MCQ_BANK.filter((q) => q.subject === subject);
}

export function subjectsWithMcqs(): SubjectSlug[] {
  const seen = new Set<SubjectSlug>();
  for (const q of MCQ_BANK) seen.add(q.subject);
  return [...seen];
}

export function mcqCountBySubject(): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const q of MCQ_BANK) counts[q.subject] = (counts[q.subject] ?? 0) + 1;
  return counts;
}
