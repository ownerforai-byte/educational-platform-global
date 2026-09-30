# backend/kb — drop-in knowledge for the tutor

**This folder is the answer to "how do I give the source to it?"**

Drop a JSON file here and the tutor reads it on its next request (5-minute cache
TTL, or immediately on redeploy). **No code change, no schema, no build step.**

## How it works

`backend/src/ai/curriculum-corpus.ts` walks every `.json` under `backend/kb/`
and treats it like this:

- **Descriptive keys** (`class`, `subject`, `unit`, `title`, `slug`, `topicSlug`,
  `relevance`) are used to *index* the record — they tell the tutor who this is
  for.
- **Every other key whose value is a string or an array of strings** becomes a
  *labelled section* and is injected into the system prompt **verbatim, in full**.
  The label is the key, humanised (`examShortTricks` → `Exam short tricks`).

So your file can use whatever vocabulary you like — `notes`, `examTraps`,
`derivations`, `keyFacts`, `practice` — and it will be read.

## Minimal example

```json
{
  "class": "12",
  "subject": "physics",
  "unit": "semiconductors",
  "title": "Zener diode as a voltage regulator",
  "relevance": 100,
  "notes": [
    "A zener diode works in reverse bias: below breakdown it blocks, at breakdown the current jumps while the voltage stays fixed.",
    "That fixed voltage (Vz) is what makes regulation possible — the load sees Vz regardless of input ripple."
  ],
  "examTraps": [
    "Regulation only holds while the zener stays in breakdown: check Iz(min) is actually supplied by the series resistor.",
    "Never assume Vz is exactly nominal — it drifts with temperature and with current."
  ],
  "practice": [
    "A 12 V unregulated supply feeds a 10 V zener through 100 Ω. Find the current through the zener at 30 mA load."
  ]
}
```

A question such as *"how does a zener diode regulate voltage?"* will now
retrieve this record and answer **from it** — the whole record, nothing
summarised — before falling back to the model's own knowledge.

## Suggested folders

```
backend/kb/
  class-11/          ← Grade 11 material
  class-12/          ← Grade 12 material
  pyq/               ← past-year question banks
  textbook/          ← textbook chapters the syllabus cites
```

Folder names are *not* parsed for scope — put `"class"` in the JSON if you want
a record to be scoped. (Path text is used as a fallback signal only.)

## Larger sources

For a whole textbook or a PYQ bank, prefer one file per unit rather than one
giant file. Each record should stay readable in a single prompt attachment;
the retriever attaches up to `AI_CURRICULUM_RECORDS` whole records per question
(default **6**, so one concept can bring its whole unit's treatment) and
**never truncates a record it picks** — it drops the least useful one instead.

## Source validation — what the tutor will NOT teach from

Owner requirement (2026-09-30): *"the source of the search is too shallow and
light, so validate it … all details of all topics one by one."* An audit of the
repo's own corpus found three kinds of non-content mixed in with the real
material, and all three are now filtered at load
(`curriculum-corpus.ts`) so nothing thin can become an answer's spine:

1. **Template banks** — identical blocks of 34 lines ("practice distinguishing
   prokaryotic from eukaryotic cells.") pasted into 126+ authored files.
   A line carried by `BOILERPLATE_MIN_RECORDS` (5) or more records is dropped.
2. **Generator frames** — per-topic filler that no cross-record count can see:
   `"**X:** Class 11 concept."`, `"Distinguish concepts in X."`,
   `"Solve 5 problems on X."`, `"Q2. Key formula for X."`,
   `"X appears in exams."`, `"Formula for X: [insert from textbook]."`.
3. **Generator stubs** — records whose surviving content is under
   `MIN_TEACHABLE_CHARS` (400) are marked `filler` and are never injected.

A file you drop in here is subject to the same rules, so keep every line about
the topic itself. Corpus stats (entries, template lines stripped, filler count,
validated characters) are printed in the injected block and exposed through
`getCorpusStats()`.

### Coverage is graded, never faked

The retriever grades each question and tells the model what it is allowed to
claim:

| Grade | Meaning | What the tutor does |
|-------|---------|---------------------|
| **STRONG** | The question's own content words match a record's title, slug or unit (and the record matches the rest of the question) | The records are the verified spine: cover **every** attached record, idea by idea, in conceptual order; verified prose may be carried across with light grammar polish |
| **WEAK** | The platform only *mentions* the concept in passing | Answer completely from established Class 11/12 knowledge plus the live web results; never dress a mention up as the syllabus treatment |
| **NONE** | Nothing matched | Same as WEAK, with no records attached |

Questions the corpus does **not** really cover today (audited 2026-09-30, all
currently answered from general knowledge rather than pretended notes): the
photoelectric effect, electromagnetic induction, simple harmonic motion, SN1/SN2
mechanisms, Le Chatelier's principle, aldol condensation, benzene, the binomial
theorem, conic sections, photosynthesis and DNA as their own units. Dropping a
real note into this folder for any of them flips that question to STRONG on the
next request — no code change.

## Images in the reply

Web grounding returns real image URLs (`TAVILY_SEARCH_DEPTH=advanced`,
`include_images`), and the tutor is instructed to embed the relevant ones inside
the answer as `![what is visible](url)` wherever a structure or process is
explained. The frontend renders them (`components/content/math-markdown.tsx` →
`lib/content/pipeline.ts`, styled by `.prose img`); the sanitiser only allows
`http(s)` image sources. A URL is never invented: if no real URL was attached,
the reply gives the diagram in words instead.

## Tuning knobs (env, all optional)

| Variable | Default | Effect |
|----------|---------|--------|
| `AI_CURRICULUM_RECORDS` | 6 | Whole records attached per question |
| `AI_CURRICULUM_MAX_CHARS` | 48000 | Injected-grounding ceiling (records stay whole) |
| `AI_MAX_OUTPUT_TOKENS` | 4096 | Per-reply output ceiling — the shallow-summary cap used to be 1600 |
| `AI_SEARCH_TIMEOUT_MS` | 9000 | How long web grounding may take |
| `TAVILY_SEARCH_DEPTH` | `advanced` | Search depth (`basic` to save quota) |
| `SEARCH_RAW_CONTENT_CHARS` | 2500 | Page extract kept per result |

## Validation

Add a file, then ask the tutor a question about it. Automated checks:

- `backend/tests/curriculum-retrieval.test.ts` — retrieval and whole-record injection.
- `backend/tests/deep-source-depth.test.ts` — the deep-source gate: corpus
  validation, coverage grading, no accidental matches, the complete-answer
  contract, image grounding and the output ceiling.
- `auditCurriculumCoverage([...questions])` in `curriculum-retrieval.ts`
  answers "does the platform actually teach X?" for a list of questions.

Run them with `npm run test:run` in `backend/`.

## Where the other sources live

| Tier | Source | Path |
|------|--------|------|
| 1 | **Owner drop-in** | `backend/kb/**/*.json` (this folder) |
| 1 | **NEB authored corpus** | `content/ravikishan/<class>/<subject>/<unit>/concepts/*.json` |
| 1 | **Deepen an existing answer** | Put the topic's real notes here; questions with a thin source are graded WEAK and answered from general knowledge |
| 2 | Built syllabus notes | `frontend/public/data/syllabus-notes/**` |
| 2 | Syllabus anchor | Supabase `subjects/chapters/topics` |
| 3 | Live web search | Tavily (`TAVILY_API_KEY`) |
| 3 | Model prior knowledge | agnes → openrouter → internal |

Trust order is enforced in the prompt by `SOURCE_REGISTRY_RULES`
(`backend/src/ai/source-registry.ts`).
