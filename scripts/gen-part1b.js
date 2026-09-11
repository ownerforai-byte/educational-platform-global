// Part B: grammar hacks (remaining fields) + write
const hacks = global.hacks;
Object.assign(hacks, {
  confusion: [
    "❌ 'Each of the players have a jersey.' ✅ 'Each... HAS' — each/every/either/neither are always singular.",
    "❌ 'The scissors is on the table.' ✅ Pair nouns (scissors, trousers) are ALWAYS plural.",
    "❌ 'He said that he will come.' ✅ Backshift after past reporting verbs: 'he WOULD come'.",
    "❌ 'If I will see him, I will tell him.' ✅ Never put will inside the if-clause.",
    "❌ 'One of my friend is here.' ✅ 'One of + PLURAL noun + SINGULAR verb.'"
  ],
  practice: [
    "Spot and correct: 'Neither of the two answers are correct.' (is)",
    "Passivise: 'Someone has stolen my bicycle.' (My bicycle has been stolen.)",
    "Indirect speech: He said, 'I am writing a letter now.' (He said that he was writing a letter then.)",
    "Conditional: If I ___ (be) a bird, I would fly to Lumbini. (were — Type 2)",
    "Question tag: 'The students have finished their work.' (haven't they?)"
  ],
  universalFacts: [
    "Subject-verb agreement and tense consistency account for nearly half of all error-spotting questions in NEB English.",
    "The 'each/every + singular' rule is absolute: 'Every one of the students was present.'",
    "Backshifting in reported speech encodes distance — time, place and certainty all shift one step back together."
  ],
  animation3D: "writing-and-composition",
  motionGraphics: "writing-and-composition",
  examples: [
    "Crossing out 'of the' phrases to find the true subject in an S-V question",
    "Using the 5-step scan order on an error-spotting passage in under two minutes",
    "Applying the backshift table to convert direct speech into reported speech"
  ],
  practiceQuestions: [
    "Q1. 'The quality of the mangoes ___ (was/were) not good.' Choose and justify.",
    "Q2. Rewrite in reported speech: She said, 'I visited the temple yesterday.'",
    "Q3. Correct the error: 'Walking through the forest, the birds sang sweetly.'"
  ],
  formulas: [
    "S-V rule: the verb agrees with the HEAD noun, ignoring of-phrases.",
    "Backshift: present→past→past perfect; will/can/may→would/could/might.",
    "Conditional ladder: Type 1 if+present/will; Type 2 if+past/would; Type 3 if+had V3/would have V3."
  ],
  keyPoints: [
    "Find the true subject before choosing the verb.",
    "Indefinite pronouns (each, every, everyone, either, neither) are singular.",
    "Never use will/would inside the if-clause.",
    "In reported speech, shift tense, time and place words one step back."
  ],
  summary: "Grammar hacks compress the grammar syllabus into the form exam questions actually test: true-subject finding, the backshift, the conditional ladder, article and preposition micro-rules, and a fixed error-spotting scan order.",
  specialNotes: [
    "Practise hacks against past-paper questions — the goal is speed under exam time.",
    "Pair with the Grammar Master Mindmap: mindmap for structure, hacks for execution."
  ],
  importantStatements: [
    "A verb agrees with its subject, not with the nearest noun.",
    "Only transitive verbs have passive forms.",
    "Formal Type 2 conditionals use 'were' for all persons: 'If I were you...'"
  ],
  importantNotes: [
    "These shortcuts do not replace the grammar topics — they compress them for exam execution."
  ],
  examShortTricks: [
    "Scan order: agreement → tense → preposition → article → pronoun.",
    "'One of + plural noun + singular verb.'",
    "'The + comparative..., the + comparative...' (The higher you climb, the colder it gets.)",
    "Fixed pairs: Hardly/Scarcely ... when; No sooner ... than."
  ]
});
global.fs.writeFileSync(global.dir + "01-grammar-hacks-and-shortcuts.json", JSON.stringify(hacks, null, 2) + "\n");
console.log("grammar-hacks-and-shortcuts.json created");