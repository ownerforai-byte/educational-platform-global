// Part 3a: grammar master mindmap (setup + central + branches 1-2)
const fs = require("fs");
global.fs = fs;
global.dir = "content/ravikishan/class-11/english/writing-and-composition/concepts/";
const mindmap = {
  title: "Grammar Master Mindmap — the whole of English grammar on one page",
  unitSlug: "writing-and-composition",
  topicSlug: "grammar-master-mindmap",
  topicTitle: "Grammar Master Mindmap",
  relevance: 100,
  notes: [
    "**How to use this:** grammar is one connected system, not 30 separate chapters. This mindmap is the central trunk (SENTENCE) with six branches — every exam question hangs off one of them. Revise by walking the branches, not by re-reading chapters.",
    "**CENTRAL NODE — THE SENTENCE:** every English sentence = SUBJECT + VERB + (OBJECT/COMPLEMENT) + (modifiers). Everything below is either how these parts CHANGE FORM (morphology) or how they COMBINE (syntax). If you can locate the subject and verb of any sentence, you can solve any grammar question.",
    "**BRANCH 1 — PARTS OF SPEECH (the 8 word classes):** Noun (common, proper, collective, abstract, material; countable vs uncountable), Pronoun (personal I/we/they, possessive mine/ours, reflexive myself, relative who/which/that, demonstrative this/those, indefinite each/everyone, interrogative who?/what?), Verb (transitive vs intransitive; state vs action; regular/irregular), Adjective (quality, quantity, number, demonstrative, possessive, interrogative; degrees: big-bigger-biggest), Adverb (manner -ly, time, place, frequency, degree; also modifies adjectives and other adverbs), Preposition (in/on/at/of/by/with/for — position and direction words), Conjunction (coordinating FANBOYS: for-and-nor-but-or-yet-so; subordinating: because/although/when/if/unless; correlative pairs: either...or, not only...but also), Interjection (ouch! hurrah! — punctuation, not grammar).",
    "**BRANCH 1 sub-node — determiners:** articles a/an/the, quantifiers some/any/much/many/few/little, and the demonstrative/possessive words that sit before nouns. The article rules and quantifier choices generate a large share of fill-in-the-blank questions.",
    "**BRANCH 2 — TENSES (12-cell grid):** 3 times (past/present/future) × 4 aspects (simple/continuous/perfect/perfect continuous). Key cells: Simple Present = habits & universal truths ('The sun rises in the east'); Present Perfect = past action, present relevance ('I have finished'); Present Perfect Continuous = since/for duration ('has been raining since morning'); Past Perfect = the EARLIER of two past actions ('had left before I arrived'); Simple Future = will + V1. Memory hook: aspect answers HOW the action sits in time, time answers WHEN."
  ]
};
global.mindmap = mindmap;
require("./gen-part3b.js");