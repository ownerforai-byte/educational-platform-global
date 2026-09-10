// Part A: grammar hacks (header + notes) — chains to gen-part1b.js
const fs = require("fs");
global.fs = fs;
global.dir = "content/ravikishan/class-11/english/writing-and-composition/concepts/";
global.hacks = {
  title: "Grammar Hacks & Exam Shortcuts — the non-obvious rules",
  unitSlug: "writing-and-composition",
  topicSlug: "grammar-hacks-and-shortcuts",
  topicTitle: "Grammar Hacks & Exam Shortcuts",
  relevance: 100,
  notes: [
    "**What this is:** the fast, non-general tricks that decide error-spotting and fill-in-the-blank marks — the rules examiners test repeatedly and students most often miss.",
    "**S-V Hack #1 — of-phrases never change the subject:** 'The bouquet of roses IS...' (subject = bouquet). Cross out every 'of...' phrase between subject and verb before choosing is/are, has/have.",
    "**S-V Hack #2 — indefinite pronouns are singular:** each, every, either, neither, everyone, somebody, nobody, anything take singular verbs — 'Each of the boys WAS given a prize.'",
    "**S-V Hack #3 — There/Here:** the real subject comes AFTER the verb — 'There ARE many reasons...'. Locate the true subject first.",
    "**Tense Hack — the since rule:** 'since + point of time' → perfect continuous: 'It HAS BEEN raining since morning.' 'since + past clause' → perfect: 'Two years HAVE PASSED since he left.'",
    "**Error-spotting scan order:** 1) subject-verb agreement 2) tense consistency 3) preposition 4) article 5) pronoun reference. 80% of set errors live in the first three.",
    "**Voice Hack — only transitive verbs passivise:** state verbs (have, resemble, lack, suit) have NO passive — 'He has a car' cannot be passivised.",
    "**Speech Hack — the backshift shortcut:** present→past, past→past perfect, will→would, can→could, this→that, now→then, today→that day, ago→before, here→there.",
    "**Article Hack:** first mention → a/an; second mention or unique (sun, moon) → the. Zero article before meals, languages, games: 'have lunch', 'speak Nepali', 'play football'.",
    "**Preposition Hack — direction, not translation:** IN (enclosed) / ON (surface) / AT (point): 'in Kathmandu', 'on the table', 'at Balaju'. Time: AT a clock time, ON a day/date, IN a month/year.",
    "**Conditional ladder:** Type 1 (real): if + present, will + V1. Type 2 (unreal present): if + past, would + V1. Type 3 (unreal past): if + had + V3, would have + V3. Decide REAL vs IMAGINED first; tenses follow mechanically.",
    "**Modifier Hack — the error sits next to the comma:** an opening participle phrase must describe the subject right after the comma. 'Walking down the road, a tree...' ❌ → 'Walking down the road, I saw a tree...' ✅",
    "**Comparison Hack — compare like with like:** 'The population of Kathmandu is larger than THAT of Pokhara' (not 'than Pokhara').",
    "**Question-tag Hack:** copy the auxiliary, flip polarity: 'She can swim, can't she?' No auxiliary? Use do/does/did: 'He plays well, doesn't he?'"
  ]
};
require("./gen-part1b.js");