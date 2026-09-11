const fs = require("fs");
const mindmap = {
  title: "Grammar Master Mindmap — the whole map on one page",
  unitSlug: "writing-and-composition",
  topicSlug: "grammar-master-mindmap",
  topicTitle: "Grammar Master Mindmap",
  relevance: 100,
  notes: [
    "**How to use this page:** grammar is a TREE, not a list. Start at the centre — SENTENCE — and walk outwards. Every exam question is a question about one branch. Master branches in this order: parts of speech → sentence structure → agreement → tense system → voice → speech → conditionals → modifiers → punctuation.",
    "**CENTRE — THE SENTENCE:** Subject + Verb (+ Object/Complement). If a group of words lacks a subject or a finite verb, it is a PHRASE; with both, a CLAUSE. Every English sentence you will ever write or fix is built from this.",
    "**BRANCH 1 — PARTS OF SPEECH (the 8 builders):** noun, pronoun, verb, adjective, adverb, preposition, conjunction, interjection. Exam use: identify the FUNCTION of a word, not its dictionary label — 'fast' is an adjective in 'a fast car', an adverb in 'drive fast'.",
    "**BRANCH 2 — SENTENCE STRUCTURE:** Simple (one independent clause) → Compound (independent + independent, joined by for/and/nor/but/or/yet/so) → Complex (independent + dependent) → Compound-Complex. Exam use: sentence-combining and error-spotting of comma splices and run-ons.",
    "**BRANCH 3 — AGREEMENT (S-V):** verb agrees with the HEAD of the subject. Enemies: of-phrases, collective nouns (usually singular), indefinite pronouns (singular), pair nouns (plural), 'there' sentences (subject follows verb).",
    "**BRANCH 4 — THE TENSE SYSTEM:** 3 times × 4 aspects = 12 tenses. Simple = fact; Continuous = ongoing; Perfect = completed-with-relevance; Perfect Continuous = duration. Anchor rules: since/for with perfect forms, main-clause past narration, conditional tenses.",
    "**BRANCH 5 — VOICE:** Active ↔ Passive. Passive = be (in the tense of the active verb) + V3 + by-agent. Only transitive verbs passivise. Use passive when the doer is unknown, obvious, or unimportant.",
    "**BRANCH 6 — SPEECH:** Direct ↔ Indirect. Three shifts at once: TENSE (backstep), PRONOUN (speaker's viewpoint), TIME/PLACE (now→then, here→there). Questions become 'if/whether' or wh-word statements; commands become infinitives (told/ordered/requested + to + V1).",
    "**BRANCH 7 — CONDITIONALS:** Type 0 (general truth: present + present), Type 1 (real future: if + present, will), Type 2 (unreal present: if + past, would), Type 3 (unreal past: if + had V3, would have V3). Mixed types possible when time frames differ.",
    "**BRANCH 8 — MODIFIERS:** adjectives describe nouns; adverbs describe verbs/adjectives/adverbs. Dangling participle = modifier with no logical subject. Order: opinion → size → age → shape → colour → origin → material → purpose + noun.",
    "**BRANCH 9 — PUNCTUATION:** comma (items, clauses, interruption), semicolon (two close independent clauses), colon (introduce a list/explanation), apostrophe (possession/contraction), dash (emphasis). Comma splice = two sentences joined by only a comma — the single most common writing crime.",
    "**BRANCH 10 — DETERMINERS & QUANTIFIERS:** articles (a/an/the/zero), much/many, few/little vs a few/a little (negative vs positive nuance), each/every, either/neither, some/any. A determiner always sits before the noun it frames.",
    "**MEMORY MAP — the one-line summary of every branch:** builders (speech parts) → skeletons (structure) → harmony (agreement) → time (tense) → perspective (voice) → retelling (speech) → imagination (conditionals) → description (modifiers) → breathing room (punctuation) → framing (determiners).",
    "**REVISION STRATEGY:** spend 60% of grammar time on Branches 3, 4, 6, 7 (agreement, tense, speech, conditionals) — they supply almost every error-spotting and transformation mark. Branches 1, 2, 8, 9, 10 are quick-reference; revise weekly, not daily."
  ]
};
fs.writeFileSync("content/ravikishan/class-11/english/writing-and-composition/concepts/01-grammar-master-mindmap.json", JSON.stringify(mindmap, null, 2) + "\n");
console.log("grammar-master-mindmap.json created");