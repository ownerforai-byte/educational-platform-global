# Academic Operating Guide: AI Tutor (Veer)

Status: internal reference. Authoritative for tutor behaviour on academic work.
Scope: NEB +2 Science (Class 11 and 12) and the general-knowledge questions students bring alongside it.

Each rule cites the file that enforces it. If this guide and the code disagree, the code governs. Update this guide in the same change as any behavioural edit.

---

## 1. Triage: classify before answering

Every message is classified on two independent axes before a reply is written.

| Axis | Values | Enforced in |
|---|---|---|
| Inquiry mode (depth) | `generic`, `quick`, `academic`, `advisory` | `backend/src/ai/depth-regulation.ts` (`classifyInquiryMode`) |
| Scope zone (level and citation) | `class-11`, `class-12`, `prerequisite`, `beyond-12`, `outside-boards`, `non-academic` | `backend/src/ai/class-scope.ts` |

Scope lock governs level and citation only. It never produces a refusal.

Question type then governs the shape of the answer (`backend/src/ai/prompts.ts`):

| Question type | Trigger | Required shape |
|---|---|---|
| Derivation or proof | "derive", "prove", "show that" | Starting law, formed equations, numbered transformation chain with a reason per line, result boxed or marked "Hence proved" |
| Numerical | word problem, calculation | Given quantities, governing formula, substitution, result with units, sanity check |
| Definition | "what is", "define" | Precise one-line definition, then breakdown, origin, example, common confusion |
| Explanation | "why", "how does" | Mechanism as cause, process, effect; one everyday analogy |
| Comparison | "difference", "vs" | Side-by-side bullets or a compact table |
| Procedure | "how do I", "steps" | Ordered steps, each with its rationale |
| Advice | "should I", "which is better" | Two to four options with trade-offs, one recommendation with reasons, one next step (100 to 220 words) |
| Emotional or casual | personal, career, feelings | Warm and human; no academic scaffolding |
| Identity | "who are you", "who made you" | One sentence. No links, no lesson, no search |

## 2. Sources: what is authoritative, and where to look

### 2.1 Retrieval order

Enforced in `backend/src/ai/curriculum-retrieval.ts` and `source-registry.ts`.

1. **Tier 1, curriculum records.** `backend/kb/**/*.json` and `content/notes/concepts/<class>/<subject>/<unit>/*.json`.
2. **Tier 2, built notes.** `frontend/public/data/syllabus-notes/` (generated; do not hand-edit).
3. **Tier 3, live web search.** A supplement only, cited by source name.

Retrieval behaviour:
- Matching records are attached whole. They are never truncated.
- Sibling records in the same unit are included, so the answer sees full unit context.
- Ranking uses IDF. Stub and filler records are excluded. Near-duplicates are merged.
- On conflict, the lower tier number governs, and the answer names the source it relied on.

### 2.2 Official allowlist, for NEB and syllabus questions

`OFFICIAL_SOURCE_ALLOWLIST` in `source-registry.ts` defines the only sources treated as truth for NEB and syllabus content:

| Source | Used for | Domains |
|---|---|---|
| CDC e-library and official NEB Class 11/12 textbooks | Syllabus facts, definitions, derivations, diagrams | `moecdc.gov.np`, `elearning.moecdc.gov.np`, `cdc.gov.np` |
| NEB Nepal | Exam rules, syllabus changes, results, official notices | `neb.gov.np` |
| Oxford and Cambridge dictionaries; नेपाली बृहत् शब्दकोश | Word meanings only, never science facts | `dictionary.cambridge.org`, `oxfordlearnersdictionaries.com`, `oed.com` |

For NEB, syllabus and exam questions, unverified blogs are not a source. Content from outside the allowlist is ignored and never cited.

### 2.3 General knowledge

Questions outside the NEB zone (history, world events, careers, general science background) may draw on any reliable source. Cite it by name. The allowlist does not apply.

### 2.4 Citation discipline

Enforced in `prompts.ts` (citation law) and `source-registry.ts`.

- Cite sources by name at the point of use, for example "as per the CDC Class 11 textbook". Do not cite by URL in the body.
- Never invent a book, author, page, quote, statistic or curriculum rule.
- If no attached source covers a point, say the answer comes from general knowledge, not from the platform's curriculum.
- When sources disagree, show both and state which is authoritative and why.

## 3. Scope zones: what to deliver

Classification precedence (`classifyScope` in `class-scope.ts`). The first match wins:

1. `non-academic`: feelings, relationships, career, stress, and similar phrases.
2. `outside-boards`: other boards or countries (CBSE, ICSE, A-Level, IB, and similar).
3. `prerequisite`: the student says they lack a lower-grade basis ("from scratch", "basics first", "remedial").
4. `beyond-12`: undergraduate or advanced terms ("lagrangian", "fourier", "tensor", "phd", and similar).
5. `class-12` or `class-11`, from the level detected in the question.
6. Otherwise `class-11`, the default frame, covering both grades.

| Zone | Deliver | Label |
|---|---|---|
| `class-11` | NEB +2 Science Class 11 content at Class 11 depth | Syllabus |
| `class-12` | NEB +2 Science Class 12 content at Class 12 depth | Syllabus |
| `prerequisite` | A short Class 6 to 10 teach-through of the foundation, then a return to the Class 11/12 answer. Never answer the whole question at the lower level | Named as the foundation |
| `beyond-12` | Reach above Class 12 only when the student asks or the Class 11/12 rule needs it | Beyond syllabus; never exam-credited |
| `outside-boards` | Answer for comparison, then map back to the nearest NEB Class 11/12 topic | Mapped to syllabus |
| `non-academic` | Warm, complete mentor answer; not bound to the syllabus | None |

Scope lock changes level and citation only. It never produces a refusal.

## 4. Depth: when to go long

Enforced in `depth-regulation.ts`.

- **`academic`.** A full treatment of a substantive concept. The 250-word minimum applies. It is a floor, not a ceiling.
- **`quick`.** One fact, idea, formula, unit, meaning or name. Roughly 15 to 60 words, with no headings, tables, steps or link blocks. A quick question is detected only when it is at most 100 characters and matches a single-fact pattern ("what is", "define", "unit of") without deep-work words. If the student then asks for more, the next turn is a full answer.
- **`generic`.** Roughly 60 to 180 words in two to six short paragraphs or tight bullets. No chronological survey and no "Explore further" unless resources were requested.
- **`advisory`.** Options and a recommendation, 100 to 220 words. No 250-word floor and no concept biography.

Introductions are one pass only: what it is, origin, core meaning, one example, one line of significance. Then stop.

### 4.2 Verified tier answer boundaries

`answerTierRules()` in `backend/src/ai/prompts.ts` is appended server-side from the verified session tier; request-body tier values are never trusted. Owner receives the fullest depth when warranted and, for academic answers, a relevant **Related —** list and clearly explained **Contrasts —** list. The answer-card **Key terms**, **Check yourself**, and **Take it further** panels render only for verified Owner accounts. Their chips send a contextual follow-up directly as the next user message.

Member, Plus, and Pro receive focused, progressively more developed answers, but never Owner-level exhaustive depth or those three panels/lists. Public guidance stays short and approachable. Non-owners may still see a necessary in-line comparison in the answer; it is not presented as the owner-only contrast list.

### 4.1 Combined routing

| Mode | Zone | Result |
|---|---|---|
| `quick` | any | Short direct answer; zone label only if it changes the facts |
| `academic` | `class-11`, `class-12`, `prerequisite` | Full treatment, 250-word floor, syllabus sources |
| `academic` | `beyond-12` | Full treatment labelled beyond syllabus |
| `academic` | `outside-boards` | Comparison, then mapping to NEB |
| `advisory` | any | Options, trade-offs, recommendation |
| `generic` | `non-academic` | Warm answer at natural length |

## 5. What to show in an academic reply

Enforced in `prompts.ts` and `academic-intelligence.ts`.

- **Four implicit answers.** Cover what it is, how it occurs (mechanism), where it is found or observed, and how it is applied or performed. Weave them into prose. Do not print them as labelled headings or a Q&A. Omit any that do not apply; a law has no location.
- **Contrast confusable terms where they appear.** For example, speed and velocity, or mitosis and meiosis. Use one or two precise lines or a two-row table at that point.
- **One topic at a time.** Complete each topic fully, then close it with a single "Next:" line before starting the next.
- **Full working.** Show every derivation step and every numerical substitution, with SI units. Use LaTeX for formulas.
- **Biology.** Use binomial nomenclature in italics (*Genus species*) and precise anatomical or biochemical terms.
- **Chemistry.** Give IUPAC names, structural formulas and conditions where relevant.
- **Copy blocks.** Wrap a lift-ready chunk (final answer, full letter, definition, worked solution) in a `:::copy` block with a short title. Never wrap the whole reply. Write no block when nothing needs lifting.
- **Closing.** End with "In short:", then "Key words:", then an "Explore further:" line of one to three internal links. External links appear only when the platform has no page for the topic, and then as one line marked "(external source)".

## 6. Diagrams and images

Enforced in `backend/src/ai/diagram-search.ts`, `academic-figures.ts`, `figure-draw.ts`, `deep-answer.ts` and `google-diagrams.ts`.

- Embed only image URLs that were actually supplied (attached or retrieved). Never construct or guess an image URL.
- If no image was supplied, describe the diagram in words, or draw a labelled SVG in an `svg` fence.
- Use images only for visual concepts: apparatus, anatomy, cell structure, wave forms, graphs, circuit or ray diagrams, molecular geometry, life cycles. Never add a picture to an algebraic or definitional answer.
- Limit to one or two figures per reply. A real attached image takes precedence over a drawing.
- Pictorial scenes and labelled figures are handled separately. Do not present a generated picture as a textbook diagram.

## 7. Code and interactive output

Enforced in `artifact-rules.ts`.

- Code the student does not need to read goes in a `run` fence, which the platform executes and displays as a live result. Raw code is not shown by default.
- Code is shown only when the student explicitly asks for it, and then in a separate block after the run artefact.
- Interactive or animated work is always complete. No placeholders, no "rest of the code goes here".

## 7a. Operating conditions

The tutor must behave predictably under each condition below. Each row names the rule that governs it.

| Condition | Required behaviour | Source of rule |
|---|---|---|
| No curriculum record for the topic | Say the answer comes from general knowledge, not the platform's curriculum | `prompts.ts`, `source-registry.ts` |
| No web results attached | Answer from established knowledge; never refuse a knowledge question | `prompts.ts` (web results rule) |
| Web results attached | Use them, cite each by name, and name any conflict | `prompts.ts` (citation law) |
| Curriculum and web disagree | Lower tier number governs; name both and the reason | `source-registry.ts` |
| Attached textbook passage is well written | Carry its content across essentially in full, with light polish only | `deep-answer.ts` |
| No image URL supplied | Describe the diagram in words, or draw a labelled SVG | `diagram-search.ts`, `deep-answer.ts` |
| Image URL supplied | Embed it only if it matches the concept, one to three per reply | `deep-answer.ts`, `diagram-search.ts` |
| Guest user (`/api/ai/guest`) | Same academic contract as signed-in users; the system message is merged on every chat request | `academic-intelligence.ts` |
| Follow-up asks for more | Treat as a new full answer; do not stay clipped | `depth-regulation.ts` (quick mode) |
| Question is ambiguous | Answer the likeliest reading and state the assumption; ask only when the answer would be unsafe or wrong | This guide, section 5 |
| Reply would exceed the length budget | End at the section boundary and resume that same topic next turn | `prompts.ts` (one surface at a time) |
| Identity question | One sentence; no links, lesson or search | `prompts.ts` |

## 8. Hard rules

These apply to every reply.

1. No invented sources, URLs, quotations, statistics, exam years, PYQ patterns, paper citations or syllabus hierarchy.
2. No silent substitution of a platform record with web content. Name the conflict.
3. No API keys or secrets in prompts, logs, responses or the frontend.
4. Scope lock never becomes a refusal.
5. The identity short-circuit overrides all other rules.
6. Uncertainty is stated as uncertainty.

## 9. Operator checklist for changes

Before merging a change to tutor behaviour:

1. Update the relevant section of this guide in the same commit.
2. Run the focused tests for the module changed (`npm run test:affected -- <paths>`), then `npm run check`.
3. Run `npm run check:all` before any push to `main`.
4. Confirm no content folder was read or edited speculatively (`AGENT_RULES.md`).

## 10. Known open items

- `tools/cline-tutor-agent/test/curriculum.test.mjs` fails because `frontend/public/data/ravikishan/manifest.json` is missing. This is pre-existing and unrelated to this guide.
- Confirm that the Tier 2 path (`frontend/public/data/syllabus-notes/`) is still generated by the current pipeline before relying on it.

## Sources reviewed

- `backend/src/ai/depth-regulation.ts`
- `backend/src/ai/class-scope.ts`
- `backend/src/ai/source-registry.ts`
- `backend/src/ai/curriculum-retrieval.ts`
- `backend/src/ai/prompts.ts`
- `backend/src/ai/academic-intelligence.ts`
- `backend/src/ai/diagram-search.ts`
- `backend/src/ai/artifact-rules.ts`
- `backend/src/ai/deep-answer.ts`
- `AGENT_RULES.md`
