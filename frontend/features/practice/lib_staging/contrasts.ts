import type { ContrastPair } from "./types";

/**
 * The confusion registry.
 *
 * Every pair here is a place where students lose marks by mixing two ideas up
 * — not a place where they simply forgot a fact. Writing answers render the
 * pairs attached to their topic as a comparison table, so the post-submit
 * screen always ends with "and here is the difference, in one line".
 *
 * Rule for editing this file: `difference` must be readable by a Class 11
 * student standing in a corridor. No jargon that itself needs a definition.
 */
export const CONTRASTS: ContrastPair[] = [
  {
    id: "distance-vs-displacement",
    subject: "physics",
    a: "Distance",
    b: "Displacement",
    aIs: "How much ground you covered in total. It only ever grows, and it has no direction.",
    bIs: "How far you ended up from where you started, plus the direction. It can shrink, and it can be zero.",
    difference:
      "Distance counts every step you take; displacement only looks at your starting point and your ending point.",
  },
  {
    id: "speed-vs-velocity",
    subject: "physics",
    a: "Speed",
    b: "Velocity",
    aIs: "How fast you move, ignoring direction. Always zero or positive.",
    bIs: "How fast you move AND which way. Can be negative, and can be zero while you are still moving.",
    difference:
      "Speed is a number; velocity is a number with an arrow. Run a full lap and your speed was never zero, but your average velocity is.",
  },
  {
    id: "average-speed-vs-average-velocity",
    subject: "physics",
    a: "Average speed",
    b: "Average velocity",
    aIs: "Total distance travelled divided by total time.",
    bIs: "Total displacement divided by total time.",
    difference:
      "Divide by time in both cases — the only change is distance versus displacement on top. That single swap is why a round trip has zero average velocity but a healthy average speed.",
  },
  {
    id: "acceleration-vs-velocity",
    subject: "physics",
    a: "Velocity",
    b: "Acceleration",
    aIs: "How fast position changes.",
    bIs: "How fast velocity changes — in size, in direction, or both.",
    difference:
      "Velocity tells you the motion; acceleration tells you the motion is changing. You can accelerate while moving at a steady speed, if you are turning.",
  },
  {
    id: "mass-vs-weight",
    subject: "physics",
    a: "Mass",
    b: "Weight",
    aIs: "How much matter is in the body. Measured in kilograms. Same everywhere in the universe.",
    bIs: "The pull of gravity on that matter. Measured in newtons. Changes with the planet you stand on.",
    difference:
      "Mass is the body's own amount; weight is gravity's grip on it. Take the same 60 kg student to the Moon: mass stays 60 kg, weight becomes about one-sixth.",
  },
  {
    id: "heat-vs-temperature",
    subject: "physics",
    a: "Heat",
    b: "Temperature",
    aIs: "Energy that moves from a hotter body to a colder one. Measured in joules.",
    bIs: "A measure of how hot something is — the average kinetic energy of its particles. Measured in kelvin or °C.",
    difference:
      "Heat is energy in transit; temperature is a reading of the particles. A bathtub of warm water holds far more heat than a spark, even though the spark is hotter.",
  },
  {
    id: "elastic-vs-inelastic-collision",
    subject: "physics",
    a: "Elastic collision",
    b: "Inelastic collision",
    aIs: "Momentum AND kinetic energy are both conserved.",
    bIs: "Momentum is conserved, but kinetic energy is not — some of it turns into sound, heat or deformation.",
    difference:
      "Momentum is conserved in both. The only question to ask is whether kinetic energy survived; if it did not, the collision was inelastic.",
  },
  {
    id: "series-vs-parallel",
    subject: "physics",
    a: "Series circuit",
    b: "Parallel circuit",
    aIs: "One single path. The same current flows through every component, and voltages add up.",
    bIs: "Several branches. The same voltage sits across every branch, and currents add up.",
    difference:
      "Series shares the current and splits the voltage; parallel shares the voltage and splits the current. Remove one bulb in series and everything goes dark; remove one in parallel and the rest stay lit.",
  },
  {
    id: "oxidation-vs-reduction",
    subject: "chemistry",
    a: "Oxidation",
    b: "Reduction",
    aIs: "Loss of electrons (and usually gain of oxygen). The oxidation number goes up.",
    bIs: "Gain of electrons (and usually loss of oxygen). The oxidation number goes down.",
    difference:
      "Electrons move from the thing being oxidised to the thing being reduced. One loses, one gains — they can never happen alone, which is why we say redox.",
  },
  {
    id: "sigma-vs-pi-bond",
    subject: "chemistry",
    a: "Sigma (σ) bond",
    b: "Pi (π) bond",
    aIs: "Head-on overlap of orbitals, along the line joining the nuclei. Strong, and free to rotate.",
    bIs: "Side-by-side overlap of p orbitals, above and below the axis. Weaker, and locks rotation.",
    difference:
      "Sigma overlap points at the other atom; pi overlap lies alongside it. Every single bond is sigma; a double bond is one sigma plus one pi, and the pi is the one that breaks first.",
  },
  {
    id: "molarity-vs-molality",
    subject: "chemistry",
    a: "Molarity (M)",
    b: "Molality (m)",
    aIs: "Moles of solute per litre of SOLUTION. Changes when the solution warms up and expands.",
    bIs: "Moles of solute per kilogram of SOLVENT. Does not change with temperature.",
    difference:
      "Molarity counts litres of the whole mixture; molality counts kilograms of the liquid doing the dissolving. Because volume drifts with temperature, molality is the one you trust in boiling-point work.",
  },
  {
    id: "strong-vs-concentrated-acid",
    subject: "chemistry",
    a: "Strong acid",
    b: "Concentrated acid",
    aIs: "Ionises almost completely in water. A property of the substance.",
    bIs: "Contains very little water — lots of acid per litre. A property of the particular bottle.",
    difference:
      "Strong is about how completely it splits into ions; concentrated is about how much of it is in the bottle. A dilute solution of a strong acid (like 0.1 M HCl) is still strong, and a concentrated solution of a weak acid is still weak.",
  },
  {
    id: "ionic-vs-covalent",
    subject: "chemistry",
    a: "Ionic bond",
    b: "Covalent bond",
    aIs: "Electrons are transferred from a metal to a non-metal; the ions then attract each other.",
    bIs: "Electrons are shared between two non-metals.",
    difference:
      "Transfer versus sharing. Ionic compounds conduct when molten or dissolved; covalent ones usually do not, because there are no free ions to carry the charge.",
  },
  {
    id: "mitosis-vs-meiosis",
    subject: "biology",
    a: "Mitosis",
    b: "Meiosis",
    aIs: "One division into two identical cells with the same chromosome number. For growth and repair.",
    bIs: "Two divisions into four cells with HALF the chromosome number. For making gametes.",
    difference:
      "Mitosis copies; meiosis halves. A skin cell divides by mitosis and stays diploid; a germ cell divides by meiosis so a sperm or egg carries only one set.",
  },
  {
    id: "dna-vs-rna",
    subject: "biology",
    a: "DNA",
    b: "RNA",
    aIs: "Double strand, deoxyribose sugar, bases A-T-G-C. Stores the instructions and stays in the nucleus.",
    bIs: "Single strand, ribose sugar, bases A-U-G-C. Carries and translates the instructions.",
    difference:
      "DNA is the permanent master copy; RNA is the working photocopy. Two swaps to remember: ribose instead of deoxyribose, and uracil instead of thymine.",
  },
  {
    id: "photosynthesis-vs-respiration",
    subject: "biology",
    a: "Photosynthesis",
    b: "Respiration",
    aIs: "Uses light energy to build glucose from CO₂ and water, releasing oxygen. Happens in chloroplasts.",
    bIs: "Breaks glucose down to release energy, using oxygen and giving out CO₂ and water. Happens in mitochondria.",
    difference:
      "They are each other's reverse: photosynthesis stores energy and takes in CO₂; respiration releases energy and gives out CO₂. Plants do both, all the time.",
  },
  {
    id: "genotype-vs-phenotype",
    subject: "biology",
    a: "Genotype",
    b: "Phenotype",
    aIs: "The actual pair of alleles an organism carries (e.g. Tt).",
    bIs: "The visible trait that results (e.g. tall).",
    difference:
      "Genotype is the written instruction, phenotype is the finished result. Two different genotypes (TT and Tt) can produce the same phenotype.",
  },
  {
    id: "diffusion-vs-osmosis",
    subject: "biology",
    a: "Diffusion",
    b: "Osmosis",
    aIs: "Any particles spreading from high to low concentration. Needs no membrane.",
    bIs: "Only WATER crossing a semi-permeable membrane, from high water potential to low.",
    difference:
      "Osmosis is diffusion with two restrictions added: water only, and through a membrane. Every osmosis is diffusion, but not every diffusion is osmosis.",
  },
  {
    id: "permutation-vs-combination",
    subject: "mathematics",
    a: "Permutation",
    b: "Combination",
    aIs: "Arrangements where ORDER matters. AB and BA count as two.",
    bIs: "Selections where ORDER does not matter. AB and BA count as one.",
    difference:
      "Ask yourself: if I swap two chosen items, do I get a new result? Yes means permutation, no means combination.",
  },
  {
    id: "mean-vs-median",
    subject: "mathematics",
    a: "Mean",
    b: "Median",
    aIs: "Add everything and divide by how many. Sensitive to extreme values.",
    bIs: "The middle value once the data is sorted. Ignores how extreme the extremes are.",
    difference:
      "One outlier drags the mean but barely moves the median. That is why income reports quote the median.",
  },
  {
    id: "differentiation-vs-integration",
    subject: "mathematics",
    a: "Differentiation",
    b: "Integration",
    aIs: "Finds the rate at which something changes — the slope.",
    bIs: "Finds the total accumulated from a rate — the area.",
    difference:
      "They undo each other. Differentiate distance and you get velocity; integrate velocity and you are back at distance.",
  },
  {
    id: "relation-vs-function",
    subject: "mathematics",
    a: "Relation",
    b: "Function",
    aIs: "Any set of ordered pairs. One input may point to several outputs.",
    bIs: "A relation where every input has exactly ONE output.",
    difference:
      "Every function is a relation, but a relation with one input pointing at two outputs is not a function. The vertical-line test is just this rule drawn.",
  },
  {
    id: "accuracy-vs-precision",
    subject: "physics",
    a: "Accuracy",
    b: "Precision",
    aIs: "How close a reading is to the true value.",
    bIs: "How close repeated readings are to each other.",
    difference:
      "Accuracy is about the target; precision is about the grouping. A tight cluster far from the bullseye is precise but not accurate.",
  },
  {
    id: "simile-vs-metaphor",
    subject: "english",
    a: "Simile",
    b: "Metaphor",
    aIs: "A comparison that announces itself with like or as: \"her voice was like gravel\".",
    bIs: "A comparison that states one thing IS another: \"her voice was gravel\".",
    difference:
      "If the sentence can be read literally and still makes sense, it is a simile; if it would be nonsense literally, it is a metaphor.",
  },
  {
    id: "active-vs-passive",
    subject: "english",
    a: "Active voice",
    b: "Passive voice",
    aIs: "The doer is the subject: \"The student solved the problem\".",
    bIs: "The receiver is the subject, with a be + past participle: \"The problem was solved by the student\".",
    difference:
      "Active answers \"who did it?\" first; passive answers \"what happened to it?\" first. Passive is longer and hides the doer more easily.",
  },
  {
    id: "tatsam-vs-tadbhav",
    subject: "nepali",
    a: "तत्सम (Tatsam)",
    b: "तद्भव (Tadbhav)",
    aIs: "संस्कृतबाट जस्ताको तस्तै नेपालीमा आएका शब्द, रूप नबदली (जस्तै: अग्नि, वायु, सूर्य)।",
    bIs: "संस्कृतबाट आउँदा रूप बदलिएका शब्द (जस्तै: आगो, बतास, घाम)।",
    difference:
      "तत्सम शब्दको हिज्जे संस्कृतसँग मिल्छ; तद्भव शब्द बोलीचालीमा घुलमिल भइसकेको हुन्छ — एउटै कुरा दुई रूपमा: 'अग्नि' र 'आगो'।",
  },
];

const BY_ID = new Map(CONTRASTS.map((pair) => [pair.id, pair]));

/** Resolve contrast ids to pairs, dropping any id that is not registered. */
export function resolveContrasts(ids: readonly string[] | undefined): ContrastPair[] {
  if (!ids) return [];
  return ids
    .map((id) => BY_ID.get(id))
    .filter((pair): pair is ContrastPair => Boolean(pair));
}

export function contrastIdsForSubject(subject: string): string[] {
  return CONTRASTS.filter((pair) => pair.subject === subject).map((pair) => pair.id);
}
