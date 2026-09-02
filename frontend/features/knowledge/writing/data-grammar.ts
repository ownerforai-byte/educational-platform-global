import type { WritingType } from "./types";

export const WRITING_GRAMMAR_TYPES: WritingType[] = [
  {
    id: "grammar-sentence-types",
    name: "Sentence Types & Connecting Ideas",
    category: "Grammar for Writing",
    icon: "🧱",
    concept:
      "Grammar is how you connect ideas so the reader never has to guess. The four sentence types (simple, compound, complex, compound-complex) are not vocabulary — they are TOOLS for emphasis and rhythm. Understanding WHY you choose one over the other is what separates fluent writing from a flat list of short sentences.",
    format: [
      {
        label: "Simple sentence — one clause",
        detail:
          "Subject + verb + object/complement. Use it for POWER: a short, clean statement lands hard after longer sentences.",
        example: "The monsoon arrived.",
      },
      {
        label: "Compound sentence — two main clauses",
        detail:
          "Two independent clauses joined by and/but/or/so + comma, or by a semicolon. Use it to give two equal ideas equal weight.",
        example: "The monsoon arrived, and the farmers rejoiced.",
      },
      {
        label: "Complex sentence — main + subordinate clause",
        detail:
          "One independent clause + one dependent clause (because, although, when, which, if). Use it to show cause, contrast, time, or condition — the relation between ideas.",
        example: "Although the monsoon was late, the farmers did not lose hope.",
      },
      {
        label: "Varying the rhythm",
        detail:
          "Exam answers that are all one type feel robotic. Mix: short emphatic + longer explanatory + medium linking sentence.",
        example: "The rain stopped. Fields that had waited all month drank greedily until dusk.",
      },
    ],
    startings: [
      "What matters is not … but …",
      "It is true that …; however, …",
      "While some argue …, others point out …",
    ],
    connectors: [
      "because / since / as (cause)",
      "although / though / even though (contrast)",
      "when / while / before / after (time)",
      "if / unless / provided that (condition)",
      "which / who / that (giving detail about a noun)",
    ],
    example:
      "Compare: 'Pollution is bad. It harms health. The government should act.' → 'Pollution is more than an eyesore: because it silently damages lungs and rivers alike, the government should treat it as an emergency, not a routine complaint.'",
    grammar: [
      "Dependent clauses cannot stand alone — they NEED the main clause. 'Because the monsoon was late' alone is a fragment.",
      "Commas have a logic: put a comma before and/but/so when they join two full sentences; no comma when they join two words or short phrases.",
      "Semicolons join two complete sentences that are closely related and parallel in weight.",
      "Subordinating conjunctions RANK one idea below the other; coordinating conjunctions give equal rank. Choose which idea deserves emphasis.",
    ],
    tips: [
      "Deliberately end body paragraphs with a short decisive sentence.",
      "If you cannot explain why you picked 'although' vs 'but', you have not mastered sentence types yet.",
      "One complex sentence per paragraph is the baseline for NEB top-band writing.",
    ],
  },
  {
    id: "grammar-clauses-phrases",
    name: "Clauses & Phrases",
    category: "Grammar for Writing",
    icon: "🧩",
    concept:
      "Every idea-block in a sentence is either a phrase (no verb) or a clause (has a subject-verb pair). Knowing which is which lets you build sentences confidently and diagnose your own awkward ones. This is the machinery behind every long, correct sentence you write.",
    format: [
      {
        label: "Phrase — a group without a full verb",
        detail:
          "Noun, verb, adjective, adverb or prepositional phrase. Phrases add detail; they cannot stand alone as sentences.",
        example: "under the old banyan tree",
      },
      {
        label: "Independent clause",
        detail: "A full subject + verb + complete meaning. It CAN stand alone as a sentence.",
        example: "The children played.",
      },
      {
        label: "Dependent clause",
        detail:
          "A subject + verb but NOT complete meaning — it leans on the main clause. It starts with a subordinator or relative word.",
        example: "because it had rained all morning",
      },
      {
        label: "Relative clause (adjective clause)",
        detail:
          "Modifies a noun and begins with who/which/that/whose/where. 'The river, whose banks were littered, still flows.'",
      },
    ],
    startings: ["Given that …, it is fair to conclude that …"],
    connectors: ["which / who / that / whose / where", "because / although / when / if / unless", "in spite of / due to / apart from (phrases)"],
    example:
      "Combine: 'The road was new. It carried heavy trucks. It cracked within a year.' → 'The new road, which carried heavy trucks daily, cracked within a year.' (2 ideas → 1 complex sentence)",
    grammar: [
      "A phrase can never be a sentence by itself — 'Under the old banyan tree' is a fragment.",
      "A dependent clause + period = a fragment error ('Because it rained.').",
      "Relative clauses need commas when they add EXTRA info (non-essential), not when they identify which one.",
      "Trick: if you can put 'that' instead of 'which/who' in a defining clause, no comma.",
    ],
    tips: [
      "Spot fragments by the 'test': read each sentence alone — if it leaves a question dangling, fix it.",
      "Upgrade two simple sentences into one relative-clause sentence at least once per paragraph.",
    ],
  },
  {
    id: "grammar-punctuation",
    name: "Punctuation & Capitalisation",
    category: "Grammar for Writing",
    icon: "🔤",
    concept:
      "Punctuation is road-sign language: it tells the reader where to pause, what belongs together, and who is speaking. In NEB writing, punctuation marks are often worth dedicated marks — and a comma splice or absent full stop costs more than a spelling slip.",
    format: [
      {
        label: "Full stop, comma, question mark",
        detail:
          "Full stop = one complete thought ends. Comma = soft pause separating list items, after openers, and before 'and/but/so' in compound sentences. Question mark = direct question only.",
      },
      {
        label: "Semicolon & colon",
        detail:
          "Semicolon between two balanced sentences; colon to introduce a list, example, or explanation.",
        example: "The causes are clear: smoke, sewage, and silence.",
      },
      {
        label: "Apostrophe",
        detail:
          "Ownership (Rabin's book) AND contractions (it's = it is). The trap: its (belonging to it) has NO apostrophe.",
      },
      {
        label: "Quotation marks",
        detail:
          "Direct speech and quoted words: 'He said, \"I will come.\"' — comma before the quote, capital after the opening quote.",
      },
      {
        label: "Capitalisation",
        detail:
          "First word of a sentence, proper nouns (Kathmandu, Dashain, Monday), 'I', and the first word inside a quotation. Never random capitals for emphasis.",
      },
    ],
    startings: ["Consider one example: …", "The result was inevitable: …"],
    connectors: ["i.e. (that is)", "e.g. (for example)", "namely,", "that is,"],
    example:
      "Wrong: 'he came late he missed the exam' → Right: 'He came late, so he missed the exam.' Another: 'the teachers the students agree' → 'The teachers and the students agree.'",
    grammar: [
      "Comma splice error: joining two full sentences with only a comma. Fix with a full stop, semicolon, or 'and/but/so'.",
      "Comma after openers: 'In recent years, pollution has worsened.' (comma helps the reader breathe).",
      "Colon introduces; semicolon connects. Use ':' then a list or explanation; ';' between two full sentences.",
      "Its vs it's: 'its' = belonging to it; 'it's' = it is. This pair is the most-tested apostrophe trap in NEB grammar.",
      "Within quotation: capitalise the first word of the quoted speech regardless of where the quote begins.",
    ],
    tips: [
      "Read your answer aloud — where you naturally pause, you probably need a comma or full stop.",
      "In formal writing, avoid contractions fully (do not, cannot, it is).",
      "Adopt ONE style for lists and stay consistent (Oxford comma or not — be consistent).",
    ],
  },
  {
    id: "grammar-tenses-agreement",
    name: "Tenses, Agreement & Articles",
    category: "Grammar for Writing",
    icon: "⏳",
    concept:
      "Tense errors collapse otherwise excellent writing, because the reader cannot tell WHEN things happen. The writing grammar that matters: choose the right tense for the task (essay/report in present or past deliberately), keep subjects agreeing with verbs, and use articles precisely. Master the logic, and the marks follow.",
    format: [
      {
        label: "Choosing a tense zone",
        detail:
          "Essays/articles = present simple for general truths; reports = past simple; predictions = will/would. Pick ONE zone per paragraph and stay in it.",
        example: "Essays: 'Pollution harms health.'  Reports: 'The event was held on Friday.'",
      },
      {
        label: "Subject–verb agreement",
        detail:
          "Singular subject → singular verb; plural → plural. The tricky ones: 'each/every/one of' → singular verb; company names → singular verb.",
        example: "Each of the students was present. / The committee has decided.",
      },
      {
        label: "Articles (a/an/the)",
        detail:
          "'a' before consonant SOUND, 'an' before vowel SOUND; 'the' for specific/known items and superlatives; no article for general plurals.",
        example: "an honest answer (h is silent), a university (yoo sound), the highest tower.",
      },
      {
        label: "Sequence of tenses",
        detail:
          "When reporting speech, verbs shift back: 'He said he was coming' (not 'is coming'). Keep this shift consistent across the whole reported passage.",
      },
      {
        label: "Conditionals in writing",
        detail:
          "Type 1 (if + present, will + base) for real future; Type 2 (if + past, would + base) for imaginary present; Type 3 (if + had, would have) for imaginary past.",
      },
    ],
    startings: ["One thing is certain: …", "Had we realised earlier, …", "What would happen if …?"],
    connectors: ["if ... then ...", "provided that ...", "unless ...", "as a result of ...", "in the event that ..."],
    example:
      "Tense zone fix: 'The report describes what I see yesterday' → 'The report describes what I saw yesterday.' Agreement fix: 'The list of topics are long' → 'The list of topics is long.'",
    grammar: [
      "Verb + s/es only in simple present third-person singular: 'She writes', 'It works' — the most common written-agreement slip.",
      "Collective nouns (team, family, government) take a SINGULAR verb in formal writing unless members act individually.",
      "a/an depends on SOUND, not spelling: 'an hour', 'a European'.",
      "Irregular past forms are non-negotiable: wrote, went, took, began, chose — drill the list, do not guess.",
      "If + present → will (real); if + past → would (imaginary); if + had → would have (regret). This ladder IS the conditional logic.",
    ],
    tips: [
      "Check agreement LAST, reading only subjects+verbs; it is the fastest way to catch slips.",
      "For essays write in present; for narrative/report write in past. Do not hop between them.",
      "Say the sentence silently — odd agreement usually sounds wrong to a trained ear.",
    ],
  },
];