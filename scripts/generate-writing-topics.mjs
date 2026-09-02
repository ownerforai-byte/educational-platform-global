/**
 * Generates English Writing topic content JSON files under content/ravikishan/
 * for both class tracks, so every writing format appears in the syllabus
 * topic section (Class 11 → writing-and-composition, Class 12 → writing-skills).
 *
 * Usage: node scripts/generate-writing-topics.mjs && npm run content:build
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();

const FULL_GUIDE =
  "Full model answers, starting-line banks and exam tips: [/knowledge/writing](/knowledge/writing).";

/** topic definitions: title must contain the syllabus topic keywords so topic-page keyword matching works. */
const TOPICS = [
  // ─── Class 11 — writing-and-composition ───
  {
    cls: "class-11",
    unit: "writing-and-composition",
    title: "Essay Writing — argumentative, descriptive, narrative, expository",
    topicTitle: "Essay Writing — argumentative, descriptive, narrative, expository",
    notes: [
      "**What it is:** an essay argues, describes, narrates or explains a topic in organised paragraphs. The examiner marks STANCE + STRUCTURE + evidence, not length.",
      "**Universal skeleton:** Introduction (hook + thesis) → Body paragraphs (ONE reason each: topic sentence → explanation → example) → optional counter-argument (acknowledge, then rebut) → Conclusion (restate thesis + consequence).",
      "**Four types:** *Argumentative* (clear side, reasons, admit the other side), *Descriptive* (5 senses, spatial order, show-don't-tell), *Narrative* (one incident: setup → conflict → climax → reflection), *Expository* (explain causes/process in numbered factors, no opinion).",
      "**Tense logic:** essays live in PRESENT for general truths; past only inside narrative examples; predictions use will/would.",
    ],
  },
  {
    cls: "class-11",
    unit: "writing-and-composition",
    title: "Paragraph Writing — topic sentence, cohesion, exam format",
    topicTitle: "Paragraph Writing",
    notes: [
      "**What it is:** ONE controlling idea in 4–6 sentences — the engine behind every essay, letter and report.",
      "**Structure:** (1) *Topic sentence* — main idea + your angle, specific not generic. (2) *Supporting sentences* — each adds ONE fact/example/reason, logically ordered. (3) *Concluding sentence* — restates or lands a consequence; no new ideas here.",
      "**Unity test:** if a sentence could belong to another paragraph, delete it. **Coherence test:** the reader follows without re-reading — via connectors and repeated key words.",
      "**Exam discipline:** 90–120 words; start with the idea, not with 'The'; end with consequence.",
    ],
  },
  {
    cls: "class-11",
    unit: "writing-and-composition",
    title: "Formal Letter Writing — editor, application, complaint, inquiry",
    topicTitle: "Formal Letter Writing — editor, application, complaint, inquiry",
    notes: [
      "**What it is:** a letter to someone you do NOT know (editor, manager, office). Half the marks are the fixed BLOCK LAYOUT; the other half is polite business tone.",
      "**Block order:** Sender's address → Date → Recipient's designation + address → Subject line → Salutation ('Dear Sir/Madam') → Body (3 short paragraphs: who you are + purpose / details / polite request) → Complimentary close → Signature + full name in capitals.",
      "**The pairing rule that trips everyone:** 'Dear Sir/Madam' → end **Yours faithfully**; 'Dear Mr/Ms Sharma' (real name) → end **Yours sincerely**.",
      "**Tone grammar:** no contractions (*do not*, *I am*); polite modals (*would*, *could*, *may*); passive voice for formality ('the matter is being investigated').",
      "**Variants:** *Editor* (public issue + call for action), *Job application* (post + skills + 'Enclosure: CV'), *Complaint* (what, when, defect + remedy + deadline), *Inquiry/Order* (price/availability/terms).",
    ],
  },
  {
    cls: "class-11",
    unit: "writing-and-composition",
    title: "Informal Letter Writing — personal letter format",
    topicTitle: "Informal Letter Writing",
    notes: [
      "**What it is:** a letter to someone you know well — friend, family. Same skeleton, different temperature: warm, natural, personal.",
      "**Block order:** Sender's address → Date → Salutation with first name ('Dear Rahul,') → Warm opening (ask about them / react to their letter) → Main body (news, invitation, reply) → Warm closing → 'Your loving friend,' + first name only.",
      "**Tone grammar:** contractions welcome (it's, don't, I'm); question tags create warmth ('You remember that day, don't you?'); tenses mix naturally — past for news, present for feelings, future for plans.",
      "**Exam check:** answer anything their last letter asked — examiners verify you responded; keep within ~130 words.",
    ],
  },
  {
    cls: "class-11",
    unit: "writing-and-composition",
    title: "Email Writing — subject line, tone, format",
    topicTitle: "Email Writing",
    notes: [
      "**What it is:** a letter sent digitally — block format plus To/Subject fields. The examiner mainly checks the SUBJECT line and whether tone matches the receiver.",
      "**Structure:** To → Subject (short phrase, not a sentence) → Salutation matched to receiver ('Dear Principal,' vs 'Hi Anisha,') → 1–2 short paragraphs (purpose → details → courteous close) → Sign-off (formal: Yours faithfully + full name; informal: Best wishes + first name).",
      "**Register decides grammar:** the same message shifts — 'could you please' vs 'can you', 'I require' vs 'I need'. Present perfect introduces news ('I have prepared…').",
      "**Never write a lazy subject** ('Queries') — a precise subject is itself worth marks.",
    ],
  },
  {
    cls: "class-11",
    unit: "writing-and-composition",
    title: "Report Writing and Summarisation — news & event report format",
    topicTitle: "Report Writing and Summarisation",
    notes: [
      "**What it is:** factual, third-person, past-tense reporting of an event (sports day, blood donation camp) — not a story, not an opinion.",
      "**Structure:** Headline (short, factual) → Byline ('By a Staff Reporter') + dateline ('Kathmandu, 12 May:') → Lead paragraph answering WHO did WHAT, WHERE, WHEN, WHY in 2–3 sentences → Body in chronological order → a short quotation from the chief guest → closing outcome.",
      "**Tense/voice grammar:** past simple for every event; passive voice is standard for ceremony facts ('trophies were distributed'); reported speech for quotes; third person only — never 'I'.",
      "**Summarisation partner skill:** compress any passage into its core idea in your own words within the word limit — keep the author's viewpoint, drop examples and repetition.",
    ],
  },
  {
    cls: "class-11",
    unit: "writing-and-composition",
    title: "Article Writing — magazine & newspaper article format",
    topicTitle: "Article Writing",
    notes: [
      "**What it is:** your informed OPINION on a contemporary issue (pollution, social media) for a general readership — a 'newspaper essay' with a hook.",
      "**Structure:** Striking heading (question/bold statement) → Byline ('By [Name]') → Introduction (startling fact/question/anecdote + your angle) → 2–3 body paragraphs (ONE point each) → Conclusion with a call to action.",
      "**Grammar toolkit:** present simple for general truths; rhetorical questions engage; concessive clauses show balance ('Although it is venerated…, sections test…'); recommendation modals ('can be revived').",
      "**Winning move:** acknowledge the other side ('On the other hand…') — fair-minded articles score higher than rants.",
    ],
  },
  {
    cls: "class-11",
    unit: "writing-and-composition",
    title: "Story Writing — complete arc from a given outline",
    topicTitle: "Story Writing",
    notes: [
      "**What it is:** a COMPLETE narrative arc judged on plot — situation → problem → turning point → resolution → (often) a quiet moral.",
      "**Structure:** Opening (if the prompt gives a first line, USE it verbatim and continue) → Complication → Rising action → Climax (the decisive moment — slow down here) → Resolution + realisation/moral.",
      "**Tense machinery:** past simple drives the plot; past continuous paints background ('I was dawdling home'); past perfect marks earlier events ('which she had lost'); direct speech at the climax adds life.",
      "**Keep ONE tense zone and ONE narrator** — drifting between present and past, or I/he, breaks the story.",
    ],
  },
  {
    cls: "class-11",
    unit: "writing-and-composition",
    title: "Speech Writing — salutation, hooks, persuasive devices",
    topicTitle: "Speech Writing",
    notes: [
      "**What it is:** writing meant to be SPOKEN — short sentences, rhythm, direct address. The examiner checks 'speakability'.",
      "**Structure:** Salutation in order of seniority ('Respected Chairperson, judges, teachers, and my dear friends —') → Self-intro (if required) → Hook (question/fact/quotation) → 2–3 clear points ('First… Second… Finally…') → Persuasive devices (triads, repetition, rhetorical questions) → Strong closing appeal + 'Thank you.'",
      "**Grammar for the ear:** imperatives command action ('Let us pledge…'); rhetorical questions make the audience answer mentally; triads create rhythm.",
      "**Test:** read your draft aloud — where you gasp, rewrite. Repeat your core phrase 2–3 times.",
    ],
  },
  {
    cls: "class-11",
    unit: "writing-and-composition",
    title: "Dialogue Writing — natural conversation between speakers",
    topicTitle: "Dialogue Writing",
    notes: [
      "**What it is:** a purposeful conversation on the page — natural turns, not monologues.",
      "**Structure:** Optional context line → Speaker names + colon per turn → short natural exchanges (1–2 sentences) pushing toward the aim (question → answer → problem → solution) → a resolving close ('Deal.').",
      "**Naturalness grammar:** contractions everywhere; fillers and tags ('You know what', 'Honestly speaking', '…right?'); short reactions ('Exactly!', 'No way!'); tense follows context (will/would for plans, past for stories).",
      "**Voice test:** give each character a distinguishable style — one formal, one playful — and read the exchange aloud.",
    ],
  },
  {
    cls: "class-11",
    unit: "writing-and-composition",
    title: "Review Writing — book and film review format",
    topicTitle: "Review Writing — book and film",
    notes: [
      "**What it is:** a balanced critical evaluation — what the work is, what it does well, what falls short, and whether it is worth the reader's time.",
      "**Structure:** Title + basic details (title, author/director, year, genre) → Brief SPOILER-FREE summary (2–3 sentences) → Strengths (one concrete example/quote) → Weaknesses (fair, with why it matters) → Recommendation + verdict/rating.",
      "**Review grammar:** present simple dominates ('the story follows…'); evaluative adjectives (compelling, uneven, luminous); concessive fairness ('although the plot is thin, the philosophy is profound'); soft hedging ('readers may find…').",
      "**Never spoil the ending** — restraint reads as mature judgement.",
    ],
  },
  {
    cls: "class-11",
    unit: "writing-and-composition",
    title: "Summary and Note-making — condensing any passage",
    topicTitle: "Summary and Note-making",
    notes: [
      "**Summary:** read for gist → underline key ideas → draft (author's main idea first, then 2–4 key supports) → cut modifiers/examples to fit the word limit → verify meaning is unchanged and nothing is copied.",
      "**Summary grammar:** four paraphrase moves — synonym swap (threat→danger), word-class change (pollute→pollution), voice change (active↔passive), sentence merge; report verbs frame it ('the passage argues…'). Never add your own opinion.",
      "**Note-making:** TITLE in caps → numbered sub-headings (1, 2, 3 — noun phrases, one per paragraph) → compact key-phrase points (a, b, c) → abbreviations (&, →, e.g.) with an 'Abbreviations used' note.",
      "**Note grammar:** nominalise verbs for headings ('agricultural expansion'); drop articles/auxiliaries in points; every point under 7 words.",
    ],
  },
  {
    cls: "class-11",
    unit: "writing-and-composition",
    title: "Comprehension and Unseen Passage — answering in your own words",
    topicTitle: "Comprehension and Unseen Passage",
    notes: [
      "**What it is:** extracting and restating passage information — the trap is copying whole sentences; the skill is locate-then-restate.",
      "**Method:** skim for gist → scan for the question's keywords (the answer lives nearby) → answer in complete sentences with synonyms → match the question type (WH → answer the WH; 'Why' → 'Because…'; true/false → quote evidence) → verify against the text.",
      "**Grammar of answers:** convert passage nouns into clauses ('its existence' → 'that it exists'); use report frames ('the passage states that…'); keep the passage's tense zone; quote marks ONLY when demanded.",
      "**Length discipline:** 1-mark answers = one sentence; 2-mark answers = answer + reason/evidence.",
    ],
  },
  {
    cls: "class-11",
    unit: "writing-and-composition",
    title: "Grammar for Writing — sentences, clauses, punctuation",
    topicTitle: "Grammar for Writing — sentences, clauses, punctuation",
    notes: [
      "**Sentence types as tools:** simple (one clause — POWER), compound (two main clauses via and/but/so or a semicolon — equal weight), complex (main + subordinate clause via because/although/when/if — shows the relation between ideas). Mix them: examiners reward rhythm.",
      "**Clauses vs phrases:** a phrase has no subject-verb pair and cannot stand alone; a dependent clause has one but leans on the main clause ('Because it rained.' alone is a fragment). Relative clauses (who/which/that) add noun detail — commas only for extra information.",
      "**Punctuation logic:** full stop ends a thought; comma separates list items, follows openers, precedes and/but/so between full sentences; semicolon joins balanced sentences; colon introduces; apostrophe = possession or contraction (its vs it's is the classic trap). Comma splice = two full sentences joined by only a comma — fix it.",
      "**Tense + agreement discipline:** pick a tense zone per paragraph (essays: present; reports: past); subjects agree with verbs ('Each of the students WAS present'); a/an by SOUND ('an hour', 'a university').",
    ],
  },
];

// ─── Class 12 — writing-skills (reuses class-11 content keyed by class-11 title) ───
const CLASS_12_TOPICS = [
  { title: "Essay writing — argumentative, descriptive, narrative, expository", reuse: "Essay Writing — argumentative, descriptive, narrative, expository" },
  { title: "Letter writing — formal and informal", reuse: "Formal Letter Writing — editor, application, complaint, inquiry", extra: [
    "Class 12 twist: expect combined tasks (application + CV, editor + solutions). Keep the SAME block layout; extend the body with a second developed paragraph rather than a new layout.",
    "CV essentials (when asked): Name & contact → Career objective → Academic qualifications (table: exam, board, year, marks) → Skills → Experience → References. Noun phrases, no full sentences.",
  ] },
  { title: "Email writing", reuse: "Email Writing — subject line, tone, format" },
  { title: "Report writing and summarisation", reuse: "Report Writing and Summarisation — news & event report format" },
  { title: "Article writing", reuse: "Article Writing — magazine & newspaper article format" },
  { title: "Note-making and summary", reuse: "Summary and Note-making — condensing any passage" },
  { title: "Story writing", reuse: "Story Writing — complete arc from a given outline" },
  { title: "Speech and dialogue writing", reuse: "Speech Writing — salutation, hooks, persuasive devices", extra: [
    "Dialogue pairing (Class 12 often bundles both): keep turns short and purposeful; use speaker names + colons; contractions, fillers and question tags for naturalness; resolve the exchange explicitly.",
  ] },
  { title: "Review writing — book and film", reuse: "Review Writing — book and film review format" },
  { title: "Comprehension and paraphrasing", reuse: "Comprehension and Unseen Passage — answering in your own words" },
  { title: "Grammar for writing — sentences, clauses, punctuation", reuse: "Grammar for Writing — sentences, clauses, punctuation" },
];

// ─── Generation ───
function slugify(text) {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[ -]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 96);
}

function buildRecord({ title, topicTitle, unit, notes }) {
  return {
    title,
    unitSlug: unit,
    topicSlug: slugify(topicTitle),
    topicTitle,
    relevance: 100,
    notes: [...notes, `**Full guide:** ${FULL_GUIDE}`],
  };
}

let written = 0;
for (const topic of TOPICS) {
  const dir = join(ROOT, "content", "ravikishan", topic.cls, "english", topic.unit, "concepts");
  mkdirSync(dir, { recursive: true });
  const record = buildRecord(topic);
  const file = join(dir, `01-${slugify(topic.topicTitle).slice(0, 60)}.json`);
  writeFileSync(file, JSON.stringify(record, null, 2) + "\n", "utf8");
  written++;
}

for (const topic of CLASS_12_TOPICS) {
  const source = TOPICS.find((t) => t.title === topic.reuse);
  if (!source) {
    console.error(`No source topic for reuse: ${topic.reuse}`);
    process.exit(1);
  }
  const dir = join(ROOT, "content", "ravikishan", "class-12", "english", "writing-skills", "concepts");
  mkdirSync(dir, { recursive: true });
  const record = buildRecord({
    title: source.title,
    topicTitle: topic.title,
    unit: "writing-skills",
    notes: [...source.notes, ...(topic.extra ?? [])],
  });
  const file = join(dir, `01-${slugify(topic.title).slice(0, 60)}.json`);
  writeFileSync(file, JSON.stringify(record, null, 2) + "\n", "utf8");
  written++;
}

console.log(`Generated ${written} writing topic files.`);