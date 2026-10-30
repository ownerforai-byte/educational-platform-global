# 📚 ENGLISH NOTES REBUILD — Master Plan (book-grade)

> **Mission:** raise the English notes from their current ~3–4% of textbook depth to
> **book-grade, visionary notes** — every topic of every NEB English unit (**11 units ·
> 116 topics**: Class 11 = 6 units/56 topics, Class 12 = 5 units/60 topics). English is a
> skills + literature subject, so its interface is text-native: literary-text anatomy for
> stories/poems/plays/essays, rule-table anatomy for grammar, annotated-format anatomy for
> writing — with proper hierarchy, classified tables with examples, and clear English
> diagrams (mind maps, structure figures) plus curated Google figures.
>
> - **Benchmark books:** NEB/CDC Compulsory English textbooks (Grade 11 & 12) · standard
>   NEB English guides (Pioneer/Modern series) · Oxford/Cambridge learner references for
>   grammar and usage (validity — KNOWLEDGE-PLAN.md §8.5).
> - **Golden rules:** ① **Simply no removal** — existing notes upgraded in place.
>   ② **All existing CEE / entrance-exam content stays**; new material grows an Exam Zone
>   around it. ③ Order owned by `frontend/lib/syllabus.ts`. ④ Literary facts (author, work,
>   dates, prizes) must be verified, not remembered; the English itself must be idiomatic —
>   "natural" matters double in this subject.
> - **Method home:** shared method/licensing in [biology-plan.md](biology-plan.md) §3/§7.
> - **Sequencing:** interfaces (all 116 skeletons) first; filling in later sessions.

---

## 0. The gap
Today's English notes give a plot line and a few questions. A book-grade text note gives:
author context, full summary, theme and character analysis, glossary in usage context,
literary devices, comprehension ladder, and exam answers in model form. A grammar note gives
rules in tables **with examples and exceptions**. A writing note gives the format as an
annotated specimen.

## 1. Scope
Class 11 (6 units, 56 topics) first, then Class 12 (5 units, 60 topics). Bachelor-ready.

## 2. Benchmarks & sources

| Source | Role |
|---|---|
| `frontend/lib/syllabus.ts` | topic skeleton + order |
| NEB/CDC Compulsory English textbooks | the prescribed texts — summaries must match these |
| Oxford/Cambridge learner references · CGEL summaries | grammar/usage authority (validity) |
| Britannica / Poetry Foundation / Oxford Companion | literary facts (author, dates, works) |
| Google/Wikimedia | figure intake (author portraits where licensed, maps, structure figures) |

## 3. The Note Interface v2 — English (by topic type)

### 3a. Literary texts (stories, poems, essays, one-act plays)

| # | Block | Standard |
|---|---|---|
| I | **About the author & the text** | 100–200 words + verified facts table (author → dates → works → context) |
| II | **Summary / synopsis** | prose summary (poems: stanza-wise summary table) |
| III | **Theme & message** | themes table (theme → evidence from text → significance) |
| IV | **Character & setting** | character-sketch table (character → traits → evidence); setting figure/map where relevant |
| V | **Language & devices** | literary-devices table (device → example line → effect), **glossary (word → meaning → usage sentence, ≥ 20 entries)** |
| VI | **Questions & answers** | short Q (with model answers) + long Q (structured model answer: intro → points → conclusion) + **existing CEE lines preserved** + MCQs (`mcs`) |
| VII | **Summary self-check** | one-paragraph essence, quotations to remember table |

### 3b. Grammar & vocabulary topics
Rule table (**structure → rule → examples → exceptions**) · transformation table (direct/
indirect, active/passive, sentence types) · error-spotting table (wrong → right → why) ·
≥ 12 practice items with answers.

### 3c. Writing & composition topics
**Format template + annotated specimen** (labelled parts figure) · do/don't table ·
vocabulary/register table · 2 complete model pieces per genre (letter, report, essay, email,
application, news story, dialogue, speech as the syllabus prescribes) · common formats table.

### 3d. Reading, comprehension & critical thinking
Passage + question ladder (literal → inferential → evaluative) with model answers ·
critical-thinking framework table (claim → evidence → evaluation) · mind-map figure.

### Diagram standard (English)
≥ 2 figures per topic where the topic is visual (mind map, story-arc, letter/report
structure, character web); text-heavy topics may go below 4 (language subjects) but every
topic keeps ≥ 1 figure slot. All figures English-labelled; curated figures license-checked
(biology-plan.md §3.4 pipeline).

## 4. Book-Grade Bar (English)
Texts: **author facts verified · full summary · ≥ 3 themes with evidence · character table ·
glossary ≥ 20 entries · ≥ 10 short + 5 long model answers (CEE preserved) · devices table.**
Grammar: **rule tables complete with exceptions · ≥ 12 practice items with answers.**
Writing: **format + annotated specimen + 2 complete model pieces + do/don't table.**
All: proper hierarchy, ≥ 1 figure slot, idiomatic error-free English.

## 5. Polish track (newer version, no removal)
Additive v2; CEE lines frozen; de-garble; upgrade one-line summaries into the §3a anatomy;
glossary and model answers added around existing Q&A; literary facts verified (Corrections
logged in the validity ledger).

## 6. Per-unit blueprints (11 units)

### Class 11 (6 units, 56 topics)

| Unit | Topics | Must produce |
|---|---:|---|
| Section I — Language Development (Units 1–17) | 17 | each lesson: theme summary + glossary + comprehension ladder + language-focus table (the textbook's grammar-in-context points) |
| Grammar & Vocabulary (integrated) | 3 | master rule tables (tenses, clauses, sentence patterns) + transformation + error-spotting sets |
| Section II — Literature · Short Stories & Poems | 12 | §3a anatomy per text; **poems get stanza-wise summary tables + devices tables**; quotations table per text |
| Section II — Literature · Essays & One-Act Plays | 8 | §3a anatomy; plays get **scene/dramatic-device tables** + character webs |
| Writing and Composition | 14 | §3c anatomy per genre — the unit is the writing-format library (letters, applications, reports, essays, news, dialogue, speech, email) |
| Critical Thinking | 2 | framework tables + annotated argument figures |

### Class 12 (5 units, 60 topics)

| Unit | Topics | Must produce |
|---|---:|---|
| Section I — Language Development (Units 1–20) | 20 | lesson notes with real-world hook (Nepal context), glossary, language-focus tables |
| Section II — Literature (Stories · Poems · Essays · Plays) | 20 | §3a anatomy per text; comparative-theme tables across texts; model long answers |
| Writing Skills | 11 | §3c anatomy; advanced genres (proposals, research reports, reviews, CVs) with specimens |
| Oral Communication | 4 | presentation/interview/group-discussion scripts + do/don't tables + figure outlines |
| Grammar | 5 | clause/conditional/concord master tables + transformation + error-spotting sets |

## 7. Interfaces-first roadmap
**S1 (next):** all 116 skeletons (type-aware blocks, glossary/question shells, figure slots,
CEE lines seeded) → schema + `check:content` + no-placeholder gates. **S2+:** one unit per
session; the two big Literature units get 2 sessions each. Parallel polish.
Final: `npm run check:all` + coverage report.

## 8. Quality gates
`npm run check:schema` · `npm run check:content` · `content:build:check` · `audit:scopes` ·
`audit:visuals` · no-removal diff review · **literary-fact verification** per unit ·
**language-quality read-through** (idiomatic, error-free) per unit.

## 9. Tracking checklist

> `node scripts/subject-plan-inventory.mjs english` regenerates this. Legend: **I** =
> interface · **N** = filled to bar · **D** = figures placed · **P** = polished.

<!-- ENGLISH-PLAN:TOPICS:START -->

> Regenerated by `node scripts/subject-plan-inventory.mjs english` from `frontend/lib/syllabus.ts`.
> Coverage: **11 units · 116 topics** (Class 11: 6 units, 56 topics; Class 12: 5 units, 60 topics).

## Class 11

### `language-development` — Section I — Language Development (Units 1–17) (17 topics)

- [x] I · [ ] N · [ ] D · [ ] P — **Unit 1 — Education and Humanity**
- [x] I · [ ] N · [ ] D · [ ] P — **Unit 2 — Communication**
- [x] I · [ ] N · [ ] D · [ ] P — **Unit 3 — Media and Society**
- [x] I · [ ] N · [ ] D · [ ] P — **Unit 4 — History and Culture**
- [x] I · [ ] N · [ ] D · [ ] P — **Unit 5 — Life and Love**
- [x] I · [ ] N · [ ] D · [ ] P — **Unit 6 — Health and Exercise**
- [x] I · [ ] N · [ ] D · [ ] P — **Unit 7 — Ecology and Development**
- [x] I · [ ] N · [ ] D · [ ] P — **Unit 8 — Humour and Satire**
- [x] I · [ ] N · [ ] D · [ ] P — **Unit 9 — Democracy and Human Rights**
- [x] I · [ ] N · [ ] D · [ ] P — **Unit 10 — Home Life and Family Relationship**
- [x] I · [ ] N · [ ] D · [ ] P — **Unit 11 — Arts and Creation**
- [x] I · [ ] N · [ ] D · [ ] P — **Unit 12 — Fantasy**
- [x] I · [ ] N · [ ] D · [ ] P — **Unit 13 — Career and Entrepreneurship**
- [x] I · [ ] N · [ ] D · [ ] P — **Unit 14 — Power and Politics**
- [x] I · [ ] N · [ ] D · [ ] P — **Unit 15 — War and Peace**
- [x] I · [ ] N · [ ] D · [ ] P — **Unit 16 — Critical Thinking**
- [x] I · [ ] N · [ ] D · [ ] P — **Unit 17 — Globalization and Diaspora**

### `language-and-grammar` — Grammar & Vocabulary (integrated across Section I units) (3 topics)

- [x] I · [ ] N · [ ] D · [ ] P — **Grammar and Usage**
- [x] I · [ ] N · [ ] D · [ ] P — **Vocabulary Building**
- [x] I · [ ] N · [ ] D · [ ] P — **Communication Skills**

### `reading-and-comprehension` — Section II — Literature · Short Stories & Poems (12 topics)

- [x] I · [ ] N · [ ] D · [ ] P — **Short Story 1 — The Selfish Giant (Oscar Wilde)**
- [x] I · [ ] N · [ ] D · [ ] P — **Short Story 2 — The Oval Portrait (Edgar Allan Poe)**
- [x] I · [ ] N · [ ] D · [ ] P — **Short Story 3 — God Sees the Truth but Waits (Leo Tolstoy)**
- [x] I · [ ] N · [ ] D · [ ] P — **Short Story 4 — The Wish (Roald Dahl)**
- [x] I · [ ] N · [ ] D · [ ] P — **Short Story 5 — Civil Peace (Chinua Achebe)**
- [x] I · [ ] N · [ ] D · [ ] P — **Short Story 6 — Two Little Soldiers (Guy de Maupassant)**
- [x] I · [ ] N · [ ] D · [ ] P — **Short Story 7 — An Astrologer's Day (R. K. Narayan)**
- [x] I · [ ] N · [ ] D · [ ] P — **Poem 1 — Corona Says (Vishnu S. Rai)**
- [x] I · [ ] N · [ ] D · [ ] P — **Poem 2 — A Red, Red Rose (Robert Burns)**
- [x] I · [ ] N · [ ] D · [ ] P — **Poem 3 — All the World's a Stage (William Shakespeare)**
- [x] I · [ ] N · [ ] D · [ ] P — **Poem 4 — Who are you, little i? (E. E. Cummings)**
- [x] I · [ ] N · [ ] D · [ ] P — **Poem 5 — The Gift in Wartime (Tran Mong Tu)**

### `literature-essays-plays` — Section II — Literature · Essays & One-Act Plays (8 topics)

- [x] I · [ ] N · [ ] D · [ ] P — **Essay 1 — Sharing Tradition (Frank LaPena)**
- [x] I · [ ] N · [ ] D · [ ] P — **Essay 2 — How to Live Before You Die (Steve Jobs)**
- [x] I · [ ] N · [ ] D · [ ] P — **Essay 3 — What I Require From Life (J.B.S. Haldane)**
- [x] I · [ ] N · [ ] D · [ ] P — **Essay 4 — What is Poverty? (Jo Goodwin Parker)**
- [x] I · [ ] N · [ ] D · [ ] P — **Essay 5 — Scientific Research is a Token of Humankind's Survival (Vladimir Keilis-Borok)**
- [x] I · [ ] N · [ ] D · [ ] P — **One-Act Play 1 — Trifles (Susan Glaspell)**
- [x] I · [ ] N · [ ] D · [ ] P — **One-Act Play 2 — A Sunny Morning (Serafín and Joaquín Álvarez Quintero)**
- [x] I · [ ] N · [ ] D · [ ] P — **One-Act Play 3 — Refund (Fritz Karinthy)**

### `writing-and-composition` — Writing and Composition (14 topics)

- [x] I · [ ] N · [ ] D · [ ] P — **Essay Writing — argumentative, descriptive, narrative, expository**
- [x] I · [ ] N · [ ] D · [ ] P — **Paragraph Writing**
- [x] I · [ ] N · [ ] D · [ ] P — **Formal Letter Writing — editor, application, complaint, inquiry**
- [x] I · [ ] N · [ ] D · [ ] P — **Informal Letter Writing**
- [x] I · [ ] N · [ ] D · [ ] P — **Email Writing**
- [x] I · [ ] N · [ ] D · [ ] P — **Report Writing and Summarisation**
- [x] I · [ ] N · [ ] D · [ ] P — **Article Writing**
- [x] I · [ ] N · [ ] D · [ ] P — **Story Writing**
- [x] I · [ ] N · [ ] D · [ ] P — **Speech Writing**
- [x] I · [ ] N · [ ] D · [ ] P — **Dialogue Writing**
- [x] I · [ ] N · [ ] D · [ ] P — **Review Writing — book and film**
- [x] I · [ ] N · [ ] D · [ ] P — **Summary and Note-making**
- [x] I · [ ] N · [ ] D · [ ] P — **Comprehension and Unseen Passage**
- [x] I · [ ] N · [ ] D · [ ] P — **Grammar for Writing — sentences, clauses, punctuation**

### `critical-thinking` — Critical Thinking (2 topics)

- [x] I · [ ] N · [ ] D · [ ] P — **Critical Thinking**
- [x] I · [ ] N · [ ] D · [ ] P — **Literary Analysis and Interpretation**

## Class 12

### `language-development` — Section I — Language Development (Units 1–20) (20 topics)

- [x] I · [ ] N · [ ] D · [ ] P — **Unit 1 — Critical Thinking**
- [x] I · [ ] N · [ ] D · [ ] P — **Unit 2 — Family**
- [x] I · [ ] N · [ ] D · [ ] P — **Unit 3 — Sports**
- [x] I · [ ] N · [ ] D · [ ] P — **Unit 4 — Technology**
- [x] I · [ ] N · [ ] D · [ ] P — **Unit 5 — Education**
- [x] I · [ ] N · [ ] D · [ ] P — **Unit 6 — Money and Economy**
- [x] I · [ ] N · [ ] D · [ ] P — **Unit 7 — Humour**
- [x] I · [ ] N · [ ] D · [ ] P — **Unit 8 — Human Culture**
- [x] I · [ ] N · [ ] D · [ ] P — **Unit 9 — Ecology and Environment**
- [x] I · [ ] N · [ ] D · [ ] P — **Unit 10 — Career Opportunities**
- [x] I · [ ] N · [ ] D · [ ] P — **Unit 11 — Hobbies**
- [x] I · [ ] N · [ ] D · [ ] P — **Unit 12 — Animal World**
- [x] I · [ ] N · [ ] D · [ ] P — **Unit 13 — History**
- [x] I · [ ] N · [ ] D · [ ] P — **Unit 14 — Human Rights**
- [x] I · [ ] N · [ ] D · [ ] P — **Unit 15 — Leisure and Entertainment**
- [x] I · [ ] N · [ ] D · [ ] P — **Unit 16 — Fantasy**
- [x] I · [ ] N · [ ] D · [ ] P — **Unit 17 — War and Peace**
- [x] I · [ ] N · [ ] D · [ ] P — **Unit 18 — Music and Creation**
- [x] I · [ ] N · [ ] D · [ ] P — **Unit 19 — Migration and Diaspora**
- [x] I · [ ] N · [ ] D · [ ] P — **Unit 20 — Power and Politics**

### `literary-analysis` — Section II — Literature (Stories · Poems · Essays · One-Act Plays) (20 topics)

- [x] I · [ ] N · [ ] D · [ ] P — **Short Story 1 — Neighbours (Tim Winton)**
- [x] I · [ ] N · [ ] D · [ ] P — **Short Story 2 — A Respectable Woman (Kate Chopin)**
- [x] I · [ ] N · [ ] D · [ ] P — **Short Story 3 — A Devoted Son (Anita Desai)**
- [x] I · [ ] N · [ ] D · [ ] P — **Short Story 4 — The Treasure in the Forest (H. G. Wells)**
- [x] I · [ ] N · [ ] D · [ ] P — **Short Story 5 — My Old Home (Lu Xun)**
- [x] I · [ ] N · [ ] D · [ ] P — **Short Story 6 — The Half-closed Eyes of the Buddha and the Slowly Sinking Sun (Manjushree Thapa)**
- [x] I · [ ] N · [ ] D · [ ] P — **Short Story 7 — A Very Old Man with Enormous Wings (Gabriel García Márquez)**
- [x] I · [ ] N · [ ] D · [ ] P — **Poem 1 — A Day (Emily Dickinson)**
- [x] I · [ ] N · [ ] D · [ ] P — **Poem 2 — Every Morning I Wake (Dylan Thomas)**
- [x] I · [ ] N · [ ] D · [ ] P — **Poem 3 — I Was My Own Route (Julia de Burgos)**
- [x] I · [ ] N · [ ] D · [ ] P — **Poem 4 — The Awakening Age (Ben Okri)**
- [x] I · [ ] N · [ ] D · [ ] P — **Poem 5 — Soft Storm (Abhi Subedi)**
- [x] I · [ ] N · [ ] D · [ ] P — **Essay 1 — On Libraries (Oliver Sacks)**
- [x] I · [ ] N · [ ] D · [ ] P — **Essay 2 — Marriage as a Social Institution (Stephen L. Carter)**
- [x] I · [ ] N · [ ] D · [ ] P — **Essay 3 — Knowledge and Wisdom (Bertrand Russell)**
- [x] I · [ ] N · [ ] D · [ ] P — **Essay 4 — Humility (Yuval Noah Harari)**
- [x] I · [ ] N · [ ] D · [ ] P — **Essay 5 — Human Rights and the Age of Inequality (Samuel Moyn)**
- [x] I · [ ] N · [ ] D · [ ] P — **One-Act Play 1 — A Matter of Husbands (Ferenc Molnár)**
- [x] I · [ ] N · [ ] D · [ ] P — **One-Act Play 2 — Facing Death (August Strindberg)**
- [x] I · [ ] N · [ ] D · [ ] P — **One-Act Play 3 — The Bull (Bhimnidhi Tiwari)**

### `writing-skills` — Writing Skills (11 topics · 16h)

- [x] I · [ ] N · [ ] D · [ ] P — **Essay writing — argumentative, descriptive, narrative, expository**
- [x] I · [ ] N · [ ] D · [ ] P — **Letter writing — formal and informal**
- [x] I · [ ] N · [ ] D · [ ] P — **Email writing**
- [x] I · [ ] N · [ ] D · [ ] P — **Report writing and summarisation**
- [x] I · [ ] N · [ ] D · [ ] P — **Article writing**
- [x] I · [ ] N · [ ] D · [ ] P — **Note-making and summary**
- [x] I · [ ] N · [ ] D · [ ] P — **Story writing**
- [x] I · [ ] N · [ ] D · [ ] P — **Speech and dialogue writing**
- [x] I · [ ] N · [ ] D · [ ] P — **Review writing — book and film**
- [x] I · [ ] N · [ ] D · [ ] P — **Comprehension and paraphrasing**
- [x] I · [ ] N · [ ] D · [ ] P — **Grammar for writing — sentences, clauses, punctuation**

### `oral-communication` — Oral Communication (4 topics · 8h)

- [x] I · [ ] N · [ ] D · [ ] P — **Conversation and role play**
- [x] I · [ ] N · [ ] D · [ ] P — **Presentation skills**
- [x] I · [ ] N · [ ] D · [ ] P — **Debate and discussion**
- [x] I · [ ] N · [ ] D · [ ] P — **Listening comprehension**

### `grammar` — Grammar (5 topics · 12h)

- [x] I · [ ] N · [ ] D · [ ] P — **Tenses and their uses**
- [x] I · [ ] N · [ ] D · [ ] P — **Clauses and sentence types**
- [x] I · [ ] N · [ ] D · [ ] P — **Voice and narration**
- [x] I · [ ] N · [ ] D · [ ] P — **Modals and conditionals**
- [x] I · [ ] N · [ ] D · [ ] P — **Punctuation and capitalisation**

<!-- ENGLISH-PLAN:TOPICS:END -->

## 10. Risks & hard rules
No removal ever · CEE content frozen · syllabus order sacred · summaries must match the
prescribed textbook texts · literary facts verified with sources · model answers structured
(not essay soup) · figure licensing recorded · skeletons carry real shells · 3-variant
duplication handled consistently until the generator is fixed.
