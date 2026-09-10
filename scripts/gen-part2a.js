// Part 2a: notice + formal/informal writing (setup + notes 1-7)
const fs = require("fs");
global.fs = fs;
global.dir = "content/ravikishan/class-11/english/writing-and-composition/concepts/";
const notice = {
  title: "Notice Writing + Formal & Informal Writing Mastery",
  unitSlug: "writing-and-composition",
  topicSlug: "notice-and-formal-informal-writing",
  topicTitle: "Notice Writing & Formal/Informal Writing",
  relevance: 100,
  notes: [
    "**What this covers:** the complete mechanics of notices (the shortest high-mark format) and the full contrast between formal and informal writing — so that after reading, you can produce ANY piece of English writing with the right register, structure and tone.",
    "**NOTICE — the 5 locked components in order:** 1) the word NOTICE (top-centre, or the issuing body's name above it) 2) DATE of issue 3) HEADING (what the notice is about, centred, bold) 4) BODY (answers What/When/Where/Who in 3-4 sentences, max ~50 words) 5) SIGNATURE block (name, designation, issuing body — bottom-left).",
    "**NOTICE — the 50-word law:** examiners deduct for length. Every word must carry information: 'The school is organising...' ❌ → 'An inter-house debate will be held...' ✅",
    "**NOTICE — no personal touches:** no 'Dear students', no first/second person. Passive voice and third person only: 'Students are informed that...'. Signature = name + designation only.",
    "**NOTICE — tense logic:** upcoming events → future (will be held); results → present perfect (has been selected).",
    "**FORMAL WRITING — definition:** writing for institutions and strangers: letters to editors/principals/offices, reports, articles, notices, essays. Traits: no contractions, no slang, full sentences, objective tone, 'Dear Sir/Madam' → 'Yours faithfully/sincerely'.",
    "**INFORMAL WRITING — definition:** writing to people you know: letters to friends/family, diary entries. Traits: contractions welcome, casual connectors (well, anyway, by the way), warmth, 'Dear Ravi' → 'With love'."
  ]
};
global.notice = notice;
require("./gen-part2b.js");