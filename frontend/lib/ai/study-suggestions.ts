export type SuggestionCategory =
  | "Physics"
  | "Chemistry"
  | "Biology"
  | "Mathematics"
  | "नेपाली"
  | "Grammar"
  | "World & History"
  | "Earth & Space";

export interface StudySuggestion {
  category: SuggestionCategory;
  text: string;
}

const SUGGESTIONS: Record<SuggestionCategory, string[]> = {
  Physics: [
    "How do velocity, acceleration and force connect in a free-body diagram?",
    "Compare electric and gravitational fields in a compact table.",
    "Trace energy changes in a pendulum from one extreme to the other.",
    "Why does a satellite remain in orbit? Connect gravity and orbital speed.",
    "Build a concept tree linking current, resistance and electrical power.",
    "Explain why the sky is blue using Rayleigh scattering.",
    "Derive the lens-maker formula and explain its sign convention.",
    "What changes in a transformer cause energy losses?",
    "Compare series and parallel circuits using current and voltage.",
    "When does friction change mechanical energy into thermal energy?",
    "How do wavelength, frequency and wave speed relate?",
    "Show how a prism separates white light into a spectrum.",
  ],
  Chemistry: [
    "Compare ionic, covalent and metallic bonding by particles and properties.",
    "How do concentration, pressure and temperature shift equilibrium?",
    "Why is benzene unusually stable? Link resonance to its ring structure.",
    "Build a reaction tree for alcohol oxidation under different conditions.",
    "Connect oxidation number, electron transfer and redox identification.",
    "Distinguish reaction rate, activation energy and catalysts with examples.",
    "How does a buffer resist changes in pH? Show the key relationship.",
    "Compare SN1 and SN2 by steps, rate law and stereochemistry.",
    "Trace how the mole connects particles, mass and gas volume.",
    "Use Le Chatelier's principle to predict a Haber-process shift.",
    "How do hybridization and electron pairs predict molecular shape?",
    "Compare exothermic and endothermic profiles in a labeled diagram.",
  ],
  Biology: [
    "Compare mitosis and meiosis by stages, chromosome number and purpose.",
    "Trace energy through a food chain and show where the 10% rule applies.",
    "Build a compact tree classifying plant groups from bryophytes to angiosperms.",
    "How do DNA, genes and chromosomes relate? Explain with a hierarchy.",
    "Follow blood through the heart and lungs; name each chamber and valve.",
    "Compare natural selection and genetic drift with a population example.",
    "Trace DNA replication and explain the role of its main enzymes.",
    "Build a flow diagram from light absorption to glucose production.",
    "How do genotype, phenotype and environment interact?",
    "Compare arteries, veins and capillaries in a short table.",
    "Show the stages of a flowering plant life cycle with ploidy.",
    "How do vaccines prepare immune memory without causing the disease?",
  ],
  Mathematics: [
    "Compare continuity and differentiability using definitions and a counterexample.",
    "Build a decision tree for choosing a method to evaluate a limit.",
    "What does a determinant measure, and when does a matrix have an inverse?",
    "Show how dot and cross products answer different geometric questions.",
    "Connect a derivative's sign to increasing, decreasing and turning points.",
    "How do roots, factors and the graph of a quadratic connect?",
    "Compare arithmetic and geometric sequences with their sum formulas.",
    "How does completing the square reveal a parabola's vertex?",
    "Build a tree linking permutations, combinations and probability.",
    "When are two vectors perpendicular? Show the dot-product test.",
    "Explain what a derivative means on a position-time graph.",
    "Compare the trapezoidal rule with Simpson's rule and their errors.",
  ],
  नेपाली: [
    "उपसर्ग र प्रत्ययले शब्दको अर्थ कसरी बदल्छन्? उदाहरणसहित देखाउनुहोस्।",
    "समासका प्रकारलाई रुख-चित्रमा देखाई प्रत्येकको उदाहरण दिनुहोस्।",
    "मुख्य विचार, प्रमाण र निष्कर्ष छुट्याएर अनुच्छेदको सार लेख्नुहोस्।",
    "विभक्ति र प्रयोगबीचको फरक छोटो तालिकामा देखाउनुहोस्।",
    "औपचारिक पत्रका मुख्य भाग र तिनको क्रम बताउनुहोस्।",
    "तत्सम, तद्भव र आगन्तुक शब्द उदाहरणसहित तुलना गर्नुहोस्।",
    "वाक्यमा कर्ता, कर्म र क्रियाको सम्बन्ध कसरी पहिचान गर्ने?",
    "निबन्धको रूपरेखा बनाउन विचारदेखि निष्कर्षसम्मका चरण देखाउनुहोस्।",
    "स्वर र व्यञ्जन वर्णलाई उच्चारणका आधारमा वर्गीकरण गर्नुहोस्।",
    "मुहावरा र लोकोक्तिलाई अर्थ र प्रयोगबाट तुलना गर्नुहोस्।",
    "अनुच्छेदलाई स्पष्ट र सुसम्बद्ध बनाउने उपाय के हुन्?",
    "वाक्यका प्रकारलाई एउटा सरल वर्गीकरण-रुखमा देखाउनुहोस्।",
  ],
  Grammar: [
    "Compare active and passive voice with a transformation table.",
    "Build a tree showing phrase, clause and sentence relationships.",
    "Turn one claim into a concise paragraph with evidence and a conclusion.",
    "How do prefixes and suffixes change a word's meaning and grammar?",
    "Distinguish finite and non-finite verbs using short examples.",
    "Compare simple, compound and complex sentences in a table.",
    "How does subject–verb agreement work with collective nouns?",
    "Show how a direct statement changes in reported speech.",
    "Build a compact decision tree for choosing English tenses.",
    "How do topic sentences and transitions make a paragraph coherent?",
    "Compare clauses and phrases by their structure and function.",
    "How do punctuation choices change the meaning of a sentence?",
  ],
  "World & History": [
    "Compare primary and secondary historical sources, and how historians test them.",
    "Trace how citizenship changed from the ancient world to modern democracies.",
    "How do cause, evidence and consequence fit into a historical explanation?",
    "Build a timeline connecting industrialization, urbanization and reform.",
    "Compare equality before the law with equality of opportunity.",
    "How do historians distinguish correlation from causation in an event?",
    "Trace the development of human rights from early codes to the present.",
    "Compare oral history, archives and archaeology as forms of evidence.",
    "How did printing change the spread of knowledge and political ideas?",
    "Build a cause-and-effect tree for a major social reform movement.",
    "Compare monarchy, oligarchy and democracy by who holds power.",
    "How do historians use timelines without confusing sequence and cause?",
  ],
  "Earth & Space": [
    "Compare divergent, convergent and transform plate boundaries in a table.",
    "How do stars form, live and end? Draw a compact life-cycle tree.",
    "Connect redshift, Hubble's law and the expanding universe.",
    "Why do seasons change? Separate Earth's tilt from its distance to the Sun.",
    "Trace the water cycle and show where energy drives each change.",
    "Compare weather and climate using timescale, evidence and examples.",
    "How does seafloor spreading support plate tectonics?",
    "Build a tree showing the layers inside Earth and their properties.",
    "Compare rocky planets and gas giants by composition and structure.",
    "How do latitude and solar angle affect climate zones?",
    "Trace how a nebula becomes a star and then a stellar remnant.",
    "How do fossils and rock layers reveal Earth's relative history?",
  ],
};

export const TUTOR_SUGGESTION_CATEGORIES: SuggestionCategory[] = [
  "Physics",
  "Chemistry",
  "Biology",
  "Mathematics",
  "नेपाली",
  "Grammar",
];

export const CHAT_SUGGESTION_CATEGORIES: SuggestionCategory[] = [
  "Physics",
  "Chemistry",
  "Biology",
  "Mathematics",
  "World & History",
  "Earth & Space",
];

export function createSuggestionDeck(
  categories: SuggestionCategory[],
  count: number,
  previousTexts: string[] = [],
  random: () => number = Math.random,
): StudySuggestion[] {
  const previous = new Set(previousTexts);
  const shuffle = <T,>(items: T[]): T[] => {
    const shuffled = [...items];
    for (let i = shuffled.length - 1; i > 0; i -= 1) {
      const j = Math.floor(random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const selected: StudySuggestion[] = [];
  const seen = new Set<string>();
  const perCategory = Math.ceil(count / Math.max(1, categories.length));

  for (const category of shuffle(categories)) {
    const fresh = shuffle(SUGGESTIONS[category].filter((text) => !previous.has(text)));
    for (const text of fresh.slice(0, perCategory)) {
      selected.push({ category, text });
      seen.add(text);
    }
  }

  if (selected.length < count) {
    const remainder = shuffle(
      categories.flatMap((category) =>
        SUGGESTIONS[category]
          .filter((text) => !seen.has(text))
          .map((text) => ({ category, text })),
      ),
    );
    selected.push(...remainder.slice(0, count - selected.length));
  }

  return shuffle(selected).slice(0, count);
}
