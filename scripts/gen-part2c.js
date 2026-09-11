// Part 2c: remaining fields + write
const fs = global.fs, dir = global.dir, notice = global.notice;
Object.assign(notice, {
  confusion: [
    "❌ Writing 'Dear Sir' in a notice. ✅ Notices have no salutation — they are impersonal announcements.",
    "❌ Signing a notice with a first name only. ✅ Full name + designation + issuing body.",
    "❌ 'Yours sincerely' after 'Dear Sir/Madam'. ✅ Unnamed → faithfully; named → sincerely.",
    "❌ Contractions in formal writing. ✅ 'cannot', 'will not' — contractions mark informality.",
    "❌ A 90-word notice. ✅ Stay ~50 words; extra sentences risk deduction."
  ],
  practice: [
    "Draft a notice (≤50 words): Eco Club tree-plantation drive next Saturday; register by Thursday.",
    "Write the opening and closing paragraphs of a letter to the editor about reckless honking near a school.",
    "Rewrite informally: 'I regret to inform you that I shall be unable to attend.' ('So sorry — I can't make it.')",
    "Identify the format: past tense, passive voice, heading, findings — (report.)",
    "Build one paragraph on 'morning walks': topic sentence + two supports + link."
  ],
  universalFacts: [
    "All English prose formats share one skeleton: opening (purpose) → middle (detail) → closing (action/feeling).",
    "Register is signalled by four levers: contractions, vocabulary, sentence length, person.",
    "Examiners grade structure first (format components), then language, then content."
  ],
  animation3D: "writing-and-composition",
  motionGraphics: "writing-and-composition",
  examples: [
    "Specimen notice: NOTICE / 15 March 2026 / INTER-HOUSE DEBATE / An inter-house debate will be held on 22 March 2026 at 10 a.m. in the school hall. Two participants per house. — Anita Rai, Secretary, Literary Club",
    "Same news, two registers: Formal — 'The Literary Club cordially invites...' / Informal — 'Hey! The debate is finally happening...'",
    "Paragraph dissected: topic ('Morning walks transform health') → supports (air, routine, sunlight) → link ('The mind benefits just as much...')"
  ],
  practiceQuestions: [
    "Q1. Notice as Head Girl: blood-donation camp (≤50 words).",
    "Q2. Formal letter to the Principal requesting extra library hours during exams.",
    "Q3. Informal letter to a friend describing how you spent Dashain.",
    "Q4. Convert to informal: 'Please accept my sincere apologies for the inconvenience caused.'"
  ],
  formulas: [
    "NOTICE = body name + NOTICE + date + heading + body(what/when/where/who) + name + designation; ≤50 words; no salutation.",
    "FORMAL LETTER = address → date → receiver → subject → salutation → why → details → action → faithfully + full name.",
    "INFORMAL LETTER = address → date → Dear Name → ack → news → warm close → With love + first name.",
    "PARAGRAPH = Topic + 2-3 Support + Link; ONE idea per paragraph.",
    "Register levers: no contractions + Latinate vocab + long sentences + 3rd person = formal."
  ],
  keyPoints: [
    "Notices: 5 components, ≤50 words, third person, future tense for events.",
    "Faithfully (unnamed) vs Sincerely (named) — an automatic mark.",
    "Formal = no contractions, objective; Informal = contractions, warmth.",
    "Every paragraph: topic → support → link.",
    "Tense by format: report=past, notice=future, essay=present, story=past."
  ],
  summary: "Notices are 50-word impersonal announcements with five locked components; formal and informal writing differ across contractions, vocabulary, sentence length and person; and every format is the same purpose-driven skeleton in different clothes. Master the skeleton, the register switches and the paragraph architecture, and any writing prompt becomes executable.",
  specialNotes: [
    "In the exam, write the format skeleton first — format marks are the cheapest marks available.",
    "Keep a personal register-switch table of 10 formal↔informal pairs; revise before every exam."
  ],
  importantStatements: [
    "A notice never addresses the reader directly — it informs in the third person.",
    "One paragraph = one idea, developed with support and closed with a link.",
    "Formal writing persuades with structure; informal writing connects with warmth."
  ],
  importantNotes: [
    "This page + the Grammar Master Mindmap + Grammar Hacks = complete coverage of English writing and grammar."
  ],
  examShortTricks: [
    "Count words for the notice FIRST — then write to fit.",
    "Letter to the editor: para 3 usually asks authorities to act.",
    "Story stuck? Setting → problem → twist → resolution.",
    "Subject line: topic + purpose in one line."
  ]
});
fs.writeFileSync(dir + "01-notice-and-formal-informal-writing.json", JSON.stringify(notice, null, 2) + "\n");
console.log("notice-and-formal-informal-writing.json created");