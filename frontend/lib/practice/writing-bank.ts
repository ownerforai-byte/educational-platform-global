import type { WritingQuestion } from "./types";

/**
 * The Writing bank — the one free-response type Practice keeps.
 *
 * A writing question is only useful if the student can compare their answer to
 * something real afterwards, so every entry carries three things:
 *   • `modelAnswer`   — a full-credit answer, in exam language.
 *   • `markingPoints` — what the marker actually looks for.
 *   • `contrasts`     — the confusion pairs that decide half the marks, which
 *                       the review screen renders as a side-by-side table.
 *
 * Add questions here, not in a component: the session shell derives everything
 * (counts, marks, XP) from this array.
 */
export const WRITING_BANK: WritingQuestion[] = [
  {
    id: "w-phy-01",
    classLevel: "class-11",
    subject: "physics",
    unit: "Mechanics",
    topic: "Kinematics",
    marks: 5,
    tip: "Name the quantities, then show why one of them can be zero while the other is not.",
    prompt:
      "A bus travels 6 km east, then 8 km north. (a) Find the distance travelled and the displacement. (b) Explain, in your own words, why the two answers differ.",
    modelAnswer:
      "Distance is the total length of the path actually covered, so it is 6 km + 8 km = 14 km. Displacement is the straight-line gap from the starting point to the finishing point, with direction. The two legs are at right angles, so the gap is √(6² + 8²) = √100 = 10 km, directed from the start towards the finishing point. The answers differ because distance adds up every part of the journey, while displacement only compares the two end points. Displacement can therefore be smaller than distance, and it can even be zero for a journey that returns to its start, whereas distance can never be less than the size of the displacement.",
    markingPoints: [
      "Distance = 14 km, with the definition (total path length) stated.",
      "Displacement = 10 km, with the direction given, not just the number.",
      "Use of the right-angle (Pythagoras) relation for the two legs.",
      "Clear statement that distance counts the whole path while displacement compares end points.",
      "Notes that displacement can be zero for a closed journey, but distance cannot.",
    ],
    contrasts: ["distance-vs-displacement", "speed-vs-velocity"],
  },
  {
    id: "w-phy-02",
    classLevel: "class-11",
    subject: "physics",
    unit: "Mechanics",
    topic: "Laws of motion",
    marks: 5,
    prompt:
      "A passenger standing in a bus falls forward when the driver brakes suddenly. Explain what happens to the passenger's body and which law applies, using the idea of inertia.",
    modelAnswer:
      "Before braking, the passenger and the bus are moving with the same velocity. When the brakes are applied, the bus slows because a backward force acts on it, but no backward force acts on the passenger's body. By Newton's first law, a body continues in its state of uniform motion unless an external force acts on it, so the passenger's body keeps its forward velocity while the bus floor slows underneath. The feet are held back by friction with the floor, so the upper body pitches forward. This tendency to resist a change in motion is inertia, and it is larger for a body with more mass. The passenger is not 'thrown' by a force from behind; the bus simply slows first.",
    markingPoints: [
      "States that the passenger and the bus initially share the same velocity.",
      "Identifies that only the bus experiences the braking force.",
      "Quotes Newton's first law in words (motion continues unless an external force acts).",
      "Explains the role of friction at the feet so the body pivots forward.",
      "Defines inertia and links it to mass.",
    ],
    contrasts: ["acceleration-vs-velocity", "mass-vs-weight"],
  },
  {
    id: "w-chem-01",
    classLevel: "class-11",
    subject: "chemistry",
    unit: "Physical chemistry",
    topic: "Chemical bonding",
    marks: 5,
    tip: "Say what happens to the electrons in each case before you name the bond.",
    prompt:
      "Compare ionic and covalent bonding. In your answer, explain how the electrons behave in each and give one physical property that lets you tell the two kinds of compound apart.",
    modelAnswer:
      "An ionic bond forms between a metal and a non-metal. The metal atom transfers one or more electrons to the non-metal, producing a positive cation and a negative anion, and the bond is the electrostatic attraction between these ions. A covalent bond forms between two non-metals, where neither atom is willing to lose electrons, so the atoms share a pair of electrons instead. The physical test is electrical conduction: ionic compounds do not conduct as solids because the ions are locked in a lattice, but they conduct when molten or dissolved because the ions become free to move. Covalent compounds have no free ions, so they generally do not conduct in any state. Ionic compounds also tend to have much higher melting points, because separating a whole lattice of opposite charges takes far more energy than separating molecules.",
    markingPoints: [
      "Ionic: electron transfer between metal and non-metal, forming ions.",
      "Covalent: sharing of an electron pair between non-metals.",
      "Bond nature stated (electrostatic attraction vs shared pair), not just 'they are different'.",
      "Conduction test correctly explained for both states of ionic compounds.",
      "One further property, such as melting point, with a reason.",
    ],
    contrasts: ["ionic-vs-covalent", "sigma-vs-pi-bond"],
  },
  {
    id: "w-chem-02",
    classLevel: "class-11",
    subject: "chemistry",
    unit: "Physical chemistry",
    topic: "Solutions",
    marks: 4,
    prompt:
      "A student prepares a solution by dissolving a known amount of salt in water. Explain why the molarity of this solution changes on a hot day, but its molality does not.",
    modelAnswer:
      "Molarity is the number of moles of solute per litre of solution. On a hot day the solution expands, so the same amount of dissolved salt occupies a slightly larger volume; the denominator grows while the numerator stays the same, and the molarity falls. Molality is the number of moles of solute per kilogram of solvent. Mass does not expand when a liquid is warmed, so the denominator is unchanged and the molality stays exactly the same. This is why molality is preferred in experiments involving temperature change, such as boiling-point elevation, and molarity is preferred for ordinary laboratory work at a known temperature.",
    markingPoints: [
      "Correct formula for molarity (moles per litre of solution).",
      "Explains that volume expands on heating while moles stay constant.",
      "Correct formula for molality (moles per kilogram of solvent).",
      "States that mass does not change with temperature, so molality is temperature-independent.",
    ],
    contrasts: ["molarity-vs-molality", "strong-vs-concentrated-acid"],
  },
  {
    id: "w-bio-01",
    classLevel: "class-11",
    subject: "biology",
    unit: "Cell biology",
    topic: "Cell division",
    marks: 5,
    prompt:
      "Distinguish between mitosis and meiosis. Your answer should cover the number of divisions, the number of daughter cells, the chromosome number, and one place in the human body where each occurs.",
    modelAnswer:
      "Mitosis is a single division that produces two daughter cells. Each daughter cell receives the same number of chromosomes as the parent cell, so a human skin cell with 46 chromosomes produces two cells with 46 chromosomes. It occurs in body (somatic) cells and is responsible for growth, repair and replacement of worn-out cells. Meiosis consists of two successive divisions that produce four daughter cells. Each daughter cell receives half the chromosome number, so a human germ cell produces four gametes with 23 chromosomes each. It occurs only in the reproductive organs — the testes and the ovaries — and its purpose is to make gametes and create genetic variation through crossing over and independent assortment. In short, mitosis copies the chromosome number and meiosis halves it.",
    markingPoints: [
      "Mitosis: one division, two daughter cells.",
      "Mitosis: chromosome number preserved (46 → 46 in humans).",
      "Meiosis: two divisions, four daughter cells.",
      "Meiosis: chromosome number halved (46 → 23), with gametes named.",
      "Correct location for each: somatic cells for mitosis, gonads for meiosis.",
      "Purpose stated: growth/repair versus gamete formation and variation.",
    ],
    contrasts: ["mitosis-vs-meiosis", "genotype-vs-phenotype"],
  },
  {
    id: "w-math-01",
    classLevel: "class-11",
    subject: "mathematics",
    unit: "Algebra",
    topic: "Permutations and combinations",
    marks: 4,
    tip: "Decide first whether swapping two chosen items would create a new result.",
    prompt:
      "A class has 5 boys and 4 girls. A committee of 3 students is to be formed. In how many ways can this be done if the committee must contain exactly 1 boy and 2 girls? Explain why you used combinations and not permutations.",
    modelAnswer:
      "Choose the boy in ⁵C₁ = 5 ways and the two girls in ⁴C₂ = (4 × 3) ÷ 2 = 6 ways. The choices are independent, so the total number of committees is 5 × 6 = 30. Combinations are used because a committee is a selection: choosing Ali first and Bina second gives exactly the same committee as choosing Bina first and Ali second. A permutation would count each of those orders separately and would overcount every committee by the number of ways its members can be arranged (3! = 6).",
    markingPoints: [
      "⁵C₁ = 5 for the boy.",
      "⁴C₂ = 6 for the two girls, with the division by 2! shown or explained.",
      "Multiplies (5 × 6) because the two selections are independent.",
      "Correct final answer: 30.",
      "Explains that order does not matter in a committee, so combinations apply.",
    ],
    contrasts: ["permutation-vs-combination", "relation-vs-function"],
  },
  {
    id: "w-eng-01",
    classLevel: "class-11",
    subject: "english",
    unit: "Language",
    topic: "Figures of speech",
    marks: 4,
    prompt:
      "Explain the difference between a simile and a metaphor, using one original example of each, and say why a writer might choose one over the other.",
    modelAnswer:
      "A simile compares two things and announces the comparison with 'like' or 'as', for example: 'The exam hall was as silent as a sealed room.' A metaphor makes the same kind of comparison without announcing it, stating that one thing is another, for example: 'The exam hall was a sealed room.' The difference is not the comparison itself but the directness: the simile keeps the two things separate and visible, while the metaphor merges them and asks the reader to accept the image outright. A writer chooses a simile when the comparison needs to stay clear and readable, and a metaphor when the image should feel forceful or when the writing should move quickly without pausing to explain.",
    markingPoints: [
      "Simile defined with 'like' or 'as'.",
      "Metaphor defined as a direct statement that one thing is another.",
      "One original example of each, correctly formed.",
      "A reasoned statement about effect or purpose, not just a definition.",
    ],
    contrasts: ["simile-vs-metaphor", "active-vs-passive"],
  },
  {
    id: "w-nep-01",
    classLevel: "class-11",
    subject: "nepali",
    unit: "व्याकरण",
    topic: "शब्द भण्डार",
    marks: 4,
    prompt:
      "तत्सम र तद्भव शब्दबीचको भिन्नता उदाहरणसहित स्पष्ट पार्नुहोस्। कुन अवस्थामा कुन प्रयोग गर्नु उपयुक्त हुन्छ?",
    modelAnswer:
      "तत्सम शब्द संस्कृतबाट जस्ताको तस्तै नेपालीमा आएका शब्द हुन् — तिनको हिज्जे र उच्चारण संस्कृतसँग मिल्छ, जस्तै 'अग्नि', 'सूर्य', 'वायु'। तद्भव शब्द पनि संस्कृतबाटै आएका हुन्, तर बोलीचालीमा घुलमिल हुँदै रूप बदलेका छन्, जस्तै 'अग्नि' बाट 'आगो', 'सूर्य' बाट 'घाम'। भिन्नता यही हो: तत्समको रूप सुरक्षित रहन्छ, तद्भवको रूप बदलिन्छ। औपचारिक लेख, निबन्ध र काव्यमा तत्सम शब्दले गम्भीरता र शिष्टता दिन्छ; दैनिक बोली, संवाद र बालसाहित्यमा तद्भव शब्द बढी स्वाभाविक लाग्छ।",
    markingPoints: [
      "तत्समको परिभाषा — संस्कृतबाट रूप नबदली आएको।",
      "तद्भवको परिभाषा — संस्कृतबाट रूप बदलेर आएको।",
      "दुवैका कम्तीमा दुई जोडा उदाहरण (अग्नि–आगो, सूर्य–घाम)।",
      "प्रयोगको सन्दर्भ — औपचारिक लेखनमा तत्सम, बोलीचालीमा तद्भव।",
    ],
    contrasts: ["tatsam-vs-tadbhav"],
  },
];

export function writingQuestionsForSubject(subject: string): WritingQuestion[] {
  return WRITING_BANK.filter((q) => q.subject === subject);
}
